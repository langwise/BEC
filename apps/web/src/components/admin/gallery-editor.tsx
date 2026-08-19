"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, ImagePlus, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { PublishBar } from "@/components/admin/publish-bar";
import { ROW_HEIGHT, TILE_GAP, TILE_MIN_WIDTH } from "@/lib/admin/asset-grid";
import {
  findGallery,
  GALLERY_GROUPS,
  inGroup,
  photoLabel,
  photosOf,
  type Gallery,
} from "@/lib/admin/galleries";
import { useReportUnsavedChanges } from "@/lib/admin/unsaved-changes";
import { uploadImages } from "@/lib/admin/upload-image";
import { assetUrl, useAssetIndex } from "@/lib/admin/use-asset-index";
import { usePublishRequest } from "@/lib/admin/use-publish";
import { R2_BASE } from "@/lib/r2-base";
import { cn } from "@/lib/utils";

/**
 * Adding and removing the photos in a gallery.
 *
 * Unlike every other editor screen, there is no document here. The page draws
 * whatever the manifest holds under its folder, so *registering* a key is what
 * puts a photo on the site and unregistering it is what takes it off — which
 * makes both halves of this screen a change to one generated file, published
 * one gallery at a time.
 *
 * Nothing is destroyed. A removed photo keeps its bytes on R2 (the cleanup
 * screen is where those go), so the worst an Editor can do here is take a
 * picture off a page, and putting it back is finding it in the picker again.
 */

/** What is pending for one photo, before anything is published. */
type Mark = "added" | "removed";
type Marks = Record<string, Mark>;

const NO_KEYS: string[] = [];
const NO_MARKS: Marks = {};

export function GalleryEditor({ galleries }: { galleries: readonly Gallery[] }) {
  const [prefix, setPrefix] = React.useState(galleries[0]?.prefix ?? "");
  const gallery = findGallery(galleries, prefix) ?? galleries[0];

  const catalogue = useAssetIndex("image");
  const keys = catalogue.status === "ready" ? catalogue.catalogue.keys : NO_KEYS;
  const base = catalogue.status === "ready" ? catalogue.catalogue.base : R2_BASE;

  // Two layers over the committed manifest, both keyed by gallery. `pending` is
  // what the Publish button will send; `applied` is what previous publishes in
  // this sitting already sent — the fetched catalogue is a snapshot from before
  // them, and without this the photos an Editor just published would vanish
  // from the screen the moment it stopped being dirty.
  const [pending, setPending] = React.useState<Record<string, Marks>>({});
  const [applied, setApplied] = React.useState<Record<string, Marks>>({});
  const marks = pending[prefix] ?? NO_MARKS;

  const visible = React.useMemo(() => {
    const set = new Set(keys);
    for (const [key, mark] of Object.entries(applied[prefix] ?? NO_MARKS)) {
      if (mark === "added") set.add(key);
      else set.delete(key);
    }
    // A photo pending removal stays on screen, marked, so the Editor can see
    // what they are about to publish and undo it.
    for (const [key, mark] of Object.entries(marks)) {
      if (mark === "added") set.add(key);
    }
    return [...set];
  }, [keys, applied, marks, prefix]);

  const photos = React.useMemo(() => photosOf(visible, gallery), [visible, gallery]);

  const mark = (key: string, next: Mark | null) =>
    setPending((prior) => {
      const forGallery = { ...(prior[prefix] ?? {}) };
      if (next) forGallery[key] = next;
      else delete forGallery[key];
      return { ...prior, [prefix]: forGallery };
    });

  const toggle = (key: string) => {
    // Undoing an upload that has not been published yet simply drops it: the
    // bytes are on R2 either way, and unregistering a key that was never
    // registered is not a change worth a commit.
    if (marks[key]) mark(key, null);
    else mark(key, "removed");
  };

  const onUploaded = (uploaded: string[]) =>
    setPending((prior) => {
      const forGallery = { ...(prior[prefix] ?? {}) };
      for (const key of uploaded) forGallery[key] = "added";
      return { ...prior, [prefix]: forGallery };
    });

  const added = Object.keys(marks).filter((key) => marks[key] === "added");
  const removed = Object.keys(marks).filter((key) => marks[key] === "removed");
  const dirty = added.length > 0 || removed.length > 0;

  // Nothing here autosaves, and an upload that is never published leaves a
  // photo on R2 that no page shows. Across *all* galleries, not just the one on
  // screen: photos added to one and then a switch to another are still unsaved.
  const anyPending = Object.values(pending).some(
    (forGallery) => Object.keys(forGallery).length > 0,
  );

  React.useEffect(() => {
    if (!anyPending) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [anyPending]);

  useReportUnsavedChanges(anyPending);

  const { state, run, reset } = usePublishRequest();

  const onPublish = async () => {
    const sent = { added, removed };
    const ok = await run(() =>
      fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefix, add: sent.added, remove: sent.removed }),
      }),
    );
    if (!ok) return;
    setApplied((prior) => ({ ...prior, [prefix]: { ...(prior[prefix] ?? {}), ...marks } }));
    setPending((prior) => ({ ...prior, [prefix]: {} }));
  };

  const elsewhere = galleries.filter(
    (other) => other.prefix !== prefix && Object.keys(pending[other.prefix] ?? {}).length > 0,
  );

  return (
    <div className="space-y-6">
      <GalleryChooser
        galleries={galleries}
        value={prefix}
        onChange={(next) => {
          setPrefix(next);
          reset();
        }}
      />

      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">{gallery.label}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {gallery.note}{" "}
          <a
            href={gallery.page}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-2"
          >
            See it on the site
            <ExternalLink className="size-3" />
          </a>
        </p>
      </div>

      <UploadButton folder={gallery.prefix} onUploaded={onUploaded} />

      {catalogue.status === "loading" ? (
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <Spinner className="size-4" /> Loading the photo library…
        </p>
      ) : null}
      {catalogue.status === "error" ? (
        <p className="text-destructive text-sm">{catalogue.message}</p>
      ) : null}

      {catalogue.status === "ready" ? (
        <>
          <p className="text-muted-foreground text-sm">
            {photos.shown.length === 0
              ? "This gallery has no photos yet."
              : `${photos.shown.length} ${photos.shown.length === 1 ? "photo" : "photos"}, shown on the site in this order.`}
          </p>

          <PhotoGrid
            photos={photos.shown}
            gallery={gallery}
            base={base}
            marks={marks}
            onToggle={toggle}
          />

          {photos.hidden.length > 0 ? (
            <NotInTheGallery photos={photos.hidden} gallery={gallery} base={base} />
          ) : null}
        </>
      ) : null}

      {elsewhere.length > 0 ? (
        <p className="text-sm text-amber-700">
          Also unpublished:{" "}
          {elsewhere.map((other, index) => (
            <React.Fragment key={other.prefix}>
              {index > 0 ? ", " : ""}
              <button
                type="button"
                className="underline underline-offset-2"
                onClick={() => {
                  setPrefix(other.prefix);
                  reset();
                }}
              >
                {other.label}
              </button>
            </React.Fragment>
          ))}
          . Each gallery is published on its own.
        </p>
      ) : null}

      {dirty ? (
        <p className="text-muted-foreground text-sm">
          {summarise(added.length, removed.length)}
        </p>
      ) : null}

      <PublishBar
        state={state}
        dirty={dirty}
        onPublish={() => void onPublish()}
        viewUrl={gallery.page}
      />
    </div>
  );
}

function summarise(added: number, removed: number): string {
  const parts: string[] = [];
  if (added) parts.push(`${added} ${added === 1 ? "photo" : "photos"} to add`);
  if (removed) parts.push(`${removed} ${removed === 1 ? "photo" : "photos"} to take off the site`);
  return `${parts.join(", ")}. Removed photos stay in storage — nothing is deleted here.`;
}

function GalleryChooser({
  galleries,
  value,
  onChange,
}: {
  galleries: readonly Gallery[];
  value: string;
  onChange: (prefix: string) => void;
}) {
  return (
    <div className="bg-card space-y-2 rounded-lg border p-4">
      <Label htmlFor="gallery">Gallery</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="gallery" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {GALLERY_GROUPS.map((group) => {
            const inThisGroup = inGroup(galleries, group);
            if (inThisGroup.length === 0) return null;
            return (
              <SelectGroup key={group}>
                <SelectLabel>{group}</SelectLabel>
                {inThisGroup.map((gallery) => (
                  <SelectItem key={gallery.prefix} value={gallery.prefix}>
                    {gallery.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

function UploadButton({
  folder,
  onUploaded,
}: {
  folder: string;
  onUploaded: (keys: string[]) => void;
}) {
  const input = React.useRef<HTMLInputElement>(null);
  const [progress, setProgress] = React.useState<{ done: number; total: number } | null>(null);
  const [failures, setFailures] = React.useState<{ name: string; message: string }[]>([]);

  const upload = async (files: File[]) => {
    setFailures([]);
    setProgress({ done: 0, total: files.length });
    const result = await uploadImages(files, folder, (done) =>
      setProgress({ done, total: files.length }),
    );
    setProgress(null);
    setFailures(result.failures);
    if (result.keys.length) onUploaded(result.keys);
  };

  return (
    <div className="space-y-2">
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(event) => {
          const files = [...(event.target.files ?? [])];
          // Cleared so choosing the same files twice still fires a change.
          event.target.value = "";
          if (files.length) void upload(files);
        }}
      />
      <Button type="button" disabled={progress !== null} onClick={() => input.current?.click()}>
        {progress ? <Spinner className="size-4" /> : <ImagePlus className="size-4" />}
        {progress ? `Uploading ${progress.done} of ${progress.total}…` : "Add photos"}
      </Button>
      <p className="text-muted-foreground text-xs">
        Choose several at once. Large photos are shrunk in the browser and stored as WebP; they go
        on the site when you publish.
      </p>
      {failures.length > 0 ? (
        <ul className="text-destructive space-y-1 text-sm">
          {failures.map((failure) => (
            <li key={failure.name}>
              {failure.name} — {failure.message}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * The gallery itself, on the page rather than in a scrolling box: this screen
 * is about one folder, and an Editor scrolling through it is reading the site's
 * running order.
 *
 * Not virtualized, unlike the picker. The picker draws the whole library —
 * ~2,950 entries — where the biggest gallery here is 340, which is nothing to
 * lay out, and `next/image` only fetches the tiles that come into view. The
 * virtualizer would buy a few milliseconds and cost a scroll container that
 * fights the page's own.
 */
function PhotoGrid({
  photos,
  gallery,
  base,
  marks,
  onToggle,
}: {
  photos: string[];
  gallery: Gallery;
  base: string;
  marks: Marks;
  onToggle: (key: string) => void;
}) {
  if (photos.length === 0) {
    return (
      <p className="text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
        Nothing here yet. Add photos and publish, and they appear on the page.
      </p>
    );
  }

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${TILE_MIN_WIDTH}px, 1fr))` }}
    >
      {photos.map((key) => (
        <PhotoTile
          key={key}
          label={photoLabel(key, gallery)}
          url={assetUrl(base, key)}
          mark={marks[key]}
          onToggle={() => onToggle(key)}
        />
      ))}
    </div>
  );
}

function PhotoTile({
  label,
  url,
  mark,
  onToggle,
}: {
  label: string;
  url: string;
  mark?: Mark;
  onToggle: () => void;
}) {
  const removing = mark === "removed";
  return (
    <div
      // The picker's row height, minus the gap it accounted for — the tiles are
      // the same size across the two screens.
      style={{ height: ROW_HEIGHT - TILE_GAP }}
      className={cn(
        "bg-card relative flex flex-col overflow-hidden rounded-lg border",
        removing && "border-destructive/60 opacity-60",
        mark === "added" && "border-primary",
      )}
    >
      <div className="bg-muted relative min-h-0 flex-1">
        <Image src={url} alt="" fill sizes="160px" className="object-cover" />
        {mark ? (
          <span
            className={cn(
              "absolute top-1 left-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
              removing
                ? "bg-destructive text-white"
                : "bg-primary text-primary-foreground",
            )}
          >
            {removing ? "Removing" : "New"}
          </span>
        ) : null}
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute top-1 right-1 size-7 shadow"
          onClick={onToggle}
          aria-label={
            removing ? `Keep ${label} on the site` : `Take ${label} off the site`
          }
          title={removing ? "Keep this photo" : "Take this photo off the site"}
        >
          {removing ? <Undo2 className="size-3.5" /> : <Trash2 className="text-destructive size-3.5" />}
        </Button>
      </div>
      <span className="line-clamp-2 px-2 py-1.5 text-[11px] leading-tight">{label}</span>
    </div>
  );
}

/**
 * Photos that sit in the folder but are not in the gallery — a hero the page
 * shows at the top, a portrait beside the text, one somebody left out. Shown
 * because an Editor who cannot see them would upload a second copy of the same
 * picture; not removable, because unregistering one would take it off the page
 * that does use it.
 */
function NotInTheGallery({
  photos,
  gallery,
  base,
}: {
  photos: string[];
  gallery: Gallery;
  base: string;
}) {
  return (
    <details className="rounded-lg border p-4">
      <summary className="cursor-pointer text-sm font-medium">
        {photos.length} {photos.length === 1 ? "photo" : "photos"} in this folder that the gallery
        does not show
      </summary>
      <p className="text-muted-foreground mt-2 text-sm">
        The page uses these elsewhere, or leaves them out on purpose. They cannot be changed here.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {photos.map((key) => (
          <div key={key} className="w-28">
            <div className="bg-muted relative h-20 overflow-hidden rounded-md border">
              <Image src={assetUrl(base, key)} alt="" fill sizes="112px" className="object-cover" />
            </div>
            <span className="text-muted-foreground line-clamp-2 pt-1 text-[11px] leading-tight">
              {photoLabel(key, gallery)}
            </span>
          </div>
        ))}
      </div>
    </details>
  );
}

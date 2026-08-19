"use client";

import * as React from "react";
import Image from "next/image";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Check,
  ChevronRight,
  FileText,
  Folder as FolderIcon,
  ImagePlus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type { AssetKind } from "@/lib/admin/asset-index";
import {
  chunk,
  columnsForWidth,
  gridEntries,
  rowOf,
  ROW_HEIGHT,
  TILE_GAP,
} from "@/lib/admin/asset-grid";
import {
  breadcrumbs,
  folderLabel,
  folderOf,
  labelFor,
  SEARCH_RESULT_LIMIT,
  type Folder,
} from "@/lib/admin/asset-tree";
import { uploadImage } from "@/lib/admin/upload-image";
import { uploadPdf } from "@/lib/admin/upload-pdf";
import { assetUrl, useAssetIndex } from "@/lib/admin/use-asset-index";
import { R2_BASE } from "@/lib/r2-base";
import { cn } from "@/lib/utils";

/**
 * The picker every editor uses for an image (or, with kind="document", a PDF).
 *
 * Staff never see an asset key. They see a photo, a name and the folders it
 * sits in; the key is what comes back through onChange. Browsing is by key
 * prefix because that is how the library is already organised — departments,
 * governance, gallery — so the folders an editor sees match the ones whoever
 * uploaded the photos made.
 *
 * The catalogue is ~2,950 entries, so the grid is virtualized by row and the
 * catalogue itself is fetched only once the dialog is opened: a form with six
 * image fields must not pull half a megabyte six times over on load.
 */

export type ImagePickerProps = {
  /** The current asset key, or undefined when nothing is chosen. */
  value?: string;
  onChange: (key: string | undefined) => void;
  kind?: AssetKind;
  label?: string;
  /** Guidance shown under the preview — what this image is used for. */
  description?: string;
  /** False when the field is required and must always hold something. */
  clearable?: boolean;
  /**
   * Where an upload from this field is filed, e.g. "governance/". Fields know
   * where their pictures belong; without it, uploads land in whichever folder
   * the Editor is browsing.
   */
  uploadFolder?: string;
  className?: string;
};

type Copy = {
  title: string;
  help: string;
  choose: string;
  change: string;
  remove: string;
  none: string;
  search: string;
  use: string;
  prompt: string;
  empty: string;
  noun: string;
  nounPlural: string;
  upload: string;
};

const COPY: Record<AssetKind, Copy> = {
  image: {
    title: "Choose a photo",
    help: "Browse the folders, or search by what the photo is called.",
    choose: "Choose a photo",
    change: "Change photo",
    remove: "Remove photo",
    none: "No photo chosen yet.",
    search: "Search photos…",
    use: "Use this photo",
    prompt: "Pick a photo to continue.",
    empty: "No photos in this folder.",
    noun: "photo",
    nounPlural: "photos",
    upload: "Upload a new photo",
  },
  document: {
    title: "Choose a file",
    help: "Browse the folders, or search by what the file is called.",
    choose: "Choose a file",
    change: "Change file",
    remove: "Remove file",
    none: "No file chosen yet.",
    search: "Search files…",
    use: "Use this file",
    prompt: "Pick a file to continue.",
    empty: "No files in this folder.",
    noun: "file",
    nounPlural: "files",
    upload: "Upload a new file",
  },
};

/** "departments/civil-engg/faculty/x.webp" -> "Departments › Civil engg › Faculty". */
function whereItLives(key: string): string {
  return breadcrumbs(folderOf(key))
    .map((folder) => folderLabel(folder.name))
    .join(" › ");
}

function countLabel(count: number, copy: Copy): string {
  return `${count.toLocaleString("en-IN")} ${count === 1 ? copy.noun : copy.nounPlural}`;
}

export function ImagePicker({
  value,
  onChange,
  kind = "image",
  label,
  description,
  clearable = true,
  uploadFolder,
  className,
}: ImagePickerProps) {
  const [open, setOpen] = React.useState(false);
  const copy = COPY[kind];

  return (
    <div className={cn("space-y-2", className)}>
      {label ? <Label className="text-sm font-medium">{label}</Label> : null}

      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={value ? copy.change : copy.choose}
          className={cn(
            "relative size-24 shrink-0 overflow-hidden rounded-lg border bg-muted transition",
            "hover:border-primary focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-hidden",
            !value && "border-dashed",
          )}
        >
          {value ? (
            kind === "image" ? (
              <Image
                src={assetUrl(R2_BASE, value)}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center">
                <FileText className="text-muted-foreground size-8" />
              </span>
            )
          ) : (
            <span className="text-muted-foreground flex size-full items-center justify-center">
              <ImagePlus className="size-7" />
            </span>
          )}
        </button>

        <div className="min-w-0 flex-1">
          {value ? (
            <>
              <p className="truncate text-sm font-medium">{labelFor(value)}</p>
              <p className="text-muted-foreground truncate text-xs">{whereItLives(value)}</p>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">{copy.none}</p>
          )}
          {description ? (
            <p className="text-muted-foreground mt-1 text-xs">{description}</p>
          ) : null}

          <div className="mt-2 flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
              {value ? copy.change : copy.choose}
            </Button>
            {value && clearable ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => onChange(undefined)}
              >
                <Trash2 className="size-4" />
                {copy.remove}
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Radix unmounts this subtree when closed, so the body — and its
            catalogue fetch — only exists once someone actually opens it. */}
        <DialogContent className="flex h-[85vh] w-[min(64rem,calc(100%-2rem))] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none">
          <PickerBody
            kind={kind}
            value={value}
            uploadFolder={uploadFolder}
            onPick={(key) => {
              onChange(key);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const NO_KEYS: string[] = [];

function PickerBody({
  kind,
  value,
  uploadFolder,
  onPick,
  onCancel,
}: {
  kind: AssetKind;
  value?: string;
  uploadFolder?: string;
  onPick: (key: string) => void;
  onCancel: () => void;
}) {
  const copy = COPY[kind];
  const state = useAssetIndex(kind);
  const catalogue = state.status === "ready" ? state.catalogue.keys : NO_KEYS;
  const base = state.status === "ready" ? state.catalogue.base : R2_BASE;

  // Keys uploaded in this sitting are on R2 already but not in the committed
  // manifest — they join the catalogue locally so the Editor can see and pick
  // what they just uploaded, and get registered by the Publish that uses them.
  const [uploaded, setUploaded] = React.useState<string[]>([]);
  const keys = React.useMemo(
    () => (uploaded.length ? [...catalogue, ...uploaded] : catalogue),
    [catalogue, uploaded],
  );

  const [query, setQuery] = React.useState("");
  // Open where the current photo lives, so "change this one" starts among its
  // neighbours rather than at the top of the library.
  const [prefix, setPrefix] = React.useState(() => (value ? folderOf(value) : ""));
  const [selected, setSelected] = React.useState<string | undefined>(value);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    setWidth(node.clientWidth);
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const columns = columnsForWidth(width);
  const searching = query.trim().length > 0;
  const entries = React.useMemo(() => gridEntries(keys, prefix, query), [keys, prefix, query]);
  const rows = React.useMemo(() => chunk(entries, columns), [entries, columns]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 3,
  });

  // Moving somewhere new starts at the top of it.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [prefix, query]);

  // ...except on the first paint, where the current photo is what we want in view.
  const homed = React.useRef(false);
  React.useEffect(() => {
    if (homed.current || !value || width === 0 || state.status !== "ready") return;
    homed.current = true;
    const row = rowOf(entries, value, columns);
    if (row > 0) virtualizer.scrollToIndex(row, { align: "center" });
  }, [value, width, state.status, entries, columns, virtualizer]);

  const goTo = (next: string) => {
    setQuery("");
    setPrefix(next);
  };

  const trail = breadcrumbs(prefix);

  const fileInput = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  // The field says where its pictures belong; failing that, wherever the
  // Editor is standing. Nothing is filed at the root of the library.
  const uploadTo = uploadFolder ?? prefix;
  const uploadHint = uploadTo
    ? undefined
    : `Open a folder first, so the ${copy.noun} has somewhere to go.`;

  /**
   * Two transports behind one button. An image goes through the function so
   * sharp can convert it; a PDF is presigned straight to R2, because the
   * function's request body caps out at 4.5 MB (ADR 0004). Both hand back a
   * key that is on R2 but not yet in the manifest — the Publish that
   * references it is what registers it.
   */
  const upload = async (file: File) => {
    setUploadError(null);
    setUploading(true);
    try {
      const key = kind === "document" ? await uploadPdf(file, uploadTo) : await uploadImage(file, uploadTo);
      setUploaded((prior) => [...prior, key]);
      setSelected(key);
      setQuery("");
      setPrefix(folderOf(key));
      homed.current = true;
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : `That ${copy.noun} could not be uploaded.`,
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <DialogHeader className="border-b px-6 pt-6 pb-4 text-left">
        <DialogTitle>{copy.title}</DialogTitle>
        <DialogDescription>{copy.help}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-wrap items-center gap-2 px-6 py-3">
        <div className="relative min-w-56 flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.search}
            className="pl-8"
            autoFocus
          />
        </div>
        <input
          ref={fileInput}
          type="file"
          accept={kind === "document" ? "application/pdf" : "image/*"}
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            // Cleared so choosing the same file twice still fires a change.
            event.target.value = "";
            if (file) void upload(file);
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={uploading || !uploadTo}
          title={uploadHint}
          onClick={() => fileInput.current?.click()}
        >
          {uploading ? <Spinner className="size-4" /> : <Upload className="size-4" />}
          {uploading ? "Uploading…" : copy.upload}
        </Button>
      </div>

      {uploadError ? (
        <p className="text-destructive px-6 pb-2 text-sm">{uploadError}</p>
      ) : null}
      {uploaded.length > 0 && !uploadError ? (
        <p className="text-muted-foreground px-6 pb-2 text-sm">
          {uploaded.length === 1
            ? `The new ${copy.noun} goes`
            : `New ${copy.nounPlural} go`}{" "}
          on the site when you publish this page.
        </p>
      ) : null}

      <div className="text-muted-foreground flex flex-wrap items-center gap-1 px-6 pb-3 text-sm">
        {searching ? (
          <>
            <span>
              {entries.length === SEARCH_RESULT_LIMIT
                ? `First ${SEARCH_RESULT_LIMIT} matches`
                : countLabel(entries.length, copy)}{" "}
              matching “{query.trim()}”
            </span>
            <Button
              type="button"
              variant="link"
              size="sm"
              className="h-auto p-0 pl-2"
              onClick={() => setQuery("")}
            >
              Clear search
            </Button>
          </>
        ) : (
          <>
            <Crumb label="All folders" onClick={() => goTo("")} current={trail.length === 0} />
            {trail.map((folder, index) => (
              <React.Fragment key={folder.prefix}>
                <ChevronRight className="size-3.5 shrink-0" />
                <Crumb
                  label={folderLabel(folder.name)}
                  onClick={() => goTo(folder.prefix)}
                  current={index === trail.length - 1}
                />
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-6 pb-4">
        {state.status === "loading" ? (
          <Centered>
            <Spinner className="size-5" />
            <span>Loading the library…</span>
          </Centered>
        ) : null}

        {state.status === "error" ? (
          <Centered>
            <span className="text-destructive">{state.message}</span>
          </Centered>
        ) : null}

        {state.status === "ready" && entries.length === 0 ? (
          <Centered>
            <span>{searching ? `Nothing matches “${query.trim()}”.` : copy.empty}</span>
          </Centered>
        ) : null}

        <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}>
          {virtualizer.getVirtualItems().map((row) => (
            <div
              key={row.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${row.size}px`,
                transform: `translateY(${row.start}px)`,
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gap: `${TILE_GAP}px`,
                paddingBottom: `${TILE_GAP}px`,
              }}
            >
              {(rows[row.index] ?? []).map((entry) =>
                entry.type === "folder" ? (
                  <FolderTile
                    key={entry.id}
                    folder={entry.folder}
                    copy={copy}
                    onOpen={() => goTo(entry.folder.prefix)}
                  />
                ) : (
                  <AssetTile
                    key={entry.id}
                    assetKey={entry.key}
                    url={assetUrl(base, entry.key)}
                    kind={kind}
                    selected={selected === entry.key}
                    onSelect={() => setSelected(entry.key)}
                    onConfirm={() => onPick(entry.key)}
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <DialogFooter className="items-center border-t px-6 py-4">
        <p className="text-muted-foreground mr-auto min-w-0 truncate text-sm">
          {selected ? (
            <>
              Selected: <span className="text-foreground font-medium">{labelFor(selected)}</span>
            </>
          ) : (
            copy.prompt
          )}
        </p>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" disabled={!selected} onClick={() => selected && onPick(selected)}>
          {copy.use}
        </Button>
      </DialogFooter>
    </>
  );
}

function Crumb({
  label,
  onClick,
  current,
}: {
  label: string;
  onClick: () => void;
  current: boolean;
}) {
  if (current) return <span className="text-foreground font-medium">{label}</span>;
  return (
    <button type="button" onClick={onClick} className="hover:text-foreground underline-offset-4 hover:underline">
      {label}
    </button>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground flex h-40 flex-col items-center justify-center gap-2 text-sm">
      {children}
    </div>
  );
}

function FolderTile({
  folder,
  copy,
  onOpen,
}: {
  folder: Folder;
  copy: Copy;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="bg-muted/40 hover:border-primary hover:bg-muted focus-visible:ring-ring flex h-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed p-3 text-center transition focus-visible:ring-2 focus-visible:outline-hidden"
    >
      <FolderIcon className="text-muted-foreground size-8" />
      <span className="line-clamp-2 text-xs leading-tight font-medium">
        {folderLabel(folder.name)}
      </span>
      <span className="text-muted-foreground text-[11px]">{countLabel(folder.count, copy)}</span>
    </button>
  );
}

function AssetTile({
  assetKey,
  url,
  kind,
  selected,
  onSelect,
  onConfirm,
}: {
  assetKey: string;
  url: string;
  kind: AssetKind;
  selected: boolean;
  onSelect: () => void;
  onConfirm: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onDoubleClick={onConfirm}
      aria-pressed={selected}
      title={whereItLives(assetKey)}
      className={cn(
        "group focus-visible:ring-ring flex h-full flex-col overflow-hidden rounded-lg border bg-card text-left transition focus-visible:ring-2 focus-visible:outline-hidden",
        selected ? "border-primary ring-primary/30 ring-2" : "hover:border-primary/60",
      )}
    >
      <div className="bg-muted relative min-h-0 flex-1 overflow-hidden">
        {kind === "image" ? (
          <Image src={url} alt="" fill sizes="160px" className="object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center">
            <FileText className="text-muted-foreground size-8" />
          </span>
        )}
        {selected ? (
          <span className="bg-primary text-primary-foreground absolute top-1 right-1 rounded-full p-1">
            <Check className="size-3" />
          </span>
        ) : null}
      </div>
      <span className="line-clamp-2 px-2 py-1.5 text-[11px] leading-tight">
        {labelFor(assetKey)}
      </span>
    </button>
  );
}

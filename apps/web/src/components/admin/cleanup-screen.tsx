"use client";

import * as React from "react";
import Image from "next/image";
import { AlertTriangle, FileText, Loader2, RefreshCw, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { labelFor } from "@/lib/admin/asset-tree";
import { kindOf } from "@/lib/asset-key-shape";
import { formatBytes, MAX_DELETIONS, type Orphan } from "@/lib/admin/orphans";
import { assetUrl } from "@/lib/admin/use-asset-index";
import { usePublishRequest, type PublishState } from "@/lib/admin/use-publish";
import { cn } from "@/lib/utils";

/**
 * Storage: what the bucket holds, and the two steps that get rid of what
 * nothing uses.
 *
 * The screen is built around one fact an Editor has to feel rather than read:
 * *taking a photo out of the site's index is undoable, deleting the file is
 * not*. So they are two buttons, in order, and the second refuses to act on
 * anything the first has not been through ([10]'s two-phase delete). The
 * in-between wait is the deploy, which is why the unregister step ends in the
 * same "saved → live" bar as every other publish.
 */

type Report = {
  usage: { objects: number; bytes: number; freeTierBytes: number };
  orphans: Orphan[];
  brokenReferences: string[];
  reclaimableBytes: number;
  heldBack: { recent: number; markers: number };
  base: string;
};

type State =
  | { status: "loading" }
  | { status: "ready"; report: Report }
  | { status: "error"; message: string };

export function CleanupScreen() {
  const [state, setState] = React.useState<State>({ status: "loading" });
  const [selected, setSelected] = React.useState<ReadonlySet<string>>(new Set());
  const [deleting, setDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const [confirming, setConfirming] = React.useState(false);
  const publish = usePublishRequest();

  const load = React.useCallback(async () => {
    setState({ status: "loading" });
    try {
      const response = await fetch("/api/admin/cleanup");
      const body = (await response.json().catch(() => ({}))) as Partial<Report> & {
        error?: string;
      };
      if (!response.ok || !body.usage || !body.orphans) {
        throw new Error(body.error ?? "Storage could not be read.");
      }
      setState({ status: "ready", report: body as Report });
      setSelected(new Set());
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Storage could not be read.",
      });
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  if (state.status === "loading") {
    return (
      <p className="text-muted-foreground flex items-center gap-2 text-sm">
        <Spinner /> Looking through storage…
      </p>
    );
  }

  if (state.status === "error") {
    return (
      <div className="space-y-4">
        <p className="text-destructive text-sm">{state.message}</p>
        <Button variant="outline" onClick={() => void load()}>
          <RefreshCw /> Try again
        </Button>
      </div>
    );
  }

  const { report } = state;
  const byKey = new Map(report.orphans.map((orphan) => [orphan.key, orphan]));
  const chosen = [...selected].filter((key) => byKey.has(key));
  const stillIndexed = chosen.filter((key) => byKey.get(key)?.registered);
  const chosenBytes = chosen.reduce((total, key) => total + (byKey.get(key)?.size ?? 0), 0);
  const atCap = chosen.length >= MAX_DELETIONS;
  const busy = publish.state.phase === "saving" || publish.state.phase === "deploying";

  const toggle = (key: string) => {
    setDeleteError(null);
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else if (next.size < MAX_DELETIONS) next.add(key);
      return next;
    });
  };

  const unregister = () =>
    void publish
      .run(() =>
        fetch("/api/admin/cleanup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: "unregister", keys: stillIndexed }),
        }),
      )
      .then((ok) => {
        // The manifest changed; what is registered has too. Re-read rather than
        // patch the list in place, so the second step cannot act on a guess.
        if (ok) void load();
      });

  const remove = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetch("/api/admin/cleanup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "delete", keys: chosen }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? "The files could not be deleted.");
      await load();
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "The files could not be deleted.",
      );
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div className="space-y-8">
      <Usage usage={report.usage} reclaimable={report.reclaimableBytes} />

      {report.brokenReferences.length > 0 ? (
        <BrokenReferences keys={report.brokenReferences} />
      ) : null}

      <section className="space-y-4">
        <header className="space-y-1">
          <h2 className="text-lg font-semibold">
            {report.orphans.length === 0
              ? "Nothing unused"
              : `${report.orphans.length} ${report.orphans.length === 1 ? "file" : "files"} no page uses`}
          </h2>
          <p className="text-muted-foreground text-sm">
            {report.orphans.length === 0
              ? "Every file in storage is on a page, in a gallery, or too new to judge."
              : "Nothing here is on a page or in a gallery. Deleting a file cannot be undone, so it happens in two steps."}
            {report.heldBack.recent > 0
              ? ` ${report.heldBack.recent} recently added ${report.heldBack.recent === 1 ? "file is" : "files are"} left out — anything added in the last 30 days is given time to be used.`
              : ""}
          </p>
        </header>

        {report.orphans.length > 0 ? (
          <>
            <OrphanList
              orphans={report.orphans}
              base={report.base}
              selected={selected}
              atCap={atCap}
              onToggle={toggle}
            />
            {atCap ? (
              <p className="text-muted-foreground text-xs">
                {MAX_DELETIONS} at a time is the most the Admin will do in one go.
              </p>
            ) : null}
          </>
        ) : null}
      </section>

      {chosen.length > 0 ? (
        <div className="bg-background/95 sticky bottom-0 z-10 -mx-4 space-y-3 border-t px-4 py-4 backdrop-blur md:-mx-6 md:px-6">
          <p className="text-sm font-medium">
            {chosen.length} selected · {formatBytes(chosenBytes)}
          </p>

          {stillIndexed.length > 0 ? (
            // Step one. Nothing is destroyed: the site simply stops listing
            // them, and the change is a commit anyone can revert.
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                {stillIndexed.length === chosen.length
                  ? "These are"
                  : `${stillIndexed.length} of these are`}{" "}
                still in the site&rsquo;s photo index. Take them out first — that is a change
                to the site, and it can be undone.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={unregister} disabled={busy}>
                  {busy ? <Loader2 className="animate-spin" /> : null}
                  Take {stillIndexed.length} out of the site&rsquo;s index
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSelected(new Set())}
                  disabled={busy}
                >
                  Clear selection
                </Button>
              </div>
              <PublishStatus state={publish.state} />
            </div>
          ) : (
            // Step two, and the only irreversible thing in the Admin.
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                These are no longer in the site&rsquo;s photo index, so the files themselves
                can go. This cannot be undone.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="destructive"
                  disabled={deleting}
                  onClick={() => setConfirming(true)}
                >
                  {deleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
                  Delete {chosen.length} {chosen.length === 1 ? "file" : "files"} permanently
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSelected(new Set())}
                  disabled={deleting}
                >
                  Clear selection
                </Button>
              </div>
              {deleteError ? <p className="text-destructive text-sm">{deleteError}</p> : null}
            </div>
          )}
        </div>
      ) : null}

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {chosen.length} {chosen.length === 1 ? "file" : "files"} for good?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This frees {formatBytes(chosenBytes)} and cannot be undone. The files are gone
              from storage; putting one back means finding the original and uploading it
              again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Keep them</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void remove();
              }}
              disabled={deleting}
            >
              {deleting ? <Loader2 className="animate-spin" /> : null}
              Delete permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/**
 * The wait between the two steps, spelled out. "Saved" and "live on the site"
 * are different things everywhere in the Admin; here the difference is the
 * whole point — the files stay deletable-but-not-yet-deleted until the site has
 * actually rebuilt without them.
 */
function PublishStatus({ state }: { state: PublishState }) {
  if (state.phase === "idle") return null;

  const text =
    state.phase === "saving"
      ? "Saving…"
      : state.phase === "deploying"
        ? "Saved. The site is updating — about two minutes."
        : state.phase === "live"
          ? "The site no longer lists those files. Select them again to delete them."
          : state.phase === "unchanged"
            ? "They were already out of the index."
            : (state.message ?? "Something went wrong.");

  return (
    <p className={cn("text-sm", state.phase === "error" ? "text-destructive" : "text-muted-foreground")}>
      {text}
    </p>
  );
}

function Usage({
  usage,
  reclaimable,
}: {
  usage: Report["usage"];
  reclaimable: number;
}) {
  const percent = Math.min(100, (usage.bytes / usage.freeTierBytes) * 100);

  return (
    <section className="bg-card space-y-3 rounded-lg border p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">
          {formatBytes(usage.bytes)}{" "}
          <span className="text-muted-foreground text-base font-normal">
            of {formatBytes(usage.freeTierBytes)} used
          </span>
        </h2>
        <p className="text-muted-foreground text-sm">
          {usage.objects.toLocaleString()} files
          {reclaimable > 0 ? ` · ${formatBytes(reclaimable)} unused` : ""}
        </p>
      </div>
      <Progress value={percent} className={cn(percent > 90 && "bg-destructive/20")} />
      <p className="text-muted-foreground text-xs">
        Storage is free up to {formatBytes(usage.freeTierBytes)}. Photos are converted and
        resized on upload, so this grows slowly — but old files nobody uses still count.
      </p>
    </section>
  );
}

/**
 * The urgent list, and the one nobody can act on from here: the index names a
 * file that is not in storage, so a page is drawing a broken image right now.
 * Fixing it means re-uploading the original or editing the page, both of which
 * need a person who knows which.
 */
function BrokenReferences({ keys }: { keys: string[] }) {
  return (
    <section className="border-destructive/40 bg-destructive/5 space-y-2 rounded-lg border p-5">
      <h2 className="flex items-center gap-2 font-semibold">
        <AlertTriangle className="text-destructive size-4" />
        {keys.length} {keys.length === 1 ? "file is" : "files are"} listed on the site but
        missing from storage
      </h2>
      <p className="text-muted-foreground text-sm">
        Wherever these appear, the page shows a broken image. Send this list to the site administrator.
      </p>
      <ul className="max-h-48 overflow-y-auto font-mono text-xs">
        {keys.map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </section>
  );
}

function OrphanList({
  orphans,
  base,
  selected,
  atCap,
  onToggle,
}: {
  orphans: Orphan[];
  base: string;
  selected: ReadonlySet<string>;
  atCap: boolean;
  onToggle: (key: string) => void;
}) {
  // Grouped by folder, because that is how an Editor recognises them: a whole
  // dead folder is an easy decision, one stray file among photos still in use
  // is not.
  const folders = new Map<string, Orphan[]>();
  for (const orphan of orphans) {
    const list = folders.get(orphan.folder);
    if (list) list.push(orphan);
    else folders.set(orphan.folder, [orphan]);
  }

  return (
    <div className="space-y-6">
      {[...folders].map(([folder, items]) => (
        <div key={folder} className="space-y-2">
          <h3 className="flex flex-wrap items-baseline gap-x-2 text-sm">
            <span className="font-mono">{folder || "(top level)"}</span>
            <span className="text-muted-foreground text-xs">
              {items[0].siblingsInUse === 0
                ? "nothing in this folder is used by a page"
                : `${items[0].siblingsInUse} other ${items[0].siblingsInUse === 1 ? "file" : "files"} here are in use`}
            </span>
          </h3>
          <ul className="divide-y rounded-lg border">
            {items.map((orphan) => (
              <OrphanRow
                key={orphan.key}
                orphan={orphan}
                base={base}
                checked={selected.has(orphan.key)}
                disabled={atCap && !selected.has(orphan.key)}
                onToggle={() => onToggle(orphan.key)}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function OrphanRow({
  orphan,
  base,
  checked,
  disabled,
  onToggle,
}: {
  orphan: Orphan;
  base: string;
  checked: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  const isImage = kindOf(orphan.key) === "image";

  return (
    <li className={cn("flex items-center gap-3 p-3", checked && "bg-muted/50")}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={onToggle}
        aria-label={`Select ${labelFor(orphan.key)}`}
      />
      <div className="bg-muted relative size-12 shrink-0 overflow-hidden rounded border">
        {isImage ? (
          <Image
            src={assetUrl(base, orphan.key)}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          <FileText className="text-muted-foreground absolute inset-0 m-auto size-5" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">{labelFor(orphan.key)}</p>
        <p className="text-muted-foreground truncate font-mono text-xs">{orphan.key}</p>
      </div>
      <div className="text-muted-foreground shrink-0 text-right text-xs">
        <p>{formatBytes(orphan.size)}</p>
        <p>{orphan.registered ? "in the site's index" : "not in the index"}</p>
      </div>
    </li>
  );
}

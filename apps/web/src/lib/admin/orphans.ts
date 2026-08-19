/**
 * Which objects on R2 nothing points at any more ([10]'s algorithm).
 *
 *   orphans = bucket \ (referenced ∪ protected folders)
 *
 * Pure, so the rule that decides what a screen offers to delete can be
 * exercised without a bucket, a repo or a network. Everything about it is
 * built to fail *towards* keeping a file:
 *
 *   - a reference set that came back suspiciously small means the scan broke,
 *     not that the site stopped using its photographs → refuse to report at all
 *   - anything uploaded in the last 30 days is left alone: uploads land on R2
 *     before the Publish that references them, and an Editor who uploads on
 *     Friday and publishes on Monday must not find the file gone
 *   - keys with no extension are folder markers, never objects to delete
 *
 * The two lists it returns are different problems. *Orphans* are bytes nothing
 * needs — waste. *Broken references* are manifest entries with no bytes behind
 * them — a live page with a hole in it, and the more urgent of the two.
 */

import { isProtectedKey } from "./protected-prefixes.ts";

export type BucketObject = {
  key: string;
  size: number;
  /** Epoch ms — R2's LastModified. */
  modifiedAt: number;
};

export type Orphan = {
  key: string;
  size: number;
  modifiedAt: number;
  /**
   * Whether the manifest still lists it. Registered orphans need the manifest
   * entry removed first (a revertible commit); unregistered ones — an upload
   * that was never published, or a photo already taken out of a gallery — can
   * go straight to the delete step.
   */
  registered: boolean;
  /** The folder it sits in, for grouping. */
  folder: string;
  /** How many other objects in that folder *are* in use. */
  siblingsInUse: number;
};

export type UsageReport = {
  objects: number;
  bytes: number;
  freeTierBytes: number;
};

export type OrphanReport = {
  usage: UsageReport;
  orphans: Orphan[];
  /** Manifest keys with no object behind them — broken images on live pages. */
  brokenReferences: string[];
  /** Bytes the orphan list would give back. */
  reclaimableBytes: number;
  heldBack: {
    /** Uploaded within the grace window. */
    recent: number;
    /** Folder markers and other extensionless keys. */
    markers: number;
  };
};

/** Cloudflare's free tier, and the whole reason this screen exists. */
export const FREE_TIER_BYTES = 10 * 1024 ** 3;

/** An upload gets this long to find its way into a Publish before it counts as waste. */
export const GRACE_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Below this many references, assume the scan is broken rather than the site.
 * Content alone contributes ~1,180 keys, so anything under four figures means
 * a content file failed to parse or a loader moved.
 */
export const MIN_REFERENCES = 1000;

export class ReferenceScanTooSmallError extends Error {
  readonly found: number;

  constructor(found: number) {
    super(
      `Only ${found} asset references were found (expected at least ${MIN_REFERENCES}). ` +
        "Refusing to call anything an orphan until that is explained.",
    );
    this.name = "ReferenceScanTooSmallError";
    this.found = found;
  }
}

export function folderOf(key: string): string {
  const cut = key.lastIndexOf("/");
  return cut === -1 ? "" : key.slice(0, cut + 1);
}

function hasExtension(key: string): boolean {
  return /\.[a-z0-9]+$/i.test(key);
}

export function findOrphans({
  objects,
  manifestKeys,
  referenced,
  now,
}: {
  objects: readonly BucketObject[];
  manifestKeys: readonly string[];
  referenced: ReadonlySet<string>;
  now: number;
}): OrphanReport {
  if (referenced.size < MIN_REFERENCES) {
    throw new ReferenceScanTooSmallError(referenced.size);
  }

  const registered = new Set(manifestKeys);
  const present = new Set(objects.map((object) => object.key));

  // A folder where everything is unused reads differently from one stray file
  // among photos a page still draws, so count the live siblings once up front.
  const inUsePerFolder = new Map<string, number>();
  for (const { key } of objects) {
    if (!isUnused(key, referenced)) {
      const folder = folderOf(key);
      inUsePerFolder.set(folder, (inUsePerFolder.get(folder) ?? 0) + 1);
    }
  }

  const orphans: Orphan[] = [];
  let bytes = 0;
  let recent = 0;
  let markers = 0;

  for (const object of objects) {
    bytes += object.size;

    if (!hasExtension(object.key)) {
      markers += 1;
      continue;
    }
    if (!isUnused(object.key, referenced)) continue;
    if (now - object.modifiedAt < GRACE_MS) {
      recent += 1;
      continue;
    }

    const folder = folderOf(object.key);
    orphans.push({
      key: object.key,
      size: object.size,
      modifiedAt: object.modifiedAt,
      registered: registered.has(object.key),
      folder,
      siblingsInUse: inUsePerFolder.get(folder) ?? 0,
    });
  }

  orphans.sort((a, b) => b.size - a.size || a.key.localeCompare(b.key));

  return {
    usage: { objects: objects.length, bytes, freeTierBytes: FREE_TIER_BYTES },
    orphans,
    brokenReferences: manifestKeys.filter((key) => !present.has(key)).sort(),
    reclaimableBytes: orphans.reduce((total, orphan) => total + orphan.size, 0),
    heldBack: { recent, markers },
  };
}

function isUnused(key: string, referenced: ReadonlySet<string>): boolean {
  return !referenced.has(key) && !isProtectedKey(key);
}

/**
 * How many objects one delete may take. Not a performance limit — a blast
 * radius. Twenty-five is a list a person can read before confirming it, and a
 * mistake at that size is a morning's re-upload rather than a lost archive.
 */
export const MAX_DELETIONS = 25;

/** And never more than a twentieth of the bucket in one go, whatever the cap says. */
export const MAX_DELETION_SHARE = 0.05;

export function deletionProblem({
  keys,
  orphans,
  bucketObjects,
}: {
  keys: readonly string[];
  /** The keys currently offered as orphans — nothing else may be deleted. */
  orphans: ReadonlySet<string>;
  bucketObjects: number;
}): string | null {
  if (keys.length === 0) return "Nothing was selected.";
  if (keys.length > MAX_DELETIONS) {
    return `Please delete at most ${MAX_DELETIONS} files at a time (${keys.length} were selected).`;
  }
  if (bucketObjects > 0 && keys.length > bucketObjects * MAX_DELETION_SHARE) {
    return `That is more than ${Math.round(MAX_DELETION_SHARE * 100)}% of everything in storage. Please do it in smaller batches.`;
  }
  const unknown = keys.filter((key) => !orphans.has(key));
  if (unknown.length > 0) {
    return `${unknown[0]} is in use, or is not on the list of unused files. Reload the page and try again.`;
  }
  return null;
}

/**
 * Sizes the way the storage screen says them out loud. Binary units, because
 * that is what Cloudflare counts the 10 GB allowance in — quoting 10.7 GB as
 * "10.7 GB" while the dashboard says 10.0 would be the one number on this
 * screen nobody could reconcile.
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`;
}

/** The subject line for an unregister commit. Kept under 72 characters. */
export function unregisterCommitMessage({
  count,
  editorName,
}: {
  count: number;
  editorName: string;
}): string {
  const name = editorName.replace(/\s+/g, " ").trim();
  const what = count === 1 ? "1 unused file" : `${count} unused files`;
  return `chore(assets): unregister ${what} via Admin\n\nRemoved by ${name}.`;
}

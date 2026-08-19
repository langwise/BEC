/**
 * The storage screen's server half ([12]): what is in the bucket, what nothing
 * points at, and the two steps that get rid of it.
 *
 * Deleting is the one thing in the Admin that cannot be undone, so it is split
 * in two ([10]'s two-phase delete):
 *
 *   1. **Unregister** — commit the manifest without those keys. The site stops
 *      offering them, the change is a line in git, and a mistake is `git revert`.
 *   2. **Delete** — remove the bytes, and only for keys the manifest no longer
 *      mentions. Refused outright otherwise, so no screen state, race or stale
 *      tab can put the two steps in the wrong order.
 *
 * Nothing the browser sends is trusted as a reason to delete: both steps
 * recompute the orphan set from a fresh sweep and accept only keys that are on
 * it. The request says *which* of the offered files to remove, never *that*
 * they are removable.
 */

import { invalidateAssetIndex, readAssetIndex } from "./asset-index.ts";
import { commitFiles, readRepoFile, type Commit } from "./github.ts";
import { MANIFEST_REPO_PATH, manifestCommitFiles } from "./manifest-sync.ts";
import {
  deletionProblem,
  findOrphans,
  unregisterCommitMessage,
  type OrphanReport,
} from "./orphans.ts";
import { readReferencedKeys } from "./references.ts";
import { deleteObjects, isR2Configured, listAllObjects } from "./r2.ts";

export type CleanupReport = OrphanReport & {
  /** R2 base URL, so the browser can draw a thumbnail of each candidate. */
  base: string;
};

export class R2UnavailableError extends Error {
  constructor() {
    super(
      "The Admin cannot reach the photo storage on this deployment. Ask the site administrator to check the R2 settings.",
    );
    this.name = "R2UnavailableError";
  }
}

/**
 * A sweep of ~2,950 objects plus a megabyte of content from GitHub. Cheap
 * enough to do on demand, wasteful to repeat while somebody reads the screen —
 * and every mutation asks for a fresh one anyway.
 */
const CACHE_MS = 60_000;

let cached: { at: number; report: CleanupReport } | null = null;

export async function readCleanupReport({
  fresh = false,
  now = Date.now(),
}: { fresh?: boolean; now?: number } = {}): Promise<CleanupReport> {
  if (!fresh && cached && now - cached.at < CACHE_MS) return cached.report;
  if (!isR2Configured()) throw new R2UnavailableError();

  const [objects, index, referenced] = await Promise.all([
    listAllObjects(),
    readAssetIndex(),
    readReferencedKeys(),
  ]);

  const report = {
    ...findOrphans({ objects, manifestKeys: index.keys, referenced, now }),
    base: index.base,
  };
  cached = { at: now, report };
  return report;
}

function invalidateCleanupReport(): void {
  cached = null;
}

export type CleanupResult =
  | { ok: true; commit: Commit | null; deleted: number }
  | { ok: false; error: string };

/** Phase one: take the keys out of the manifest, in one revertible commit. */
export async function unregisterOrphans({
  keys,
  editorName,
}: {
  keys: readonly string[];
  editorName: string;
}): Promise<CleanupResult> {
  const wanted = [...new Set(keys)];
  const report = await readCleanupReport({ fresh: true });

  const problem = deletionProblem({
    keys: wanted,
    orphans: new Set(report.orphans.map((orphan) => orphan.key)),
    bucketObjects: report.usage.objects,
  });
  if (problem) return { ok: false, error: problem };

  const index = await readAssetIndex();
  const manifest = await readRepoFile(MANIFEST_REPO_PATH);
  const files = manifestCommitFiles({
    manifestText: manifest.text,
    baseUrl: index.base,
    additions: [],
    removals: wanted,
  });

  // Everything selected was already unregistered — a screen left open while
  // somebody else did the same work. Not an error, and not worth a deploy.
  if (files.length === 0) {
    invalidateCleanupReport();
    return { ok: true, commit: null, deleted: 0 };
  }

  const commit = await commitFiles(
    files,
    unregisterCommitMessage({ count: wanted.length, editorName }),
  );

  invalidateAssetIndex();
  invalidateCleanupReport();
  return { ok: true, commit, deleted: 0 };
}

/**
 * Phase two: the bytes.
 *
 * Only for keys the manifest no longer lists — `registered` orphans are refused
 * by name rather than quietly unregistered first, because the point of the two
 * phases is that a deploy goes out between them and somebody can see the site
 * without those photos before the originals are gone.
 */
export async function deleteOrphans({
  keys,
}: {
  keys: readonly string[];
}): Promise<CleanupResult> {
  const wanted = [...new Set(keys)];
  const report = await readCleanupReport({ fresh: true });
  const offered = new Map(report.orphans.map((orphan) => [orphan.key, orphan]));

  const problem = deletionProblem({
    keys: wanted,
    orphans: new Set(offered.keys()),
    bucketObjects: report.usage.objects,
  });
  if (problem) return { ok: false, error: problem };

  const stillRegistered = wanted.filter((key) => offered.get(key)?.registered);
  if (stillRegistered.length > 0) {
    return {
      ok: false,
      error:
        stillRegistered.length === 1
          ? `${stillRegistered[0]} is still listed in the site's photo index. Take it out of the index first, and delete the file once that change is live.`
          : `${stillRegistered.length} of these are still listed in the site's photo index. Take them out first, and delete the files once that change is live.`,
    };
  }

  const { failed } = await deleteObjects(wanted);
  invalidateCleanupReport();

  if (failed.length > 0) {
    return {
      ok: false,
      error: `Storage refused to delete ${failed.length} of ${wanted.length} files (${failed[0]}). The rest were deleted.`,
    };
  }
  return { ok: true, commit: null, deleted: wanted.length };
}

import { listDepartments } from "@/content/departments";
import { invalidateAssetIndex, readAssetIndex } from "./asset-index.ts";
import { allGalleries, findGallery, galleryChangeProblem, galleryCommitMessage } from "./galleries.ts";
import { commitFiles, readRepoFile, type Commit } from "./github.ts";
import { MANIFEST_REPO_PATH, manifestCommitFiles } from "./manifest-sync.ts";
import { assetExists, isR2Configured } from "./r2.ts";

/**
 * Publishing a gallery ([11]).
 *
 * There is no content file here. A gallery is a folder, the page draws whatever
 * the manifest holds under its prefix, and so the manifest *is* the document —
 * adding a photo means registering the key an upload already put on R2, and
 * removing one means unregistering it. The bytes are never touched: a removal
 * is a commit that can be reverted, which is the first half of [10]'s two-phase
 * delete and the reason this screen is safe to give to staff.
 */

export type GalleryPublishResult =
  | { ok: true; unchanged: false; commit: Commit }
  /** Nothing the manifest did not already say — no commit, no deploy. */
  | { ok: true; unchanged: true; commit: null }
  | { ok: false; error: string };

export async function publishGalleryPhotos({
  prefix,
  add,
  remove,
  editorName,
}: {
  prefix: string;
  add: readonly string[];
  remove: readonly string[];
  editorName: string;
}): Promise<GalleryPublishResult> {
  const gallery = findGallery(allGalleries(listDepartments()), prefix);
  if (!gallery) return { ok: false, error: `"${prefix}" is not a gallery.` };

  const additions = [...new Set(add)];
  const removals = [...new Set(remove)];

  const problem = galleryChangeProblem({ gallery, add: additions, remove: removals });
  if (problem) return { ok: false, error: problem };
  if (additions.length === 0 && removals.length === 0) {
    return { ok: true, unchanged: true, commit: null };
  }

  // A key in the manifest is a promise that the URL resolves; the site has no
  // second check. Registering one whose bytes never made it would put a broken
  // image on a live page, so an upload that half-failed stops here.
  if (additions.length > 0) {
    if (!isR2Configured()) {
      return {
        ok: false,
        error:
          "The Admin cannot reach the photo storage on this deployment, so new photos cannot be published. Ask the site administrator to check the R2 settings.",
      };
    }
    const checked = await Promise.all(additions.map((key) => assetExists(key)));
    const missing = additions.filter((_, index) => !checked[index]);
    if (missing.length > 0) {
      return {
        ok: false,
        error:
          missing.length === 1
            ? "One of the photos did not finish uploading. Please add it again."
            : `${missing.length} of the photos did not finish uploading. Please add them again.`,
      };
    }
  }

  const index = await readAssetIndex();
  const manifest = await readRepoFile(MANIFEST_REPO_PATH);
  const files = manifestCommitFiles({
    manifestText: manifest.text,
    baseUrl: index.base,
    additions,
    removals,
  });

  // Re-adding a photo that is already registered, or removing one that never
  // was: real requests from a screen someone left open, and neither is worth a
  // commit or the two-minute deploy behind it.
  if (files.length === 0) return { ok: true, unchanged: true, commit: null };

  const commit = await commitFiles(
    files,
    galleryCommitMessage({
      gallery,
      added: additions.length,
      removed: removals.length,
      editorName,
    }),
  );

  // The manifest just changed under the cache; every picker on every screen
  // reads it, and a stale minute would hide a photo that is now live.
  invalidateAssetIndex();

  return { ok: true, unchanged: false, commit };
}

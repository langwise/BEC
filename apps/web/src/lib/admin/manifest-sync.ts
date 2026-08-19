/**
 * Keeping `asset-manifest.ts` in step with what content actually references.
 *
 * An upload PUTs its bytes to R2 and hands back a key, but does **not** commit
 * anything — committing per upload would spend a two-minute production deploy
 * on each photo, so ten gallery pictures would mean ten deploys. Instead the
 * Publish that references the new key registers it, and the whole thing —
 * manifest, asset-keys enum, content file — lands in one commit.
 *
 * Which keys to register is decided from the *document*, not from a list the
 * browser sends. A client-supplied list would have to be threaded through every
 * editor's state, and every editor could forget to. Reading it off the
 * submitted document is bookkeeping-free and self-healing: a key that somehow
 * missed its commit gets picked up by the next Publish that mentions it.
 *
 * The manifest is always rebuilt from repo HEAD plus these additions, never
 * from a bucket listing — a listing would resurrect keys the cleanup screen
 * deliberately pruned.
 */

import {
  MANIFEST_REPO_PATH,
  manifestKeys,
  renderManifest,
} from "../asset-manifest-io.ts";
import { isAssetKeyShaped } from "./asset-key.ts";
import type { CommitFile } from "./github.ts";

/** Where the generated asset-key enum lives, relative to the repo root. */
export const ASSET_KEYS_REPO_PATH = "apps/web/content/_schema/asset-keys.json";

export { MANIFEST_REPO_PATH };

/**
 * Every string in `data` that could be an asset key. Walks the whole document
 * rather than consulting the schema: the schema's `assetKey()` marker is not
 * reachable from a parsed value, and an over-broad candidate list costs only a
 * set lookup — nothing enters the manifest without existing on R2.
 */
export function collectKeyCandidates(data: unknown): Set<string> {
  const found = new Set<string>();
  const walk = (node: unknown): void => {
    if (typeof node === "string") {
      if (isAssetKeyShaped(node)) found.add(node);
      return;
    }
    if (Array.isArray(node)) {
      for (const item of node) walk(item);
      return;
    }
    if (node && typeof node === "object") {
      for (const value of Object.values(node)) walk(value);
    }
  };
  walk(data);
  return found;
}

/** Candidates the manifest has never heard of — the ones worth checking R2 for. */
export function unregisteredCandidates(
  data: unknown,
  known: Iterable<string>,
): string[] {
  const registered = new Set(known);
  return [...collectKeyCandidates(data)].filter((key) => !registered.has(key)).sort();
}

/** The asset-keys enum exactly as scripts/build-content-schema.mjs writes it. */
export function renderAssetKeys(keys: Iterable<string>): string {
  return `${JSON.stringify(
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "BEC asset key",
      description:
        "An image/PDF key that exists on R2 (see src/data/asset-manifest.ts). Regenerate with scripts/build-content-schema.mjs after uploading new assets.",
      type: "string",
      enum: [...keys].sort(),
    },
    null,
    2,
  )}\n`;
}

/**
 * The two generated files, rebuilt with `additions` folded in and `removals`
 * taken out. Returns an empty array when the result would be what is already
 * committed, so a caller can splice it into a commit without checking first.
 *
 * Removing is how a photo leaves a gallery ([11]): the site reads the manifest,
 * so an unregistered key is one the page stops drawing. The bytes stay on R2 —
 * this is the first half of [10]'s two-phase delete, and it is what makes the
 * mistake a `git revert` rather than a re-upload.
 */
export function manifestCommitFiles({
  manifestText,
  baseUrl,
  additions,
  removals = [],
}: {
  manifestText: string;
  baseUrl: string;
  additions: readonly string[];
  removals?: readonly string[];
}): CommitFile[] {
  if (additions.length === 0 && removals.length === 0) return [];

  const existing = manifestKeys(manifestText);
  const dropped = new Set(removals);
  const merged = [...new Set([...existing, ...additions])].filter(
    (key) => !dropped.has(key),
  );

  // Both renderers sort for themselves; if nothing survived that the manifest
  // did not already say, rewriting the files identically would produce a commit
  // that changes nothing. Element-wise, because an addition cancelled out by a
  // removal leaves the count unchanged and the contents different.
  const unchanged =
    merged.length === existing.length && merged.every((key, i) => key === existing[i]);
  if (unchanged) return [];

  return [
    { path: MANIFEST_REPO_PATH, content: renderManifest(merged, baseUrl) },
    { path: ASSET_KEYS_REPO_PATH, content: renderAssetKeys(merged) },
  ];
}

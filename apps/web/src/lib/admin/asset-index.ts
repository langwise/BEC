/**
 * What the picker browses: every asset key currently in the committed manifest,
 * read from repo HEAD.
 *
 * HEAD rather than this deployment's own bundled manifest, for the same reason
 * content is read from HEAD: an upload commits the manifest and the
 * reference together, so an editor who uploaded a photo two minutes ago must be
 * able to find it again before the next deploy finishes rolling out.
 */

import {
  MANIFEST_REPO_PATH,
  manifestBaseUrl,
  manifestKeys,
} from "../asset-manifest-io.ts";
import { readRepoFile } from "./github.ts";

// Picture-or-document lives in the Node-free module: this one reaches GitHub,
// and a client component that only wants to know which icon to draw must not
// pull that in behind it.
import { kindOf, type AssetKind } from "../asset-key-shape.ts";

export { kindOf, type AssetKind };

export type AssetIndex = {
  /** R2 base the manifest was generated against; the client builds URLs from it. */
  base: string;
  keys: string[];
};

/**
 * A minute of staleness. The manifest only changes when someone uploads, and
 * ~2,950 keys is a 500 KB read from GitHub — worth not repeating for every
 * picker on a page. Uploads clear it outright rather than waiting it out.
 */
const CACHE_MS = 60_000;

let cached: { at: number; index: AssetIndex } | null = null;
let inFlight: Promise<AssetIndex> | null = null;

/** Call after an upload commits, so the new key shows up immediately. */
export function invalidateAssetIndex(): void {
  cached = null;
}

async function load(): Promise<AssetIndex> {
  const { text } = await readRepoFile(MANIFEST_REPO_PATH);
  const base = manifestBaseUrl(text);
  if (!base) {
    throw new Error(`Could not read the R2 base URL from ${MANIFEST_REPO_PATH}`);
  }
  return { base, keys: manifestKeys(text) };
}

export async function readAssetIndex(now = Date.now()): Promise<AssetIndex> {
  if (cached && now - cached.at < CACHE_MS) return cached.index;
  // Several pickers mounting at once must not each fetch half a megabyte.
  if (!inFlight) {
    inFlight = load()
      .then((index) => {
        cached = { at: now, index };
        return index;
      })
      .finally(() => {
        inFlight = null;
      });
  }
  return inFlight;
}

export function filterByKind(keys: readonly string[], kind: AssetKind | "all"): string[] {
  if (kind === "all") return [...keys];
  return keys.filter((key) => kindOf(key) === kind);
}

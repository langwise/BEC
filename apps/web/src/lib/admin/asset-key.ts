/**
 * Minting the key a new upload lands at — keys are immutable.
 *
 * Replacing a photo never overwrites bytes at an existing key — R2's public
 * URLs are cached hard, and an in-place swap would show the old picture for an
 * unpredictable time, which an Editor experiences as "my change didn't work".
 * So every upload gets a fresh key, and the content file's reference moves to
 * it in the same Publish.
 *
 * Keys stay human-readable because they end up in content JSON that Pratik
 * reads in diffs: `governance/principal-photo-k3f9wq.webp`, not a bare hash.
 */

import { randomBytes } from "node:crypto";

// The shape rule lives outside this module because the site needs it too, and
// the site cannot import `node:crypto`.
export { ASSET_EXTENSIONS, isAssetKeyShaped } from "../asset-key-shape.ts";

/** A path segment, slugged the way every existing key already is. */
export function slugSegment(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A folder prefix with its trailing slash, every segment slugged. Returns ""
 * for anything that slugs away to nothing — callers decide whether the root is
 * acceptable (for uploads it is not).
 */
export function normalizeFolder(input: string): string {
  const segments = input.split("/").map(slugSegment).filter(Boolean);
  return segments.length ? `${segments.join("/")}/` : "";
}

const MAX_SLUG = 60;

/** The file-name half of a key: the uploaded name, slugged and kept short. */
export function slugFileName(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  const slug = slugSegment(withoutExtension).slice(0, MAX_SLUG).replace(/-+$/, "");
  return slug || "photo";
}

const SUFFIX_LENGTH = 6;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Six random characters — enough that two people uploading "photo.jpg" to the
 * same folder in the same minute do not collide, short enough that the key
 * still reads as a name. The route checks the manifest anyway.
 *
 * Rejection sampling rather than `% 36`, so every character is equally likely;
 * 256 is not a multiple of 36 and the lazy version would quietly favour a–d.
 */
export function randomSuffix(): string {
  const limit = 256 - (256 % ALPHABET.length);
  let out = "";
  while (out.length < SUFFIX_LENGTH) {
    for (const byte of randomBytes(SUFFIX_LENGTH * 2)) {
      if (byte >= limit) continue;
      out += ALPHABET[byte % ALPHABET.length];
      if (out.length === SUFFIX_LENGTH) break;
    }
  }
  return out;
}

export function mintAssetKey({
  folder,
  fileName,
  extension,
  suffix = randomSuffix(),
}: {
  folder: string;
  fileName: string;
  extension: string;
  suffix?: string;
}): string {
  const prefix = normalizeFolder(folder);
  return `${prefix}${slugFileName(fileName)}-${suffix}.${extension}`;
}

/**
 * What an R2 asset key looks like, as one rule.
 *
 * Two very different places need it: the Admin, deciding which strings in a
 * submitted document to register in the manifest, and the site, deciding
 * whether a News item's `link` is an attached PDF or an ordinary URL. Kept
 * free of any Node import so the second one can reach a client component
 * without dragging `node:crypto` into a browser bundle.
 */

/** Extensions the manifest has ever held, so a key is recognisable on sight. */
export const ASSET_EXTENSIONS = [
  "webp",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "avif",
  "svg",
  "pdf",
  "docx",
  "csv",
  "xlsx",
] as const;

const KEY_SHAPE = new RegExp(
  `^[a-z0-9][a-z0-9._/-]*\\.(${ASSET_EXTENSIONS.join("|")})$`,
  "i",
);

export type AssetKind = "image" | "document";

const IMAGE_EXTENSIONS = new Set(["webp", "jpg", "jpeg", "png", "gif", "avif", "svg"]);
const DOCUMENT_EXTENSIONS = new Set(["pdf", "docx", "csv", "xlsx"]);

/**
 * Whether a key is a picture or a document — which decides whether a screen
 * draws a thumbnail or a file icon, and which half of the library a picker
 * shows. Here rather than beside the Admin's manifest reader because the
 * browser needs it too, and that module reaches GitHub.
 */
export function kindOf(key: string): AssetKind | null {
  const extension = /\.([a-z0-9]+)$/i.exec(key)?.[1]?.toLowerCase();
  if (!extension) return null;
  if (IMAGE_EXTENSIONS.has(extension)) return "image";
  if (DOCUMENT_EXTENSIONS.has(extension)) return "document";
  return null;
}

/**
 * Whether a string looks like an asset key at all. Deliberately strict about
 * the things that mean "not a key": absolute paths, URLs, `..`.
 */
export function isAssetKeyShaped(value: string): boolean {
  if (value.length > 300 || value.includes("//") || value.includes("..")) return false;
  return KEY_SHAPE.test(value);
}

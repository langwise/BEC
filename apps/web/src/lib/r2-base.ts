/**
 * The public R2 origin every asset URL is built on.
 *
 * Its own module so a caller that needs only the origin — the admin picker
 * showing one thumbnail — can have it without importing asset-manifest.ts and
 * dragging ~3,000 entries into the bundle.
 */
export const R2_BASE =
  process.env.NEXT_PUBLIC_R2_BASE_URL ||
  "https://pub-11b7012f1df548e482ac3763e2712496.r2.dev";

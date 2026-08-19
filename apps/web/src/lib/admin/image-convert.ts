/**
 * Turning whatever an Editor picked into the WebP the site actually serves.
 *
 * The settings mirror what the local pipeline has produced for every asset
 * already on R2 (`sips` + `cwebp`: longest edge 2400, quality 80, never
 * upscale), so an admin upload is indistinguishable from a scripted one.
 * `.rotate()` first because sips baked EXIF orientation into the pixels and
 * sharp does not unless asked — without it, phone photos arrive sideways.
 *
 * The format is sniffed from the bytes, never from the browser's Content-Type:
 * a renamed .exe with an image MIME must fail here, not on the site.
 */

import sharp from "sharp";

export const MAX_EDGE = 2400;
export const WEBP_QUALITY = 80;

/** Raster formats sharp can decode that we are willing to accept. */
const ACCEPTED = new Set(["jpeg", "jpg", "png", "webp", "gif", "avif", "tiff", "heif"]);

export class UnsupportedImageError extends Error {
  constructor(detail: string) {
    super(detail);
    this.name = "UnsupportedImageError";
  }
}

export type ConvertedImage = {
  data: Buffer;
  width: number;
  height: number;
  bytes: number;
};

export async function toWebp(input: Buffer): Promise<ConvertedImage> {
  let format: string | undefined;
  try {
    ({ format } = await sharp(input).metadata());
  } catch {
    throw new UnsupportedImageError(
      "That file could not be read as a picture. If it came from an iPhone, open it and export as JPEG first.",
    );
  }

  if (!format || !ACCEPTED.has(format)) {
    throw new UnsupportedImageError(
      `That file is ${format ? `a ${format} file` : "not a picture"}, and only photos can go here.`,
    );
  }

  const { data, info } = await sharp(input)
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer({ resolveWithObject: true });

  return { data, width: info.width, height: info.height, bytes: data.length };
}

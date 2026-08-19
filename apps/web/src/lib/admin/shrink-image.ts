"use client";

/**
 * Getting a photo under Vercel's request-body cap before it is sent.
 *
 * The cap is 4.5 MB and not configurable (ADR 0004), while a modern phone
 * photo is routinely 6–12 MB. So the browser resizes first — but only when it
 * has to: a file that already fits is sent untouched, because the server
 * re-encodes to WebP anyway and shrinking here first would put a second lossy
 * pass on a picture that never needed one.
 */

/** The route's own limit, with room for the multipart envelope. */
const SERVER_LIMIT = 4 * 1024 * 1024;

/** Below this, send the original bytes and let the server do the only encode. */
const SEND_AS_IS = 3.5 * 1024 * 1024;

/** Matches the server's resize, so a shrunk photo is not resized twice. */
const MAX_EDGE = 2400;

/** High enough that the server's q80 pass is what actually sets the quality. */
const QUALITY_STEPS = [0.92, 0.82, 0.7, 0.6];

export class ImageTooLargeError extends Error {
  constructor() {
    super(
      "That photo is too large to send even after resizing. Please save a smaller copy and try again.",
    );
    this.name = "ImageTooLargeError";
  }
}

export class ImageUnreadableError extends Error {
  constructor() {
    super(
      "Your browser could not open that photo. If it came from an iPhone, open it and export as JPEG first.",
    );
    this.name = "ImageUnreadableError";
  }
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

/**
 * A version of `file` small enough to POST. Returns the original when it
 * already fits; throws with a sentence an Editor can act on when it cannot.
 */
export async function prepareImage(file: File): Promise<Blob> {
  if (file.size <= SEND_AS_IS) return file;

  let bitmap: ImageBitmap;
  try {
    // from-image so a phone's EXIF rotation is baked in here rather than lost
    // when the canvas throws the metadata away.
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new ImageUnreadableError();
  }

  try {
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));

    const context = canvas.getContext("2d");
    if (!context) throw new ImageUnreadableError();
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    for (const quality of QUALITY_STEPS) {
      const blob = await toBlob(canvas, quality);
      if (blob && blob.size <= SERVER_LIMIT) return blob;
    }
    throw new ImageTooLargeError();
  } finally {
    bitmap.close();
  }
}

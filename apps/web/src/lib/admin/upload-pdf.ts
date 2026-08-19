"use client";

/**
 * The browser half of a PDF upload (ADR 0004): ask the Admin for a key and a
 * signed URL, then PUT the file straight to R2. Two round trips, but the bytes
 * never pass through a function that would refuse anything over 4.5 MB.
 */

/** Mirrors the route's policy cap, so the browser can say no without a round trip. */
export const MAX_PDF_BYTES = 15 * 1024 * 1024;

type Presigned = { key: string; uploadUrl: string; contentType: string; url: string };

export class PdfUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PdfUploadError";
  }
}

/**
 * Uploads `file` and resolves to the asset key it landed at. The key is on R2
 * but not yet in the manifest — the Publish that references it registers it.
 */
export async function uploadPdf(file: File, folder: string): Promise<string> {
  if (!/\.pdf$/i.test(file.name)) {
    throw new PdfUploadError("Only PDF files can be attached.");
  }
  if (file.size > MAX_PDF_BYTES) {
    throw new PdfUploadError(
      `That file is ${Math.round(file.size / 1024 / 1024)} MB. Attachments have to be under 15 MB.`,
    );
  }

  const response = await fetch("/api/admin/upload/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: file.name, folder, bytes: file.size }),
  });
  const presigned = (await response.json().catch(() => ({}))) as Partial<Presigned> & {
    error?: string;
  };
  if (!response.ok || !presigned.uploadUrl || !presigned.key) {
    throw new PdfUploadError(presigned.error ?? "That file could not be uploaded.");
  }

  let put: Response;
  try {
    // The signature covers content type and length, so these headers are not
    // decoration — R2 rejects the PUT without them.
    put = await fetch(presigned.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": presigned.contentType ?? "application/pdf" },
      body: file,
    });
  } catch {
    // A network-level failure here is nearly always the bucket's CORS policy
    // refusing the browser, which reads as an unexplained failure otherwise.
    throw new PdfUploadError(
      "The file could not be sent to storage. Ask the site administrator to check the bucket's CORS settings.",
    );
  }

  if (!put.ok) {
    throw new PdfUploadError(
      `Storage refused the file (${put.status}). Please try again in a moment.`,
    );
  }

  return presigned.key;
}

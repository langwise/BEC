"use client";

import { prepareImage } from "./shrink-image.ts";

/**
 * The browser half of an image upload: shrink if the file is over the cap,
 * then post it to the function, which converts it to WebP and stores it.
 *
 * The counterpart of `upload-pdf.ts`. Both return an asset key that is on R2
 * but not yet in the manifest — the Publish that references it registers it —
 * so the picker can treat the two transports as one operation.
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  const body = new FormData();
  body.append("file", await prepareImage(file), file.name);
  body.append("folder", folder);

  const response = await fetch("/api/admin/upload", { method: "POST", body });
  const result = (await response.json().catch(() => ({}))) as {
    key?: string;
    error?: string;
  };
  if (!response.ok || !result.key) {
    throw new Error(result.error ?? "That photo could not be uploaded.");
  }
  return result.key;
}

/**
 * How many photos are in the air at once. A gallery is filled a folderful at a
 * time, and one-by-one would leave someone watching a bar for a minute; all
 * forty at once would open forty connections and time out the slowest. Three
 * keeps the function busy without either.
 */
const CONCURRENCY = 3;

export type BatchUpload = {
  /** Keys in the order the files were chosen. */
  keys: string[];
  failures: { name: string; message: string }[];
};

/**
 * Upload several photos, reporting each one as it lands.
 *
 * One failure does not cancel the rest: with thirty photos going up, a single
 * unreadable file must not throw away the twenty-nine that worked. They are
 * reported at the end, by name, so the Editor knows which to try again.
 */
export async function uploadImages(
  files: readonly File[],
  folder: string,
  onDone: (finished: number) => void,
): Promise<BatchUpload> {
  const keys: (string | null)[] = new Array(files.length).fill(null);
  const failures: BatchUpload["failures"] = [];
  let next = 0;
  let finished = 0;

  const worker = async (): Promise<void> => {
    while (next < files.length) {
      const index = next++;
      const file = files[index];
      try {
        keys[index] = await uploadImage(file, folder);
      } catch (error) {
        failures.push({
          name: file.name,
          message: error instanceof Error ? error.message : "That photo could not be uploaded.",
        });
      }
      onDone((finished += 1));
    }
  };

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));
  return { keys: keys.filter((key): key is string => key !== null), failures };
}

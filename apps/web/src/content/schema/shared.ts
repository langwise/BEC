import { z } from "zod";

/**
 * An R2 asset key (e.g. "departments/civil-engg/faculty/photo.webp"). Validated
 * as a plain string at runtime; the generated *.schema.json swaps this for a
 * $ref into content/_schema/asset-keys.json so editors autocomplete real keys.
 * The `assetKey: true` meta is the marker scripts/build-content-schema.mjs
 * looks for — it never reaches the emitted JSON Schema.
 */
export function assetKey(description?: string) {
  return z.string().meta({ assetKey: true, ...(description ? { description } : {}) });
}

/**
 * How wide a photo renders where the surrounding layout offers a choice.
 * "narrow" is the default banner width; the others exist because a few
 * departments' group shots are panoramas that read as a strip at that width.
 */
export const photoWidth = z.enum(["narrow", "medium", "wide", "full"]);
export type PhotoWidth = z.infer<typeof photoWidth>;

/**
 * A single captioned photo. One object rather than the `xImage` + `xImageCaption`
 * pair the content used to carry, so the editor has one field to render and a
 * caption can't outlive the photo it describes.
 */
export function photo(description?: string) {
  return z
    .strictObject({
      key: assetKey(),
      caption: z
        .string()
        .optional()
        .describe("Shown beneath the photo, e.g. \"Teaching Faculty\"."),
      alt: z
        .string()
        .optional()
        .describe(
          "What the photo shows, for a screen reader. Only needed where the surrounding page's own wording would describe it wrongly.",
        ),
      width: photoWidth
        .optional()
        .describe("Overrides the layout's default width for this photo."),
    })
    .describe(description ?? "A captioned photo.");
}
export type Photo = z.infer<ReturnType<typeof photo>>;

/** A downloadable document: display title + PDF asset key on R2. */
export const docRef = z.strictObject({
  title: z.string(),
  file: assetKey(),
});
export type DocRef = z.infer<typeof docRef>;

/** A free-form table: title + column headers + string rows. */
export const dataTable = z.strictObject({
  title: z.string(),
  columns: z.array(z.string()),
  rows: z.array(z.array(z.string())),
  collapsed: z
    .boolean()
    .optional()
    .describe("Render behind a collapsed disclosure (long rosters that would otherwise bury the section)."),
});
export type DataTable = z.infer<typeof dataTable>;

/**
 * Parse a content JSON file through its schema, failing with a readable error
 * (file name + JSON path + what's wrong) instead of a raw ZodError. Loaders
 * call this at module scope, so invalid content fails `next build` loudly.
 */
export function parseContent<T extends z.ZodType>(
  file: string,
  schema: T,
  data: unknown,
): z.output<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid content in content/${file}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

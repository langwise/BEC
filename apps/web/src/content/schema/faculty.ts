import { z } from "zod";
import { assetKey } from "./shared.ts";

/** Author-friendly flat faculty record — identity + optional portrait/CV asset keys. */
export const facultyEntrySchema = z.strictObject({
  name: z.string(),
  designation: z
    .string()
    .describe('e.g. "Professor & Head", "Associate Professor", "Assistant Professor".'),
  photo: assetKey(
    "Portrait asset key on R2 (autocompletes). Omit until a photo is uploaded; the card falls back to initials.",
  ).optional(),
  cv: assetKey(
    "Full profile / CV PDF asset key on R2 (autocompletes). Omit if no profile PDF is available; the card then has no modal.",
  ).optional(),
});

/** Schema for content/faculty.json — faculty directory keyed by department URL slug. */
export const facultyContentSchema = z.strictObject({
  $schema: z.string().optional(),
  departments: z
    .record(z.string(), z.array(facultyEntrySchema))
    .describe("Map of department URL slug -> faculty[]."),
});

export type FacultyEntry = z.infer<typeof facultyEntrySchema>;
export type FacultyContent = z.infer<typeof facultyContentSchema>;

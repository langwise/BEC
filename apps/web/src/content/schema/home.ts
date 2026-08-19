import { z } from "zod";
import { assetKey } from "./shared.ts";

/** Schema for content/home.json — the home page's hero, about and campus-life copy. */
export const homeContentSchema = z.strictObject({
  $schema: z.string().optional(),
  hero: z
    .array(
      z.strictObject({
        image: assetKey("Background image key (autocompletes from R2)."),
        title: z.string(),
        description: z.string(),
        fit: z
          .enum(["cover", "contain"])
          .optional()
          .describe(
            'How the image fills the slide. "cover" (default) crops to fill; "contain" shows the whole image (letterboxed).',
          ),
      }),
    )
    .describe("Full-screen carousel slides at the very top of the home page."),
  about: z
    .strictObject({
      image: assetKey(),
      established: z.string().describe('Big number shown on the image, e.g. "1963".'),
      establishedLabel: z.string(),
      slides: z
        .array(z.array(z.string()))
        .describe("Each entry is one carousel slide; each slide is a list of paragraphs."),
    })
    .describe("The 'About BEC' section: one image + the carousel of paragraphs."),
  campusLife: z
    .array(
      z.strictObject({
        image: assetKey(),
        title: z.string(),
        description: z.string(),
        className: z
          .string()
          .optional()
          .describe('Optional Tailwind grid span controlling the card size, e.g. "md:col-span-2 md:row-span-2".'),
      }),
    )
    .describe("The 'Student Life' feature cards near the bottom of the home page."),
});

export type HomeContent = z.infer<typeof homeContentSchema>;

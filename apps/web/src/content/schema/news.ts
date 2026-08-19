import { z } from "zod";
// Explicit extension: the schema build and the Node test runner resolve no aliases.
import { assetKey } from "./shared.ts";

/**
 * A scan shown under an item — a brochure, a programme card, an invitation.
 *
 * Separate from `link`, which is the one thing a *click on the title* does.
 * These are pictures the item is partly made of: the college sends a two-page
 * graduation-day scan and the announcement is those two pages, not a line of
 * text with a download beside it.
 */
const newsImageSchema = z.strictObject({
  key: assetKey(),
  alt: z
    .string()
    .min(1)
    .describe(
      "What the picture shows, for a reader using a screen reader and for when it fails to load.",
    ),
});

/**
 * One entry in either stream. News and Announcements share a shape but never a
 * list — they have different audiences and different pages (CONTEXT.md).
 */
export const newsItemSchema = z.strictObject({
  date: z
    .string()
    .min(1)
    .describe(
      'Either an ISO date ("2026-06-12"), rendered as "JUN 12, 2026", or a free-text period label used verbatim ("A.Y. 2026-27", "2025-26 EVEN SEM").',
    ),
  title: z.string().min(1),
  link: z
    .string()
    .min(1)
    .optional()
    .describe(
      'What opens when the item is clicked, in one of three forms: an attached file on R2 ("documents/news/notice-k3f9wq.pdf"), a site path ("/admissions"), or a full URL. Leave it out and the item renders as plain text.',
    ),
  pinned: z
    .boolean()
    .optional()
    .describe("Hold this item at the top of its stream, above the date order."),
  images: z
    .array(newsImageSchema)
    .min(1)
    .optional()
    .describe(
      "Scans shown beneath the item, side by side on a wide screen. Each opens full size in a new tab.",
    ),
});

/** Schema for content/news.json — the News and Announcements streams. */
export const newsContentSchema = z.strictObject({
  $schema: z.string().optional(),
  news: z
    .array(newsItemSchema)
    .describe("The News stream: /news and the left column of the home page section."),
  announcements: z
    .array(newsItemSchema)
    .describe(
      "The Announcements stream: /announcements and the right column of the home page section.",
    ),
});

export type NewsItem = z.infer<typeof newsItemSchema>;
export type NewsContent = z.infer<typeof newsContentSchema>;

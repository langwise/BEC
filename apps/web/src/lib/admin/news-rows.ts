import type { NewsContent, NewsItem } from "../../content/schema/news.ts";
import { newRowKey, move } from "./rows.ts";

// The generic array operations live in ./rows.ts, where every editor shares
// them; re-exported here so this module stays the one import a news screen needs.
export { newRowKey, move };

/**
 * The editor's working shape for a News/Announcement entry, and the conversions
 * to and from the published document. Kept out of the component so the rules
 * that decide what actually gets committed — empty link means no link, blank
 * space is trimmed, key order is stable — can be tested directly.
 */

export type Stream = "news" | "announcements";

/**
 * An item plus a `key` that exists only in the browser. Items have no id in the
 * JSON — an id would be a second thing to keep unique for no reader's benefit —
 * but React needs a handle that survives reordering, so one is minted on load
 * and thrown away on publish.
 */
/**
 * A scan under the item. No row handle: this list is add-and-remove only (an
 * item carries two or three scans, never a run to reorder), and the field that
 * would hold the handle is already `key` — the asset key — so minting one here
 * would publish `"row-7"` where a photo belongs. The same collision the
 * departments editor solved with a WeakMap; two-item lists do not need one.
 */
export type RowImage = { key: string; alt: string };

export type Row = {
  key: string;
  date: string;
  title: string;
  link: string;
  pinned: boolean;
  images: RowImage[];
};

export type Rows = Record<Stream, Row[]>;

export const STREAMS: readonly Stream[] = ["news", "announcements"];

export const STREAM_LABEL: Record<Stream, string> = {
  news: "News",
  announcements: "Announcements",
};

export function toRows(items: readonly NewsItem[]): Row[] {
  return items.map((item) => ({
    key: newRowKey(),
    date: item.date,
    title: item.title,
    link: item.link ?? "",
    pinned: item.pinned ?? false,
    images: item.images?.map((image) => ({ ...image })) ?? [],
  }));
}

export function toItems(rows: readonly Row[]): NewsItem[] {
  return rows.map((row) => ({
    date: row.date.trim(),
    title: row.title.trim(),
    // Absent rather than empty: `link: ""` is not a valid item, and "no link" is
    // exactly what a missing field means.
    ...(row.link.trim() ? { link: row.link.trim() } : {}),
    ...(row.pinned ? { pinned: true } : {}),
    // A picture with no key was added and never chosen — it is not a picture
    // yet, so it does not travel. A missing *caption* is left in, because the
    // schema then names it and the Editor is asked for one.
    ...(row.images.some((image) => image.key.trim())
      ? {
          images: row.images
            .filter((image) => image.key.trim())
            .map((image) => ({ key: image.key.trim(), alt: image.alt.trim() })),
        }
      : {}),
  }));
}

/**
 * The document that gets committed. `$schema` is carried through and stays
 * first so the file keeps its editor autocomplete and its diff stays minimal.
 */
export function toContent(rows: Rows, schemaRef: string | undefined): NewsContent {
  return {
    ...(schemaRef ? { $schema: schemaRef } : {}),
    news: toItems(rows.news),
    announcements: toItems(rows.announcements),
  };
}

export function rowsFromContent(content: NewsContent): Rows {
  return { news: toRows(content.news), announcements: toRows(content.announcements) };
}

/** Today in the browser's own timezone — `toISOString()` would be yesterday before 05:30 IST. */
export function today(now = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Which item still needs filling in, phrased for the editor, or undefined. */
export function firstIncompleteItem(rows: Rows): string | undefined {
  for (const stream of STREAMS) {
    const index = rows[stream].findIndex((row) => !row.title.trim() || !row.date.trim());
    if (index >= 0) {
      return `${STREAM_LABEL[stream]} item ${index + 1} still needs a date and a title.`;
    }
  }
  // Checked second, because a missing title is the more likely mistake and only
  // the first problem is reported. A chosen picture with no description would
  // otherwise be refused by the server with a message about `images[0].alt`.
  for (const stream of STREAMS) {
    for (const [index, row] of rows[stream].entries()) {
      const missing = row.images.findIndex((image) => image.key.trim() && !image.alt.trim());
      if (missing >= 0) {
        return `${STREAM_LABEL[stream]} item ${index + 1}: picture ${missing + 1} still needs a description.`;
      }
    }
  }
  return undefined;
}

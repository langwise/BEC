import data from "@content/news.json";
import { R2_BASE } from "@/lib/r2-base";
import { formatNewsDate } from "./news-date";
import { resolveLink } from "./news-link";
import type { NewsContent } from "./schema/news";

// Reaches client chunks (the home page section is a client component), so the
// Zod schema must not be imported here — see the note in ./home.ts.
const content = data as NewsContent;

/**
 * A stream entry as the public components want it: date already display-ready
 * and the link already resolved, so a renderer never has to know that a `link`
 * might be an R2 key rather than a URL.
 */
export type NewsListItem = {
  date: string;
  title: string;
  href?: string;
  /** Open in a new tab — true for attachments and off-site links. */
  external?: boolean;
  /** The link is a file on R2, not a page. */
  attachment?: boolean;
  pinned?: boolean;
  /** Scans shown beneath the item, already resolved to URLs. */
  images?: { src: string; alt: string }[];
};

function toListItems(items: NewsContent["news"]): NewsListItem[] {
  // Array order is the published order — what an editor arranges in the Admin is
  // what ships, rather than a sort the site quietly applies over the top.
  return items.map((item) => {
    const link = item.link ? resolveLink(item.link, R2_BASE) : null;
    return {
      date: formatNewsDate(item.date),
      title: item.title,
      ...(link ? { href: link.href } : {}),
      ...(link?.external ? { external: true } : {}),
      ...(link?.attachment ? { attachment: true } : {}),
      ...(item.pinned ? { pinned: true } : {}),
      // Same base-plus-key rule as an attachment, and for the same reason: this
      // module reaches client chunks, so `asset()` and its ~2,950-entry manifest
      // must not be imported here.
      ...(item.images
        ? {
            images: item.images.map(({ key, alt }) => ({
              src: `${R2_BASE.replace(/\/$/, "")}/${key}`,
              alt,
            })),
          }
        : {}),
    };
  });
}

export const newsItems: NewsListItem[] = toListItems(content.news);
export const announcementItems: NewsListItem[] = toListItems(content.announcements);

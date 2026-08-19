/**
 * What a News item's `link` means.
 *
 * One field, three modes (CONTEXT.md "Attachment"): an attached PDF on R2, an
 * ordinary link, or nothing at all. One field rather than three because an
 * Editor should be choosing "what happens when someone clicks this", not which
 * of several boxes to type in — the same reasoning that made `date` one field
 * in [05].
 *
 * Deliberately free of `asset()`: the home page's news section is a client
 * component, so anything this module imports ships to the browser, and
 * `asset()` carries the ~2,950-entry manifest. An attachment's URL is
 * `base + "/" + key` either way — the manifest lookup only adds a
 * does-it-exist check that the Publish path has already enforced.
 */

// Relative, with the extension, because the Node test runner resolves no aliases.
import { isAssetKeyShaped } from "../lib/asset-key-shape.ts";

export type LinkMode = "none" | "attachment" | "url";

/** Which of the three modes a stored `link` value is in. */
export function linkMode(link?: string): LinkMode {
  if (!link) return "none";
  return isAssetKeyShaped(link) ? "attachment" : "url";
}

export type ResolvedLink = {
  href: string;
  /** Opens in a new tab: attachments and off-site links both do. */
  external: boolean;
  /** A file on R2 rather than a page — the UI marks these differently. */
  attachment: boolean;
};

export function resolveLink(link: string, base: string): ResolvedLink {
  if (isAssetKeyShaped(link)) {
    return { href: `${base.replace(/\/$/, "")}/${link}`, external: true, attachment: true };
  }
  const offSite = /^https?:\/\//i.test(link);
  return { href: link, external: offSite, attachment: false };
}

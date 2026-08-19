import type { Metadata } from "next";
import { NotFoundContent } from "@/components/common/not-found-content";
import { SiteChrome } from "@/components/site-chrome";
import { SITE_SHORT_NAME } from "@/lib/seo";

/**
 * Lives at the app root, above the `(site)` group, so it also catches URLs that
 * match no segment at all — which means it renders the public chrome itself
 * rather than inheriting it from the site layout.
 *
 * It carries its own title too, for the same reason: nothing above this file
 * sets one. No canonical and no Open Graph card, deliberately — Next already
 * marks this page `noindex`, and a page that is not a page has nothing to be
 * the canonical of and nothing worth previewing when shared.
 */
export const metadata: Metadata = {
  title: `Page not found | ${SITE_SHORT_NAME}`,
  description: "This page could not be found on the Basaveshwar Engineering College website.",
};

export default function NotFoundPage() {
  return (
    <SiteChrome>
      <NotFoundContent />
    </SiteChrome>
  );
}

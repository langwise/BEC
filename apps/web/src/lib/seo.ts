import type { Metadata } from "next";

/**
 * Canonical production origin. Override per-environment with NEXT_PUBLIC_SITE_URL
 * (e.g. a preview/staging deploy) — falls back to the launch domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://becbgk.edu"
).replace(/\/$/, "");

export const SITE_NAME = "Basaveshwar Engineering College, Bagalkote";
export const SITE_SHORT_NAME = "BEC Bagalkote";

/** Source-verified institutional facts (footer, About, BVV Sangha pages). */
export const ORG = {
  legalName: "Basaveshwar Engineering College (Autonomous), Bagalkote",
  alternateName: ["BEC", "BEC Bagalkote", "Basaveshwar Engineering College"],
  foundingYear: "1963",
  parentOrganization: "B.V.V. Sangha",
  affiliation: "Visvesvaraya Technological University (VTU), Belagavi",
  email: "principal@becbgk.edu",
  telephone: ["+91-8354-234060", "+91-8354-234204"],
  address: {
    street: "S. Nijalingappa Vidyanagar",
    city: "Bagalkote",
    region: "Karnataka",
    postalCode: "587102",
    country: "IN",
  },
  geo: { latitude: 16.1726, longitude: 75.6557 },
  sameAs: [
    "https://www.facebook.com/BEC1963",
    "https://x.com/1963Bec",
    "https://www.instagram.com/becbgk_official/",
    "https://www.linkedin.com/in/basaveshwar-engineering-college-bagalkote-karnataka-india-957a34206",
    "https://becbgk.irins.org/",
  ],
} as const;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Per-page metadata helper. Sets a canonical URL from `path` and applies the
 * page title/description to OpenGraph + Twitter so every page shares one source
 * of truth. `metadataBase` and global OG defaults live in the root layout.
 */
type OGImages = NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  images?: OGImages;
}): Metadata {
  const { title, description, path, images } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      ...(images ? { images } : {}),
    },
    twitter: {
      title,
      description,
    },
  };
}

import { ORG, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

/**
 * Site-wide entity anchor for search + AI engines. Rendered once in the root
 * layout. `@id` is reused by other schema (breadcrumbs, courses) so engines
 * resolve a single canonical organization entity.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: ORG.legalName,
    alternateName: ORG.alternateName,
    url: SITE_URL,
    logo: absoluteUrl("/logo.png"),
    foundingDate: ORG.foundingYear,
    parentOrganization: { "@type": "Organization", name: ORG.parentOrganization },
    ...(ORG.email ? { email: ORG.email } : {}),
    telephone: ORG.telephone[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.address.street,
      addressLocality: ORG.address.city,
      addressRegion: ORG.address.region,
      postalCode: ORG.address.postalCode,
      addressCountry: ORG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ORG.geo.latitude,
      longitude: ORG.geo.longitude,
    },
    sameAs: ORG.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

/** Serialize a JSON-LD object into a script tag (server component). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type Crumb = { name: string; path: string };

/**
 * BreadcrumbList for an inner page. Always pass the trail in order, e.g.
 * [{name:"Departments",path:"/departments"}, {name:"CSE",path:"/departments/ug/cse"}].
 */
export function BreadcrumbsJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", path: "/" },
      ...items,
    ].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * An academic programme/department offered by BEC. Links back to the site-wide
 * organization entity so engines resolve one provider.
 */
export function ProgramJsonLd({
  name,
  description,
  path,
  credential,
}: {
  name: string;
  description?: string;
  path: string;
  credential?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name,
    ...(description ? { description } : {}),
    url: absoluteUrl(path),
    ...(credential ? { educationalCredentialAwarded: credential } : {}),
    provider: {
      "@type": "CollegeOrUniversity",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
  };
  return <JsonLd data={data} />;
}

type QA = { question: string; answer: string };

/** FAQPage schema — pair with a visible FAQ section on the page. */
export function FaqJsonLd({ items }: { items: QA[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer },
    })),
  };
  return <JsonLd data={data} />;
}

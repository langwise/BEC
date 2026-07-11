import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NBA Accreditation",
  description:
    "National Board of Accreditation (NBA) programme accreditation certificates for BEC Bagalkote, covering Civil, Computer Science, Electronics & Communication, Mechanical, Information Science, Electrical & Electronics Engineering and Biotechnology.",
  path: "/accreditation/nba",
});

export default function NbaPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Accreditation"
        title="NBA Accreditation"
        description={
          <span className="block text-justify">
            The undergraduate programmes in Biotechnology, Civil Engineering, Computer Science and Engineering, Electronics and Communication Engineering, Electrical and Electronics Engineering, Mechanical Engineering, and Information Science and Engineering are currently accredited by the National Board of Accreditation (NBA). The programme-wise NBA accreditation certificates reflect the institution&apos;s commitment to Outcome-Based Education (OBE), quality assurance, continuous improvement and academic excellence.
          </span>
        }
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "Accreditation Certificates",
              documents: [
                { title: "Civil, Computer Science, Electronics & Communication and Mechanical Engineering — 2025–26 to 30 June 2028", url: asset("documents/nba/nba-civil-cse-ece-mech-2025-2028.pdf") },
                { title: "Information Science & Engineering (ISE) — 2023–24 to 30 June 2026", url: asset("documents/nba/nba-ise-2023-2026.pdf") },
                { title: "Electrical & Electronics Engineering and Biotechnology — 2022–23 to 30 June 2025", url: asset("documents/nba/nba-eee-bt-2022-2025.pdf") },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}

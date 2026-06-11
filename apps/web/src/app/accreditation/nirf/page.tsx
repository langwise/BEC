import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NIRF Rankings",
  description:
    "National Institutional Ranking Framework (NIRF) submissions for BEC Bagalkote — Engineering, Overall and Innovation data filed year on year from 2018-19 to 2025.",
  path: "/accreditation/nirf",
});

export default function NirfPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Rankings"
        title="NIRF Rankings"
        description="Data submitted to the National Institutional Ranking Framework (NIRF), Ministry of Education, Government of India. Engineering, Overall and Innovation submissions are published year on year below."
        badges={[{ label: "NIRF Participant" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "2025",
              documents: [
                { title: "Engineering", url: asset("documents/nirf/nirf-25-engg.pdf") },
                { title: "Overall", url: asset("documents/nirf/nirf-25-overall.pdf") },
                { title: "Innovation", url: asset("documents/nirf/nirf-25-innovation.pdf") },
              ],
            },
            {
              label: "2023",
              documents: [
                { title: "Engineering", url: asset("documents/nirf/nirf-engg-report-submitted-20-01-2023.pdf") },
                { title: "Overall", url: asset("documents/nirf/nirf-overall-submitted-20-01-2023.pdf") },
              ],
            },
            {
              label: "2022",
              documents: [
                { title: "Engineering", url: asset("documents/nirf/nirf-22-engg-report.pdf") },
                { title: "Overall", url: asset("documents/nirf/nirf-22-overall-report.pdf") },
              ],
            },
            {
              label: "2021",
              documents: [
                { title: "Engineering", url: asset("documents/nirf/nirf-21-engg-report.pdf") },
                { title: "Overall", url: asset("documents/nirf/nirf-21-overall-report.pdf") },
              ],
            },
            {
              label: "2020",
              documents: [
                { title: "Engineering", url: asset("documents/nirf/nirf-20-engg-submitted.pdf") },
                { title: "Overall", url: asset("documents/nirf/nirf-20-overall-submitted.pdf") },
              ],
            },
            {
              label: "2018–19",
              documents: [
                { title: "Engineering", url: asset("documents/nirf/nirf-engg-submitted-18-19.pdf") },
                { title: "Overall", url: asset("documents/nirf/nirf-overall-submitted-18-19.pdf") },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}

import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";
import { Mail } from "lucide-react";

export const metadata = pageMetadata({
  title: "NIRF Rankings",
  description:
    "National Institutional Ranking Framework (NIRF) submissions for BEC Bagalkote — Engineering, Overall and Innovation data filed year on year from 2018-19 to 2026.",
  path: "/accreditation/nirf",
});

export default function NirfPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Rankings"
        title="NIRF Rankings"
        description="Data submitted to the National Institutional Ranking Framework (NIRF), Ministry of Education, Government of India. Engineering, Overall and Innovation submissions are published year on year below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "2026",
              documents: [
                { title: "Engineering", url: asset("documents/nirf/nirf-26-engg.pdf") },
                { title: "Overall", url: asset("documents/nirf/nirf-26-overall.pdf") },
                { title: "Innovation", url: asset("documents/nirf/nirf-26-innovation.pdf") },
              ],
            },
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

        <div className="mt-16 border-t pt-10">
          <div className="rounded-xl border border-muted bg-stone-50/50 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                Comments & Feedback
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                As per the NIRF guidelines, we welcome comments, feedback, and suggestions regarding the published Data Capturing System (DCS) reports. Please feel free to reach out to us at our official email address:{" "}
                <a
                  href="mailto:becprincipal@yahoo.com?subject=Comments%20%26%20Feedback%20on%20NIRF%20Data"
                  className="font-semibold text-primary hover:underline"
                >
                  becprincipal@yahoo.com
                </a>
              </p>
            </div>
            <a
              href="mailto:becprincipal@yahoo.com?subject=Comments%20%26%20Feedback%20on%20NIRF%20Data&body=Dear%20Principal%2C%0A%0AI%20would%20like%20to%20provide%20the%20following%20comments%2Ffeedback%20regarding%20the%20published%20NIRF%20DCS%20data%3A%0A%0A%5BYour%20Feedback%20Here%5D%0A%0ARegards%2C%0A%5BYour%20Name%5D"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/95 px-6 text-sm font-semibold tracking-wide shadow-sm shrink-0"
            >
              Send Feedback
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

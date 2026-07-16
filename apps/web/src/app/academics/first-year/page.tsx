import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BE First-Year Scheme & Syllabus",
  description:
    "Download BE first-year (I & II semester) scheme and syllabus PDFs at BEC Bagalkote, grouped by stream — Civil, CSE, EC, EE, Mechanical — across scheme years 2017-18 to 2023-24.",
  path: "/academics/first-year",
});

export default function FirstYearSyllabusPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Academics"
        title="First-Year Syllabus"
        description="Scheme and syllabus for the BE first year (I & II semester), grouped by stream and academic year."
        badges={[{ label: "BE I & II Semester" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "2026–27 Scheme & Syllabus",
              documents: [
                { title: "Scheme of Teaching 1st Semester 2026-27", url: asset("documents/first-year/scheme-of-teaching-1st-semester-2026-27.pdf") },
                { title: "Scheme of Teaching 2nd Semester 2026-27", url: asset("documents/first-year/scheme-of-teaching-2nd-semester-2026-27.pdf") },
                { title: "First Year Syllabus 2026-27", url: asset("documents/first-year/first-year-syllabus-2026-27.pdf") },
              ],
            },
            {
              label: "2023–24 Scheme & Syllabus",
              documents: [
                { title: "Civil Stream", url: asset("documents/first-year/first-year-syllabus-civil-2023-24-9-9-2023.pdf") },
                { title: "CSE Stream", url: asset("documents/first-year/first-year-syllabus-cse-2023-24-9-9-2023.pdf") },
                { title: "EC & EE Streams", url: asset("documents/first-year/first-year-syllabus-ec-and-ee-2023-24-9-9-2023.pdf") },
                { title: "Mechanical Stream", url: asset("documents/first-year/first-year-syllabus-mechanical-2023-24-9-9-2023.pdf") },
              ],
            },
            {
              label: "2022–23 Scheme & Syllabus",
              documents: [
                { title: "Civil Stream", url: asset("documents/first-year/be-1st-year-scheme-and-syllabi-of-civil-stream-22-23.pdf") },
                { title: "CSE Stream", url: asset("documents/first-year/be-1st-year-scheme-and-syllabi-of-cse-stream-22-23.pdf") },
                { title: "EE Stream", url: asset("documents/first-year/be-1st-year-scheme-and-syllabi-of-ee-stream-22-23.pdf") },
                { title: "ME Stream", url: asset("documents/first-year/be-1st-year-scheme-and-syllabi-of-me-stream-22-23.pdf") },
                { title: "Samskruthika Kannada & Balake Kannada", url: asset("documents/first-year/syllabus-of-samskruthika-kannada-and-balakekannada-for-all-the-stream-of-be-1st-year-22-23.pdf") },
              ],
            },
            {
              label: "Earlier Schemes (BE I & II Semester)",
              documents: [
                { title: "2021–22", url: asset("documents/first-year/be-i-ii-semester-scheme-and-syllabus-2021-22.pdf") },
                { title: "2020–21", url: asset("documents/first-year/be-i-ii-semester-scheme-and-syllabus-2020-21.pdf") },
                { title: "2019–20", url: asset("documents/first-year/be-i-ii-semester-scheme-and-syllabus-2019-20.pdf") },
                { title: "2018–19", url: asset("documents/first-year/be-i-ii-semester-scheme-and-syllabus-2018-19.pdf") },
                { title: "2017–18", url: asset("documents/first-year/be-i-ii-semester-scheme-and-syllabus-2017-18.pdf") },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}

import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "TEQIP-III Programme",
  description:
    "TEQIP-III records at BEC Bagalkote, the World Bank-assisted quality programme: institutional development plan, performance audit reports, academic calendars, AQARs and MoUs.",
  path: "/accreditation/teqip",
});

export default function TeqipPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Quality Improvement"
        title="TEQIP"
        description="The Technical Education Quality Improvement Programme (TEQIP-III), a World Bank-assisted initiative of the Government of India, supported infrastructure, research and academic quality at the college. The programme's plans, audit reports, calendars and agreements are published below."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "Programme Documents",
              documents: [
                { title: "Institutional Development Plan (TEQIP-III)", url: asset("documents/teqip/idp-teqip-iii.pdf") },
                { title: "Guidelines", url: asset("documents/teqip/guidelines.pdf") },
                { title: "Environmental Action Plan (EAP)", url: asset("documents/teqip/eap.pdf") },
                { title: "Academic Activities", url: asset("documents/teqip/academic-activities.pdf") },
                { title: "Procurement", url: asset("documents/teqip/procurement.pdf") },
              ],
            },
            {
              label: "Performance Audit Reports (PAR)",
              documents: [
                { title: "PAR 2018–19", url: asset("documents/teqip/par-2018-19.pdf") },
                { title: "PAR 2019–20", url: asset("documents/teqip/par-2019-20.pdf") },
                { title: "PAR 2020–21", url: asset("documents/teqip/par-2020-21.pdf") },
              ],
            },
            {
              label: "Academic Calendars",
              documents: [
                { title: "Academic Calendar 2017–18", url: asset("documents/teqip/academic-calender-2017-18.pdf") },
                { title: "Academic Calendar 2018–19", url: asset("documents/teqip/academic-calender-2018-19.pdf") },
                { title: "Academic Calendar 2019–20", url: asset("documents/teqip/academic-calender-19-20.pdf") },
              ],
            },
            {
              label: "Quality Reports (AQAR)",
              documents: [
                { title: "AQAR 2017–18", url: asset("documents/teqip/aqar-2017-18-18-03-2020.pdf") },
                { title: "AQAR 2018–19", url: asset("documents/teqip/aqar-2018-19-18-03-2020.pdf") },
              ],
            },
            {
              label: "MoUs & Research",
              documents: [
                { title: "Memorandum of Understanding", url: asset("documents/teqip/mou.pdf") },
                { title: "MoU — BEC & GBC (15 May 2025)", url: asset("documents/teqip/mou-bec-gbc-15-5-25.pdf") },
                { title: "Research Scholars' Assistantship List", url: asset("documents/teqip/research-scholars-assitantship-list.pdf") },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}

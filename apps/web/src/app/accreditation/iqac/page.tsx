import { PageHero } from "@/components/common/page-hero";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Internal Quality Assurance Cell (IQAC)",
  description:
    "IQAC at BEC Bagalkote drives quality enhancement: Annual Quality Assurance Reports (AQAR), action-taken reports, academic calendars, meeting records and member lists.",
  path: "/accreditation/iqac",
});

export default function IqacPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Quality Assurance"
        title="Internal Quality Assurance Cell (IQAC)"
        description="The IQAC drives continuous quality enhancement at Basaveshwar Engineering College. Annual Quality Assurance Reports (AQAR), action-taken reports, academic calendars, meeting records and the cell's composition are published below."
        badges={[{ label: "IQAC" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <DocumentDirectory
          groups={[
            {
              label: "Annual Quality Assurance Reports (AQAR)",
              documents: [
                { title: "AQAR 2017–18", url: asset("documents/iqac/aqar-2017-18.pdf") },
                { title: "AQAR 2018–19", url: asset("documents/iqac/aqar-2018-19.pdf") },
                { title: "AQAR 2019–20", url: asset("documents/iqac/aqar-2019-20.pdf") },
                { title: "AQAR 2020–21", url: asset("documents/iqac/aqar-2020-21.pdf") },
                { title: "AQAR 2023–24", url: asset("documents/iqac/aqar-2023-24-report.pdf") },
              ],
            },
            {
              label: "Action Taken Reports",
              documents: [
                { title: "Action Taken Report 2019–20", url: asset("documents/iqac/action-taken-report-2019-20.pdf") },
                { title: "Action Taken Report 2020–21", url: asset("documents/iqac/action-taken-report-2020-21.pdf") },
              ],
            },
            {
              label: "Academic Calendars",
              documents: [
                { title: "Academic Calendar 2017–18", url: asset("documents/iqac/academic-calender-2017-18.pdf") },
                { title: "Academic Calendar 2018–19", url: asset("documents/iqac/academic-calender-2018-19.pdf") },
                { title: "Academic Calendar 2019–20", url: asset("documents/iqac/academic-calender-19-20.pdf") },
                { title: "Academic Calendar 2020–21", url: asset("documents/iqac/academic-calender-2020-21.pdf") },
                { title: "Academic Calendar 2021–22", url: asset("documents/iqac/2021-22-academic-calenders.pdf") },
                { title: "Academic Calendar 2022–23", url: asset("documents/iqac/2022-23-academic-calenders.pdf") },
                { title: "Academic Calendar 2023–24", url: asset("documents/iqac/2023-24-academic-calenders.pdf") },
              ],
            },
            {
              label: "IQAC Meetings — Agenda & Resolutions",
              documents: [
                { title: "Meeting Agenda — 26 Apr 2018", url: asset("documents/iqac/iqac-meeeting-agenda-26-04-2018.pdf") },
                { title: "Meeting Resolutions — 26 Apr 2018", url: asset("documents/iqac/iqac-meeeting-resolutions-26-04-2018.pdf") },
                { title: "Meeting Agenda — 02 Nov 2018", url: asset("documents/iqac/iqac-meeting-agenda-2-11-2018-1.pdf") },
                { title: "Meeting Resolutions — 02 Nov 2018", url: asset("documents/iqac/iqac-meeting-resolutions-2-11-2018.pdf") },
                { title: "Meeting Agenda — 05 Oct 2020", url: asset("documents/iqac/iqac-agenda-5-10-2020.pdf") },
                { title: "Meeting Resolutions — 05 Oct 2020", url: asset("documents/iqac/iqac-resolutions-5-10-2020.pdf") },
                { title: "IQAC Meeting — 25 Sep 2021", url: asset("documents/iqac/iqac-meeting-1-25-09-2021.pdf") },
                { title: "IQAC Meeting — 04 Apr 2025", url: asset("documents/iqac/iqac-meeting-04-04-2025.pdf") },
              ],
            },
            {
              label: "IQAC Members",
              documents: [
                { title: "IQAC Members List", url: asset("documents/iqac/members-list.pdf") },
                { title: "IQAC Members List (Earlier)", url: asset("documents/iqac/iqac-members-list1.pdf") },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}

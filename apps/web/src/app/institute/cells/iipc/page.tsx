import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title:
    "Industry-Institute Partnership Cell (IIPC) | Basaveshwar Engineering College, Bagalkote",
  description:
    "The Industry-Institute Partnership Cell (IIPC) at Basaveshwar Engineering College, Bagalkote — the college's interface with industry through guest lectures, internships, live projects, consultancy and industry-academia conclaves.",
};

const objectives = [
  "Strengthen linkages and expertise between industry and the institution",
  "Align students with current industry expectations",
  "Extend faculty consultancy services in both directions — institute-to-industry and industry-to-institute",
  "Identify collaborative research opportunities",
  "Improve UG and PG placement prospects",
  "Develop MoUs between industry and the institute",
];

const activities = [
  "Industrial guest lectures and workshops",
  "Internships and industrial live projects",
  "Joint research and consultancy",
  "Curriculum framing by industry experts",
  "Industrial visits",
];

const conclaves = [
  { no: 1, location: "Bangalore", date: "13 Mar 2016", participants: 72 },
  { no: 2, location: "Pune", date: "24 Apr 2016", participants: 68 },
  { no: 3, location: "Hyderabad", date: "26 Jul 2016", participants: 36 },
  { no: 4, location: "Goa", date: "17 Sep 2016", participants: 24 },
  { no: 5, location: "Mumbai", date: "17 Dec 2016", participants: 36 },
  { no: 6, location: "BEC & Government officials", date: "22 Dec 2016", participants: 14 },
  { no: 7, location: "BEC, Bagalkot", date: "11 Feb 2017", participants: 40 },
  { no: 8, location: "Bangalore", date: "13 Jul 2019", participants: 76 },
];

const members = [
  { name: "Dr. (Smt.) D. S. Jangamshetti", role: "Chairman", tone: "primary" as const },
  { name: "Dr. Sanjay Hanji", role: "Coordinator", tone: "primary" as const },
  {
    name: "Dr. Ashok V. Sutagundar",
    role: "Member",
    tone: "muted" as const,
    photo: asset("departments/ece/faculty/ashok-v-sutagundar.webp"),
  },
  { name: "Dr. B. R. Endigeri", role: "Member", tone: "muted" as const },
  {
    name: "Dr. S. V. Saboji",
    role: "Member",
    tone: "muted" as const,
    photo: asset("departments/cse/faculty/s-v-saboji.webp"),
  },
  { name: "Prof. R. A. Patil", role: "Member", tone: "muted" as const },
  { name: "Prof. R. S. Allurkar", role: "Member", tone: "muted" as const },
  {
    name: "Dr. G. B. Megeri",
    role: "Member",
    tone: "muted" as const,
    photo: asset("departments/civil/faculty/gangadhar-b-megeri.webp"),
  },
  {
    name: "Dr. S. Y. Goudappanavar",
    role: "Member",
    tone: "muted" as const,
    photo: asset("departments/eee/faculty/sangamesh-y-goudappanavar.webp"),
  },
  {
    name: "Dr. Adarsh Chatra",
    role: "Member",
    tone: "muted" as const,
    photo: asset("departments/civil/faculty/adarsh-s-chatra.webp"),
  },
];

export default function IipcPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Industry Connect"
        title="Industry-Institute Partnership Cell (IIPC)"
        description="The IIPC is the college's interface with industry — facilitating close industry-institute interaction and bridging the gap between academia and the corporate sector."
        badges={[{ label: "8 Industry-Academia Conclaves" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <SectionHeading eyebrow="About" title="Bridging academia and industry" />
            <p className="text-base leading-relaxed text-gray-700">
              The Industry-Institute Partnership Cell facilitates close
              interaction between the college and industry, bridging gaps between
              academia and the corporate sector. It promotes industry-institute
              linkages through guest lectures, training, internships, industrial
              visits and collaborative research.
            </p>
          </div>
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100">
            <Image
              src={asset("cells/iipc/bec-iipc-cell-photo.webp")}
              alt="The Industry-Institute Partnership Cell at Basaveshwar Engineering College"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Objectives</h3>
            <ul className="mt-4 space-y-3">
              {objectives.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Activities</h3>
            <ul className="mt-4 space-y-3">
              {activities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Outreach"
            title="Industry-Academia Conclaves"
            description="Conclaves convened across major industrial hubs to connect the college with prospective recruiters and collaborators."
          />
          <div className="overflow-x-auto rounded-md border border-stone-200 shadow-sm">
            <table className="w-full min-w-[34rem] border-collapse bg-white text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-gray-700">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 text-right font-semibold">Industry Participants</th>
                </tr>
              </thead>
              <tbody>
                {conclaves.map((c) => (
                  <tr key={c.no} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3 text-gray-500">{c.no}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{c.location}</td>
                    <td className="px-4 py-3 text-gray-700">{c.date}</td>
                    <td className="px-4 py-3 text-right font-semibold text-primary">
                      {c.participants}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="The Cell" title="Members" />
          <PersonGrid>
            {members.map((m) => (
              <PersonCard
                key={m.name}
                name={m.name}
                photo={m.photo}
                badges={[{ label: m.role, tone: m.tone }]}
              />
            ))}
          </PersonGrid>
          <div className="rounded-md border border-stone-200 bg-orange-50/60 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
              Coordinator
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Dr. Sanjay Hanji</p>
            <p className="text-sm text-gray-700">Coordinator, Industry-Institute Partnership Cell</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
              <span>
                Mobile:{" "}
                <a href="tel:+919980871717" className="font-medium text-primary hover:underline">
                  +91 99808 71717
                </a>
              </span>
              <span>
                Email:{" "}
                <a
                  href="mailto:sanjayhanji_94@rediffmail.com"
                  className="font-medium text-primary hover:underline"
                >
                  sanjayhanji_94@rediffmail.com
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Records" title="Cell Gallery" />
          <DocumentDirectory
            groups={[
              {
                documents: [
                  {
                    title: "IIPC Gallery (PDF)",
                    url: asset("documents/cells/iipc/iipc-gallery.pdf"),
                  },
                ],
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

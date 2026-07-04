import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { DocumentDirectory } from "@/components/common/document-directory";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Institution Industry Cell (IIC)",
  description:
    "BEC Bagalkote's Institution Industry Cell (IIC) bridges academia and industry through guest lectures, internships, live projects, consultancy and MoU-driven training programmes.",
  path: "/institute/cells/iipc",
});

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

const mouActivities = [
  {
    event: "Infosys Springboard & AWS Skill Builder Program Launch Event (Virtual)",
    date: "25 Jul 2025",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Infosys Springboard: Faculty Enablement Program (FEP) on Python Programming & Machine Learning",
    date: "14–16 Apr 2025",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Infosys Springboard Certification Drive (Student Enablement): Machine Learning Foundation Certification",
    date: "7–11 Apr 2025",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Infosys Springboard Certification Drive (Student Enablement): Front End Web Technologies",
    date: "17–21 Mar 2025",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Interaction with Final Year Students — Internship at Tech Fortune Pvt. Ltd. and Ongoing Project Scenarios",
    date: "3 Feb 2025",
    company: "Tech Fortune Pvt. Ltd., Bangalore",
    location: "Online",
  },
  {
    event: "Interaction with Final Year Students — Internship Opportunities and Cutting-Edge Technologies",
    date: "3 Feb 2025",
    company: "Arilig Technologies, Bangalore",
    location: "Online",
  },
  {
    event: "SDP on Sales Force Technologies",
    date: "3–5 Dec 2024",
    company: "Arilig Technologies, Bangalore",
    location: "Multimedia Seminar Hall, BEC Bagalkote",
  },
  {
    event: "FDP on Generative AI",
    date: "18–22 Nov 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "FDP on Python Foundation",
    date: "28 Aug – 3 Sep 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "SDP on Infosys Springboard AI Foundation",
    date: "22–26 Jul 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "FDP on DevOps",
    date: "15–18 Jul 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "FDP on AI Foundation",
    date: "24–28 Jun 2024",
    company: "Infosys, Bangalore",
    location: "Online",
  },
  {
    event: "Seminar on Career Opportunities in Cybersecurity (Mr. Nikil Inginal)",
    date: "23 May 2024",
    company: "Threat Hunters Club LLP",
    location: "CSE Seminar Hall, BEC Bagalkote",
  },
  {
    event: "Workshop on Sales Force Technologies",
    date: "3–5 Dec 2023",
    company: "Arilig Technologies, Bangalore",
    location: "Multimedia Seminar Hall, BEC Bagalkote",
  },
  {
    event: "Seminar on Wireshark Tool (Mr. Nikil Inginal)",
    date: "2 Dec 2023",
    company: "Threat Hunters Club LLP",
    location: "Multimedia Seminar Hall, BEC Bagalkote",
  },
];

const members = [
  { name: "Dr. Basavaraj R. Hiremath", role: "Chairman", tone: "primary" as const },
  { name: "Dr. Govindraj B. Chittapur", role: "Coordinator", tone: "primary" as const },
  {
    name: "Dr. Ashok V. Sutagundar",
    role: "Member",
    tone: "muted" as const,
    photo: asset("departments/ece/faculty/ashok-v-sutagundar.webp"),
  },
  { name: "Prof. Basavaraj R. Endigeri", role: "Member", tone: "muted" as const },
  { name: "Dr. Rashmi R. Hunnur", role: "Member", tone: "muted" as const },
  { name: "Dr. Shrinivas F. Chitragar", role: "Member", tone: "muted" as const },
  { name: "Prof. Sanjay S. J.", role: "Member", tone: "muted" as const },
  { name: "Prof. Jangin C. M.", role: "Member", tone: "muted" as const },
  { name: "Dr. S. G. Kambalimath", role: "Mentor", tone: "outline" as const },
];

const galleryImages = Array.from({ length: 11 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: asset(`cells/iipc/gallery/iipc-activities-${n}.webp`),
    alt: `Industry interaction with students of Basaveshwar Engineering College, Bagalkote — activity ${i + 1}`,
  };
});

export default function IipcPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Industry Connect"
        title="Institution Industry Cell (IIC)"
        description="The Institution Industry Cell is the college's interface with industry — facilitating close industry-institute interaction and bridging the gap between academia and the corporate sector."
        badges={[{ label: "MoU Activities 2023–25" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <SectionHeading eyebrow="About" title="Bridging academia and industry" />
            <p className="text-base leading-relaxed text-gray-700">
              The Institution Industry Cell facilitates close interaction between
              the college and industry, bridging gaps between academia and the
              corporate sector. It promotes industry-institute linkages through
              guest lectures, training, internships, industrial visits and
              collaborative research.
            </p>
          </div>
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100">
            <Image
              src={asset("cells/iipc/bec-iipc-cell-photo.webp")}
              alt="The Institution Industry Cell at Basaveshwar Engineering College"
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
            eyebrow="Engagement"
            title="MoU Activities (2023–25)"
            description="Training programmes, faculty and student enablement drives, seminars and workshops delivered through the cell's industry MoUs."
          />
          <div className="overflow-x-auto rounded-md border border-stone-200 shadow-sm">
            <table className="w-full min-w-[44rem] border-collapse bg-white text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-gray-700">
                  <th className="px-4 py-3 font-semibold">Event</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Date / Year</th>
                  <th className="px-4 py-3 font-semibold">MoU Company</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {mouActivities.map((a) => (
                  <tr key={a.event} className="border-b border-stone-100 last:border-0 align-top">
                    <td className="px-4 py-3 font-medium text-gray-900">{a.event}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.date}</td>
                    <td className="px-4 py-3 text-gray-700">{a.company}</td>
                    <td className="px-4 py-3 text-gray-700">{a.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Records"
            title="MoU Documents"
            description="Signed Memorandums of Understanding between the college and partner industries."
          />
          <DocumentDirectory
            groups={[
              {
                documents: [
                  {
                    title: "MoU — Bit Bytes (MBA)",
                    url: asset("documents/cells/iipc/mou-bit-bytes-mba.pdf"),
                  },
                  {
                    title: "MoU — CNC India (Mechanical)",
                    url: asset("documents/cells/iipc/mou-cnc-india-mech.pdf"),
                  },
                  {
                    title: "MoU — Sphoorti (Mechanical)",
                    url: asset("documents/cells/iipc/mou-sphoorti-mech.pdf"),
                  },
                  {
                    title: "MoU — Unnati (Mechanical)",
                    url: asset("documents/cells/iipc/mou-unnati-mech.pdf"),
                  },
                ],
              },
            ]}
          />
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
            <p className="mt-2 text-lg font-semibold text-gray-900">Dr. Govindraj B. Chittapur</p>
            <p className="text-sm text-gray-700">Coordinator, Institution Industry Cell</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
              <span>
                Mobile:{" "}
                <a href="tel:+919739265167" className="font-medium text-primary hover:underline">
                  +91 97392 65167
                </a>
              </span>
              <span>
                Email:{" "}
                <a
                  href="mailto:gbchittapur@gmail.com"
                  className="font-medium text-primary hover:underline"
                >
                  gbchittapur@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Records"
            title="Cell Gallery"
            description="Glimpses of industry interaction with students from Basaveshwar Engineering College, Bagalkote."
          />
          <PhotoGallery images={galleryImages} />
        </div>
      </section>
    </main>
  );
}

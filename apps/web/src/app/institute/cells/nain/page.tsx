import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset, assetsUnder } from "@/lib/assets";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "NAIN — New Age Incubation Network",
  description:
    "NAIN at BEC Bagalkote, a Government of Karnataka (KBITS) incubation centre, helps students, scholars and alumni turn locally-relevant ideas into proofs of concept and commercial enterprises.",
  path: "/institute/cells/nain",
});

const objectives = [
  "Encourage students, research scholars and alumni to share ideas that solve locally-relevant problems, and to validate, refine and nurture them.",
  "Provide an ecosystem to convert ideas into proofs of concept and upgrade them to a level of commercial value.",
  "After successful incubation, encourage and lead teams towards setting up a business enterprise.",
];

const highlights = [
  { value: "1 of 9", label: "Engineering colleges selected in Karnataka" },
  { value: "2013–14", label: "Launched under the Karnataka State Budget" },
  { value: "KBITS", label: "Administered by KBITS, Govt. of Karnataka" },
];

const events = [
  "Pre-Hackathon (2014)",
  "Hackathon (2014)",
  "Pre-Hackathon (2016)",
  "Ideathon (2018)",
  "E-Step Bootcamp (2019)",
  "Belgavi IT Summit",
  "Pre-Hackathon by YOURSTORY",
  "Project Exhibition — 100 Days Celebration, Office of the Deputy Chief Minister, GoK",
];

const mentors = [
  { name: "Dr. R. N. Herkal", domain: "Geo Technology & Structural Engineering" },
  { name: "Dr. S. S. Injaganeri", domain: "Geo Technology & Structural Engineering" },
  { name: "Dr. V. V. Kuppast", domain: "Design & Metallurgy" },
  { name: "Dr. S. H. Jangamshetti", domain: "Power Energy" },
  { name: "Dr. Veena Soragavi", domain: "Hydraulic & Water Resource" },
  { name: "Dr. P. N. Kulkarni", domain: "Signal Processing & Application" },
  { name: "Dr. Shridhar K", domain: "Signal Processing & Application" },
  { name: "Dr. C. M. Javalagi", domain: "Management" },
  { name: "Dr. B. G. Sheeparamatti", domain: "MSME, Embedded Systems, Biomedical Engg." },
  {
    name: "Dr. V. B. Pagi",
    domain: "Image Processing & Mobile Computing",
    photo: asset("departments/cse/faculty/veerappa-b-pagi.webp"),
  },
  { name: "Dr. Mahabaleshwar S. K", domain: "Wireless Sensor Network" },
  { name: "Dr. R. L. Naik", domain: "Power Energy" },
  { name: "Dr. S. G. Kambalimath", domain: "VLSI" },
  { name: "Dr. Bharati Meti", domain: "Bio-Fuels & Food Production" },
  {
    name: "Dr. Krishnamurthy Bhat",
    domain: "Sensor Design & Application",
    photo: asset("departments/ecs/faculty/krishnamurthy-bhat.webp"),
  },
  { name: "Dr. Sanjay Hanji", domain: "Marketing" },
];

const galleryImages = assetsUnder("cells/nain/gallery/").map((src, index) => ({
  src,
  alt: `NAIN event at Basaveshwar Engineering College ${index + 1}`,
}));

export default function NainPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Incubation"
        title="NAIN — New Age Incubation Network"
        description="A Government of Karnataka incubation initiative, administered by KBITS, that helps students, research scholars and alumni convert their ideas into proofs of concept and, ultimately, enterprises."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="relative h-16 w-28">
              <Image
                src={asset("cells/nain/nain-logo.webp")}
                alt="NAIN logo"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
            <div className="relative h-16 w-16">
              <Image
                src={asset("cells/nain/gok-logo.webp")}
                alt="Government of Karnataka logo"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          </div>
          <SectionHeading eyebrow="About" title="From idea to enterprise" />
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 text-justify">
            <p>
              NAIN was established under the Department of Electronics, Information
              Technology, Biotechnology and Science &amp; Technology, Government of
              Karnataka. It emerged from the Karnataka ICT Group (KIG 2020) report —
              formed under the leadership of Mr. Mohandas Pai and Mr. B. V. Naidu — which set out a
              roadmap for Karnataka&rsquo;s leadership in ICT.
            </p>
            <p>
              In the State Budget 2013&ndash;14 the government proposed to establish
              incubation centres in the ICT sector in association with selected
              engineering colleges at district headquarters. The network operates
              through these colleges, prioritising their students, research scholars
              and alumni, and addressing locally-relevant problems. It is
              administered by KBITS (Karnataka Biotechnology and Information
              Technology Services), the nodal agency implementing the decisions of
              the Vision Groups on IT and Biotechnology.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-md border border-stone-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-semibold text-primary">{h.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{h.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
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

        <div className="space-y-6">
          <SectionHeading eyebrow="Activities" title="Events & Programmes" />
          <div className="flex flex-wrap gap-2">
            {events.map((e) => (
              <span
                key={e}
                className="rounded-sm border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-gray-700"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {galleryImages.length > 0 && (
          <div className="space-y-8">
            <SectionHeading eyebrow="Gallery" title="In Action" />
            <PhotoGallery images={galleryImages} />
          </div>
        )}

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Guidance"
            title="Mentors"
            description="Faculty mentors associated with the BEC-NAIN centre, across engineering, science and management domains."
          />
          <PersonGrid>
            {mentors.map((m) => (
              <PersonCard
                key={m.name}
                name={m.name}
                description={m.domain}
                photo={m.photo}
              />
            ))}
          </PersonGrid>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Contact" title="Coordinators" />
          <PersonGrid className="lg:grid-cols-2">
            <PersonCard
              name="Ms. Shruti B. Hiregoudar"
              photo={asset("cells/nain/shruti-b-h.webp")}
              description="District Innovation Associate — NAIN, KITS, GoK · Mobile: 78999 12164"
              email="hiregoudarshruti@gmail.com"
              badges={[{ label: "District Innovation Associate", tone: "primary" }]}
            />
            <PersonCard
              name="Dr. Anil D. Devangavi"
              photo={asset("cells/nain/anil-devangavi.webp")}
              description="College Coordinator — NAIN · Mobile: 93421 86108"
              email="anildevangavi_s@yahoo.co.in"
              badges={[{ label: "College Coordinator", tone: "primary" }]}
            />
          </PersonGrid>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Apply & Records" title="Forms, Projects & Reports" />
          <DocumentDirectory
            groups={[
              {
                label: "For Applicants",
                documents: [
                  { title: "Student Application Form", url: asset("documents/cells/nain/application-form.pdf") },
                  { title: "Registration Form", url: asset("documents/cells/nain/registration-form.pdf") },
                  { title: "Selected Projects List", url: asset("documents/cells/nain/projects-list.pdf") },
                ],
              },
              {
                label: "Event Reports",
                documents: [
                  { title: "Pre-Hackathon 2014", url: asset("documents/cells/nain/reports/pre-hackathon-2014.pdf") },
                  { title: "Hackathon 2014", url: asset("documents/cells/nain/reports/hackathon-2014.pdf") },
                  { title: "Pre-Hackathon 2016", url: asset("documents/cells/nain/reports/pre-hackathon-2016.pdf") },
                  { title: "Ideathon 2018", url: asset("documents/cells/nain/reports/ideathon-2018.pdf") },
                  { title: "E-Step Bootcamp 2019", url: asset("documents/cells/nain/reports/e-step-bootcamp-2019.pdf") },
                ],
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

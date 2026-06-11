import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { DocumentDirectory } from "@/components/common/document-directory";
import { asset } from "@/lib/assets";
import { Trees, Warehouse } from "lucide-react";

export const metadata: Metadata = {
  title: "College Gymkhana | Basaveshwar Engineering College, Bagalkote",
  description:
    "The College Gymkhana at Basaveshwar Engineering College, Bagalkote — the student sports body, its facilities, office-bearers, achievements and annual reports.",
};

const facilities = [
  {
    icon: Trees,
    title: "5-Acre Outdoor Playground",
    description:
      "Grounds for Athletics, Cricket, Hockey, Football, Tennis, Volleyball and Basketball.",
  },
  {
    icon: Warehouse,
    title: "Indoor Stadium",
    description:
      "Three shuttle-badminton courts plus table tennis, chess and carrom for indoor games.",
  },
];

const officeBearers = [
  {
    name: "Dr. Kirankumar B. Balavalad",
    photo: asset("student-life/gymkhana/kbb.webp"),
    description: "Assistant Professor, Electronics & Communication Engg.",
    badges: [{ label: "Gymkhana Secretary", tone: "primary" as const }],
  },
  {
    name: "Dr. Manjula A. Sutagundar",
    photo: asset("student-life/gymkhana/ms.webp"),
    description: "Assistant Professor, Electronics & Computer Science Engg.",
    badges: [{ label: "Cultural Secretary", tone: "primary" as const }],
  },
  {
    name: "Shri. Ganesh Kori",
    photo: asset("student-life/gymkhana/ganesh.webp"),
    description: "Physical Director, Basaveshwar Engineering College",
    badges: [{ label: "Physical Director", tone: "primary" as const }],
  },
];

const highlights = [
  "VTU State Champions — Women's Handball (2023-24, hosted at BEC)",
  "VTU State Champions — Men's Cricket (2023-24, RYMCE Bellary)",
  "State-Level Champions — Men's Hockey (VTU Inter-Zonal, repeated 2021-22 & 2022-23)",
  "State Silver — Taekwondo, Men (SIT Tumkur, 2023-24)",
  "National Bronze — Wushu Championship, Mohali (2020-21)",
  "7 medals & 5 trophies at the VTU Zonal inter-collegiate tournament (2018-19)",
];

const vtuBlues2024 = [
  "Mr. Shivkumar (ECE) — Hockey",
  "Mr. Praveen Gouda (AI & ML) — Hockey",
  "Mr. Prajwal (EEE) — Hockey",
  "Ms. Sahana Mungarwadi (CSE) — Handball",
  "Ms. Snehal Bagade (CSE) — Handball",
  "Ms. Madhu Jainar (CSE) — Handball",
];

const galleryImages = [
  {
    src: asset("student-life/sports/cine0043.webp"),
    alt: "A BEC player leaps for an overhead smash during badminton in the indoor stadium",
  },
  {
    src: asset("student-life/sports/cine0118.webp"),
    alt: "A BEC student plays a forehand return during a table tennis rally",
  },
  {
    src: asset("gallery/gymkhana/1.webp"),
    alt: "Cricket teams gather for the opening ceremony of an inter-collegiate tournament at BEC",
  },
  {
    src: asset("student-life/sports/cine0146.webp"),
    alt: "BEC basketball players drive the ball on the outdoor court",
  },
  {
    src: asset("student-life/sports/cine0053.webp"),
    alt: "A doubles badminton rally at the net in the BEC indoor stadium",
  },
  {
    src: asset("gallery/gymkhana/4.webp"),
    alt: "The BEC women's volleyball team celebrates a win on the court",
  },
  {
    src: asset("student-life/sports/cine0122.webp"),
    alt: "A BEC student serves during a table tennis match",
  },
  {
    src: asset("student-life/sports/cine0074.webp"),
    alt: "A BEC student executes a jump smash during badminton practice",
  },
  {
    src: asset("gallery/gymkhana/8.webp"),
    alt: "Students perform Surya Namaskar at an outdoor yoga session on campus",
  },
  {
    src: asset("gallery/gymkhana/6.webp"),
    alt: "The BEC archery team with their target and championship trophy",
  },
  {
    src: asset("gallery/gymkhana/5.webp"),
    alt: "A BEC badminton team with their winners' trophy in the indoor court",
  },
  {
    src: asset("student-life/sports/cine0139.webp"),
    alt: "BEC sports teams and coaches with their trophies outside the gymkhana",
  },
  {
    src: asset("gallery/gymkhana/7.webp"),
    alt: "Students at a sports orientation session in the BEC indoor stadium",
  },
  {
    src: asset("student-life/sports/cine0090.webp"),
    alt: "VTU inter-collegiate trophies won by Basaveshwar Engineering College",
  },
  {
    src: asset("gallery/gymkhana/3.webp"),
    alt: "A display of sports trophies and shields won by BEC teams in the college foyer",
  },
];

export default function GymkhanaPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Sports & Games"
        title="Sports & College Gymkhana"
        description="The Gymkhana is the college's student sports body, working for the overall development of students through sport — instilling discipline, team spirit and sportsmanship under a full-time Physical Director."
        badges={[
          { label: "5-Acre Playground" },
          { label: "Indoor Stadium", tone: "outline" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-4">
          <SectionHeading eyebrow="About" title="Sport for overall development" />
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              Sports play an integral part in moulding and refining the character of
              a student. The college has excellent infrastructure for developing
              sporting skills — a 5-acre outdoor playground and an indoor stadium —
              and a full-time Physical Director who works for the physical fitness of
              students and the conduct of sports activities.
            </p>
            <p>
              The Gymkhana aims at the overall development of students through its
              various sports programmes, inculcating discipline, team spirit,
              teamwork, co-operation, sportsmanship and tolerance, while offering
              recreational and sports activities to help students refresh and relax.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {facilities.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex h-full flex-col rounded-md border border-stone-200 bg-white p-6 shadow-sm"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.description}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="The Gymkhana" title="Office-Bearers (2023-24)" />
          <PersonGrid>
            {officeBearers.map((o) => (
              <PersonCard
                key={o.name}
                name={o.name}
                photo={o.photo}
                description={o.description}
                badges={o.badges}
              />
            ))}
          </PersonGrid>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-lg font-semibold text-gray-900">Recent Highlights</h3>
            <ul className="mt-4 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-stone-200 bg-orange-50/60 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-900">VTU Blues (2023-24)</h3>
            <ul className="mt-4 space-y-2">
              {vtuBlues2024.map((b) => (
                <li key={b} className="text-sm leading-relaxed text-gray-700">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {galleryImages.length > 0 && (
          <div className="space-y-8">
            <SectionHeading eyebrow="Gallery" title="On the Field" />
            <PhotoGallery images={galleryImages} />
          </div>
        )}

        <div className="space-y-8">
          <SectionHeading eyebrow="Records" title="Annual Reports" />
          <DocumentDirectory
            groups={[
              {
                documents: [
                  { title: "Gymkhana Activities 2023-24", url: asset("documents/gymkhana/activities-2023-24.pdf") },
                  { title: "Annual Report 2022-23", url: asset("documents/gymkhana/report-2022-23.pdf") },
                  { title: "Annual Report 2021-22", url: asset("documents/gymkhana/report-2021-22.pdf") },
                  { title: "Annual Report 2020-21", url: asset("documents/gymkhana/report-2020-21.pdf") },
                  { title: "Annual Report 2018-19", url: asset("documents/gymkhana/report-2018-19.pdf") },
                ],
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

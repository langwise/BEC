import Image from "next/image";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { asset } from "@/lib/assets";
import {
  Globe,
  Users,
  BookOpen,
  Award,
  Cpu,
  Calendar,
  Trophy,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "IEEE Student Branch",
  description:
    "The BEC-IEEE Student Branch (STB35261), established 1994 — workshops, the NOVUS flagship event and awards including Outstanding Large Student Branch and a Darrel Chong R10 award.",
  path: "/student-life/ieee",
});

const HERO_IMAGE = asset("student-life/clubs/ieee-student-branch-35261.webp");

const features = [
  {
    title: "Technical Workshops",
    description:
      "Hands-on sessions on IoT, AI/ML and Embedded Systems conducted by industry experts.",
    icon: Cpu,
  },
  {
    title: "Conferences",
    description:
      "International and national level conferences providing a platform for research presentation.",
    icon: Globe,
  },
  {
    title: "Student Network",
    description:
      "Connect with peers and professionals across the global IEEE network.",
    icon: Users,
  },
  {
    title: "Publications",
    description:
      "Access to the IEEE Xplore digital library and opportunities to publish technical papers.",
    icon: BookOpen,
  },
];

const branchDetails = [
  { label: "Branch Code", value: "STB35261" },
  { label: "Established", value: "1994" },
  { label: "Membership", value: "117" },
  { label: "Branch Counsellor", value: "Dr. Vijaylakshmi Jigajinni" },
  { label: "Student Branch Chair", value: "Mahesh Ballolli" },
  { label: "Founder", value: "Dr. Suresh H. Jangamshetti" },
];

const flagshipEvents = [
  {
    title: "NOVUS",
    description:
      "The branch's flagship national-level technical event, evolved from the state-level KSHITIJ programme first organised in 2005-06.",
  },
  {
    title: "Gandhi Global Solar Yatra",
    description:
      "Awareness and outreach activity on solar energy and sustainability.",
  },
  {
    title: "National Science Day & Women's Day",
    description:
      "Annual events celebrating scientific temper and women in engineering (WIE).",
  },
];

const recognitions = [
  "Outstanding Large Student Branch Award for the years 2014 and 2016",
  "Darrel Chong Student Activity Award in IEEE Region 10 (R10) for 2016",
  "R10 Outstanding Branch Counsellor Award (1996) and IEEE Bangalore Section Outstanding Branch Counsellor Award (2010 & 2014)",
  "Organised 53 activities during the year 2016",
];

export default function IEEEPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Professional Body"
        title="IEEE Student Branch"
        description="Advancing technology for humanity — the BEC-IEEE Student Branch (STB35261), established in 1994 and an entity of the IEEE North Karnataka Sub Section under the IEEE Bangalore Section."
        badges={[
          { label: "STB35261" },
          { label: "Since 1994", tone: "outline" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-md border border-stone-200 bg-stone-100 shadow-sm">
          <Image
            src={HERO_IMAGE}
            alt="Members of the BEC-IEEE Student Branch at Basaveshwar Engineering College, Bagalkote"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-top"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About"
              title="Over 25 years of IEEE activity"
            />
            <div className="space-y-4 text-base leading-relaxed text-gray-700">
              <p className="text-justify">
                The IEEE Student Branch (STB35261) at Basaveshwar Engineering
                College, Bagalkote — known among peers as BEC-IEEE — was
                established in 1994 and has completed over 25 years of technical,
                non-technical, humanitarian and professional activities. It is an
                entity of the IEEE North Karnataka Sub Section, affiliated to the
                IEEE Bangalore Section.
              </p>
              <p className="text-justify">
                The branch organises regular technical seminars, workshops and
                competitions to bridge the gap between academic learning and
                industry requirements, and has helped initiate IEEE activities at
                several other engineering colleges across the region. A dedicated
                IEEE Power &amp; Energy Society (PES) student chapter was started
                in 2016.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-md border border-stone-200 bg-white p-6 shadow-sm"
                  >
                    <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Award className="h-5 w-5 text-primary" />
              Branch Details
            </h3>
            <dl className="mt-4 divide-y divide-stone-100">
              {branchDetails.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start justify-between gap-4 py-3 text-sm"
                >
                  <dt className="text-gray-500">{d.label}</dt>
                  <dd className="text-right font-medium text-gray-900">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <SectionHeading eyebrow="Events" title="Flagship Events" />
            <div className="space-y-3">
              {flagshipEvents.map((event) => (
                <div
                  key={event.title}
                  className="flex items-start gap-4 rounded-md border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-orange-50 text-primary">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {event.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading eyebrow="Recognitions" title="Awards" />
            <div className="rounded-md border border-stone-200 bg-orange-50/60 p-6 shadow-sm">
              <ul className="space-y-3">
                {recognitions.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-gray-700"
                  >
                    <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

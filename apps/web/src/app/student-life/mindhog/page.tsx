import Link from "next/link";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Zap, Lightbulb, Users, Hexagon, CheckCircle2 } from "lucide-react";

export const metadata = pageMetadata({
  title: "Mindhog Student Club",
  description:
    "MindHog, the BEC student club selected under the AICTE SPICES scheme with a Rs 2 lakh grant — fostering creativity, ethics, leadership and skills for UG and PG students.",
  path: "/student-life/mindhog",
});

const objectives = [
  {
    title: "Facilitating Entity",
    description:
      "Position the student club as a primary facilitating entity for campus innovation.",
    icon: Zap,
  },
  {
    title: "Skill Development",
    description:
      "Pursue individual interests and creative work while building organisation and management skills.",
    icon: Lightbulb,
  },
  {
    title: "Communication Platform",
    description:
      "Build communication, leadership and public-speaking abilities through event management.",
    icon: Users,
  },
  {
    title: "Sustainability",
    description:
      "Reach out to alumni and industry for fund-raising to make the club self-sustainable.",
    icon: Hexagon,
  },
];

const rules = [
  "Students on the institute roll shall be members of the club.",
  "Ex-students and ex-faculty members shall not be members.",
  "Membership is open to both UG and PG students.",
];

export default function MindhogPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="AICTE SPICES Scheme"
        title="Mindhog Student Club"
        description="MindHog is the student club of BEC, selected under the prestigious AICTE SPICES scheme to promote a healthy, collaborative culture and give students a platform to think out of the box."
        badges={[{ label: "AICTE SPICES" }, { label: "For UG & PG", tone: "outline" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About"
              title="Fostering interests, creativity & ethics"
            />
            <div className="space-y-4 text-base leading-relaxed text-gray-700">
              <p>
                The MindHog student club of BEC has been selected under the AICTE
                SPICES scheme, which aims to promote a healthy collaborative
                culture and provide a platform for students to think out of the
                box. The club is for the students and by the students.
              </p>
              <p>
                The initiative is supported with a grant of ₹2 lakh (₹1 lakh from
                AICTE and ₹1 lakh from BEC), helping students acquire requisite
                skills, develop leadership qualities and enhance their placement
                opportunities.
              </p>
            </div>
            <div>
              <Link href="/student-life/activities">
                <Button variant="outline">View Activities</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-orange-50/60 p-6 shadow-sm md:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Membership Rules
            </h3>
            <ul className="mt-4 space-y-3">
              {rules.map((rule) => (
                <li
                  key={rule}
                  className="flex gap-3 rounded-md bg-white p-3 text-sm leading-relaxed text-gray-700 shadow-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Objectives" title="What the club sets out to do" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {objectives.map((obj) => {
              const Icon = obj.icon;
              return (
                <div
                  key={obj.title}
                  className="rounded-md border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-gray-900">{obj.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {obj.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset, assetsUnder } from "@/lib/assets";
import { ArrowRight, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Activities | Basaveshwar Engineering College, Bagalkote",
  description:
    "Cultural performances, the Engineers' Arena and student events at Basaveshwar Engineering College, Bagalkote.",
};

const activityGallery = [
  ...assetsUnder("student-life/cultural/").map((src) => ({
    src,
    alt: "Cultural performance by students at Basaveshwar Engineering College",
  })),
  ...assetsUnder("student-life/engineers-arena/").map((src) => ({
    src,
    alt: "Students at the Engineers' Arena, Basaveshwar Engineering College",
  })),
];

const links = [
  {
    title: "Symposia Archive",
    category: "National Symposia",
    description:
      "Official archive for SYMPOSIA 2023, the national technical symposia held during BEC's Diamond Jubilee year.",
    href: "/student-life/symposia",
    icon: FileText,
  },
  {
    title: "Mindhog Student Club",
    category: "AICTE SPICES",
    description:
      "The student club selected under the AICTE SPICES scheme, fostering creativity, ethics and collaboration.",
    href: "/student-life/mindhog",
    icon: Sparkles,
  },
];

export default function ActivitiesPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Campus Life"
        title="Events & Activities"
        description="From cultural performances to the Engineers' Arena, student life at BEC is a calendar full of energy, talent and collaboration."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Explore"
            title="Student clubs & events"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start justify-between gap-4 rounded-md border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-orange-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                        {item.category}
                      </span>
                      <span className="mt-1 block text-lg font-semibold text-gray-900 group-hover:text-primary">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-gray-600">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              );
            })}
          </div>
        </div>

        {activityGallery.length > 0 && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Gallery"
              title="Campus life in pictures"
              description="Moments from cultural performances and the Engineers' Arena that capture the energy of student life at BEC."
            />
            <PhotoGallery images={activityGallery} />
          </div>
        )}
      </section>
    </main>
  );
}

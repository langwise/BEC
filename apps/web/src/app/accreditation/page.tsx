import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  BarChart3,
  ChevronRight,
  ClipboardCheck,
  ScrollText,
  BookOpenCheck,
} from "lucide-react";

import { PageHero } from "@/components/common/page-hero";

export const metadata: Metadata = {
  title: "Accreditation & Quality | Basaveshwar Engineering College, Bagalkote",
  description:
    "NAAC, NBA, NIRF, IQAC, VTU affiliation and TEQIP records for Basaveshwar Engineering College (Autonomous), Bagalkote — the college's accreditation and quality-assurance documentation.",
};

const cards = [
  {
    title: "NAAC Accreditation",
    href: "/accreditation/naac",
    icon: Award,
    description:
      "Self-Study Report, criterion-wise metrics, DVV clarifications and the accreditation certificate.",
  },
  {
    title: "NBA Accreditation",
    href: "/accreditation/nba",
    icon: BadgeCheck,
    description:
      "Programme-level accreditation grants, extensions and compliance letters.",
  },
  {
    title: "NIRF Rankings",
    href: "/accreditation/nirf",
    icon: BarChart3,
    description:
      "Engineering, Overall and Innovation ranking submissions, year on year.",
  },
  {
    title: "IQAC",
    href: "/accreditation/iqac",
    icon: ClipboardCheck,
    description:
      "Internal Quality Assurance Cell — AQARs, action-taken reports, academic calendars and meeting records.",
  },
  {
    title: "VTU Affiliation",
    href: "/accreditation/vtu",
    icon: ScrollText,
    description:
      "Visvesvaraya Technological University affiliation orders.",
  },
  {
    title: "TEQIP",
    href: "/accreditation/teqip",
    icon: BookOpenCheck,
    description:
      "Technical Education Quality Improvement Programme — plans, audit reports and quality records.",
  },
];

export default function AccreditationPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Quality Assurance"
        title="Accreditation & Quality"
        description="Basaveshwar Engineering College is an autonomous institution accredited by NAAC and NBA, ranked under NIRF and affiliated to VTU, Belagavi. Explore the college's accreditation and quality-assurance records below."
        badges={[
          { label: "NAAC Accredited" },
          { label: "NBA Accredited", tone: "outline" },
          { label: "Autonomous", tone: "secondary" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex h-full flex-col rounded-md border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary">
                  {card.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {card.description}
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-primary">
                  View documents
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

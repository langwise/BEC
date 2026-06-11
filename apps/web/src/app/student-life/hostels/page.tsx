import Image from "next/image";
import Link from "next/link";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset, assetsUnder } from "@/lib/assets";
import { ArrowRight, Building2, UtensilsCrossed, ShieldCheck, Users } from "lucide-react";

export const metadata = pageMetadata({
  title: "Student Hostels",
  description:
    "BEC Bagalkote hostels — four residential blocks for boys, girls and PG scholars with a pure-veg mess, CCTV, resident wardens and the Student Welfare and Hostel Committee.",
  path: "/student-life/hostels",
});

const girlsHostelImages = assetsUnder("facilities/hostels/girls/").map(
  (src, index) => ({
    src,
    alt: `Malaprabha Ladies Hostel at Basaveshwar Engineering College ${index + 1}`,
  }),
);

const blocks = [
  { name: "Sir M. Visvesvaraya Block", utility: "Boys Hostel — Senior students" },
  { name: "Netaji Block", utility: "Boys Hostel — First-year students" },
  { name: "Malaprabha Ladies Hostel", utility: "Girls Hostel" },
  { name: "PG Boys Hostel", utility: "PG & Research scholars" },
];

const facilities = [
  "Pure Vegetarian Mess",
  "RO Filtered Water",
  "Solar Water Heater",
  "Wood & Electric Boilers",
  "Hot Water Supply",
  "Internet Point",
  "Generator Backup",
  "Guest Room",
  "Volleyball Ground",
  "Indoor Games (TT, Carrom, Chess)",
  "CCTV Surveillance",
];

const management = [
  { role: "Committee Chairman", name: "Shri. Kumar Hiremath" },
  { role: "Chief Warden", name: "Dr. B. R. Hiremath, Principal" },
  { role: "Deputy Chief Warden", name: "Dr. P. L. Timmanagoudar" },
];

export default function HostelsPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Accommodation"
        title="Student Hostels"
        description="Safe, comfortable residential blocks for boys and girls, managed by the B.V.V. Sangha's Student Welfare and Hostel Committee with a focus on student welfare and a conducive atmosphere for learning."
        badges={[{ label: "4 Residential Blocks" }, { label: "Pure-Veg Mess", tone: "outline" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-md border border-stone-200 bg-stone-100 shadow-sm">
          <Image
            src={asset("facilities/hostels/girls/cine0602.webp")}
            alt="Residential room at the Malaprabha Ladies Hostel, Basaveshwar Engineering College"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Residential Blocks" title="Four hostel blocks" />
          <div className="grid gap-4 sm:grid-cols-2">
            {blocks.map((block) => (
              <div
                key={block.name}
                className="flex items-start gap-3 rounded-md border border-stone-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-orange-50 text-primary">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{block.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{block.utility}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading eyebrow="Amenities" title="Facilities available" />
            <div className="flex flex-wrap gap-2">
              {facilities.map((f) => (
                <span
                  key={f}
                  className="rounded-sm border border-stone-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Users className="h-5 w-5 text-primary" />
              Management
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              The hostels are managed by the Student Welfare and Hostel Committee
              (SWC) of the B.V.V. Sangha, consisting of 12 members.
            </p>
            <dl className="mt-4 divide-y divide-stone-100">
              {management.map((m) => (
                <div key={m.role} className="py-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {m.role}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-gray-900">{m.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-md border border-stone-200 bg-white p-5 shadow-sm">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Pure-Veg Mess</p>
              <p className="text-xs text-gray-500">For all residents</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border border-stone-200 bg-white p-5 shadow-sm">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-semibold text-gray-900">CCTV & Wardens</p>
              <p className="text-xs text-gray-500">Resident wardens per block</p>
            </div>
          </div>
          <Link
            href="/academics/hostel"
            className="group flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-orange-50/60 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Wardens & Admission
              </p>
              <p className="text-xs text-gray-500">Full block-wise details</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {girlsHostelImages.length > 0 && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Gallery"
              title="Inside the Malaprabha Ladies Hostel"
              description="A look at the residential rooms, study spaces and mess at the girls' hostel."
            />
            <PhotoGallery images={girlsHostelImages} />
          </div>
        )}
      </section>
    </main>
  );
}

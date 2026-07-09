import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PersonCard, PersonGrid } from "@/components/common/person-card";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset, assetsUnder } from "@/lib/assets";
import { UtensilsCrossed, Shirt, Building2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Science & Technology Entrepreneurs Park (BEC-STEP)",
  description:
    "BEC-STEP, a DST-recognised Science & Technology Entrepreneurs Park established 1999 at BEC Bagalkote, nurtures entrepreneurs through training, technology transfer and incubation in food, textile and building technology.",
  path: "/institute/cells/step",
});

const objectives = [
  "Encourage development, transfer and commercialisation of new technologies",
  "Organise skill-development training and provide services to the small-scale sector",
  "Nurture new product development and technology",
  "Provide training and self-employment opportunities, especially to women",
];

const facilities = [
  {
    icon: UtensilsCrossed,
    title: "Food Processing",
    description:
      "Product and process development, training and consultancy for agro and food-based enterprises.",
  },
  {
    icon: Shirt,
    title: "Textile Technology",
    description:
      "Support for the region's handloom and power-loom sector producing sarees and traditional textiles.",
  },
  {
    icon: Building2,
    title: "Building Technology",
    description:
      "Development and transfer of appropriate building technologies and construction-related skills.",
  },
];

const services = [
  "Training Programmes",
  "Technology Transfer",
  "Social Innovation Programmes",
  "Incubation Services",
];

const awards = [
  "Best STEP / TBI Award (2006) by the Department of Science & Technology, presented by former President Dr. A. P. J. Abdul Kalam",
  "Jnanachandra Ghosh National Science Award — Gold Medal (2005)",
  "Dr. J. S. Pruthi Lifetime Achievement Award (2004) to Dr. M. Mahadeviah",
  "Best Innovative Product Award for Pomegranate Juice (2007)",
  "Suvarna Karnataka Award (2009)",
  "Kannada Rajyotsava Award",
  "K. U. Patel Award for pomegranate research publication",
];

const galleryImages = assetsUnder("cells/step/")
  .filter((src) => !src.includes("dr-b-s-angadi"))
  .map((src, index) => ({
    src,
    alt: `BEC-STEP activity at Basaveshwar Engineering College ${index + 1}`,
  }));

export default function StepPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Entrepreneurship"
        title="Science & Technology Entrepreneurs Park (BEC-STEP)"
        description="Established in 1999, BEC-STEP has helped hundreds of entrepreneurs across the Bagalkote region through identification of products and processes, training, consultancy and incubation."
        badges={[
          { label: "Established 1999" },
          { label: "DST Best STEP — 2006", tone: "outline" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-4">
          <SectionHeading eyebrow="About" title="Enterprise for the region" />
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              Bagalkote district has strong agricultural foundations — three rivers
              and crops including pomegranate, sapota, guava and papaya — and was
              designated an industrial growth centre for agro-based industries, with
              273 acres allocated for an Agro Tech Park. The region is also home to
              roughly 25,000 handlooms and power-looms producing sarees and
              traditional textiles.
            </p>
            <p>
              The Basaveshwar Veershaiva Vidyavardhak Sangha, which runs 110
              institutions across various fields, conceived BEC-STEP to help the
              region&rsquo;s unemployed youth. Since its inception in 1999, the park
              has helped hundreds of entrepreneurs through identification of
              products and processes, training and consultancy.
            </p>
          </div>
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

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Facilities"
            title="Areas of Support"
            description="BEC-STEP provides incubation and technical support across three core sectors."
          />
          <div className="grid gap-4 sm:grid-cols-3">
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
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Activities & Services</h3>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Awards & Recognition</h3>
            <ul className="mt-4 space-y-3">
              {awards.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Leadership" title="Executive Director" />
          <PersonGrid className="lg:grid-cols-3">
            <PersonCard
              name="Dr. B. S. Angadi"
              photo={asset("cells/step/dr-b-s-angadi.webp")}
              description="Executive Director, BEC-STEP · Mobile: 94489 06264"
              email="becstepbgk@yahoo.com"
              badges={[{ label: "Executive Director", tone: "primary" }]}
            />
          </PersonGrid>
        </div>

        {galleryImages.length > 0 && (
          <div className="space-y-8">
            <SectionHeading eyebrow="Gallery" title="Park & Activities" />
            <PhotoGallery images={galleryImages} />
          </div>
        )}
      </section>
    </main>
  );
}

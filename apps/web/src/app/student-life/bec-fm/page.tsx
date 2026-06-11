import Image from "next/image";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset, assetsUnder } from "@/lib/assets";
import { Radio, Mic2, Users, Signal, Mail, Phone } from "lucide-react";

export const metadata = pageMetadata({
  title: "BEC Dhwani 90.4 FM",
  description:
    "BEC Dhwani 90.4 FM, the community radio station of BEC Bagalkote — inaugurated 29 February 2020 as the first radio station in Bagalkot, with talk shows and music.",
  path: "/student-life/bec-fm",
});

const galleryImages = assetsUnder("student-life/bec-fm/").map((src, index) => ({
  src,
  alt: `BEC Dhwani 90.4 FM community radio studio at Basaveshwar Engineering College ${index + 1}`,
}));

const cards = [
  {
    title: "Community Radio",
    desc: "A community radio station serving the campus and the surrounding region with locally relevant programming.",
    icon: Users,
  },
  {
    title: "Campus Voices",
    desc: "An on-air platform for students, faculty and the wider college community to create and share content.",
    icon: Mic2,
  },
  {
    title: "On-Air Studio",
    desc: "A dedicated broadcast and recording studio equipped for live shows and produced segments.",
    icon: Radio,
  },
];

const facts = [
  { label: "Frequency", value: "90.4 FM" },
  { label: "Inaugurated", value: "29 February 2020" },
  { label: "Distinction", value: "First radio station in Bagalkot" },
];

export default function BECFMPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Community Radio"
        title="BEC Dhwani 90.4 FM"
        description="The community radio station of Basaveshwar Engineering College — the voice of the campus and its neighbouring communities. Inaugurated in 2020, it is the first radio station in Bagalkot."
        badges={[{ label: "90.4 FM" }, { label: "Since 2020", tone: "outline" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-md border border-stone-200 bg-stone-100 shadow-sm">
          <Image
            src={asset("student-life/bec-fm/cine0978.webp")}
            alt="A radio jockey on air at the BEC Dhwani 90.4 FM studio, Basaveshwar Engineering College"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About"
              title="Broadcasting knowledge, culture and campus voices"
            />
            <p className="text-base leading-relaxed text-gray-700">
              BEC Dhwani 90.4 FM was established to cater to the needs of the
              student community and the wider region around Bagalkot. It carries
              talk shows, music and locally relevant programming produced on
              campus.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-md border border-stone-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {f.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Signal className="h-5 w-5 text-primary" />
              Tune In
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Tune your radio to{" "}
              <span className="font-semibold text-gray-900">90.4 FM</span> across
              the Bagalkot region, or reach the station directly.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href="mailto:becbgk.fm@gmail.com"
                className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                becbgk.fm@gmail.com
              </a>
              <a
                href="tel:+919448789302"
                className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                +91 94487 89302
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-md border border-stone-200 bg-white p-6 shadow-sm"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {galleryImages.length > 0 && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Gallery"
              title="Inside the studio"
              description="A look inside the BEC Dhwani broadcast and recording studio on the Basaveshwar Engineering College campus."
            />
            <PhotoGallery images={galleryImages} />
          </div>
        )}
      </section>
    </main>
  );
}

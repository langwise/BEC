import { pageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { assetsUnder } from "@/lib/assets";
import { RadioHero } from "@/components/common/radio-hero";
import { Radio, Mic2, Users, Signal, Mail, Phone, User } from "lucide-react";

export const metadata = pageMetadata({
  title: "BEC Dhwani 90.4 FM",
  description:
    "BEC Dhwani 90.4 FM, the community radio station of BEC Bagalkote — inaugurated 29 February 2020 as the first radio station in Bagalkote, with talk shows and music.",
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
  { label: "Distinction", value: "First radio station in Bagalkote" },
];

export default function BECFMPage() {
  return (
    <main className="bg-background text-foreground">
      <RadioHero />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About"
              title="Broadcasting knowledge, culture and campus voices"
            />
            <p className="text-base leading-relaxed text-gray-700 text-justify">
              BEC Dhwani 90.4 FM was established to cater to the needs of the
              student community and the wider region around Bagalkote. It carries
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

          <div className="space-y-4">
            <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Signal className="h-5 w-5 text-primary" />
                Tune In
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Press play at the top of the page to stream live, tune your radio
                to <span className="font-semibold text-gray-900">90.4 FM</span>{" "}
                across the Bagalkote region, or reach the station directly.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700">
                  <User className="h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="font-medium text-gray-900">
                      Bharath Badiger
                    </span>
                    <span className="text-gray-500"> · Station Contact</span>
                  </span>
                </div>
                <a
                  href="tel:+919483620120"
                  className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  +91 94836 20120
                </a>
                <a
                  href="mailto:becbgk.fm@gmail.com"
                  className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  becbgk.fm@gmail.com
                </a>
              </div>
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

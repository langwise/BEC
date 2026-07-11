import Image from "next/image";

import { DocumentDirectory } from "@/components/common/document-directory";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { asset } from "@/lib/assets";

const themes = [
  {
    title: "Novel Approaches for Sustainability in Engineering Systems",
    stream: "Non IT Stream",
  },
  {
    title: "Emerging Trends in Smart Systems",
    stream: "IT Stream",
  },
];

const archiveFacts = [
  { label: "Event", value: "SYMPOSIA 2023" },
  { label: "Dates", value: "8 to 9 September 2023" },
  { label: "Status", value: "Past event, retained as an official archive" },
  { label: "Occasion", value: "Diamond Jubilee and 60th year celebration" },
];

const brochurePages = [
  {
    src: asset("events/symposia-2023/brochure-page-1.webp"),
    alt: "SYMPOSIA 2023 brochure page 1",
  },
  {
    src: asset("events/symposia-2023/brochure-page-2.webp"),
    alt: "SYMPOSIA 2023 brochure page 2",
  },
];

export function SymposiaPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Student Life"
        title="Symposia Archive"
        description="Official archive for SYMPOSIA 2023, a national technical symposia held from 8 to 9 September 2023 as part of BEC's Diamond Jubilee and 60th year celebration."
        badges={[
          { label: "Past Event" },
          { label: "8 to 9 September 2023", tone: "outline" },
          { label: "National Symposia", tone: "secondary" },
        ]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Archive Record"
              title="SYMPOSIA 2023"
              description="This page preserves the event record, themes, brochure and schedules from the legacy website. Registration and participation instructions are treated as closed historical information."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {archiveFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-md border border-stone-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-gray-900">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {themes.map((theme) => (
                <div
                  key={theme.title}
                  className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    {theme.stream}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold leading-snug text-gray-900">
                    {theme.title}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-stone-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              2026 Status
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-gray-900">
              Registration is closed
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700">
              <p className="text-justify">
                SYMPOSIA 2023 is retained here as a past-event archive. The
                original registration deadline was 05/09/2023, so QR codes and
                form links are not surfaced as active calls to action.
              </p>
              <p className="text-justify">
                For current student activities, use the Activities page and
                official college announcements.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Brochure"
            title="Archived brochure preview"
            description="Preview images from the official brochure, retained from the legacy Symposia page for reference."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {brochurePages.map((page) => (
              <div
                key={page.src}
                className="relative aspect-[3/4] overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm"
              >
                <Image
                  src={page.src}
                  alt={page.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Documents"
            title="Archived brochure and schedules"
            description="Official documents retained for historical reference. These are not current registration or participation instructions."
          />
          <DocumentDirectory
            groups={[
              {
                label: "Event Documents",
                documents: [
                  {
                    title: "SYMPOSIA 2023 Brochure",
                    url: asset("events/symposia-2023/brochure.pdf"),
                  },
                  {
                    title: "IT Stream Schedule",
                    url: asset("events/symposia-2023/it-stream-schedule.pdf"),
                    meta: "Emerging Trends in Smart Systems",
                  },
                  {
                    title: "Non-IT Stream Schedule",
                    url: asset("events/symposia-2023/non-it-stream-schedule.pdf"),
                    meta: "Novel Approaches for Sustainability in Engineering Systems",
                  },
                ],
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

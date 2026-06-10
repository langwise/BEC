import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { assetsUnder } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Photo Gallery | Basaveshwar Engineering College, Bagalkote",
  description:
    "Photo gallery of Basaveshwar Engineering College, Bagalkote — campus events, student life and industrial & educational visits.",
};

const albums = [
  {
    eyebrow: "Events",
    title: "Campus Events",
    description: "Cultural and technical events, festivals and celebrations across the campus.",
    prefix: "gallery/life-at-bec/events/",
    altBase: "Campus event at Basaveshwar Engineering College",
  },
  {
    eyebrow: "Campus",
    title: "Campus Life",
    description: "Everyday glimpses of student life on the Vidyagiri campus.",
    prefix: "gallery/life-at-bec/new/",
    altBase: "Student life at Basaveshwar Engineering College",
  },
  {
    eyebrow: "Visits",
    title: "Industrial & Educational Visits",
    description: "Students on industrial tours and educational field visits.",
    prefix: "gallery/life-at-bec/travel/",
    altBase: "Industrial and educational visit by Basaveshwar Engineering College students",
  },
];

const moreGalleries = [
  { label: "Gymkhana & Sports", href: "/student-life/gymkhana" },
  { label: "NSS", href: "/student-life/nss" },
  { label: "Cells & Centres", href: "/institute/cells" },
];

export default function GalleryPage() {
  const populated = albums
    .map((album) => ({
      ...album,
      images: assetsUnder(album.prefix).map((src, index) => ({
        src,
        alt: `${album.altBase} ${index + 1}`,
      })),
    }))
    .filter((album) => album.images.length > 0);

  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Campus"
        title="Photo Gallery"
        description="Moments from across Basaveshwar Engineering College — campus events, student life and industrial & educational visits."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        {populated.map((album) => (
          <div key={album.prefix} className="space-y-8">
            <SectionHeading
              eyebrow={album.eyebrow}
              title={album.title}
              description={album.description}
            />
            <PhotoGallery images={album.images} />
          </div>
        ))}

        <div className="space-y-6">
          <SectionHeading eyebrow="Explore" title="More Galleries" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {moreGalleries.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group flex items-center justify-between rounded-md border border-stone-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <span className="font-medium text-gray-900 transition-colors group-hover:text-primary">
                  {g.label}
                </span>
                <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

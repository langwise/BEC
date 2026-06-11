import Image from "next/image";

import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset, assetsUnder } from "@/lib/assets";
import { Heart, Users, Leaf, LifeBuoy, Award, CheckCircle2, Calendar } from "lucide-react";

export const metadata = pageMetadata({
  title: "National Service Scheme (NSS)",
  description:
    "The NSS unit at BEC Bagalkote, active since 1995 under the VTU NSS Cell — Swachh Bharat drives, health camps, tree plantation, disaster relief and certification criteria.",
  path: "/student-life/nss",
});

const HERO_IMAGE = asset("student-life/nss/cine0944.webp");
const COORDINATOR_IMAGE = asset("student-life/nss/dr-s-k-patil.webp");

const galleryImages = assetsUnder("student-life/nss/")
  .filter((src) => src !== HERO_IMAGE && src !== COORDINATOR_IMAGE)
  .map((src, index) => ({
    src,
    alt: `NSS volunteers at Basaveshwar Engineering College during a tree plantation and campus greening drive ${index + 1}`,
  }));

const activities = [
  {
    title: "Swachh Bharat",
    description: "Campus and village cleaning drives and sanitation awareness rallies.",
    icon: Users,
  },
  {
    title: "Health Camps",
    description: "Blood donation camps and free health checkups for villagers.",
    icon: Heart,
  },
  {
    title: "Environment",
    description: "Tree plantation drives (Vanamahotsava) and water conservation awareness.",
    icon: Leaf,
  },
  {
    title: "Disaster Relief",
    description: "Volunteering for flood relief, providing food and first aid to those affected.",
    icon: LifeBuoy,
  },
];

const milestones = [
  "NSS launched nationally in 1969 (Gandhiji's centenary year).",
  "Active at Basaveshwar Engineering College since 1995.",
  "Functioning under the VTU NSS Cell.",
  "Participated in the Swachh Bharat Summer Internship, 2018.",
];

export default function NssPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Community Service"
        title="National Service Scheme (NSS)"
        description='"Not Me But You" — developing personality through community service. The NSS unit at Basaveshwar Engineering College has been active since 1995.'
        badges={[{ label: "Not Me But You" }, { label: "Since 1995", tone: "outline" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-md border border-stone-200 bg-stone-100 shadow-sm">
          <Image
            src={HERO_IMAGE}
            alt="The NSS unit of Basaveshwar Engineering College with its Programme Officer and student volunteers"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-top"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About"
              title="Service to society, without bias"
            />
            <div className="space-y-4 text-base leading-relaxed text-gray-700">
              <p>
                The NSS unit aims to instill the idea of social welfare in
                students, encouraging them to provide service to society without
                bias. Through volunteerism, students learn the realities of rural
                life and the dignity of labour.
              </p>
            </div>
            <div className="rounded-md border-l-4 border-primary bg-orange-50/60 p-6">
              <blockquote className="text-lg font-serif italic text-gray-800">
                "The welfare of an individual is ultimately dependent on the
                welfare of the society as a whole."
              </blockquote>
              <cite className="mt-2 block text-sm font-semibold not-italic text-primary">
                — NSS Motto: Not Me But You
              </cite>
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Award className="h-5 w-5 text-primary" />
              Certification Criteria
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-md bg-stone-50 px-3 py-2">
                <span className="text-gray-700">Regular Activities</span>
                <span className="font-mono font-semibold text-gray-900">120 Hours</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-stone-50 px-3 py-2">
                <span className="text-gray-700">Annual Special Camp</span>
                <span className="font-mono font-semibold text-gray-900">120 Hours</span>
              </div>
              <p className="flex gap-2 border-t border-stone-100 pt-3 leading-relaxed text-gray-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Volunteers serving 2+ years and 240 hours are entitled to a
                university certificate signed by the Vice-Chancellor.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading eyebrow="Impact" title="Key Activities" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.title}
                  className="rounded-md border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-orange-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-gray-900">{act.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {act.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm text-center">
            <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border border-stone-200">
              <Image
                src={COORDINATOR_IMAGE}
                alt="Dr. S. K. Patil, NSS Programme Officer at Basaveshwar Engineering College"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Dr. S. K. Patil</h3>
            <p className="text-sm font-medium text-secondary">Programme Officer, NSS</p>
            <div className="mt-3 space-y-1 text-xs text-gray-600">
              <p>Department of Chemistry</p>
              <p>Basaveshwar Engineering College (A), Bagalkote - 587 102</p>
            </div>
            <div className="mt-4 space-y-1 border-t border-stone-100 pt-4 text-sm">
              <p className="text-gray-700">
                Mobile: <span className="text-gray-600">9448766350</span>
              </p>
              <p className="text-gray-700">
                Email:{" "}
                <a
                  href="mailto:sunilkumar.kp1971@gmail.com"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  sunilkumar.kp1971@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Calendar className="h-5 w-5 text-primary" />
              Unit Milestones
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {milestones.map((m) => (
                <li
                  key={m}
                  className="flex gap-3 rounded-md bg-stone-50 p-4 text-sm leading-relaxed text-gray-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              The unit also observes national days including Republic Day,
              Independence Day, Gandhi Jayanthi and International Yoga Day.
            </p>
          </div>
        </div>

        {galleryImages.length > 0 && (
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Gallery"
              title="In Action"
              description="Glimpses of NSS volunteers during tree plantation and campus greening drives at Basaveshwar Engineering College."
            />
            <PhotoGallery images={galleryImages} />
          </div>
        )}
      </section>
    </main>
  );
}

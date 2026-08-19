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

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

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
                      Bharath B Badiger
                    </span>
                    <span className="text-gray-500"> · Station Manager</span>
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
                  href="https://play.google.com/store/apps/details?id=atc.basaveshwarradio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700 transition-colors hover:text-primary"
                >
                  <AndroidIcon className="h-4 w-4 shrink-0 text-primary" />
                  Android app
                </a>
                <a
                  href="https://apps.apple.com/my/developer/atc-labs/id1240201510"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm text-gray-700 transition-colors hover:text-primary"
                >
                  <AppleIcon className="h-4 w-4 shrink-0 text-primary" />
                  iOS app
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

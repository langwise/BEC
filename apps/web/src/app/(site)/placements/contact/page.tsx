import Image from "next/image";
import { Mail, Phone, Briefcase, MapPin } from "lucide-react";
import { placementContent } from "@/data/placements/content";
import { PlacementsHeader } from "@/components/placements/placements-header";
import { asset } from "@/lib/assets";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact the Placement Cell",
  description:
    "Contact the Training & Placement Cell, Basaveshwar Engineering College, Bagalkote — register your interest for campus recruitment and reach the placement officers.",
  path: "/placements/contact",
});

export default function PlacementsContactPage() {
  const { home, officers, registerEmail } = placementContent;
  const [dean, ...otherOfficers] = officers;

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Placements", path: "/placements" },
          { name: "Contact", path: "/placements/contact" },
        ]}
      />
      <PlacementsHeader
        title="Contact Us"
        description="Planning a campus drive? Register your interest and the Training & Placement Cell will share available slots for the season."
      />

      {/* Register interest */}
      <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-orange-50 to-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              For Recruiters
            </span>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Register your interest</h2>
            <p className="mt-1 max-w-lg text-sm text-gray-600">
              Write to the Training &amp; Placement Cell and the team will get back with available
              slots and the recruitment schedule.
            </p>
          </div>
          <a
            href={`mailto:${registerEmail}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" /> {registerEmail}
          </a>
        </div>
      </div>

      {/* Dean — featured */}
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
              <Briefcase className="h-7 w-7" />
            </div>
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                {dean.scope}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">{dean.name}</h2>
              <p className="text-gray-500">{dean.role}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
            {dean.email && (
              <a
                href={`mailto:${dean.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary/90"
              >
                <Mail className="h-4 w-4" /> {dean.email}
              </a>
            )}
            <a
              href={`tel:+91${dean.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" /> +91 {dean.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Other officers */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherOfficers.map((o) => (
          <div
            key={o.name}
            className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-xs transition-colors hover:border-primary/30"
          >
            {o.photo && (
              <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={asset(o.photo)}
                  alt={`${o.name}, ${o.role}, Training & Placement Cell, Basaveshwar Engineering College, Bagalkote`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
            )}
            <span className="self-start rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              {o.scope}
            </span>
            <div className="mt-3 font-bold text-gray-900">{o.name}</div>
            <div className="text-sm text-gray-500">{o.role}</div>
            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              {o.email && (
                <a
                  href={`mailto:${o.email}`}
                  className="inline-flex items-center gap-1.5 text-gray-600 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" /> {o.email}
                </a>
              )}
              <a
                href={`tel:+91${o.phone}`}
                className="inline-flex items-center gap-1.5 text-gray-600 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" /> +91 {o.phone}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
        <MapPin className="h-4 w-4 shrink-0 text-primary" />
        {home.contact.address}
      </div>
    </>
  );
}

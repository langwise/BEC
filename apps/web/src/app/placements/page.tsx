import Image from "next/image";
import {
  Download,
  ArrowDown,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  Briefcase,
  MapPin,
} from "lucide-react";
import { placementContent } from "@/data/placements/content";
import {
  placementStats,
  topRecruiters,
  recruitersSheet,
} from "@/data/home/placements";
import { BrochureCover } from "@/components/placements/brochure-cover";
import { PhotoGallery } from "@/components/common/photo-gallery";
import { asset, assetsUnder } from "@/lib/assets";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";

const cellPhotos = assetsUnder("placements/cell/").map((src) => ({
  src,
  alt: "Training & Placement Cell, Basaveshwar Engineering College, Bagalkote",
}));

const featureImage = asset("placements/cell/cine0682.webp");

export const metadata = pageMetadata({
  title: "Placements & Recruiters",
  description:
    "Recruit from BEC Bagalkote — 60+ recruiters across IT, core engineering and consulting, with the placement brochure, policy, contacts and recruiter interest form on one page.",
  path: "/placements",
});

export default function PlacementsPage() {
  const { home, whyRecruit, policy, brochureHref, policyHref, accreditation, officers } =
    placementContent;
  const [dean, ...otherOfficers] = officers;

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbsJsonLd items={[{ name: "Placements", path: "/placements" }]} />
      {/* Hero band */}
      <section className="bg-linear-to-br from-orange-50 via-white to-slate-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-20 md:py-24 text-center">
          <BrochureCover width="200px" className="mb-10" />
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-5">
            Training & Placement Cell
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6 max-w-4xl mx-auto">
            One brochure. Everything about <span className="text-primary">BEC</span>.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">{home.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={brochureHref}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary/90"
            >
              <Download className="w-5 h-5" /> Download brochure
            </a>
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
            >
              Register interest <ArrowDown className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {placementStats.map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-bold text-accent">{s.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditation & rankings strip */}
      <section className="container mx-auto px-4 py-14">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          Accreditation &amp; Rankings
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {accreditation.map((a) => (
            <div
              key={a.label}
              className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 text-center"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                {a.label}
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">{a.value}</div>
              <div className="mt-1 text-xs text-gray-500 leading-snug">{a.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About band — text left / cover right */}
      <section id="about" className="container mx-auto px-4 py-20 scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About the cell</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              {home.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-orange-100 shadow-xl shadow-orange-900/5">
            <Image
              src={featureImage}
              alt="Students at a campus recruitment session in the Training & Placement Cell, Basaveshwar Engineering College, Bagalkote"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why band */}
      <section id="why" className="bg-orange-50/50 border-y border-orange-100 scroll-mt-24">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why recruit our students
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyRecruit.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white border border-orange-100 p-6">
                <CheckCircle2 className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{w.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy band */}
      <section id="policy" className="container mx-auto px-4 py-20 scroll-mt-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Placement policy</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {policy.slots.map((slot) => (
            <div key={slot.title} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-7">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {slot.ctc}
              </span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{slot.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{slot.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={policyHref}
            download
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
          >
            <FileText className="w-4 h-4" /> Download placement policy
          </a>
        </div>
      </section>

      {/* Placement cell gallery */}
      <section
        id="gallery"
        className="bg-orange-50/50 border-y border-orange-100 scroll-mt-24"
      >
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Inside the placement cell
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 text-center">
            Seminar halls, computer centres and interview rooms that host our campus
            recruitment drives.
          </p>
          <PhotoGallery images={cellPhotos} className="max-w-5xl mx-auto" />
        </div>
      </section>

      {/* Recruiters band */}
      <section id="recruiters" className="bg-orange-50/50 border-y border-orange-100 scroll-mt-24">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Recruiters who trust us
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-10 text-center">
            A snapshot of the 60+ companies that recruit from BEC across IT, core
            engineering and consulting.
          </p>
          <div className="max-w-5xl mx-auto rounded-2xl border border-orange-100 bg-white p-4 sm:p-6 shadow-sm">
            <Image
              src={asset(recruitersSheet.src)}
              alt={`Esteemed recruiters of Basaveshwar Engineering College, Bagalkote, including ${topRecruiters
                .slice(0, 12)
                .join(", ")} and more`}
              width={recruitersSheet.width}
              height={recruitersSheet.height}
              sizes="(max-width: 1024px) 92vw, 1024px"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <ul className="sr-only">
            {topRecruiters.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact band */}
      <section id="register" className="container mx-auto px-4 py-20 scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-5">
            Get in touch
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Register your interest</h2>
          <p className="text-lg text-gray-600">
            Planning a campus drive? Reach out to the Training &amp; Placement Cell and
            the team will share available slots for the season.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Featured primary contact — recruiter point of contact */}
          <div className="rounded-3xl border border-primary/20 bg-linear-to-br from-orange-50 to-white p-8 md:p-10 shadow-xl shadow-orange-900/5">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
              <div className="flex items-start gap-5">
                <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Briefcase className="h-7 w-7" />
                </div>
                <div>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                    {dean.scope}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-gray-900">{dean.name}</h3>
                  <p className="text-gray-500">{dean.role}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
                {dean.email && (
                  <a
                    href={`mailto:${dean.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary/90"
                  >
                    <Mail className="w-4 h-4" /> {dean.email}
                  </a>
                )}
                <a
                  href={`tel:+91${dean.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
                >
                  <Phone className="w-4 h-4" /> +91 {dean.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Officer directory */}
          <h3 className="mt-12 mb-5 text-sm font-bold uppercase tracking-widest text-gray-400 text-center">
            More placement contacts
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherOfficers.map((o) => (
              <div
                key={o.name}
                className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50/60 p-6 transition-colors hover:border-primary/30 hover:bg-white"
              >
                <span className="self-start rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  {o.scope}
                </span>
                <div className="mt-4 font-bold text-gray-900">{o.name}</div>
                <div className="text-sm text-gray-500">{o.role}</div>
                <div className="mt-4 flex flex-col gap-1.5 text-sm">
                  {o.email && (
                    <a
                      href={`mailto:${o.email}`}
                      className="inline-flex items-center gap-1.5 text-gray-600 transition-colors hover:text-primary"
                    >
                      <Mail className="w-4 h-4" /> {o.email}
                    </a>
                  )}
                  <a
                    href={`tel:+91${o.phone}`}
                    className="inline-flex items-center gap-1.5 text-gray-600 transition-colors hover:text-primary"
                  >
                    <Phone className="w-4 h-4" /> +91 {o.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 shrink-0 text-primary" />
            {home.contact.address}
          </div>
        </div>
      </section>
    </div>
  );
}

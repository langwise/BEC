import { Download, ArrowDown, CheckCircle2, Mail, Phone } from "lucide-react";
import { placementContent } from "@/data/placements/content";
import { placementStats, topRecruiters } from "@/data/home/placements";
import { BrochureCover } from "@/components/placements/brochure-cover";
import { RecruiterForm } from "@/components/placements/recruiter-form";
import { BrandLogo } from "@/components/placements/brand-logo";

export const metadata = {
  title: "Placements | Basaveshwar Engineering College",
  description:
    "Recruit from BEC Bagalkote — placement brochure, policy, recruiters and recruiter interest form, all on one page.",
};

export default function PlacementsPage() {
  const { home, whyRecruit, policy, brochureHref, accreditation, officers } =
    placementContent;

  return (
    <div className="min-h-screen bg-white">
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
          <BrochureCover width="260px" />
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
      </section>

      {/* Recruiters band */}
      <section id="recruiters" className="bg-orange-50/50 border-y border-orange-100 scroll-mt-24">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Recruiters who trust us
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {topRecruiters.map((r) => (
              <div
                key={r.name}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-white p-6"
              >
                <BrandLogo
                  name={r.name}
                  domain={r.domain}
                  className="h-10 w-auto max-w-[120px]"
                  monogramClassName="h-12 w-12 text-lg"
                />
                <span className="text-sm font-medium text-gray-700">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + contacts band */}
      <section id="register" className="container mx-auto px-4 py-20 scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Register your interest</h2>
          <p className="text-lg text-gray-600">
            Planning a campus drive? Share your details and the placement office will
            reach out with available slots for the season.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* Contacts */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-5">
              Training &amp; Placement Cell
            </h3>
            <div className="space-y-3">
              {officers.map((o) => (
                <div
                  key={o.name}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-gray-900">{o.name}</div>
                      <div className="text-sm text-gray-500">{o.role}</div>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary whitespace-nowrap">
                      {o.scope}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                    {o.email && (
                      <a
                        href={`mailto:${o.email}`}
                        className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4" /> {o.email}
                      </a>
                    )}
                    <a
                      href={`tel:+91${o.phone}`}
                      className="inline-flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" /> +91 {o.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <RecruiterForm />
        </div>
      </section>
    </div>
  );
}

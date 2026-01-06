"use client";

import { FadeIn } from "@/components/animations/fade-in";
import {
  CheckCircle2,
  FileText,
  Users,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function InternalGrievancePage() {
  const objectives = [
    "To prevent sexual harassment of women at the workplace.",
    "To provide a safe and secure environment for women students and staff.",
    "To address complaints regarding gender discrimination.",
    "To organize awareness programs on gender sensitization and women's rights.",
  ];

  const committee = [
    {
      name: "Dr. (Mrs.) V. S. Soraganvi",
      role: "Presiding Officer",
      designation: "Prof. & Dean (R&D)",
    },
    {
      name: "Dr. (Ms.) S. S. Kulkarni",
      role: "Member",
      designation: "Assoc. Professor",
    },
    {
      name: "Mrs. J. N. Madhur",
      role: "Member",
      designation: "Advocate (External)",
    },
    {
      name: "Ms. R. B. Joshi",
      role: "Member",
      designation: "Non-Teaching Staff",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}

      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Facilities · Internal Complaints
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Internal Complaints Committee
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              (Women's Empowerment & Anti-Sexual Harassment Cell) - Ensuring
              dignity, safety, and equality for women.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* Objectives */}
        <section>
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Objectives & Functions
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <ul className="grid md:grid-cols-2 gap-6">
                {objectives.map((obj, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 items-start text-gray-700 bg-stone-50 p-4 rounded-xl border border-stone-100 hover:border-primary/20 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed font-medium">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* Committee Members */}
        <section>
          <FadeIn delay={0.2}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              ICC Members
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {committee.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="w-24 h-24 mx-auto bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden ring-4 ring-white shadow-md">
                    <Users className="h-10 w-10 opacity-50" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-orange-50 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    {member.designation}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Contact / Redressal */}
        <section>
          <FadeIn delay={0.4}>
            <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
              <div className="lg:max-w-2xl">
                <h2 className="text-2xl font-bold mb-3">
                  Confidential Reporting
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  We maintain zero tolerance towards harassment. Complaints are
                  handled with utmost sensitivity and confidentiality. You can
                  reach out to the presiding officer or any member directly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 shrink-0 w-full lg:w-auto bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">
                      Emergency / Cell
                    </div>
                    <div className="font-semibold text-sm">+91-8354-234060</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Secure Email</div>
                    <div className="font-semibold text-sm">icc@becbgk.edu</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}

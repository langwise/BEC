"use client";

import { FadeIn } from "@/components/animations/fade-in";
import {
  Building2,
  Award,
  FlaskConical,
  Cpu,
  Radio,
  Layers,
  Mountain,
  Hammer,
  Satellite,
  Settings,
  Sun,
  Gauge,
  Leaf,
  GraduationCap,
} from "lucide-react";

const researchStats = [
  { value: "10", label: "Research Centres" },
  { value: "64", label: "Research Supervisors" },
  { value: "123", label: "Research Scholars" },
  { value: "140", label: "Ph.D.s Awarded" },
];

// VTU-recognized research centres — year of recognition, registered guides,
// scholars currently registered, and Ph.D.s awarded (source: becbgk.edu/Research).
const researchCentres = [
  { centre: "Biotechnology", year: "2010", guides: "4", scholars: "5", phds: "9" },
  { centre: "Civil Engineering", year: "2003", guides: "11", scholars: "18", phds: "22" },
  { centre: "Computer Science & Engineering", year: "2004", guides: "11", scholars: "23", phds: "13" },
  { centre: "Electronics & Communication Engineering", year: "2005", guides: "14", scholars: "18", phds: "25" },
  { centre: "Electrical & Electronics Engineering", year: "2003", guides: "4", scholars: "8", phds: "13" },
  { centre: "Industrial & Production Engineering", year: "2007", guides: "5", scholars: "13", phds: "5" },
  { centre: "Information Science & Engineering", year: "2020", guides: "2", scholars: "2", phds: "—" },
  { centre: "Mechanical Engineering", year: "2003", guides: "9", scholars: "32", phds: "53" },
  { centre: "Physics", year: "2012", guides: "3", scholars: "3", phds: "—" },
  { centre: "Management Studies (MBA)", year: "2020", guides: "1", scholars: "1", phds: "—" },
];

const centresOfExcellence = [
  {
    icon: Cpu,
    title: "National MEMS Design Centre",
    description:
      "Established under NPMASS (National Programme for Micro and Smart Structures), a Government of India initiative to promote micro and nano technology in India.",
  },
  {
    icon: Cpu,
    title: "Intel Intelligent Systems Laboratory",
    description:
      "An exclusive lab set up in association with Intel to carry out innovative projects, under an MoU signed on 16 November 2013.",
  },
  {
    icon: Layers,
    title: "Multimedia, Vision Computing & Image Processing",
    description:
      "Laboratory equipped for multimedia data acquisition and high-performance computing across heterogeneous environments, covering wireless networks and image processing.",
  },
  {
    icon: Radio,
    title: "NOKIA Research Laboratory",
    description:
      "VTU–Nokia Research Lab set up under the Nokia University India Grant to study the latest mobile technologies through mobile research and learning.",
  },
  {
    icon: FlaskConical,
    title: "Centre for Advanced Materials Research Studies",
    description:
      "Focused on synthesizing and characterizing new alloys, established through DRDO grants valued at Rs. 2.62 crores.",
  },
  {
    icon: Layers,
    title: "Smart Composite Structures Research Centre (SCSRC)",
    description:
      "Advanced research facility dedicated to the study and development of composite materials and structures.",
  },
  {
    icon: Mountain,
    title: "Advanced Geotechnical Engineering Laboratory",
    description:
      "Specialized laboratory for geotechnical engineering research and testing.",
  },
  {
    icon: Hammer,
    title: "Structural Engineering Laboratory",
    description:
      "State-of-the-art facilities created to support advanced structural engineering research.",
  },
  {
    icon: Satellite,
    title: "Remote Sensing and GIS Laboratory",
    description:
      "Facility for geographic information systems and remote sensing applications.",
  },
  {
    icon: Settings,
    title: "Bosch Rexroth Centre for Industrial Automation",
    description:
      "Focuses on hydraulic and pneumatic technologies for industrial applications across aerospace and material-handling sectors.",
  },
  {
    icon: Sun,
    title: "Renewable Energy Research Centre",
    description:
      "Emphasizes modelling of wind energy conversion systems, solar–wind hybrid systems and related grid technologies.",
  },
  {
    icon: Gauge,
    title: "SCADA for Distribution Automation Research Centre",
    description:
      "Established in 2014 for supervisory control and data acquisition (SCADA) research in distribution automation.",
  },
  {
    icon: Leaf,
    title: "Bioenergy Research, Information & Demonstration Centre (BRIDC)",
    description:
      "Centre dedicated to bioenergy research, demonstration and outreach.",
  },
];

export default function ResearchFacilitiesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200 bg-linear-to-br from-orange-50 via-white to-stone-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f97316_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,#0f172a_0%,transparent_28%)]" />
        </div>
        <div className="relative container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Research
          </p>
          <div className="mt-4 space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
              Research &amp; Development
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Ten VTU-recognized research centres and a QIP centre for doctoral
              studies, driving innovation across engineering, science and
              management.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {researchStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn className="bg-white rounded-2xl p-8 md:p-12 border border-stone-200 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Research at BEC
            </h2>
            <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
              <p>
                Basaveshwar Engineering College operates 10 research centres
                recognized by VTU, Belagavi and functions as a QIP centre for
                doctoral admissions. The college has well-qualified faculty, with
                87 members holding Ph.D. degrees from IITs and NITs, actively
                engaged in quality teaching–learning and research.
              </p>
              <p>
                Over the last five years the college secured research grants of
                about Rs. 3.00 crores, in addition to Rs. 40 crores through the
                World Bank–assisted TEQIP programme across its three phases.
                Research output over the same period includes 855 publications in
                peer-reviewed national and international journals and 355 in
                conferences.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "87", label: "Faculty with Ph.D." },
                { value: "855", label: "Journal Publications (5 yrs)" },
                { value: "355", label: "Conference Papers (5 yrs)" },
                { value: "₹43 Cr", label: "Grants incl. TEQIP" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-center"
                >
                  <div className="text-2xl font-bold text-primary">{item.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Research Centres table */}
          <FadeIn className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Recognized Research Centres
            </h2>
            <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-stone-200 text-sm">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Research Centre
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Recognized
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Guides
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Scholars
                    </th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Ph.D.s Awarded
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {researchCentres.map((row) => (
                    <tr key={row.centre} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-gray-900">{row.centre}</td>
                      <td className="px-5 py-3.5 text-center text-gray-700">{row.year}</td>
                      <td className="px-5 py-3.5 text-center text-gray-700">{row.guides}</td>
                      <td className="px-5 py-3.5 text-center text-gray-700">{row.scholars}</td>
                      <td className="px-5 py-3.5 text-center text-gray-700">{row.phds}</td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50 font-semibold text-gray-900">
                    <td className="px-5 py-3.5">Total</td>
                    <td className="px-5 py-3.5 text-center">—</td>
                    <td className="px-5 py-3.5 text-center">64</td>
                    <td className="px-5 py-3.5 text-center">123</td>
                    <td className="px-5 py-3.5 text-center">140</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Centres of Excellence */}
          <FadeIn className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-7 w-7 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Centres of Excellence
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {centresOfExcellence.map((centre) => {
                const Icon = centre.icon;
                return (
                  <div
                    key={centre.title}
                    className="h-full bg-white rounded-lg border border-stone-200 p-6 shadow-sm hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {centre.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {centre.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* Dean R&D */}
          <FadeIn className="mt-12">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 flex flex-col sm:flex-row items-start gap-5">
              <div className="w-14 h-14 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary mb-1">
                  Research Leadership
                </p>
                <h3 className="text-xl font-bold text-gray-900">
                  Dr. Mahabaleshwar S. Kakkasageri
                </h3>
                <p className="text-primary font-semibold">Dean, Research &amp; Development</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
                  The R&amp;D cell coordinates the recognized research centres,
                  funded projects, consultancy and the institution&apos;s Ph.D.
                  programmes, supported by Research Advisory, Ethics and Review
                  committees and a formal research policy.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Industry-partnered labs */}
          <FadeIn className="mt-12">
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Laboratories with Industry Partnerships
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Bosch Rexroth – Industrial Automation",
                  "Intel Intelligent Systems",
                  "Nokia Research Centre",
                  "MEMS Design Centre",
                  "SCADA Laboratory",
                  "Renewable Energy Research Centre",
                  "Advanced Materials Research Studies",
                  "Smart Composite Structures",
                  "Geotechnical & Structural Engineering",
                  "Biodiesel / Bioenergy Centre",
                  "Multimedia Laboratory",
                ].map((lab) => (
                  <span
                    key={lab}
                    className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-gray-700"
                  >
                    {lab}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

"use client";

import { PageHeader } from "@/components/placements/page-header";
import { CheckCircle2, GraduationCap, Building2, Wallet, Code2, Cpu } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

const mcaData = {
  title: "Master of Computer Applications (MCA)",
  description: "Master the art of software development and application design with our comprehensive MCA programme focused on cutting-edge technologies.",
  highlights: [
      "Latest Technology Stack",
      "Industry-Certified Faculty",
      "Cloud & DevOps Training",
      "Coding Competitions & Hackathons",
      "Project-Based Learning",
      "100% Placement Assistance",
  ],
  disciplines: [
      "Software Engineering",
      "Web Technologies",
      "Data Science & AI",
      "Cloud Computing",
      "Mobile App Development",
      "Cybersecurity",
  ],
  admission: {
    eligibility: [
        "Bachelor's degree with minimum 50% aggregate (45% for SC/ST/Category-I)",
        "Valid score in PGCET/KMAT or equivalent entrance exam",
    ],
    exams: [
        { name: "PGCET", description: "Karnataka State Entrance" },
        { name: "KMAT", description: "Management Aptitude Test" },
        { name: "Institute Entrance", description: "For Mgmt Quota" },
    ]
  },
  fees: [
      { quota: "Government Quota", type: "Un-Aided", desc: "Rs. 55,000 (at KEA) + VTU + College Fees" },
      { quota: "Management Quota", type: "Unaided", desc: "Mgmt Fees + VTU + College Fees" },
  ]
};

function SectionHeader({ icon: Icon, title }: { icon: any, title: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
    )
}

export default function MCAProgrammePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title={mcaData.title}
        description={mcaData.description}
      />

      {/* Overview & Highlights */}
      <section className="space-y-8">
        <div className="prose prose-lg prose-orange max-w-none text-gray-600">
            <p>
                The MCA programme at BEC is designed to develop skilled IT professionals capable of designing, developing, and managing software applications. With a perfect blend of theoretical concepts and hands-on practical training, our graduates are industry-ready from day one.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            {mcaData.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-gray-700">{item}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section>
          <SectionHeader icon={Code2} title="Key Focus Areas" />
          <div className="grid md:grid-cols-3 gap-4">
              {mcaData.disciplines.map((dept, idx) => (
                  <FadeIn key={idx} delay={idx * 0.05}>
                    <div className="p-4 rounded-lg bg-white border border-gray-100 text-gray-800 font-medium hover:border-primary/40 hover:text-primary transition-all duration-300 shadow-sm flex items-center gap-3">
                        <Cpu className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                        {dept}
                    </div>
                  </FadeIn>
              ))}
          </div>
      </section>

      {/* Admission */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <SectionHeader icon={Building2} title="Admission Process" />
          
          <div className="space-y-8">
            <div>
                <ul className="space-y-3">
                    {mcaData.admission.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-wrap gap-4">
                {mcaData.admission.exams.map((exam, idx) => (
                    <div key={idx} className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700">
                        {exam.name}
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* Fees */}
      <section>
          <SectionHeader icon={Wallet} title="Fee Structure" />
          <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                      <tr>
                          <th className="px-6 py-4">Quota</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4">Details</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                      {mcaData.fees.map((fee, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="px-6 py-4 font-medium text-gray-900">{fee.quota}</td>
                              <td className="px-6 py-4 text-gray-600">{fee.type}</td>
                              <td className="px-6 py-4 text-gray-600">{fee.desc}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-4">
            {[
                { label: "Placement Rate", value: "98%" },
                { label: "Avg Package", value: "₹4.8L" },
                { label: "High Package", value: "₹14L+" },
                { label: "Recruiters", value: "85+" },
            ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-100 text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
            ))}
        </section>
    </div>
  );
}
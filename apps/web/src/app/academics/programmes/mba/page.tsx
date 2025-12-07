"use client";

import { PageHeader } from "@/components/placements/page-header";
import { CheckCircle2, GraduationCap, Building2, Wallet, Briefcase, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

const mbaData = {
  title: "Master of Business Administration (MBA)",
  description: "Transform into a strategic business leader with our comprehensive MBA programme blending management principles with technical expertise.",
  highlights: [
      "Industry-Relevant Curriculum",
      "Case Study Based Learning",
      "Entrepreneurship Development",
      "Executive Mentorship",
      "Live Business Projects",
      "Soft Skills & Leadership Training",
  ],
  specializations: [
      "Finance Management",
      "Marketing Management",
      "Human Resource Management",
      "Operations Management",
  ],
  admission: {
    eligibility: [
        "Bachelor's degree in any discipline with minimum 50% aggregate (45% for SC/ST/Category-I)",
        "Valid score in PGCET/KMAT or equivalent entrance test",
    ],
    exams: [
        { name: "PGCET", description: "Karnataka State Entrance" },
        { name: "KMAT", description: "Management Aptitude Test" },
        { name: "Institute Entrance", description: "For Mgmt Quota" },
    ]
  },
  fees: [
      { quota: "Government Quota", type: "Un-Aided", desc: "Rs. 50,000 (at KEA) + VTU + College Fees" },
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

export default function MBAProgrammePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title={mbaData.title}
        description={mbaData.description}
      />

      {/* Overview & Highlights */}
      <section className="space-y-8">
        <div className="prose prose-lg prose-orange max-w-none text-gray-600">
            <p>
                The MBA programme at BEC is designed to create future business leaders who can bridge the gap between technology and management. Our curriculum integrates core management principles with practical industry exposure, preparing graduates for leadership roles in diverse sectors.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            {mbaData.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-gray-700">{item}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Specializations */}
      <section>
          <SectionHeader icon={Briefcase} title="Specializations" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mbaData.specializations.map((dept, idx) => (
                  <FadeIn key={idx} delay={idx * 0.05}>
                    <div className="p-5 rounded-xl bg-white border border-gray-100 text-gray-800 font-bold text-center hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
                        <div className="w-10 h-10 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        {dept}
                    </div>
                  </FadeIn>
              ))}
          </div>
      </section>

      {/* Admission */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <SectionHeader icon={Building2} title="Admission Criteria" />
          
          <div className="space-y-8">
            <div>
                <ul className="space-y-3">
                    {mbaData.admission.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-wrap gap-4">
                {mbaData.admission.exams.map((exam, idx) => (
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
                      {mbaData.fees.map((fee, idx) => (
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

        {/* MBA Stats */}
        <section className="grid md:grid-cols-4 gap-4">
           {[
               { label: "Placement Rate", value: "94%" },
               { label: "Avg Package", value: "₹4.2L" },
               { label: "High Package", value: "₹10L+" },
               { label: "Recruiters", value: "60+" },
           ].map((stat, idx) => (
               <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-primary to-orange-600 text-white text-center shadow-lg shadow-orange-200/50">
                   <div className="text-3xl font-bold mb-1">{stat.value}</div>
                   <div className="text-xs opacity-90 uppercase tracking-wider">{stat.label}</div>
               </div>
           ))}
       </section>
    </div>
  );
}
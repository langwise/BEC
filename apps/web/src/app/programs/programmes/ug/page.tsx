"use client";

import { PageHeader } from "@/components/placements/page-header";
import { CheckCircle2, GraduationCap, Building2, Wallet, BookOpen, Briefcase, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

const ugData = {
  title: "Under Graduate (B.E.)",
  description: "Build a strong foundation in engineering with our comprehensive 4-year undergraduate programmes across 11 disciplines.",
  highlights: [
      "NAAC 'A' Grade Accredited",
      "NBA Recognized Programmes",
      "100% PhD Qualified Faculty",
      "State-of-the-art Laboratories",
      "Industry-Integrated Curriculum",
      "Strong Placement Record",
  ],
  disciplines: [
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical & Electronics Engineering",
      "Electronics & Communication Engineering",
      "Computer Science Engineering",
      "Information Science Engineering",
      "Industrial & Production Engineering",
      "Chemical Engineering",
      "Bio-Technology",
      "Artificial Intelligence & Data Science",
      "Computer Science & Business Systems",
  ],
  admission: {
    eligibility: [
        "Passed 2nd PUC / 12th standard or equivalent with English as one of the languages",
        "Obtained 45% marks in aggregate in Physics & Mathematics along with Chemistry/Bio-Technology/Computer Science/Electronics/Biology",
        "For SC/ST/OBC (Category I, 2A, 2B, 3A & 3B) students: 40% marks in aggregate in the optional subjects",
    ],
    exams: [
        { name: "Karnataka CET", description: "For Government Quota seats" },
        { name: "COMED-K", description: "For COMED-K Quota seats" },
        { name: "JEE Main", description: "Accepted for admissions" },
        { name: "Institute Entrance", description: "For Management Quota" },
    ]
  },
  fees: [
      { quota: "Government Quota", type: "Aided", desc: "KEA + VTU + College Fees" },
      { quota: "Government Quota", type: "Un-Aided", desc: "KEA + VTU + College Fees" },
      { quota: "COMED-K Quota", type: "Un-aided", desc: "COMED-K Fees + VTU + College Fees" },
      { quota: "Management Quota", type: "Aided/Unaided", desc: "Mgmt Fees + VTU + College Fees" },
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

export default function UGProgrammePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title={ugData.title}
        description={ugData.description}
      />

      {/* Overview & Highlights */}
      <section className="space-y-8">
        <div className="prose prose-lg prose-orange max-w-none text-gray-600">
            <p>
                Basaveshwar Engineering College offers Bachelor of Engineering programmes in 11 disciplines, providing students with a strong foundation in engineering principles and practical skills. Our NAAC 'A' accredited and NBA recognized programmes prepare students for successful careers in industry and research.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            {ugData.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-gray-700">{item}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Disciplines Grid */}
      <section>
          <SectionHeader icon={GraduationCap} title="Programmes Offered" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ugData.disciplines.map((dept, idx) => (
                  <FadeIn key={idx} delay={idx * 0.05}>
                    <div className="p-4 rounded-lg bg-orange-50/50 border border-orange-100 text-gray-800 font-medium hover:bg-white hover:shadow-md transition-all duration-300">
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
                <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
                <ul className="space-y-3">
                    {ugData.admission.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Entrance Exams</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {ugData.admission.exams.map((exam, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="font-bold text-primary mb-1">{exam.name}</div>
                            <div className="text-xs text-gray-500">{exam.description}</div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
      </section>

      {/* Fees */}
      <section>
          <SectionHeader icon={Wallet} title="Fee Structure Overview" />
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
                      {ugData.fees.map((fee, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="px-6 py-4 font-medium text-gray-900">{fee.quota}</td>
                              <td className="px-6 py-4 text-gray-600">{fee.type}</td>
                              <td className="px-6 py-4 text-gray-600">{fee.desc}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">* Detailed fee structure documents available at admission office.</p>
      </section>

       {/* Quick Stats / Placement */}
       <section className="grid md:grid-cols-4 gap-4">
           {[
               { label: "Placement Rate", value: "96%" },
               { label: "Avg Package", value: "₹3.14L" },
               { label: "High Package", value: "₹12L+" },
               { label: "Recruiters", value: "100+" },
           ].map((stat, idx) => (
               <div key={idx} className="p-6 rounded-2xl bg-primary text-white text-center">
                   <div className="text-3xl font-bold mb-1">{stat.value}</div>
                   <div className="text-xs opacity-90 uppercase tracking-wider">{stat.label}</div>
               </div>
           ))}
       </section>
    </div>
  );
}
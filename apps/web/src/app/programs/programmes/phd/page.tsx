"use client";

import { PageHeader } from "@/components/placements/page-header";
import { CheckCircle2, GraduationCap, Building2, Beaker, FileText, Microscope } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

const phdData = {
  title: "M.Sc. (Engg.) & Ph.D",
  description: "Embark on a journey of advanced research and innovation with our doctoral and M.Sc. Engineering programmes across multiple disciplines.",
  highlights: [
      "9 VTU Recognized Research Centers",
      "100% PhD Qualified Supervisors",
      "Advanced Research Facilities",
      "Industry-Sponsored Research Projects",
      "Publication Support & Guidance",
      "International Collaboration Opportunities",
  ],
  centers: [
      "Civil Engineering",
      "Computer Science & Engineering",
      "Electronics & Communication Engineering",
      "Electrical & Electronics Engineering",
      "Bio-Technology",
      "Mechanical Engineering",
      "Physics (M.Sc. Engg.)",
      "Information Science & Engineering",
  ],
  admission: {
    eligibility: [
        "Ph.D: M.E./M.Tech/M.Sc.(Engg.) with minimum 55% (50% for SC/ST/OBC)",
        "M.Sc.(Engg.): B.E./B.Tech with minimum 55% (50% for SC/ST/OBC)",
        "Valid GATE/NET/SLET score (preferred)",
    ],
    exams: [
        { name: "Research Entrance Test", description: "Written test by BEC/VTU" },
        { name: "Interview", description: "Research Committee Interview" },
        { name: "GATE/NET Exempt", description: "Direct Interview" },
    ]
  }
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

export default function PhDProgrammePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title={phdData.title}
        description={phdData.description}
      />

      {/* Overview & Highlights */}
      <section className="space-y-8">
        <div className="prose prose-lg prose-orange max-w-none text-gray-600">
            <p>
                BEC offers M.Sc.(Engg.) and Ph.D programmes in 9 recognized research centers with state-of-the-art facilities. With ₹3.40 crores in research grants and 35+ industry collaborations, we provide an excellent ecosystem for cutting-edge research and innovation.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            {phdData.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-gray-700">{item}</span>
                </div>
            ))}
        </div>
      </section>

      {/* Research Centers */}
      <section>
          <SectionHeader icon={Microscope} title="Recognized Research Centers" />
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
              {phdData.centers.map((center, idx) => (
                  <FadeIn key={idx} delay={idx * 0.05}>
                    <div className="p-4 rounded-lg bg-orange-50/50 border border-orange-100 text-gray-800 font-medium flex items-center gap-3 hover:bg-white hover:shadow-sm transition-all">
                        <Beaker className="w-4 h-4 text-primary" />
                        {center}
                    </div>
                  </FadeIn>
              ))}
          </div>
      </section>

      {/* Admission */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <SectionHeader icon={Building2} title="Admission & Selection" />
          
          <div className="space-y-8">
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Eligibility</h3>
                <ul className="space-y-3">
                    {phdData.admission.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
                {phdData.admission.exams.map((exam, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="font-bold text-primary mb-1">{exam.name}</div>
                        <div className="text-xs text-gray-500">{exam.description}</div>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* Docs / Procedure */}
      <section>
          <SectionHeader icon={FileText} title="Application Procedure" />
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-sm text-gray-700 space-y-4">
              <p>
                  <strong>How to Apply:</strong> Download application form from VTU website (www.vtu.ac.in), pay Rs. 1500/- online, and submit with necessary documents to VTU Registrar.
              </p>
              <p>
                  <strong>Documents Required:</strong> SSLC, UG, PG Marks Cards, NOC (for Part-time), Synopsis, Guide Consent, and Online Fee Receipt.
              </p>
          </div>
      </section>

         {/* Stats */}
         <section className="grid md:grid-cols-4 gap-4">
           {[
               { label: "Research Centers", value: "9" },
               { label: "Research Grants", value: "₹3.4Cr" },
               { label: "Duration", value: "3-6 Yrs" },
               { label: "Industry MoUs", value: "35+" },
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
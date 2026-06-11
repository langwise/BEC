import { pageMetadata } from "@/lib/seo";
import { ProgrammeHeader } from "@/components/academics/programmes/programme-header";
import { CheckCircle2, GraduationCap, Building2, Wallet, FileText, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { BreadcrumbsJsonLd } from "@/components/seo/jsonld";
import { asset } from "@/lib/assets";

export const metadata = pageMetadata({
  title: "B.E. Undergraduate Programmes",
  description:
    "BEC Bagalkote offers 4-year B.E. programmes across 11 disciplines with 990 total seats — admitted via Karnataka CET, COMED-K or JEE Main. NAAC 'A' grade, NBA accredited.",
  path: "/academics/programmes/ug",
});

const ugData = {
  title: "Under Graduate (B.E.)",
  description: "Build a strong foundation in engineering with our comprehensive 4-year undergraduate programmes across 11 disciplines.",
  highlights: [
      "NAAC 'A' Grade Accredited",
      "NBA Recognized Programmes",
      "PhD-Qualified Faculty",
      "State-of-the-art Laboratories",
      "Industry-Integrated Curriculum",
      "Strong Placement Record",
  ],
  // Branches and sanctioned intake as per becbgk.edu Admissions (UG).
  disciplines: [
      { name: "Mechanical Engineering", intake: "120" },
      { name: "Civil Engineering", intake: "120" },
      { name: "Computer Science & Engineering", intake: "180" },
      { name: "Information Science & Engineering", intake: "180" },
      { name: "Electronics & Communication Engineering", intake: "120" },
      { name: "Electrical & Electronics Engineering", intake: "60" },
      { name: "Artificial Intelligence & Machine Learning", intake: "60" },
      { name: "Electronics & Computer Engineering", intake: "60" },
      { name: "Industrial & Production Engineering", intake: "30" },
      { name: "Automobile Engineering", intake: "30" },
      { name: "Biotechnology", intake: "30" },
  ],
  collegeCodes: "Aided: E031  ·  Un-Aided (KEA): E049  ·  COMED-K: E024",
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
        { name: "Diploma Lateral Entry", description: "Direct 2nd-year admission" },
        { name: "Institute Entrance", description: "For Management Quota" },
    ]
  },
  fees: [
      { quota: "Government Quota", type: "Aided", desc: "KEA + VTU + College Fees" },
      { quota: "Government Quota", type: "Un-Aided", desc: "KEA + VTU + College Fees" },
      { quota: "COMED-K Quota", type: "Un-aided", desc: "COMED-K Fees + VTU + College Fees" },
      { quota: "Management Quota", type: "Aided/Unaided", desc: "Mgmt Fees + VTU + College Fees" },
  ],
  feeDocuments: [
      { title: "College & VTU Fees", desc: "Tuition and VTU fee schedule — PDF", href: asset("documents/admissions/ug-vtu-and-college-fee.pdf") },
      { title: "College Other Fees", desc: "Additional college fee schedule — PDF", href: asset("documents/admissions/ug-college-other-fee.pdf") },
      { title: "Management Quota Fee Structure", desc: "BE 1st year & Diploma lateral entry, AY 2025-26", href: asset("documents/admissions/ug-management-fee-2025-26.jpeg") },
  ],
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
      <BreadcrumbsJsonLd
        items={[
          { name: "Academics", path: "/academics/programmes/ug" },
          { name: "UG Programmes", path: "/academics/programmes/ug" },
        ]}
      />
      <ProgrammeHeader
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
                    <div className="flex items-center justify-between gap-3 p-4 rounded-lg bg-orange-50/50 border border-orange-100 text-gray-800 font-medium hover:bg-white hover:shadow-md transition-all duration-300">
                        <span>{dept.name}</span>
                        <span className="shrink-0 rounded-full bg-white border border-orange-100 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {dept.intake} seats
                        </span>
                    </div>
                  </FadeIn>
              ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
              College Codes — {ugData.collegeCodes}. Total sanctioned intake: 990 seats.
          </p>
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
          <div className="overflow-x-auto rounded-xl border border-gray-200">
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
          <p className="text-xs text-gray-500 mt-4">* Tuition is fixed by KEA / COMED-K; VTU and College fees are payable in addition. Detailed year-wise fee structure is available from the Admission Office.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {ugData.feeDocuments.map((doc, idx) => (
                  <a
                      key={idx}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-xs hover:border-primary/40 hover:shadow-sm transition-all group"
                  >
                      <div className="p-2.5 bg-primary/10 text-primary rounded-lg shrink-0">
                          <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">{doc.title}</p>
                          <p className="text-xs text-gray-500">{doc.desc}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 ml-auto shrink-0" />
                  </a>
              ))}
          </div>
      </section>
    </div>
  );
}
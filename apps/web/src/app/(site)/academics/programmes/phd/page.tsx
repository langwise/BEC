import { pageMetadata } from "@/lib/seo";
import { ProgrammeHeader } from "@/components/academics/programmes/programme-header";
import { CheckCircle2, GraduationCap, Building2, Beaker, FileText, Microscope } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata = pageMetadata({
  title: "M.Sc. (Engg.) & Ph.D Research",
  description:
    "Pursue M.Sc.(Engg.) and Ph.D at BEC Bagalkote across 9 VTU-recognized research centres, with full-time and part-time registration administered by VTU, Belagavi.",
  path: "/academics/programmes/phd",
});

const phdData = {
  title: "M.Sc. (Engg.) & Ph.D",
  description: "Embark on a journey of advanced research and innovation with our doctoral and M.Sc. Engineering programmes across multiple disciplines.",
  highlights: [
      "9 VTU-Recognized Research Centres",
      "M.Sc.(Engg.) & Ph.D Programmes",
      "VTU-Administered Admission",
      "State-of-the-art Research Facilities",
      "Full-time & Part-time (External) Registration",
      "Guide & Co-Guide Mentorship",
  ],
  // Departments with VTU-recognised research programmes, per becbgk.edu Admissions (Ph.D).
  centers: [
      "Civil Engineering",
      "Computer Science & Engineering",
      "Electronics & Communication Engineering",
      "Electrical & Electronics Engineering",
      "Biotechnology",
      "Mechanical Engineering",
      "Physics (M.Sc. Engg.)",
      "Information Science & Engineering",
      "Management Studies (MBA)",
  ],
  admission: {
    eligibility: [
        "Ph.D: a postgraduate qualification in the related discipline (open to working professionals, faculty and others)",
        "M.Sc.(Engg.): a 4-year engineering degree in the related discipline",
    ],
  },
  registrationDocs: [
      "Ph.D./M.Sc. registration form (hardcopy)",
      "NOC from employer (for part-time Ph.D.)",
      "Candidate bio-data",
      "SSLC, UG & PG marks cards",
      "Guide bio-data with UG, PG & Ph.D. certificates",
      "Co-Guide bio-data with UG, PG & Ph.D. certificates",
      "Caste certificate (if any)",
      "Synopsis",
      "Online fee receipt",
  ],
  admissionDocs: [
      "Acceptance letter to the Principal",
      "Acceptance letter to the Registrar, VTU",
      "SIT application form",
      "SSLC, UG & PG certificates",
      "VTU Office Order",
      "Online fee receipt & BEC college fee paid receipt",
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

export default function PhDProgrammePage() {
  return (
    <div className="space-y-16">
      <ProgrammeHeader
        title={phdData.title}
        description={phdData.description}
      />

      {/* Overview & Highlights */}
      <section className="space-y-8">
        <div className="prose prose-lg prose-orange max-w-none text-gray-600">
            <p className="text-justify">
                BEC offers research programmes leading to M.Sc.(Engg.) and Ph.D across nine VTU-recognized research centres, supported by state-of-the-art laboratories and experienced research supervisors. Admission and registration are administered by Visvesvaraya Technological University (VTU), Belagavi.
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
      </section>

      {/* Docs / Procedure */}
      <section>
          <SectionHeader icon={FileText} title="Application Procedure" />
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-sm text-gray-700 mb-6">
              <p className="text-justify">
                  <strong>How to Apply:</strong> Download the application form from the VTU website (www.vtu.ac.in), pay Rs. 1,500/- online, and submit the duly-filled application with the required enclosures to The Registrar, Visvesvaraya Technological University, &ldquo;Jnana Sangama&rdquo;, Belagavi-590018.
              </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Documents for Registration</h3>
                  <ul className="space-y-2">
                      {phdData.registrationDocs.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {doc}
                          </li>
                      ))}
                  </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Documents for Admission</h3>
                  <ul className="space-y-2">
                      {phdData.admissionDocs.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {doc}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </section>
    </div>
  );
}
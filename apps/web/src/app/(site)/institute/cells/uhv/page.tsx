import type { Metadata } from "next";
import { Check, Mail, Phone } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Universal Human Values (UHV) Cell",
  description:
    "The Universal Human Values Cell at BEC Bagalkote, established in 2025, integrates human values and ethics into technical education through the Student Induction Programme, the AICTE UHV course, faculty and student development programmes.",
  path: "/institute/cells/uhv",
});

const responsibilities = [
  "Promote holistic development by complementing technical education with value-based education, enabling students to become competent, ethical, and socially responsible professionals.",
  "Conduct the Student Induction Programme (SIP) regularly for first-year B.E. students to facilitate their smooth transition into the engineering environment while fostering self-awareness, positive relationships, and value-based living.",
  "Facilitate the integration of the Universal Human Values (UHV) course into the B.E. curriculum in accordance with AICTE guidelines, ensuring effective teaching, learning, and assessment.",
  "Organize Faculty Development Programmes (FDPs), Student Development Programmes (SDPs), workshops, seminars, and awareness programmes on Universal Human Values, ethics, professional conduct, and related themes.",
  "Encourage value-based education and ethical practices among students through curricular, co-curricular, and extracurricular activities.",
  "Promote a culture of mutual respect, empathy, environmental responsibility, and sustainable living within the institution.",
  "Monitor and support the effective implementation of AICTE's Universal Human Values initiatives and continuously improve value education practices across the institution.",
];

type Member = {
  name: string;
  department: string;
  role: string;
  group: "office" | "faculty" | "student";
  email?: string;
  phone?: string;
};

const members: Member[] = [
  { name: "Dr. B. R. Hiremath", department: "CV", role: "Chairperson", group: "office", phone: "9448939700" },
  { name: "Dr. B. G. Hokarani", department: "HSS", role: "Convener", group: "office", email: "bghbecbgk@gmail.com", phone: "9611431878" },
  { name: "Dr. Shobha R. Patil", department: "ISE", role: "Institution Coordinator", group: "office", email: "srpatil19@gmail.com", phone: "9449534202" },
  { name: "Prof. Lakshmi Kolur", department: "AIML", role: "Member (Faculty)", group: "faculty" },
  { name: "Dr. Preeti Kumarmath", department: "BT", role: "Member (Faculty)", group: "faculty" },
  { name: "Prof. P. B. Madhavanavar", department: "CSE", role: "Member (Faculty)", group: "faculty", email: "pbmadhavanavar@gmail.com" },
  { name: "Prof. S. M. Kalagudi", department: "CV", role: "Member (Faculty)", group: "faculty" },
  { name: "Prof. Supriya Harlapur", department: "EC", role: "Member (Faculty)", group: "faculty" },
  { name: "Dr. K. Bhat", department: "ECS", role: "Member (Faculty)", group: "faculty" },
  { name: "Prof. Rajshekhar Alurkar", department: "EE", role: "Member (Faculty)", group: "faculty" },
  { name: "Prof. Roopa Math", department: "ISE", role: "Member (Faculty)", group: "faculty" },
  { name: "Dr. R. S. Naik", department: "ME", role: "Member (Faculty)", group: "faculty" },
  { name: "Ms. Tanushree S. Battad", department: "AI", role: "Member (Student)", group: "student" },
  { name: "Ms. Bhagyashree Choudary", department: "AU", role: "Member (Student)", group: "student" },
  { name: "Mr. Aditya Krishna Naik", department: "BT", role: "Member (Student)", group: "student", email: "adityanaik2704@gmail.com", phone: "9483814258" },
  { name: "Ms. Netra K. Pawar", department: "CS", role: "Member (Student)", group: "student", email: "bhagyapawar002@gmail.com", phone: "8867357526" },
  { name: "Ms. Sampada Angadi", department: "ECS", role: "Member (Student)", group: "student" },
  { name: "Ms. Trisha M.", department: "IS", role: "Member (Student)", group: "student" },
  { name: "Mr. Srujan Rajashekhar Kallur", department: "ME", role: "Member (Student)", group: "student" },
];

const roleTone: Record<Member["group"], string> = {
  office: "bg-primary/10 text-primary",
  faculty: "bg-orange-50 text-orange-700",
  student: "bg-stone-100 text-stone-600",
};

export default function UhvCellPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Institute · Cells & Centres"
        title="Universal Human Values (UHV) Cell"
        description="An institution-level cell established in 2025 to integrate human values and ethics into technical education — enabling students to become technically competent, ethically grounded, socially responsible, and professionally conscious individuals."
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="space-y-5">
          <SectionHeading eyebrow="About" title="About the UHV Cell" />
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 text-justify">
            <p>
              The Universal Human Values Cell (Institution Level) at Basaveshwar
              Engineering College, Bagalkote was established in 2025.
            </p>
            <p>
              Its primary objective is to integrate human values and ethics into
              technical education, enabling students to become technically
              competent, ethically grounded, socially responsible, and
              professionally conscious individuals.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Mandate"
            title="Role & Responsibilities"
            description="How the cell complements technical education with value-based learning across the institution."
          />
          <ul className="grid gap-4 md:grid-cols-2">
            {responsibilities.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-md border border-stone-200 bg-white p-5 shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-sm leading-relaxed text-gray-700 text-justify">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Constitution"
            title="Cell Members"
            description="Constitution of the BEC UHV Cell — office bearers, faculty members and student representatives drawn from departments across the institution."
          />
          <div className="overflow-x-auto rounded-md border border-stone-200 shadow-sm">
            <table className="w-full min-w-[46rem] border-collapse bg-white text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-primary/5 text-primary">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Sl. No.</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Department</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Role</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, index) => (
                  <tr
                    key={m.name}
                    className="border-b border-stone-100 last:border-0 align-top"
                  >
                    <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{m.name}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{m.department}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleTone[m.group]}`}
                      >
                        {m.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {m.email || m.phone ? (
                        <div className="flex flex-col gap-1">
                          {m.email ? (
                            <a
                              href={`mailto:${m.email}`}
                              className="inline-flex items-center gap-1.5 text-gray-700 hover:text-primary"
                            >
                              <Mail className="h-3.5 w-3.5 text-primary" />
                              <span className="break-all">{m.email}</span>
                            </a>
                          ) : null}
                          {m.phone ? (
                            <a
                              href={`tel:${m.phone}`}
                              className="inline-flex items-center gap-1.5 text-gray-700 hover:text-primary"
                            >
                              <Phone className="h-3.5 w-3.5 text-primary" />
                              {m.phone}
                            </a>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

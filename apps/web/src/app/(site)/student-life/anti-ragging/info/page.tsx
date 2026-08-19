import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { AlertTriangle, Ban, FileText } from "lucide-react";

export const metadata = pageMetadata({
  title: "Anti-Ragging Information",
  description:
    "BEC Bagalkote's zero-tolerance anti-ragging policy — what constitutes ragging, the offences under UGC guidelines, and the administrative actions and punishments.",
  path: "/student-life/anti-ragging/info",
});

const ugcOffences = [
  "Abetment to ragging",
  "Criminal conspiracy to rag",
  "Unlawful assembly and rioting while ragging",
  "Public nuisance created during ragging",
  "Violation of decency and morals through ragging",
  "Injury to body, causing hurt or grievous hurt",
  "Wrongful restraint or confinement",
  "Use of criminal force",
  "Assault as well as sexual or unnatural offences",
  "Extortion",
  "Criminal trespass and offences against property",
  "Criminal intimidation",
];

const punishments = [
  {
    title: "Suspension",
    description: "Suspension from attending classes and academic privileges.",
  },
  {
    title: "Withholding Benefits",
    description: "Withholding or withdrawing scholarship, fellowship and other benefits.",
  },
  {
    title: "Debarring / Expulsion",
    description: "Debarring from any test or examination, or expulsion from the hostel.",
  },
  {
    title: "Rustication",
    description: "Rustication from the institution for one to four semesters.",
  },
  {
    title: "Fine",
    description: "Fine as prescribed under the IPC and the Karnataka Education Act.",
  },
  {
    title: "Legal Action",
    description: "Registration of an FIR and prosecution under the Indian Penal Code.",
  },
];

export default function AntiRaggingInfoPage() {
  return (
    <main className="bg-background text-foreground">
      <PageHero
        eyebrow="Student Safety"
        title="Anti-Ragging Information"
        description="Basaveshwar Engineering College maintains a zero-tolerance policy on ragging. Ragging within or outside the institution is strictly prohibited and is a criminal offence."
        badges={[{ label: "Zero Tolerance" }]}
      />

      <section className="container mx-auto max-w-6xl px-4 lg:px-6 py-14 md:py-18 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading eyebrow="Definition" title="What constitutes ragging?" />
            <p className="text-base leading-relaxed text-gray-700 text-justify">
              Ragging is any disorderly conduct — whether by spoken or written
              words, or by an act — that has the effect of teasing, treating or
              handling another student with rudeness, or that is likely to cause
              annoyance, hardship or psychological harm, or to raise fear or
              apprehension in a fresher or junior student.
            </p>
            <div className="rounded-md border-l-4 border-primary bg-orange-50/60 p-6">
              <h4 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <Ban className="h-5 w-5 text-primary" />
                Strictly Prohibited
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 text-justify">
                Ragging within or outside the educational institution is strictly
                prohibited. Engaging in ragging is a criminal offence under the
                IPC and the Karnataka Education Act.
              </p>
            </div>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <FileText className="h-5 w-5 text-primary" />
              Offences under UGC Guidelines
            </h3>
            <ul className="mt-4 space-y-2">
              {ugcOffences.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-gray-700"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Consequences"
            title="Administrative action & punishments"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {punishments.map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

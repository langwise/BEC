import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { BreadcrumbsJsonLd, FaqJsonLd } from "@/components/seo/jsonld";
import { ProgrammeFAQ } from "@/components/programmes/programme-faq";
import AboutContent from "./about-content";

export const metadata: Metadata = pageMetadata({
  title: "About BEC Bagalkote",
  description:
    "Founded 1963 on a 93-acre campus, BEC Bagalkote is an autonomous, NAAC & NBA accredited institution offering 10 UG and 8 PG programmes with 180+ faculty (43% PhDs) and 3,200+ students.",
  path: "/institute/about",
});

const FAQS = [
  {
    question: "What is Basaveshwar Engineering College (BEC), Bagalkote?",
    answer:
      "Basaveshwar Engineering College (BEC) is an autonomous engineering college established in 1963 in Bagalkote, Karnataka. It is run by B.V.V. Sangha and affiliated to Visvesvaraya Technological University (VTU), Belagavi.",
  },
  {
    question: "Is BEC Bagalkote autonomous and accredited?",
    answer:
      "Yes. BEC is an autonomous institute affiliated to VTU, Belagavi, and is accredited by NAAC and NBA. Its quality processes are overseen by an Internal Quality Assurance Cell (IQAC).",
  },
  {
    question: "What programmes does BEC Bagalkote offer?",
    answer:
      "BEC offers 10 undergraduate B.E. programmes and 8 postgraduate M.Tech programmes, along with MBA, MCA and Ph.D. research programmes across engineering, management and the sciences.",
  },
  {
    question: "When was BEC Bagalkote established and who runs it?",
    answer:
      "BEC was established in 1963 and is run by B.V.V. Sangha, a public educational trust based in Bagalkote, Karnataka.",
  },
  {
    question: "Where is BEC Bagalkote located?",
    answer:
      "The campus is at S. Nijalingappa Vidyanagar, Bagalkote 587102, Karnataka, India.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbsJsonLd items={[{ name: "About", path: "/institute/about" }]} />
      <FaqJsonLd items={FAQS} />
      <AboutContent />
      <ProgrammeFAQ faqs={FAQS} />
    </>
  );
}

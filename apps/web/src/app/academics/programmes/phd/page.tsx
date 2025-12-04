// src/app/academics/programmes/phd/page.tsx
"use client";

import { ProgrammeLayout } from "@/components/programmes/programme-layout";
import { ProgrammeHero } from "@/components/programmes/programme-hero";
import { ProgrammeOverview } from "@/components/programmes/programme-overview";
import { ProgrammeAdmission } from "@/components/programmes/programme-admission";
import { PhDProcedures } from "@/components/programmes/phd-procedures";
import { ProgrammeCurriculum } from "@/components/programmes/programme-curriculum";
import { ProgrammePlacement } from "@/components/programmes/programme-placement";
import { ProgrammeFAQ } from "@/components/programmes/programme-faq";

const phdData = {
  title: "M.Sc.(Engg.)/Ph.D",
  subtitle: "Research Programmes",
  description: "Embark on a journey of advanced research and innovation with our doctoral and M.Sc. Engineering programmes across multiple disciplines.",
  hero: {
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=80&fit=crop",
    stats: [
      { value: "9", label: "Research Centers" },
      { value: "3-6 Yrs", label: "Duration" },
      { value: "₹3.40 Cr", label: "Research Funds" },
      { value: "35+", label: "Industry MoUs" },
    ],
  },
  overview: {
    description: "BEC offers M.Sc.(Engg.) and Ph.D programmes in 9 recognized research centers with state-of-the-art facilities. With ₹3.40 crores in research grants and 35+ industry collaborations, we provide an excellent ecosystem for cutting-edge research and innovation.",
    highlights: [
      "9 VTU Recognized Research Centers",
      "100% PhD Qualified Supervisors",
      "Advanced Research Facilities",
      "Industry-Sponsored Research Projects",
      "Publication Support & Guidance",
      "International Collaboration Opportunities",
    ],
    disciplines: [
      { name: "Civil Engineering", code: "CE" },
      { name: "Computer Science and Engineering", code: "CSE" },
      { name: "Electronics and Communication Engineering", code: "ECE" },
      { name: "Electrical and Electronics Engineering", code: "EEE" },
      { name: "Bio-Technology", code: "BT" },
      { name: "Mechanical Engineering", code: "ME" },
      { name: "Physics (M.Sc. Engg.)", code: "PHY" },
      { name: "Information Science and Engineering", code: "ISE" },
    ],
  },
  admission: {
    eligibility: {
      title: "Academic Eligibility",
      criteria: [
        "Ph.D: M.E./M.Tech/M.Sc.(Engg.) with minimum 55% (50% for SC/ST/OBC)",
        "M.Sc.(Engg.): B.E./B.Tech with minimum 55% (50% for SC/ST/OBC)",
        "Valid GATE/NET/SLET score (preferred)",
        "Research proposal in area of specialization",
      ],
    },
    entrance: {
      title: "Selection Process",
      exams: [
        { name: "Research Entrance Test", description: "Written test conducted by BEC" },
        { name: "Interview", description: "Technical interview with research committee" },
        { name: "GATE/NET Exemption", description: "Direct interview for qualified candidates" },
      ],
    },
    contact: {
      central: {
        name: "Research & Development Cell",
        address: "Basaveshwar Engineering College, Vidyagiri, Bagalkot – 587 102",
        phone: "08354-234060, 234204",
      },
      admission: {
        name: "Ph.D Coordinator",
        address: "R&D Section, BEC Campus",
        phone: "Contact through central office",
      },
    },
  },
  procedures: {
    availableBranches: [
      { slNo: 1, branch: "CIVIL ENGINEERING" },
      { slNo: 2, branch: "COMPUTER SCIENCE AND ENGINEERING" },
      { slNo: 3, branch: "ELECTRONICS AND COMMUNICATION ENGINEERING" },
      { slNo: 4, branch: "ELECTRICAL AND ELECTRONICS ENGINEERING" },
      { slNo: 5, branch: "BIOTECHNOLOGY" },
      { slNo: 6, branch: "MECHANICAL ENGINEERING" },
      { slNo: 7, branch: "PHYSICS (M.Sc. (Engg.))" },
      { slNo: 8, branch: "INFORMATION SCIENCE AND ENGINEERING" },
    ],
    registrationProcedure: [
      "Registration form for Ph.D./M.Sc. hardcopy",
      "NOC from the organization (for part time Ph.D.)",
      "Candidate Bio data",
      "SSLC, UG, PG marks cards",
      "Guide Bio data",
      "UG, PG, Ph.D. Certificates of Guide",
      "Co-Guide Bio data",
      "UG, PG, Ph.D. Certificates of Co-Guide",
      "Caste Certificate if any",
      "Synopsis",
      "Online Fee Receipt",
    ],
    admissionProcedure: [
      "Acceptance letter to Principal",
      "Acceptance letter to Registrar VTU",
      "SIT Application Form",
      "SSLC, UG & PG Certificates",
      "VTU Office Order",
      "Online Fee Receipt",
      "BEC College Fee Paid Receipt",
    ],
  },
  curriculum: {
    structure: "Ph.D programme spans 3-6 years with coursework, comprehensive examination, research work, and thesis defense. M.Sc.(Engg.) is typically 2 years with coursework and dissertation.",
    features: [
      "Advanced Coursework (for Ph.D)",
      "Research Methodology Training",
      "Literature Review & Survey",
      "Experimental/Theoretical Research",
      "Publication in Peer-Reviewed Journals",
      "Conference Presentations",
      "Thesis Writing & Defense",
      "Teaching Assistantship Opportunities",
    ],
    outcomes: [
      "Expert knowledge in specialized research area",
      "Independent research capabilities",
      "Publication in reputed journals and conferences",
      "Critical thinking and analytical skills",
      "Contribution to scientific knowledge",
      "Preparation for academic and R&D careers",
    ],
  },
  placement: {
    stats: {
      rate: "85%",
      average: "₹6-8 Lakhs",
      highest: "₹15+ Lakhs",
      companies: "40+",
    },
    topRecruiters: [
      "Research Institutions", "ISRO", "DRDO", "BARC", "Universities",
      "IITs", "NITs", "Core Engineering R&D", "Product Companies", "PSUs",
    ],
    industries: [
      "Research & Development",
      "Higher Education & Academia",
      "Defense & Aerospace",
      "Core Engineering Industries",
      "Product Development Companies",
    ],
  },
  faqs: [
    {
      question: "What is the duration of Ph.D programme?",
      answer: "Ph.D programme typically takes 3-6 years depending on full-time or part-time enrollment and research progress.",
    },
    {
      question: "Is fellowship available for Ph.D students?",
      answer: "Yes, fellowships are available for eligible candidates through various schemes like AICTE, UGC, and sponsored research projects.",
    },
    {
      question: "How many research centers does BEC have?",
      answer: "BEC has 9 VTU recognized research centers across various engineering disciplines including Physics (M.Sc. Engg.).",
    },
    {
      question: "Can working professionals pursue Ph.D?",
      answer: "Yes, we offer part-time Ph.D programmes specifically designed for working professionals with NOC from their organization.",
    },
    {
      question: "What research facilities are available?",
      answer: "BEC has Central Research Facility with advanced equipment, laboratories, computational facilities, and access to research databases with ₹3.40 crores in funding.",
    },
    {
      question: "How to apply for Ph.D admission?",
      answer: "Download application form from VTU website (www.vtu.ac.in), pay Rs. 1500/- online, and submit with necessary documents to VTU Registrar.",
    },
  ],
};

export default function PhDProgrammePage() {
  return (
    <ProgrammeLayout currentProgramme="phd">
      <ProgrammeHero {...phdData.hero} title={phdData.title} subtitle={phdData.subtitle} description={phdData.description} />
      <ProgrammeOverview {...phdData.overview} />
      <ProgrammeAdmission {...phdData.admission} />
      <PhDProcedures {...phdData.procedures} />
      <ProgrammeCurriculum {...phdData.curriculum} />
      <ProgrammePlacement {...phdData.placement} />
      <ProgrammeFAQ faqs={phdData.faqs} />
    </ProgrammeLayout>
  );
}
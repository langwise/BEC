// src/app/academics/programmes/pg/page.tsx
"use client";

import { ProgrammeLayout } from "@/components/programmes/programme-layout";
import { ProgrammeHero } from "@/components/programmes/programme-hero";
import { ProgrammeOverview } from "@/components/programmes/programme-overview";
import { ProgrammeAdmission } from "@/components/programmes/programme-admission";
import { ProgrammeFeeTable } from "@/components/programmes/programme-fee-table";
import { ProgrammeCurriculum } from "@/components/programmes/programme-curriculum";
import { ProgrammePlacement } from "@/components/programmes/programme-placement";
import { ProgrammeFAQ } from "@/components/programmes/programme-faq";

const pgData = {
  title: "Post Graduate/M.Tech",
  subtitle: "Master of Technology",
  description: "Advance your engineering expertise with our specialized M.Tech programmes focusing on research and innovation.",
  hero: {
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=80&fit=crop",
    stats: [
      { value: "4", label: "Specializations" },
      { value: "2 Years", label: "Duration" },
      { value: "₹3.40 Cr", label: "Research Grants" },
      { value: "100%", label: "PhD Faculty" },
    ],
  },
  overview: {
    description: "Our M.Tech programmes offer advanced specialization in cutting-edge engineering domains. With state-of-the-art research facilities and ₹3.40 crores in research grants, we provide an environment conducive to innovation and breakthrough research.",
    highlights: [
      "Research-Oriented Curriculum",
      "Advanced Laboratory Facilities",
      "Industry Collaboration & MoUs",
      "Publication Opportunities",
      "Thesis-Based Programme",
      "Expert Faculty Mentorship",
    ],
    disciplines: [
      { name: "Structural Engineering", code: "SE" },
      { name: "Machine Design", code: "MD" },
      { name: "Computer Science & Engineering", code: "CSE" },
      { name: "Digital Electronics & Communication", code: "DECS" },
    ],
  },
  admission: {
    eligibility: {
      title: "Academic Eligibility",
      criteria: [
        "B.E./B.Tech degree in relevant discipline from a recognized university",
        "Minimum 50% aggregate marks in all semesters/years (45% for SC/ST/Category-I candidates from Karnataka)",
        "Valid GATE/PGCET score as per VTU guidelines",
      ],
    },
    entrance: {
      title: "Entrance & Selection",
      exams: [
        { name: "PGCET", description: "Post Graduate Common Entrance Test - Karnataka" },
        { name: "GATE", description: "Graduate Aptitude Test in Engineering - preferred" },
        { name: "Institute Entrance", description: "For Management Quota candidates" },
      ],
    },
    contact: {
      central: {
        name: "Central Office",
        address: "B.V.V. Sangah, Bagalkot – 587 101",
        phone: "08354-220689, 220702",
      },
      admission: {
        name: "Admission Section",
        address: "Basaveshwar Engineering College (A), Vidyagiri, Bagalkot – 587 102",
        phone: "9902684833",
      },
    },
  },
  feeStructure: {
    feeCategories: [
      {
        quota: "Government Quota",
        courseType: "Un-Aided Courses",
        description: "To be paid at KEA + VTU Fees + College Other Fees",
      },
      {
        quota: "Management Quota",
        courseType: "Unaided Courses",
        description: "Management Fees + VTU Fees + College Other Fees",
      },
    ],
    documents: [],
  },
  curriculum: {
    structure: "The M.Tech programme spans 2 years (4 semesters) with a strong emphasis on research, advanced coursework, and dissertation.",
    features: [
      "Advanced Core Subjects",
      "Elective Specializations",
      "Research Methodology",
      "Dissertation & Thesis Work",
      "Seminar & Journal Publications",
      "Industry Internship Opportunities",
    ],
    outcomes: [
      "Deep expertise in chosen specialization",
      "Advanced research capabilities",
      "Innovation and problem-solving skills",
      "Publication in reputed journals",
      "Industry-academia collaboration experience",
      "Preparation for doctoral studies",
    ],
  },
  placement: {
    stats: {
      rate: "92%",
      average: "₹5.5 Lakhs",
      highest: "₹15+ Lakhs",
      companies: "75+",
    },
    topRecruiters: [
      "Research Organizations", "Core Engineering Companies", "IT Giants",
      "Design & Consultancy Firms", "Manufacturing Industries", "PSUs",
    ],
    industries: [
      "Research & Development",
      "Product Design & Development",
      "Core Engineering",
      "Information Technology",
      "Higher Education & Academia",
    ],
  },
  faqs: [
    {
      question: "What is the duration of M.Tech programme?",
      answer: "M.Tech is a 2-year full-time programme divided into 4 semesters.",
    },
    {
      question: "What are the eligibility criteria?",
      answer: "Candidates must have B.E./B.Tech with minimum 50% marks (45% for SC/ST/Category-I). Valid PGCET or GATE score is required.",
    },
    {
      question: "What are the M.Tech specializations offered?",
      answer: "We offer M.Tech in Structural Engineering, Machine Design, Computer Science & Engineering, and Digital Electronics & Communication.",
    },
    {
      question: "Are research facilities available?",
      answer: "Yes, BEC has Central Research Facility with advanced equipment and ₹3.40 crores in research funding with 35+ industry MoUs.",
    },
    {
      question: "Can M.Tech students pursue PhD?",
      answer: "Yes, M.Tech graduates can pursue PhD at BEC as we have recognized research centers in 10 departments.",
    },
  ],
};

export default function PGProgrammePage() {
  return (
    <ProgrammeLayout currentProgramme="pg">
      <ProgrammeHero {...pgData.hero} title={pgData.title} subtitle={pgData.subtitle} description={pgData.description} />
      <ProgrammeOverview {...pgData.overview} />
      <ProgrammeAdmission {...pgData.admission} />
      <ProgrammeFeeTable {...pgData.feeStructure} />
      <ProgrammeCurriculum {...pgData.curriculum} />
      <ProgrammePlacement {...pgData.placement} />
      <ProgrammeFAQ faqs={pgData.faqs} />
    </ProgrammeLayout>
  );
}
// src/app/academics/programmes/mba/page.tsx
"use client";

import { ProgrammeLayout } from "@/components/programmes/programme-layout";
import { ProgrammeHero } from "@/components/programmes/programme-hero";
import { ProgrammeOverview } from "@/components/programmes/programme-overview";
import { ProgrammeAdmission } from "@/components/programmes/programme-admission";
import { ProgrammeFeeTable } from "@/components/programmes/programme-fee-table";
import { ProgrammeCurriculum } from "@/components/programmes/programme-curriculum";
import { ProgrammePlacement } from "@/components/programmes/programme-placement";
import { ProgrammeFAQ } from "@/components/programmes/programme-faq";

const mbaData = {
  title: "MBA",
  subtitle: "Master of Business Administration",
  description: "Transform into a strategic business leader with our comprehensive MBA programme blending management principles with technical expertise.",
  hero: {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80&fit=crop",
    stats: [
      { value: "2 Years", label: "Duration" },
      { value: "60", label: "Intake" },
      { value: "94%", label: "Placement Rate" },
      { value: "₹4.2L", label: "Avg. Package" },
    ],
  },
  overview: {
    description: "The MBA programme at BEC is designed to create future business leaders who can bridge the gap between technology and management. Our curriculum integrates core management principles with practical industry exposure, preparing graduates for leadership roles in diverse sectors.",
    highlights: [
      "Industry-Relevant Curriculum",
      "Experienced Management Faculty",
      "Case Study Based Learning",
      "Industry Visits & Internships",
      "Entrepreneurship Development",
      "Soft Skills Training",
    ],
    disciplines: [
      { name: "Finance Management", code: "FM" },
      { name: "Marketing Management", code: "MM" },
      { name: "Human Resource Management", code: "HRM" },
      { name: "Operations Management", code: "OM" },
    ],
  },
  admission: {
    eligibility: {
      title: "Academic Eligibility",
      criteria: [
        "Bachelor's degree in any discipline from a recognized university",
        "Minimum 50% aggregate marks in all years (rounding-off aggregate percent is not permitted)",
        "For SC/ST/Category-I candidates from Karnataka: 45% marks (rounding-off aggregate percent is not permitted)",
        "Valid score in PGCET/KMAT or equivalent entrance test",
      ],
    },
    entrance: {
      title: "Entrance Examinations",
      exams: [
        { name: "PGCET", description: "Post Graduate Common Entrance Test - Karnataka" },
        { name: "KMAT", description: "Karnataka Management Aptitude Test" },
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
        description: "VTU Fees + College Other Fees",
        amount: "Rs. 50,000 (to be paid at KEA)",
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
    structure: "The MBA programme is a 2-year full-time course divided into 4 semesters, combining theoretical knowledge with practical business applications.",
    features: [
      "Core Management Subjects",
      "Specialization Electives",
      "Summer Internship Programme",
      "Live Projects with Industry",
      "Management Development Programs",
      "Leadership & Personality Development",
    ],
    outcomes: [
      "Strategic thinking and decision-making abilities",
      "Leadership and team management skills",
      "Financial and analytical expertise",
      "Marketing and business development capabilities",
      "Entrepreneurial mindset and innovation",
      "Effective communication and presentation skills",
    ],
  },
  placement: {
    stats: {
      rate: "94%",
      average: "₹4.2 Lakhs",
      highest: "₹10+ Lakhs",
      companies: "60+",
    },
    topRecruiters: [
      "HDFC Bank", "ICICI Bank", "Axis Bank", "Wipro", "Infosys", "TCS",
      "Mahindra & Mahindra", "Asian Paints", "ITC", "HUL", "Amazon", "Flipkart",
    ],
    industries: [
      "Banking & Financial Services",
      "Information Technology",
      "FMCG & Retail",
      "Manufacturing & Operations",
      "Consulting & Analytics",
    ],
  },
  faqs: [
    {
      question: "What is the duration of the MBA programme?",
      answer: "The MBA programme is a 2-year full-time course divided into 4 semesters.",
    },
    {
      question: "Which entrance exams are accepted?",
      answer: "We accept PGCET, KMAT and conduct our own entrance exam for management quota seats.",
    },
    {
      question: "What is the eligibility criteria?",
      answer: "Bachelor's degree in any discipline with minimum 50% marks (45% for SC/ST/Category-I). Rounding-off aggregate percent is not permitted.",
    },
    {
      question: "What specializations are available?",
      answer: "Students can choose specializations in Finance, Marketing, Human Resources, and Operations Management.",
    },
    {
      question: "Is work experience required for MBA admission?",
      answer: "Work experience is not mandatory but is considered advantageous during the selection process.",
    },
  ],
};

export default function MBAProgrammePage() {
  return (
    <ProgrammeLayout currentProgramme="mba">
      <ProgrammeHero {...mbaData.hero} title={mbaData.title} subtitle={mbaData.subtitle} description={mbaData.description} />
      <ProgrammeOverview {...mbaData.overview} />
      <ProgrammeAdmission {...mbaData.admission} />
      <ProgrammeFeeTable {...mbaData.feeStructure} />
      <ProgrammeCurriculum {...mbaData.curriculum} />
      <ProgrammePlacement {...mbaData.placement} />
      <ProgrammeFAQ faqs={mbaData.faqs} />
    </ProgrammeLayout>
  );
}
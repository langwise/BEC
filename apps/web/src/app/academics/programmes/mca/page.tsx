// src/app/academics/programmes/mca/page.tsx
"use client";

import { ProgrammeLayout } from "@/components/programmes/programme-layout";
import { ProgrammeHero } from "@/components/programmes/programme-hero";
import { ProgrammeOverview } from "@/components/programmes/programme-overview";
import { ProgrammeAdmission } from "@/components/programmes/programme-admission";
import { ProgrammeFeeTable } from "@/components/programmes/programme-fee-table";
import { ProgrammeCurriculum } from "@/components/programmes/programme-curriculum";
import { ProgrammePlacement } from "@/components/programmes/programme-placement";
import { ProgrammeFAQ } from "@/components/programmes/programme-faq";

const mcaData = {
  title: "MCA",
  subtitle: "Master of Computer Applications",
  description: "Master the art of software development and application design with our comprehensive MCA programme focused on cutting-edge technologies.",
  hero: {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80&fit=crop",
    stats: [
      { value: "2 Years", label: "Duration" },
      { value: "60", label: "Intake" },
      { value: "98%", label: "Placement Rate" },
      { value: "₹4.8L", label: "Avg. Package" },
    ],
  },
  overview: {
    description: "The MCA programme at BEC is designed to develop skilled IT professionals capable of designing, developing, and managing software applications. With a perfect blend of theoretical concepts and hands-on practical training, our graduates are industry-ready from day one.",
    highlights: [
      "Latest Technology Stack",
      "Industry-Certified Faculty",
      "Project-Based Learning",
      "Cloud & DevOps Training",
      "Coding Competitions & Hackathons",
      "100% Placement Assistance",
    ],
    disciplines: [
      { name: "Software Engineering", code: "SE" },
      { name: "Web Technologies", code: "WT" },
      { name: "Data Science & AI", code: "DS" },
      { name: "Cloud Computing", code: "CC" },
      { name: "Mobile Application Development", code: "MAD" },
      { name: "Cybersecurity", code: "CS" },
    ],
  },
  admission: {
    eligibility: {
      title: "Academic Eligibility",
      criteria: [
        "Bachelor's degree in any discipline from a recognized university",
        "Minimum 50% aggregate marks in all years (rounding-off aggregate percent is not permitted)",
        "For SC/ST/Category-I candidates from Karnataka: 45% marks (rounding-off aggregate percent is not permitted)",
        "Valid score in PGCET/KMAT or equivalent entrance exam",
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
        address: "B.V.V. Sangah, Bagalkote – 587 101",
        phone: "08354-220689, 220702",
      },
      admission: {
        name: "Admission Section",
        address: "Basaveshwar Engineering College, Vidyagiri, Bagalkote – 587 102",
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
        amount: "Rs. 55,000 (to be paid at KEA)",
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
    structure: "The MCA programme spans 2 years (4 semesters) with intensive coding practice, project work, and industry exposure through internships.",
    features: [
      "Programming Languages (Java, Python, C++)",
      "Database Management Systems",
      "Web Development & Frameworks",
      "Mobile App Development",
      "Cloud Computing & DevOps",
      "Machine Learning & AI Basics",
      "Software Project Management",
      "Capstone Project",
    ],
    outcomes: [
      "Proficiency in multiple programming languages",
      "Full-stack development capabilities",
      "Database design and management skills",
      "Understanding of software development lifecycle",
      "Cloud deployment and DevOps knowledge",
      "Problem-solving and algorithmic thinking",
    ],
  },
  placement: {
    stats: {
      rate: "98%",
      average: "₹4.8 Lakhs",
      highest: "₹14+ Lakhs",
      companies: "85+",
    },
    topRecruiters: [
      "Wipro", "Infosys", "TCS", "Cognizant", "Accenture", "Tech Mahindra",
      "HCL", "IBM", "Amazon", "Microsoft", "Google", "Flipkart", "Oracle",
    ],
    industries: [
      "Software Development",
      "IT Services & Consulting",
      "E-commerce & Internet",
      "Banking & Financial Technology",
      "Product Companies",
    ],
  },
  faqs: [
    {
      question: "What is the duration of the MCA programme?",
      answer: "MCA is a 2-year full-time programme divided into 4 semesters.",
    },
    {
      question: "What is the eligibility criteria?",
      answer: "Bachelor's degree in any discipline with minimum 50% marks (45% for SC/ST/Category-I). Rounding-off aggregate percent is not permitted.",
    },
    {
      question: "Which entrance exam is required for MCA?",
      answer: "PGCET or KMAT scores are accepted. We also conduct entrance exam for management quota candidates.",
    },
    {
      question: "What programming languages are taught?",
      answer: "The curriculum covers Java, Python, C++, JavaScript, and emerging technologies like cloud computing and AI/ML.",
    },
    {
      question: "What is the placement record for MCA?",
      answer: "MCA has an excellent placement record of 98% with average package of ₹4.8 lakhs and highest reaching ₹14+ lakhs.",
    },
  ],
};

export default function MCAProgrammePage() {
  return (
    <ProgrammeLayout currentProgramme="mca">
      <ProgrammeHero {...mcaData.hero} title={mcaData.title} subtitle={mcaData.subtitle} description={mcaData.description} />
      <ProgrammeOverview {...mcaData.overview} />
      <ProgrammeAdmission {...mcaData.admission} />
      <ProgrammeFeeTable {...mcaData.feeStructure} />
      <ProgrammeCurriculum {...mcaData.curriculum} />
      <ProgrammePlacement {...mcaData.placement} />
      <ProgrammeFAQ faqs={mcaData.faqs} />
    </ProgrammeLayout>
  );
}
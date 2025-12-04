// src/app/academics/programmes/ug/page.tsx
"use client";

import { ProgrammeLayout } from "@/components/programmes/programme-layout";
import { ProgrammeHero } from "@/components/programmes/programme-hero";
import { ProgrammeOverview } from "@/components/programmes/programme-overview";
import { ProgrammeAdmission } from "@/components/programmes/programme-admission";
import { ProgrammeFeeTable } from "@/components/programmes/programme-fee-table";
import { ProgrammeCurriculum } from "@/components/programmes/programme-curriculum";
import { ProgrammePlacement } from "@/components/programmes/programme-placement";
import { ProgrammeFAQ } from "@/components/programmes/programme-faq";

const ugData = {
  title: "Under Graduate/BE",
  subtitle: "Bachelor of Engineering",
  description: "Build a strong foundation in engineering with our comprehensive 4-year undergraduate programmes across 11 disciplines.",
  hero: {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80&fit=crop",
    stats: [
      { value: "11", label: "Disciplines" },
      { value: "4 Years", label: "Duration" },
      { value: "96%", label: "Placement Rate" },
      { value: "₹3.14L", label: "Avg. Package" },
    ],
  },
  overview: {
    description: "Basaveshwar Engineering College offers Bachelor of Engineering programmes in 11 disciplines, providing students with a strong foundation in engineering principles and practical skills. Our NAAC 'A' accredited and NBA recognized programmes prepare students for successful careers in industry and research.",
    highlights: [
      "NAAC 'A' Grade Accredited",
      "NBA Recognized Programmes",
      "100% PhD Qualified Faculty",
      "State-of-the-art Laboratories",
      "Industry-Integrated Curriculum",
      "Strong Placement Record",
    ],
    disciplines: [
      { name: "Civil Engineering", code: "CE" },
      { name: "Mechanical Engineering", code: "ME" },
      { name: "Electrical & Electronics Engineering", code: "EEE" },
      { name: "Electronics & Communication Engineering", code: "ECE" },
      { name: "Computer Science Engineering", code: "CSE" },
      { name: "Information Science Engineering", code: "ISE" },
      { name: "Industrial & Production Engineering", code: "IPE" },
      { name: "Chemical Engineering", code: "CHE" },
      { name: "Bio-Technology", code: "BT" },
      { name: "Artificial Intelligence & Data Science", code: "AI&DS" },
      { name: "Computer Science & Business Systems", code: "CSBS" },
    ],
  },
  admission: {
    eligibility: {
      title: "Academic Eligibility",
      criteria: [
        "Passed 2nd PUC / 12th standard or equivalent with English as one of the languages",
        "Obtained 45% marks in aggregate in Physics & Mathematics along with Chemistry/Bio-Technology/Computer Science/Electronics/Biology",
        "For SC/ST/OBC (Category I, 2A, 2B, 3A & 3B) students: 40% marks in aggregate in the optional subjects",
      ],
    },
    entrance: {
      title: "Entrance Examinations",
      exams: [
        { name: "Karnataka CET", description: "For Government Quota seats" },
        { name: "COMED-K", description: "For COMED-K Quota seats" },
        { name: "JEE Main", description: "Accepted for admissions" },
        { name: "Institute Entrance", description: "For Management Quota" },
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
        courseType: "Aided Courses",
        description: "To be paid at KEA + VTU Fees + College Other Fees",
      },
      {
        quota: "Government Quota",
        courseType: "Un-Aided Courses",
        description: "To be paid at KEA + VTU Fees + College Other Fees",
      },
      {
        quota: "COMED-K Quota",
        courseType: "Un-aided Courses",
        description: "COMED-K Fees + VTU Fees + College Other Fees",
      },
      {
        quota: "Management Quota",
        courseType: "Aided and Unaided Courses",
        description: "Management Fees + VTU Fees + College Other Fees",
      },
    ],
    documents: [
      {
        title: "Management Fee Structure",
        url: "/Admissions/Documents/managementfee2025-26.jpeg",
      },
      {
        title: "College & VTU Fees",
        url: "/Admissions/Documents/fees/VTU and College fee.pdf",
      },
      {
        title: "College Other Fees",
        url: "/Admissions/Documents/fees/college other fee.pdf",
      },
    ],
  },
  curriculum: {
    structure: "The B.E. programme follows a semester system with 8 semesters over 4 years, combining theoretical knowledge with practical training.",
    features: [
      "Choice-Based Credit System (CBCS)",
      "Industry-Oriented Curriculum",
      "Hands-on Laboratory Training",
      "Mini Projects & Major Projects",
      "Industrial Training & Internships",
      "Seminar & Technical Presentations",
    ],
    outcomes: [
      "Strong foundation in engineering fundamentals",
      "Problem-solving and analytical skills",
      "Practical experience through laboratory work",
      "Team collaboration and communication skills",
      "Industry-ready technical expertise",
      "Research and innovation capabilities",
    ],
  },
  placement: {
    stats: {
      rate: "96%",
      average: "₹3.14 Lakhs",
      highest: "₹12+ Lakhs",
      companies: "100+",
    },
    topRecruiters: [
      "Wipro", "HCL", "Tech Mahindra", "Infosys", "TCS", "Accenture",
      "Cognizant", "IBM", "Microsoft", "Amazon", "Google", "Adobe",
    ],
    industries: [
      "Information Technology",
      "Manufacturing & Engineering",
      "Consulting & Analytics",
      "Research & Development",
      "Public Sector Undertakings",
    ],
  },
  faqs: [
    {
      question: "What is the duration of the B.E. programme?",
      answer: "The B.E. programme is of 4 years duration, divided into 8 semesters.",
    },
    {
      question: "Which entrance exams are accepted for admission?",
      answer: "We accept Karnataka CET, COMED-K, JEE Main, and also conduct our own entrance examination for management quota seats.",
    },
    {
      question: "Are the programmes NBA accredited?",
      answer: "Yes, our engineering programmes are NBA recognized and the institution is NAAC 'A' grade accredited.",
    },
    {
      question: "What are the eligibility criteria for B.E. admission?",
      answer: "Candidates must have passed 2nd PUC/12th with 45% marks (40% for SC/ST/OBC) in Physics, Mathematics and Chemistry/Bio-Technology/Computer Science/Electronics/Biology.",
    },
    {
      question: "Does the college provide hostel facilities?",
      answer: "Yes, separate hostel facilities are available for both boys and girls on our 93-acre campus.",
    },
    {
      question: "What is the placement record?",
      answer: "BEC has an excellent placement record of 96% with an average package of ₹3.14 lakhs and highest package of ₹12+ lakhs.",
    },
  ],
};

export default function UGProgrammePage() {
  return (
    <ProgrammeLayout currentProgramme="ug">
      <ProgrammeHero {...ugData.hero} title={ugData.title} subtitle={ugData.subtitle} description={ugData.description} />
      <ProgrammeOverview {...ugData.overview} />
      <ProgrammeAdmission {...ugData.admission} />
      <ProgrammeFeeTable {...ugData.feeStructure} />
      <ProgrammeCurriculum {...ugData.curriculum} />
      <ProgrammePlacement {...ugData.placement} />
      <ProgrammeFAQ faqs={ugData.faqs} />
    </ProgrammeLayout>
  );
}
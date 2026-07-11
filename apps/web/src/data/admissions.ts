/**
 * Admissions content — source-verified against becbgk.edu/Admissions/* (UG, PG,
 * PhD, MBA, MCA) and cross-checked against the live pages. All fee documents
 * resolve to existing R2 assets via asset(); no values are invented.
 */

export interface EntranceExam {
  name: string;
  description: string;
}

export interface FeeLine {
  quota: string;
  courses: string;
  fee: string;
}

export interface FeeDocument {
  title: string;
  desc: string;
  /** Asset manifest key resolved through asset(). */
  key: string;
}

export interface IntakeRow {
  branch: string;
  /** Parent department for grouped specializations (e.g. M.Tech under Civil). */
  department?: string;
  intake: number;
}

export interface IntakeTable {
  title: string;
  code?: string;
  rows: IntakeRow[];
  total: number;
}

export interface AdmissionProgramme {
  slug: "ug" | "pg" | "phd" | "mba" | "mca";
  tab: string;
  title: string;
  credential: string;
  duration?: string;
  seats?: string;
  description: string;
  intro: string;
  eligibility: string[];
  entranceExams?: EntranceExam[];
  entranceNote?: string;
  feeYear?: string;
  feeLines?: FeeLine[];
  feeNote?: string;
  feeDocuments?: FeeDocument[];
  intakeTables?: IntakeTable[];
  // Research (PhD / M.Sc. Engg.) specific fields.
  researchDepartments?: string[];
  applicationProcess?: string;
  registrationDocs?: string[];
  admissionDocs?: string[];
}

export const ADMISSION_INQUIRY_URL = "http://119.161.97.228:8080/AdmissionInquiry/";

/** Official CET / COMED-K and programme college codes, shown on every admission page. */
export const COLLEGE_CODES = {
  cet: [
    { label: "Aided", code: "E031" },
    { label: "Un-Aided", code: "E049" },
  ],
  other: [
    { label: "COMED-K", code: "E024" },
    { label: "MBA", code: "B124" },
    { label: "M.Tech", code: "T810" },
    { label: "MCA", code: "C408MC" },
  ],
} as const;

/** Contact for management-quota seats — identical across all programmes. */
export const MANAGEMENT_QUOTA_CONTACT = {
  centralOffice: {
    name: "Central Office",
    org: "B.V.V. Sangha",
    address: "Bagalkote – 587 101",
    phones: ["08354-220689", "08354-220702"],
  },
  admissionSection: {
    name: "Admission Section",
    org: "Basaveshwar Engineering College (Autonomous)",
    address: "Vidyagiri, Bagalkote – 587 102",
    phones: ["9902684833"],
  },
} as const;

/** Existing pages that the Admissions section links to instead of duplicating. */
export const ADMISSION_RELATED_LINKS = [
  {
    title: "Documents to Submit",
    desc: "Checklist of originals and copies required at admission",
    href: "/academics/documents",
  },
  {
    title: "Scholarship Details",
    desc: "Government, minority and merit scholarship schemes",
    href: "/academics/scholarships",
  },
  {
    title: "Hostel Admission",
    desc: "Boys' and girls' hostel facilities and applications",
    href: "/academics/hostel",
  },
  {
    title: "Academic Calendar",
    desc: "Semester schedule and calendar of events",
    href: "/academics/examinations/calendar",
  },
  {
    title: "Examination Section",
    desc: "Time-tables, results and evaluation",
    href: "/academics/examinations",
  },
] as const;

export const admissionProgrammes: AdmissionProgramme[] = [
  {
    slug: "ug",
    tab: "Under Graduate (B.E.)",
    title: "Under Graduate (B.E.)",
    credential: "Bachelor of Engineering (B.E.)",
    duration: "4 Years",
    seats: "990 sanctioned seats",
    description:
      "Four-year B.E. programmes across 11 disciplines, admitted through Karnataka CET, COMED-K, JEE or the institute entrance for management seats.",
    intro:
      "Basaveshwar Engineering College, Bagalkote is an autonomous institute offering B.E. programmes in 11 disciplines with a total sanctioned intake of 990 seats. Admissions are conducted through Karnataka CET (KEA), COMED-K, JEE, or the entrance examination conducted by the college for management-quota seats.",
    eligibility: [
      "Passed the 2nd PUC / 12th standard or equivalent examination with English as one of the languages.",
      "Obtained 45% of marks in aggregate in Physics & Mathematics along with Chemistry / Bio-Technology / Computer Science / Electronics / Biology.",
      "For candidates belonging to Karnataka Scheduled Caste, Scheduled Tribe and other Backward Classes (Category I, 2A, 2B, 3A & 3B): the minimum eligibility is 40% of marks in aggregate in the optional subjects of the qualifying examination.",
    ],
    entranceExams: [
      { name: "Karnataka CET (KEA)", description: "Government quota seats" },
      { name: "COMED-K", description: "COMED-K quota seats" },
      { name: "JEE Main", description: "Accepted for admission" },
      { name: "Institute Entrance", description: "Management quota seats" },
    ],
    entranceNote:
      "For management admissions, candidates may appear for any one of CET, COMED-K, JEE or the entrance examination conducted by the college.",
    feeYear: "2025-26",
    feeLines: [
      { quota: "Government Quota", courses: "Aided Courses", fee: "KEA + VTU Fees + College Other Fees" },
      { quota: "Government Quota", courses: "Un-Aided Courses", fee: "KEA + VTU Fees + College Other Fees" },
      { quota: "COMED-K Quota", courses: "Un-Aided Courses", fee: "COMED-K Fees + VTU Fees + College Other Fees" },
      { quota: "Management Quota", courses: "Aided & Un-Aided Courses", fee: "Management Fees + VTU Fees + College Other Fees" },
    ],
    feeNote:
      "Tuition is fixed by KEA / COMED-K; VTU and College fees are payable in addition. Detailed fee schedules for the current academic year are available below and from the Admission Office.",
    feeDocuments: [
      {
        title: "BE I Year — Management Quota Fee Structure",
        desc: "Academic Year 2026-27 — image",
        key: "documents/admissions/ug-management-fee-2025-26.jpeg",
      },
      {
        title: "BE II Year (Diploma Lateral Entry) — Management Quota Fee Structure",
        desc: "Academic Year 2026-27 — image",
        key: "documents/admissions/ug-management-fee-2025-26.jpeg",
      },
      {
        title: "College & VTU Fees",
        desc: "Tuition and VTU fee schedule — PDF",
        key: "documents/admissions/ug-vtu-and-college-fee.pdf",
      },
      {
        title: "College Other Fees",
        desc: "Additional college fees — PDF",
        key: "documents/admissions/ug-college-other-fee.pdf",
      },
    ],
    intakeTables: [
      {
        title: "Aided Courses",
        code: "College Code: E031",
        rows: [
          { branch: "Civil Engineering", intake: 90 },
          { branch: "Computer Science & Engineering", intake: 60 },
          { branch: "Electronics & Communication Engineering", intake: 60 },
          { branch: "Electrical & Electronics Engineering", intake: 60 },
          { branch: "Industrial & Production Engineering", intake: 30 },
          { branch: "Mechanical Engineering", intake: 120 },
        ],
        total: 420,
      },
      {
        title: "Un-Aided Courses",
        code: "KEA Code: E049 · COMED-K Code: E024",
        rows: [
          { branch: "Biotechnology", intake: 30 },
          { branch: "Civil Engineering", intake: 30 },
          { branch: "Computer Science & Engineering", intake: 120 },
          { branch: "Electronics & Communication Engineering", intake: 60 },
          { branch: "Information Science & Engineering", intake: 180 },
          { branch: "Artificial Intelligence & Machine Learning", intake: 60 },
          { branch: "Electronics & Computer Engineering", intake: 60 },
          { branch: "Automobile Engineering", intake: 30 },
        ],
        total: 570,
      },
    ],
  },
  {
    slug: "pg",
    tab: "Post Graduate (M.Tech)",
    title: "Post Graduate (M.Tech)",
    credential: "Master of Technology (M.Tech)",
    duration: "2 Years",
    seats: "72 sanctioned seats",
    description:
      "Two-year M.Tech programmes in four specializations under Civil and Mechanical Engineering, admitted through PGCET or GATE.",
    intro:
      "M.Tech postgraduate programmes are offered in four specializations under Civil and Mechanical Engineering. Admissions are conducted through PGCET or GATE, or the entrance examination conducted by the college for management-quota seats.",
    eligibility: [
      "Passed the prescribed qualifying examination (as specified in Annexure-I) with not less than 50% of marks in aggregate of all the semesters / years of the degree examination.",
      "For candidates from Karnataka belonging to SC / ST / Category-I: the aggregate marks shall not be less than 45%.",
    ],
    entranceExams: [
      { name: "PGCET", description: "Karnataka PG Common Entrance Test" },
      { name: "GATE", description: "Graduate Aptitude Test in Engineering" },
      { name: "Institute Entrance", description: "Management quota seats" },
    ],
    entranceNote:
      "For management admissions, candidates may appear for any one of PGCET, GATE or the entrance examination conducted by the college.",
    feeYear: "2025-26",
    feeLines: [
      { quota: "Government Quota", courses: "Un-Aided Courses", fee: "KEA + VTU Fees + College Other Fees" },
      { quota: "Management Quota", courses: "Un-Aided Courses", fee: "Management Fees + VTU Fees + College Other Fees" },
    ],
    intakeTables: [
      {
        title: "Un-Aided Courses",
        code: "College Code: T810",
        rows: [
          { department: "Civil Engineering", branch: "Structural Engineering", intake: 18 },
          { department: "Civil Engineering", branch: "Geo-Technical Engineering", intake: 18 },
          { department: "Civil Engineering", branch: "Environmental Engineering", intake: 18 },
          { department: "Mechanical Engineering", branch: "Machine Design", intake: 18 },
        ],
        total: 72,
      },
    ],
  },
  {
    slug: "phd",
    tab: "Ph.D / M.Sc. (Engg.)",
    title: "Ph.D / M.Sc. (Engg.)",
    credential: "Doctor of Philosophy (Ph.D) / M.Sc. (Engg.)",
    description:
      "Research programmes leading to Ph.D and M.Sc. (Engg.), administered by VTU across nine recognized research centres.",
    intro:
      "Research programmes leading to Ph.D and M.Sc. (Engg.) are offered across nine VTU-recognized research centres. Admission and registration are administered by Visvesvaraya Technological University (VTU), Belagavi.",
    researchDepartments: [
      "Civil Engineering",
      "Computer Science & Engineering",
      "Electronics & Communication Engineering",
      "Electrical & Electronics Engineering",
      "Biotechnology",
      "Mechanical Engineering",
      "Physics — M.Sc. (Engg.)",
      "Information Science & Engineering",
      "Management Studies (MBA)",
    ],
    eligibility: [
      "Ph.D: A postgraduate qualification in the related discipline. Open to working professionals, faculty members and others.",
      "M.Sc. (Engg.): A 4-year engineering degree programme in the related discipline.",
    ],
    applicationProcess:
      "Download the application form from the VTU website (vtu.ac.in). Submit the duly-filled application along with the online payment receipt of ₹1,500/- and the necessary enclosures to: The Registrar, Visvesvaraya Technological University, “Jnana Sangama”, Belagavi-590018.",
    registrationDocs: [
      "Registration form for Ph.D. / M.Sc. (hardcopy)",
      "NOC from the organization (for part-time Ph.D.)",
      "Candidate bio-data",
      "SSLC, UG & PG marks cards",
      "Guide bio-data",
      "UG, PG & Ph.D. certificates of the Guide",
      "Co-Guide bio-data",
      "UG, PG & Ph.D. certificates of the Co-Guide",
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
      "Online fee receipt",
      "BEC college fee paid receipt",
    ],
  },
  {
    slug: "mba",
    tab: "MBA",
    title: "Master of Business Administration (MBA)",
    credential: "Master of Business Administration (MBA)",
    duration: "2 Years",
    seats: "60 sanctioned seats",
    description:
      "Two-year MBA programme with 60 seats, admitted through PGCET or KMAT under an equal Government and Management split.",
    intro:
      "The Department of Management Studies offers a two-year MBA programme with a sanctioned intake of 60 seats, shared equally between the Government and Management quotas. Admissions are conducted through PGCET or KMAT.",
    eligibility: [
      "Passed a Bachelor's degree with not less than 50% of marks in aggregate of all the years of the degree examinations (rounding-off of the aggregate percentage is not permitted).",
      "For candidates from Karnataka belonging to SC / ST and Category I: the aggregate percentage of marks shall not be less than 45% (rounding-off is not permitted).",
    ],
    entranceExams: [
      { name: "PGCET", description: "Karnataka PG Common Entrance Test" },
      { name: "KMAT", description: "Karnataka Management Aptitude Test" },
      { name: "Institute Entrance", description: "Management quota seats" },
    ],
    entranceNote:
      "For management admissions, candidates may appear for any one of PGCET, KMAT or the entrance examination conducted by the college.",
    feeYear: "2025-26",
    feeLines: [
      { quota: "Government Quota", courses: "Un-Aided Courses", fee: "₹50,000 (payable at KEA) + VTU Fees + College Other Fees" },
      { quota: "Management Quota", courses: "Un-Aided Courses", fee: "Management Fees + VTU Fees + College Other Fees" },
    ],
    intakeTables: [
      {
        title: "Un-Aided Course",
        code: "College Code: B124",
        rows: [
          { branch: "MBA — Government Quota (50%)", intake: 30 },
          { branch: "MBA — Management Quota (50%)", intake: 30 },
        ],
        total: 60,
      },
    ],
  },
  {
    slug: "mca",
    tab: "MCA",
    title: "Master of Computer Applications (MCA)",
    credential: "Master of Computer Applications (MCA)",
    duration: "2 Years",
    seats: "60 sanctioned seats",
    description:
      "Two-year MCA programme with 60 seats, admitted through PGCET or KMAT under an equal Government and Management split.",
    intro:
      "The Department of Computer Applications offers a two-year MCA programme with a sanctioned intake of 60 seats, shared equally between the Government and Management quotas. Admissions are conducted through PGCET or KMAT.",
    eligibility: [
      "Passed a Bachelor's degree with not less than 50% of marks in aggregate of all the years of the degree examinations (rounding-off of the aggregate percentage is not permitted).",
      "For candidates from Karnataka belonging to SC / ST and Category I: the aggregate percentage of marks shall not be less than 45% (rounding-off is not permitted).",
    ],
    entranceExams: [
      { name: "PGCET", description: "Karnataka PG Common Entrance Test" },
      { name: "KMAT", description: "Karnataka Management Aptitude Test" },
      { name: "Institute Entrance", description: "Management quota seats" },
    ],
    entranceNote:
      "For management admissions, candidates may appear for any one of PGCET, KMAT or the entrance examination conducted by the college.",
    feeYear: "2025-26",
    feeLines: [
      { quota: "Government Quota", courses: "Un-Aided Courses", fee: "₹55,000 (payable at KEA) + VTU Fees + College Other Fees" },
      { quota: "Management Quota", courses: "Un-Aided Courses", fee: "Management Fees + VTU Fees + College Other Fees" },
    ],
    intakeTables: [
      {
        title: "Un-Aided Course",
        code: "College Code: C408MC",
        rows: [
          { branch: "MCA — Government Quota (50%)", intake: 30 },
          { branch: "MCA — Management Quota (50%)", intake: 30 },
        ],
        total: 60,
      },
    ],
  },
];

export function getAdmissionProgramme(slug: AdmissionProgramme["slug"]) {
  const programme = admissionProgrammes.find((p) => p.slug === slug);
  if (!programme) throw new Error(`Unknown admission programme: ${slug}`);
  return programme;
}

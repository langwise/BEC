// ==============================
// Root Faculty Profile
// ==============================
export interface FacultyProfile {
  basicInfo: BasicInfo;
  contactDetails: ContactDetails;
  education: EducationDetail[];
  workExperience: WorkExperience[];
  teaching: TeachingProfile;
  research: ResearchProfile;
  publications: Publications;
  administrativeResponsibilities?: AdministrativeResponsibility[];
  professionalDevelopment: ProfessionalDevelopment;
  consultancy?: Consultancy;
  outreachActivities?: Outreach;
  researchSupervision: ResearchSupervision;
  usefulResources?: UsefulResource[];
}

// ==============================
// Basic Information
// ==============================
export interface BasicInfo {
  name: string;
  designation: string;
  department: string;
  profilePhotoUrl?: string;
  qualification?: string; // Often useful to display "Ph.D" etc prominently
}

// ==============================
// Contact Details
// ==============================
export interface ContactDetails {
  email?: string;
  phone?: string;
  linkedIn?: string;
  vidwanId?: string;
  orchidId?: string;
  aicteId?: string;
  vtuFacultyId?: string;
  personalWebsite?: string;
  googleScholar?: string;
}

// ==============================
// Education
// ==============================
export interface EducationDetail {
  degree: string;
  specialization: string;
  universityOrInstitution: string;
  yearOfAward: number;
}

// ==============================
// Work Experience
// ==============================
export interface WorkExperience {
  position: string;
  organization: string;
  fromDate: string;   // ISO or display string
  toDate?: string;    // "till date" → undefined
}

// ==============================
// Teaching Section
// ==============================
export interface TeachingProfile {
  coursesCurrentlyTeaching: Course[];
  coursesPreviouslyTaught: CourseGroup[];
  teachingInterests: TeachingInterest;
}

export interface Course {
  courseCode?: string;
  courseName: string;
}

export interface CourseGroup {
  program: string; // e.g., "B.E (CSE)", "M.Tech (CSE)"
  courses: string[];
}

export interface TeachingInterest {
  teachingCourses: string[];
  pedagogicalApproaches: string[];
}

// ==============================
// Research Section
// ==============================
export interface ResearchProfile {
  researchInterests: string[];
}

// ==============================
// Publications
// ==============================
export interface Publications {
  journalPapers: Publication[];
  conferencePapers: Publication[];
  booksOrBookChapters?: Publication[];
  patents?: Patent[];
}

export interface Publication {
  authors: string[];
  title: string;
  journalOrConference: string;
  volumeOrEdition?: string;
  year: number;
  pages?: string;
  doiOrUrl?: string;
}

export interface Patent {
  title: string;
  patentNumber?: string;
  year?: number;
}

// ==============================
// Administrative Responsibilities
// ==============================
export interface AdministrativeResponsibility {
  role: string;
  organization: string;
  fromYear?: number;
  toYear?: number;
}

// ==============================
// Professional Development
// ==============================
export interface ProfessionalDevelopment {
  programsOrganized?: Program[];
  workshopsAttended: Program[];
  fdpOrSttpAttended: Program[];
  seminarsAttended?: Program[];
}

export interface Program {
  programName: string;
  organizingInstitution: string;
  duration: string;
}

// ==============================
// Consultancy & Outreach
// ==============================
export interface Consultancy {
  details?: string;
}

export interface Outreach {
  activities?: string[];
}

// ==============================
// Research Supervision
// ==============================
export interface ResearchSupervision {
  ugProjects: GuidedProject[];
  pgProjects: GuidedProject[];
  phdProjects?: GuidedProject[];
}

export interface GuidedProject {
  studentName: string;
  thesisTitle: string;
  status: "Ongoing" | "Completed";
  year?: number;
}

// ==============================
// Useful Resources
// ==============================
export interface UsefulResource {
  title: string;
  url?: string;
}

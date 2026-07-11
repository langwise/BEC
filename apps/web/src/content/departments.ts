import data from "@content/departments.json";
import { asset, assetsUnder } from "@/lib/assets";

export type CodedItem = { code: string; text: string };

export type DepartmentContent = {
  name: string;
  tagline?: string;
  assetSlug?: string;
  /** Asset key for a full-bleed hero image shown at the top of the department page (like the home hero). */
  heroImage?: string;
  infrastructureGallerySlug?: string;
  established?: string;
  intake?: string;
  /** Department-specific "Quick Facts" panel shown on the Home tab. Only rendered when set. */
  quickFacts?: {
    facts?: { label: string; value: string }[];
    researchAreas?: string[];
  };
  /** When true, surfaces an "NBA Accredited" card in the Home quick-stats row. */
  nbaAccredited?: boolean;
  overview?: string;
  /** Asset key for a lead image shown above the Home overview (e.g. the department group photo). */
  overviewImage?: string;
  /** Caption rendered below the overview lead image (e.g. "Teaching Faculty"). */
  overviewImageCaption?: string;
  /** Message from the Head of Department, shown on the Home tab. */
  hodMessage?: { message: string; name?: string; designation?: string; image?: string };
  about?: string;
  vision?: string;
  mission?: string[];
  programsOffered?: string[];
  /**
   * Overrides the "Programs Offered" stat count when the listed bullets expand a
   * single programme into multiple recognition tracks (e.g. one Ph.D. shown as its
   * VTU and AICTE-QIP variants). Defaults to programsOffered.length when unset.
   */
  programsOfferedCount?: number;
  /** Programme structure facts (duration, semesters, total credits) shown under Academics. */
  programStructure?: string[];
  peos?: CodedItem[];
  psos?: CodedItem[];
  /** Programme Outcomes — rendered alongside PEOs/PSOs in the Academics section. */
  pos?: CodedItem[];
  /** Knowledge and Attitude Profile (WK) — rendered alongside PEOs/PSOs/POs. */
  wk?: CodedItem[];
  /** Core values shown as a bullet list under the Home overview (e.g. IPE). */
  values?: string[];
  /** Monthly department newsletters, rendered as a documents section. */
  newsletters?: { title: string; file: string }[];
  highlights?: string[];
  researchAreas?: { supervisor: string; area: string; university?: string }[];
  /** Major research areas/domains as plain bullets (distinct from supervisor→area pairs). */
  researchAreasList?: string[];
  /** Research facilities available at the centre (bullets). */
  researchFacilities?: string[];
  /** Notable research achievements (bullets). */
  researchAchievements?: string[];
  /** Year-wise research output grouped by category (journals, books, chapters, conferences). */
  publications?: { category: string; years: { year?: string; items: string[] }[] }[];
  /** Free-form awards/achievements tables (faculty awards, student projects, participations, chapter awards). */
  achievementTables?: { title: string; columns: string[]; rows: string[][] }[];
  /** Student achievements — month-wise narrative highlights, plus optional Best Outgoing Students and alumni-entrepreneur tables. */
  studentAchievements?: {
    months?: { title: string; items: string[] }[];
    bestOutgoing?: { name: string; year: string }[];
    entrepreneurs?: { name: string; role?: string; organization?: string }[];
  };
  /** Incubated startups — companies registered and grants received. */
  startups?: {
    companies?: { name: string; founders: string; domain: string; established: string }[];
    grants?: { startup: string; project: string; year: string; agency: string; amount: string }[];
  };
  /** Distinguished alumni — gallery of name + designation + organization, with an optional portrait (initials shown when absent). */
  distinguishedAlumni?: { name: string; designation?: string; organization?: string; photo?: string }[];
  /** Alumni testimonials — rendered as quote cards under an "Alumni" section. */
  testimonials?: { name: string; quote: string; designation?: string; organization?: string; photo?: string }[];
  /** Alumni record PDFs — rendered as a downloadable "Alumni Records" section. */
  alumniRecords?: { title: string; file: string }[];
  /** Patents filed/published/granted — rendered as a table on the Research page. */
  patents?: {
    title: string;
    applicationNumber?: string;
    inventors?: string;
    area?: string;
    filed?: string;
    published?: string;
    awarded?: string;
    awardNumber?: string;
    status?: string;
  }[];
  /** Fold scholars/grants/facilities/achievements into a single "Research Centre" tab. */
  consolidateResearch?: boolean;
  /** Fold Publications and Patents into the "Research Achievements" section instead of separate tabs. */
  publicationsUnderAchievements?: boolean;
  phdsAwarded?: { scholar: string; guide: string; title: string; year: string }[];
  researchScholars?: { scholar: string; usn?: string; guide: string; title?: string; status: string }[];
  researchGrants?: { title: string; agency: string; year: string; amount: string; investigators: string }[];
  labs?: { name: string; description?: string; features?: string[]; images?: string[]; feature?: boolean }[];
  /** When true, the Ph.D.s/Scholars/Grants tables render inside the Research tab and no standalone "Research Achievements" tab is emitted. */
  achievementsUnderResearch?: boolean;
  /** When true, `labs` render on the Facilities tab and the equipment/software tables move into the Research tab instead. */
  labsUnderFacilities?: boolean;
  /** Labs shown under the Infrastructure tab (title + caption + images), separate from `labs` which render under Research. */
  infrastructureLabs?: { name: string; description?: string; images?: string[] }[];
  /** Group photo of the teaching faculty, shown as a banner above the Faculty grid. */
  facultyGroupPhoto?: string;
  /** Highlighted caption rendered below the teaching-faculty group photo (e.g. "Teaching Faculty"). */
  facultyGroupPhotoCaption?: string;
  /** Group photo of the supporting staff, shown as a banner above the Supporting Staff tables. */
  staffGroupPhoto?: string;
  /** Highlighted caption rendered below the supporting-staff group photo (e.g. "Supporting Staff"). */
  staffGroupPhotoCaption?: string;
  /** Group photo of placed students, shown as a captioned banner at the end of the Placements section. */
  placementsPhoto?: string;
  placementsPhotoCaption?: string;
  /** Group photo shown as a captioned banner at the very end of the department Home tab (e.g. the graduating batch). */
  homeGroupPhoto?: string;
  homeGroupPhotoCaption?: string;
  /** Categorised facility photos (classrooms, labs, library, campus), shown as captioned galleries on the Facilities tab. */
  facilitiesGallery?: { title?: string; images: string[] }[];
  supportingStaff?: { name: string; designation: string }[];
  committeeGroups?: {
    title: string;
    members: { name: string; position: string }[];
  }[];
  infrastructureItems?: { name: string; specification?: string; quantity?: string }[];
  softwareItems?: { name: string; version?: string; usage?: string }[];
  activities?: {
    title: string;
    date?: string;
    description?: string;
    /** Labelled facts (resource person, participants, budget, outcomes…) shown as bullets. */
    details?: string[];
    /** Captioned event photos rendered as a gallery under the activity. */
    images?: { key: string; caption?: string }[];
  }[];
  /** Department activity programmes (SDPs, FDPs, workshops) rendered as titled tables under an "Activities" section. */
  activityTables?: { title: string; columns: string[]; rows: string[][] }[];
  associations?: {
    name: string;
    about?: string;
    /** Group photo of the association's office bearers, shown as a captioned banner at the end of the section. */
    photo?: string;
    photoCaption?: string;
    coordinators?: string[];
    /** Student executive committee (exicom) — office bearers and the positions they hold. */
    exicom?: { name: string; position: string }[];
    /** Coordinator teams listed by category (e.g. Technical, Program, Sports, Cultural, Media). */
    exicomGroups?: { title: string; members: string[] }[];
    /** Asset keys for an activity-highlights photo gallery shown at the end of the section. */
    gallery?: string[];
  }[];
  mous?: { partner: string; location?: string; since?: string }[];
  contact?: { name?: string; designation?: string; phone?: string; email?: string };
  additionalContacts?: { name: string; designation?: string; phone?: string; email?: string }[];
  documents?: { title: string; file: string }[];
  /** Curriculum shown as labelled sub-tabs (e.g. Scheme of Teaching & Examinations / Syllabus). */
  curriculumGroups?: { title: string; documents: { title: string; file: string }[] }[];
  /** Extra PDFs attached to a specific section, keyed by section id (research, mou, facilities, faculty…). */
  sectionDocuments?: Record<string, { title: string; file: string }[]>;
  /** PDFs embedded inline (rendered in a viewer) under a specific section, keyed by section id. */
  sectionEmbeds?: Record<string, { title: string; file: string }[]>;
  /** Best-practices PDFs surfaced on the department Home tab. */
  bestPractices?: { title: string; file: string }[];
  /** Move the Best Practices block out of the Home tab and under "About Department". */
  bestPracticesUnderAbout?: boolean;
  /** Per-department section heading overrides, keyed by section id. */
  sectionTitles?: Record<string, string>;
  /** Per-department sidebar label overrides, keyed by section id. */
  sectionNavLabels?: Record<string, string>;
  /** Per-department section icon overrides (sidebar + heading), keyed by section id. */
  sectionIcons?: Record<string, string>;
  /** Drop the "Quantity" column from the infrastructure/equipment table for this department. */
  hideInfrastructureQuantity?: boolean;
  /** Show Vision & Mission on the Home tab (after the overview) and move the HoD message, lead photo and Highlights under "About Department". */
  visionMissionOnHome?: boolean;
  /** Move the Programme Educational Objectives (PEOs) and Programme Specific Outcomes (PSOs) out of the Academics section and under "About Department". */
  peosPsosUnderAbout?: boolean;
  /** Split Supporting Staff into "Technical Staff" (instructors) and "Supporting Staff" (helpers/peons). */
  groupSupportingStaff?: boolean;
  /** Placements: show only summary/recruiter tables, hide per-student name lists. */
  placementsSummaryOnly?: boolean;
  /** Asset-key substrings to drop from the infrastructure gallery (e.g. stray portrait shots). */
  galleryExclude?: string[];
};

/** Back-compat alias — the minimal shape older callers relied on. */
export type DepartmentMeta = Pick<DepartmentContent, "name" | "tagline" | "assetSlug">;

const departments = data.departments as Record<string, DepartmentContent>;

function keyFor(slug: string, type?: string): string {
  return type && departments[`${type}/${slug}`] ? `${type}/${slug}` : slug;
}

/** Full content for a department by URL slug/type, or undefined if unknown. */
export function getDepartmentContent(
  slug: string,
  type?: string,
): DepartmentContent | undefined {
  return departments[keyFor(slug, type)];
}

/** Metadata for a department by its URL slug, or undefined if unknown. */
export function getDepartmentMeta(slug: string, type?: string): DepartmentMeta | undefined {
  return departments[keyFor(slug, type)];
}

export function getDepartmentContentKey(slug: string, type?: string): string {
  return keyFor(slug, type);
}

/**
 * All R2 photo URLs for a department's folder (departments/<assetSlug>/),
 * sorted by key. Empty when the department has no photos yet.
 */
/**
 * Resolve curriculum/syllabus documents to { title, url }, keeping only those
 * whose file actually exists on R2 (absolute URL). A missing key would otherwise
 * resolve to a same-origin path that loads our own 404 page.
 */
export function resolveDocuments(
  docs?: { title: string; file: string }[],
): { title: string; url: string }[] {
  if (!docs?.length) return [];
  return docs
    .map((d) => ({ title: d.title, url: asset(d.file) }))
    .filter((d) => d.url.startsWith("http"));
}

export function getDepartmentGallery(assetSlug?: string): string[] {
  if (!assetSlug) return [];
  // Scene/infrastructure photos only — exclude the faculty/ and alumni/ subtrees
  // (portraits + CV PDFs) and any non-image assets.
  return assetsUnder(`departments/${assetSlug}/`).filter(
    (url) => !url.includes("/faculty/") && !url.includes("/alumni/") && /\.(webp|jpe?g|png)$/i.test(url),
  );
}

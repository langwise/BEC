import data from "@content/departments.json";
import { asset, assetsUnder } from "@/lib/assets";

export type CodedItem = { code: string; text: string };

export type DepartmentContent = {
  name: string;
  tagline?: string;
  assetSlug?: string;
  infrastructureGallerySlug?: string;
  established?: string;
  intake?: string;
  overview?: string;
  about?: string;
  vision?: string;
  mission?: string[];
  programsOffered?: string[];
  peos?: CodedItem[];
  psos?: CodedItem[];
  /** Programme Outcomes — rendered alongside PEOs/PSOs in the Academics section. */
  pos?: CodedItem[];
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
  /** Fold scholars/grants/facilities/achievements into a single "Research Centre" tab. */
  consolidateResearch?: boolean;
  phdsAwarded?: { scholar: string; guide: string; title: string; year: string }[];
  researchScholars?: { scholar: string; usn?: string; guide: string; title?: string; status: string }[];
  researchGrants?: { title: string; agency: string; year: string; amount: string; investigators: string }[];
  labs?: { name: string; description?: string }[];
  supportingStaff?: { name: string; designation: string }[];
  committeeGroups?: {
    title: string;
    members: { name: string; position: string }[];
  }[];
  infrastructureItems?: { name: string; specification?: string; quantity?: string }[];
  softwareItems?: { name: string; version?: string; usage?: string }[];
  activities?: { title: string; date?: string; description?: string }[];
  associations?: { name: string; about?: string; coordinators?: string[] }[];
  mous?: { partner: string; location?: string; since?: string }[];
  contact?: { name?: string; designation?: string; phone?: string; email?: string };
  additionalContacts?: { name: string; designation?: string; phone?: string; email?: string }[];
  documents?: { title: string; file: string }[];
  /** Curriculum shown as labelled sub-tabs (e.g. Scheme of Teaching & Examinations / Syllabus). */
  curriculumGroups?: { title: string; documents: { title: string; file: string }[] }[];
  /** Extra PDFs attached to a specific section, keyed by section id (research, mou, facilities, faculty…). */
  sectionDocuments?: Record<string, { title: string; file: string }[]>;
  /** Best-practices PDFs surfaced on the department Home tab. */
  bestPractices?: { title: string; file: string }[];
  /** Per-department section heading overrides, keyed by section id. */
  sectionTitles?: Record<string, string>;
  /** Per-department sidebar label overrides, keyed by section id. */
  sectionNavLabels?: Record<string, string>;
  /** Drop the "Quantity" column from the infrastructure/equipment table for this department. */
  hideInfrastructureQuantity?: boolean;
  /** Show Vision & Mission on the Home tab and move Highlights under "About Department". */
  visionMissionOnHome?: boolean;
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
  // Scene/infrastructure photos only — exclude the faculty/ subtree (portraits +
  // CV PDFs) and any non-image assets.
  return assetsUnder(`departments/${assetSlug}/`).filter(
    (url) => !url.includes("/faculty/") && /\.(webp|jpe?g|png)$/i.test(url),
  );
}

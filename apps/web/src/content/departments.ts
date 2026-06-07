import data from "@content/departments.json";
import { assetsUnder } from "@/lib/assets";

export type CodedItem = { code: string; text: string };

export type DepartmentContent = {
  name: string;
  tagline?: string;
  assetSlug?: string;
  established?: string;
  intake?: string;
  overview?: string;
  vision?: string;
  mission?: string[];
  programsOffered?: string[];
  peos?: CodedItem[];
  psos?: CodedItem[];
  highlights?: string[];
  researchAreas?: { supervisor: string; area: string; university?: string }[];
  labs?: { name: string; description?: string }[];
  activities?: { title: string; date?: string; description?: string }[];
  associations?: { name: string; about?: string; coordinators?: string[] }[];
  contact?: { name?: string; designation?: string; phone?: string; email?: string };
};

/** Back-compat alias — the minimal shape older callers relied on. */
export type DepartmentMeta = Pick<DepartmentContent, "name" | "tagline" | "assetSlug">;

const departments = data.departments as Record<string, DepartmentContent>;

/** Full content for a department by its URL slug, or undefined if unknown. */
export function getDepartmentContent(slug: string): DepartmentContent | undefined {
  return departments[slug];
}

/** Metadata for a department by its URL slug, or undefined if unknown. */
export function getDepartmentMeta(slug: string): DepartmentMeta | undefined {
  return departments[slug];
}

/**
 * All R2 photo URLs for a department's folder (departments/<assetSlug>/),
 * sorted by key. Empty when the department has no photos yet.
 */
export function getDepartmentGallery(assetSlug?: string): string[] {
  return assetSlug ? assetsUnder(`departments/${assetSlug}/`) : [];
}

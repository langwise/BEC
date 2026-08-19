import data from "@content/faculty.json";
import { asset } from "@/lib/assets";
import type { FacultyMember } from "@/types/faculty";
import { facultyContentSchema, type FacultyEntry } from "./schema/faculty";
import { parseContent } from "./schema/shared";

const byDepartment: Record<string, FacultyEntry[]> = parseContent(
  "faculty.json",
  facultyContentSchema,
  data,
).departments;

/**
 * Resolve an asset key to its R2 URL, but only if it actually exists on R2.
 * `asset()` falls back to a same-origin `/key` path for unknown keys — for a
 * portrait that means a broken image, and for a CV that means the modal iframe
 * would load our own site (404 page with full nav). Returning undefined instead
 * lets the card fall back cleanly (initials / no modal).
 */
function resolveAsset(key?: string): string | undefined {
  if (!key) return undefined;
  const url = asset(key);
  return url.startsWith("http") ? url : undefined;
}

/** Faculty members for a department by URL slug (empty if none yet). */
export function getDepartmentFaculty(slug: string): FacultyMember[] {
  const entries = byDepartment[slug];
  if (!entries?.length) return [];
  return entries.map((entry) => ({
    name: entry.name,
    designation: entry.designation,
    photoUrl: resolveAsset(entry.photo),
    cvUrl: resolveAsset(entry.cv),
  }));
}

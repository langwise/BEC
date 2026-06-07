import data from "@content/faculty.json";
import { asset } from "@/lib/assets";
import type { FacultyMember } from "@/types/faculty";

/** Author-friendly flat faculty record (see content/faculty.schema.json). */
type FacultyEntry = {
  name: string;
  designation: string;
  /** Portrait asset key on R2. */
  photo?: string;
  /** Full profile / CV PDF asset key on R2. */
  cv?: string;
};

const byDepartment = data.departments as Record<string, FacultyEntry[]>;

/** Faculty members for a department by URL slug (empty if none yet). */
export function getDepartmentFaculty(slug: string): FacultyMember[] {
  const entries = byDepartment[slug];
  if (!entries?.length) return [];
  return entries.map((entry) => ({
    name: entry.name,
    designation: entry.designation,
    photoUrl: entry.photo ? asset(entry.photo) : undefined,
    cvUrl: entry.cv ? asset(entry.cv) : undefined,
  }));
}

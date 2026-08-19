import type { FacultyContent, FacultyEntry } from "../../content/schema/faculty.ts";
import { commonFolder, type DepartmentOption } from "./departments.ts";
import { inOrderOf, optional, withKeys, type Keyed } from "./rows.ts";

/**
 * `content/faculty.json` ⇄ the shape the faculty editor works in.
 *
 * The file is one map of department key → profiles. The editor shows one
 * department at a time, but publishes the whole map — it is one file, and an
 * Editor who fixes a name in two departments should press Publish once.
 */

export type ProfileRow = {
  name: string;
  designation: string;
  photo: string;
  cv: string;
  /**
   * The key order this entry arrived in. 108 of the 198 profiles write `cv`
   * before `photo`; emitting schema order would rewrite every one of them on
   * the first publish that fixed a single designation.
   */
  order: string[];
};

export type DepartmentRoster = {
  /** The content key, e.g. "civil-engg". Not editable — it is the join. */
  department: string;
  profiles: Keyed<ProfileRow>[];
};

export type FacultyState = {
  departments: Keyed<DepartmentRoster>[];
};

function toProfile(entry: FacultyEntry): ProfileRow {
  return {
    name: entry.name,
    designation: entry.designation,
    photo: entry.photo ?? "",
    cv: entry.cv ?? "",
    order: Object.keys(entry),
  };
}

function toEntry(row: ProfileRow): FacultyEntry {
  const built: FacultyEntry = {
    name: row.name.trim(),
    designation: row.designation.trim(),
    ...optional("photo", row.photo),
    ...optional("cv", row.cv),
  };
  return inOrderOf(built, row.order);
}

export function toState(content: FacultyContent): FacultyState {
  return {
    departments: withKeys(
      Object.entries(content.departments).map(([department, entries]) => ({
        department,
        profiles: withKeys(entries.map(toProfile)),
      })),
    ),
  };
}

export function toDocument(state: FacultyState, content: FacultyContent): FacultyContent {
  const departments: Record<string, FacultyEntry[]> = {};
  for (const roster of state.departments) {
    departments[roster.department] = roster.profiles.map(toEntry);
  }
  return {
    ...(content.$schema ? { $schema: content.$schema } : {}),
    departments,
  };
}

export function newProfile(): ProfileRow {
  return { name: "", designation: "", photo: "", cv: "", order: [] };
}

export function newRoster(department: string): DepartmentRoster {
  return { department, profiles: [] };
}

/**
 * Where this department's portraits and CVs belong, read off the keys it
 * already uses. `undefined` means the department has no assets yet and the
 * Editor picks the folder in the upload dialog.
 */
export function uploadFolders(
  roster: DepartmentRoster,
  options: readonly DepartmentOption[],
): { photo: string | undefined; cv: string | undefined } {
  const photo =
    commonFolder(roster.profiles.map((profile) => profile.photo)) ?? guessFolder(roster, options);
  const cv = commonFolder(roster.profiles.map((profile) => profile.cv)) ?? (photo ? `${photo}/cv` : undefined);
  return { photo, cv };
}

/** The convention every department already follows, for one with no assets yet. */
function guessFolder(
  roster: DepartmentRoster,
  options: readonly DepartmentOption[],
): string | undefined {
  const slug = options.find((option) => option.key === roster.department)?.assetSlug;
  return slug ? `departments/${slug}/faculty` : undefined;
}

/** Which field still needs filling in, phrased for the Editor, or undefined. */
export function firstProblem(state: FacultyState, name: (key: string) => string): string | undefined {
  for (const roster of state.departments) {
    const blank = roster.profiles.findIndex(
      (profile) => !profile.name.trim() || !profile.designation.trim(),
    );
    if (blank >= 0) {
      return `${name(roster.department)}: profile ${blank + 1} needs a name and a designation.`;
    }
  }
  return undefined;
}

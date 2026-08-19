/**
 * Two content files — faculty and placements — are keyed by department, and
 * both need the same three things: a readable name for the key, a sensible
 * place to file an upload, and the list of departments that could still be
 * added. None of that is in either file, so it is derived here once.
 */

/** What a department switcher needs. Small on purpose — it crosses to the client. */
export type DepartmentOption = {
  /** The key the content file uses, e.g. "civil-engg" or "pg/biotechnology". */
  key: string;
  /** What an Editor calls it, e.g. "Civil Engineering". */
  name: string;
  /** Where its assets live on R2, e.g. "civil". Absent for some PG entries. */
  assetSlug?: string;
};

/**
 * A key's department name, or the key itself when the catalogue has never
 * heard of it. A content file may hold a department that has been renamed or
 * removed from the catalogue; showing the raw key is how an Editor finds out,
 * rather than the entry vanishing from the screen.
 */
export function departmentName(key: string, options: readonly DepartmentOption[]): string {
  return options.find((option) => option.key === key)?.name ?? key;
}

/** Catalogue order, then anything the file has that the catalogue does not. */
export function orderedKeys(
  present: readonly string[],
  options: readonly DepartmentOption[],
): string[] {
  const known = options.map((option) => option.key).filter((key) => present.includes(key));
  return [...known, ...present.filter((key) => !known.includes(key))];
}

/** Departments in the catalogue that this file has no entry for yet. */
export function addableDepartments(
  present: readonly string[],
  options: readonly DepartmentOption[],
): DepartmentOption[] {
  return options.filter((option) => !present.includes(option.key));
}

/**
 * Where a department's next upload should go, read off the keys it already
 * uses rather than assembled from a slug.
 *
 * Two reasons. The PG departments have no `assetSlug` at all, yet their photos
 * are filed neatly under `departments/pg-ece/faculty` — a convention only the
 * keys record. And a department whose folder was renamed keeps working without
 * anyone remembering to update a table here. The *most common* folder wins, not
 * the first: two departments have a stray portrait under `governance/`, and
 * filing every new photo beside that one outlier would be wrong.
 */
export function commonFolder(keys: readonly (string | undefined)[]): string | undefined {
  const counts = new Map<string, number>();
  for (const key of keys) {
    if (!key) continue;
    const cut = key.lastIndexOf("/");
    if (cut <= 0) continue;
    const folder = key.slice(0, cut);
    counts.set(folder, (counts.get(folder) ?? 0) + 1);
  }
  let best: string | undefined;
  let bestCount = 0;
  // Insertion order breaks ties, so the answer does not depend on Map ordering
  // quirks — the first folder to reach the winning count keeps it.
  for (const [folder, count] of counts) {
    if (count > bestCount) {
      best = folder;
      bestCount = count;
    }
  }
  return best;
}

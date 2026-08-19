/**
 * What a form's working value has to go through before it is a document.
 *
 * The other editors do this field by field: a mapper trims each string and
 * `optional()` leaves the blank ones out. The departments document has ninety
 * top-level fields nested five deep, so the same rules are applied here once,
 * to the whole tree, instead of ninety times by hand.
 *
 * Two rules, and each one is a bug that would otherwise reach the site: a
 * trailing space typed into a heading is printed on the page, and an empty
 * string or empty array is what the schema calls *absent*, so writing
 * `hero: []` (or `tagline: ""`) fails validation for a field the Editor simply
 * did not use.
 *
 * `null` survives — one field is genuinely nullable (a publication with no year)
 * — and so does `false`, which is a value some flags may want to state.
 */
export function normalizeDocument(value: unknown): unknown {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }

  if (Array.isArray(value)) {
    // Entries are normalized where they stand and never taken out. Position is
    // meaning inside an array: an empty cell in the middle of a table row is
    // column four being blank, not column five sliding left into it. And a row
    // an Editor added but has not filled in is something to be *told* about —
    // the schema names it in the Publish bar — rather than something to delete
    // behind their back on the way to the file.
    const items = value.map((item) => normalizeDocument(item) ?? blankLike(item));
    return items.length === 0 ? undefined : items;
  }

  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};
    // Key order is the file's, not the schema's: a content file is something
    // Pratik reads as a diff, and re-emitting fields in a different order would
    // rewrite a whole department on the publish that fixed one word in it.
    for (const [field, item] of Object.entries(value)) {
      const normalized = normalizeDocument(item);
      if (normalized !== undefined) result[field] = normalized;
    }
    return Object.keys(result).length === 0 ? undefined : result;
  }

  return value;
}

/** What an array entry that normalized away is put back as, keeping its place. */
function blankLike(item: unknown): unknown {
  if (typeof item === "string") return "";
  if (Array.isArray(item)) return [];
  if (item !== null && typeof item === "object") return {};
  return item;
}

/**
 * The same, for a document whose top level must survive even when every field
 * in it is blank — a department that has been emptied is still a department,
 * and returning nothing would publish `undefined` over it.
 */
export function normalizeEntry<T>(value: T): T {
  return (normalizeDocument(value) ?? {}) as T;
}

/**
 * An object with its empty fields taken out, or nothing at all when that leaves
 * it empty — what a form needs while it is being filled in, so that clearing
 * the last box of a block removes the block rather than leaving `{}` behind for
 * the schema to complain about.
 */
export function compact<T extends object>(object: T): T | undefined {
  const kept = Object.entries(object).filter(
    ([, item]) =>
      item !== undefined &&
      item !== "" &&
      !(Array.isArray(item) && item.length === 0),
  );
  return kept.length === 0 ? undefined : (Object.fromEntries(kept) as T);
}

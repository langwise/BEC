/**
 * A React handle for a row of content that is *never written to the document*.
 *
 * `rows.ts` mints handles by spreading a `key` field onto each row, which works
 * for editors that rebuild every row through a mapper on the way out. The
 * departments editor does not: its state *is* the department object, so a `key`
 * spread onto a row would be published — and the departments schema already has
 * a field called `key` (every photo has one), so the collision is not
 * hypothetical.
 *
 * So the handle lives beside the row instead of on it. Identity follows the
 * object, and the one operation that replaces a row with a modified copy carries
 * the handle across, which is what keeps a text box from losing focus on every
 * keystroke.
 */

const ids = new WeakMap<object, string>();
let seed = 0;

/** This row's handle, minted the first time it is asked for. */
export function rowId(row: object): string {
  const known = ids.get(row);
  if (known !== undefined) return known;
  seed += 1;
  const id = `row-${seed}`;
  ids.set(row, id);
  return id;
}

/** Give `next` the handle `previous` had, so React sees the same row. */
export function carryId<T extends object>(previous: object, next: T): T {
  const id = ids.get(previous);
  if (id !== undefined) ids.set(next, id);
  return next;
}

/** Replace one row by merging a patch into it, keeping its handle. */
export function patchRow<T extends object>(
  rows: readonly T[],
  index: number,
  patch: Partial<NoInfer<T>>,
): T[] {
  return rows.map((row, i) => (i === index ? carryId(row, { ...row, ...patch }) : row));
}

/** Replace one row wholesale, keeping its handle. */
export function replaceRow<T extends object>(rows: readonly T[], index: number, next: T): T[] {
  return rows.map((row, i) => (i === index ? carryId(row, next) : row));
}

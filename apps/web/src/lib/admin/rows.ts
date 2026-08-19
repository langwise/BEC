/**
 * Editing a JSON array in a form, generically.
 *
 * Content arrays have no ids — an id would be a second thing to keep unique for
 * no reader's benefit, and it would show up in every diff Pratik reads. React
 * still needs a handle that survives reordering, so one is minted on load and
 * thrown away on publish. `news-rows.ts` did this for one file; every editor
 * from [15] onwards needs the same three operations, so they live here.
 */

/**
 * An item plus a browser-only handle. The handle never reaches the document.
 *
 * A row shape must not have a field of its own called `key`: the handle is
 * spread over the item, so a roster keyed by `"civil-engg"` would silently
 * become `"row-7"` and publish a file full of the wrong department names. That
 * cannot be a type error — `Keyed<T>` collapses to `never` the moment `T`
 * forbids the field — so it is a naming rule, guarded by the byte-exact
 * round-trip test every editor's mapper carries. Name the field for what it
 * holds (`department`, `slug`) and the question does not arise.
 */
export type Keyed<T> = T & { key: string };

let keySeed = 0;

export function newRowKey(): string {
  keySeed += 1;
  return `row-${keySeed}`;
}

export function withKey<T extends object>(item: T): Keyed<T> {
  return { ...item, key: newRowKey() };
}

export function withKeys<T extends object>(items: readonly T[]): Keyed<T>[] {
  return items.map(withKey);
}

/** Move one item; an out-of-range target is a no-op rather than a lost item. */
export function move<T>(items: readonly T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length || from < 0 || from >= items.length) return [...items];
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/**
 * Replace one item by merging a patch into it.
 *
 * `NoInfer` keeps the patch out of inference: a `Keyed<BatchRow>[]` patched
 * with a `Partial<BatchRow>` would otherwise settle on the *unkeyed* type and
 * hand back an array the caller cannot use.
 */
export function patchAt<T>(
  items: readonly T[],
  index: number,
  patch: Partial<NoInfer<T>>,
): T[] {
  return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

export function removeAt<T>(items: readonly T[], index: number): T[] {
  return items.filter((_, i) => i !== index);
}

/**
 * `value` if it has any non-blank content, otherwise nothing at all — spread
 * into an object literal to build documents where "empty" means *absent*.
 *
 * The distinction is not cosmetic: `photo: ""` fails the schema and `email: ""`
 * would render an empty mailto link on the site, so a field an Editor cleared
 * has to disappear rather than become blank.
 */
export function optional<K extends string>(
  field: K,
  value: string | undefined,
): Record<K, string> | Record<string, never> {
  const trimmed = value?.trim();
  return trimmed ? ({ [field]: trimmed } as Record<K, string>) : {};
}

/**
 * `built`, with its keys back in the order they arrived in.
 *
 * JSON objects are unordered as data, but a content file is something Pratik
 * reads as a diff. A builder that emits fields in schema order rewrites every
 * entry whose file happens to disagree — six leadership cards reshuffling on a
 * publish that changed one email address. Fields `order` does not mention keep
 * their builder order, appended after; that is what a genuinely new field is.
 */
export function inOrderOf<T extends object>(built: T, order: readonly string[]): T {
  const remaining = new Map(Object.entries(built));
  const result: Record<string, unknown> = {};
  for (const field of order) {
    if (remaining.has(field)) {
      result[field] = remaining.get(field);
      remaining.delete(field);
    }
  }
  for (const [field, value] of remaining) result[field] = value;
  return result as T;
}

/**
 * The same, for a field the schema holds as a *number* while the form holds
 * text. A box an Editor cleared has to disappear, and a box holding "12 " has
 * to become `12` — but a box holding "twelve" must not become `NaN`, which
 * `JSON.stringify` writes as `null` and the schema then rejects with a message
 * about the wrong type rather than about the typo. Anything unparseable is
 * left out here and reported by the editor's own check before publishing.
 */
export function optionalNumber<K extends string>(
  field: K,
  value: string | undefined,
): Record<K, number> | Record<string, never> {
  if (!isNumberText(value)) return {};
  return { [field]: Number(value?.trim()) } as Record<K, number>;
}

/** True when `value` holds something `optionalNumber` would write. */
export function isNumberText(value: string | undefined): boolean {
  const trimmed = value?.trim();
  if (!trimmed) return false;
  return Number.isFinite(Number(trimmed));
}

/** The same, for a flag that is only ever written when true. */
export function optionalFlag<K extends string>(
  field: K,
  value: boolean | undefined,
): Record<K, true> | Record<string, never> {
  return value ? ({ [field]: true } as Record<K, true>) : {};
}

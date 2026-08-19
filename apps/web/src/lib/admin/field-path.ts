/**
 * Turning a schema complaint into a sentence an Editor can act on.
 *
 * Two things reach for this: the Publish button's own check, which runs the
 * schema client-side and names the first problem before anything is sent, and
 * the server's reply when it refuses a document anyway. They have to phrase a
 * missing field the same way, or the same fault reads as two different faults
 * depending on which one caught it.
 *
 * What must never reach the screen is Zod's own wording. "Invalid input:
 * expected string, received undefined" at `announcements.2.title` is precise
 * and useless: it names a type, a path and a library, and none of the three is
 * something the person looking at the form can do anything with.
 */

/** The shape both Zod v4 issues and our own hand-made ones satisfy. */
export type FieldIssue = {
  code: string;
  path: readonly PropertyKey[];
  message: string;
  /** Only on `unrecognized_keys`: the field names the schema does not know. */
  keys?: readonly string[];
  /** Only on `invalid_value`: the choices the field does accept. */
  values?: readonly unknown[];
};

/** "researchAreas" → "Research areas", for a field with no hand-written label. */
export function sentence(field: string): string {
  const spaced = field.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Field names that come out as machine words when derived mechanically, and
 * mean the same thing wherever they appear — a `key` is a photograph in every
 * content file there is. Each one is the word the form itself prints above
 * that box, so the message and the screen agree.
 */
const STEP_LABELS: Record<string, string> = {
  key: "Photograph",
  file: "PDF",
  images: "Photos",
  id: "Address",
};

/** One step of a path, as the form names it. Rows count from one, as on screen. */
function describeStep(step: PropertyKey): string {
  if (typeof step === "number") return `item ${step + 1}`;
  const field = String(step);
  return STEP_LABELS[field] ?? sentence(field);
}

/**
 * "Curriculum › item 2 › PDF" — where in the form the problem is.
 *
 * Indexes are 1-based because the form numbers its rows that way; "item 0" is
 * a sentence only a programmer reads correctly.
 *
 * `labels` names the *top-level* fields of the document and is applied to the
 * first step only. Applying it at depth would rename every nested field that
 * happens to share a name with one of them — and `name` is a field on eight
 * different rows, which is how a missing coordinator's name came to be
 * reported as a missing "Department name".
 */
export function describeFieldPath(
  path: readonly PropertyKey[],
  labels: Record<string, string> = {},
  root = "This page",
): string {
  if (path.length === 0) return root;
  const [first, ...rest] = path;
  const head = labels[String(first)] ?? describeStep(first);
  return [head, ...rest.map(describeStep)].join(" › ");
}

/** The value the issue is about, or undefined if the path leads nowhere. */
export function valueAt(root: unknown, path: readonly PropertyKey[]): unknown {
  let value: unknown = root;
  for (const step of path) {
    if (value === null || typeof value !== "object") return undefined;
    value = (value as Record<PropertyKey, unknown>)[step];
  }
  return value;
}

const FILL_IN = "still needs to be filled in.";

/**
 * The value is there, but not in the shape the form works in — content written
 * before the field changed shape, which no amount of typing on this screen will
 * put right. Naming the administrator is the only useful instruction.
 */
const STALE = "is stored in an older form this screen cannot edit. Please tell the site administrator.";

/** Nothing has been typed into it yet, whatever kind of field it is. */
function isBlank(value: unknown): boolean {
  if (value === undefined || value === "") return true;
  if (Array.isArray(value)) return value.length === 0;
  if (value !== null && typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * The complaint as a sentence. Falls through to Zod's own message rather than
 * inventing one: a wrong guess about an unfamiliar fault is worse than a
 * clumsy sentence, and the fallback is at least English.
 */
export function describeIssue(issue: FieldIssue, document: unknown): string {
  const value = valueAt(document, issue.path);

  // A wrong *type* is never something an Editor did: every box on the form
  // writes the type its field asks for. What it means is old content in a
  // shape this screen was not built for.
  if (issue.code === "invalid_type") {
    return value === undefined ? FILL_IN : STALE;
  }
  // A field that accepts either a name or a whole row — an empty one is a row
  // waiting to be filled in, a full one that still fails is old content.
  if (issue.code === "invalid_union") {
    return isBlank(value) ? FILL_IN : STALE;
  }
  // A field with a fixed set of answers. The form draws these as a dropdown, so
  // the way to get here is content written before the list changed — but the
  // dropdown is also the fix, and naming the choices is what points at it.
  if (issue.code === "invalid_value") {
    const options = (issue.values ?? []).filter((option) => typeof option === "string");
    return options.length > 0 ? `has to be one of: ${options.join(", ")}.` : STALE;
  }
  if (issue.code === "too_small") {
    return typeof value === "string" || value === undefined ? FILL_IN : "needs at least one entry.";
  }
  if (issue.code === "invalid_format" || issue.code === "invalid_string") {
    return "does not look right — check it for typing mistakes.";
  }
  if (issue.code === "unrecognized_keys") {
    // The key names are the whole of what the administrator needs, and they are
    // the one thing the path cannot carry: an unrecognised key sits *in* the
    // document rather than at a place in it.
    const named = issue.keys?.length ? ` (${issue.keys.join(", ")})` : "";
    return `holds settings this form does not recognise${named}. Please tell the site administrator.`;
  }
  return issue.message;
}

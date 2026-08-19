import data from "@content/departments.json";
import { assetUrl, assetsUnder } from "@/lib/assets";
import { departmentsContentSchema, type DepartmentContent } from "./schema/departments";
import { parseContent } from "./schema/shared";

// The field-level shape (and per-field docs) live in ./schema/departments.ts —
// the single Zod contract this loader parses the JSON through at import time.
export type { CodedItem, DepartmentContent } from "./schema/departments";

/** Back-compat alias — the minimal shape older callers relied on. */
export type DepartmentMeta = Pick<DepartmentContent, "name" | "tagline" | "assetSlug">;

const departments: Record<string, DepartmentContent> = parseContent(
  "departments.json",
  departmentsContentSchema,
  data,
).departments;

/**
 * Every department the catalogue knows, in file order — the list the Admin's
 * department switchers are built from. Only the three fields a chooser needs,
 * so nothing pulls the 900 KB catalogue into a client bundle.
 */
export function listDepartments(): { key: string; name: string; assetSlug?: string }[] {
  return Object.entries(departments).map(([key, department]) => ({
    key,
    name: department.name,
    ...(department.assetSlug ? { assetSlug: department.assetSlug } : {}),
  }));
}

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
 * Resolve curriculum/syllabus documents to { title, url }, dropping any whose
 * file the manifest does not have. The old test — `asset(key)` then
 * `url.startsWith("http")` — passed for every key, because the fallback URL is
 * an https:// one too, so a broken link shipped as a working-looking download.
 * `pnpm build` refuses content that names a missing file, so in practice this
 * only fires between an upload and the manifest regeneration.
 */
export function resolveDocuments(
  docs?: { title: string; file: string }[],
): { title: string; url: string }[] {
  if (!docs?.length) return [];
  return docs.flatMap((doc) => {
    const url = assetUrl(doc.file);
    return url ? [{ title: doc.title, url }] : [];
  });
}

export function getDepartmentGallery(assetSlug?: string): string[] {
  if (!assetSlug) return [];
  // Scene/infrastructure photos only — exclude the faculty/, staff/ and alumni/
  // subtrees (portraits + CV PDFs), the docs/ subtree (document infographics
  // surfaced elsewhere), the curated gallery/ subtree (appended separately, in
  // order, at the end of the Photo Gallery) and any non-image assets.
  return assetsUnder(`departments/${assetSlug}/`).filter(
    (url) =>
      !url.includes("/faculty/") &&
      !url.includes("/staff/") &&
      !url.includes("/alumni/") &&
      !url.includes("/docs/") &&
      !url.includes("/gallery/") &&
      /\.(webp|jpe?g|png)$/i.test(url),
  );
}

/**
 * Curated department photos dropped into a `gallery/` subfolder on R2. Returned
 * in key order (name them zero-padded, e.g. g01.webp) and appended to the end of
 * the Photo Gallery section so authors control what shows and in what order.
 */
export function getDepartmentGalleryExtra(assetSlug?: string): string[] {
  if (!assetSlug) return [];
  return assetsUnder(`departments/${assetSlug}/gallery/`).filter((url) =>
    /\.(webp|jpe?g|png)$/i.test(url),
  );
}

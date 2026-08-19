/**
 * Turning a flat list of ~2,950 asset keys into something staff can navigate.
 *
 * Keys are paths ("departments/civil-engg/faculty/photo.webp") but nobody in the
 * office should have to read one. The picker shows folders and pictures; these
 * functions are the translation, kept pure so the browsing rules can be tested
 * without a browser.
 */

export type Folder = { name: string; prefix: string; count: number };

/** The folder a key sits in, with its trailing slash ("" for a root-level key). */
export function folderOf(key: string): string {
  const cut = key.lastIndexOf("/");
  return cut === -1 ? "" : key.slice(0, cut + 1);
}

/** The file name, without folders. */
export function fileNameOf(key: string): string {
  return key.slice(key.lastIndexOf("/") + 1);
}

/**
 * A readable label for a tile: "campus-front.webp" -> "Campus front". Keys are
 * minted by slugifying a real name, so undoing the slug gets most of it back.
 */
export function labelFor(key: string): string {
  const name = fileNameOf(key).replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim();
  if (!name) return fileNameOf(key);
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** A folder name for display: "civil-engg" -> "Civil engg". */
export function folderLabel(name: string): string {
  const words = name.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * The immediate subfolders of `prefix`, each carrying how many assets sit
 * anywhere beneath it — an editor picks a folder by how much is in it, not by
 * how many files happen to be at its top level.
 */
export function childFolders(keys: readonly string[], prefix: string): Folder[] {
  const counts = new Map<string, number>();
  for (const key of keys) {
    if (!key.startsWith(prefix)) continue;
    const rest = key.slice(prefix.length);
    const cut = rest.indexOf("/");
    if (cut === -1) continue;
    const name = rest.slice(0, cut);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, prefix: `${prefix}${name}/`, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** The assets directly inside `prefix`, not those in its subfolders. */
export function filesIn(keys: readonly string[], prefix: string): string[] {
  return keys.filter((key) => key.startsWith(prefix) && !key.slice(prefix.length).includes("/"));
}

/** Trail from the root to `prefix`, for the breadcrumb. */
export function breadcrumbs(prefix: string): Folder[] {
  const parts = prefix.split("/").filter(Boolean);
  const trail: Folder[] = [];
  let walked = "";
  for (const part of parts) {
    walked += `${part}/`;
    trail.push({ name: part, prefix: walked, count: 0 });
  }
  return trail;
}

/** The folder one level up from `prefix`, or null at the root. */
export function parentOf(prefix: string): string | null {
  if (!prefix) return null;
  const parts = prefix.split("/").filter(Boolean);
  parts.pop();
  return parts.length ? `${parts.join("/")}/` : "";
}

const MAX_RESULTS = 400;

/**
 * Search across every key, whatever folder it is in.
 *
 * Each whitespace-separated word must appear somewhere in the key, so "civil
 * hod" finds `departments/civil-engg/hod.webp` without the editor knowing the
 * folder layout. A file-name hit outranks a folder-name hit — someone typing
 * "principal" wants the photo called principal, not the 40 pictures filed under
 * a folder with "principal" in its path. Capped, because rendering 2,000 tiles
 * to say "your search was too broad" helps nobody.
 */
export function searchKeys(keys: readonly string[], query: string): string[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const hits: { key: string; score: number }[] = [];
  for (const key of keys) {
    const lower = key.toLowerCase();
    if (!words.every((word) => lower.includes(word))) continue;
    const name = fileNameOf(lower);
    const inName = words.filter((word) => name.includes(word)).length;
    hits.push({ key, score: inName });
  }

  hits.sort((a, b) => b.score - a.score || a.key.length - b.key.length || a.key.localeCompare(b.key));
  return hits.slice(0, MAX_RESULTS).map((hit) => hit.key);
}

export const SEARCH_RESULT_LIMIT = MAX_RESULTS;

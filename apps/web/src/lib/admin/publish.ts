import { z } from "zod";
import { contentFiles } from "@/content/schema";
import { invalidateAssetIndex, readAssetIndex } from "./asset-index.ts";
import {
  contentCommitMessage,
  mergeScopedEntry,
  resolveContentPath,
  scopedCollection,
  serializeContentFile,
} from "./content-file.ts";
import { describeFieldPath, describeIssue } from "./field-path.ts";
import {
  commitFiles,
  readRepoFile,
  type Commit,
  type CommitFile,
} from "./github.ts";
import {
  MANIFEST_REPO_PATH,
  manifestCommitFiles,
  unregisteredCandidates,
} from "./manifest-sync.ts";
import { invalidateReferences } from "./references.ts";
import { assetExists, isR2Configured } from "./r2.ts";

/**
 * Publishing a content file: read from repo HEAD, validate against the same Zod
 * schema the build enforces, commit to main. The validation is the point — an
 * Editor cannot save a document that would fail `next build`, so a Publish can
 * break the site's *content* but never its build.
 */

const ALLOWED_FILES = contentFiles.map((entry) => entry.file);

function schemaFor(file: string): z.ZodType | null {
  return contentFiles.find((entry) => entry.file === file)?.schema ?? null;
}

/** One problem, already phrased for an Editor — never Zod's own wording. */
export type ValidationIssue = { path: string; message: string };

export type PublishResult =
  | { ok: true; unchanged: false; commit: Commit }
  /** Submitted document is byte-identical to HEAD — nothing was committed. */
  | { ok: true; unchanged: true; commit: null }
  | { ok: false; error: string; issues?: ValidationIssue[] };

/**
 * Field-level errors, each naming where in the form it is and what to do —
 * "Announcements › item 3 › Title — still needs to be filled in." The screen
 * that caught this usually blocks the Publish button first; what gets here is
 * mostly the case it cannot see, where another part of the file was already
 * invalid before this Editor opened it.
 */
export function validationIssues(error: z.ZodError, document: unknown): ValidationIssue[] {
  return error.issues.map((issue) => ({
    path: describeFieldPath(issue.path),
    message: describeIssue(issue, document),
  }));
}

/** The file's current contents at repo HEAD — never the deployed bundle. */
export async function readContentFile(
  file: string,
): Promise<{ data: unknown; sha: string } | null> {
  const path = resolveContentPath(file, ALLOWED_FILES);
  if (!path) return null;
  const { text, sha } = await readRepoFile(path);
  return { data: JSON.parse(text) as unknown, sha };
}

export async function publishContentFile({
  file,
  data,
  editorName,
  scope,
}: {
  file: string;
  data: unknown;
  editorName: string;
  /**
   * Set when `data` is one entry of the file's map rather than the whole
   * document — the departments editor's unit of work. The rest of the file
   * comes from HEAD, so nothing an Editor never opened can be overwritten.
   */
  scope?: string;
}): Promise<PublishResult> {
  const path = resolveContentPath(file, ALLOWED_FILES);
  const schema = schemaFor(file);
  if (!path || !schema) {
    return { ok: false, error: `"${file}" is not an editable content file.` };
  }

  const current = await readRepoFile(path);

  let document = data;
  if (scope !== undefined) {
    const collection = scopedCollection(file);
    if (!collection) {
      return { ok: false, error: `"${file}" is published whole, not one entry at a time.` };
    }
    const merged = mergeScopedEntry({
      head: JSON.parse(current.text) as unknown,
      collection,
      key: scope,
      entry: data,
    });
    if (!merged.ok) return { ok: false, error: merged.error };
    document = merged.data;
  }

  const result = schema.safeParse(document);
  if (!result.success) {
    return {
      ok: false,
      error: "This could not be published yet. Please fix the following, then press Publish again.",
      issues: validationIssues(result.error, document),
    };
  }

  // Commit what was submitted, not Zod's parse output: the parse rebuilds
  // objects in *schema* key order, which would rewrite the whole file on every
  // save and bury the real change in the diff.
  const content = serializeContentFile(document);

  // Only the submitted entry can name an asset the manifest lacks; the rest of
  // a scoped document came from HEAD, which the build gate already checked.
  const assetFiles = await newlyReferencedAssetFiles(data);

  // Pressing Publish without having changed anything is common — an editor
  // opens a page to look at it. Committing that would put an empty commit in
  // the audit trail and spend a two-minute Vercel deploy saying nothing.
  if (current.text === content && assetFiles.length === 0) {
    return { ok: true, unchanged: true, commit: null };
  }

  const commit = await commitFiles(
    [{ path, content }, ...assetFiles],
    contentCommitMessage(file, editorName),
  );

  // The manifest just changed under the cache; leaving it would make the next
  // publish re-check keys it has already registered.
  if (assetFiles.length > 0) invalidateAssetIndex();

  // What the site points at changed too — and unlike the manifest, it changes
  // on *every* publish, including one that only moves an existing photo to a
  // new place. Leaving the cache would let the cleanup screen call that photo
  // unused for up to a minute, which is long enough for somebody to act on it.
  invalidateReferences();

  return { ok: true, unchanged: false, commit };
}

/**
 * The manifest and asset-keys files, rebuilt to include any uploaded key this
 * document now references (see `manifest-sync.ts` for why registration happens
 * here rather than at upload time). Empty when nothing new is referenced, which
 * is every publish that did not involve an upload.
 */
async function newlyReferencedAssetFiles(data: unknown): Promise<CommitFile[]> {
  // The cached index answers "is this key already known?" without a GitHub
  // round-trip. A stale cache can only produce a false *candidate*, which the
  // rebuild below then finds nothing to add for.
  const index = await readAssetIndex();
  const candidates = unregisteredCandidates(data, index.keys);
  if (candidates.length === 0) return [];

  // Without a bucket there is nothing to verify against, and an unverified key
  // in the manifest is a broken image on the live site.
  if (!isR2Configured()) return [];

  const checked = await Promise.all(
    candidates.map(async (key) => ((await assetExists(key)) ? key : null)),
  );
  const additions = checked.filter((key): key is string => key !== null);
  if (additions.length === 0) return [];

  const manifest = await readRepoFile(MANIFEST_REPO_PATH);
  return manifestCommitFiles({
    manifestText: manifest.text,
    baseUrl: index.base,
    additions,
  });
}

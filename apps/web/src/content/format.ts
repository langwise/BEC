/**
 * The one canonical on-disk format for content/*.json.
 *
 * It exists because a Publish is a git commit and the git history is
 * the audit trail: if the Admin wrote JSON in a different shape from what is
 * already committed, every save would reformat the whole file and bury the real
 * change. Both writers — the Admin's publish path and the `format-content`
 * script — go through here, and the build gate rejects drift.
 */

/** 2-space indent, LF, one trailing newline. */
export function serializeContentFile(data: unknown): string {
  return `${JSON.stringify(data, null, 2)}\n`;
}

/** True if `text` is already exactly what `serializeContentFile` would produce. */
export function isCanonicallyFormatted(text: string): boolean {
  try {
    return serializeContentFile(JSON.parse(text)) === text;
  } catch {
    return false;
  }
}

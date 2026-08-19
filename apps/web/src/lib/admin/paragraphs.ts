/**
 * Prose stored as an array of paragraphs, edited as one text box.
 *
 * The alternative — an add/remove list where each paragraph is its own field —
 * makes rewriting a two-paragraph blurb into three a structural operation
 * instead of a typing one. A blank line between paragraphs is a convention
 * every Editor already knows from writing anything at all, so that is the
 * convention here.
 */

/** Array → the text an Editor sees. */
export function paragraphsToText(paragraphs: readonly string[]): string {
  return paragraphs.join("\n\n");
}

/**
 * Text → the array that gets published. Runs of blank lines collapse to one
 * break and trailing whitespace goes, so an extra Enter at the end of typing
 * cannot publish an empty paragraph that renders as a gap on the site.
 */
export function textToParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

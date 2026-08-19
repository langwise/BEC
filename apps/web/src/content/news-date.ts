/**
 * A News/Announcement `date` is either an ISO calendar date or a free-text
 * period label ("A.Y. 2026-27", "2025-26 EVEN SEM"). One field rather than two,
 * because that is how the stream actually behaves: some entries are pegged to a
 * day, some to a term, and an editor should not have to know which field a
 * "2025-26 EVEN SEM" notice belongs in.
 */

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
] as const;

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isIsoDate(date: string): boolean {
  const match = ISO.exec(date);
  if (!match) return false;
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  // Reject 31 February and friends without trusting the local timezone.
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.getUTCDate() === day;
}

/**
 * "2026-06-12" -> "JUN 12, 2026"; a period label is returned untouched.
 *
 * Formatted by hand rather than through `Intl`/`Date`: the site renders on
 * whatever timezone the build machine has, and `new Date("2026-06-12")` in a
 * negative-offset zone would print the 11th.
 */
export function formatNewsDate(date: string): string {
  const match = ISO.exec(date);
  if (!match || !isIsoDate(date)) return date;
  return `${MONTHS[Number(match[2]) - 1]} ${match[3]}, ${match[1]}`;
}

/**
 * Newest first, for the editor's "sort by date" action.
 *
 * Period-labelled entries have no day to sort on, so they keep their relative
 * order and stay at the top — they are the evergreen notices ("Admissions open
 * now") that an editor put there deliberately.
 */
export function sortByDateDesc<T extends { date: string }>(items: readonly T[]): T[] {
  const labelled = items.filter((item) => !isIsoDate(item.date));
  const dated = items
    .filter((item) => isIsoDate(item.date))
    .sort((a, b) => b.date.localeCompare(a.date));
  return [...labelled, ...dated];
}

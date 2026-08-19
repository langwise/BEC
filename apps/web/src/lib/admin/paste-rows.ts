/**
 * Turning a block pasted out of a spreadsheet into table rows.
 *
 * The placement office does not hand over a form — it hands over a sheet with
 * 130 students on it. Typing that in, five boxes at a time, is not a job
 * anybody would do, so the editor takes the paste directly. Copying out of
 * Excel or Google Sheets puts tab-separated text on the clipboard; a file
 * saved as CSV arrives comma-separated, and either can quote a cell that
 * contains the delimiter, so both are parsed properly rather than split.
 */

export type ParsedPaste<T> = {
  rows: T[];
  /** True when the first line was the sheet's own header and was dropped. */
  skippedHeader: boolean;
  /** Cells past the last column, which had nowhere to go. */
  droppedCells: number;
};

/** Split one line, honouring "quoted, cells" and "" as an escaped quote. */
export function splitLine(line: string, delimiter: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quoted) {
      if (char !== '"') cell += char;
      else if (line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === delimiter) {
      cells.push(cell);
      cell = "";
    } else cell += char;
  }
  cells.push(cell);
  return cells.map((value) => value.trim());
}

/** Tabs if the text has any, commas otherwise — what each source produces. */
function delimiterOf(text: string): string {
  return text.includes("\t") ? "\t" : ",";
}

/**
 * `text` as rows of `columns`, in column order. A cell the paste does not
 * reach stays empty rather than shifting the row along, so a sheet missing its
 * last column still lands under the right headings.
 */
export function parsePastedRows<T extends object>(
  text: string,
  columns: readonly { field: keyof T; label: string }[],
  blank: () => T,
): ParsedPaste<T> {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return { rows: [], skippedHeader: false, droppedCells: 0 };

  const delimiter = delimiterOf(text);
  const split = lines.map((line) => splitLine(line, delimiter));

  // A sheet copied with its header row would otherwise become a row reading
  // "Student / USN / Mode" — recognisable, so it is dropped instead.
  const skippedHeader = looksLikeHeader(split[0], columns);
  const body = skippedHeader ? split.slice(1) : split;

  let droppedCells = 0;
  const rows = body.map((cells) => {
    const row = blank();
    columns.forEach((column, index) => {
      const value = cells[index];
      if (value !== undefined) (row as Record<string, unknown>)[column.field as string] = value;
    });
    droppedCells += Math.max(0, cells.length - columns.length);
    return row;
  });

  return { rows, skippedHeader, droppedCells };
}

/**
 * The same block, for a table whose columns are content rather than a fixed
 * spec — the free-form tables a department writes its own headings for. The
 * first line is taken as those headings, and every row is padded or trimmed to
 * their count so the grid stays rectangular.
 */
export function parsePastedGrid(text: string): { columns: string[]; rows: string[][] } {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return { columns: [], rows: [] };

  const delimiter = delimiterOf(text);
  const [header, ...body] = lines.map((line) => splitLine(line, delimiter));
  const width = Math.max(header.length, ...body.map((cells) => cells.length), 1);
  const columns = Array.from({ length: width }, (_, i) => header[i] ?? "");
  const rows = body.map((cells) => Array.from({ length: width }, (_, i) => cells[i] ?? ""));
  return { columns, rows };
}

function looksLikeHeader<T>(
  cells: readonly string[],
  columns: readonly { field: keyof T; label: string }[],
): boolean {
  if (cells.length === 0) return false;
  const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const labels = new Set(columns.map((column) => normalise(column.label)));
  const fields = new Set(columns.map((column) => normalise(String(column.field))));
  const matches = cells.filter(
    (cell) => labels.has(normalise(cell)) || fields.has(normalise(cell)),
  ).length;
  // Half is enough: sheets rename columns ("Company Name" for "Company") but
  // never rename all of them, and no row of data matches even one heading.
  return matches * 2 >= cells.length && matches > 0;
}

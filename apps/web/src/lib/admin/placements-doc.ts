import type { PlacementsContent } from "../../content/schema/placements.ts";
import {
  inOrderOf,
  isNumberText,
  optional,
  optionalNumber,
  withKeys,
  type Keyed,
} from "./rows.ts";

/**
 * `content/placements.json` ⇄ the shape the placements editor works in.
 *
 * Two things make this file different from the others. The year-wise table
 * holds its figures as **strings** — "72.55", "2023-2024" — because they are
 * printed, not computed, while the chart holds its bars as **numbers**,
 * because they are plotted. And which columns a department fills in varies:
 * MBA publishes four, CSE publishes eight, and the site drops the empty ones.
 * So every figure is text in the editor, and the conversion back is where the
 * distinction is re-applied.
 */

export type YearRow = {
  year: string;
  students: string;
  offers: string;
  onCampus: string;
  offCampus: string;
  placed: string;
  percent: string;
  companies: string;
};

export type CompanyRow = { company: string; package: string; count: string };

export type StudentRow = {
  name: string;
  usn: string;
  mode: string;
  company: string;
  lpa: string;
};

export type BatchRow = {
  batch: string;
  companies: Keyed<CompanyRow>[];
  students: Keyed<StudentRow>[];
};

/** Chart figures are numbers in the file but text here — see the note above. */
export type PointRow = {
  year: string;
  offers: string;
  note: string;
  students: string;
  placed: string;
  higherStudy: string;
  order: string[];
};

export type ChartState = {
  title: string;
  yAxisLabel: string;
  points: Keyed<PointRow>[];
};

export type DepartmentRow = {
  /** The content key this record is joined to a department by. Not editable. */
  department: string;
  yearWise: Keyed<YearRow>[];
  /**
   * `null` when the file has no `batches` key at all, as against an empty
   * array, which three departments do have. Publishing must not invent the key
   * for the one department without it, nor delete it from the three with it.
   */
  batches: Keyed<BatchRow>[] | null;
  chart: ChartState | null;
  /** Key order of this department's object — two files disagree on it. */
  order: string[];
};

export type PlacementsState = { departments: Keyed<DepartmentRow>[] };

/** The column headings the site prints, so the editor says the same words. */
export const YEAR_COLUMNS: { field: keyof YearRow; label: string; hint?: string }[] = [
  { field: "year", label: "Year" },
  { field: "students", label: "Students" },
  { field: "offers", label: "Offers" },
  { field: "onCampus", label: "On-Campus" },
  { field: "offCampus", label: "Off-Campus" },
  { field: "placed", label: "Placed" },
  { field: "percent", label: "Placement %", hint: "Just the number — the % sign is added." },
  { field: "companies", label: "Companies" },
];

export const COMPANY_COLUMNS: { field: keyof CompanyRow; label: string }[] = [
  { field: "company", label: "Company" },
  { field: "package", label: "Package (LPA)" },
  { field: "count", label: "Students Placed" },
];

export const STUDENT_COLUMNS: { field: keyof StudentRow; label: string }[] = [
  { field: "name", label: "Student" },
  { field: "usn", label: "USN" },
  { field: "mode", label: "Mode" },
  { field: "company", label: "Company" },
  { field: "lpa", label: "LPA" },
];

export const POINT_COLUMNS: { field: keyof PointRow; label: string }[] = [
  { field: "year", label: "Year" },
  { field: "students", label: "Students" },
  { field: "placed", label: "Placed" },
  { field: "offers", label: "Offers" },
  { field: "higherStudy", label: "Higher study" },
  { field: "note", label: "Note" },
];

/** The point fields that are plotted, and so must parse as numbers. */
const POINT_NUMBERS = ["offers", "students", "placed", "higherStudy"] as const;

type Record_ = PlacementsContent["departments"][string];

function toYearRow(year: Record_["yearWise"][number]): YearRow {
  return {
    year: year.year,
    students: year.students ?? "",
    offers: year.offers ?? "",
    onCampus: year.onCampus ?? "",
    offCampus: year.offCampus ?? "",
    placed: year.placed ?? "",
    percent: year.percent ?? "",
    companies: year.companies ?? "",
  };
}

function fromYearRow(row: YearRow): Record_["yearWise"][number] {
  return {
    year: row.year.trim(),
    ...optional("students", row.students),
    ...optional("offers", row.offers),
    ...optional("onCampus", row.onCampus),
    ...optional("offCampus", row.offCampus),
    ...optional("placed", row.placed),
    ...optional("percent", row.percent),
    ...optional("companies", row.companies),
  };
}

function text(value: number | undefined): string {
  return value === undefined ? "" : String(value);
}

function toPointRow(point: NonNullable<Record_["offersChart"]>["points"][number]): PointRow {
  return {
    year: point.year,
    offers: text(point.offers),
    note: point.note ?? "",
    students: text(point.students),
    placed: text(point.placed),
    higherStudy: text(point.higherStudy),
    order: Object.keys(point),
  };
}

function fromPointRow(row: PointRow): NonNullable<Record_["offersChart"]>["points"][number] {
  const built = {
    year: row.year.trim(),
    ...optionalNumber("offers", row.offers),
    ...optional("note", row.note),
    ...optionalNumber("students", row.students),
    ...optionalNumber("placed", row.placed),
    ...optionalNumber("higherStudy", row.higherStudy),
  };
  return inOrderOf(built, row.order);
}

export function toState(content: PlacementsContent): PlacementsState {
  return {
    departments: withKeys(
      Object.entries(content.departments).map(([department, record]) => ({
        department,
        yearWise: withKeys(record.yearWise.map(toYearRow)),
        batches: record.batches
          ? withKeys(
              record.batches.map((batch) => ({
                batch: batch.batch,
                companies: withKeys(batch.companies.map((company) => ({ ...company }))),
                students: withKeys(batch.students.map((student) => ({ ...student }))),
              })),
            )
          : null,
        chart: record.offersChart
          ? {
              title: record.offersChart.title ?? "",
              yAxisLabel: record.offersChart.yAxisLabel ?? "",
              points: withKeys(record.offersChart.points.map(toPointRow)),
            }
          : null,
        order: Object.keys(record),
      })),
    ),
  };
}

export function toDocument(
  state: PlacementsState,
  content: PlacementsContent,
): PlacementsContent {
  const departments: PlacementsContent["departments"] = {};
  for (const row of state.departments) {
    const built = {
      yearWise: row.yearWise.map(fromYearRow),
      ...(row.batches
        ? {
            batches: row.batches.map((batch) => ({
              batch: batch.batch.trim(),
              companies: batch.companies.map((company) => ({
                company: company.company.trim(),
                package: company.package.trim(),
                count: company.count.trim(),
              })),
              students: batch.students.map((student) => ({
                name: student.name.trim(),
                usn: student.usn.trim(),
                mode: student.mode.trim(),
                company: student.company.trim(),
                lpa: student.lpa.trim(),
              })),
            })),
          }
        : {}),
      ...(row.chart
        ? {
            offersChart: {
              ...optional("title", row.chart.title),
              ...optional("yAxisLabel", row.chart.yAxisLabel),
              points: row.chart.points.map(fromPointRow),
            },
          }
        : {}),
    };
    departments[row.department] = inOrderOf(built, row.order);
  }
  return {
    ...(content.$schema ? { $schema: content.$schema } : {}),
    departments,
  };
}

export function newYear(): YearRow {
  return {
    year: "",
    students: "",
    offers: "",
    onCampus: "",
    offCampus: "",
    placed: "",
    percent: "",
    companies: "",
  };
}

export function newCompany(): CompanyRow {
  return { company: "", package: "", count: "" };
}

export function newStudent(): StudentRow {
  return { name: "", usn: "", mode: "", company: "", lpa: "" };
}

export function newBatch(): BatchRow {
  return { batch: "", companies: [], students: [] };
}

export function newPoint(): PointRow {
  return { year: "", offers: "", note: "", students: "", placed: "", higherStudy: "", order: [] };
}

export function newChart(): ChartState {
  return { title: "", yAxisLabel: "", points: [] };
}

export function newDepartment(department: string): DepartmentRow {
  // No `batches` and no chart: a department starts with the summary table
  // alone, and the Editor turns on the parts it actually publishes.
  return { department, yearWise: [], batches: null, chart: null, order: [] };
}

/** Which field still needs fixing, phrased for the Editor, or undefined. */
export function firstProblem(
  state: PlacementsState,
  name: (key: string) => string,
): string | undefined {
  for (const department of state.departments) {
    const where = name(department.department);

    const year = department.yearWise.findIndex((row) => !row.year.trim());
    if (year >= 0) return `${where}: row ${year + 1} of the summary table needs a year.`;

    for (const [index, batch] of (department.batches ?? []).entries()) {
      if (!batch.batch.trim()) return `${where}: batch ${index + 1} needs a name.`;
      const company = batch.companies.findIndex((row) => !row.company.trim());
      if (company >= 0) {
        return `${where}, ${batch.batch}: recruiter ${company + 1} needs a company name.`;
      }
      const student = batch.students.findIndex((row) => !row.name.trim());
      if (student >= 0) {
        return `${where}, ${batch.batch}: student ${student + 1} needs a name.`;
      }
    }

    if (department.chart) {
      for (const [index, point] of department.chart.points.entries()) {
        if (!point.year.trim()) return `${where}: chart bar ${index + 1} needs a year.`;
        for (const field of POINT_NUMBERS) {
          const value = point[field];
          if (value.trim() && !isNumberText(value)) {
            // A typo here would be dropped silently by the builder, so the
            // publish is blocked until it reads as a number.
            return `${where}: “${value}” in chart bar ${index + 1} is not a number.`;
          }
        }
      }
    }
  }
  return undefined;
}

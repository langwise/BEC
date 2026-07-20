import data from "@content/placements.json";

/** Year-wise placement summary row (matches the college's own status table). */
export type PlacementYear = {
  year: string;
  students?: string;
  offers?: string;
  onCampus?: string;
  offCampus?: string;
  placed?: string;
  percent?: string;
  companies?: string;
};

export type PlacementCompany = { company: string; package: string; count: string };

export type PlacementStudent = {
  name: string;
  usn: string;
  mode: string;
  company: string;
  lpa: string;
};

export type PlacementBatch = {
  batch: string;
  companies: PlacementCompany[];
  students: PlacementStudent[];
};

/** A single bar in the placement-offers chart. */
export type PlacementOffersPoint = {
  year: string;
  offers?: number;
  note?: string;
  students?: number;
  placed?: number;
  higherStudy?: number;
};

/** Year-wise placement-offers bar chart (department's own published figures). */
export type PlacementOffersChart = {
  title?: string;
  yAxisLabel?: string;
  points: PlacementOffersPoint[];
};

export type DepartmentPlacements = {
  yearWise: PlacementYear[];
  /** Per-batch recruiter/student detail. Omitted for departments that publish only the year-wise percentages. */
  batches?: PlacementBatch[];
  offersChart?: PlacementOffersChart;
};

const byDepartment = data.departments as Record<string, DepartmentPlacements>;

/** Placement record for a department by its content key, or undefined if none. */
export function getDepartmentPlacements(key: string): DepartmentPlacements | undefined {
  return byDepartment[key];
}

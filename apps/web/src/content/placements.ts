import data from "@content/placements.json";
import type { PlacementsContent } from "./schema/placements";

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

// Cast, not parse — see the note in home.ts (this module reaches client chunks
// via placement-offers-chart.tsx).
const byDepartment: Record<string, DepartmentPlacements> = (data as PlacementsContent)
  .departments;

/** Placement record for a department by its content key, or undefined if none. */
export function getDepartmentPlacements(key: string): DepartmentPlacements | undefined {
  return byDepartment[key];
}

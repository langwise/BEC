import { z } from "zod";

/** Year-wise placement summary row (matches the college's own status table). */
const placementYear = z.strictObject({
  year: z.string(),
  students: z.string().optional(),
  offers: z.string().optional(),
  onCampus: z.string().optional(),
  offCampus: z.string().optional(),
  placed: z.string().optional(),
  percent: z.string().optional(),
  companies: z.string().optional(),
});

const placementCompany = z.strictObject({
  company: z.string(),
  package: z.string(),
  count: z.string(),
});

const placementStudent = z.strictObject({
  name: z.string(),
  usn: z.string(),
  mode: z.string(),
  company: z.string(),
  lpa: z.string(),
});

const placementBatch = z.strictObject({
  batch: z.string(),
  companies: z.array(placementCompany),
  students: z.array(placementStudent),
});

/** A single bar in the placement-offers chart. */
const placementOffersPoint = z.strictObject({
  year: z.string(),
  offers: z.number().optional(),
  note: z.string().optional(),
  students: z.number().optional(),
  placed: z.number().optional(),
  higherStudy: z.number().optional(),
});

/** Year-wise placement-offers bar chart (department's own published figures). */
const placementOffersChart = z.strictObject({
  title: z.string().optional(),
  yAxisLabel: z.string().optional(),
  points: z.array(placementOffersPoint),
});

export const departmentPlacementsSchema = z.strictObject({
  yearWise: z.array(placementYear),
  batches: z
    .array(placementBatch)
    .optional()
    .describe(
      "Per-batch recruiter/student detail. Omitted for departments that publish only the year-wise percentages.",
    ),
  offersChart: placementOffersChart.optional(),
});

/** Schema for content/placements.json — per-department placement records keyed by content key. */
export const placementsContentSchema = z.strictObject({
  $schema: z.string().optional(),
  departments: z
    .record(z.string(), departmentPlacementsSchema)
    .describe("Map of department content key -> placement record."),
});

export type PlacementsContent = z.infer<typeof placementsContentSchema>;

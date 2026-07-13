// Source: BEC Training & Placement Cell statistics sheets (handoff 12-07-2026,
// .../Placements/becplacements — Statistics_1/2/3 + Staistics_4).
// Statistics_1: No. of Placement Offers vs Year (2016–2026).
// Statistics_2: 2026 Batch — Students vs Department.
// Statistics_3: 2025 Batch — Students vs Department.
// Staistics_4: 2024 Batch — Students vs Department.

export type OffersPerYear = { year: string; offers: number };

export const offersPerYear: OffersPerYear[] = [
  { year: "2016", offers: 347 },
  { year: "2017", offers: 275 },
  { year: "2018", offers: 365 },
  { year: "2019", offers: 268 },
  { year: "2020", offers: 207 },
  { year: "2021", offers: 337 },
  { year: "2022", offers: 811 },
  { year: "2023", offers: 422 },
  { year: "2024", offers: 455 },
  { year: "2025", offers: 442 },
  { year: "2026", offers: 450 },
];

export type DepartmentRow = {
  department: string;
  eligible: number;
  placed: number;
  offers: number;
};

export type BatchStats = {
  batch: string;
  totals: { eligible: number; placed: number; offers: number };
  rows: DepartmentRow[];
};

export const batch2026: BatchStats = {
  batch: "2026",
  totals: { eligible: 670, placed: 332, offers: 450 },
  rows: [
    { department: "EC", eligible: 121, placed: 60, offers: 87 },
    { department: "CS", eligible: 116, placed: 65, offers: 99 },
    { department: "IS", eligible: 110, placed: 50, offers: 70 },
    { department: "AIML", eligible: 52, placed: 22, offers: 31 },
    { department: "ME", eligible: 49, placed: 32, offers: 40 },
    { department: "EE", eligible: 55, placed: 30, offers: 44 },
    { department: "BT", eligible: 13, placed: 0, offers: 0 },
    { department: "CV", eligible: 79, placed: 41, offers: 47 },
    { department: "MCA", eligible: 39, placed: 3, offers: 3 },
    { department: "MBA", eligible: 36, placed: 29, offers: 29 },
  ],
};

export const batch2025: BatchStats = {
  batch: "2025",
  totals: { eligible: 494, placed: 250, offers: 442 },
  rows: [
    { department: "EC", eligible: 95, placed: 53, offers: 84 },
    { department: "CS", eligible: 99, placed: 73, offers: 154 },
    { department: "IS", eligible: 69, placed: 49, offers: 105 },
    { department: "AIML", eligible: 40, placed: 27, offers: 44 },
    { department: "ME", eligible: 34, placed: 7, offers: 9 },
    { department: "EE", eligible: 31, placed: 18, offers: 23 },
    { department: "IP", eligible: 2, placed: 0, offers: 0 },
    { department: "BT", eligible: 17, placed: 1, offers: 1 },
    { department: "CV", eligible: 55, placed: 18, offers: 18 },
    { department: "MCA", eligible: 52, placed: 4, offers: 4 },
  ],
};

export const batch2024: BatchStats = {
  batch: "2024",
  totals: { eligible: 475, placed: 303, offers: 455 },
  rows: [
    { department: "EC", eligible: 83, placed: 57, offers: 71 },
    { department: "CS", eligible: 77, placed: 64, offers: 124 },
    { department: "IS", eligible: 63, placed: 47, offers: 69 },
    { department: "AIML", eligible: 28, placed: 16, offers: 22 },
    { department: "ME", eligible: 33, placed: 21, offers: 30 },
    { department: "EE", eligible: 46, placed: 34, offers: 56 },
    { department: "EI", eligible: 9, placed: 9, offers: 21 },
    { department: "IP", eligible: 4, placed: 4, offers: 4 },
    { department: "BT", eligible: 16, placed: 0, offers: 0 },
    { department: "AU", eligible: 3, placed: 3, offers: 4 },
    { department: "CV", eligible: 78, placed: 46, offers: 52 },
    { department: "MBA", eligible: 35, placed: 2, offers: 2 },
  ],
};

export const SERIES = {
  eligible: { key: "eligible", label: "Eligible Students", color: "#2F80ED" },
  placed: { key: "placed", label: "Students Placed", color: "#15A34A" },
  offers: { key: "offers", label: "Placement Offers", color: "#E8850E" },
} as const;

// Single source of truth for the department directory — consumed by both the
// /departments listing page and the navbar dropdown so the two never drift.

export type DepartmentType = "ug" | "regular" | "pg";

export interface DepartmentEntry {
  name: string;
  /** URL slug — the path segment used after the type, i.e. /departments/<type>/<slug>. */
  slug: string;
}

export interface DepartmentCategory {
  key: DepartmentType;
  /** Section heading on the listing page. */
  title: string;
  /** Shorter label used for the navbar dropdown group. */
  navLabel: string;
  departments: DepartmentEntry[];
}

export const departmentCategories: DepartmentCategory[] = [
  {
    key: "ug",
    title: "Undergraduate Programs (UG)",
    navLabel: "Undergraduate (UG)",
    departments: [
      { name: "AI & ML", slug: "ai-and-ml" },
      { name: "Automobile Engg.", slug: "automobile-engg" },
      { name: "Biotechnology", slug: "biotechnology" },
      { name: "Civil Engg.", slug: "civil-engg" },
      { name: "Computer Science & Engg.", slug: "computer-science-and-engg" },
      { name: "Electrical & Electronics Engg.", slug: "electrical-and-electronics-engg" },
      { name: "Electronics & Communication Engg.", slug: "electronics-and-communication-engg" },
      { name: "Electronics & Computer Engg.", slug: "electronics-and-computer-engg" },
      { name: "Industrial & Production Engg.", slug: "industrial-and-production-engg" },
      { name: "Information Science & Engg.", slug: "information-science-and-engg" },
      { name: "Mechanical Engg.", slug: "mechanical-engg" },
    ],
  },
  {
    key: "regular",
    title: "Science & Humanities",
    navLabel: "Science & Humanities",
    departments: [
      { name: "Physics", slug: "physics" },
      { name: "Chemistry", slug: "chemistry" },
      { name: "Mathematics", slug: "mathematics" },
      { name: "Humanities", slug: "humanities" },
    ],
  },
  {
    key: "pg",
    title: "Postgraduate Programs (PG)",
    navLabel: "Postgraduate (PG)",
    departments: [
      { name: "Food Biotechnology", slug: "biotechnology" },
      { name: "Digital Communication Engineering", slug: "electronics-and-communication-engg" },
      { name: "Energy Science and Technology", slug: "electrical-and-electronics-engg" },
      { name: "Computer Science & Engineering", slug: "computer-science-and-engg" },
      // { name: "Environmental Engg.", slug: "environmental-engg" },
      // { name: "Geo-Technical Engg.", slug: "geo-technical-engg" },
      { name: "Structural Engg.", slug: "structural-engg" },
      // { name: "Machine Design", slug: "machine-design" },
      { name: "MCA", slug: "mca" },
      { name: "MBA", slug: "mba" },
    ],
  },
];

/** Canonical URL for a department detail page. */
export function departmentHref(type: DepartmentType, slug: string): string {
  return `/departments/${type}/${slug}`;
}

export const totalDepartments = departmentCategories.reduce(
  (sum, category) => sum + category.departments.length,
  0,
);

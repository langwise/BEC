export type OrgChartLevel = {
  title: string;
  description?: string;
  nodes: string[];
};

export const orgChartLevels: OrgChartLevel[] = [
  {
    title: "B.V.V. Sangha",
    description: "Management trust providing overall governance and vision.",
    nodes: ["Board of Management (B.V.V. Sangha)"],
  },
  {
    title: "Board of Governors",
    description:
      "Statutory body overseeing strategy, compliance, and academic excellence.",
    nodes: ["Chairman & BoG members", "Government / VTU / UGC nominees"],
  },
  {
    title: "Principal / Member Secretary",
    description: "Executes BoG decisions and leads institutional operations.",
    nodes: ["Principal & Member Secretary"],
  },
  {
    title: "Deans & Key Officers",
    description:
      "Academic, research, quality, placement, and administration leadership.",
    nodes: [
      "Development Officer (Prof. B. S. Haravi)",
      "Dean Academic (Dr. P. N. Kulkarni)",
      "Dean R&D and ICT (Dr. Mahabaleshwar S. K.)",
      "Dean Career Guidance & Placement (Dr. S. G. Kambalimath)",
      "Dean Student Welfare",
      "Controller of Examinations (Dr. K. Chandrasekhar)",
    ],
  },
  {
    title: "Heads of Departments & Cells",
    description:
      "HODs for UG/PG programmes and coordinators for IQAC, TEQIP, and other cells.",
    nodes: ["Department HODs", "Quality and statutory cells"],
  },
];

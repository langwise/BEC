// Source-verified placement figures.
// - Median package & students placed: NIRF 2025 data (529 UG + 35 PG placed;
//   median B.Tech package ₹4.0 LPA).
// - Recruiters: BEC's official "Esteemed Recruiters" sheet (becbgk.edu/Placement).
// - MoUs: becbgk.edu/Placement/Placement_MOUS.html (13 listed).
export const placementStats = [
  { value: "₹4.0 LPA", label: "Median Package" },
  { value: "564", label: "Students Placed (2025)" },
  { value: "60+", label: "Recruiters" },
  { value: "13", label: "Industry MoUs" },
];

// Names from BEC's official "Esteemed Recruiters" sheet. The sheet itself is
// rendered as one optimized image (recruiters-sheet.webp); this list backs the
// accessible, screen-reader/SEO text alternative.
export const topRecruiters = [
  "Accenture",
  "Accolite Digital",
  "Amazon",
  "BFL",
  "Bitwise",
  "Bosch",
  "Brainstorm Infotech",
  "Brigosha Technologies",
  "Brillio",
  "Broadridge",
  "BYJU'S",
  "Capgemini",
  "Chegg",
  "CitiusTech",
  "Clarivate Analytics",
  "Coditas",
  "Cognizant",
  "Deevia",
  "Digicomm Semiconductor",
  "Fibro India",
  "Glassbeam",
  "HCL",
  "Hexaview",
  "Hexaware",
  "IBM",
  "Infosys",
  "Insemi",
  "JSW",
  "Karmic",
  "Mindtree",
  "Mistral Solutions",
  "Morgan Stanley",
  "Mphasis",
  "MSys Technologies",
  "Mukand Sumi",
  "Park Controls & Communications",
  "Pentagon Space",
  "Persistent",
  "Pin Click",
  "ProductSpace",
  "Pluribus Networks",
  "Redbot",
  "Quest Global",
  "Sasken",
  "Secpod",
  "Skolar",
  "Square Yards",
  "Synchrony",
  "Tata Elxsi",
  "TCS",
  "Tech Mahindra",
  "Technologics",
  "Toyota",
  "Vayavya Labs",
  "Vodafone",
  "Vrize",
  "Wipro",
  "Zensar",
];

export const recruitersSheet = {
  src: "placements/recruiters-sheet.webp",
  width: 1600,
  height: 811,
};

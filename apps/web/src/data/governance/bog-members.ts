export type BogMemberCategory =
  | "chair"
  | "sangha"
  | "nominee"
  | "industry"
  | "academia"
  | "faculty"
  | "invitee"
  | "government"
  | "member-secretary"
  | "students";

export type BogMember = {
  name: string;
  role: string;
  affiliation: string;
  category: BogMemberCategory;
};

export const bogLastUpdated =
  "Based on becbgk.edu/BOG Members (retrieved Dec 7, 2025)";

export const bogMembers: BogMember[] = [
  {
    name: "Prof. S. R. Gudisagar",
    role: "Chairman",
    affiliation: "Development Officer, B.V.V Sangha",
    category: "chair",
  },
  {
    name: "Prof. N. G. Karur",
    role: "Member",
    affiliation: "Administrative Officer, B.V.V Sangha",
    category: "sangha",
  },
  {
    name: "Sri. Shivaram G. Hegade",
    role: "Member",
    affiliation: "Chartered Accountant",
    category: "industry",
  },
  {
    name: "Dr. B. R. Srinivasmurthy",
    role: "Member",
    affiliation: "Emeritus Professor, IISc Bangalore",
    category: "academia",
  },
  {
    name: "Dr. Krishna Venkatesh",
    role: "Member",
    affiliation: "VTU Nominee",
    category: "nominee",
  },
  {
    name: "Prof. ShyamSundar Patnaik",
    role: "Member",
    affiliation: "UGC Nominee",
    category: "nominee",
  },
  {
    name: "Dr. L. S. Ganesh",
    role: "Invitee",
    affiliation: "Professor, DMS, IIT Madras Chennai",
    category: "invitee",
  },
  {
    name: "Dr. V. B. Pagi",
    role: "Member",
    affiliation: "Professor, Department of Computer Science Engineering, BEC",
    category: "faculty",
  },
  {
    name: "Dr. C. M. Veerendrakumar",
    role: "Member",
    affiliation: "Associate Professor, Department of Automobile Engineering, BEC",
    category: "faculty",
  },
  {
    name: "Prof. T. G. Seetharam",
    role: "Invitee",
    affiliation: "Director, IIT Guwahati",
    category: "invitee",
  },
  {
    name: "DTE State Govt., Govt. of Karnataka, Bangalore",
    role: "Member",
    affiliation: "Directorate of Technical Education Nominee",
    category: "government",
  },
  {
    name: "Dr. B. R. Hiremath",
    role: "Ex-officio Member Secretary",
    affiliation: "Principal, Basaveshwar Engineering College, Bagalkot",
    category: "member-secretary",
  },
  {
    name: "M. Tech. Students – 2 Nos.",
    role: "Invitee",
    affiliation: "Postgraduate student representatives",
    category: "students",
  },
  {
    name: "B.E. Students – 2 Nos.",
    role: "Invitee",
    affiliation: "Undergraduate student representatives",
    category: "students",
  },
];

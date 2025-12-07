export type SenateMember = {
  name?: string;
  role?: string;
  affiliation?: string;
  category?: "chair" | "member" | "nominee" | "invitee" | "ex-officio";
  placeholder?: boolean;
};

export const senateLastUpdated =
  "Senate composition to be updated from official source";

export const senateMembers: SenateMember[] = [
  {
    role: "Chairman",
    placeholder: true,
  },
  {
    role: "Member Secretary",
    placeholder: true,
  },
  {
    role: "External Nominee",
    placeholder: true,
  },
  {
    role: "Faculty Representative",
    placeholder: true,
  },
  {
    role: "Industry Representative",
    placeholder: true,
  },
  {
    role: "UG Student Representative",
    placeholder: true,
  },
  {
    role: "PG Student Representative",
    placeholder: true,
  },
];

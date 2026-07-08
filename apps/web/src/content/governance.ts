import data from "@content/governance.json";
import { asset } from "@/lib/assets";

export type Person = {
  name?: string;
  role: string;
  photo?: string;
  email?: string;
  phone?: string;
  focus?: string;
  placeholder?: boolean;
  verify?: boolean;
};

export type Principal = {
  name: string;
  role: string;
  photo: string;
  email?: string;
};

export type Hod = {
  department: string;
  name?: string;
  title?: string;
  photo?: string;
  email?: string;
  placeholder?: boolean;
};

export type BogCategory =
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
  category: BogCategory;
  photo?: string;
};

export type SanghaChairman = {
  name: string;
  role: string;
  photo: string;
  messageHref?: string;
};

export type SanghaCouncilMember = {
  name: string;
  role: string;
  invitee?: boolean;
};

export type SanghaMember = {
  name: string;
  role: string;
  photo?: string;
};

export type Sangha = {
  intro?: string;
  groupPhoto: string;
  chairman: SanghaChairman;
  members: SanghaMember[];
  council: SanghaCouncilMember[];
};

/** Resolve an optional asset key to its public URL, or undefined if absent. */
function photo(key?: string): string | undefined {
  return key ? asset(key) : undefined;
}

export const principal: Principal = {
  name: data.principal.name,
  role: data.principal.role,
  photo: asset(data.principal.photo),
  email: data.principal.email,
};

export const deans: Person[] = data.deans.map((dean) => ({
  ...dean,
  photo: photo("photo" in dean ? dean.photo : undefined),
}));

export const officers: Person[] = data.officers.map((officer) => ({
  ...officer,
  photo: photo(officer.photo),
}));

export const hods: Hod[] = data.hods.map((hod) => ({
  ...hod,
  photo: photo(hod.photo),
}));

export const bogMembers: BogMember[] = (
  data.bog as { name: string; role: string; affiliation: string; category: string; photo?: string }[]
).map((member) => ({
  name: member.name,
  role: member.role,
  affiliation: member.affiliation,
  category: member.category as BogCategory,
  photo: photo(member.photo),
}));

export const sangha: Sangha = {
  intro: data.sangha.intro,
  groupPhoto: asset(data.sangha.groupPhoto),
  chairman: {
    name: data.sangha.chairman.name,
    role: data.sangha.chairman.role,
    photo: asset(data.sangha.chairman.photo),
    messageHref: data.sangha.chairman.messageHref,
  },
  members: (data.sangha.members as { name: string; role: string; photo?: string }[]).map(
    (member) => ({
      name: member.name,
      role: member.role,
      photo: photo(member.photo),
    }),
  ),
  council: (data.sangha.council as { name: string; role: string; invitee?: boolean }[]).map(
    (member) => ({
      name: member.name,
      role: member.role,
      invitee: member.invitee,
    }),
  ),
};

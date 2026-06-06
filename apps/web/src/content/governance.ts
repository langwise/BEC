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

export type SanghaMember = {
  name: string;
  role: string;
  photo?: string;
  verify?: boolean;
};

export type Sangha = {
  intro?: string;
  groupPhoto: string;
  members: SanghaMember[];
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
  photo: photo(dean.photo),
}));

export const officers: Person[] = data.officers.map((officer) => ({
  ...officer,
  photo: photo(officer.photo),
}));

export const hods: Hod[] = data.hods.map((hod) => ({
  ...hod,
  photo: photo(hod.photo),
}));

export const bogLastUpdated: string = data.bogLastUpdated;

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
  members: (data.sangha.members as { name: string; role: string; photo?: string; verify?: boolean }[]).map(
    (member) => ({
      name: member.name,
      role: member.role,
      photo: photo(member.photo),
      verify: member.verify,
    }),
  ),
};

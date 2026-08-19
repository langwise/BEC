import data from "@content/governance.json";
import { asset } from "@/lib/assets";
import type { GovernanceContent } from "./schema/governance";

// Cast, not parse — see the note in home.ts (this module reaches client chunks).
const content = data as GovernanceContent;

export type Person = {
  name?: string;
  role: string;
  photo?: string;
  email?: string;
  phone?: string;
  focus?: string;
  link?: { href: string; label: string };
  /** Multiple role badges, each optionally linking to its own page. */
  roleBadges?: { label: string; link?: { href: string; label: string } }[];
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
  secretary: SanghaMember;
  members: SanghaMember[];
  council: SanghaCouncilMember[];
};

/** Resolve an optional asset key to its public URL, or undefined if absent. */
function photo(key?: string): string | undefined {
  return key ? asset(key) : undefined;
}

export const principal: Principal = {
  name: content.principal.name,
  role: content.principal.role,
  photo: asset(content.principal.photo),
  email: content.principal.email,
};

export const deans: Person[] = content.deans.map((dean) => ({
  ...dean,
  photo: photo(dean.photo),
}));

export const officers: Person[] = content.officers.map((officer) => ({
  ...officer,
  photo: photo(officer.photo),
}));

export const hods: Hod[] = content.hods.map((hod) => ({
  ...hod,
  photo: photo(hod.photo),
}));

export const bogMembers: BogMember[] = content.bog.map((member) => ({
  name: member.name,
  role: member.role,
  affiliation: member.affiliation,
  category: member.category,
  photo: photo(member.photo),
}));

export const sangha: Sangha = {
  intro: content.sangha.intro,
  groupPhoto: asset(content.sangha.groupPhoto),
  chairman: {
    name: content.sangha.chairman.name,
    role: content.sangha.chairman.role,
    photo: asset(content.sangha.chairman.photo),
    messageHref: content.sangha.chairman.messageHref,
  },
  secretary: {
    name: content.sangha.secretary.name,
    role: content.sangha.secretary.role,
    photo: photo(content.sangha.secretary.photo),
  },
  members: content.sangha.members.map((member) => ({
    name: member.name,
    role: member.role,
    photo: photo(member.photo),
  })),
  council: content.sangha.council.map((member) => ({
    name: member.name,
    role: member.role,
    invitee: member.invitee,
  })),
};

import type { GovernanceContent } from "../../content/schema/governance.ts";
import { inOrderOf, optional, optionalFlag, withKeys, type Keyed } from "./rows.ts";

/**
 * `content/governance.json` ⇄ the shape the governance editor works in.
 *
 * The file holds six lists of people in four slightly different shapes. Rather
 * than four editors, the state normalises each list to flat strings — a form
 * control cannot bind to `undefined`, and "cleared" has to come back out as an
 * *absent* field, not `""`, which would fail the schema or render an empty
 * mailto link on the site. That conversion is the whole job of this module.
 */

export type PersonRow = {
  name: string;
  role: string;
  photo: string;
  email: string;
  phone: string;
  focus: string;
  /** Preserved verbatim: shapes only Pratik sets, which a form must not eat. */
  extra: Record<string, unknown>;
  /** The key order this entry arrived in, so a publish does not reshuffle it. */
  order: string[];
};

export type HodRow = {
  department: string;
  name: string;
  title: string;
  photo: string;
  email: string;
  placeholder: boolean;
};

export type SanghaMemberRow = { name: string; role: string; photo: string };
export type CouncilRow = { name: string; role: string; invitee: boolean };

export type BogRow = {
  name: string;
  role: string;
  affiliation: string;
  category: GovernanceContent["bog"][number]["category"];
  photo: string;
};

export type GovernanceState = {
  principal: { name: string; role: string; photo: string; email: string };
  deans: Keyed<PersonRow>[];
  officers: Keyed<PersonRow>[];
  hods: Keyed<HodRow>[];
  sangha: {
    intro: string;
    groupPhoto: string;
    chairman: { name: string; role: string; photo: string; messageHref: string };
    secretary: { name: string; role: string; photo: string };
    members: Keyed<SanghaMemberRow>[];
    council: Keyed<CouncilRow>[];
  };
  bog: Keyed<BogRow>[];
};

/** The Board's seat categories, in the order the page groups them. */
export const BOG_CATEGORIES: { value: BogRow["category"]; label: string }[] = [
  { value: "chair", label: "Chairman" },
  { value: "sangha", label: "Sangha nominee" },
  { value: "nominee", label: "Nominee" },
  { value: "government", label: "Government" },
  { value: "industry", label: "Industry" },
  { value: "academia", label: "Academia" },
  { value: "faculty", label: "Faculty" },
  { value: "students", label: "Student" },
  { value: "invitee", label: "Special invitee" },
  { value: "member-secretary", label: "Member Secretary" },
];

/**
 * Fields of a person the editor does not offer a control for. `link` and
 * `roleBadges` are structural (they point at other pages of the site) and
 * `verify`/`placeholder` are Pratik's own markers; all four have to survive a
 * round trip untouched, or opening a screen and publishing it would delete
 * them.
 */
const PERSON_PASSTHROUGH = ["link", "roleBadges", "placeholder", "verify"] as const;

function personToRow(person: GovernanceContent["deans"][number]): PersonRow {
  const extra: Record<string, unknown> = {};
  for (const field of PERSON_PASSTHROUGH) {
    if (person[field] !== undefined) extra[field] = person[field];
  }
  return {
    name: person.name ?? "",
    role: person.role,
    photo: person.photo ?? "",
    email: person.email ?? "",
    phone: person.phone ?? "",
    focus: person.focus ?? "",
    extra,
    order: Object.keys(person),
  };
}

function rowToPerson(row: PersonRow): GovernanceContent["deans"][number] {
  const built = {
    role: row.role.trim(),
    ...optional("name", row.name),
    ...optional("photo", row.photo),
    ...optional("email", row.email),
    ...optional("phone", row.phone),
    ...optional("focus", row.focus),
    ...row.extra,
  } as GovernanceContent["deans"][number];
  return inOrderOf(built, row.order);
}

export function toState(content: GovernanceContent): GovernanceState {
  return {
    principal: {
      name: content.principal.name,
      role: content.principal.role,
      photo: content.principal.photo,
      email: content.principal.email ?? "",
    },
    deans: withKeys(content.deans.map(personToRow)),
    officers: withKeys(content.officers.map(personToRow)),
    hods: withKeys(
      content.hods.map((hod) => ({
        department: hod.department,
        name: hod.name ?? "",
        title: hod.title ?? "",
        photo: hod.photo ?? "",
        email: hod.email ?? "",
        placeholder: hod.placeholder ?? false,
      })),
    ),
    sangha: {
      intro: content.sangha.intro ?? "",
      groupPhoto: content.sangha.groupPhoto,
      chairman: {
        name: content.sangha.chairman.name,
        role: content.sangha.chairman.role,
        photo: content.sangha.chairman.photo,
        messageHref: content.sangha.chairman.messageHref ?? "",
      },
      secretary: {
        name: content.sangha.secretary.name,
        role: content.sangha.secretary.role,
        photo: content.sangha.secretary.photo ?? "",
      },
      members: withKeys(
        content.sangha.members.map((member) => ({
          name: member.name,
          role: member.role,
          photo: member.photo ?? "",
        })),
      ),
      council: withKeys(
        content.sangha.council.map((member) => ({
          name: member.name,
          role: member.role,
          invitee: member.invitee ?? false,
        })),
      ),
    },
    bog: withKeys(
      content.bog.map((member) => ({
        name: member.name,
        role: member.role,
        affiliation: member.affiliation,
        category: member.category,
        photo: member.photo ?? "",
      })),
    ),
  };
}

export function toDocument(
  state: GovernanceState,
  content: GovernanceContent,
): GovernanceContent {
  return {
    ...(content.$schema ? { $schema: content.$schema } : {}),
    principal: {
      name: state.principal.name.trim(),
      role: state.principal.role.trim(),
      photo: state.principal.photo,
      ...optional("email", state.principal.email),
    },
    deans: state.deans.map(rowToPerson),
    officers: state.officers.map(rowToPerson),
    hods: state.hods.map((hod) => ({
      department: hod.department.trim(),
      ...optional("name", hod.name),
      ...optional("title", hod.title),
      ...optional("photo", hod.photo),
      ...optional("email", hod.email),
      ...optionalFlag("placeholder", hod.placeholder),
    })),
    sangha: {
      ...optional("intro", state.sangha.intro),
      groupPhoto: state.sangha.groupPhoto,
      chairman: {
        name: state.sangha.chairman.name.trim(),
        role: state.sangha.chairman.role.trim(),
        photo: state.sangha.chairman.photo,
        ...optional("messageHref", state.sangha.chairman.messageHref),
      },
      secretary: {
        name: state.sangha.secretary.name.trim(),
        role: state.sangha.secretary.role.trim(),
        ...optional("photo", state.sangha.secretary.photo),
      },
      members: state.sangha.members.map((member) => ({
        name: member.name.trim(),
        role: member.role.trim(),
        ...optional("photo", member.photo),
      })),
      council: state.sangha.council.map((member) => ({
        name: member.name.trim(),
        role: member.role.trim(),
        ...optionalFlag("invitee", member.invitee),
      })),
    },
    bog: state.bog.map((member) => ({
      name: member.name.trim(),
      role: member.role.trim(),
      affiliation: member.affiliation.trim(),
      category: member.category,
      ...optional("photo", member.photo),
    })),
  };
}

export function newPerson(): PersonRow {
  return { name: "", role: "", photo: "", email: "", phone: "", focus: "", extra: {}, order: [] };
}

export function newHod(): HodRow {
  return { department: "", name: "", title: "", photo: "", email: "", placeholder: false };
}

export function newSanghaMember(): SanghaMemberRow {
  return { name: "", role: "", photo: "" };
}

export function newCouncilMember(): CouncilRow {
  return { name: "", role: "", invitee: false };
}

export function newBogMember(): BogRow {
  // "nominee" is the neutral seat — a new member gets categorised deliberately
  // rather than defaulting into "chair" and reordering the page.
  return { name: "", role: "", affiliation: "", category: "nominee", photo: "" };
}

/** Which field still needs filling in, phrased for the Editor, or undefined. */
export function firstProblem(state: GovernanceState): string | undefined {
  if (!state.principal.name.trim()) return "The Principal needs a name.";
  if (!state.principal.photo) return "The Principal needs a photo.";

  const missingRole = (rows: PersonRow[], label: string) => {
    const index = rows.findIndex((row) => !row.role.trim());
    return index >= 0 ? `${label} ${index + 1} needs a role — it is the line the card is titled by.` : undefined;
  };
  const deans = missingRole(state.deans, "Dean");
  if (deans) return deans;
  const officers = missingRole(state.officers, "Officer");
  if (officers) return officers;

  const hod = state.hods.findIndex((row) => !row.department.trim());
  if (hod >= 0) return `Head of Department ${hod + 1} needs a department name.`;

  if (!state.sangha.groupPhoto) return "The Sangha section needs its group photo.";
  if (!state.sangha.chairman.name.trim()) return "The Sangha chairman needs a name.";
  if (!state.sangha.chairman.photo) return "The Sangha chairman needs a photo.";
  if (!state.sangha.secretary.name.trim()) return "The Sangha secretary needs a name.";

  const member = state.sangha.members.findIndex((row) => !row.name.trim());
  if (member >= 0) return `Sangha member ${member + 1} needs a name.`;
  const council = state.sangha.council.findIndex((row) => !row.name.trim());
  if (council >= 0) return `Council member ${council + 1} needs a name.`;

  const board = state.bog.findIndex(
    (row) => !row.name.trim() || !row.role.trim() || !row.affiliation.trim(),
  );
  if (board >= 0) {
    return `Board member ${board + 1} needs a name, a role and an affiliation.`;
  }
  return undefined;
}

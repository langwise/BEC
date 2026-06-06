// Maps a source photo path (relative to the "BEC New Website Photos" root) to a
// stable R2 key, aligned to the website's own sections. Shared by the convert
// and contact-sheet scripts so both agree on where every photo lands.

import { extname, basename } from "node:path";

export function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Department full folder names -> slug (the "Departments/<name>" scene photos).
const DEPT_SLUG = {
  "Artificial Intelligence and Machine Learning": "aiml",
  "Biotechnology Engineering": "biotechnology",
  Chemistry: "chemistry",
  "Civil Engineering": "civil",
  "Computer Science and Engineering": "cse",
  "Electrical and Electronics Engineering": "eee",
  "Electronics and Communication Engineering": "ece",
  "Electronics and Computer Engineering": "ecs",
  "Humanities and Social Science": "hss",
  "Industrial Production": "ip",
  "Information Science and Engineering": "ise",
  "Master of Business Administrations": "mba",
  "Master of Computer Applications": "mca",
  Maths: "maths",
  "Mechanical Engineering": "mechanical",
  Physics: "physics",
};

// HoD folder abbreviations -> same dept slug (+ coe, librarian which aren't depts).
const HOD_SLUG = {
  AIML: "aiml",
  Biotech: "biotechnology",
  Chemistry: "chemistry",
  Civil: "civil",
  COE: "coe",
  CSE: "cse",
  ECE: "ece",
  EEE: "eee",
  "Electronics and Computer engineering": "ecs",
  HSS: "hss",
  IP: "ip",
  ISE: "ise",
  Librarian: "librarian",
  Maths: "maths",
  MBA: "mba",
  MCA: "mca",
  Mechanical: "mechanical",
};

// Single-level folders -> key prefix.
const SIMPLE = {
  Sports: "student-life/sports",
  Cultural: "student-life/cultural",
  NSS: "student-life/nss",
  "BEC FM": "student-life/bec-fm",
  "Engineers Arena Event": "student-life/engineers-arena",
  "Students Clubs": "student-life/clubs",
  "Youth Red Cross": "student-life/youth-red-cross",
  "Placement Cell": "placements/cell",
  "Bosch Rexroth Lab": "research/labs/bosch",
  "SCADA-Renewable Energy Research Center": "research/labs/scada-renewable",
  Robotics: "research/labs/robotics",
  Library: "facilities/library",
  "Board Room": "facilities/board-room",
  Facility: "facilities/general",
  "Confidential Section": "administration/confidential-section",
  "Development Section": "administration/development-section",
  "Group Photo": "institute/group-photos",
  Principal: "governance/principal",
  Director: "governance/director",
  Deans: "governance/deans",
  "Sangha Members": "governance/sangha",
};

const ROOT = "BEC New Website Photos";

export function keyFor(rel) {
  const norm = rel.replace(/\\/g, "/").replace(new RegExp(`^${ROOT}/`), "");
  const segs = norm.split("/");
  if (segs.length < 2) return null;

  const stem = slug(basename(norm, extname(norm)));
  if (!stem) return null;
  const file = `${stem}.webp`;

  const [a, b] = segs;

  if (a === "Departments" && DEPT_SLUG[b]) return `departments/${DEPT_SLUG[b]}/${file}`;
  if (a === "Heads of the departments") {
    if (b === "Admission Section Staff") return `governance/admission-staff/${file}`;
    if (HOD_SLUG[b]) return `governance/hod/${HOD_SLUG[b]}/${file}`;
    return null;
  }
  if (a === "Hostels" && b === "Girls Hostel") return `facilities/hostels/girls/${file}`;
  if (a === "Campus Ameneties" && b === "Admission Section")
    return `facilities/amenities/admission-section/${file}`;
  if (segs.length === 2 && SIMPLE[a]) return `${SIMPLE[a]}/${file}`;

  return null;
}

// JPG wins over CR3 when the same person/shot exists as both (same target key).
export function extPriority(file) {
  return /\.jpe?g$/i.test(file) ? 0 : 1;
}

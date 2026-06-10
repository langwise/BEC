import { FacultyMember } from "@/types/faculty";
import {
  getDepartmentContent,
  getDepartmentContentKey,
  getDepartmentGallery,
  resolveDocuments,
  type DepartmentContent,
} from "@/content/departments";
import { getDepartmentFaculty } from "@/content/faculty";

/** A labelled sub-block inside a content section (subheading + text and/or bullets). */
export interface ContentGroup {
  subtitle?: string;
  text?: string;
  items?: string[];
}

export interface DataTable {
  title: string;
  columns: string[];
  rows: string[][];
}

/** A header block (Overview / Vision / Mission) — text and/or a bullet list. */
export interface HeaderBlock {
  title: string;
  content?: string;
  items?: string[];
  icon: string;
}

// Supported section types (discriminated union the renderer switches on).
export type DepartmentSection =
  | {
      id?: string;
      type: "content";
      title: string;
      content?: string;
      items?: string[];
      groups?: ContentGroup[];
      icon?: string;
    }
  | { id?: string; type: "faculty-list"; title: string; faculty: FacultyMember[] }
  | { id?: string; type: "documents"; title: string; icon?: string; documents: { title: string; url: string }[] }
  | { id?: string; type: "tables"; title: string; icon?: string; tables: DataTable[] }
  | { id?: string; type: "stats"; title: string; stats: { label: string; value: string; icon?: string }[] }
  | { id?: string; type: "gallery"; title: string; images: { src: string; alt: string }[] };

export interface DepartmentData {
  name: string;
  tagline: string;

  overview: HeaderBlock;
  vision: HeaderBlock;
  mission: HeaderBlock;

  /** Optional "at a glance" stats row shown on the Home tab. */
  quickStats?: { label: string; value: string }[];

  highlights: string[];

  sidebar: { id: string; label: string; icon: string }[];

  sections?: DepartmentSection[];
}

const defaultHighlights = [
  "Modern labs & research facilities",
  "Highly qualified faculty",
  "Strong industry partnerships",
  "Hands-on learning ecosystem",
];

function titleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// The intake stat is program-specific — UG departments enrol B.E. students,
// whereas PG/MBA/MCA entries report their own programme's intake.
function intakeLabel(contentKey: string): string {
  if (contentKey.startsWith("pg/")) return "M.Tech. Intake";
  if (contentKey === "mca") return "MCA Intake";
  if (contentKey === "mba") return "MBA Intake";
  return "B.E. Intake";
}

function quickStats(
  contentKey: string,
  content: DepartmentContent,
): { label: string; value: string }[] {
  const stats: { label: string; value: string }[] = [];
  if (content.established) stats.push({ label: "Established", value: content.established });
  if (content.intake) stats.push({ label: intakeLabel(contentKey), value: content.intake });
  if (content.researchAreas?.length)
    stats.push({ label: "Research Supervisors", value: String(content.researchAreas.length) });
  if (content.programsOffered?.length)
    stats.push({ label: "Programs Offered", value: String(content.programsOffered.length) });
  return stats;
}

function buildSections(contentKey: string, content: DepartmentContent): DepartmentSection[] {
  const sections: DepartmentSection[] = [];

  // Academics — programs, PEOs, PSOs
  if (content.programsOffered?.length || content.peos?.length || content.psos?.length) {
    const groups: ContentGroup[] = [];
    if (content.programsOffered?.length)
      groups.push({ subtitle: "Programs Offered", items: content.programsOffered });
    if (content.peos?.length)
      groups.push({
        subtitle: "Programme Educational Objectives (PEOs)",
        items: content.peos.map((p) => `${p.code}: ${p.text}`),
      });
    if (content.psos?.length)
      groups.push({
        subtitle: "Programme Specific Outcomes (PSOs)",
        items: content.psos.map((p) => `${p.code}: ${p.text}`),
      });
    sections.push({ id: "academics", type: "content", title: "Academics", icon: "book", groups });
  }

  // Curriculum & syllabus documents (R2 PDFs)
  const documents = resolveDocuments(content.documents);
  if (documents.length) {
    sections.push({ id: "curriculum", type: "documents", title: "Curriculum & Syllabus", icon: "file-text", documents });
  }

  // Faculty
  const faculty = getDepartmentFaculty(contentKey);
  if (faculty.length) {
    sections.push({ id: "faculty", type: "faculty-list", title: "Teaching Faculty", faculty });
  }

  // Supporting staff
  if (content.supportingStaff?.length) {
    sections.push({
      id: "staff",
      type: "tables",
      title: "Supporting Staff",
      icon: "users",
      tables: [
        {
          title: "Supporting Staff",
          columns: ["Name", "Designation"],
          rows: content.supportingStaff.map((member) => [member.name, member.designation]),
        },
      ],
    });
  }

  // Board of Studies / Board of Examiners
  if (content.committeeGroups?.length) {
    sections.push({
      id: "governance",
      type: "tables",
      title: "Board Members",
      icon: "clipboard",
      tables: content.committeeGroups.map((group) => ({
        title: group.title,
        columns: ["Name of the Member", "Position"],
        rows: group.members.map((member) => [member.name, member.position]),
      })),
    });
  }

  // Research — areas of specialization + labs
  if (content.researchAreas?.length || content.labs?.length) {
    const groups: ContentGroup[] = [];
    if (content.researchAreas?.length)
      groups.push({
        subtitle: "Areas of Specialization",
        items: content.researchAreas.map(
          (r) => `${r.supervisor} — ${r.area}${r.university ? ` (${r.university})` : ""}`,
        ),
      });
    for (const lab of content.labs ?? []) {
      groups.push({ subtitle: lab.name, text: lab.description });
    }
    sections.push({ id: "research", type: "content", title: "Research & Labs", icon: "flask", groups });
  }

  // Detailed infrastructure/equipment tables from legacy pages.
  if (content.infrastructureItems?.length || content.softwareItems?.length) {
    const tables: DataTable[] = [];
    if (content.infrastructureItems?.length) {
      tables.push({
        title: "Major Equipment Available",
        columns: ["Equipment", "Brief Specification", "Quantity"],
        rows: content.infrastructureItems.map((item) => [
          item.name,
          item.specification ?? "",
          item.quantity ?? "",
        ]),
      });
    }
    if (content.softwareItems?.length) {
      tables.push({
        title: "Software Available",
        columns: ["Name", "Version", "System / Application"],
        rows: content.softwareItems.map((item) => [
          item.name,
          item.version ?? "",
          item.usage ?? "",
        ]),
      });
    }
    sections.push({
      id: "facilities",
      type: "tables",
      title: "Infrastructure Details",
      icon: "building-2",
      tables,
    });
  }

  // Activities & student forums
  if (content.activities?.length || content.associations?.length) {
    const groups: ContentGroup[] = [];
    if (content.activities?.length)
      groups.push({
        subtitle: "Recent Events & Activities",
        items: content.activities.map((a) => (a.date ? `${a.title} — ${a.date}` : a.title)),
      });
    for (const assoc of content.associations ?? []) {
      const coords = assoc.coordinators?.length
        ? ` Coordinators: ${assoc.coordinators.join(", ")}.`
        : "";
      groups.push({ subtitle: assoc.name, text: `${assoc.about ?? ""}${coords}`.trim() });
    }
    sections.push({ id: "activities", type: "content", title: "Activities & Forums", icon: "calendar", groups });
  }

  // Infrastructure gallery (R2 photos)
  const gallery = content.infrastructureGallerySlug
    ? getDepartmentGallery(content.infrastructureGallerySlug)
    : contentKey.startsWith("pg/")
      ? []
      : getDepartmentGallery(content.assetSlug);
  if (gallery.length) {
    sections.push({
      id: "infrastructure",
      type: "gallery",
      title: "Infrastructure & Labs",
      images: gallery.map((src, i) => ({ src, alt: `${content.name} — facilities photo ${i + 1}` })),
    });
  }

  // Contact
  if (
    (content.contact && (content.contact.name || content.contact.email || content.contact.phone)) ||
    content.additionalContacts?.length
  ) {
    const c = content.contact;
    const items = [c?.phone && `Phone: ${c.phone}`, c?.email && `Email: ${c.email}`].filter(
      Boolean,
    ) as string[];
    const groups = content.additionalContacts?.map((person) => ({
      subtitle: person.name,
      text: person.designation,
      items: [person.phone && `Phone: ${person.phone}`, person.email && `Email: ${person.email}`]
        .filter(Boolean) as string[],
    }));
    sections.push({
      id: "contact",
      type: "content",
      title: "Department Contact",
      icon: "phone",
      content: c ? [c.name, c.designation].filter(Boolean).join(" — ") || undefined : undefined,
      items,
      groups,
    });
  }

  return sections;
}

export function getDepartmentData(type: string, slug: string): DepartmentData {
  const contentKey = getDepartmentContentKey(slug, type);
  const content = getDepartmentContent(slug, type);
  const name = content?.name ?? `Department of ${titleCase(slug)}`;

  const sections = content ? buildSections(contentKey, content) : [];

  // Sidebar derived from the content that actually exists.
  const sidebar = [{ id: "home", label: "Home", icon: "home" }];
  if (content?.vision || content?.mission?.length)
    sidebar.push({ id: "about", label: "About Department", icon: "graduation-cap" });
  const sectionLabels: Record<string, { label: string; icon: string }> = {
    academics: { label: "Academics", icon: "file-text" },
    curriculum: { label: "Curriculum", icon: "file-text" },
    faculty: { label: "Teaching Faculty", icon: "users" },
    staff: { label: "Supporting Staff", icon: "users-round" },
    governance: { label: "Board Members", icon: "clipboard" },
    research: { label: "Research & Labs", icon: "clipboard" },
    facilities: { label: "Facilities", icon: "building-2" },
    activities: { label: "Activities", icon: "calendar" },
    infrastructure: { label: "Infrastructure", icon: "building-2" },
    contact: { label: "Contact", icon: "users-round" },
  };
  for (const section of sections) {
    const meta = section.id ? sectionLabels[section.id] : undefined;
    if (meta) sidebar.push({ id: section.id!, label: meta.label, icon: meta.icon });
  }

  return {
    name,
    tagline: content?.tagline ?? "Excellence in Education & Innovation",
    quickStats: content ? quickStats(contentKey, content) : undefined,
    overview: {
      title: "Overview",
      content:
        content?.overview ??
        "Department overview will be updated soon. Explore the available sections from the menu.",
      icon: "book",
    },
    vision: {
      title: "Vision",
      content: content?.vision ?? "Vision statement will be updated soon.",
      icon: "eye",
    },
    mission: {
      title: "Mission",
      content: content?.mission?.length ? undefined : "Mission statement will be updated soon.",
      items: content?.mission,
      icon: "target",
    },
    highlights: content?.highlights ?? defaultHighlights,
    sidebar,
    sections,
  };
}

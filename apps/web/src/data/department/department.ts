import { FacultyMember } from "@/types/faculty";
import {
  getDepartmentContent,
  getDepartmentContentKey,
  getDepartmentGallery,
  resolveDocuments,
  type DepartmentContent,
} from "@/content/departments";
import { getDepartmentFaculty } from "@/content/faculty";
import { getDepartmentPlacements } from "@/content/placements";

/** A two-part list entry — primary label + muted secondary detail (no dash-joining). */
export type GroupItem = string | { label: string; value?: string };

/** A labelled sub-block inside a content section (subheading + text and/or bullets). */
export interface ContentGroup {
  subtitle?: string;
  text?: string;
  items?: GroupItem[];
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

/** A downloadable document link (title + resolved R2 url). */
export type DocLink = { title: string; url: string };

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
      attachments?: DocLink[];
    }
  | { id?: string; type: "faculty-list"; title: string; faculty: FacultyMember[]; attachments?: DocLink[] }
  | {
      id?: string;
      type: "documents";
      title: string;
      icon?: string;
      documents: DocLink[];
      /** When present, the curriculum renders as labelled sub-tabs instead of a flat grid. */
      groups?: { title: string; documents: DocLink[] }[];
    }
  | { id?: string; type: "tables"; title: string; icon?: string; tables: DataTable[]; attachments?: DocLink[] }
  | { id?: string; type: "stats"; title: string; stats: { label: string; value: string; icon?: string }[] }
  | {
      id?: string;
      type: "testimonials";
      title: string;
      icon?: string;
      testimonials: { name: string; quote: string; designation?: string; organization?: string; photo?: string }[];
    }
  | { id?: string; type: "gallery"; title: string; images: { src: string; alt: string }[]; attachments?: DocLink[] };

export interface DepartmentData {
  name: string;
  tagline: string;

  overview: HeaderBlock;
  vision: HeaderBlock;
  mission: HeaderBlock;
  about?: HeaderBlock;

  /** Optional "at a glance" stats row shown on the Home tab. */
  quickStats?: { label: string; value: string }[];

  highlights: string[];

  /** Best-practices PDFs surfaced on the Home tab. */
  bestPractices?: DocLink[];

  /** When true, Home shows Vision & Mission and Highlights move under "About Department". */
  visionMissionOnHome?: boolean;

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

  // Per-department section heading override (falls back to the shared default).
  const heading = (id: string, def: string) => content.sectionTitles?.[id] ?? def;

  // Academics — programs, PEOs, PSOs
  if (
    content.programsOffered?.length ||
    content.peos?.length ||
    content.psos?.length ||
    content.pos?.length ||
    content.wk?.length
  ) {
    const groups: ContentGroup[] = [];
    if (content.programsOffered?.length)
      groups.push({ subtitle: "Programs Offered", items: content.programsOffered });
    if (content.peos?.length)
      groups.push({
        subtitle: "Programme Educational Objectives (PEO's)",
        items: content.peos.map((p) => `${p.code}: ${p.text}`),
      });
    if (content.psos?.length)
      groups.push({
        subtitle: "Programme Specific Outcomes (PSO's)",
        items: content.psos.map((p) => `${p.code}: ${p.text}`),
      });
    if (content.wk?.length)
      groups.push({
        subtitle: "Knowledge and Attitude Profile (WK)",
        items: content.wk.map((p) => `${p.code}: ${p.text}`),
      });
    if (content.pos?.length)
      groups.push({
        subtitle: "Programme Outcomes (PO's)",
        items: content.pos.map((p) => `${p.code}: ${p.text}`),
      });
    sections.push({ id: "academics", type: "content", title: heading("academics", "Academics"), icon: "book", groups });
  }

  // Curriculum & syllabus documents (R2 PDFs). When curriculumGroups is set, the
  // tab renders as labelled sub-tabs (Scheme of Teaching & Examinations / Syllabus).
  if (content.curriculumGroups?.length) {
    const groups = content.curriculumGroups
      .map((g) => ({ title: g.title, documents: resolveDocuments(g.documents) }))
      .filter((g) => g.documents.length);
    if (groups.length) {
      sections.push({
        id: "curriculum",
        type: "documents",
        title: heading("curriculum", "Curriculum & Syllabus"),
        icon: "file-text",
        documents: [],
        groups,
      });
    }
  } else {
    const documents = resolveDocuments(content.documents);
    if (documents.length) {
      sections.push({ id: "curriculum", type: "documents", title: heading("curriculum", "Curriculum & Syllabus"), icon: "file-text", documents });
    }
  }

  // Newsletters (monthly department PDFs) — reuses the documents section.
  const newsletters = resolveDocuments(content.newsletters);
  if (newsletters.length) {
    sections.push({
      id: "newsletters",
      type: "documents",
      title: heading("newsletters", "Newsletters"),
      icon: "file-text",
      documents: newsletters,
    });
  }

  // Faculty
  const faculty = getDepartmentFaculty(contentKey);
  if (faculty.length) {
    sections.push({ id: "faculty", type: "faculty-list", title: heading("faculty", "Teaching Faculty"), faculty });
  }

  // Supporting staff. Optionally split into "Technical Staff" (instructors) and
  // "Supporting Staff" (helpers / peons / drivers) grouped by designation.
  if (content.supportingStaff?.length) {
    const staffRow = (m: { name: string; designation: string }) => [m.name, m.designation];
    let tables: DataTable[];
    if (content.groupSupportingStaff) {
      const isTechnical = (d: string) => /instructor/i.test(d);
      const technical = content.supportingStaff.filter((m) => isTechnical(m.designation));
      const support = content.supportingStaff.filter((m) => !isTechnical(m.designation));
      tables = [
        technical.length && {
          title: "Technical Staff",
          columns: ["Name", "Designation"],
          rows: technical.map(staffRow),
        },
        support.length && {
          title: "Supporting Staff",
          columns: ["Name", "Designation"],
          rows: support.map(staffRow),
        },
      ].filter(Boolean) as DataTable[];
    } else {
      tables = [
        {
          title: "Supporting Staff",
          columns: ["Name", "Designation"],
          rows: content.supportingStaff.map(staffRow),
        },
      ];
    }
    sections.push({
      id: "staff",
      type: "tables",
      title: heading("staff", "Supporting Staff"),
      icon: "users",
      tables,
    });
  }

  // Board of Studies / Board of Examiners. Positions are authored as
  // "Role — Designation & Affiliation"; when an em dash is present, split it into
  // a dedicated third column so the role and affiliation don't crowd one cell.
  if (content.committeeGroups?.length) {
    sections.push({
      id: "governance",
      type: "tables",
      title: heading("governance", "Board Members"),
      icon: "clipboard",
      tables: content.committeeGroups.map((group) => {
        const split = group.members.some((m) => m.position.includes("—"));
        return {
          title: group.title,
          columns: split
            ? ["Name of the Member", "Position", "Designation & Affiliation"]
            : ["Name of the Member", "Position"],
          rows: group.members.map((member) => {
            if (!split) return [member.name, member.position];
            const i = member.position.indexOf("—");
            return i === -1
              ? [member.name, member.position, ""]
              : [member.name, member.position.slice(0, i).trim(), member.position.slice(i + 1).trim()];
          }),
        };
      }),
    });
  }

  // Consolidated Research Centre — supervisors, areas, scholars, grants,
  // facilities and achievements all under one tab.
  if (
    content.consolidateResearch &&
    (content.researchAreas?.length ||
      content.researchScholars?.length ||
      content.labs?.length ||
      content.researchFacilities?.length ||
      content.researchAchievements?.length)
  ) {
    const groups: ContentGroup[] = [];
    if (content.researchAreas?.length)
      groups.push({
        subtitle: "Research Supervisors",
        items: content.researchAreas.map((r) => ({ label: r.supervisor, value: r.area })),
      });
    if (content.researchAreasList?.length)
      groups.push({ subtitle: "Research Areas", items: content.researchAreasList });
    if (content.researchScholars?.length)
      groups.push({
        subtitle: `Research Scholars (${content.researchScholars.length})`,
        items: content.researchScholars.map((s) => ({
          label: s.scholar,
          value: `Guide: ${s.guide}${s.status ? ` · ${s.status}` : ""}`,
        })),
      });
    if (content.researchGrants?.length)
      groups.push({
        subtitle: "Sponsored Research Grants",
        items: content.researchGrants.map((g) => ({
          label: g.title,
          value: `${g.agency} · ${g.amount} · ${g.year}`,
        })),
      });
    if (content.researchFacilities?.length)
      groups.push({ subtitle: "Research Facilities", items: content.researchFacilities });
    if (content.researchAchievements?.length)
      groups.push({ subtitle: "Research Achievements", items: content.researchAchievements });
    for (const lab of content.labs ?? []) {
      groups.push({ subtitle: lab.name, text: lab.description });
    }
    sections.push({ id: "research", type: "content", title: heading("research", "Research & Labs"), icon: "flask", groups });
  }

  // Research — areas of specialization + labs
  if (!content.consolidateResearch && (content.researchAreas?.length || content.labs?.length)) {
    const groups: ContentGroup[] = [];
    if (content.researchAreas?.length)
      groups.push({
        subtitle: "Areas of Specialization",
        items: content.researchAreas.map((r) => ({
          label: r.supervisor,
          value: `${r.area}${r.university ? ` · ${r.university}` : ""}`,
        })),
      });
    for (const lab of content.labs ?? []) {
      groups.push({ subtitle: lab.name, text: lab.description });
    }
    sections.push({ id: "research", type: "content", title: heading("research", "Research & Labs"), icon: "flask", groups });
  }

  // Research achievements — Ph.D.s awarded, registered scholars, sponsored grants
  if (!content.consolidateResearch && (content.phdsAwarded?.length || content.researchScholars?.length || content.researchGrants?.length)) {
    const tables: DataTable[] = [];
    if (content.phdsAwarded?.length) {
      tables.push({
        title: `Ph.D.s Awarded (${content.phdsAwarded.length})`,
        columns: ["Research Scholar", "Guide", "Thesis Title", "Year"],
        rows: content.phdsAwarded.map((p) => [p.scholar, p.guide, p.title, p.year]),
      });
    }
    if (content.researchScholars?.length) {
      tables.push({
        title: `Registered Research Scholars (${content.researchScholars.length})`,
        columns: ["Research Scholar", "Guide", "Thesis Title", "Status"],
        rows: content.researchScholars.map((p) => [p.scholar, p.guide, p.title ?? "", p.status]),
      });
    }
    if (content.researchGrants?.length) {
      tables.push({
        title: "Sponsored Research Grants",
        columns: ["Project Title", "Sponsoring Agency", "Year", "Grant", "Investigators"],
        rows: content.researchGrants.map((g) => [g.title, g.agency, g.year, g.amount, g.investigators]),
      });
    }
    sections.push({
      id: "research-achievements",
      type: "tables",
      title: heading("research-achievements", "Research Achievements"),
      icon: "clipboard",
      tables,
    });
  }

  // Publications — year-wise research output grouped by category.
  if (content.publications?.length) {
    const groups: ContentGroup[] = [];
    for (const cat of content.publications) {
      groups.push({ subtitle: cat.category });
      for (const y of cat.years) {
        groups.push({ subtitle: y.year, items: y.items });
      }
    }
    sections.push({
      id: "publications",
      type: "content",
      title: heading("publications", "Publications"),
      icon: "book",
      groups,
    });
  }

  // Patents — filed / published / granted.
  if (content.patents?.length) {
    const hasArea = content.patents.some((p) => p.area);
    const columns = ["Title of Invention", "Application No.", "Inventors"];
    if (hasArea) columns.push("Area");
    columns.push("Filed", "Published", "Status");
    sections.push({
      id: "patents",
      type: "tables",
      title: heading("patents", "Patents"),
      icon: "clipboard",
      tables: [
        {
          title: `Patents (${content.patents.length})`,
          columns,
          rows: content.patents.map((p) => {
            const status = p.awarded
              ? `Granted ${p.awarded}${p.awardNumber ? ` · No. ${p.awardNumber}` : ""}`
              : p.status ?? "";
            const row = [p.title, p.applicationNumber ?? "", p.inventors ?? ""];
            if (hasArea) row.push(p.area ?? "");
            row.push(p.filed ?? "", p.published ?? "", status);
            return row;
          }),
        },
      ],
    });
  }

  // Alumni testimonials
  if (content.testimonials?.length) {
    sections.push({
      id: "alumni",
      type: "testimonials",
      title: heading("alumni", "Alumni Testimonials"),
      icon: "users",
      testimonials: content.testimonials,
    });
  }

  // Placements — year-wise summary, recruiters & packages, student-wise detail
  const placements = getDepartmentPlacements(contentKey);
  if (placements && (placements.yearWise.length || placements.batches.length)) {
    const tables: DataTable[] = [];
    if (placements.yearWise.length) {
      tables.push({
        title: "Year-wise Placement Summary",
        columns: ["Year", "Students", "Offers", "On-Campus", "Off-Campus", "Placed", "Placement %", "Companies"],
        rows: placements.yearWise.map((y) => [
          y.year,
          y.students ?? "",
          y.offers ?? "",
          y.onCampus ?? "",
          y.offCampus ?? "",
          y.placed ?? "",
          y.percent ? `${y.percent}%` : "",
          y.companies ?? "",
        ]),
      });
    }
    for (const batch of placements.batches) {
      if (batch.companies.length) {
        tables.push({
          title: `Recruiters & Packages — ${batch.batch} (${batch.companies.length})`,
          columns: ["Company", "Package (LPA)", "Students Placed"],
          rows: batch.companies.map((c) => [c.company, c.package, c.count]),
        });
      }
      if (batch.students.length && !content.placementsSummaryOnly) {
        tables.push({
          title: `Students Placed — ${batch.batch} (${batch.students.length} offers)`,
          columns: ["Student", "USN", "Mode", "Company", "LPA"],
          rows: batch.students.map((s) => [s.name, s.usn, s.mode, s.company, s.lpa]),
        });
      }
    }
    sections.push({
      id: "placements",
      type: "tables",
      title: "Placements",
      icon: "briefcase",
      tables,
    });
  }

  // Detailed infrastructure/equipment tables from legacy pages.
  if (content.infrastructureItems?.length || content.softwareItems?.length) {
    const tables: DataTable[] = [];
    if (content.infrastructureItems?.length) {
      const hideQty = content.hideInfrastructureQuantity;
      tables.push({
        title: "Major Equipment",
        columns: hideQty
          ? ["Equipment", "Brief Specification"]
          : ["Equipment", "Brief Specification", "Quantity"],
        rows: content.infrastructureItems.map((item) =>
          hideQty
            ? [item.name, item.specification ?? ""]
            : [item.name, item.specification ?? "", item.quantity ?? ""],
        ),
      });
    }
    if (content.softwareItems?.length) {
      tables.push({
        title: "Software",
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
      title: heading("facilities", "Infrastructure Details"),
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
        items: content.activities.map((a) => ({
          label: a.title,
          value: [a.date, a.description].filter(Boolean).join(" — "),
        })),
      });
    for (const assoc of content.associations ?? []) {
      const coords = assoc.coordinators?.length
        ? ` Coordinators: ${assoc.coordinators.join(", ")}.`
        : "";
      groups.push({ subtitle: assoc.name, text: `${assoc.about ?? ""}${coords}`.trim() });
    }
    sections.push({ id: "activities", type: "content", title: heading("activities", "Activities & Forums"), icon: "calendar", groups });
  }

  // MoUs / industry collaborations
  if (content.mous?.length) {
    // Only show the "Since" column when at least one MoU records a date.
    const hasSince = content.mous.some((m) => m.since);
    sections.push({
      id: "mou",
      type: "tables",
      title: heading("mou", "MoUs & Collaborations"),
      icon: "handshake",
      tables: [
        {
          title: "Memoranda of Understanding",
          columns: hasSince
            ? ["Partner Organization", "Location", "Since"]
            : ["Partner Organization", "Location"],
          rows: content.mous.map((m) =>
            hasSince
              ? [m.partner, m.location ?? "", m.since ?? ""]
              : [m.partner, m.location ?? ""],
          ),
        },
      ],
    });
  }

  // Infrastructure gallery (R2 photos)
  const galleryAll = content.infrastructureGallerySlug
    ? getDepartmentGallery(content.infrastructureGallerySlug)
    : contentKey.startsWith("pg/")
      ? []
      : getDepartmentGallery(content.assetSlug);
  // Drop any stray portrait/staff shots the department asked to exclude.
  const gallery = content.galleryExclude?.length
    ? galleryAll.filter((url) => !content.galleryExclude!.some((k) => url.includes(k)))
    : galleryAll;
  if (gallery.length) {
    sections.push({
      id: "infrastructure",
      type: "gallery",
      title: heading("infrastructure", "Infrastructure & Labs"),
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
      title: heading("contact", "Department Contact"),
      icon: "phone",
      content: c ? [c.name, c.designation].filter(Boolean).join(" — ") || undefined : undefined,
      items,
      groups,
    });
  }

  // Attach extra PDFs to their sections (e.g. Research Centre Info under Research,
  // MoU Details under MoUs). The Curriculum tab keeps only scheme/syllabus, so
  // relocated documents surface alongside the section they belong to.
  if (content.sectionDocuments) {
    for (const section of sections) {
      if (!section.id) continue;
      if (section.type === "documents" || section.type === "stats" || section.type === "testimonials") continue;
      const docs = resolveDocuments(content.sectionDocuments[section.id]);
      if (docs.length) section.attachments = docs;
    }
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
  if (content?.about || content?.vision || content?.mission?.length)
    sidebar.push({ id: "about", label: "About Department", icon: "graduation-cap" });
  const sectionLabels: Record<string, { label: string; icon: string }> = {
    academics: { label: "Academics", icon: "file-text" },
    curriculum: { label: "Curriculum", icon: "file-text" },
    newsletters: { label: "Newsletters", icon: "file-text" },
    faculty: { label: "Teaching Faculty", icon: "users" },
    staff: { label: "Supporting Staff", icon: "users-round" },
    governance: { label: "Board Members", icon: "clipboard" },
    research: { label: "Research & Labs", icon: "clipboard" },
    "research-achievements": { label: "Research Achievements", icon: "clipboard" },
    publications: { label: "Publications", icon: "book" },
    patents: { label: "Patents", icon: "clipboard" },
    alumni: { label: "Alumni", icon: "users" },
    placements: { label: "Placements", icon: "briefcase" },
    facilities: { label: "Facilities", icon: "building-2" },
    activities: { label: "Activities", icon: "calendar" },
    mou: { label: "MoUs", icon: "handshake" },
    infrastructure: { label: "Infrastructure", icon: "building-2" },
    contact: { label: "Contact", icon: "users-round" },
  };
  for (const section of sections) {
    const meta = section.id ? sectionLabels[section.id] : undefined;
    if (meta) {
      const label = (section.id && content?.sectionNavLabels?.[section.id]) || meta.label;
      sidebar.push({ id: section.id!, label, icon: meta.icon });
    }
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
      items: content?.values,
      icon: "book",
    },
    about: content?.about
      ? {
          title: "About the Department",
          content: content.about,
          icon: "graduation-cap",
        }
      : undefined,
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
    bestPractices: content ? resolveDocuments(content.bestPractices) : undefined,
    visionMissionOnHome: content?.visionMissionOnHome,
    sidebar,
    sections,
  };
}

import { FacultyMember } from "@/types/faculty";
import {
  getDepartmentContent,
  getDepartmentContentKey,
  getDepartmentGallery,
  resolveDocuments,
  type DepartmentContent,
} from "@/content/departments";
import { asset } from "@/lib/assets";
import { getDepartmentFaculty } from "@/content/faculty";
import { getDepartmentPlacements } from "@/content/placements";

/** A two-part list entry — primary label + muted secondary detail (no dash-joining). */
export type GroupItem = string | { label: string; value?: string };

/** A photo with alt text (and optional highlighted caption), used for inline galleries and banners. */
export type SectionImage = { src: string; alt: string; caption?: string };

/** A labelled sub-block inside a content section (subheading + text and/or bullets). */
export interface ContentGroup {
  subtitle?: string;
  text?: string;
  items?: GroupItem[];
  /** Photos rendered as a grid under this group (e.g. per-laboratory shots on the Research tab). */
  images?: SectionImage[];
  /** Render this group's images large (single column) instead of small grid tiles. */
  featureImages?: boolean;
  /** Render this group's images at a moderate bump (2 per row) instead of small grid tiles. */
  largeImages?: boolean;
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
  /** Optional lead image rendered above the block's body (e.g. the department group photo). */
  image?: { src: string; alt: string; caption?: string };
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
      /** Data tables rendered below the content groups (e.g. research achievements folded into the Research tab). */
      tables?: DataTable[];
      /** A captioned group-photo banner shown at the very end of the section (e.g. an association's office bearers). */
      groupPhoto?: SectionImage;
      icon?: string;
      attachments?: DocLink[];
      embeds?: DocLink[];
    }
  | { id?: string; type: "faculty-list"; title: string; faculty: FacultyMember[]; groupPhoto?: SectionImage; attachments?: DocLink[]; embeds?: DocLink[] }
  | {
      id?: string;
      type: "documents";
      title: string;
      icon?: string;
      documents: DocLink[];
      /** When present, the curriculum renders as labelled sub-tabs instead of a flat grid. */
      groups?: { title: string; documents: DocLink[] }[];
    }
  | {
      id?: string;
      type: "tables";
      title: string;
      icon?: string;
      tables: DataTable[];
      /** A group photo banner shown above the tables (e.g. the supporting-staff photo). */
      groupPhoto?: SectionImage;
      /** Captioned photo galleries shown above the tables (e.g. Facilities: classrooms/labs/library/campus). */
      imageGroups?: { title?: string; images: SectionImage[] }[];
      attachments?: DocLink[];
      embeds?: DocLink[];
    }
  | { id?: string; type: "stats"; title: string; stats: { label: string; value: string; icon?: string }[] }
  | {
      id?: string;
      type: "testimonials";
      title: string;
      icon?: string;
      testimonials: { name: string; quote: string; designation?: string; organization?: string; photo?: string }[];
    }
  | { id?: string; type: "gallery"; title: string; images: { src: string; alt: string }[]; attachments?: DocLink[]; embeds?: DocLink[] }
  | {
      id?: string;
      type: "contact";
      title: string;
      icon?: string;
      people: { name?: string; designation?: string; phone?: string; email?: string }[];
    };

export interface DepartmentData {
  name: string;
  tagline: string;

  /** Optional full-bleed hero image shown at the top of the page (home-hero style). */
  heroImage?: SectionImage;

  overview: HeaderBlock;
  vision: HeaderBlock;
  mission: HeaderBlock;
  about?: HeaderBlock;

  /** Message from the Head of Department, shown on the Home tab. */
  hodMessage?: { message: string; name?: string; designation?: string; image?: { src: string; alt: string } };

  /** Optional "at a glance" stats row shown on the Home tab. */
  quickStats?: { label: string; value: string }[];

  /** Department-specific "Quick Facts" panel (facts + research areas). Only set per-department. */
  quickFacts?: { facts: { label: string; value: string }[]; researchAreas: string[] };

  highlights: string[];

  /** Best-practices PDFs surfaced on the Home tab. */
  bestPractices?: DocLink[];

  /** When true, Home shows Vision & Mission after the overview, and the HoD message, lead photo and Highlights move under "About Department". */
  visionMissionOnHome?: boolean;

  /** Captioned group-photo banner shown at the very end of the Home tab (e.g. the graduating batch). */
  homeGroupPhoto?: SectionImage;

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
    stats.push({
      label: "Programs Offered",
      value: String(content.programsOfferedCount ?? content.programsOffered.length),
    });
  if (content.nbaAccredited) stats.push({ label: "Accredited", value: "NBA" });
  return stats;
}

// Resolve a lab's photo asset keys to captioned gallery images.
function labImages(lab: { name: string; images?: string[] }): SectionImage[] | undefined {
  if (!lab.images?.length) return undefined;
  return lab.images.map((key) => ({ src: asset(key), alt: lab.name }));
}

// Drop any column whose cells are all empty across every row (e.g. a batch with
// no CTC data, or year-wise metrics the department didn't report).
function dropEmptyColumns(
  columns: string[],
  rows: string[][],
): { columns: string[]; rows: string[][] } {
  const keep = columns.map((_, i) => rows.some((row) => (row[i] ?? "").trim() !== ""));
  return {
    columns: columns.filter((_, i) => keep[i]),
    rows: rows.map((row) => row.filter((_, i) => keep[i])),
  };
}

function buildSections(contentKey: string, content: DepartmentContent): DepartmentSection[] {
  const sections: DepartmentSection[] = [];

  // Per-department section heading override (falls back to the shared default).
  const heading = (id: string, def: string) => content.sectionTitles?.[id] ?? def;

  // Research achievements (Ph.D.s awarded, registered scholars, sponsored grants)
  // as data tables — shared by the standalone "Research Achievements" tab and the
  // inline-under-Research layout (content.achievementsUnderResearch).
  const achievementTables = (): DataTable[] => {
    const tables: DataTable[] = [];
    if (content.phdsAwarded?.length) {
      tables.push({
        title: `Ph.D.s Awarded (${content.phdsAwarded.length})`,
        columns: ["Research Scholar", "Guide", "Thesis Title", content.consolidateResearch ? "Registered Year" : "Year"],
        rows: content.phdsAwarded.map((p) => [p.scholar, p.guide, p.title, p.year]),
      });
    }
    if (content.researchScholars?.length) {
      tables.push({
        title: `Research Scholars (${content.researchScholars.length})`,
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
    return tables;
  };
  const hasAchievements = () =>
    Boolean(content.phdsAwarded?.length || content.researchScholars?.length || content.researchGrants?.length);

  // Academics — programs, PEOs, PSOs
  if (
    content.programsOffered?.length ||
    content.programStructure?.length ||
    content.peos?.length ||
    content.psos?.length ||
    content.pos?.length ||
    content.wk?.length
  ) {
    const groups: ContentGroup[] = [];
    if (content.programsOffered?.length)
      groups.push({ subtitle: "Programs Offered", items: content.programsOffered });
    if (content.programStructure?.length)
      groups.push({ subtitle: "Programme Structure", items: content.programStructure });
    if (content.peos?.length)
      groups.push({
        subtitle: "Programme Educational Objectives (PEOs)",
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
        title: heading("curriculum", "Curriculum"),
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

  // Faculty
  const faculty = getDepartmentFaculty(contentKey);
  if (faculty.length) {
    sections.push({
      id: "faculty",
      type: "faculty-list",
      title: heading("faculty", "Teaching Faculty"),
      faculty,
      groupPhoto: content.facultyGroupPhoto
        ? {
            src: asset(content.facultyGroupPhoto),
            alt: `${content.name} — teaching faculty`,
            caption: content.facultyGroupPhotoCaption,
          }
        : undefined,
    });
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
      groupPhoto: content.staffGroupPhoto
        ? {
            src: asset(content.staffGroupPhoto),
            alt: `${content.name} — supporting staff`,
            caption: content.staffGroupPhotoCaption,
          }
        : undefined,
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
    if (content.researchFacilities?.length)
      groups.push({ subtitle: "Research Facilities", items: content.researchFacilities });
    if (content.researchAchievements?.length)
      groups.push({ subtitle: "Research Achievements", items: content.researchAchievements });
    for (const lab of content.labs ?? []) {
      groups.push({ subtitle: lab.name, text: lab.description, images: labImages(lab) });
    }
    sections.push({ id: "research", type: "content", title: heading("research", "Research"), icon: "flask", groups });
  }

  // Research — research guides + labs, optionally with the achievement tables
  // folded in (content.achievementsUnderResearch).
  if (
    !content.consolidateResearch &&
    (content.researchAreas?.length ||
      content.labs?.length ||
      (content.achievementsUnderResearch && hasAchievements()))
  ) {
    const groups: ContentGroup[] = [];
    if (content.researchAreas?.length)
      groups.push({
        subtitle: "Research Guides",
        items: content.researchAreas.map((r) => ({
          label: r.supervisor,
          value: `${r.area}${r.university ? ` · ${r.university}` : ""}`,
        })),
      });
    for (const lab of content.labs ?? []) {
      groups.push({ subtitle: lab.name, text: lab.description, images: labImages(lab), featureImages: lab.feature });
    }
    const tables = content.achievementsUnderResearch ? achievementTables() : [];
    sections.push({
      id: "research",
      type: "content",
      title: heading("research", "Research"),
      icon: "flask",
      groups,
      tables: tables.length ? tables : undefined,
    });
  }

  // Research achievements — Ph.D.s awarded, registered scholars, sponsored grants.
  // Skipped when folded into the Research tab (content.achievementsUnderResearch).
  if (!content.achievementsUnderResearch && hasAchievements()) {
    sections.push({
      id: "research-achievements",
      type: "tables",
      title: heading("research-achievements", "Research Achievements"),
      icon: "clipboard",
      tables: achievementTables(),
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

  // Incubated startups — companies registered and grants received.
  if (content.startups && (content.startups.companies?.length || content.startups.grants?.length)) {
    const tables: DataTable[] = [];
    if (content.startups.companies?.length) {
      tables.push({
        title: `Startups Registered at BEC Incubation Centre (${content.startups.companies.length})`,
        columns: ["Startup", "Founder(s)", "Domain", "Established"],
        rows: content.startups.companies.map((c) => [c.name, c.founders, c.domain, c.established]),
      });
    }
    if (content.startups.grants?.length) {
      tables.push({
        title: "Grants Received",
        columns: ["Startup", "Project", "Funding Year", "Funding Agency", "Grant (₹ Lakh)"],
        rows: content.startups.grants.map((g) => [g.startup, g.project, g.year, g.agency, g.amount]),
      });
    }
    sections.push({ id: "startups", type: "tables", title: heading("startups", "Startups"), icon: "briefcase", tables });
  }

  // Free-form awards/achievements tables (faculty awards, student projects/participation, chapter awards).
  if (content.achievementTables?.length) {
    sections.push({
      id: "achievements",
      type: "tables",
      title: heading("achievements", "Awards & Achievements"),
      icon: "award",
      tables: content.achievementTables.map((t) => ({
        title: t.title,
        columns: t.columns,
        rows: t.rows,
      })),
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
  } else if (content.alumniRecords?.length) {
    const embeds = resolveDocuments(content.alumniRecords);
    if (embeds.length)
      sections.push({
        id: "alumni",
        type: "content",
        title: heading("alumni", "Alumni Records"),
        icon: "users",
        embeds,
      });
  }

  // Placements — year-wise summary, recruiters & packages, student-wise detail
  const placements = getDepartmentPlacements(contentKey);
  if (placements && (placements.yearWise.length || placements.batches.length)) {
    const tables: DataTable[] = [];
    if (placements.yearWise.length) {
      const summary = dropEmptyColumns(
        ["Year", "Students", "Offers", "On-Campus", "Off-Campus", "Placed", "Placement %", "Companies"],
        placements.yearWise.map((y) => [
          y.year,
          y.students ?? "",
          y.offers ?? "",
          y.onCampus ?? "",
          y.offCampus ?? "",
          y.placed ?? "",
          y.percent ? `${y.percent}%` : "",
          y.companies ?? "",
        ]),
      );
      tables.push({ title: "Year-wise Placement Summary", ...summary });
    }
    for (const batch of placements.batches) {
      if (batch.companies.length) {
        const recruiters = dropEmptyColumns(
          ["Company", "Package (LPA)", "Students Placed"],
          batch.companies.map((c) => [c.company, c.package, c.count]),
        );
        tables.push({
          title: `Recruiters & Packages — ${batch.batch} (${batch.companies.length})`,
          ...recruiters,
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
      groupPhoto: content.placementsPhoto
        ? {
            src: asset(content.placementsPhoto),
            alt: content.placementsPhotoCaption ?? `${content.name} — placed students`,
            caption: content.placementsPhotoCaption,
          }
        : undefined,
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
      imageGroups: content.facilitiesGallery
        ?.map((g) => ({
          title: g.title,
          images: g.images.map((key) => ({ src: asset(key), alt: g.title ?? `${content.name} facilities` })),
        }))
        .filter((g) => g.images.length),
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
        ? ` Faculty Coordinators (2025–2026): ${assoc.coordinators.join(" and ")}.`
        : "";
      groups.push({ subtitle: assoc.name, text: `${assoc.about ?? ""}${coords}`.trim() });
      if (assoc.exicom?.length)
        groups.push({
          subtitle: "Association Exicoms (2025–2026)",
          items: assoc.exicom.map((m) => ({ label: m.name, value: m.position })),
        });
    }
    // With no dated activities, the section is a student "Association", not an activities feed.
    const associationsOnly = !content.activities?.length && !!content.associations?.length;
    const defaultTitle = associationsOnly ? "Association" : "Activities & Forums";
    const assocPhoto = content.associations?.find((a) => a.photo);
    const groupPhoto = assocPhoto?.photo
      ? { src: asset(assocPhoto.photo), alt: assocPhoto.photoCaption ?? assocPhoto.name, caption: assocPhoto.photoCaption }
      : undefined;
    sections.push({ id: "activities", type: "content", title: heading("activities", defaultTitle), icon: "calendar", groups, groupPhoto });
  }

  // Activity programmes (SDPs, FDPs, workshops) — one titled table per category.
  if (content.activityTables?.length) {
    sections.push({
      id: "activity-programs",
      type: "tables",
      title: heading("activity-programs", "Activities"),
      icon: "calendar",
      tables: content.activityTables.map((t) => ({ title: t.title, columns: t.columns, rows: t.rows })),
    });
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
  const galleryImages = gallery.map((src, i) => ({
    src,
    alt: `${content.name} — facilities photo ${i + 1}`,
  }));
  if (content.infrastructureLabs?.length) {
    // Named labs (title + caption + images) render as content blocks; any
    // remaining department photos follow as a gallery group.
    const groups: ContentGroup[] = content.infrastructureLabs.map((lab) => ({
      subtitle: lab.name,
      text: lab.description,
      images: labImages(lab),
      largeImages: true,
    }));
    if (galleryImages.length) groups.push({ subtitle: "Photo Gallery", images: galleryImages });
    sections.push({
      id: "infrastructure",
      type: "content",
      title: heading("infrastructure", "Infrastructure & Labs"),
      icon: "building-2",
      groups,
    });
  } else if (galleryImages.length) {
    sections.push({
      id: "infrastructure",
      type: "gallery",
      title: heading("infrastructure", "Infrastructure & Labs"),
      images: galleryImages,
    });
  }

  // Newsletters (monthly department PDFs) — reuses the documents section.
  // Placed last, immediately before Contact.
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

  // Contact
  if (
    (content.contact && (content.contact.name || content.contact.email || content.contact.phone)) ||
    content.additionalContacts?.length
  ) {
    const c = content.contact;
    const people: { name?: string; designation?: string; phone?: string; email?: string }[] = [];
    if (c && (c.name || c.phone || c.email)) {
      people.push({ name: c.name, designation: c.designation, phone: c.phone, email: c.email });
    }
    if (content.additionalContacts?.length) people.push(...content.additionalContacts);
    sections.push({
      id: "contact",
      type: "contact",
      title: heading("contact", "Contact"),
      icon: "phone",
      people,
    });
  }

  // Attach extra PDFs to their sections (e.g. Research Centre Info under Research,
  // MoU Details under MoUs). The Curriculum tab keeps only scheme/syllabus, so
  // relocated documents surface alongside the section they belong to.
  if (content.sectionDocuments) {
    for (const section of sections) {
      if (!section.id) continue;
      if (section.type === "documents" || section.type === "stats" || section.type === "testimonials" || section.type === "contact") continue;
      const docs = resolveDocuments(content.sectionDocuments[section.id]);
      if (docs.length) section.attachments = docs;
    }
  }

  // Inline-embedded PDFs (rendered in a viewer, not a download link) under a section.
  if (content.sectionEmbeds) {
    for (const section of sections) {
      if (!section.id) continue;
      if (section.type === "documents" || section.type === "stats" || section.type === "testimonials" || section.type === "contact") continue;
      const docs = resolveDocuments(content.sectionEmbeds[section.id]);
      if (docs.length) section.embeds = docs;
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
    research: { label: "Research", icon: "clipboard" },
    "research-achievements": { label: "Research Achievements", icon: "clipboard" },
    publications: { label: "Publications", icon: "book" },
    patents: { label: "Patents", icon: "clipboard" },
    startups: { label: "Startups", icon: "briefcase" },
    achievements: { label: "Awards & Achievements", icon: "award" },
    alumni: { label: "Alumni", icon: "users" },
    placements: { label: "Placements", icon: "briefcase" },
    facilities: { label: "Facilities", icon: "building-2" },
    activities: { label: "Activities", icon: "calendar" },
    "activity-programs": { label: "Activities", icon: "calendar" },
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
    heroImage: content?.heroImage
      ? { src: asset(content.heroImage), alt: `${name} — department building` }
      : undefined,
    quickStats: content ? quickStats(contentKey, content) : undefined,
    quickFacts:
      content?.quickFacts?.facts?.length && content.quickFacts.researchAreas?.length
        ? { facts: content.quickFacts.facts, researchAreas: content.quickFacts.researchAreas }
        : undefined,
    overview: {
      title: "Overview",
      content:
        content?.overview ??
        "Department overview will be updated soon. Explore the available sections from the menu.",
      items: content?.values,
      icon: "book",
      image: content?.overviewImage
        ? {
            src: asset(content.overviewImage),
            alt: content.overviewImageCaption ?? `${name} — faculty and staff`,
            caption: content.overviewImageCaption,
          }
        : undefined,
    },
    about: content?.about
      ? {
          title: "About the Department",
          content: content.about,
          icon: "graduation-cap",
        }
      : undefined,
    hodMessage: content?.hodMessage
      ? {
          message: content.hodMessage.message,
          name: content.hodMessage.name,
          designation: content.hodMessage.designation,
          image: content.hodMessage.image
            ? { src: asset(content.hodMessage.image), alt: content.hodMessage.name ?? "Head of Department" }
            : undefined,
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
    homeGroupPhoto: content?.homeGroupPhoto
      ? {
          src: asset(content.homeGroupPhoto),
          alt: content.homeGroupPhotoCaption ?? `${name} — graduating batch`,
          caption: content.homeGroupPhotoCaption,
        }
      : undefined,
    sidebar,
    sections,
  };
}

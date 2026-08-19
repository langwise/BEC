/**
 * Which folders on R2 are galleries, and where each one shows up on the site.
 *
 * A gallery is not a content file. Nothing lists its photos: the page calls
 * `assetsUnder("some/prefix/")` and the *manifest* decides what is in it. So
 * adding a photo to a gallery means registering its key, and removing one means
 * unregistering it — the bytes are untouched either way. Keys are immutable,
 * and the cleanup screen is what eventually deletes anything.
 *
 * The registry is hand-maintained, for the same reason [10] chose a hand-kept
 * protected-prefix list: a prefix carries a label, a page and a reason, none of
 * which can be derived from a key. What *is* derivable is whether it is
 * complete, and `galleries.test.ts` checks exactly that — every literal
 * `assetsUnder(…)` on the site must appear here or the test fails.
 */

import { departmentCategories, departmentHref } from "../../data/departments-catalog.ts";
import { fileNameOf, folderLabel, labelFor } from "./asset-tree.ts";

export type Gallery = {
  /** R2 key prefix with its trailing slash. Unique — it is also the id. */
  prefix: string;
  label: string;
  /** Heading this gallery is listed under. */
  group: string;
  /** Where on the site these photos appear. */
  page: string;
  /** What the gallery is, in a sentence an Editor can act on. */
  note: string;
  /**
   * Key fragments the page itself leaves out of the gallery — a hero photo it
   * shows at the top, a portrait beside the text, a logo, or a picture somebody
   * decided not to show. They sit in the folder but are not part of the
   * gallery, so the screen lists them apart and will not remove them: a hero
   * unregistered here would still render (`asset()` falls back to the plain R2
   * URL) right up until the cleanup screen deleted it as unused.
   */
  hidden?: readonly string[];
};

export const GALLERY_GROUPS = [
  "Campus & student life",
  "Cells & centres",
  "Placements & facilities",
  "Departments",
] as const;

/**
 * Every literal `assetsUnder(…)` on the site, in the order the groups above
 * list them. Each `hidden` list mirrors that page's own filter — keep them in
 * step; the test knows when a page grew one.
 */
export const SITE_GALLERIES: readonly Gallery[] = [
  {
    prefix: "gallery/life-at-bec/campus/",
    label: "Campus in Pictures",
    group: "Campus & student life",
    page: "/institute/gallery",
    note: "The main photo gallery — academics, events, festivals and everyday campus life.",
    hidden: [
      "cine0091",
      "cine0894",
      "cine0899",
      "cine1063",
      "cine1149",
      "cine1229",
      "cine1250",
      "cine1456",
      "cine1515",
      "cine1524",
      "cine1540",
      "cine1555",
      "cine1708",
      "cine1731",
      "cine1734",
      "cine1735",
      "cine1830",
      "cine2007",
    ],
  },
  {
    prefix: "student-life/cultural/",
    label: "Cultural activities",
    group: "Campus & student life",
    page: "/student-life/activities",
    note: "Cultural events, shown alongside the Engineers' Arena photos.",
  },
  {
    prefix: "student-life/engineers-arena/",
    label: "Engineers' Arena",
    group: "Campus & student life",
    page: "/student-life/activities",
    note: "The technical festival, shown alongside the cultural photos.",
  },
  {
    prefix: "student-life/nss/",
    label: "NSS",
    group: "Campus & student life",
    page: "/student-life/nss",
    note: "Plantation drives, camps and rallies on the NSS page.",
    // The page's own hero and the coordinator's portrait.
    hidden: ["cine0944.webp", "dr-s-k-patil.webp"],
  },
  {
    prefix: "student-life/bec-fm/",
    label: "BEC FM",
    group: "Campus & student life",
    page: "/student-life/bec-fm",
    note: "The campus radio station's photographs.",
  },
  {
    prefix: "student-life/bec-creative-spectrum/",
    label: "Creative Spectrum",
    group: "Campus & student life",
    page: "/student-life/bec-creative-spectrum",
    note: "Club activities on the Creative Spectrum page, in file-name order.",
    // The page's own banner.
    hidden: ["bec-creative-spectrum.webp"],
  },
  {
    prefix: "cells/step/",
    label: "BEC-STEP",
    group: "Cells & centres",
    page: "/institute/cells/step",
    note: "Activities at the Science & Technology Entrepreneurs Park.",
    // The coordinator's portrait, shown beside the text.
    hidden: ["dr-b-s-angadi"],
  },
  {
    prefix: "cells/iic/gallery/",
    label: "Institution's Innovation Council",
    group: "Cells & centres",
    page: "/institute/cells/iic",
    note: "IIC events and workshops.",
  },
  {
    prefix: "cells/nain/gallery/",
    label: "NAIN (2016–2021)",
    group: "Cells & centres",
    page: "/institute/cells/nain",
    note: "Photographs from the first phase of the NAIN centre.",
  },
  {
    prefix: "placements/cell/",
    label: "Placement cell",
    group: "Placements & facilities",
    page: "/placements/facilities",
    note: "The placement cell's own rooms and facilities.",
  },
  {
    prefix: "administration/dean-ict/",
    label: "ICT infrastructure",
    group: "Placements & facilities",
    page: "/institute/dean-ict",
    note: "Computing and network infrastructure on the Dean (ICT) page.",
  },
  {
    prefix: "facilities/amenities/admission-section/",
    label: "Administrative offices",
    group: "Placements & facilities",
    page: "/institute/campus/amenities",
    note: "The admission section and administrative offices.",
  },
];

/** How many NAIN 2.0 project cards the page draws photos for. */
const NAIN_PROJECTS = 10;

/**
 * One folder per NAIN 2.0 project card. The card is numbered on the page, so
 * the number is the label an Editor can match up — the project titles live in
 * the page's own code and copying them here would only rot.
 */
export const NAIN_PROJECT_GALLERIES: readonly Gallery[] = Array.from(
  { length: NAIN_PROJECTS },
  (_, index) => ({
    prefix: `cells/nain/v2/projects/${index + 1}/`,
    label: `NAIN 2.0 — project ${index + 1}`,
    group: "Cells & centres",
    page: "/institute/cells/nain",
    note: `Thumbnails on project card ${index + 1} of the NAIN 2.0 tab.`,
  }),
);

export type DepartmentGalleryInput = {
  /** The key in departments.json, e.g. "civil-engg" or "pg/machine-design". */
  key: string;
  name: string;
  assetSlug?: string;
};

/**
 * The curated `gallery/` folder each department has, appended to the end of its
 * Photo Gallery section in file-name order.
 *
 * Only departments with an `assetSlug`: the eight PG programmes have none, and
 * `getDepartmentGalleryExtra` returns nothing without one — so offering the
 * folder would let an Editor upload photos that never appear anywhere. (Four
 * such folders already hold photos nobody can see; that is [21]'s to fix, not
 * something to paper over with a screen that pretends otherwise.)
 *
 * The department's *other* photos — the scene shots directly under
 * `departments/<slug>/` — are deliberately not here. They are entangled with
 * the `galleryExclude` list in departments.json, which is the departments
 * editor's to own.
 */
export function departmentGalleries(
  departments: readonly DepartmentGalleryInput[],
): Gallery[] {
  return departments
    .filter((department) => department.assetSlug)
    .map((department) => ({
      prefix: `departments/${department.assetSlug}/gallery/`,
      label: department.name,
      group: "Departments",
      page: departmentPage(department.key),
      note: "Photos on this department's Photo Gallery section, after the scene photos.",
    }));
}

/**
 * The department's page on the site. Content keys and route slugs are the same
 * string except for the PG programmes, which carry their category as a prefix —
 * and matching on the last segment alone would send `pg/computer-science-and-engg`
 * to the UG department's page.
 */
export function departmentPage(contentKey: string): string {
  const cut = contentKey.indexOf("/");
  const type = cut === -1 ? null : contentKey.slice(0, cut);
  const slug = cut === -1 ? contentKey : contentKey.slice(cut + 1);

  for (const category of departmentCategories) {
    if (type && category.key !== type) continue;
    if (category.departments.some((entry) => entry.slug === slug)) {
      return departmentHref(category.key, slug);
    }
  }
  return "/departments";
}

export function allGalleries(departments: readonly DepartmentGalleryInput[]): Gallery[] {
  return [...SITE_GALLERIES, ...NAIN_PROJECT_GALLERIES, ...departmentGalleries(departments)];
}

export function findGallery(
  galleries: readonly Gallery[],
  prefix: string,
): Gallery | undefined {
  return galleries.find((gallery) => gallery.prefix === prefix);
}

/** The galleries of one group, in registry order. */
export function inGroup(galleries: readonly Gallery[], group: string): Gallery[] {
  return galleries.filter((gallery) => gallery.group === group);
}

export type GalleryPhotos = {
  /** In the gallery on the site, in the order the site shows them. */
  shown: string[];
  /** In the folder, but not part of the gallery — see `Gallery.hidden`. */
  hidden: string[];
};

/**
 * Split the folder's keys into what the site shows and what it does not.
 *
 * Everything *under* the prefix, not just its direct children, because that is
 * what `assetsUnder` does — the NAIN gallery files one photo per event
 * subfolder, and a screen that only listed the top level would show that
 * gallery as empty while the site drew eight pictures. Sorted by key, which is
 * also the order the site puts them in.
 *
 * One key can be the prefix itself — `student-life/bec-creative-spectrum/` is a
 * real manifest entry, a leftover folder marker with no file name. It is
 * neither shown nor removable, so it is simply not a photo.
 */
export function photosOf(keys: readonly string[], gallery: Gallery): GalleryPhotos {
  const shown: string[] = [];
  const hidden: string[] = [];
  for (const key of keys.filter((key) => key.startsWith(gallery.prefix)).sort()) {
    if (!fileNameOf(key)) continue;
    (isHidden(key, gallery) ? hidden : shown).push(key);
  }
  return { shown, hidden };
}

/**
 * What a tile is called. Most galleries are flat, where the file name is the
 * whole story; the ones that are not have a folder per event, and "1.webp"
 * eight times over tells an Editor nothing.
 */
export function photoLabel(key: string, gallery: Gallery): string {
  const rest = key.startsWith(gallery.prefix) ? key.slice(gallery.prefix.length) : key;
  const cut = rest.lastIndexOf("/");
  return cut === -1 ? labelFor(key) : `${folderLabel(rest.slice(0, cut))} — ${labelFor(key)}`;
}

export function isHidden(key: string, gallery: Gallery): boolean {
  return gallery.hidden?.some((fragment) => key.includes(fragment)) ?? false;
}

/**
 * Whether this screen may add or remove `key` in `gallery` — the one rule the
 * publish route enforces, kept here so the button and the server agree.
 */
export function isManageable(key: string, gallery: Gallery): boolean {
  if (!key.startsWith(gallery.prefix)) return false;
  // The folder itself, or a folder marker deeper in it: not a photo, and
  // unregistering one would change nothing on the site anyway.
  const rest = key.slice(gallery.prefix.length);
  if (!rest || rest.endsWith("/")) return false;
  return !isHidden(key, gallery);
}

/**
 * A ceiling on how many photos one publish may unregister. Nothing an Editor
 * does here is destructive — the bytes stay, and the commit reverts — but a
 * bulk removal is still the shape of an accident, and [10] asked for the cap.
 * Well above "I picked the wrong ten", well below "the gallery is gone".
 */
export const MAX_REMOVALS = 50;

/** And a ceiling on additions, which each cost a round trip to the bucket. */
export const MAX_ADDITIONS = 100;

/**
 * What is wrong with a submitted change, in a sentence for the Editor — or null
 * when there is nothing wrong with it. The screen never offers an invalid
 * change, so this is the server refusing a request that did not come from the
 * screen: the payload is a list of keys, and without this, one could name
 * `governance/principal.webp` and take the Principal's portrait off the site.
 */
export function galleryChangeProblem({
  gallery,
  add,
  remove,
}: {
  gallery: Gallery;
  add: readonly string[];
  remove: readonly string[];
}): string | null {
  if (add.length === 0 && remove.length === 0) return null;
  if (remove.length > MAX_REMOVALS) {
    return `That would remove ${remove.length} photos at once. Please do it in batches of ${MAX_REMOVALS} or fewer.`;
  }
  if (add.length > MAX_ADDITIONS) {
    return `That is ${add.length} photos in one go. Please publish them in batches of ${MAX_ADDITIONS} or fewer.`;
  }

  const both = add.find((key) => remove.includes(key));
  if (both) return `“${fileNameOf(both)}” is being added and removed at the same time.`;

  for (const key of [...add, ...remove]) {
    if (isHidden(key, gallery)) {
      return `“${fileNameOf(key)}” is used elsewhere on that page, so it is not this gallery's to change.`;
    }
    if (!isManageable(key, gallery)) {
      return `“${key}” is not in the ${gallery.label} folder.`;
    }
  }
  return null;
}

/**
 * The commit an Editor's gallery change lands as. The prefix goes in the
 * subject, the way a content publish puts the file name there — it is the thing
 * that changed, and a department's full name would run the subject past 72
 * characters on its own.
 */
export function galleryCommitMessage({
  gallery,
  added,
  removed,
  editorName,
}: {
  gallery: Gallery;
  added: number;
  removed: number;
  editorName: string;
}): string {
  const parts: string[] = [];
  if (added) parts.push(`added ${added} ${added === 1 ? "photo" : "photos"}`);
  if (removed) parts.push(`removed ${removed} ${removed === 1 ? "photo" : "photos"}`);
  const name = editorName.replace(/\s+/g, " ").trim();

  return [
    `chore(assets): update ${gallery.prefix} via Admin`,
    "",
    `${gallery.label}: ${parts.join(", ")}.`,
    `Edited by ${name}.`,
  ].join("\n");
}

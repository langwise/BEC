/**
 * Folders the cleanup screen must never offer to delete.
 *
 * Most references can be read out of the source ([10]'s scan): a literal
 * `asset("documents/naac/ssr.pdf")` is findable, and so is every key sitting in
 * a content file. Two kinds are not:
 *
 *   1. `assetsUnder("cells/step/")` — the page draws *whatever is in the
 *      folder*, so the folder is the reference and the individual keys are
 *      invisible to any scan of the code.
 *   2. `asset(`facilities/hostels/${block}/1.webp`)` — the key does not exist
 *      as text anywhere. 80 live files are referenced this way and nothing
 *      short of running the site would find them.
 *
 * So folders are protected by name, by hand, in this file — and
 * `protected-prefixes.test.ts` fails the moment the site grows a call site this
 * list does not cover. A missing entry is not a lint warning; it is a screen
 * offering to delete photographs that are on a live page.
 *
 * Cost of the blunt entry: `departments/` protects all 1,944 department keys
 * rather than the 17 slugs that have pages, which hides perhaps 123 deletable
 * objects. Cheap insurance — the alternative re-derives per-slug prefixes from
 * the catalogue, and the day somebody renames an `assetSlug` those 1,944 keys
 * become deletable at once.
 */

export type ProtectedPrefix = {
  prefix: string;
  /** Why it cannot be scanned — read this before removing an entry. */
  why: string;
};

export const PROTECTED_PREFIXES: readonly ProtectedPrefix[] = [
  // --- Folders a page draws whole, named literally --------------------------
  { prefix: "administration/dean-ict/", why: "ICT dean's infrastructure strip" },
  { prefix: "cells/iic/gallery/", why: "IIC gallery" },
  { prefix: "cells/nain/gallery/", why: "NAIN 1.0 gallery" },
  { prefix: "cells/step/", why: "STEP gallery" },
  { prefix: "facilities/amenities/admission-section/", why: "Admission office photos" },
  { prefix: "placements/cell/", why: "Placement cell photos" },
  { prefix: "student-life/bec-creative-spectrum/", why: "Creative Spectrum gallery" },
  { prefix: "student-life/bec-fm/", why: "BEC FM gallery" },
  { prefix: "student-life/cultural/", why: "Cultural activities gallery" },
  { prefix: "student-life/engineers-arena/", why: "Engineers' Arena gallery" },
  { prefix: "student-life/nss/", why: "NSS gallery" },

  // --- Folders drawn whole through a variable or a template literal ---------
  {
    prefix: "gallery/life-at-bec/campus/",
    why: "Campus in Pictures — the gallery page loops over albums, so the prefix reaches assetsUnder as album.prefix",
  },
  {
    prefix: "departments/",
    why: "Every department page: assetsUnder(`departments/${assetSlug}/`) and its /gallery/ — deliberately blunt, see the header",
  },
  {
    prefix: "cells/nain/v2/projects/",
    why: "NAIN 2.0 project galleries: assetsUnder(`.../projects/${project.no}/`)",
  },
  {
    prefix: "cells/nain/v2/center/",
    why: "NAIN 2.0 centre photos: asset(`.../center/${n}.webp`)",
  },
  {
    prefix: "cells/nain/v2/guides/",
    why: "NAIN 2.0 guide portraits: asset(`.../guides/${g.slug}.webp`)",
  },
  {
    prefix: "cells/iipc/gallery/",
    why: "IIPC activities: asset(`.../iipc-activities-${n}.webp`)",
  },
  {
    prefix: "facilities/hostels/",
    why: "All three hostel pages: asset(`facilities/hostels/<block>/${key}.webp`)",
  },
];

/**
 * The files that build an asset key at runtime, each with the folders it
 * reaches. Acknowledged one by one: the test refuses an unlisted file, so a new
 * template-literal call site is a decision somebody makes rather than a hole
 * that opens quietly.
 */
export const DYNAMIC_ASSET_SITES: readonly { file: string; covers: readonly string[] }[] = [
  { file: "app/(site)/hostel/page.tsx", covers: ["facilities/hostels/"] },
  { file: "app/(site)/hostel/v-block/page.tsx", covers: ["facilities/hostels/"] },
  { file: "app/(site)/hostel/malaprabha-block/page.tsx", covers: ["facilities/hostels/"] },
  { file: "app/(site)/institute/cells/iipc/page.tsx", covers: ["cells/iipc/gallery/"] },
  {
    file: "app/(site)/institute/cells/nain/nain-tabs.tsx",
    covers: ["cells/nain/v2/center/", "cells/nain/v2/guides/", "cells/nain/v2/projects/"],
  },
  {
    file: "app/(site)/institute/gallery/page.tsx",
    covers: ["gallery/life-at-bec/campus/"],
  },
  { file: "content/departments.ts", covers: ["departments/"] },
];

/** Whether `key` sits in a folder some page draws whole. */
export function isProtectedKey(key: string): boolean {
  return PROTECTED_PREFIXES.some(({ prefix }) => key.startsWith(prefix));
}

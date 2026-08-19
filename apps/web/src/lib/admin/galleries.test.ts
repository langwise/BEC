import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";

import {
  allGalleries,
  departmentGalleries,
  findGallery,
  galleryChangeProblem,
  galleryCommitMessage,
  isManageable,
  MAX_REMOVALS,
  photoLabel,
  photosOf,
  SITE_GALLERIES,
  NAIN_PROJECT_GALLERIES,
  type Gallery,
} from "./galleries.ts";

const SRC = fileURLToPath(new URL("../../", import.meta.url));

/** Every .ts/.tsx under `dir`, relative to src/. */
function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (relative: string): void => {
    for (const entry of readdirSync(`${SRC}${relative}`, { withFileTypes: true })) {
      const next = `${relative}/${entry.name}`;
      if (entry.isDirectory()) walk(next);
      else if (/\.tsx?$/.test(entry.name)) out.push(next.slice(1));
    }
  };
  walk(`/${dir}`);
  return out;
}

/**
 * Every `assetsUnder(…)` on the site, with its argument as written. None of the
 * arguments contain a `)`, so the first one closes the call; Prettier wraps a
 * long one onto its own line and leaves a trailing comma behind.
 */
function assetsUnderCalls(): { file: string; arg: string }[] {
  const calls: { file: string; arg: string }[] = [];
  for (const dir of ["app", "content", "components", "data"]) {
    for (const file of sourceFiles(dir)) {
      const text = readFileSync(`${SRC}${file}`, "utf8");
      for (const match of text.matchAll(/assetsUnder\(([^)]+)\)/g)) {
        calls.push({ file, arg: match[1].trim().replace(/,$/, "").trim() });
      }
    }
  }
  return calls;
}

/**
 * Call sites whose prefix is not a plain string, each with why the registry
 * still covers it (or deliberately does not). [10] asked for exactly this: a
 * static scan cannot see through a template literal, so the ones that exist are
 * acknowledged by hand and anything new fails the test.
 */
const KNOWN_INDIRECT: { file: string; arg: string }[] = [
  // The album list on the gallery page; its single prefix is registered.
  { file: "app/(site)/institute/gallery/page.tsx", arg: "album.prefix" },
  // One folder per project card — NAIN_PROJECT_GALLERIES covers 1–10.
  {
    file: "app/(site)/institute/cells/nain/nain-tabs.tsx",
    arg: "`cells/nain/v2/projects/${project.no}/`",
  },
  // A department's scene photos: entangled with galleryExclude in
  // departments.json, so the departments editor owns them, not this screen.
  { file: "content/departments.ts", arg: "`departments/${assetSlug}/`" },
  // Covered by departmentGalleries().
  { file: "content/departments.ts", arg: "`departments/${assetSlug}/gallery/`" },
];

const DEPARTMENTS = [
  { key: "civil-engg", name: "Civil Engineering", assetSlug: "civil" },
  { key: "mca", name: "Master of Computer Applications (MCA)", assetSlug: "mca" },
  { key: "pg/computer-science-and-engg", name: "M.Tech. in CSE" },
];

describe("the gallery registry", () => {
  test("covers every literal assetsUnder() prefix on the site", () => {
    const registered = new Set(allGalleries(DEPARTMENTS).map((gallery) => gallery.prefix));
    const missing = assetsUnderCalls()
      .filter((call) => /^"[^"]+"$/.test(call.arg))
      .map((call) => ({ ...call, prefix: call.arg.slice(1, -1) }))
      .filter((call) => !registered.has(call.prefix));

    assert.deepEqual(
      missing,
      [],
      `A page draws a gallery the Admin does not know about. Add it to SITE_GALLERIES:\n${missing
        .map((call) => `  ${call.prefix} (${call.file})`)
        .join("\n")}`,
    );
  });

  test("every non-literal call site is one that was looked at", () => {
    const acknowledged = new Set(KNOWN_INDIRECT.map((call) => `${call.file}::${call.arg}`));
    const surprises = assetsUnderCalls()
      .filter((call) => !/^"[^"]+"$/.test(call.arg))
      .filter((call) => !acknowledged.has(`${call.file}::${call.arg}`));

    assert.deepEqual(
      surprises,
      [],
      "A gallery prefix is being built at runtime. Nothing static can see it — decide what it means and list it in KNOWN_INDIRECT.",
    );
  });

  test("a page that filters its gallery has the reason recorded here", () => {
    // Not the filter's *contents* — those are substring tests this file cannot
    // usefully re-derive — but its existence. A page that grew one and left the
    // Admin thinking every photo in the folder is on the site would let an
    // Editor unregister a hero image.
    const filtered = assetsUnderCalls()
      .filter((call) => /^"[^"]+"$/.test(call.arg))
      .map((call) => ({ call, prefix: call.arg.slice(1, -1) }))
      .filter(({ call, prefix }) => {
        const text = readFileSync(`${SRC}${call.file}`, "utf8");
        const at = text.indexOf(`"${prefix}"`);
        const statement = text.slice(at, text.indexOf(";", at));
        return statement.includes(".filter(");
      })
      .map(({ prefix }) => prefix)
      .filter((prefix) => !findGallery(SITE_GALLERIES, prefix)?.hidden?.length);

    assert.deepEqual(filtered, []);
  });

  test("the campus album's exclusions are the ones the page actually applies", () => {
    const page = readFileSync(
      `${SRC}app/(site)/institute/gallery/page.tsx`,
      "utf8",
    );
    const block = /exclude:\s*\[([^\]]*)\]/.exec(page);
    assert.ok(block, "the campus album no longer has an exclude list");
    const onThePage = [...block[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);

    const gallery = findGallery(SITE_GALLERIES, "gallery/life-at-bec/campus/");
    assert.deepEqual([...(gallery?.hidden ?? [])].sort(), [...onThePage].sort());
  });

  test("every registered gallery links to a page and reads as a sentence", () => {
    for (const gallery of allGalleries(DEPARTMENTS)) {
      assert.match(gallery.prefix, /\/$/, `${gallery.prefix} must end with a slash`);
      assert.match(gallery.page, /^\//, `${gallery.label} has no page`);
      assert.ok(gallery.label.length > 2, `${gallery.prefix} has no label`);
      assert.match(gallery.note, /\.$/, `${gallery.label}'s note is not a sentence`);
    }
  });

  test("no two galleries share a prefix", () => {
    const prefixes = allGalleries(DEPARTMENTS).map((gallery) => gallery.prefix);
    assert.equal(new Set(prefixes).size, prefixes.length);
  });

  test("there is one folder per NAIN project card", () => {
    assert.deepEqual(
      NAIN_PROJECT_GALLERIES.map((gallery) => gallery.prefix),
      Array.from({ length: 10 }, (_, i) => `cells/nain/v2/projects/${i + 1}/`),
    );
  });
});

describe("departmentGalleries", () => {
  test("skips departments with no asset folder of their own", () => {
    // The PG programmes have no assetSlug, so getDepartmentGalleryExtra returns
    // nothing for them — offering the folder would invite photos nobody sees.
    assert.deepEqual(
      departmentGalleries(DEPARTMENTS).map((gallery) => gallery.prefix),
      ["departments/civil/gallery/", "departments/mca/gallery/"],
    );
  });

  test("sends a PG programme to the PG route", () => {
    const [pg] = departmentGalleries([
      { key: "pg/structural-engg", name: "M.Tech. in Structural Engineering", assetSlug: "pg-str" },
    ]);
    assert.equal(pg.page, "/departments/pg/structural-engg");
  });

  test("does not hand a PG programme its UG namesake's page", () => {
    // PG CSE has no page of its own today — the catalogue entry is commented
    // out — and matching on the last path segment alone would have sent it to
    // the UG department, which is a different department entirely.
    const [pg] = departmentGalleries([
      { key: "pg/computer-science-and-engg", name: "M.Tech. in CSE", assetSlug: "pg-cse" },
    ]);
    assert.equal(pg.page, "/departments");
  });

  test("a department the catalogue has never heard of still gets a link", () => {
    const [unknown] = departmentGalleries([
      { key: "underwater-basket-weaving", name: "Weaving", assetSlug: "weaving" },
    ]);
    assert.equal(unknown.page, "/departments");
  });
});

const NSS = findGallery(SITE_GALLERIES, "student-life/nss/") as Gallery;

describe("photosOf", () => {
  const keys = [
    "student-life/nss/plantation-b.webp",
    "student-life/nss/plantation-a.webp",
    "student-life/nss/dr-s-k-patil.webp",
    "student-life/nss/cine0944.webp",
    "student-life/nss/2019/camp.webp",
    "student-life/nss-extra/other.webp",
    "student-life/bec-fm/studio.webp",
  ];

  test("shows the folder's own photos, in the order the site will", () => {
    assert.deepEqual(photosOf(keys, NSS).shown, [
      "student-life/nss/2019/camp.webp",
      "student-life/nss/plantation-a.webp",
      "student-life/nss/plantation-b.webp",
    ]);
  });

  test("holds back the ones the page uses elsewhere", () => {
    assert.deepEqual(photosOf(keys, NSS).hidden, [
      "student-life/nss/cine0944.webp",
      "student-life/nss/dr-s-k-patil.webp",
    ]);
  });

  test("reaches into subfolders, because the site does", () => {
    // The NAIN gallery files one photo per event folder. `assetsUnder` is
    // recursive, so a screen that listed only the top level would call that
    // gallery empty while the page drew eight pictures.
    assert.ok(photosOf(keys, NSS).shown.includes("student-life/nss/2019/camp.webp"));
  });

  test("stops at the folder's edge", () => {
    const found = photosOf(keys, NSS);
    const all = [...found.shown, ...found.hidden];
    assert.ok(!all.some((key) => key.startsWith("student-life/nss-extra/")));
    assert.ok(!all.some((key) => key.startsWith("student-life/bec-fm/")));
  });

  test("names a photo by its folder when the folder is what tells them apart", () => {
    const nain = findGallery(SITE_GALLERIES, "cells/nain/gallery/") as Gallery;
    assert.equal(
      photoLabel("cells/nain/gallery/2-hackathon/1.webp", nain),
      "2 hackathon — 1",
    );
    assert.equal(photoLabel("student-life/nss/tree-drive.webp", NSS), "Tree drive");
  });

  test("a leftover folder marker is not a photo", () => {
    // `student-life/bec-creative-spectrum/` is a real manifest entry with no
    // file name at all; the site filters it out and so does this.
    const spectrum = findGallery(
      SITE_GALLERIES,
      "student-life/bec-creative-spectrum/",
    ) as Gallery;
    const found = photosOf(
      ["student-life/bec-creative-spectrum/", "student-life/bec-creative-spectrum/a.webp"],
      spectrum,
    );
    assert.deepEqual(found.shown, ["student-life/bec-creative-spectrum/a.webp"]);
    assert.deepEqual(found.hidden, []);
  });
});

describe("isManageable", () => {
  test("accepts a photo sitting directly in the folder", () => {
    assert.equal(isManageable("student-life/nss/camp.webp", NSS), true);
  });

  test("accepts a photo in a subfolder, which the page draws just the same", () => {
    assert.equal(isManageable("student-life/nss/2019/camp.webp", NSS), true);
  });

  test("refuses another folder, and the folder marker itself", () => {
    assert.equal(isManageable("governance/principal.webp", NSS), false);
    assert.equal(isManageable("student-life/nss/", NSS), false);
    assert.equal(isManageable("student-life/nss/2019/", NSS), false);
  });

  test("refuses a photo the page uses elsewhere", () => {
    // Unregistering the NSS hero would not break the page today — asset() falls
    // back to the plain R2 URL — it would break it whenever the cleanup screen
    // next deleted an unreferenced object.
    assert.equal(isManageable("student-life/nss/cine0944.webp", NSS), false);
  });
});

describe("galleryChangeProblem", () => {
  const change = (add: string[], remove: string[] = []) =>
    galleryChangeProblem({ gallery: NSS, add, remove });

  test("an ordinary add and remove is fine", () => {
    assert.equal(
      change(["student-life/nss/new.webp"], ["student-life/nss/old.webp"]),
      null,
    );
  });

  test("refuses a key from outside the folder", () => {
    // The screen cannot offer this; a hand-made request could, and unregistering
    // the Principal's portrait is exactly the shape of the damage to prevent.
    const problem = change([], ["governance/principal-photo.webp"]);
    assert.match(problem ?? "", /not in the NSS folder/);
  });

  test("refuses a photo the page uses elsewhere, and says why", () => {
    const problem = change([], ["student-life/nss/cine0944.webp"]);
    assert.match(problem ?? "", /used elsewhere on that page/);
  });

  test("refuses adding and removing the same photo", () => {
    const key = "student-life/nss/camp.webp";
    assert.match(change([key], [key]) ?? "", /added and removed/);
  });

  test("caps how many photos can go in one publish", () => {
    const many = Array.from(
      { length: MAX_REMOVALS + 1 },
      (_, i) => `student-life/nss/photo-${i}.webp`,
    );
    assert.match(change([], many) ?? "", /batches/);
  });

  test("changing nothing is not a problem", () => {
    assert.equal(change([], []), null);
  });
});

describe("galleryCommitMessage", () => {
  test("names the folder in the subject and the gallery in the body", () => {
    const message = galleryCommitMessage({
      gallery: NSS,
      added: 3,
      removed: 1,
      editorName: "Priya  \n Kulkarni",
    });
    assert.equal(
      message,
      [
        "chore(assets): update student-life/nss/ via Admin",
        "",
        "NSS: added 3 photos, removed 1 photo.",
        "Edited by Priya Kulkarni.",
      ].join("\n"),
    );
  });

  test("every subject fits in 72 characters, longest gallery included", () => {
    for (const gallery of allGalleries(DEPARTMENTS)) {
      const [subject] = galleryCommitMessage({
        gallery,
        added: 1,
        removed: 0,
        editorName: "Someone",
      }).split("\n");
      assert.ok(subject.length <= 72, `${subject} is ${subject.length} characters`);
    }
  });
});

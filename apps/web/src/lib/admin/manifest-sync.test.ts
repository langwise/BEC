import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, describe } from "node:test";
import { manifestKeys, parseManifest } from "../asset-manifest-io.ts";
import {
  ASSET_KEYS_REPO_PATH,
  collectKeyCandidates,
  manifestCommitFiles,
  MANIFEST_REPO_PATH,
  renderAssetKeys,
  unregisteredCandidates,
} from "./manifest-sync.ts";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..", "..", "..");
const MANIFEST = readFileSync(join(webRoot, "src", "data", "asset-manifest.ts"), "utf8");
const ASSET_KEYS = readFileSync(
  join(webRoot, "content", "_schema", "asset-keys.json"),
  "utf8",
);

const BASE = "https://pub-test.r2.dev";

describe("collectKeyCandidates", () => {
  test("finds asset keys wherever they sit in a document", () => {
    const data = {
      hero: "institute/campus.webp",
      people: [{ photo: "governance/principal.webp", name: "Someone" }],
      docs: { nested: { deeper: [{ file: "documents/notice.pdf" }] } },
    };
    assert.deepEqual(
      [...collectKeyCandidates(data)].sort(),
      ["documents/notice.pdf", "governance/principal.webp", "institute/campus.webp"],
    );
  });

  test("ignores prose, routes and urls that are not keys", () => {
    const data = {
      title: "Admissions open for 2026-27",
      href: "/academics/programmes/ug",
      site: "https://becbgk.edu/photo.webp",
      count: 12,
      flag: true,
      missing: null,
    };
    assert.deepEqual([...collectKeyCandidates(data)], []);
  });

  test("picks an attached PDF out of a news item and leaves its neighbours alone", () => {
    // The three link modes of [09] in one document: only the attachment is ours
    // to register, and it is registered without the editor listing it anywhere.
    const data = {
      news: [
        { date: "2026-08-01", title: "Exam notice", link: "documents/news/notice-k3f9wq.pdf" },
        { date: "2026-07-30", title: "Admissions open", link: "/admissions" },
        { date: "2026-07-28", title: "VTU circular", link: "https://vtu.ac.in/circular.pdf" },
        { date: "2026-07-27", title: "Holiday" },
      ],
    };
    assert.deepEqual([...collectKeyCandidates(data)], ["documents/news/notice-k3f9wq.pdf"]);
  });

  test("the same key referenced twice is one candidate", () => {
    const data = { a: "gallery/x.webp", b: "gallery/x.webp" };
    assert.equal(collectKeyCandidates(data).size, 1);
  });
});

describe("unregisteredCandidates", () => {
  test("keeps only what the manifest has never heard of", () => {
    const data = { a: "gallery/old.webp", b: "gallery/new.webp" };
    assert.deepEqual(unregisteredCandidates(data, ["gallery/old.webp"]), [
      "gallery/new.webp",
    ]);
  });

  test("a document referencing only known keys needs no registration", () => {
    const data = { a: "gallery/old.webp" };
    assert.deepEqual(unregisteredCandidates(data, ["gallery/old.webp"]), []);
  });
});

describe("renderAssetKeys", () => {
  test("reproduces the checked-in asset-keys.json byte for byte", () => {
    assert.equal(renderAssetKeys(manifestKeys(MANIFEST)), ASSET_KEYS);
  });

  test("sorts, so the file does not churn on key order", () => {
    const enumerated = JSON.parse(renderAssetKeys(["b.webp", "a.webp"])) as {
      enum: string[];
    };
    assert.deepEqual(enumerated.enum, ["a.webp", "b.webp"]);
  });
});

describe("manifestCommitFiles", () => {
  test("nothing new means nothing to commit", () => {
    assert.deepEqual(
      manifestCommitFiles({ manifestText: MANIFEST, baseUrl: BASE, additions: [] }),
      [],
    );
  });

  test("a key already in the manifest is not a change", () => {
    const [existing] = manifestKeys(MANIFEST);
    assert.deepEqual(
      manifestCommitFiles({
        manifestText: MANIFEST,
        baseUrl: BASE,
        additions: [existing],
      }),
      [],
    );
  });

  test("adding a key rewrites both generated files", () => {
    const files = manifestCommitFiles({
      manifestText: MANIFEST,
      baseUrl: BASE,
      additions: ["zz-new/photo.webp"],
    });
    assert.deepEqual(
      files.map((file) => file.path),
      [MANIFEST_REPO_PATH, ASSET_KEYS_REPO_PATH],
    );

    const entries = parseManifest(files[0].content);
    assert.equal(entries["zz-new/photo.webp"], `${BASE}/zz-new/photo.webp`);
    assert.equal(Object.keys(entries).length, manifestKeys(MANIFEST).length + 1);

    const enumerated = JSON.parse(files[1].content) as { enum: string[] };
    assert.ok(enumerated.enum.includes("zz-new/photo.webp"));
    assert.equal(enumerated.enum.length, Object.keys(entries).length);
  });

  test("keeps every existing key — the manifest is never rebuilt from scratch", () => {
    const [files] = manifestCommitFiles({
      manifestText: MANIFEST,
      baseUrl: BASE,
      additions: ["zz-new/photo.webp"],
    });
    const after = new Set(manifestKeys(files.content));
    for (const key of manifestKeys(MANIFEST)) assert.ok(after.has(key), key);
  });

  test("removing a key takes it out of both generated files", () => {
    const [existing] = manifestKeys(MANIFEST);
    const files = manifestCommitFiles({
      manifestText: MANIFEST,
      baseUrl: BASE,
      additions: [],
      removals: [existing],
    });

    assert.deepEqual(
      files.map((file) => file.path),
      [MANIFEST_REPO_PATH, ASSET_KEYS_REPO_PATH],
    );
    assert.ok(!(existing in parseManifest(files[0].content)));
    const enumerated = JSON.parse(files[1].content) as { enum: string[] };
    assert.ok(!enumerated.enum.includes(existing));
    assert.equal(enumerated.enum.length, manifestKeys(MANIFEST).length - 1);
  });

  test("removing a key the manifest never had is not a change", () => {
    assert.deepEqual(
      manifestCommitFiles({
        manifestText: MANIFEST,
        baseUrl: BASE,
        additions: [],
        removals: ["zz-never/there.webp"],
      }),
      [],
    );
  });

  test("an addition and a removal in one publish both apply", () => {
    // The count is unchanged, which is exactly the case a length check misses:
    // swapping one gallery photo for another would have committed nothing.
    const [existing] = manifestKeys(MANIFEST);
    const [files] = manifestCommitFiles({
      manifestText: MANIFEST,
      baseUrl: BASE,
      additions: ["zz-new/photo.webp"],
      removals: [existing],
    });

    const after = parseManifest(files.content);
    assert.ok("zz-new/photo.webp" in after);
    assert.ok(!(existing in after));
    assert.equal(Object.keys(after).length, manifestKeys(MANIFEST).length);
  });

  test("adding and removing the same key leaves it out", () => {
    // Nonsense input, but it must resolve one way rather than half-apply.
    const [files] = manifestCommitFiles({
      manifestText: MANIFEST,
      baseUrl: BASE,
      additions: ["zz-new/photo.webp"],
      removals: ["zz-new/photo.webp"],
    });
    assert.equal(files, undefined);
  });
});

import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  deletionProblem,
  findOrphans,
  folderOf,
  formatBytes,
  FREE_TIER_BYTES,
  GRACE_MS,
  MAX_DELETIONS,
  MIN_REFERENCES,
  ReferenceScanTooSmallError,
  unregisterCommitMessage,
  type BucketObject,
} from "./orphans.ts";

const NOW = Date.UTC(2026, 7, 15);
const OLD = NOW - GRACE_MS - 1;

/** Enough references to clear the floor, none of which name a test key. */
function filler(): string[] {
  return Array.from({ length: MIN_REFERENCES }, (_, index) => `filler/${index}.webp`);
}

function report({
  objects,
  manifestKeys = [],
  referenced = [],
}: {
  objects: BucketObject[];
  manifestKeys?: string[];
  referenced?: string[];
}) {
  return findOrphans({
    objects,
    manifestKeys,
    referenced: new Set([...filler(), ...referenced]),
    now: NOW,
  });
}

const object = (key: string, extra: Partial<BucketObject> = {}): BucketObject => ({
  key,
  size: 1000,
  modifiedAt: OLD,
  ...extra,
});

describe("findOrphans", () => {
  test("an old file nothing mentions is an orphan", () => {
    const found = report({ objects: [object("documents/old-notice-2019.pdf")] });
    assert.deepEqual(
      found.orphans.map((orphan) => orphan.key),
      ["documents/old-notice-2019.pdf"],
    );
    assert.equal(found.reclaimableBytes, 1000);
  });

  test("a file some content or page names is not", () => {
    const found = report({
      objects: [object("governance/principal.webp")],
      referenced: ["governance/principal.webp"],
    });
    assert.deepEqual(found.orphans, []);
  });

  test("a file in a folder a page draws whole is not, even unnamed", () => {
    // `assetsUnder("student-life/nss/")` — the folder is the reference, and no
    // scan will ever find the individual keys.
    const found = report({ objects: [object("student-life/nss/camp-2024.webp")] });
    assert.deepEqual(found.orphans, []);
  });

  test("a recent upload is held back, not offered", () => {
    // Bytes land on R2 before the Publish that references them. An Editor who
    // uploads on Friday and publishes on Monday must not find the file gone.
    const found = report({
      objects: [object("news/notice.pdf", { modifiedAt: NOW - GRACE_MS + 60_000 })],
    });
    assert.deepEqual(found.orphans, []);
    assert.equal(found.heldBack.recent, 1);
  });

  test("a folder marker is never a file to delete", () => {
    const found = report({ objects: [object("student-life/bec-creative-spectrum/")] });
    assert.deepEqual(found.orphans, []);
    assert.equal(found.heldBack.markers, 1);
  });

  test("says whether the manifest still lists it — the two phases depend on it", () => {
    const found = report({
      objects: [object("documents/a.pdf"), object("documents/b.pdf")],
      manifestKeys: ["documents/a.pdf"],
    });
    assert.deepEqual(
      found.orphans.map((orphan) => [orphan.key, orphan.registered]),
      [
        ["documents/a.pdf", true],
        ["documents/b.pdf", false],
      ],
    );
  });

  test("counts the live siblings, so one stray file reads differently from a dead folder", () => {
    const found = report({
      objects: [
        object("documents/naac/stray.pdf"),
        object("documents/naac/ssr.pdf"),
        object("documents/naac/aqar.pdf"),
        object("documents/gone/one.pdf"),
      ],
      referenced: ["documents/naac/ssr.pdf", "documents/naac/aqar.pdf"],
    });
    const bySiblings = Object.fromEntries(
      found.orphans.map((orphan) => [orphan.key, orphan.siblingsInUse]),
    );
    assert.equal(bySiblings["documents/naac/stray.pdf"], 2);
    assert.equal(bySiblings["documents/gone/one.pdf"], 0);
  });

  test("a manifest entry with no bytes behind it is the more urgent list", () => {
    const found = report({
      objects: [object("documents/a.pdf")],
      manifestKeys: ["documents/a.pdf", "documents/vanished.pdf"],
      referenced: ["documents/a.pdf"],
    });
    assert.deepEqual(found.brokenReferences, ["documents/vanished.pdf"]);
  });

  test("biggest first — the point of the screen is bytes", () => {
    const found = report({
      objects: [
        object("documents/small.pdf", { size: 10 }),
        object("documents/huge.pdf", { size: 9_000_000 }),
        object("documents/middle.pdf", { size: 500 }),
      ],
    });
    assert.deepEqual(
      found.orphans.map((orphan) => orphan.key),
      ["documents/huge.pdf", "documents/middle.pdf", "documents/small.pdf"],
    );
  });

  test("usage counts everything, including what it will not offer", () => {
    const found = report({
      objects: [
        object("documents/a.pdf", { size: 100 }),
        object("student-life/nss/b.webp", { size: 200 }),
        object("student-life/nss/", { size: 0 }),
      ],
    });
    assert.deepEqual(found.usage, {
      objects: 3,
      bytes: 300,
      freeTierBytes: FREE_TIER_BYTES,
    });
  });

  test("refuses to report at all if the reference scan came back too small", () => {
    // A content file that failed to parse must not read as "the site stopped
    // using its photographs".
    assert.throws(
      () =>
        findOrphans({
          objects: [object("documents/a.pdf")],
          manifestKeys: [],
          referenced: new Set(["one.webp"]),
          now: NOW,
        }),
      ReferenceScanTooSmallError,
    );
  });
});

describe("folderOf", () => {
  test("keeps the trailing slash, and copes with a root key", () => {
    assert.equal(folderOf("documents/naac/ssr.pdf"), "documents/naac/");
    assert.equal(folderOf("campus-front.webp"), "");
  });
});

describe("deletionProblem", () => {
  const offered = new Set(["a.pdf", "b.pdf", "c.pdf"]);
  const problem = (keys: string[], bucketObjects = 3000) =>
    deletionProblem({ keys, orphans: offered, bucketObjects });

  test("an ordinary selection is fine", () => {
    assert.equal(problem(["a.pdf", "b.pdf"]), null);
  });

  test("nothing selected", () => {
    assert.match(problem([]) ?? "", /Nothing was selected/);
  });

  test("more than the blast radius allows", () => {
    const many = Array.from({ length: MAX_DELETIONS + 1 }, (_, i) => `x${i}.pdf`);
    assert.match(problem(many) ?? "", /at most 25/);
  });

  test("more than a twentieth of the bucket, however small the cap", () => {
    assert.match(problem(["a.pdf", "b.pdf", "c.pdf"], 20) ?? "", /smaller batches/);
  });

  test("a key that is not on the offered list is refused by name", () => {
    // The request says *which* of the offered files to remove, never *that*
    // they are removable.
    assert.match(problem(["a.pdf", "governance/principal.webp"]) ?? "", /principal\.webp/);
  });
});

describe("formatBytes", () => {
  test("counts in the units Cloudflare's own gauge does", () => {
    assert.equal(formatBytes(0), "0 B");
    assert.equal(formatBytes(999), "999 B");
    assert.equal(formatBytes(1024), "1.0 KB");
    assert.equal(formatBytes(1024 ** 2 * 4.25), "4.3 MB");
    assert.equal(formatBytes(1024 ** 3 * 7.94), "7.9 GB");
  });

  test("drops the decimal once the number is wide enough not to need it", () => {
    assert.equal(formatBytes(1024 ** 2 * 512), "512 MB");
  });
});

describe("unregisterCommitMessage", () => {
  test("reads as a conventional commit and fits in a subject line", () => {
    const message = unregisterCommitMessage({ count: 4, editorName: "Shruti" });
    const [subject, blank, body] = message.split("\n");
    assert.equal(subject, "chore(assets): unregister 4 unused files via Admin");
    assert.ok(subject.length <= 72);
    assert.equal(blank, "");
    assert.equal(body, "Removed by Shruti.");
  });

  test("counts one file as one file", () => {
    assert.match(unregisterCommitMessage({ count: 1, editorName: "A" }), /1 unused file /);
  });

  test("a name cannot inject extra lines into the message", () => {
    const message = unregisterCommitMessage({
      count: 1,
      editorName: "A\n\nCo-Authored-By: someone",
    });
    assert.equal(message.split("\n").length, 3);
  });
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test, describe } from "node:test";
import { fileURLToPath } from "node:url";
import {
  manifestBaseUrl,
  manifestKeys,
  parseManifest,
  renderManifest,
} from "./asset-manifest-io.ts";

const manifestPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "asset-manifest.ts",
);
const CURRENT = readFileSync(manifestPath, "utf8");

const BASE = "https://cdn.example.test";

describe("parseManifest", () => {
  test("reads key and url from a generated line", () => {
    const text = renderManifest(["a/b.webp"], BASE);
    assert.deepEqual(parseManifest(text), { "a/b.webp": `${BASE}/a/b.webp` });
  });

  test("ignores the header comments and the type export", () => {
    const parsed = parseManifest(CURRENT);
    assert.equal(Object.keys(parsed).some((key) => key.includes("AUTO-GENERATED")), false);
    assert.equal("AssetKey" in parsed, false);
  });

  test("reads every entry in the real manifest", () => {
    // A regex that silently matched fewer lines would make an upload's rebuilt
    // manifest delete assets, so pin this against the file's own line count.
    const entryLines = CURRENT.split("\n").filter((line) => /^\s{2}"[^"]+": "/.test(line));
    assert.equal(manifestKeys(CURRENT).length, entryLines.length);
    assert.ok(entryLines.length > 2000, "expected the real manifest, not a stub");
  });
});

describe("renderManifest", () => {
  test("reproduces the committed manifest byte for byte", () => {
    // This is the whole point of the module: the upload path rebuilds the
    // manifest in memory, and any formatting drift would turn a one-line
    // addition into a ~2,950-line diff.
    const base = manifestBaseUrl(CURRENT);
    assert.ok(base, "manifest base url should be recoverable");
    assert.equal(renderManifest(manifestKeys(CURRENT), base), CURRENT);
  });

  test("sorts with a plain .sort(), uppercase before lowercase", () => {
    const text = renderManifest(["b.webp", "A.webp", "a.webp"], BASE);
    assert.deepEqual(manifestKeys(text), ["A.webp", "a.webp", "b.webp"]);
  });

  test("does not URL-encode the key", () => {
    const text = renderManifest(["a b/c&d.webp"], BASE);
    assert.ok(text.includes(`"${BASE}/a b/c&d.webp"`));
  });

  test("tolerates a base url with a trailing slash", () => {
    assert.equal(renderManifest(["a.webp"], `${BASE}/`), renderManifest(["a.webp"], BASE));
  });

  test("adding one key changes exactly one line", () => {
    const base = manifestBaseUrl(CURRENT);
    assert.ok(base, "the checked-in manifest must have a readable base url");
    const grown = renderManifest([...manifestKeys(CURRENT), "zz-new/photo.webp"], base);
    const before = CURRENT.split("\n");
    const after = grown.split("\n");
    assert.equal(after.length, before.length + 1);
    const changed = after.filter((line) => !before.includes(line));
    assert.deepEqual(changed, [`  "zz-new/photo.webp": "${base}/zz-new/photo.webp",`]);
  });
});

describe("manifestBaseUrl", () => {
  test("recovers the base the manifest was generated against", () => {
    assert.equal(manifestBaseUrl(renderManifest(["a/b.webp"], BASE)), BASE);
  });

  test("returns null for a file with no entries", () => {
    assert.equal(manifestBaseUrl("export const manifest = {} as const;"), null);
  });

  test("is repeatable — the shared regex does not carry lastIndex between calls", () => {
    assert.equal(manifestBaseUrl(CURRENT), manifestBaseUrl(CURRENT));
  });
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, describe } from "node:test";
import { z } from "zod";
import { collectAssetKeys } from "./asset-fields.ts";
import { assetKey } from "./shared.ts";
import { contentFiles } from "./index.ts";
import { manifestKeys } from "../../lib/asset-manifest-io.ts";

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

describe("collectAssetKeys", () => {
  test("finds a marked field and ignores an ordinary string beside it", () => {
    const schema = z.object({ photo: assetKey(), caption: z.string() });
    assert.deepEqual(collectAssetKeys(schema, { photo: "a/b.webp", caption: "c/d.webp" }), [
      { path: "$.photo", key: "a/b.webp" },
    ]);
  });

  test("a key-shaped string in an unmarked list is not a key", () => {
    // departments.json really does this: galleryExclude holds file-name
    // fragments that a shape test would happily mistake for asset keys.
    const schema = z.object({ galleryExclude: z.array(z.string()) });
    assert.deepEqual(collectAssetKeys(schema, { galleryExclude: ["cine1770.webp"] }), []);
  });

  test("reaches through optional, array and record", () => {
    const schema = z.object({
      departments: z.record(
        z.string(),
        z.object({ photos: z.array(assetKey()).optional() }),
      ),
    });
    const found = collectAssetKeys(schema, {
      departments: { civil: { photos: ["one.webp", "two.webp"] }, mba: {} },
    });
    assert.deepEqual(found.map((f) => f.key), ["one.webp", "two.webp"]);
    assert.equal(found[0].path, '$.departments["civil"].photos[0]');
  });

  test("picks the union branch the value actually matches", () => {
    const schema = z.object({
      image: z.union([assetKey(), z.object({ src: assetKey(), alt: z.string() })]),
    });
    assert.deepEqual(collectAssetKeys(schema, { image: { src: "a/b.webp", alt: "x" } }), [
      { path: "$.image.src", key: "a/b.webp" },
    ]);
    assert.deepEqual(collectAssetKeys(schema, { image: "c/d.webp" }), [
      { path: "$.image", key: "c/d.webp" },
    ]);
  });

  test("an unhandled node type throws rather than silently skipping the field", () => {
    // A gate that quietly stops covering a field still reads as coverage.
    const schema = z.object({ when: z.date() ,  who: z.map(z.string(), assetKey()) });
    assert.throws(() => collectAssetKeys(schema, { when: new Date(0), who: new Map() }), /unhandled Zod node "map"/);
  });
});

describe("the content files themselves", () => {
  const known = new Set(manifestKeys(readFileSync(join(webRoot, "src", "data", "asset-manifest.ts"), "utf8")));

  for (const { file, schema } of contentFiles) {
    test(`every asset key in ${file} is a file that exists`, () => {
      const data = JSON.parse(readFileSync(join(webRoot, "content", file), "utf8"));
      const parsed = schema.parse(data);
      const missing = collectAssetKeys(schema, parsed).filter(({ key }) => !known.has(key));
      assert.deepEqual(missing, [], `${file} names files the manifest does not have`);
    });
  }

  test("and the walk reaches deep enough to be worth trusting", () => {
    const departments = contentFiles.find((f) => f.file === "departments.json");
    assert.ok(departments);
    const data = JSON.parse(readFileSync(join(webRoot, "content", "departments.json"), "utf8"));
    // 700+ today; a walk that quietly stopped early would still return "0 missing".
    assert.ok(collectAssetKeys(departments.schema, departments.schema.parse(data)).length > 500);
  });
});

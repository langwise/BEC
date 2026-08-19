import assert from "node:assert/strict";
import { test, describe } from "node:test";
import {
  isAssetKeyShaped,
  mintAssetKey,
  normalizeFolder,
  randomSuffix,
  slugFileName,
  slugSegment,
} from "./asset-key.ts";

describe("slugSegment", () => {
  test("lowercases and hyphenates", () => {
    assert.equal(slugSegment("Civil Engineering"), "civil-engineering");
  });

  test("strips accents rather than dropping the letter", () => {
    assert.equal(slugSegment("Café Photo"), "cafe-photo");
  });

  test("collapses runs of punctuation and trims the edges", () => {
    assert.equal(slugSegment("  --A & B--  "), "a-b");
  });

  test("anything with no letters or digits slugs away to nothing", () => {
    assert.equal(slugSegment("!!!"), "");
  });
});

describe("normalizeFolder", () => {
  test("returns a prefix with a trailing slash", () => {
    assert.equal(normalizeFolder("governance"), "governance/");
    assert.equal(normalizeFolder("departments/Civil Engg/"), "departments/civil-engg/");
  });

  test("cannot escape the library", () => {
    assert.equal(normalizeFolder("../../etc"), "etc/");
    assert.equal(normalizeFolder("/absolute/path"), "absolute/path/");
  });

  test("an empty or meaningless folder is the root, which uploads refuse", () => {
    assert.equal(normalizeFolder(""), "");
    assert.equal(normalizeFolder("///"), "");
  });
});

describe("slugFileName", () => {
  test("drops the extension and slugs the rest", () => {
    assert.equal(slugFileName("Principal Photo.JPG"), "principal-photo");
  });

  test("keeps a name for files that slug away to nothing", () => {
    assert.equal(slugFileName("!!!.png"), "photo");
    assert.equal(slugFileName(""), "photo");
  });

  test("caps the length so a pasted sentence does not become the key", () => {
    const long = `${"word ".repeat(40)}.jpg`;
    const slug = slugFileName(long);
    assert.ok(slug.length <= 60, slug);
    assert.ok(!slug.endsWith("-"), slug);
  });
});

describe("randomSuffix", () => {
  test("is six lowercase alphanumerics", () => {
    for (let i = 0; i < 50; i++) assert.match(randomSuffix(), /^[a-z0-9]{6}$/);
  });

  test("does not repeat itself over a small sample", () => {
    const seen = new Set(Array.from({ length: 200 }, () => randomSuffix()));
    assert.ok(seen.size > 190, `only ${seen.size} distinct suffixes in 200`);
  });
});

describe("mintAssetKey", () => {
  test("builds folder + name + suffix + extension", () => {
    assert.equal(
      mintAssetKey({
        folder: "governance/",
        fileName: "Principal Photo.jpg",
        extension: "webp",
        suffix: "k3f9wq",
      }),
      "governance/principal-photo-k3f9wq.webp",
    );
  });

  test("the minted key is recognisable as an asset key", () => {
    const key = mintAssetKey({
      folder: "departments/civil-engg/faculty",
      fileName: "Ànil Patil.png",
      extension: "webp",
    });
    assert.ok(isAssetKeyShaped(key), key);
    assert.match(key, /^departments\/civil-engg\/faculty\/anil-patil-[a-z0-9]{6}\.webp$/);
  });

  test("two uploads of the same file never collide on a key", () => {
    const once = mintAssetKey({ folder: "gallery", fileName: "photo.jpg", extension: "webp" });
    const twice = mintAssetKey({ folder: "gallery", fileName: "photo.jpg", extension: "webp" });
    assert.notEqual(once, twice);
  });
});

describe("isAssetKeyShaped", () => {
  test("accepts the keys the manifest actually holds", () => {
    for (const key of [
      "governance/principal.webp",
      "departments/civil-engg/docs/syllabus.pdf",
      "placements/stats-2024.csv",
      "readme.png",
    ]) {
      assert.ok(isAssetKeyShaped(key), key);
    }
  });

  test("rejects anything that is not a key", () => {
    for (const value of [
      "https://becbgk.edu/photo.webp",
      "/absolute/photo.webp",
      "../secrets/photo.webp",
      "governance/principal",
      "governance/principal.exe",
      "",
      "a".repeat(400) + ".webp",
    ]) {
      assert.equal(isAssetKeyShaped(value), false, value);
    }
  });
});

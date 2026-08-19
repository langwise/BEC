import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { manifest } from "../data/asset-manifest.ts";
import { asset, assetUrl, assetsUnder } from "./assets.ts";

const real = Object.keys(manifest)[0];

describe("assetUrl — the strict half", () => {
  test("resolves a key the manifest holds", () => {
    assert.equal(assetUrl(real), (manifest as Record<string, string>)[real]);
  });

  test("returns nothing for a key that does not exist", () => {
    // The bug this pair replaces: callers tested `asset(key).startsWith("http")`
    // and got `true` for every key, because the invented fallback is an https
    // URL too. A dead link shipped looking exactly like a live one.
    assert.equal(assetUrl("departments/civil/faculty/nobody-at-all.webp"), undefined);
    assert.ok(asset("departments/civil/faculty/nobody-at-all.webp").startsWith("http"));
  });

  test("passes an absolute URL and a site path through — neither is a key", () => {
    assert.equal(assetUrl("https://example.org/x.pdf"), "https://example.org/x.pdf");
    assert.equal(assetUrl("/logo.svg"), "/logo.svg");
  });

  test("nothing in, nothing out", () => {
    assert.equal(assetUrl(undefined), undefined);
    assert.equal(assetUrl(""), undefined);
  });
});

describe("asset — the lenient half", () => {
  test("still invents a URL for an unknown key, so a fresh upload works before the manifest catches up", () => {
    const url = asset("newly/uploaded.webp");
    assert.ok(url.endsWith("/newly/uploaded.webp"));
    assert.ok(url.startsWith("http"));
  });

  test("a leading slash does not produce a double slash", () => {
    assert.equal(asset("/newly/uploaded.webp"), "/newly/uploaded.webp");
  });
});

describe("assetsUnder", () => {
  test("reaches into subfolders and comes back sorted by key", () => {
    const keys = Object.keys(manifest).filter((k) => k.startsWith("departments/civil/"));
    assert.ok(keys.length > 1);
    assert.deepEqual(
      assetsUnder("departments/civil/"),
      [...keys].sort().map((k) => (manifest as Record<string, string>)[k]),
    );
  });

  test("a prefix nothing matches is empty, not everything", () => {
    assert.deepEqual(assetsUnder("no-such-folder/"), []);
  });
});

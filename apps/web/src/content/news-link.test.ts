import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { linkMode, resolveLink } from "./news-link.ts";

const BASE = "https://pub-example.r2.dev";

describe("linkMode", () => {
  test("an absent or empty link is nothing at all", () => {
    assert.equal(linkMode(undefined), "none");
    assert.equal(linkMode(""), "none");
  });

  test("an asset key is an attachment", () => {
    assert.equal(linkMode("documents/news/notice-k3f9wq.pdf"), "attachment");
    assert.equal(linkMode("images/home/banner-a1b2c3.webp"), "attachment");
  });

  test("site paths and full URLs are links, not attachments", () => {
    assert.equal(linkMode("/admissions"), "url");
    assert.equal(linkMode("https://becbgk.edu/admissions"), "url");
    // A URL that happens to end in .pdf is still a link — it is not ours to serve.
    assert.equal(linkMode("https://aicte-india.org/circular.pdf"), "url");
    assert.equal(linkMode("/documents/news/old.pdf"), "url");
  });
});

describe("resolveLink", () => {
  test("an attachment becomes an R2 URL and opens away from the page", () => {
    const resolved = resolveLink("documents/news/notice-k3f9wq.pdf", BASE);
    assert.deepEqual(resolved, {
      href: `${BASE}/documents/news/notice-k3f9wq.pdf`,
      external: true,
      attachment: true,
    });
  });

  test("a trailing slash on the base does not double up", () => {
    assert.equal(
      resolveLink("documents/news/a-k3f9wq.pdf", `${BASE}/`).href,
      `${BASE}/documents/news/a-k3f9wq.pdf`,
    );
  });

  test("a site path stays a site path and stays in the tab", () => {
    assert.deepEqual(resolveLink("/admissions", BASE), {
      href: "/admissions",
      external: false,
      attachment: false,
    });
  });

  test("an off-site URL opens in a new tab but is not an attachment", () => {
    assert.deepEqual(resolveLink("https://vtu.ac.in", BASE), {
      href: "https://vtu.ac.in",
      external: true,
      attachment: false,
    });
  });

  test("a protocol-relative URL is left alone rather than read as a key", () => {
    // "//" is disqualifying for a key, so this cannot be mistaken for one.
    assert.equal(resolveLink("//vtu.ac.in/notice.pdf", BASE).attachment, false);
  });
});

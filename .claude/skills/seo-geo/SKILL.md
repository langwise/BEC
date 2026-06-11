---
name: seo-geo
description: SEO and GEO (Generative Engine Optimization) for websites and Next.js apps. Use this skill whenever optimizing for search rankings, AI citations (ChatGPT, Perplexity, Google AI Overviews, Claude), Core Web Vitals, technical SEO audits, metadata, structured data/JSON-LD, robots.txt, sitemaps, llms.txt, or any task involving website visibility. Always load for SEO audits, Next.js site setup, performance optimization, or when a user wants their site found on Google or AI search engines. Also applies to questions about hreflang, canonical URLs, OG images, schema markup, page speed, or GEO strategy.
metadata:
  modes: [auto, code, web]
---

# SEO + GEO Optimization Skill

Complete guide for optimizing websites — and Next.js apps in particular — for both traditional search engines (SEO) and generative AI engines (GEO: ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini).

## Reference Files

Load these for deep technical content when the task demands it:

| File | When to load |
|------|-------------|
| `references/nextjs-seo.md` | Next.js metadata API, sitemap.ts, robots.ts, JSON-LD, OG images, i18n/hreflang, ISR/SSG/SSR, llms.txt, middleware patterns |
| `references/geo-tactics.md` | GEO content framework, entity stack, per-platform tactics (ChatGPT vs Perplexity vs AI Overviews), passage optimization, measurement |
| `references/core-web-vitals.md` | LCP/INP/CLS engineering: root causes, fix patterns, CI/CD performance budgets |

---

## The Two-Layer Mental Model

Every optimization sits on one of two layers. GEO requires Layer 1 first:

```
┌─────────────────────────────────────────────────────┐
│  Layer 2: GEO — be cited in AI-generated answers    │
│  (ChatGPT, Perplexity, AI Overviews, Claude)        │
├─────────────────────────────────────────────────────┤
│  Layer 1: SEO — be found and ranked in search       │
│  (Google, Bing, organic discovery)                  │
├─────────────────────────────────────────────────────┤
│  Foundation: crawlable · fast · authoritative       │
└─────────────────────────────────────────────────────┘
```

GEO is not a replacement for SEO — it's a specialized layer built on top. A page that isn't indexed can't be cited.

---

## Layer 1: SEO Foundations

### Technical SEO Checklist

**Crawlability & Indexability**
- [ ] `robots.txt` allows important pages; disallows `/api/`, `/dashboard/`, `/auth/`
- [ ] XML sitemap exists at `/sitemap.xml` and is submitted to Google Search Console
- [ ] No accidental `noindex` on public pages
- [ ] Canonical URL set on every page (no duplicate content)
- [ ] HTTPS everywhere; no mixed-content warnings
- [ ] No broken internal links (regularly check for 404s)
- [ ] Redirect chains are short (max 1 hop); 301s used for permanent moves

**Metadata (every public page)**
- [ ] Unique `<title>`: 50–60 characters, keyword near front
- [ ] Unique `<meta description>`: 150–160 characters, action-oriented
- [ ] `<link rel="canonical">` pointing to the preferred URL
- [ ] Open Graph: `og:title`, `og:description`, `og:image` (1200×630px), `og:url`
- [ ] Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] `hreflang` for any multilingual content

**Structured Data (JSON-LD)**
- [ ] `Organization` in root layout (with `sameAs` to all brand profiles)
- [ ] `Article` on blog posts (`datePublished`, `dateModified`, `author`)
- [ ] `FAQPage` on FAQ sections (Q&A pairs — critical for GEO)
- [ ] `BreadcrumbList` on inner pages
- [ ] `Product` on product pages
- [ ] `HowTo` on guides/tutorials
- [ ] `WebSite` + `SearchAction` for sitelinks searchbox (optional)

**Core Web Vitals**
- [ ] LCP < 2.5s — hero image preloaded, WebP/AVIF format, fast TTFB
- [ ] INP < 200ms — no long JS tasks blocking main thread (replaced FID, March 2024)
- [ ] CLS < 0.1 — all images have explicit `width`/`height`, no layout-shifting elements

### On-Page SEO Principles

- Primary keyword in: `<title>`, `<h1>`, first 100 words, URL slug
- One `<h1>` per page; headings form a logical hierarchy (`h1 → h2 → h3`)
- Internal linking: link related pages with descriptive anchor text (never "click here")
- Image `alt` text: descriptive, keyword-natural (not keyword-stuffed)
- URL slugs: lowercase, hyphens, keyword-rich, short (`/blog/nextjs-seo` not `/blog/post-12345`)
- Content depth: comprehensive topic coverage; answer related questions on the same page
- Author pages with real bios build E-E-A-T (Experience, Expertise, Authoritativeness, Trust)

### Off-Page SEO

- Earn backlinks from topically relevant, authoritative domains (quality over quantity)
- List in industry directories: G2, Capterra, Trustpilot, Crunchbase — these also build the entity stack GEO needs
- Guest posts on industry publications
- Get quoted in research, surveys, and comparison articles
- Build brand mentions (even unlinked — they now matter as much as links for AI citations)

---

## Layer 2: GEO — Optimizing for AI Engines

GEO optimizes for **citation** in AI-generated answers, not just ranked links. The success metric shifts from "rank position + CTR" to "citation rate + share of voice."

### The Signal Shift: SEO vs GEO

| Signal | SEO Correlation | GEO Correlation |
|--------|----------------|----------------|
| Backlinks | High (0.218) | Low |
| Brand mentions | Medium | **High (0.664)** |
| Statistics in content | Low | **+40% citation lift** |
| Expert quotes | Low | **+28% citation lift** |
| Promotional tone | Neutral | **-26% citation penalty** |
| Keyword density | Medium | Neutral or negative |
| FAQ schema | Optional | Critical |
| Content freshness | Moderate | **3x more likely cited if < 3 months** |

*Correlations from Ahrefs analysis of 76M AI Overviews; citation lifts from Princeton GEO paper (KDD '24).*

### GEO Content Framework

**1. Answer Capsules (40–60 words per section)**

AI systems chunk pages into 200–400 token passages. A passage that fully answers a question in isolation gets cited. One that depends on surrounding context gets skipped.

```
❌ "There are many factors to consider when choosing a database for 
   your application. In the sections below, we'll explore each..."

✅ "PostgreSQL suits most web apps requiring ACID transactions, complex 
   queries, or JSONB storage. Pair it with Redis for sub-millisecond 
   caching or pub/sub patterns. Choose MongoDB only when document 
   schemas genuinely vary record-by-record — not just for flexibility."
```

**2. Factual Density**
- 1 statistic or data point per 150–200 words
- Link every statistic to its source URL
- Use precise numbers: "72% of users" beats "most users"
- Attribute claims: "According to [Source], ..." makes content citation-eligible

**3. Structure for Extraction**
- Descriptive H2/H3s that match query phrasing ("How do I X?")
- FAQ sections: 5–7 self-contained Q&A pairs per long-form piece
- Front-load insights — 44.2% of LLM citations come from the first 30% of text
- Avoid hedging language ("may", "could", "perhaps") — prefer confident, citable prose
- Name your frameworks: "The X Framework" / "The Y Approach" gives AI something to attribute

**4. Entity Stack (Off-page GEO infrastructure)**

LLMs build "entity confidence" through cross-source verification. Build the stack:

1. **Wikidata Q-ID** — register your brand on Wikidata; Q-IDs are the stable identifiers LLMs use
2. **`Organization` schema with `sameAs`** — explicitly map all your profiles (see JSON-LD section)
3. **Wikipedia** — pursue inclusion when legitimately notable
4. **Independent mentions** — 3-source rule: Crunchbase, G2, LinkedIn, major industry publications
5. **Reddit presence** — Reddit is the #1 cited domain across ChatGPT + Perplexity + AI Mode
6. **Comparison articles** — get your brand mentioned alongside competitors in roundups

**5. Content Freshness**
- `dateModified` on Article schema tells AI systems the content is current
- Quarterly refresh for cornerstone content
- Update annually at minimum — stale content gets deprioritized for recency-sensitive queries

### AI Crawler Access via robots.txt

To earn citations you must allow AI crawlers to read your public content:

```
# OpenAI / ChatGPT Search
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Anthropic / Claude
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Google AI (training vs. retrieval)
User-agent: Google-Extended
Allow: /        # Set to Disallow: / if you want to block training data only

# Microsoft / ChatGPT Search via Bing
User-agent: Bingbot
Allow: /

# Meta
User-agent: FacebookBot
Allow: /

# Common Crawl (used in many AI training sets)
User-agent: CCBot
Allow: /        # Set to Disallow: / to block training data

# Block everything else not listed
User-agent: *
Disallow: /api/
Disallow: /dashboard/
Disallow: /auth/
Disallow: /_next/
```

> Blocking `GPTBot` prevents ChatGPT Search from citing you. For GEO, keep your public content open.

### llms.txt — The AI Navigation File

`llms.txt` is a Markdown file at `/llms.txt` that gives AI systems a curated map of your site. Complement to `sitemap.xml` (exhaustive for crawlers) — `llms.txt` is a human-readable guide for LLMs at inference time.

**Minimal required format:**
```markdown
# Site or Product Name

> One to two sentence summary of what this site/product does.

## Core Pages

- [About](https://yoursite.com/about): Company background and mission
- [Documentation](https://yoursite.com/docs): Full product documentation

## Key Content

- [Getting Started](https://yoursite.com/docs/start): Step-by-step setup guide
- [API Reference](https://yoursite.com/docs/api): REST endpoints and authentication

## Optional

- [Sitemap](https://yoursite.com/sitemap.xml)
- [llms-full.txt](https://yoursite.com/llms-full.txt): Full content bundle
```

The `H1` (site name) and blockquote summary are **required by the spec**. Links must resolve publicly without authentication. Keep it curated — quality over exhaustiveness.

### GEO Measurement (DIY Approach)

Before paying for tools (Profound, Otterly, Peec), track manually:

1. Pick 20–30 representative queries for your domain
2. Run them weekly across ChatGPT, Perplexity, Google AI Mode, Claude
3. Log: query → model → cited URLs → is your domain cited? → position in citation list
4. Track trend over 4–8 weeks

This DIY approach catches ~80% of the value at zero cost. Graduate to paid tools when you need 200+ queries tracked or polished reporting.

---

## Next.js — Special Cases

> Read `references/nextjs-seo.md` for complete code patterns with TypeScript examples.

### Rendering Strategy Decision Tree

```
Is this page public and SEO-critical?
│
├── YES → Must render on the server
│   ├── Content rarely changes?     → force-static (SSG)
│   ├── Content changes on publish? → ISR + on-demand revalidation
│   ├── Content changes frequently? → SSR (dynamic per-request)
│   └── Geo-personalized?           → Edge rendering + cookies
│
└── NO  → CSR is fine
         Mark: robots: { index: false, follow: false }
```

**Rule of thumb: if a page needs to rank or be cited, render it on the server. Never `'use client'` at the page level for SEO-critical routes.**

### Quick-Reference: Metadata API (App Router)

```typescript
// app/layout.tsx — root layout with base config
export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),  // REQUIRED for relative OG images
  title: { template: '%s | Brand', default: 'Brand — Tagline' },
  description: 'Site-wide fallback description',
  openGraph: { siteName: 'Brand', locale: 'en_US', type: 'website' },
}

// app/blog/[slug]/page.tsx — dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://yoursite.com/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: `/og/blog/${post.slug}`, width: 1200, height: 630 }],
    },
  }
}
```

### Critical Next.js SEO Gotchas

| Gotcha | Wrong | Right |
|--------|-------|-------|
| OG images break | Missing `metadataBase` | Set `metadataBase: new URL('https://...')` in root layout |
| JSON-LD not in HTML | Using `generateMetadata` for it | `<script type="application/ld+json">` in server component |
| Metadata missing | `next/head` in App Router | Use `metadata` export / `generateMetadata` |
| SSR lost | `'use client'` on page.tsx | Keep page as server component; push interactivity to children |
| Fonts cause CLS | `<link>` to Google Fonts | `next/font/google` with `display: 'swap'` |
| LCP slow | No priority on hero image | `<Image priority>` on first above-fold image |
| Duplicate content | UTM params indexed | Strip tracking params in `middleware.ts` canonical redirect |
| ISR not refreshing | No `revalidate` export | `export const revalidate = 3600` on route segment |

---

## Audit Workflow

When auditing or optimizing a site for SEO/GEO, follow this order:

1. **Technical foundation** — robots.txt, sitemap, HTTPS, indexability, canonical tags, redirect chains
2. **Metadata audit** — every public page: unique title, description, canonical, OG/Twitter tags
3. **Structured data** — Organization in layout, Article/FAQ/Breadcrumb on key page types
4. **Core Web Vitals** — Lighthouse audit, identify LCP element, INP blockers, CLS sources
5. **GEO layer** — llms.txt present, AI crawlers allowed, content has answer capsules + FAQ + statistics, entity stack built
6. **Next.js specifics** (if applicable) — rendering strategy, `metadataBase`, font strategy, LCP image priority, middleware canonicalization

---

## Key Tools Reference

| Tool | Purpose |
|------|---------|
| Google Search Console | Indexing status, CWV field data, coverage errors, sitemaps |
| Google Rich Results Test | Validate JSON-LD structured data |
| PageSpeed Insights | Core Web Vitals (lab + real user field data) |
| Lighthouse (or Lighthouse CI) | Automated CWV in CI/CD pipeline |
| Ahrefs / Semrush | Backlinks, keyword rankings, site audits |
| Semrush AI Toolkit | AI citation tracking + brand visibility across LLMs |
| Profound / Otterly / Peec | Dedicated GEO citation monitoring |
| Ahrefs Brand Radar | Track brand mentions in AI Overviews |
| agent-ready.dev/llms-txt-checker | Validate llms.txt spec compliance |
| Schema Markup Validator | Validate all schema.org structured data |
| WebPageTest | Deep performance waterfall analysis |

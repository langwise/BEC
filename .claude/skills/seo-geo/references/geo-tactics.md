# GEO Tactics Reference — Complete Framework

Generative Engine Optimization: how to get cited in AI-generated answers from ChatGPT, Perplexity, Google AI Overviews, Claude, and Gemini.

## Table of Contents

1. [How AI Engines Pick Sources](#1-how-ai-engines-pick-sources)
2. [Passage-Level Optimization](#2-passage-level-optimization)
3. [The 5 Citation Triggers](#3-the-5-citation-triggers)
4. [Content Framework (Answer Capsules + FAQ)](#4-content-framework)
5. [Entity Stack (Off-page GEO)](#5-entity-stack)
6. [Schema Markup for GEO](#6-schema-markup-for-geo)
7. [Per-Platform Tactics](#7-per-platform-tactics)
8. [AI Crawler Configuration](#8-ai-crawler-configuration)
9. [llms.txt Deep Dive](#9-llmstxt-deep-dive)
10. [Measurement & Tracking](#10-measurement--tracking)
11. [Common GEO Mistakes](#11-common-geo-mistakes)
12. [30-Day GEO Rollout Plan](#12-30-day-geo-rollout-plan)

---

## 1. How AI Engines Pick Sources

Every generative answer runs the same four-step loop (RAG = Retrieval-Augmented Generation):

```
Query → Retrieval → Grounding → Answer

1. QUERY     The user's question is interpreted, often rewritten into
             multiple sub-queries ("query fan-out") to retrieve better sources.

2. RETRIEVAL Candidate pages are fetched from the index (via embedding
             similarity search). Typical chunk size: 200–400 tokens (~150–300 words).
             The chunk is the unit — not the whole page.

3. GROUNDING Top-N chunks are selected to base the answer on. Self-contained,
             authoritative, data-dense chunks win selection here.

4. ANSWER    The LLM synthesizes prose from the selected chunks and attaches
             citations/mentions to their source URLs.
```

**Your optimization target:** Be retrieved → be selected in grounding → be credited.

### Key Statistics

| Metric | Value | Source |
|--------|-------|--------|
| ChatGPT retrieves but doesn't cite | 85% of retrieved pages | Averi research |
| Brand mentions vs backlinks correlation | 0.664 vs 0.218 | Ahrefs, 76M AI Overviews |
| Statistics addition citation lift | +40% | Princeton GEO paper, KDD '24 |
| Expert quote citation lift | +28% | Princeton GEO paper |
| Keyword stuffing effect | -10% | Princeton GEO paper |
| Promotional tone correlation | -26.19% | Multiple sources |
| Content < 3 months old | 3x more likely cited (fast-moving topics) | Averi |
| First 30% of text citation share | 44.2% of all LLM citations | Averi |
| Articles > 2,900 words citation boost | 59% more likely than < 800 words | ChatGPT analysis |

---

## 2. Passage-Level Optimization

AI systems don't cite pages — they cite **passages** (200–400 tokens of contiguous text). A 4,000-word article gets cited for one paragraph, while the rest is ignored.

### Self-Containment Rule

A passage must make sense when extracted in isolation, with no context from the surrounding article.

```
❌ Context-dependent (won't be cited alone):
"As we mentioned in the previous section, the tool requires 
PostgreSQL. Given that setup, you can now configure the 
connection string as follows..."

✅ Self-contained (citation-eligible):
"Configuring the database connection in Prisma requires a 
DATABASE_URL environment variable in .env. For PostgreSQL: 
postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public. 
For SQLite (dev): file:./dev.db. Run npx prisma migrate dev 
after setting the variable."
```

### Heading-to-Passage Anchoring

Most retrieval systems anchor passages to the nearest preceding heading. Use descriptive, query-matching headings:

```
❌ "Overview"
❌ "Introduction"
❌ "Background"

✅ "How Does Next.js Handle SEO?"
✅ "What Is the Difference Between ISR and SSG?"
✅ "When Should I Use Server Components vs Client Components?"
```

Question-format H2/H3 headings directly match how users phrase AI queries.

### Optimal Passage Length

- 150–300 words per substantive section (maps to one 200–400 token chunk)
- If a section runs longer, break it at a natural paragraph with a sub-heading
- Each paragraph should ideally function as a standalone answer

---

## 3. The 5 Citation Triggers

Five content patterns consistently earn higher citation rates across all AI platforms:

### Trigger 1: Specific Statistics

Precise numbers with source attribution are the #1 citation trigger (+40% lift):

```
❌ "Most companies have adopted cloud infrastructure."
✅ "94% of enterprises used cloud services in 2025, up from 67% in 2020 
   (Flexera State of the Cloud Report 2025)."
```

Benchmark: 1 statistic per 150–200 words. Always hyperlink to the source.

### Trigger 2: Named Expert Quotes

Direct quotes from named, credentialed people provide attribution-eligible authority:

```
❌ "Experts agree that TypeScript improves code quality."
✅ "According to Matt Pocock, TypeScript educator and author of Total 
   TypeScript: 'TypeScript's type inference means you write 30% less 
   boilerplate than you did in 2020, while catching 60% more runtime 
   errors at compile time.'"
```

### Trigger 3: Definitional Sentences

Well-formed definitions are cited heavily for "what is X" queries:

```
❌ "Server-Side Rendering is a technique used to improve performance."
✅ "Server-Side Rendering (SSR) is the process of generating HTML on 
   the server for each user request, so browsers receive a complete 
   document rather than a JavaScript-rendered shell. SSR improves 
   Time to First Byte (TTFB) for dynamic content and ensures search 
   crawlers see full page content without executing JavaScript."
```

Write one explicit definition per major concept on a page.

### Trigger 4: Named Frameworks and Structured Approaches

Named, structured approaches get attributed and re-cited:

```
❌ "You should address multiple aspects of performance."
✅ "The Core Web Vitals framework — LCP (loading), INP (interactivity), 
   and CLS (visual stability) — is Google's three-metric system for 
   quantifying real user experience. Good scores are: LCP < 2.5s, 
   INP < 200ms, CLS < 0.1."
```

### Trigger 5: Recency Signals

Content with explicit dates and `dateModified` schema signals freshness:

```
• Add "Updated: June 2026" or "Last reviewed: [date]" near the top
• dateModified in Article schema
• Quarterly content refresh for cornerstone pages
• Annual full rewrite for time-sensitive topics
```

AI platforms (especially Perplexity) heavily weight recency. ~50% of Perplexity citations come from content published within the current year.

---

## 4. Content Framework

### The Answer Capsule Structure

Every section should follow this pattern:

```
[H2/H3 Heading — descriptive, query-phrasing]

[Answer Capsule — 40–60 words, direct, self-contained]

[Supporting Detail — statistics, examples, code]
[Expert validation — quote or authoritative reference]

[Optional: FAQ subsection for GEO]
```

**Example:**

```
## How Do I Fix Cumulative Layout Shift (CLS)?

CLS is fixed by reserving space for elements before they load. Set explicit 
width and height on all images and embeds. Use CSS aspect-ratio to maintain 
proportions. Avoid inserting content above existing elements after page load 
— if you must (banners, cookie notices), use position: fixed so they don't 
push the layout. Google's Good threshold is CLS below 0.1.

[... supporting code examples, deeper explanation ...]
```

### FAQ Architecture

FAQ sections are the single most reliable format for AI citations. Every Q&A pair is an independent citation opportunity.

**Structure:**
- 5–7 FAQ items per long-form piece
- Each question matches how users phrase AI queries
- Each answer is 40–80 words (self-contained)
- Use `FAQPage` JSON-LD schema

```markdown
## Frequently Asked Questions

### What is the difference between SEO and GEO?
SEO (Search Engine Optimization) optimizes pages to rank in traditional 
search results — a list of blue links users click. GEO (Generative Engine 
Optimization) optimizes content to be cited in AI-generated answers, where 
the success metric is citation frequency rather than click-through rate. 
GEO builds on SEO foundations but requires different content structure 
and off-page authority signals.

### Does GEO replace SEO?
No. GEO is an additional layer built on top of SEO. A page that isn't 
indexed and crawlable can't be cited by AI systems. The relationship: 
SEO is the foundation (indexability, rankings); GEO is the superstructure 
(citability, AI mentions). Most of the work — content quality, technical 
accessibility, authoritative mentions — serves both simultaneously.
```

### Non-Promotional Tone

Promotional copy has a -26.19% citation correlation. AI systems are trained to detect and downweight marketing language:

```
❌ "Our revolutionary, industry-leading platform delivers 
   unparalleled results for your business."

✅ "The platform uses WebSocket connections for real-time sync, 
   reducing average data latency from 800ms to under 50ms in 
   independent benchmarks."
```

Rule: Replace adjectives with measurements. Replace claims with evidence.

---

## 5. Entity Stack

The entity stack is the off-page infrastructure that lets AI systems recognize and trust your brand as a verified entity.

### Why it matters

LLMs build "entity confidence" through cross-source verification. A brand mentioned only on its own site has weak entity confidence. A brand consistently mentioned across 3+ independent authoritative sources has strong entity confidence — and gets cited more often.

### Building the Entity Stack

**Step 1: Wikidata Q-ID**
Register your brand at wikidata.org. Q-IDs are stable identifiers LLMs use to anchor entity recognition. This is the most overlooked, highest-leverage step.

**Step 2: Organization Schema with sameAs**
The `sameAs` property tells LLMs "all these URLs refer to the same entity":

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Brand",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "sameAs": [
    "https://twitter.com/yourbrand",
    "https://www.linkedin.com/company/yourbrand",
    "https://github.com/yourbrand",
    "https://www.crunchbase.com/organization/yourbrand",
    "https://www.wikidata.org/wiki/Q-YOUR-ID",
    "https://www.g2.com/products/yourbrand",
    "https://www.producthunt.com/products/yourbrand",
    "https://en.wikipedia.org/wiki/Your_Brand"   // only if it exists
  ]
}
```

**Step 3: The 3-Source Rule**
Ensure your brand is mentioned on 3+ independent authoritative sources. Priority targets:
1. Wikipedia (when legitimately notable)
2. Crunchbase — register your company profile
3. G2 / Capterra — product reviews for SaaS
4. LinkedIn company page
5. Major industry publications (TechCrunch, Forbes, VentureBeat, etc.)

**Step 4: Reddit Presence**
Reddit is the #1 cited domain across ChatGPT, Perplexity, and Google AI Mode. Participate authentically in relevant subreddits. Being mentioned in comparison threads has measurable impact on AI citations.

**Step 5: Co-citations with Competitors**
When publications write comparison articles or industry roundups, being included alongside competitors signals to AI what category you belong to:

- Reach out for inclusion in "X vs Y vs Z" comparison articles
- Participate in industry surveys and research reports
- Ensure you appear in "Top X tools for Y" listicles in your niche

---

## 6. Schema Markup for GEO

Based on observed AI citation behavior, these five schema types move the needle:

| Schema Type | Citation Impact | When to Use |
|------------|----------------|-------------|
| `FAQPage` | **Very High** | Any page with Q&A sections |
| `Article` | **High** | All blog/content posts |
| `Organization` + `sameAs` | **High** | Root layout (site-wide) |
| `HowTo` | **High** | Tutorial and guide pages |
| `Person` | **Medium** | Author pages |

**Key properties for AI citation:**
- `datePublished` + `dateModified` — recency signals
- `author` with `Person` entity — E-E-A-T signals
- `sameAs` on both `Organization` and `Person` — entity grounding
- Specific, fact-dense `description` fields — AI extracts these directly

---

## 7. Per-Platform Tactics

### ChatGPT

**How it works:** RAG via Bing integration. ChatGPT's "query fan-out" generates multiple sub-queries, retrieves from Bing, selects top sources.

**What it favors:**
- Sites indexed by Bingbot (allow `Bingbot` in robots.txt)
- Allow `GPTBot` for ChatGPT Search retrieval access
- High domain authority (sites with 350K+ referring domains are 5x more cited)
- Articles > 2,900 words (+59% citation rate vs. < 800 words)
- Pages with FCP < 0.4 seconds (3x more cited than slower pages)
- Sections of 120–180 words (+70% more citations vs. very short sections)
- Definite, specific language — confident claims that can be quoted

**Reddit strategy:** Reddit citations in ChatGPT surged 87% in 2025. Being mentioned in Reddit threads on your topic is a meaningful indirect signal.

### Google AI Overviews

**How it works:** Synthesizes from Google's existing index. Appears for ~50% of queries as of late 2025; 1.5B monthly users.

**What it favors:**
- Pages already ranking in Google's organic results (strong correlation)
- BUT: 59.6% of AI Overview citations come from URLs NOT in top 20 organic — Google reaches deeper
- Blog content is the #1 cited page type
- Strong E-E-A-T signals (real authors, cited sources, institutional trust)
- Informational query intent (AI Overviews trigger on 39.4% of informational queries)
- Freshness (Google refreshes AI Overview citations when your content is updated)

**Business impact:** Brands cited in AI Overviews see +35% organic CTR and +91% paid CTR.

### Google AI Mode

**How it works:** More conversational than AI Overviews; heavy citing; 93% of sessions end without a click.

**What it favors:**
- Domain traffic is the #1 predictor (SHAP value 0.63)
- Wikipedia, Reddit, YouTube are top-cited domains
- Highly volatile: 60%+ of domains and 80% of URLs disappear between identical query runs
- Freshness is critical

### Perplexity

**How it works:** Pure answer engine with live web retrieval. Every claim gets a citation number. Most transparent platform for citation tracking.

**What it favors:**
- Real-time retrieval means freshness matters most (~50% of citations from current-year content)
- Fastest index refresh of any AI platform
- Sources with clear, concise, factually dense answers
- Depth: detailed guides get cited more than thin overviews
- Allow `PerplexityBot` in robots.txt

**New domain opportunity:** Perplexity's freshness sensitivity is an advantage for new domains. A well-structured post on a timely topic can earn citations within days of publishing.

### Claude (Anthropic)

**How it works:** More cautious about attributing sources; content it cites has passed a higher credibility bar.

**What it favors:**
- Nuanced, balanced perspectives (Claude's training emphasizes avoiding overconfident claims)
- Well-structured long-form content with clear sections
- Strong institutional authority signals
- Multiple perspectives addressed (not single-viewpoint advocacy)
- `llms.txt` — Anthropic's tooling actively uses it in Claude Code workflows

### Cross-Platform Patterns

Despite platform differences, these work everywhere:
1. **Factual density** — statistics + citations win on all platforms
2. **Structure** — Q&A format, clear headers, extractable 40–60 word blocks
3. **Freshness** — AI-cited content is 25.7% fresher than organic Google results
4. **Brand authority** — strong cross-platform mentions → higher citation probability
5. **Non-promotional** — promotional copy gets penalized on every platform

---

## 8. AI Crawler Configuration

### Allow AI crawlers (robots.txt)

```
User-agent: GPTBot          # OpenAI – ChatGPT Search retrieval
Allow: /

User-agent: ChatGPT-User    # OpenAI – ChatGPT browsing
Allow: /

User-agent: OAI-SearchBot   # OpenAI – general search
Allow: /

User-agent: ClaudeBot        # Anthropic – Claude
Allow: /

User-agent: anthropic-ai    # Anthropic – general
Allow: /

User-agent: Claude-Web      # Anthropic – Claude web
Allow: /

User-agent: PerplexityBot   # Perplexity
Allow: /

User-agent: Google-Extended  # Google – AI training + features
Allow: /

User-agent: Bingbot         # Microsoft – ChatGPT Search via Bing
Allow: /

User-agent: CCBot           # Common Crawl – AI training corpus
Allow: /

User-agent: cohere-ai       # Cohere
Allow: /

User-agent: FacebookBot     # Meta
Allow: /

# Disallow private paths for all crawlers
User-agent: *
Disallow: /api/
Disallow: /dashboard/
Disallow: /auth/
Disallow: /admin/
```

### To block AI training (but allow retrieval)

If you want to allow citation (retrieval) but opt out of training data:

```
# Block training corpus
User-agent: CCBot
Disallow: /

# Block Google's AI training component
User-agent: Google-Extended
Disallow: /

# ChatGPT's retrieval bot (allow for citations)
User-agent: GPTBot
Allow: /
```

Note: There is no reliable way to distinguish "this crawl is for training" vs "this crawl is for retrieval" at the HTTP level. Blocking `GPTBot` blocks both.

---

## 9. llms.txt Deep Dive

### When to use which variant

| Variant | Use for | Content |
|---------|---------|---------|
| `llms.txt` | Almost all sites | Curated index of key pages |
| `llms-full.txt` | Docs-heavy / technical sites | Concatenated full content of all pages |
| `.md` pages | Documentation sites | Per-page Markdown version at `[page-url].md` |

### Full llms.txt Example

```markdown
# Acme Cloud Platform

> Acme is a serverless deployment platform for full-stack web applications.
> Deploy Next.js, Remix, and SvelteKit apps to the edge in under 60 seconds.

Acme supports automatic HTTPS, global CDN distribution, environment variables,
preview deployments on pull requests, and native integration with GitHub and GitLab.

## Documentation

- [Quick Start](https://acme.dev/docs/quickstart): Deploy your first app in 60 seconds
- [CLI Reference](https://acme.dev/docs/cli): All CLI commands with examples
- [Environment Variables](https://acme.dev/docs/env): Configure secrets and config
- [Custom Domains](https://acme.dev/docs/domains): Connect your domain with SSL
- [Preview Deployments](https://acme.dev/docs/previews): Auto-deploy on every PR

## Framework Guides

- [Next.js on Acme](https://acme.dev/guides/nextjs): Full Next.js integration guide
- [Remix on Acme](https://acme.dev/guides/remix): Remix deployment guide
- [API Routes](https://acme.dev/guides/api-routes): Deploy serverless functions

## Pricing & Company

- [Pricing](https://acme.dev/pricing): Free tier, Pro ($20/month), Enterprise
- [About](https://acme.dev/about): Company background and mission
- [Status](https://status.acme.dev): Real-time uptime and incident history

## Optional

- [Blog](https://acme.dev/blog): Engineering articles and product updates
- [Changelog](https://acme.dev/changelog): Release notes
- [Sitemap](https://acme.dev/sitemap.xml)
- [llms-full.txt](https://acme.dev/llms-full.txt): Complete documentation bundle
```

### llms-full.txt (documentation sites)

For technical documentation, include full content:

```markdown
# Acme — Full Documentation

> [Same header as llms.txt]

---

## Quick Start

[Full content of the Quick Start page, formatted as Markdown]

---

## CLI Reference

[Full content of the CLI Reference page]

---
```

This lets LLMs (especially Claude in agentic workflows) ingest your entire knowledge base in one fetch.

---

## 10. Measurement & Tracking

### DIY Citation Tracker (free)

**Setup (2–3 hours):**

Create a spreadsheet with columns:
- Date, Query, Model (ChatGPT/Perplexity/Claude/Gemini/AI Overviews)
- Response text (excerpt)
- Cited URLs
- Your domain cited? (Y/N)
- Your position in citation list (1, 2, 3...)
- Sentiment (positive/neutral/negative)

**Queries to track:**
- Your brand name + comparison ("Brand X vs competitor")
- Your main value proposition ("best [tool category]")
- Problem queries you solve ("how to deploy Next.js")
- Industry terms you want to own

**Cadence:** Weekly, 20–30 queries across 4 models. Track trend over 8 weeks before drawing conclusions.

### Paid Tools

| Tool | Best for |
|------|---------|
| **Profound** | Enterprise GEO tracking, 200+ queries |
| **Otterly** | Mid-market, clean dashboard |
| **Peec** | Startup-friendly pricing |
| **Ahrefs Brand Radar** | AI Overview mentions + traditional SEO combined |
| **Semrush AI Toolkit** | If already using Semrush ecosystem |

Graduate to paid tools when:
- You need 200+ queries tracked consistently
- You need historical trend data for reporting
- Marketing leadership needs dashboards

### KPIs for GEO

| KPI | What it measures |
|-----|-----------------|
| Citation rate | % of queries where your content is cited |
| Share of voice | Your citations / total citations in your category |
| Mention frequency | Brand named in answer (with or without link) |
| Citation position | 1st, 2nd, 3rd source cited (lower = better visibility) |
| Sentiment | Positive/neutral/negative framing when cited |
| Referral traffic from AI | Sessions from ChatGPT, Perplexity (in Analytics) |

Note: AI referral traffic understates impact. A zero-click answer that cites you still shapes the buyer's shortlist.

---

## 11. Common GEO Mistakes

1. **Burying answers in long intros** — AI systems extract from the first 800 words most often. Lead with the answer, not preamble.

2. **Missing structured data** — No Article or FAQPage schema dramatically reduces citation likelihood. Schema is no longer optional for GEO.

3. **Blocking AI crawlers** — A site that blocks `GPTBot` is invisible to ChatGPT Search. Review robots.txt.

4. **Stale content on time-sensitive topics** — Content older than 12 months is heavily deprioritized for current-events or fast-moving topics. Refresh quarterly.

5. **No entity stack** — Brands without Wikipedia/Wikidata/Crunchbase/G2 presence have weak entity recognition. AI systems don't know who you are.

6. **Promotional language** — Every superlative and marketing claim reduces citation probability. Rewrite "industry-leading platform" as measurable facts.

7. **Generic AI-style writing** — Ironically, content that reads as AI-generated gets cited less. Human voice, idiosyncratic observations, and named expert quotes outperform polished but generic prose.

8. **Ignoring Perplexity** — Perplexity is the easiest platform for new domains to break into due to freshness weighting. A timely, well-structured post can earn citations within days.

9. **No FAQ sections** — Every long-form page without a FAQ section is leaving citation opportunities on the table. FAQ schema + self-contained answers = the highest ROI GEO tactic.

10. **Measuring only traffic** — AI citations often produce zero clicks but still shape purchase decisions. Track citation rate and brand mention frequency, not just sessions.

---

## 12. 30-Day GEO Rollout Plan

### Week 1: Technical Foundation
- [ ] Add `Organization` schema with `sameAs` array to root layout
- [ ] Add `Article` + `dateModified` schema to all blog posts
- [ ] Add `FAQPage` schema to cornerstone pages
- [ ] Create `llms.txt` and deploy at `/llms.txt`
- [ ] Update `robots.txt` to allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- [ ] Audit cornerstone content: do answers appear in first 800 words?

### Week 2: Entity Stack
- [ ] Register/verify brand on Wikidata (create Q-ID if not exists)
- [ ] Verify Crunchbase, G2, LinkedIn profiles match `sameAs` in schema
- [ ] Identify 3 independent publications that mention (or should mention) your brand
- [ ] Find 2–3 comparison/roundup articles in your niche to get included in

### Week 3: Citation Engineering
- [ ] Rewrite top 5 pages for answer capsules (40–60 word section openings)
- [ ] Add 1 statistic per 150–200 words across cornerstone content
- [ ] Add FAQ sections (5–7 Q&As) to top 5 pages
- [ ] Add `dateModified` stamps to all updated content
- [ ] Replace promotional language with measurable claims

### Week 4: Baseline Measurement
- [ ] Set up DIY citation tracker (20–30 queries × 4 models)
- [ ] Run first baseline citation audit across ChatGPT, Perplexity, Gemini, Claude
- [ ] Document current state for monthly comparison
- [ ] Identify which queries you're cited for vs. competitors
- [ ] Plan ongoing quarterly content refresh cadence

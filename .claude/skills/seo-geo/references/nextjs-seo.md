# Next.js SEO Reference — Complete Patterns

Complete production-ready code patterns for Next.js App Router (v13.4+, 14, 15). All examples use TypeScript.

---

## Table of Contents

1. [Metadata API — Static & Dynamic](#1-metadata-api)
2. [Title Templates & Layout Inheritance](#2-title-templates)
3. [Open Graph & Twitter Cards](#3-open-graph--twitter-cards)
4. [Canonical URLs & Duplicate Content Prevention](#4-canonical-urls)
5. [Sitemap Generation (sitemap.ts)](#5-sitemap-generation)
6. [Robots.txt Configuration (robots.ts)](#6-robotstxt)
7. [JSON-LD Structured Data](#7-json-ld-structured-data)
8. [Dynamic OG Images (next/og)](#8-dynamic-og-images)
9. [Image Optimization & CWV](#9-image-optimization)
10. [Font Optimization & CLS Prevention](#10-font-optimization)
11. [International SEO (i18n + hreflang)](#11-international-seo)
12. [Rendering Strategies for SEO](#12-rendering-strategies)
13. [ISR & On-Demand Revalidation](#13-isr--on-demand-revalidation)
14. [llms.txt — AI Navigation File](#14-llmstxt)
15. [Middleware: Canonicalization & Redirect Patterns](#15-middleware-patterns)
16. [Route-Level Crawl Control](#16-route-level-crawl-control)
17. [Pages Router vs App Router Differences](#17-pages-vs-app-router)

---

## 1. Metadata API

### Static Metadata

For pages where content doesn't depend on dynamic data:

```typescript
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our company, mission, and team.',
  alternates: {
    canonical: 'https://yoursite.com/about',
  },
  openGraph: {
    title: 'About Us | Brand',
    description: 'Learn about our company, mission, and team.',
    url: 'https://yoursite.com/about',
    type: 'website',
  },
}

export default function AboutPage() { ... }
```

### Dynamic Metadata

For pages with route params (blog posts, product pages, user profiles):

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)  // your data-fetching function

  // Extend parent OG images instead of replacing
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: {
      canonical: `https://yoursite.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://yoursite.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.url],
      images: [
        { url: `/og/blog/${slug}`, width: 1200, height: 630 },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`/og/blog/${slug}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}
```

> **Key rules:**
> - `generateMetadata` is **Server Component only** — never import it in Client Components
> - Can't export both `metadata` and `generateMetadata` from the same file
> - `fetch` calls inside `generateMetadata` are automatically deduplicated with the page component
> - File-based metadata (`opengraph-image.png`) has higher priority than `metadata` export

---

## 2. Title Templates

Configure a site-wide title format in root `layout.tsx`:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),  // REQUIRED
  title: {
    template: '%s | Brand Name',   // child pages: "About | Brand Name"
    default: 'Brand Name — Tagline', // shown if no child title
  },
  description: 'Site-wide fallback description.',
  openGraph: {
    siteName: 'Brand Name',
    locale: 'en_US',
    type: 'website',
  },
}
```

Override in child pages:

```typescript
// app/blog/[slug]/page.tsx
export const metadata: Metadata = {
  title: 'My Post Title',           // → "My Post Title | Brand Name"
}

// To bypass the template entirely:
export const metadata: Metadata = {
  title: { absolute: 'Special Page Title' }  // → "Special Page Title"
}
```

---

## 3. Open Graph & Twitter Cards

Full OG configuration:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  openGraph: {
    title: 'Page Title',
    description: 'Page description for social sharing',
    url: 'https://yoursite.com/page',
    siteName: 'Brand Name',
    images: [
      {
        url: '/og-image.png',      // resolved against metadataBase
        width: 1200,
        height: 630,
        alt: 'Description of the image',
      },
    ],
    locale: 'en_US',
    type: 'website',  // or 'article', 'product', 'profile'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourhandle',
    creator: '@authorhandle',
    title: 'Page Title',
    description: 'Page description',
    images: ['/og-image.png'],
  },
}
```

**For articles specifically:**
```typescript
openGraph: {
  type: 'article',
  publishedTime: '2025-01-15T10:00:00Z',
  modifiedTime: '2025-06-01T10:00:00Z',
  authors: ['https://yoursite.com/authors/jane-doe'],
  section: 'Technology',
  tags: ['Next.js', 'SEO', 'Performance'],
}
```

---

## 4. Canonical URLs

Always set canonical to prevent duplicate content issues:

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://yoursite.com/blog/my-post',
  },
}
```

**Important:** Set `metadataBase` in root layout so relative paths work:
```typescript
// Root layout — without this, relative canonicals break
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoursite.com')
```

---

## 5. Sitemap Generation

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getAllProducts } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const products = await getAllProducts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://yoursite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://yoursite.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://yoursite.com/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://yoursite.com/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages, ...productPages]
}
```

This auto-generates `/sitemap.xml`. Submit to Google Search Console after first deploy.

**For large sites (>50k URLs), use sitemap index:**
```typescript
// app/sitemap.ts — generates sitemap index
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }]  // paginated
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsBatch(id, 1000)
  return posts.map(post => ({ url: `.../${post.slug}`, ... }))
}
// Generates: /sitemap/0.xml, /sitemap/1.xml, /sitemap/2.xml
```

---

## 6. robots.txt

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/auth/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      // Allow specific AI crawlers for GEO
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: 'https://yoursite.com/sitemap.xml',
    host: 'https://yoursite.com',
  }
}
```

---

## 7. JSON-LD Structured Data

**Critical: Do NOT use `generateMetadata` for JSON-LD** — it only supports the standard metadata shape. Use a `<script>` tag directly in Server Components.

### Organization Schema (Root Layout)

```typescript
// app/layout.tsx
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Your Brand',
  url: 'https://yoursite.com',
  logo: 'https://yoursite.com/logo.png',
  description: 'What your company does.',
  foundingDate: '2022',
  sameAs: [
    'https://twitter.com/yourbrand',
    'https://www.linkedin.com/company/yourbrand',
    'https://github.com/yourbrand',
    'https://www.crunchbase.com/organization/yourbrand',
    'https://www.wikidata.org/wiki/Q-YOUR-ID',  // once you have one
    'https://www.g2.com/products/yourbrand',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgSchema).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  )
}
```

### Article Schema (Blog Posts)

```typescript
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.ogImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `https://yoursite.com/authors/${post.author.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Brand Name',
      logo: { '@type': 'ImageObject', url: 'https://yoursite.com/logo.png' },
    },
    mainEntityOfPage: `https://yoursite.com/blog/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c'),
        }}
      />
      <article>
        <h1>{post.title}</h1>
        {/* content */}
      </article>
    </>
  )
}
```

### FAQ Schema (Critical for GEO)

```typescript
// Inline FAQ in any page — huge GEO signal
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Next.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js is a React framework by Vercel that provides server-side rendering, static site generation, and built-in routing. It optimizes performance through automatic code splitting, image optimization, and Edge network support.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Next.js improve SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js improves SEO by server-rendering pages so search engine crawlers receive complete HTML, providing a Metadata API for title/description/OG tags, auto-generating sitemaps via sitemap.ts, optimizing images to WebP/AVIF, and self-hosting fonts to eliminate layout shifts.',
      },
    },
  ],
}
```

### BreadcrumbList Schema

```typescript
function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        {/* visual breadcrumb UI */}
      </nav>
    </>
  )
}
```

### TypeScript with schema-dts (optional but recommended)

```bash
npm install schema-dts
```

```typescript
import type { Article, WithContext } from 'schema-dts'

const schema: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  // TypeScript now validates all fields
}
```

> **Always check View Source**, not DevTools Elements, to verify JSON-LD is in the initial HTML. DevTools shows the live DOM (post-hydration); View Source shows what the crawler sees.

---

## 8. Dynamic OG Images

Generate unique social preview images per page at request time:

```typescript
// app/og/route.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Default Title'
  const description = searchParams.get('description') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          padding: '60px 80px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 20, color: '#94a3b8', marginBottom: 16 }}>
          Brand Name
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
          {title}
        </h1>
        {description && (
          <p style={{ fontSize: 24, color: '#94a3b8', marginTop: 20 }}>
            {description}
          </p>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

**Reference in metadata:**
```typescript
openGraph: {
  images: [
    {
      url: `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.excerpt)}`,
      width: 1200,
      height: 630,
    },
  ],
}
```

**File-based OG image (simplest approach):**
```
app/
  blog/
    [slug]/
      opengraph-image.tsx  ← auto-registered as OG image for this route
      twitter-image.tsx    ← auto-registered as Twitter card image
```

---

## 9. Image Optimization

Always use `next/image` over bare `<img>`:

```typescript
import Image from 'next/image'

// LCP hero image — always add priority
<Image
  src="/hero.jpg"
  alt="Descriptive alt text with relevant keyword"
  width={1280}
  height={720}
  priority          // preloads this image; use ONLY on above-fold LCP images
  quality={85}      // 75-85 is usually optimal
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
/>

// Below-fold images — lazy loaded by default
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  // no priority; Next.js lazy-loads by default
/>

// Responsive fill (for unknown aspect ratios)
<div style={{ position: 'relative', aspectRatio: '16/9' }}>
  <Image
    src={image.url}
    alt={image.alt}
    fill
    style={{ objectFit: 'cover' }}
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

**Key rules:**
- `priority` on one image per page (the LCP element)
- Always specify `width`/`height` or use `fill` — prevents CLS
- `sizes` prop for responsive images — prevents downloading oversized images
- Next.js automatically converts to WebP/AVIF

---

## 10. Font Optimization

**Never** link to Google Fonts with a `<link>` tag — it causes CLS and is an external request.

```typescript
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',    // prevents invisible text (FOIT)
  variable: '--font-inter',
})

const mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

Next.js self-hosts fonts (no external requests), inlines the CSS, and uses `font-display: swap` automatically — eliminates font-related CLS and LCP delay.

**Local fonts:**
```typescript
import localFont from 'next/font/local'

const brandFont = localFont({
  src: [
    { path: '../public/fonts/brand-regular.woff2', weight: '400' },
    { path: '../public/fonts/brand-bold.woff2', weight: '700' },
  ],
  display: 'swap',
  variable: '--font-brand',
})
```

---

## 11. International SEO

### hreflang via Metadata API

```typescript
// app/[locale]/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale, slug } = await params
  const canonical = `https://yoursite.com/${locale}/blog/${slug}`

  return {
    alternates: {
      canonical,
      languages: {
        'en':    `https://yoursite.com/en/blog/${slug}`,
        'fr':    `https://yoursite.com/fr/blog/${slug}`,
        'de':    `https://yoursite.com/de/blog/${slug}`,
        'es':    `https://yoursite.com/es/blog/${slug}`,
        'x-default': `https://yoursite.com/en/blog/${slug}`,  // fallback
      },
    },
  }
}
```

### i18n Sitemap

```typescript
// app/sitemap.ts
const locales = ['en', 'fr', 'de', 'es']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  
  return posts.flatMap(post =>
    locales.map(locale => ({
      url: `https://yoursite.com/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      // alternateRefs for hreflang in sitemap
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `https://yoursite.com/${l}/blog/${post.slug}`])
        ),
      },
    }))
  )
}
```

### Locale-aware JSON-LD

```typescript
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,         // in the page's language
  inLanguage: locale,           // 'en', 'fr', etc.
  // ...
}
```

---

## 12. Rendering Strategies

```typescript
// force-static: build-time HTML (best for SEO + performance)
export const dynamic = 'force-static'

// ISR: rebuild every N seconds
export const revalidate = 3600  // 1 hour

// Dynamic per-request: fresh HTML every request (use sparingly for SEO pages)
export const dynamic = 'force-dynamic'

// Edge rendering: low-latency, geo-personalization
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
```

**Segment config for SEO control:**
```typescript
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: false,         // allow caching
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

---

## 13. ISR & On-Demand Revalidation

**ISR (time-based):**
```typescript
// Rebuilds every hour; great for blog content
export const revalidate = 3600

async function getData(slug: string) {
  const res = await fetch(`https://cms.example.com/posts/${slug}`, {
    next: { revalidate: 3600, tags: [`post:${slug}`] },
  })
  return res.json()
}
```

**On-demand revalidation (CMS webhook):**
```typescript
// app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { secret, slug, type } = await request.json()

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (type === 'post') {
    revalidateTag(`post:${slug}`)      // revalidate specific post
    revalidatePath(`/blog/${slug}`)    // revalidate specific path
  } else if (type === 'all') {
    revalidateTag('posts')             // revalidate all posts
  }

  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
```

Wire this endpoint to your CMS webhook. Google sees fresh content without sacrificing build-time performance.

---

## 14. llms.txt

### Static file (most sites)

```
public/llms.txt
```

Content:
```markdown
# Your Brand

> One to two sentence summary of what your product/site does.

## Core Pages

- [About](https://yoursite.com/about): Company background
- [Documentation](https://yoursite.com/docs): Full product docs
- [Pricing](https://yoursite.com/pricing): Plans and pricing

## Key Content

- [Getting Started](https://yoursite.com/docs/start): Zero to deployed
- [API Reference](https://yoursite.com/docs/api): REST endpoints

## Optional

- [Blog](https://yoursite.com/blog): Guides and articles
- [Sitemap](https://yoursite.com/sitemap.xml)
```

### Dynamic generation (CMS-driven sites)

```typescript
// app/llms.txt/route.ts
import { getPublishedPages } from '@/lib/content'

export const dynamic = 'force-dynamic'
// or cache it:
export const revalidate = 3600

export async function GET() {
  const docs = await getPublishedPages('docs')
  const posts = await getPublishedPages('blog')

  const body = [
    '# Your Brand',
    '',
    '> What your product does in one sentence.',
    '',
    '## Documentation',
    ...docs.map(p => `- [${p.title}](${p.url}): ${p.description}`),
    '',
    '## Blog',
    ...posts.slice(0, 20).map(p => `- [${p.title}](${p.url}): ${p.description}`),
    '',
    '## Optional',
    '- [Sitemap](https://yoursite.com/sitemap.xml)',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
```

**Pitfalls:**
- Links must resolve without authentication
- Don't use JavaScript-rendered pages (AI crawlers don't execute JS)
- Missing `>` blockquote under H1 → spec non-compliant
- Stale links (404s) hurt citation quality

---

## 15. Middleware Patterns

### Strip tracking params to prevent duplicate content

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 
                          'utm_content', 'utm_term', 'gclid', 'fbclid', 
                          'msclkid', 'ref']

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  let modified = false

  for (const param of TRACKING_PARAMS) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param)
      modified = true
    }
  }

  // Only redirect if something changed
  if (modified) {
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
```

### Enforce trailing-slash policy

```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /about/ → /about (no trailing slash)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, { status: 301 })
  }
}
```

---

## 16. Route-Level Crawl Control

```typescript
// Block entire route groups from indexing
// app/(app)/dashboard/layout.tsx  (private routes)
export const metadata = {
  robots: { index: false, follow: false },
}

// Allow marketing routes
// app/(marketing)/layout.tsx
export const metadata = {
  robots: { index: true, follow: true },
}

// Specific page: allow index but don't follow links
// app/thank-you/page.tsx
export const metadata = {
  robots: { index: true, follow: false },
}
```

---

## 17. Pages Router vs App Router Differences

| Feature | Pages Router | App Router |
|---------|-------------|-----------|
| Metadata | `next/head` + `Head` component | `metadata` export / `generateMetadata` |
| JSON-LD | `<script>` inside `<Head>` | `<script>` directly in Server Component |
| Sitemap | `pages/sitemap.xml.js` or `getServerSideProps` | `app/sitemap.ts` |
| robots.txt | `public/robots.txt` (static) | `app/robots.ts` (dynamic) |
| Fonts | `next/font` works in both | Same |
| OG images | No built-in | `opengraph-image.tsx` or `/og` route |
| i18n routing | `next.config.js` `i18n` key | Folder-based `[locale]` segments |
| ISR | `revalidate` in `getStaticProps` | `export const revalidate = N` |
| Dynamic segments | `getServerSideProps` | Server Components by default |

**If still on Pages Router:** `next/head` is the right approach for metadata. `generateMetadata` is App Router only and will have no effect in Pages Router.

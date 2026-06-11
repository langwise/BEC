# Core Web Vitals Engineering Reference

LCP, INP, and CLS — root causes, fix patterns, and CI/CD performance budgets. Includes Next.js-specific guidance throughout.

## Metric Overview

| Metric | Measures | Good | Needs Improvement | Poor |
|--------|----------|------|-------------------|------|
| **LCP** | Loading — largest visible element renders | < 2.5s | 2.5–4s | > 4s |
| **INP** | Interactivity — response time after user input | < 200ms | 200–500ms | > 500ms |
| **CLS** | Visual stability — unexpected layout shifts | < 0.1 | 0.1–0.25 | > 0.25 |

**INP replaced FID (First Input Delay) as the official interactivity metric in March 2024.**

Google's ranking signals use **field data** (real user measurements via CrUX), not lab data from Lighthouse. Fix lab data during development, then verify field data improves over 28 days.

---

## LCP (Largest Contentful Paint)

### Find Your LCP Element

```javascript
// Add to page temporarily to identify the LCP element
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries()
  const last = entries[entries.length - 1]
  console.log('LCP element:', last.element)
  console.log('LCP time:', last.startTime)
})
observer.observe({ entryTypes: ['largest-contentful-paint'] })
```

Common LCP elements: hero image, product image, `<h1>` heading, above-fold text block.

### Fix: LCP Image Optimization

**1. Use modern formats (WebP/AVIF — 25–50% smaller than JPEG):**

```html
<!-- Pure HTML -->
<picture>
  <source srcset="/hero.avif" type="image/avif">
  <source srcset="/hero.webp" type="image/webp">
  <img src="/hero.jpg" alt="Hero" width="1200" height="600" 
       fetchpriority="high" loading="eager">
</picture>
```

**2. Next.js approach (handles format conversion automatically):**

```typescript
import Image from 'next/image'

// LCP hero image
<Image
  src="/hero.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={600}
  priority          // REQUIRED on LCP images — triggers preload
  quality={85}
  sizes="(max-width: 768px) 100vw, 1200px"
/>
```

**3. Preload the LCP image in raw HTML:**

```html
<head>
  <link rel="preload" as="image"
        href="/hero.webp"
        imagesrcset="/hero-400w.webp 400w, /hero-800w.webp 800w, /hero-1200w.webp 1200w"
        imagesizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
        type="image/webp"
        fetchpriority="high">
</head>
```

### Fix: TTFB (Time to First Byte)

Slow TTFB directly increases LCP. Improve it:

- **CDN + edge caching** — serve from nearest edge node to users
- **HTTP/2 or HTTP/3** — multiplexing reduces protocol overhead
- **Cache-Control headers** — cache HTML responses at CDN level
- **Server-side rendering time** — profile your DB queries during SSR (use `server.instrumentationHook` in Next.js for APM)
- **DNS prefetch** for external resources:

```html
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="preconnect" href="//api.yoursite.com" crossorigin>
```

**Next.js ISR caching headers:**

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600  // CDN caches the generated HTML for 1h

// Force CDN caching via headers
export async function generateStaticParams() {
  // Pre-generates most popular pages at build time — TTFB ≈ 0
}
```

### Fix: Render-Blocking Resources

Defer non-critical JavaScript and CSS:

```html
<!-- Bad: blocks rendering -->
<script src="analytics.js"></script>

<!-- Good: deferred (runs after parse, preserves order) -->
<script defer src="analytics.js"></script>

<!-- Good: async (executes as soon as loaded, no order guarantee) -->
<script async src="analytics.js"></script>
```

**Inline critical CSS, lazy-load the rest:**
```html
<head>
  <style>/* Only CSS needed for above-fold content */</style>
  <link rel="preload" href="/main.css" as="style" onload="this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/main.css"></noscript>
</head>
```

**Next.js handles this automatically** for bundled CSS. For third-party scripts:

```typescript
import Script from 'next/script'

// Load after page is interactive
<Script src="https://analytics.example.com/script.js" strategy="afterInteractive" />

// Load when browser is idle
<Script src="https://chat-widget.example.com/widget.js" strategy="lazyOnload" />
```

---

## INP (Interaction to Next Paint)

INP measures the time from user interaction (click, tap, key press) to when the browser renders the next frame. Any task running > 50ms is a "long task" that blocks interaction.

### Find Long Tasks

```javascript
// Monitor long tasks in production
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) {
      console.warn('Long task:', {
        duration: entry.duration,
        startTime: entry.startTime,
      })
      // Send to your RUM / error tracking
    }
  }
})
observer.observe({ entryTypes: ['longtask'] })
```

In Chrome DevTools: Performance panel → record trace while interacting → look for red bars in the Main thread row.

### Fix: Yield to Main Thread

Break long tasks into chunks that yield control back to the browser:

```javascript
// Without yielding — blocks all interactions for 500ms
function processData(items) {
  for (const item of items) {
    expensiveOperation(item)  // 500ms total — bad
  }
}

// With yielding — browser can handle interactions between chunks
function yieldToMain() {
  if ('scheduler' in window && 'yield' in scheduler) {
    return scheduler.yield()  // Chrome 115+
  }
  return new Promise(resolve => setTimeout(resolve, 0))
}

async function processData(items) {
  let processed = 0
  for (const item of items) {
    expensiveOperation(item)
    processed++
    // Yield every 5 items
    if (processed % 5 === 0) await yieldToMain()
  }
}
```

### Fix: Web Workers for Heavy Computation

Move CPU-intensive work off the main thread:

```javascript
// worker.js
self.onmessage = function(e) {
  const results = e.data.items.map(item => heavyComputation(item))
  self.postMessage({ results })
}

// main.js
const worker = new Worker('/worker.js')
worker.onmessage = (e) => updateUI(e.data.results)
worker.postMessage({ items: largeDataset })
```

**Next.js worker setup:**
```typescript
// Using next-worker or native Worker API
const worker = new Worker(
  new URL('./worker.ts', import.meta.url)
)
```

### Fix: Optimize Event Handlers

```javascript
// Bad: heavy work on every scroll (60+ times/second)
window.addEventListener('scroll', () => {
  updateParallax()  // expensive
})

// Good: throttled with requestAnimationFrame
let pending = false
window.addEventListener('scroll', () => {
  if (!pending) {
    pending = true
    requestAnimationFrame(() => {
      updateParallax()
      pending = false
    })
  }
}, { passive: true })  // passive: true tells browser no preventDefault needed
```

### Fix: Reduce React Re-renders

```typescript
// Expensive component without memoization
function ProductList({ products, filters }) {
  const filtered = products.filter(p => matchesFilters(p, filters))  // runs every render
  return <ul>{filtered.map(p => <ProductItem key={p.id} {...p} />)}</ul>
}

// Memoized
const ProductList = memo(function({ products, filters }) {
  const filtered = useMemo(
    () => products.filter(p => matchesFilters(p, filters)),
    [products, filters]  // only recomputes when these change
  )
  return <ul>{filtered.map(p => <ProductItem key={p.id} {...p} />)}</ul>
})
```

**Next.js RSC advantage:** React Server Components don't hydrate or re-render on the client, so they have zero INP impact. Keep heavy rendering logic in Server Components; only use `'use client'` for interactive components.

```typescript
// ✅ Server Component: renders HTML, no client JS, no INP impact
export default async function BlogList() {
  const posts = await getPosts()
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}

// ✅ Client Component: only for interactive parts
'use client'
export function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('')
  // ... only this component contributes to INP budget
}
```

---

## CLS (Cumulative Layout Shift)

CLS measures unexpected layout shifts — content moving after it's been painted.

### Common CLS Sources

1. Images without explicit dimensions
2. Dynamically injected content (banners, cookie notices, ads)
3. Web fonts loading and changing text rendering (FOIT/FOUT)
4. Animations that trigger layout recalculation
5. iframes and embeds that resize after loading

### Fix: Always Set Image Dimensions

```html
<!-- Bad: browser doesn't know size until image loads → shifts layout -->
<img src="/product.jpg" alt="Product">

<!-- Good: browser reserves space immediately -->
<img src="/product.jpg" alt="Product" width="600" height="400">
```

**With CSS for responsive images:**
```css
.product-image {
  width: 100%;
  aspect-ratio: 3 / 2;   /* maintains 600:400 ratio */
  object-fit: cover;
}
```

**Next.js `<Image>` prevents this automatically** — always requires `width` and `height` (or `fill`).

### Fix: Reserve Space for Dynamic Content

```css
/* Reserve space for a banner that may or may not appear */
.notification-banner {
  min-height: 56px;
}

/* Cookie notice / chat widget — use fixed positioning */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* Fixed positioning doesn't affect document flow — zero CLS */
}

/* Ad slots — always reserve the declared size */
.ad-slot-leaderboard {
  width: 728px;
  height: 90px;
  /* Empty at first; no shifting when ad loads */
}
```

### Fix: Font Loading

Web fonts cause CLS when the system fallback is swapped for the web font (FOUT — Flash of Unstyled Text).

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: optional;  /* Uses fallback if font isn't ready — zero CLS */
  /* or: font-display: swap  — brief FOUT but text visible immediately */
}
```

Preload critical fonts:
```html
<link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossorigin>
```

**Next.js `next/font`** handles this automatically:
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })
// Self-hosts fonts, inlines CSS, eliminates external font requests — zero CLS
```

### Fix: CSS Animations

Only animate `transform` and `opacity` — these don't trigger layout:

```css
/* Bad: triggers layout recalculation (CLS risk) */
.card:hover {
  width: 110%;      /* layout */
  height: 110%;     /* layout */
  top: -5px;        /* layout */
}

/* Good: GPU-composited, no layout impact */
.card:hover {
  transform: scale(1.05) translateY(-4px);   /* no layout recalculation */
  opacity: 0.95;
}
```

---

## Measuring in Production

### web-vitals Library

```bash
npm install web-vitals
```

```typescript
// app/components/WebVitals.tsx
'use client'
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'
import { useEffect } from 'react'

export function WebVitals() {
  useEffect(() => {
    function sendToAnalytics(metric) {
      // Send to your analytics endpoint
      fetch('/api/vitals', {
        method: 'POST',
        body: JSON.stringify(metric),
        headers: { 'Content-Type': 'application/json' },
      })
    }

    onCLS(sendToAnalytics)
    onINP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onFCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }, [])

  return null
}
```

**Next.js built-in vitals reporting:**
```typescript
// app/layout.tsx
export function reportWebVitals(metric) {
  // Called by Next.js with CWV data
  if (metric.label === 'web-vital') {
    console.log(metric)  // or send to analytics
  }
}
```

---

## CI/CD Performance Budgets with Lighthouse CI

Prevent regressions from reaching production:

```bash
npm install -g @lhci/cli
```

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/blog',
        'http://localhost:3000/pricing',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        // LCP budget
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        // INP proxy (TBT in lab)
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        // CLS budget
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        // Additional budgets
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        // Resource quality
        'uses-optimized-images': 'error',
        'uses-responsive-images': 'warn',
        'render-blocking-resources': 'warn',
        'unused-javascript': ['warn', { maxNumericValue: 30000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

**GitHub Actions integration:**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        run: |
          npm start &
          sleep 10
          npx @lhci/cli autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

This fails the build if any commit causes LCP > 2.5s or CLS > 0.1, before it reaches production.

---

## Next.js-Specific CWV Checklist

| Metric | Next.js Lever | Setting |
|--------|--------------|---------|
| LCP | `<Image priority>` | On first above-fold image only |
| LCP | `next/font` | Self-hosted fonts, no external DNS lookup |
| LCP | `export const revalidate` | ISR for fast HTML from CDN edge |
| LCP | `Script strategy="afterInteractive"` | Defer non-critical scripts |
| INP | React Server Components | Minimize client-side hydration |
| INP | `memo` / `useMemo` | Prevent unnecessary re-renders |
| INP | `dynamic(() => import(...), { ssr: false })` | Lazy-load heavy client components |
| CLS | `<Image width={} height={}>` | Explicit dimensions, no layout shifts |
| CLS | `next/font` with `display: 'swap'` | No FOUT from web fonts |
| CLS | `Suspense` boundaries | Prevents layout jump when streaming resolves |
| All | `export const dynamic = 'force-static'` | Static generation = fastest possible delivery |

### Bundle Size Impact on INP

```typescript
// Lazy-load heavy components (reduces initial JS, improves INP)
import dynamic from 'next/dynamic'

const HeavyChartComponent = dynamic(
  () => import('@/components/HeavyChart'),
  {
    loading: () => <div className="chart-skeleton" />,
    ssr: false,  // client-only component, no SSR needed
  }
)

const CodeEditor = dynamic(
  () => import('@/components/CodeEditor'),
  { ssr: false }
)
```

### Streaming with Suspense for Perceived Performance

```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <main>
      {/* Critical shell renders immediately */}
      <HeroSection />
      
      {/* Slower data resolves progressively — doesn't block LCP */}
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments />  {/* async Server Component */}
      </Suspense>
      
      <Suspense fallback={<RelatedPostsSkeleton />}>
        <RelatedPosts />
      </Suspense>
    </main>
  )
}
```

The shell (hero section) paints fast → LCP is measured against this → streaming sections resolve without impacting LCP.

---

## Quick Diagnosis Guide

**Slow LCP?**
1. Run Lighthouse → identify LCP element
2. If image: add `priority`, check format (WebP/AVIF), check size
3. If text: check TTFB, check render-blocking CSS/JS
4. Check server response time — database queries in SSR?

**High INP?**
1. Open DevTools → Performance → record while clicking
2. Look for long red tasks in Main thread
3. Find the click handler → is it doing heavy work?
4. Split with `scheduler.yield()` or move to Web Worker
5. Check React re-render cascades with Profiler

**High CLS?**
1. Run Lighthouse → click "View Treemap" for CLS sources
2. Check all images for missing width/height
3. Check for late-loading content (banners, ads, chat widgets)
4. Check font loading — switch to `next/font`
5. Check for CSS animations using `top/left/width/height` → migrate to `transform`

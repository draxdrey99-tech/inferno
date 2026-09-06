# Inferno Emails audit

Audited 6 September 2026. Starting revision `0f3ccb2`, plus seven pre-existing edited files. Their exact patch is in `baseline/starting-worktree.patch`; the redesign starts from the working tree, not the older commit. No AGENTS.md was found in the project or inspected parent locations. No Sites hosting configuration exists.

## Foundation

- Next.js 16.3.3 App Router, React 19.2.8, TypeScript strict mode. Server-rendered marketing pages, client islands for navigation, forms, FAQs and the admin editor.
- Tailwind 4 with CSS theme tokens and shared global component classes. Archivo display and Geist body, self-hosted by next/font.
- No existing animation library. IntersectionObserver fades, CSS marquee, image hover pan. `.reveal` hides server HTML visually until JS runs: accessibility/progressive enhancement defect.
- next/image supplies AVIF/WebP, responsive sizes and dimensions. Original client PNGs are in public/images; old WordPress assets remain in _legacy, excluded from deployment.
- Vercel target; Neon Postgres stores posts/leads, Vercel Blob stores CMS media, jose signs admin cookies. No local environment credentials are present. Baseline production build succeeds with empty blog. No fabricated posts or database writes will be introduced.
- Public pages: `/`, `/blog`, `/blog/[slug]`, `/privacy`, `/terms`, custom 404. `/admin` is private/noindex. API routes: lead, admin login/logout/posts/upload. Metadata endpoints: icons, OG, sitemap, robots, RSS and per-post OG.
- Existing redirects: www to apex, WordPress path, home, services and service slugs, work/our-work/portfolio, about, contact/contact-us, free-email-audit/audit. Preserve destinations; promote valid service paths to actual pages in Phase 4.
- Components: Nav, Footer, Wordmark, Section, EmailCard, Marquee, Faq, AuditForm, CtaBand, JsonLd, HideOnAdmin, RevealObserver; admin AdminApp and Editor. Content lives in lib/site.ts; blog sanitization, queries, metadata/schema and reading time in lib/blog.ts.

## Content and conversion findings

Three real dashboards; eight full-length email designs; five client logos; three testimonials; four complete service definitions (including currently unrendered intros/FAQs); process, beliefs, fit criteria and audit scope. Exact values and reporting windows are captured in CONTENT-INVENTORY.md and baseline/content.json.

Hero proof chip visually shares a frame with Girafon artwork despite an unattributed dashboard: separate these so no client-result association is implied. Current hero claims profitability which screenshots cannot establish. Preserve the old phrase as a stated aim and use the brief's list-revenue positioning for the H1.

Calendar link exists and avoids database dependence. Form requires more fields than API; reduce required inputs to name and email, preserve all optional fields. No-JS users need the existing calendar/email alternatives. Booking completion belongs to Calendly and must not be fabricated locally.

## Measurement method

Production `next build` + `next start` at localhost:3210. Automated Chromium screenshots at 320, 375, 768, 1024, 1440, 1920, including admin sign-in and 404. Published post routes discovered through sitemap when available. New service routes have no baseline page: their previous response was a redirect to the home service section.

Lighthouse CLI uses bundled Chrome for Testing, simulated mobile default throttling and desktop 1x CPU/40ms RTT. Full JSON/HTML saved in lighthouse/. Scores are local lab measurements, not production field data. INP requires interaction evidence and cannot be inferred from a Lighthouse score. Final verification will record limitations explicitly.

## Scores

Baseline and final results are populated from the saved report files below after each run.

| Stage | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Before | mobile | 86 | 100 | 100 | 100 | 3.94s | 0 | 141.5ms |
| Before | desktop | 99 | 100 | 100 | 100 | 0.80s | 0 | 22ms |
| Final | mobile | 95 | 100 | 100 | 100 | 2.87s | 0 | 44.5ms |
| Final | desktop | 100 | 100 | 100 | 100 | 0.65s | 0 | 0ms |

Final figures come from lighthouse/final-summary.json, measured after the brand revision with no concurrent browser checks. The preceding red-palette run (after-summary.json) measured mobile 95 / LCP 2.97s. Score thresholds and CLS pass; **mobile LCP remains above the requested 2.5s target** despite improvement from 3.94s. Earlier development measurements varied, including a 2.40s run before the final palette pass; these do not replace the final result. Investigate production caching and hydration cost before declaring the LCP goal achieved. Diagnostic phase3/optimized/measured reports are historical experiments, not final results.

## Final verification and operating limits

The user's palette revision is applied throughout: flame-red branding, accessible red controls/accents, neutral charcoal and warm-white proof panels. The original wordmark is unchanged. Final font is a single 28,964-byte Archivo variable Latin subset, self-hosted; the baseline framework description above records the original two-family setup.

Production build, lint and TypeScript complete with zero errors. Automated results: 112 responsive/axe/interaction checks, 206 content-preservation checks, 28 image/redirect/revenue checks and 10 design checks, all passing. SEO validation: zero failures or warnings across all ten sitemap pages. Every original proof value, date window, service text and asset survives; see verification/content.json. Native disclosures preserve FAQ answers without JavaScript. Form feedback is tested with intercepted responses, never real submissions.

There are 36 baseline and 72 final full-page screenshots at 320, 375, 768, 1024, 1440 and 1920 pixels, including sign-in and 404. New service URLs have no separate baseline page because they previously redirected to the home service section. Final captures have zero horizontal page overflows. Extra hero, proof, work and reduced-motion detail captures are saved alongside them.

Chrome DevTools trace: 389 frames in a 6.5-second desktop scroll sample, median 16.7ms, p95 16.8ms, no frames over 33.4ms. FAQ Event Timing samples were 32ms. This is a lab interaction sample, not a field INP measurement; production INP remains unmeasured. The trace is saved in verification/scroll-trace.json.

The production build was checked locally at http://localhost:3210. No deployment was performed. Database credentials are absent, so published blog content, authenticated CMS publishing, live lead delivery and calendar-provider completion could not be verified. Existing CMS, RSS and Article metadata logic remain; the empty-blog state is captured. No fabricated posts or real bookings were created. Final production verification requires the configured deployment and real-user performance data.

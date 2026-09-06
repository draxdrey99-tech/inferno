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

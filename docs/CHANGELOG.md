# Redesign changelog

## Phase 0

Preserved the seven pre-existing worktree edits as a binary patch and captured source/data, original asset manifest, full-page baseline images and Lighthouse reports. Added reusable measurement tooling. Installed development-only browser, lint and Lighthouse dependencies. No original assets, content or routes deleted.

## Phase 1

Implemented the proof-desk palette and typography from DESIGN-PLAN.md, superseding the prior DESIGN.md theme lock. Archivo normal display and Geist body retained; unused italic face no longer loaded. Replaced generic glows, gradient accents, rounded cards and CSS-hidden reveal state with readable server HTML and editorial surfaces. Native FAQs work without hydration. Logo motion gets a persistent pause checkbox. Dynamic GSAP/ScrollTrigger + CSS perspective and Lenis provide selective desktop choreography; reduced-motion users get static content. Inner-page entrance uses a transform-only 250ms animation.

Animation clipping uses a static mask with transformed words, resolving the brief's tension between clip-path reveals and compositor-only animated properties. Existing .reveal classes remain harmless styling hooks. No content or routes removed.

## Phase 2

Hero rebuilt around CSS 3D campaign sheets and a separate unattributed revenue receipt. Proof panels show every original caption, note and exact reporting window, plus original-image links and the exact cents used by scroll counters. Kept all eight emails; added their existing descriptive notes and full-image links. Desktop work exploration uses an accessible horizontal rail rather than trapping focus inside a pinned horizontal canvas. Quiet content retains original paragraphs and deliverables.

Copy change: old H1 “Turn your email list into your most profitable channel.” becomes “The cheapest revenue is already on your list.” The old wording survives under About, prefaced “Our aim:” because attributed revenue is not profit. Existing hero subhead, risk reversal, stats and all proof wording are retained. Added “Creative for…” client names and an explicit unattributed-account caption to avoid implying the anonymous screenshot belongs to Girafon Bleu. Belief numbers were decorative and are no longer displayed; belief titles/body are untouched.

Company name and Store URL labels gain “(optional)”; only name and email are mandatory, matching existing API validation. Phone, message and all existing fields remain. Calendar link remains the primary conversion path. No routes or assets removed. Production build and TypeScript pass.

## Phase 3

Fixed mask word spacing after visual review. Added three small WebP hero crops generated from original emails, retaining every source PNG. Foreground artwork gets priority loading; wordmark requests its actual display size. GSAP/Lenis are not fetched on mobile or reduced-motion devices. Corrected mobile CTA persistence and kept navigation as a nonmodal disclosure so it cannot trap keyboard focus. Added a no-JS email alternative to the form. Existing FAQ answers are native HTML disclosures.

Enabled the ESLint CLI (the old `next lint` script is unsupported in Next 16). Fixed navigation state reset by keying it to the route; two narrowly documented lint exceptions preserve existing admin synchronization with remote queries/TipTap. No CMS behavior changes. Automated check suite covers six widths, axe, runtime errors, no-JS, reduced motion, keyboard, mobile menu, gallery, and mocked form outcomes. All 58 existing-page checks pass. Intermediate Lighthouse reports are retained as diagnostics; final scores are measured again in Phase 5 without concurrent browser tests.

## Phase 4

Promoted `/services` and `/services/klaviyo-email-marketing`, `/services/email-design`, `/services/email-deliverability`, `/services/retention-strategy` from redirects into real pages. Added `/services/email-flows`. No route was deleted or renamed. Unknown service slugs keep the former permanent redirect to `/#services`; every other legacy redirect remains. New flow-page copy describes scope/process without adding performance claims. Original service intro/summary/deliverables/outcome/FAQs are now all rendered, not merely stored in data.

Added indexable service metadata, Service/FAQ/Breadcrumb schema, sitemap entries, links from home/navigation/footer/blog, and individual service/social cards. Legal pages gain breadcrumbs. Existing Article/BlogPosting author/dates, related posts, reading time, RSS and sanitized CMS content system retained. Fixed per-post OG params for Next 16's async params. No database, authors, posts or dates fabricated.

Metadata titles now use an absolute title to prevent duplicate “Inferno Emails” suffixes. Titles longer than 59 characters and descriptions longer than 154 are shortened at word boundaries in metadata only; original stored copy and visible headings remain. Home old generated title: “Email Marketing Agency for Ecommerce Brands | Inferno Emails | Inferno Emails”; new: “Ecommerce Email Marketing Agency | Inferno Emails”. Service summaries in the content inventory are unchanged. Shared metadata helper applies the same concise description to OG and Twitter.

Build and lint pass after adding the service routes. Verification against the production server continues in Phase 5.

## Phase 5

Aligned the design with the user's logo-color correction: replaced lime #D6F276 and olive backgrounds with original flame red #F51717, neutral charcoal #171717 and warm white #F2EFED. Small red text uses #FF5252; primary controls use #E21B1B with white labels (4.76:1). Original logo pixels are untouched. Social cards, forms, navigation, focus states, proof accents and every service page share this palette.

Consolidated display/body typography to a single self-hosted Archivo variable Latin subset, 28,964 bytes, weights 400–800. The generated font is committed; its generation script and license are included. Removed the unused Geist package. Social images load their font from the local package instead of depending on Google's font server. Diagnostic font experiments are retained in docs/experiments, outside application imports.

Converted revenue counters to fixed-width digit reels with transform-only animation; exact original cents remain server-rendered and screen-reader accessible. Mobile logo motion is static with native horizontal scrolling. Corrected gallery caption layout and made reduced-motion/no-JS content complete. A pre-render redirect handles unknown service paths with a single correct Location header while retaining every real service and OG endpoint.

Verification: production build, lint and TypeScript pass; 112 responsive/accessibility/interaction checks, 206 inventory-preservation checks and 28 image/redirect/revenue-detail checks pass. SEO checks have zero warnings or failures; all 10 design checks pass. After screenshots cover all 12 locally available pages (including sign-in and 404) at all six requested widths. Baseline covers the six original page states; new services previously redirected to the home section. Final Lighthouse and profiling measurements are recorded in AUDIT.md.

Copy changes beyond Phase 2: home metadata title is now “Ecommerce Email Marketing Agency | Inferno Emails”; the closing CTA retains its existing “Book your free audit” label. The user’s pre-existing closing-band markup is preserved. Original service copy, proof figures/windows, client assets and testimonials remain. No existing content, routes or image assets were deleted. Pre-existing root screenshots and .playwright-mcp files remain outside these commits.

Local validation only: database credentials are absent, so the existing CMS returns its empty-blog state. Authenticated publishing, real lead delivery, live post content and Calendly booking completion have not been exercised. Form outcomes are tested with intercepted success/error responses. No real submissions, bookings or deployment were made. Production field INP still requires real-user measurement after deployment.

## Follow-up: quieter red and mobile proof motion

The user found the first red revision too bright and pointed out that revenue animation was missing on mobile. Changed CTA fill from #E21B1B to muted crimson #B83A45 (hover #A3303B), and accents from #FF5252 to coral #ED8C83. The logo keeps its original #F51717 pixels. Social cards use crimson rules. White button contrast is 5.63:1; coral on charcoal is 7.41:1.

Added native IntersectionObserver + Web Animations digit reels on touch/small screens. Each amount animates once when at least 65% visible, settles to exact original cents, and retains all reporting windows. No GSAP or Lenis is imported for this mobile behavior. Reduced-motion/no-JS views retain static correct figures; switching reduced motion on cancels active reels. Route cleanup disconnects observers and cancels animations. Desktop pinned proof remains unchanged.

Mobile regression checks exercise actual animation start, exact ending digits, no replay, reduced-motion/no-JS completeness, and runtime preference changes at 320, 375 and 768 pixels. Palette previews are saved as crimson-* under docs/screenshots. Prior Phase 5 screenshots and Lighthouse results describe the preceding revision; this follow-up does not claim a new performance score. No content or routes removed.

## Follow-up: focused mobile hero and audit popup

Mobile CRO revision: one visible full-width booking CTA, a compact dated proof point before the CTA, and calmer headline tracking. New mobile eyebrow: “Klaviyo for ecommerce brands”; new short subhead: “Turn subscribers into repeat customers with better email marketing.” The previous eyebrow and full Klaviyo flows/campaigns/deliverability sentence remain in the native “See client work” disclosure on mobile and retain their desktop positions. Client creative previews, original client names, extra statistics, logo strip and receipt context remain available in that disclosure. The full work gallery and all three dashboards remain in the page. Desktop hero composition is retained. This is a conversion-focused design hypothesis; no measured conversion-lift claim is made.

Added an Inferno free-audit popup inspired by the supplied split-panel screenshot: a tilted audit-scope sheet, real scope items from AUDIT_CHECKS, concise offer copy and existing Calendly CTA. Uses the site's crimson/coral palette. No unrelated-industry claims, invented pricing or promised downloadable product were carried over.

Trigger behavior: “What’s in the free audit?” in the contact section opens it explicitly on all devices. Desktop can also show it once per session when the pointer leaves the top edge, after 20 seconds and after scrolling beyond the hero. No automatic mobile popup. Booking clicks suppress automatic prompts. Focused form fields are not interrupted. Session storage is optional and falls back to in-memory suppression. Native dialog, explicit focus cycling/restoration, Escape, backdrop and neutral “Keep browsing” dismissal, and background scroll locking are verified. The manual popup control is hidden without JavaScript; existing booking and contact paths remain usable.

Build/typecheck and lint pass. Mobile hero checks: 21 passing including native keyboard/no-JS disclosure, single CTA, above-fold proof/action, mobile axe and overflow. Popup checks: 30 passing including responsive fit, axe, focus, dismissal, exit timing and session suppression. All 206 content-preservation checks still pass. New screenshots: cro-* and audit-popup-* in docs/screenshots.

## Follow-up: SEO and GEO pass, lighter home page, ember field

Ran `seo-geo-audit-playbook.md` against the codebase and the live domain on 10 September 2026. The live domain returned HTTP 522 from Cloudflare on every page and for GPTBot; the Vercel account on this machine has no project for the repository. This is recorded as the first item in docs/SEO-GEO-ROADMAP.md, which holds the full step-by-step plan, page buckets, keyword tiers, content briefs and the judgment calls made.

Search surface: the home H1 gains a small keyword kicker line inside the same heading. Every service page opens with a two-sentence direct answer (`answer` on each Service) above the existing intro. The home services section opens with a one-paragraph quick answer built from existing copy. `/work` is an indexable page with all nine emails, per-email H2s, links to the owning service page, four FAQs and ItemList/ImageObject schema; `/our-work` and `/portfolio` redirect there. Added `/llms.txt`, explicit AI-crawler allow rules in robots.txt, honest sitemap lastModified dates, an Organization ContactPoint and slogan, and an automatic related-services block on blog posts. The Forbes 30 Under 30 Europe 2025 claim about KÍLÈNTÀR's founder was verified against Forbes' own profile page and retained.

Text density: home service rows show title, summary, outcome and a link; the six deliverables per service remain on each service page. About is two paragraphs; beliefs are native disclosures with the first open. All copy remains in server HTML.

Motion: `components/EmberField.tsx` and `components/embers.ts` add a Three.js ember field behind the hero, contact section and CTA band. Desktop, fine pointer, normal motion and adequate hardware only; loads after load plus idle; pauses off-screen and on hidden tabs; canvases are aria-hidden. The dead `.orb` elements it replaces had no CSS. Three.js is a new dependency; its chunk is 132KB gzipped and never ships to phones.

Checks updated: taste-check now expects nine email designs and asserts every canvas is decorative; seo-check crawls `/work`; final-details expects the new redirect targets. New `scripts/embers-check.mjs` and `scripts/embers-pixels.mjs` verify the field mounts on desktop only and actually draws. Content-check reports 15 pre-existing failures from the earlier KÍLÈNTÀR commit (stale baseline expects the removed anonymous portfolio items); not changed here. Nothing was committed or deployed.

## Follow-up: ember flair as interaction, and a visible path to purchase

The user liked the hero ember field and asked for it to carry through the site as small interactions, and for the buying path to be more obvious. Primary buttons now lift a few CSS sparks on hover and warm at the edge; service rows, email cards, FAQ and belief titles, process icons and the hero proof figure respond to hover with an ember glow. The inner-page headers (services, each service, work, blog) get a low-density ember field capped at 720px tall so the GL surface stays small. Ember hosts are pointer-events:none and listen on the document, so no click is ever blocked. All of it is transform and opacity, gated by the same desktop, fine-pointer, normal-motion and hardware checks, and inert under reduced motion.

Conversion structure on the home page: the process section is now "How to start", moved directly after Services and before Work, with a boxed offer (the four audit checks as chips linking to the audit section, the primary button, and the pricing rule "we quote after the audit, and only if we think we can help"). The proof section ends with a next-step row (question, button, "How it works" link). The work rail ends with "Want emails like these? Book your free audit" beside the link to `/work`. The audit-checks section has an anchor (`#audit`). The mobile persistent nav button is slightly larger. No copy in lib/site.ts changed; PROCESS and AUDIT_CHECKS render from data as before.

Checks: typecheck, lint, build; 10 design checks (the canvas check now accepts an aria-hidden host); 112 responsive, axe and interaction checks; SEO crawl 0 failures. Ember checks confirm mount on desktop only, pixels drawn, inner-page canvases capped at 720px. Lighthouse re-run alone is recorded in seo-geo-summary.json.

## Follow-up: one-shot proof reels, page-wide embers, less copy

Proof amounts no longer pin or scrub with scroll on desktop. Every device now uses the same one-shot Web Animations digit reel (`components/revenue-reels.ts`, formerly mobile-revenue.ts): each amount settles once, smoothly, when at least 40% of it is in view, 1.3 seconds with a settle ease. The GSAP proof timeline is removed from motion.ts; hero sheet parallax and the work-rail scale remain. Static exact figures still render for reduced-motion and no-JS visitors.

The per-section ember canvases are replaced by one fixed, page-wide layer (`components/PageEmbers.tsx`) mounted in the root layout and hidden on admin routes. One WebGL context, one draw call, count scaled to viewport area, gentle parallax with scroll, pointer repulsion in viewport space. Raised section grounds, the proof paper, the contact card and the footer are slightly translucent on desktop so the embers read through every section; on screens under 1024px the canvas is display:none and the grounds return to their opaque tokens. Gating is unchanged: desktop, fine pointer, normal motion, adequate hardware, after load and idle.

Copy: home service rows drop the outcome line (it stays on the service page); the work, about and audit intros are shortened. Headline accent phrases are now coral (`.accent`), a deliberate departure from the earlier plan's "no isolated accent word" rule because the user asked for the site to feel less flat; revert by setting `.accent` colour back to inherit.

Checks: typecheck, lint, build; design, SEO, 112 responsive/axe/interaction checks; ember checks (single canvas, desktop only, pixels drawn); revenue-reel checks at 320, 375, 768 and a desktop reel check. Lighthouse re-run alone is recorded in seo-geo-summary.json.

## Follow-up: brand red, and a parallel CRO, SEO and design pass

The user found the coral accent off-brand. Accents now use the logo red family: `.accent` display phrases are the exact logo red #f51717 (large text, 4.28:1 on charcoal), small red text uses #ff4747 (5.33:1 on charcoal, 4.71:1 on the raised ground), primary buttons are a true red #cc1c1c with white labels (5.6:1), and the ember shader and social cards use the same family. Coral #ed8c83 and crimson #b83a45 are gone.

Three agents then worked in parallel on disjoint files. CRO (app/page.tsx, AuditForm, AuditPopup, CtaBand): a "See the account screenshots" link beside the first CTA, single-line CTAs after testimonials and FAQ, a primary button and risk reversal in the audit-scope section that the chips link to, form fields reordered to name, email, store URL, company, phone, a success state that says what happens next with a Calendly shortcut, risk reversal placed directly under every primary button. SEO (lib/site.ts, lib/service-pages.ts, lib/seo.ts, services, work, blog, legal pages): two added FAQs per service (five each), a fit and not-fit block and related-reading links on every service page, Offer, Audience and mainEntityOfPage on the Service schema, the services index rebuilt as a best-for, starts-with, measured-by comparison with its own FAQPage, proof and work links across owned pages, roadmap updated. Design (globals.css, EmailCard, Footer, Marquee): quiet 4px surfaces with low-alpha red hover warmth, ledger treatment on the proof panels, gallery-style email captions, tighter footer with a red hairline, tabular numerals on the receipt and stats. Existing service copy and proof figures are unchanged.

One axe finding from the pass (the About accent line at 22px regular in pure red) is fixed by setting it bold so it qualifies as large text. All other checks: design 10, SEO crawl 0 failures, revenue reels 24, ember checks, content-preservation 15 pre-existing failures unchanged.

## Follow-up: CRO/SEO final pass on the audit form, popup and structured data

Scoped to `components/AuditForm.tsx`, `components/AuditPopup.tsx`, `lib/blog.ts`, `lib/seo.ts`, `app/layout.tsx` and `app/llms.txt/route.ts` while the redesign of the home page and inner pages continued elsewhere. AuditForm labels now use `.mono-label` instead of a plain grey paragraph, matching the instrument-panel type system; the primary submit and popup CTA switch from the `.btn-flame` alias to the canonical `.btn-solid` class documented in `globals.css` (same rule, same rendered button); the success-state panel drops a dead `rounded-xl` utility that square-corner rules already override. Field ids, the honeypot, `role="alert"`/`role="status"`, the `source` prop, the popup's dialog/focus/scroll-lock behaviour and both button labels ("Send my details", "What's in the free audit?") are unchanged, matching `scripts/verify.mjs` and `scripts/audit-popup-check.mjs`.

Structured data: `articleJsonLd` now adds `articleSection` from a post's first tag when present, and `authorNode`'s Organization branch points `url` at `${SITE_URL}/#about` instead of the bare site root. The site-wide `WebSite` node in `lib/seo.ts` gains a `SpeakableSpecification` targeting `#answer` and `h1`. Root metadata adds `category: 'Marketing'` and an `alternates.types` entry so `/rss.xml` is advertised as an RSS alternate; `alternates.canonical` is unchanged. `llms.txt` gains a "How to work with us" section stating the free 30-minute audit, the four `AUDIT_CHECKS` titles, and the existing quote-after-audit rule, sourced entirely from `lib/site.ts`. No copy in `lib/site.ts` was invented or rewritten; a pass for typos/inconsistencies found none beyond the already-documented 44 to 48 percent range versus the single 47.96 percent account, which is intentionally left as is.

Checks: `npm run typecheck`, `npm run lint`.

## Redesign: HUD / blueprint system inspired by the client's reference

The client asked for the vibe of a dark, technical Framer reference site (near-black grid grounds, hairline square panels, mono uppercase micro-labels, huge light-weight headlines with boxed words and one LED-dotted accent phrase, sparing red glows, white square primary button with a red arrow tile, capability ticker, giant footer wordmark) translated onto Inferno's brand. A Head of Design agent rebuilt the system and home page; an inner-pages designer applied it to services, work, blog and legal pages; a CRO and SEO QA agent restyled the form and popup, extended schema (Speakable, articleSection, Offer, Audience), and reviewed the home page. Its six findings were applied: meta description shortened to 150 characters, Service schema now covers all five service pages, CTA wording unified to "Book your free audit", risk reversal added under the work CTA, real headings no longer forced uppercase, the offer panel title is an h3.

System (documented at the top of app/globals.css): --font-mono system stack, .mono-label, .section-index, .hud-box, .panel, .panel-grid, .panel-corners, .panel-set, .cta-gradient, .ruler, .rule-dots, .ticker, .btn-solid, .btn-line, retuned display scale (Archivo 400/400/500), LED-dot .accent implemented with a CSS mask over the logo red (no font download; solid red under 768px and at .display-md, where it uses #ff4747 for AA). Brand red only. Proof panels are dark ledgers; the dashboards are the only light surfaces. Footer mark is CSS-only (no upscaled flame PNG). The page-wide ember layer is retained.

Fixes from review: LED dot density scales with font size; hud-box punctuation moved inside the box on inner pages; main clips a 1px corner-tick overflow at the page edge; .display-md accents use #ff4747. Checks: typecheck, lint, build; design 10; SEO crawl clean; 112 responsive, axe and interaction checks; 24 revenue-reel, 30 popup and mobile CRO checks; ember checks; Lighthouse recorded in seo-geo-summary.json.

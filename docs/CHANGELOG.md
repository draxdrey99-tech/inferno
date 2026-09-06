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

Metadata titles now use an absolute title to prevent duplicate “Inferno Emails” suffixes. Titles longer than 59 characters and descriptions longer than 154 are shortened at word boundaries in metadata only; original stored copy and visible headings remain. Home old generated title: “Email Marketing Agency for Ecommerce Brands | Inferno Emails | Inferno Emails”; new: “Email Marketing Agency for Ecommerce Brands | Inferno Emails”. Service summaries in the content inventory are unchanged. Shared metadata helper applies the same concise description to OG and Twitter.

Build and lint pass after adding the service routes. Verification against the production server continues in Phase 5.

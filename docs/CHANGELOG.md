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

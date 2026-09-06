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

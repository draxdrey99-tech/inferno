# Redesign changelog

## Phase 0

Preserved the seven pre-existing worktree edits as a binary patch and captured source/data, original asset manifest, full-page baseline images and Lighthouse reports. Added reusable measurement tooling. Installed development-only browser, lint and Lighthouse dependencies. No original assets, content or routes deleted.

## Phase 1

Implemented the proof-desk palette and typography from DESIGN-PLAN.md, superseding the prior DESIGN.md theme lock. Archivo normal display and Geist body retained; unused italic face no longer loaded. Replaced generic glows, gradient accents, rounded cards and CSS-hidden reveal state with readable server HTML and editorial surfaces. Native FAQs work without hydration. Logo motion gets a persistent pause checkbox. Dynamic GSAP/ScrollTrigger + CSS perspective and Lenis provide selective desktop choreography; reduced-motion users get static content. Inner-page entrance uses a transform-only 250ms animation.

Animation clipping uses a static mask with transformed words, resolving the brief's tension between clip-path reveals and compositor-only animated properties. Existing .reveal classes remain harmless styling hooks. No content or routes removed.

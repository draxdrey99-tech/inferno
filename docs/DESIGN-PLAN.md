# Design plan: the email proof desk

## Direction, before implementation

An email agency should look like the people who made the emails. The hero is a desk of real campaign sheets suspended in perspective, paired with a severe, tightly set headline. The next scene turns to a warm paper ledger: a large attributed-revenue figure opposite the entire original dashboard and its exact reporting window. Email creative and accounting evidence are visually distinct, so a client logo never accidentally endorses an anonymous result. Quiet editorial rows carry the rest of the content. No invented performance, awards or team portraits.

## Palette

| Name | Hex | Role |
|---|---|---|
| Carbon | #171916 | Main background and paper-panel text |
| Moss black | #222820 | Raised areas |
| Stock | #F1EEDF | Proof panels and primary text |
| Ledger | #B7BCAB | Secondary text on dark |
| Signal | #D6F276 | Primary CTA and readable accent on dark |
| Ember | #F66B45 | Brand accent, large numerals/rules only |

Flame stays in the brand wordmark; acid green directs action. This is a deliberate change from the old single-red theme. Body contrast will be verified by axe/Lighthouse, including alpha utilities.

## Type

Keep Archivo's broad industrial forms for headlines; remove the unused italic face. Keep Geist as the quiet reading face. Both are already hosted by next/font, so this is a choice for a proof-led document aesthetic without adding a font dependency. No isolated italic/gradient word.

| Role | Mobile | Desktop | Treatment |
|---|---|---|---|
| Hero | 42px (36px at 320) | 76px | Archivo 800, -0.065em, 0.98 line |
| Section | 34px | 64px | Archivo 700, -0.05em, 1.04 |
| Revenue | 44px | 82px | Archivo 700, tabular numbers |
| Subhead | 24px | 32px | Archivo 700 |
| Lead | 16px | 18px | Geist, 1.65 |
| Body | 15px | 16px | Geist, 1.7 |
| Caption | 12px | 13px | Geist, sentence case |

## Section layouts

```
Header     [wordmark]        [Services Work About Blog]    [Book audit]
Hero       [positioning]                 [email sheet /]
           [The cheapest revenue]       [/ sheet   sheet]
           [is already on your list.]   [independent dashboard receipt]
           [what / who]                 [creative caption]
           [primary] [work] / risk
           [47.96% + exact date] [client names]
Stats      [share]        [8 creative]       [2022]       [3 continents]
Logos      [logo    logo    logo    logo    logo]  (pause control)
Proof      PAPER: [headline] [intro]
           [revenue / window] | [complete dashboard]  <- each pins briefly
           [scope / note]     | [open source image]
Services   [headline]       [service / summary / deliverables / outcome]
           [intro]          [next service / ...]      <- editorial rows
Work       [headline + intro]     [previous] [next]
           [email / caption] [email / caption] [email ...] <- horizontal
Process    [Audit] ---------------- [Build] ---------------- [Compound]
About      [position + long copy] | [belief / explanation] [belief ...]
Fit        [heading]             [good fit]             [bad fit]
Quotes     [large first quote]              [two quieter quotations]
Audit      [scope intro]         [check / detail] [check / detail]
FAQ        [headline]            [native disclosure / answer] ...
Contact    [final invitation]    [name / email / optional store details]
           [calendar / next step] [send / privacy]
Footer     [wordmark + positioning] [services] [company] [legal]
Inner      [breadcrumb] [H1 / intro] [scope] [proof] [FAQ] [related / CTA]
```

On phones: H1, subhead, primary CTA, adjacent risk reversal and short proof appear before the art; the art is compact. Proof flows naturally with no pinning. Work is a native horizontally scrollable rail with buttons and keyboard access; no content depends on scroll animation.

## Motion choreography

Three named eases only: `settle = cubic-bezier(.16,1,.3,1)`, `travel = cubic-bezier(.65,0,.35,1)`, `linear`. Lenis only on wide, fine-pointer devices with normal motion and adequate cores/memory; native scrolling otherwise. GSAP/ScrollTrigger dynamically imported after first paint on homepage.

- Hero: 650ms word entrance through static clipping masks; animate transforms inside masks rather than clip-path values (brief's compositor-only rule takes priority). H1 is server-visible first; never wait for a preloader. Art sheets move at separate scroll velocities and settle in Z. CSS perspective provides real 3D without WebGL cost.
- Proof: each complete ledger panel pins and scrubs on desktop. Screenshot scales 0.96 to 1; revenue readout scrubs to exact cents from inventory. Original full value remains accessible; visual counter uses fixed width. Counting text is only updated when displayed value changes; no animated layout styles.
- Work: horizontal desktop timeline, native accessible rail fallback. Masked images reveal via transform. Hover/focus provides access to the full email, with original image links for touch and no-JS use.
- CTAs: pointer magnetic translation capped at 5px; no movement on touch. Proof/art tilt capped at 4 degrees. Easing 350ms settle. Clean up listeners and timelines on navigation.
- Inner routes: brief 250ms content entrance, with server content visible. No global cursor, no preloader, no fade-up on every section. Every transition collapses in reduced-motion mode; JS initialization never conceals the page.

## Critique and revision

Generic dark grid? Replace repeating boxes with open service rows, a horizontal creative rail and warm dashboard ledgers. Arbitrary green? It has one job: audit action; orange belongs to the artwork/brand, never random glows. Type novelty? Keep useful broad Archivo, remove the template's tiny headline and italic accent. Impressive motion? Spend it on comparing actual receipts and creative; avoid pinning long body copy. Anonymous proof plus named email? Separate captions and explicitly label accounts as unattributed. Minimal hero at expense of content? Move old hero claim to a clearly qualified agency aim and keep every other paragraph, stat and asset. Old theme/shape/hero limits in DESIGN.md conflict with the explicit brief; this plan supersedes them.

## Gallery reference study

Reviewed the current [Framer trending gallery](https://www.framer.com/community/gallery/), and its listed [Midu](https://midu.design/), [Bureau Dimanche](https://www.bureaudimanche.com/) and [Pilea](https://pilea.agency/) sites on 6 September 2026. Extracted principles: large statement before project evidence, project-specific art as identity, and separation of confident display moments from longer service detail. Browser text retrieval confirms content structure, not timing or 60fps behavior; choreography here is our own implementation, not an unverified claim about their motion. No source artwork or copy is reused.

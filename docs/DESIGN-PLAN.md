# Design plan: the email proof desk

## Direction, before implementation

An email agency should look like the people who made the emails. The hero is a desk of real campaign sheets suspended in perspective, paired with a severe, tightly set headline. The next scene turns to a warm paper ledger: a large attributed-revenue figure opposite the entire original dashboard and its exact reporting window. Email creative and accounting evidence are visually distinct, so a client logo never accidentally endorses an anonymous result. Quiet editorial rows carry the rest of the content. No invented performance, awards or team portraits.

## Palette

| Name | Hex | Role |
|---|---|---|
| Carbon | #171717 | Neutral charcoal background and paper-panel text |
| Warm black | #242222 | Raised surfaces |
| Stock | #F2EFED | Warm white proof panels and primary text |
| Ledger | #BDB6B2 | Secondary text on dark |
| Flame | #F51717 | Original logo red and decorative brand marks |
| Coral | #ED8C83 | Muted red highlights and focus accents on charcoal |

User revision: match the logo's flame red throughout. The earlier lime and olive direction is superseded. Following the user's visual feedback, buttons now use a quieter crimson (#B83A45) with white labels for 5.63:1 contrast; muted coral (#ED8C83) highlights provide 7.41:1 against charcoal. The wordmark artwork remains the original. Neutral charcoal and warm white let the red brand marks and actual email designs carry the identity.

## Type

Original plan: Archivo display with Geist body. Phase 5 performance testing revised this to one Archivo variable family: its broad industrial forms at 800 for display, 700 for section headings, and its open 400/600 forms for reading and controls. A committed Latin subset covering weights 400–800 reduces the font to 28,964 bytes and eliminates the second family/request. This preserves the editorial character and reduces the critical font payload. Final repeated mobile LCP is recorded in AUDIT.md; the latest 2.87s measurement remains above the 2.5s target. No isolated italic/gradient word. The original font license is retained in docs/licenses.

| Role | Mobile | Desktop | Treatment |
|---|---|---|---|
| Hero | 42px (36px at 320) | 76px | Archivo 800, -0.065em, 0.98 line |
| Section | 34px | 64px | Archivo 700, -0.05em, 1.04 |
| Revenue | 44px | 82px | Archivo 700, tabular numbers |
| Subhead | 24px | 32px | Archivo 700 |
| Lead | 16px | 18px | Archivo 400, 1.65 |
| Body | 15px | 16px | Archivo 400, 1.7 |
| Caption | 12px | 13px | Archivo 400, sentence case |

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

On phones: H1, subhead, primary CTA, adjacent risk reversal and short proof appear before the art; the art is compact. Proof flows naturally with no pinning; each amount plays a 1.1-second native digit-reel animation once when it enters view. Reduced-motion and no-JS visitors see the exact static amounts. Work is a native horizontally scrollable rail with buttons and keyboard access; no content depends on scroll animation.

## Motion choreography

Three named eases only: `settle = cubic-bezier(.16,1,.3,1)`, `travel = cubic-bezier(.65,0,.35,1)`, `linear`. Lenis only on wide, fine-pointer devices with normal motion and adequate cores/memory; native scrolling otherwise. GSAP/ScrollTrigger dynamically imported after first paint on homepage.

- Hero: 650ms word entrance through static clipping masks; animate transforms inside masks rather than clip-path values (brief's compositor-only rule takes priority). H1 is server-visible first; never wait for a preloader. Art sheets move at separate scroll velocities and settle in Z. CSS perspective provides real 3D without WebGL cost.
- Proof: each complete ledger panel pins and scrubs on desktop. Screenshot scales 0.96 to 1; revenue readout scrubs to exact cents from inventory. Original full value remains accessible; fixed-width digit reels animate only transforms. The server-rendered transform already displays the exact value without JavaScript.
- Work: native accessible horizontal rail on every device. Masked images reveal via transform. Hover/focus provides access to the full email, with original image links for touch and no-JS use.
- CTAs: pointer magnetic translation capped at 5px; no movement on touch. Proof/art tilt capped at 4 degrees. Easing 350ms settle. Clean up listeners and timelines on navigation.
- Inner routes: brief 250ms content entrance, with server content visible. No global cursor, no preloader, no fade-up on every section. Every transition collapses in reduced-motion mode; JS initialization never conceals the page.

## Critique and revision

Generic dark grid? Replace repeating boxes with open service rows, a horizontal creative rail and warm dashboard ledgers. Brand color? Use the original flame red, with neutral surfaces and contrast-tested red shades for controls and small text; the initial lime direction was rejected by the user. Type novelty? Keep useful broad Archivo, remove the template's tiny headline and italic accent. Impressive motion? Spend it on comparing actual receipts and creative; avoid pinning long body copy. Anonymous proof plus named email? Separate captions and explicitly label accounts as unattributed. Minimal hero at expense of content? Move old hero claim to a clearly qualified agency aim and keep every other paragraph, stat and asset. Old theme/shape/hero limits in DESIGN.md conflict with the explicit brief; this plan supersedes them.

## Gallery reference study

Reviewed the current [Framer trending gallery](https://www.framer.com/community/gallery/), and its listed [Midu](https://midu.design/), [Bureau Dimanche](https://www.bureaudimanche.com/) and [Pilea](https://pilea.agency/) sites on 6 September 2026. Extracted principles: large statement before project evidence, project-specific art as identity, and separation of confident display moments from longer service detail. Browser text retrieval confirms content structure, not timing or 60fps behavior; choreography here is our own implementation, not an unverified claim about their motion. No source artwork or copy is reused.

## Mobile CRO and popup revision

Mobile hero now prioritizes a short ecommerce eyebrow, the original outcome H1, one-sentence subhead, one dated proof point, a full-width booking action and its adjacent risk reversal. A native “See client work” disclosure retains supporting copy, previews, names and extra stats. This reduces initial visual competition while preserving the entire inventory. The main proof section retains its on-entry mobile revenue animation.

The optional audit popup uses a two-panel desktop layout: an off-white audit-scope sheet on the left and a concise booking offer on charcoal to the right. On mobile, only the compact offer panel is visible. Desktop exit intent requires 20 seconds and scrolling past the hero; mobile uses explicit entry from the contact section. The popup is dismissible, once-per-session automatically, and adds no fields or intermediary steps to the existing primary booking links.

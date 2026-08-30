# Design system

The visual language and the rules that keep it consistent. Read this before
changing anything in `app/globals.css` or adding a section to a page.

The ruleset is adapted from the anti-slop frontend skill in
[nexu-io/open-design](https://github.com/nexu-io/open-design)
(`skills/taste-skill`). Most of it exists to stop the site drifting back
toward the patterns that make a page read as machine-generated.

Run `npm run taste:check` to verify the mechanical rules against a running
site. It fails the build-style checks the same way `npm run seo:check` does.

---

## Design read

Agency landing site for ecommerce founders evaluating a vendor. Dark,
high-contrast, editorial. Tailwind v4, Archivo display, Geist body,
restrained CSS motion.

**Dials:** `DESIGN_VARIANCE 8` / `MOTION_INTENSITY 5` / `VISUAL_DENSITY 3`.

Variance is high because this is an agency site and asymmetry is the point.
Motion is deliberately mid: the audience is a founder deciding whether to
hand over an account, and a page that performs at them reads as a page with
something to hide.

---

## Tokens

| Token | Value | Used for |
|---|---|---|
| `ink` | `#0b0b0c` | Page ground. Off-black, never `#000`. |
| `ink-raised` | `#121214` | Alternating section bands, cards on `ink`. |
| `ink-soft` | `#191a1d` | Insets, the hero email frame. |
| `flame` | `#f51717` | The single accent. From the wordmark. |
| `bone` | `#ecebe8` | Primary text. |
| `mute` | `#8d8a85` | Secondary text, captions, labels. |

**One accent, whole site.** There is no second accent colour. A status
badge, a hover, a rule and a headline emphasis all use `flame`. If something
seems to need a different colour, it needs different weight or size instead.

---

## Type

* **Display:** Archivo 700/800, tracking `-0.035em`. Headlines only.
* **Body:** Geist. Not Inter: Inter is the default every generated site
  reaches for, and it flattens the brand.
* **Emphasis:** Archivo **italic** in `flame`, via `.accent`.

**Emphasis stays inside the display family.** Dropping a serif word into a
grotesk headline is a decoration move, not a typographic one, and it is one
of the most recognisable machine-design signatures. This site used
Instrument Serif for that job at one point; it does not any more.

Trailing punctuation after an italic span goes **inside** the span. A roman
full stop after an italic leaves an optical gap and renders as a detached
block.

`.accent` carries `line-height: 1.1` and bottom padding so italic
descenders (`y`, `g`, `p`) do not clip at display sizes.

### Scale

| Class | Clamp | Use |
|---|---|---|
| `.display-xl` | `2.35rem` to `3.6rem` | Page h1 only |
| `.display-lg` | `2rem` to `3.25rem` | Section h2 |
| `.display-md` | `1.5rem` to `2.1rem` | Sub-section h3 |
| `.lede` | `1rem` to `1.125rem`, max `58ch` | Section intro |

The `display-xl` ceiling is set so an eight-word headline lands on **two
lines** at desktop. A three-line hero headline is a font-size problem, not a
copy problem.

---

## Hard rules

**Shape lock.** Exactly three radii:

| Radius | Applies to |
|---|---|
| `rounded-full` | Buttons, pills |
| `rounded-xl` (12px) | Cards, panels, image frames |
| `rounded-lg` (8px) | Inputs, small tiles |

No `rounded-md`, no `rounded-2xl`, no arbitrary values.

**Theme lock.** The page is dark from nav to footer. No section flips to a
light ground mid-scroll. Section separation comes from `ink` against
`ink-raised` and hairline borders, never from inverting the theme.

**Eyebrow budget.** An eyebrow is the small uppercase tracked label above a
section headline. Maximum **one per three sections**, and the hero counts as
one. Most sections open on the headline alone. Never number them
(`01 - Receipts` is a banned pattern). `SectionHead` takes `eyebrow` as an
optional prop for exactly this reason.

**Zero em-dashes.** No `—` and no `–` anywhere a user can see: headlines,
body, buttons, captions, alt text, quotes, attribution, metadata. Use a
period, a comma, a colon, parentheses, or restructure the sentence. Ranges
use a plain hyphen (`4 Sep - 4 Nov 2023`). This is checked mechanically.

**One label per CTA intent, site-wide.**

| Intent | The only label |
|---|---|
| Audit | `Get your free audit` |
| Portfolio | `See the work` |
| Contact | `Contact` |

Two labels for the same action makes the site feel written by three people.

**No decorative dots.** Coloured dots before eyebrows, nav items or list
rows are decoration. List items use a real icon (`Check`, `X`) from
Phosphor.

**No hand-rolled icon SVGs.** Icons come from `@phosphor-icons/react`,
`weight="bold"`, from `/dist/ssr` in server components. One family, one
weight.

**No decorative hairline grids.** Vertical rules drawn behind sections to
make the page "feel designed" organise nothing. Borders separate real
content or they do not exist.

**No pills overlaid on images.** Labels live in the caption underneath, not
on top of a client's work.

**Long lists need a different component.** More than five items in a
hairline list reads as a spec sheet. Service deliverables use a two-column
tile grid instead.

---

## Layout

**One layout family per section.** Across the home page's eight sections:
split hero, logo marquee, asymmetric featured-plus-pair, divided row list,
gallery grid, sticky split, offset quote composition, stacked accordion.
Nothing repeats.

**Hero discipline.** Maximum four text elements: eyebrow, headline, subtext,
CTAs. No stat strip, no trust line, no tagline under the buttons. Subtext
stays at or under 20 words. Top padding is capped at `pt-24`; more and the
content floats and reads as a bug.

The logo wall sits **under** the hero, never inside it.

**Quotes.** Maximum three lines. Cut the quote rather than let it run.
Attribution is name plus context on separate lines, no dash.

---

## Motion

Every animation has to answer "what does this communicate?" in one sentence.
Three survive that test:

1. **Scroll reveal.** A shared `IntersectionObserver` in `RevealObserver`
   adds `.in` to any `.reveal` element. Communicates hierarchy as the page
   assembles. `data-reveal-delay` staggers siblings.
2. **Logo marquee.** Communicates breadth of client list in fixed space.
   One marquee per page, maximum.
3. **Portfolio pan.** The assets are 600x2200 email screenshots. The card
   shows the top and pans the full creative on hover or focus, so the work
   is readable without a lightbox.

`window.addEventListener('scroll')` is banned: it fires every frame. The nav
uses a one-pixel `IntersectionObserver` sentinel instead.

Everything collapses to static under `prefers-reduced-motion: reduce`.

---

## Checks

```bash
npm run taste:check     # design rules, against a running server
npm run seo:check       # SEO rules, against a running server
```

Both take an optional URL: `npm run taste:check https://infernoemails.com`.

What they cannot check: whether the layout families are genuinely distinct,
whether the motion is motivated, and whether the copy reads like a person
wrote it. Those still need eyes.

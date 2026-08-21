## TalkToExpertButton — sticky support CTA
- **Type:** not logged as MISSING/VARIANT-GAP — plain composition of the real `Button`
  (`variant="secondary"`, `size="xs"`, `iconLeft={<Phone />}`), no custom component built.
  Noting the composition decisions since they're not obvious from the code alone.
- **Screen:** plan-details, fixed to the right edge, vertically centered on the viewport.
- **Sizing:** `size="xs"` (32px tall) is the smallest real `Button` size — matches the explicit
  "as small as the design system allows" ask. That's under `touch-accessibility.md`'s 44px tap
  target minimum, met via that doc's own documented pseudo-element technique — but applied only
  on the vertical axis (`top`/`bottom`, ~7px each way), not all four sides as the doc's literal
  square-icon-button example shows. The button's width is already well past 44px (icon + "Talk
  to an expert"), so extending horizontally too would only balloon the invisible hit area for no
  reason.
- **Placement:** inset `right-16` from the viewport edge, not flush against it — asked
  explicitly not to look like something protruding off the page, so it reads as a floating
  action rather than a tab. `z-[var(--zSticky)]` is the real token for "sticky headers, floating
  elements."
- **Icon:** `Phone`, not `Phone1` — `iconography.md`'s own example import uses `Phone` for
  call-related actions, took that as the canonical choice between the two.
- **Verified live:** 146×32px visible pill, 46px effective tap height, vertically centered to
  the pixel at two viewport heights tested, no collision with the (bottom-anchored) dev panel.

## Bug: premium price never actually reacted to the coupon state (my error)
- **What happened:** the discount-code feature was built purely as a UI affordance — apply/
  applied/invalid states all worked, but the Premium card's price row (`₹8,000` struck through,
  `₹5,090/month` bold) was hardcoded to always show the discounted figure, regardless of
  whether a coupon was actually applied. So the price looked identical whether or not you'd
  ever touched the discount-code field, making the whole feature look cosmetic.
- **Fix:** price row now branches on `couponStatus`. No coupon applied: plain bold `₹8,000`,
  no strikethrough — that's just the premium, not a reference price with nothing to compare
  against. Coupon applied: the existing struck-`₹8,000` + bold-`₹5,090/month` treatment.
- **Scope note:** all three coupons (`DISCOUNT`, `FAMILY5`, `WELCOME10`) resolve to the same
  `₹5,090/month` regardless of their differently-described savings ("Flat ₹500 off" / "5% off"
  / "10% off") — wasn't asked to compute differentiated discount math per code, so didn't invent
  one. Flagging in case that inconsistency (three different offers, one price) should be
  addressed next.

## AnimatedDrawer
- **Type:** VARIANT-GAP
- **Screen:** plan-details (coupon browse sheet in the Premium details card)
- **What it is:** a thin local wrapper around the real `Drawer` (`@acko/drawer`) that plays real
  open *and* close animations for the panel and its backdrop — neither direction animates in the
  real component as shipped.
- **Closest @acko component:** `Drawer` (`@acko/drawer`)
- **Why it didn't fit:** two separate defects, same symptom (no visible easing). Close:
  `Drawer`'s own React logic (`if (!mounted || !open) return null`) unmounts synchronously the
  instant `open` goes false — its own `.acko-drawer-closing` CSS (280ms) exists in the
  stylesheet but is never reachable. Open: `Drawer`'s internal `mounted` state and the `open`
  prop both become true on the same render, so the panel's very first paint is already in the
  fully-open state — there's no earlier "closed" frame for a CSS transition to interpolate
  from, so the (also too-fast, separately noted) 350ms duration never gets a chance to run
  either. See `DESIGN-SYSTEM-BUGS.md` bug #11 for the full investigation of both. Neither can be
  fixed with a token alias or stylesheet override since both are structural/JS-level, not
  styling issues.
- **Props sketch:** identical to `DrawerProps` (`open`, `onClose`, `side`, `size`, `title`,
  `children`, ...) — same call-site shape as the real component, just re-exported locally.
  Internally keeps `Drawer` mounted (always passing it `open={true}`) through the close, and
  drives both the panel's transform and the backdrop's opacity itself via `Drawer`'s own
  forwarded ref: on open, snap-to-closed + forced reflow + transition-to-open on the next frame;
  on close, transition-to-closed then unmount once it finishes. Timing/easing match
  `transitions.md`'s documented Drawer row (enter 500-600ms ease-out, exit 350-450ms ease-in).
- **Reuse potential:** HIGH — every `Drawer` on this registry version has the identical missing-
  animation defect on both edges, not just this one. Worth promoting out of this screen if another one
  gets built before the upstream fix lands.

## Dev-only state panel — ADDED
- **Why:** loading/error/offline previously required temporarily editing source code to see
  (what was done to verify them originally) — not something to do live in a demo. Offline was
  demoable via real browser devtools; loading and error weren't demoable at all without a
  code change.
- **What it is:** a small floating panel (`DevStatusPanel`), bottom-right, four buttons
  (loading/error/offline/success) that force `usePlanDetailsStatus` into that state on click.
  Loading holds indefinitely once forced instead of auto-resolving after 900ms, so it's
  actually presentable rather than a 900ms flash.
- **Never ships:** gated on `import.meta.env.DEV`, which Vite statically replaces and
  dead-code-eliminates in production builds — confirmed this is the standard, safe pattern
  for exactly this need, not a custom flag that could accidentally leak.
- **Verified live:** clicked through all 4 states in sequence (loading → error → loading held
  → success), no console errors, panel persists correctly across every screen.
- **Update — collapsible:** the panel used to sit permanently expanded (all 4 buttons visible),
  which was too intrusive for a demo. Now defaults collapsed to a small `DEV` + `ChevronUp` pill;
  click expands it (chevron flips to `ChevronDown`) and click again collapses. Plain composition
  (real `Typography`, `Icon20` wrapper around the real `ChevronUp`/`ChevronDown` icons, no custom
  component) — not logged as its own entry per the "what not to log" rule, folded into this one.
  Verified both directions live.

## Responsive scaling: page was mobile-only, fixed at 430px on every viewport — RESOLVED
- **Found via:** direct question, verified empirically before assuming — at a 1440px window,
  the content stayed locked at `max-w-[430px]` with **505px of dead gray space on each side**.
  Confirmed with real `getBoundingClientRect()` numbers, not a guess from eyeballing.
- **Fix:** scaled gutters and content width per `layout.md`'s exact documented Gutters table
  (mobile 16px / tablet 32px / desktop 40px) across all 4 container instances (loaded page,
  loading skeleton, error/offline screen, hero section) — kept in sync so switching between
  states doesn't jump width. Content max-width widens `430px → 600px → 680px` at tablet/desktop
  (Tailwind `sm`/`lg`, approximating `responsiveness.md`'s 600px/1024px breakpoints, which it
  states supersede `layout.md`'s 768px/1024px "until reconciled").
- **Judgment call, flagged rather than silently decided:** `layout.md`'s Section Container caps
  at 1280px full-width — stretching this page's single-column list/card content edge-to-edge
  to 1280px would look sparse and disproportionate (a purchase-flow summary, not a dashboard).
  Chose a narrower reading-width cap (680px at desktop) instead. No 2-column reflow was
  attempted — that's a real design decision beyond "don't look broken at other sizes," not
  something to invent unilaterally.
- **Verified live at all 3 breakpoints**, exact numbers: mobile (375px) → 375px content, 16px
  padding, unchanged from before; tablet (768px) → 600px content, 32px padding; desktop
  (1440px) → 680px content, 40px padding. No console errors at any width.

## State handling: loading, error, offline, hero-image fallback — IMPLEMENTED
- **What was built:** a real fetch-lifecycle simulation (`usePlanDetailsStatus`), not just
  static mockups of each look —
  1. **Loading** — full-page skeleton (`PlanDetailsSkeleton`) using the real `@acko/skeleton`
     component throughout, dimensions matched section-by-section to the real layout per
     `layout.md`'s rule ("skeleton dimensions must match actual content — no layout shift").
     Surfaced and fixed a real bug doing this — see `DESIGN-SYSTEM-BUGS.md` bug #6
     (`Skeleton`'s fill tokens were undefined; placeholders rendered fully invisible until
     fixed).
  2. **Error** (network/server) — shared `StatusScreen` component, `TriangleWarning` icon
     (closest available; no dedicated "error" icon exists), retry button.
  3. **Offline** — same `StatusScreen` shell, `Cloud` icon (closest available; no dedicated
     wifi/connectivity icon exists — logging this as an icon gap like the others). Listens to
     real `window` `online`/`offline` events, auto-recovers when connection returns.
  4. **Hero illustration fallback** — `onError` on the `<img>` swaps back to the original
     icon-in-circle version (what shipped before the real Figma asset). Resolves `cards.md`
     rule #10 ("media must have a fallback... the card must still be usable"), previously
     ungated.
- **Honest caveat:** no real backend exists yet for this prototype, so `usePlanDetailsStatus`
  simulates the fetch (a timer that resolves to `success`) rather than calling a real API.
  Every state was verified live regardless — offline/online via real dispatched browser
  events, loading/error by temporarily changing the mock's outcome and delay, then reverting.
  Swapping in the real request when a backend exists shouldn't require changing anything
  downstream — loading/error/offline UI and retry are already wired against the same shape.
- **Verified live, no console errors:** all 4 states screenshotted and confirmed individually,
  including auto-recovery from offline → loading → success on a real `online` event.

## Comparison teaser used an accent-surface token at the wrong scale — RESOLVED
- **Found during:** direct user feedback that it "looks quite off" against the rest of the
  page — a real design-quality catch, not something caught by any automated check.
- **What was wrong:** used `var(--accentPurpleSurface)` as a full-width banner background.
  Re-checked `semantics.md`: `accent/{hue}/surface` tokens are documented explicitly "for
  hue-coded components (**badges, chips, counters, tags**)" — small elements. Applying a
  badge-scale token as a large background fill was a scale mismatch, not a rendering bug —
  the token resolved to exactly what it says, it was just the wrong token for this job.
- **Fix:** same move as the info-card fix earlier — plain `Card variant="primary"` (matches
  Coverage/Premium/info cards already on the page) with purple moved from **background** to
  **text/icon color** via `color: var(--textBrand)` on the wrapping element (confirmed
  `@acko/icons` use `stroke="currentColor"`, so the icon picks up the color automatically,
  no separate override needed). Purple-as-text-accent matches every other use of purple on
  this page (badge text, button text, headings) — purple-as-large-fill was the one place it
  didn't.
- **Verified live:** computed `color: rgb(104, 65, 230)` (`#6841E6`) — identical to "View all
  covers" — no console errors, `Card`'s real `onTap`/`semanticLabel` used for correct a11y
  semantics instead of a raw `<button>`.

## Back button was a plain native `<button>` instead of the real `Button` — RESOLVED
- **Found during:** a full pass checking every element on the page against the real component
  registry, prompted by the question "is the real component available anywhere else on this
  page that isn't being used." It was — `iconography.md` documents the exact pattern
  (`<Button variant="ghost" iconOnly iconLeft={<ArrowLeft />}>Back</Button>`) and I'd built a
  plain `<button>` with manual sizing instead, back when the only concern was hitting the
  44px tap target.
- **What switching to the real component surfaced:** two more confirmed bugs, both now fixed
  and logged in `DESIGN-SYSTEM-BUGS.md`:
  1. `ghost` variant's text/icon color token (`--buttonFillGhostText`) is undefined — same bug
     family as #5 (secondary button text). Aliased to `--textPrimary`.
  2. Default `iconOnly` size (`md`) is 48×40px — under the 44px tap-target minimum on the
     height axis. Used `size="lg"` (56×48px) instead.
- **Also fixed along the way:** `Button`'s `children` prop is required even for icon-only
  buttons — it becomes the `sr-only` accessible label (confirmed by reading `Button.js`
  directly). Passed `"Back"` as children, matching `iconography.md`'s example exactly, rather
  than a separate `aria-label`.
- **Verified live:** 56×56px tap target, `color: rgb(15,15,16)` (correct `--textPrimary`),
  `sr-only` "Back" label present, no console errors.

## Hero shield illustration
- **Status:** RESOLVED — real asset from the Figma illustration library dropped in at `src/assets/illustrations/coverage-shield.svg`, replacing the flat-icon placeholder below. Confirmed live, no console errors.
- **Type:** MISSING (was)
- **Screen:** plan-details (Platinum Lite Health Plan header)
- **What it is:** the ~96px circular gradient badge with a shield/check glyph at the top of the plan identity block.
- **Closest @acko component:** `Coverage` icon from `@acko/icons`, placed inside a manually-built circular container (`var(--accentPurpleSurface)` background, no gradient/glow available via tokens alone).
- **Why it didn't fit:** `@acko/icons` ships flat 24px UI icons, not hero-scale illustrations with glow/gradient treatment. No illustration asset package exists in the installed registry.
- **Props sketch:** none — plain `<div>` wrapper with inline style, `Coverage` icon at 40px inside.
- **Reuse potential:** HIGH — any plan/product identity header likely wants this same treatment.

## Info card with accent border (waiting periods / health evaluation) — SUPERSEDED
- **Status:** reverted per design feedback — these were flagged as visually inconsistent
  with "the language of the page" (two colored boxes stacked back-to-back also breaks
  cards.md's own "no two differentiating surfaces consecutively" rule). Now plain
  `Card variant="primary"`, matching the Coverage and Premium cards already on this page.
  Keeping the history below for context on what was tried and why.
- **Type:** VARIANT-GAP (historical)
- **Screen:** plan-details ("About waiting periods", "About health evaluation" cards)
- **What it is:** a card with a tinted background + matching border color (orange, in this case) used for advisory/informational callouts.
- **Closest @acko component:** `Card` (`variant="ghost"`)
- **Why it didn't fit:** `Card`'s four variants (primary/secondary/muted/ghost) don't include a colored/accent-bordered "info" or "advisory" recipe. Had to layer `var(--accentOrangeSurface)` / `var(--accentOrangeBorder)` on top of `variant="ghost"` manually.
- **Props sketch:** `<Card variant="ghost" style={{ background, border }}>` — no `intent`/`tone` prop exists to do this natively.
- **Reuse potential:** HIGH — this pattern (waiting periods, health evaluation, T&C callouts) recurs across insurance flows generally. Once `@acko/alert`'s warning-token bug (DESIGN-SYSTEM-BUGS.md) is fixed, `@acko/alert` is likely the better long-term answer than either version here.

## Wrapping inline text link — RESOLVED
- **Status:** now using the real `Button variant="link"` for all 3 instances. Fixed by
  shortening the two long labels to fit the component's real constraint instead of working
  around it — "See how your coverage unlocks" → "See how it unlocks" (18 chars), "Why is this
  important?" → "Why this matters?" (17 chars), "See details" unchanged (11 chars, was
  already under the limit). Verified live: `scrollWidth === clientWidth` on all 3, zero
  truncation.
- **Type:** VARIANT-GAP (historical — component works fine within its real constraint, this
  was a copy-length problem, not a missing feature)
- **Screen:** plan-details ("See how your coverage unlocks", "Why is this important?", "See details")
- **What it is:** a tappable inline text link.
- **Closest @acko component:** `Button` (`variant="link"`) — this is now what's used.
- **The actual constraint:** `.acko-button-label` hard-caps at `max-width: 20ch` with
  `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` — not a bug, just means
  link labels need to be written short from the start. Anyone reusing this pattern should
  write copy for it, not the other way around.
- **Side effect worth knowing:** `Button variant="link"` renders in `--textLink` (blue,
  `semantics.md`'s documented hyperlink color) — different from this page's brand purple used
  everywhere else (badge, teaser, secondary button). Real and correct per the token, but a
  visible color split from the rest of the page's accent color. Flagged to the user, not
  silently overridden.
- **Reuse potential:** HIGH — this exact tradeoff (short copy vs. custom wrapping link) will
  recur anywhere a card wants an inline "learn more"-style link.

## Bug: @acko/card renders with 0px corners (not a missing-component, flagging anyway)
- **Type:** BUG, not MISSING/VARIANT-GAP — every `Card` on this screen initially rendered square-cornered.
- **Root cause:** `@acko/card@3.0.4`'s CSS does `border-radius: var(--radius5xl)`. That token doesn't exist in `@acko/tokens@2.0.6`, so it resolves to nothing → browser falls back to `0px`.
- **Confirmed not a version-skew/token-gap issue:** the design system's own docs (`radii.md`) explicitly document `--radius4xl` (20px) as the standard for cards, dialogs, drawers, toasts — there is no `5xl` anywhere in the spec. Figma renders correctly because the designer used the correct 20px value directly; the bug is `@acko/card`'s CSS referencing a token name that was never supposed to exist, most likely a mistyped reference to `--radius4xl` introduced when the component was built.
- **Stopgap applied:** `--radius5xl: var(--radius4xl);` in `src/index.css` — aliases to the documented value (20px), not a guessed one.
- **Real fix needed upstream:** `@acko/card`'s CSS should reference `var(--radius4xl)` directly. File with whoever owns `@acko/card`.

## Bug: Tailwind margin/padding utilities silently no-op on @acko components
- **Type:** BUG, project-wide — not specific to this page.
- **Root cause:** `src/index.css` imported `@acko/css/*.css` as plain `@import`, landing those rules **unlayered**. Tailwind wraps its own utilities in `@layer utilities`. Per the CSS Cascade Layers spec, unlayered rules beat layered rules regardless of specificity or source order — so e.g. `.acko-typography { margin: var(--spacing0) }` always won over any `mt-*`/`mb-*` utility applied to a `Typography` component, on every screen, not just this one.
- **Confirmed:** `getComputedStyle(heading).marginTop` was `0px` despite `mt-32` being present in the class list and `--spacing32` resolving correctly to `32px` on that element — proving the utility rule itself was being out-prioritized, not a token problem.
- **Fix:** import `@acko/css/*.css` into `layer(components)` in `src/index.css`, so Tailwind's utilities (declared in the later `utilities` layer) win as intended. Verified: margin now computes to the requested `32px`/`16px`.
- **Scope:** this fixes margin/padding/etc. overrides on *every* `@acko/*` component across the whole app, not just `PlanDetails` — worth a heads-up to anyone else already working around this by other means (extra wrapper divs, `!important`, etc.).

## Bug: info-card colors used the wrong token tier
- **Type:** BUG (my error, not upstream) — the "About waiting periods"/"About health evaluation" cards.
- **Root cause:** used `--accentOrangeSurface`/`--accentOrangeBorder` (`solidOrange100`/`200`) for the card fill/border. The design system's own semantic pairing for a pale advisory card is `--statusWarningSubtle`/`--statusWarningBorder` (`solidOrange50`/`100`) — the same `Subtle→background, Border→border` relationship `alertInfoSurface`/`alertInfoBorder` correctly follow. I picked the accent-ramp tokens (meant for stronger accents/badges) instead of the status-ramp tokens (meant for this exact soft-surface use), landing one full tier too saturated on both fill and border.
- **Note:** `@acko/alert`'s own `warning` variant has the *same* bug internally (`--alertWarningSurface: var(--statusWarningBorder)` instead of `var(--statusWarningSubtle)`) — so switching to the real `Alert` component would not have fixed this without also overriding its CSS. Worth flagging to whoever owns `@acko/alert` separately.
- **Fix:** switched to `var(--statusWarningSubtle)` / `var(--statusWarningBorder)` directly.

## Bug: typography.md documents a Typography API with zero CSS behind it
- **Type:** BUG, project-wide, severity high — affects every screen, not just this one.
- **Root cause:** `typography.md` exclusively documents `variant`/`weight` (e.g. `variant="heading-lg" weight="bold"`). The component (`@acko/typography@3.0.4`) still accepts these props and emits classes like `.acko-typography-heading-lg` / `.acko-typography-weight-bold` — but the currently-installed `@acko/css@3.0.4` stylesheet **ships zero CSS rules for those classes**. Text renders with no font-size/weight styling at all (falls back to browser default 16px/400).
- **Confirmed:** switching this screen to `variant`/`weight` (to match the doc) silently broke every heading/label on the page — computed `fontWeight: "400"`, `fontSize: "16px"` regardless of variant requested. Reverted to `scale`/`emphasis` (the `.d.ts`'s own "preferred" API, never mentioned in the doc) and confirmed real values return, e.g. `scale="lg" emphasis="bold"` → computed `18px`/`600`.
- **Live-verified working scale, since the doc doesn't cover it:** `2xs`=10px, `xs`=12px, `sm`=14px, `base`=16px, `lg`=18px, `xl`=20px, `2xl`=24px, `3xl`=30px, `4xl`=36px, `5xl`=48px.
- **Implication:** `typography.md` is stale relative to the installed `@acko/css` version. Anyone following it literally right now ships unstyled text. Needs a doc update or a component-package fix upstream — worth flagging urgently, this is the one most likely to silently bite other people on this same registry version.

## Bug: cards.md's Card+Surface pairing doesn't render as documented for a single-row banner
- **Type:** BUG in my initial fix, caught by live verification, not a cards.md error.
- **What happened:** cards.md says "Brand Light surface — must always pair with Secondary card." Built the comparison teaser as `<Surface variant="brandLight"><Card variant="secondary" onTap={...}>` per that rule. Rendered nearly invisible — `Card`'s opaque `--cardFillDefault` fully covers `Surface`'s translucent tint when the card fills it edge-to-edge with no gap.
- **Read of the actual rule:** that pairing is for a card floating *on* a tinted band (with visible tint around/beside it), not a single row that exactly fills the tinted area. Doesn't match any of the 43 cataloged card types.
- **Fix:** treated like AlertCard (§3) — custom element, no Card/Surface wrapper, background applied directly via `style` on a plain `<button>` (permitted here since it isn't a `<Card>` instance — the "never override via style" rule in cards.md is scoped to `<Card>`'s own props).

## Corrections made this pass, structural (cards.md Part 1)
- Both `Card`s had padding/layout classes (`p-8`, `p-20`, etc.) directly on `<Card>` itself. cards.md: "CRITICAL — no sub-components exist... all padding, flex layout, and gap must be applied on an inner wrapper `<div>`, never on `<Card>` itself." Moved padding to inner `<div>`s in both.
- Both info cards used `<Card variant="ghost" style={{ background, border }}>`. cards.md: "CRITICAL — never pass border/backgroundColor via the style prop... breaks the token chain." Rebuilt per §3 AlertCard's actual documented shape: custom div (no Card), `--statusWarningSubtle` background, 4px **left-only** accent border in `--statusWarningBase` (not a 1px border all around), `--radius2xl` (12px, not the card system's 20px).
- Icon-only back button was ~40px tap target; touch-accessibility.md requires 44px minimum. Now exactly 44×44px.
- All icons used `width`/`height` props — iconography.md's explicit anti-pattern (`@acko/icons` ships `1em` SVGs, must be sized via a `size-{16|24|32}` wrapper span). Fixed throughout.
- "Sum insured"/"Premium" labels used forced `uppercase` className — typography.md: all-caps outside `Badge` is a named anti-pattern. Removed, now plain sentence-case small labels.

## Judgment call: coupon browse sheet uses Drawer at every breakpoint, not Dialog on desktop
- **Type:** Not a missing component — pure composition of real components (`Drawer`, `TextInput`, `Card`, `Badge`, `Button`), no custom shell built. Logged anyway since it's a deliberate deviation from a documented rule.
- **What the rule says:** `responsiveness.md`'s component-downshift table: centered `Dialog` on desktop, `Drawer side="bottom"` (bottom sheet) on mobile — "must be the actual component, not a squeezed-down modal."
- **Why it wasn't followed exactly:** checked `@acko/dialog`'s CSS before wiring up the desktop variant and found 9 undefined tokens covering nearly the whole component (panel fill, backdrop, both text colors, footer border, shadow, hover state, open-animation easing) — see `DESIGN-SYSTEM-BUGS.md` bug #10. Fixing all of it just to open a 3-item coupon list felt disproportionate; `@acko/drawer` needed only 2 token aliases and renders correctly, so it's used as the single implementation across all breakpoints instead.
- **Reuse potential:** if `@acko/dialog` gets fixed upstream, this is the place to add the desktop-centered variant back in for `responsiveness.md` compliance.

## Registry note (not page-specific, flagging anyway)
The missing-components protocol's "available components" list names `Table`, `Tabs`, `Tooltip`, `Field`, `Pagination`, `NavigationWizard` as available. None of these are actually published in the installed `@acko/*` registry (v3.0.4) — `package.json`/`node_modules` only has 30 packages, and those six aren't among them, despite `@acko/css` shipping stylesheets for some of them (`tabs.css`, `table.css`). Used `@acko/toggle`'s `ToggleGroup`/`ToggleGroupItem` in place of the advertised `Tabs` for the covered/not-covered segmented control — works, but worth reconciling the protocol doc against the real registry.

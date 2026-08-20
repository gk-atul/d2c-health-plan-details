# ACKO design system — confirmed bugs

Found while building `PlanDetails.tsx` against `@acko/*@3.0.4` + `@acko/tokens@2.0.6`,
verified live in a browser (computed styles / actual rendered output), not inferred from
reading source. Each entry names the exact fix. For the discovery/repro trail, see
[missing-components-plan-details.md](./missing-components-plan-details.md).

---

## 1. `@acko/card` renders every card with square corners (0px radius)

**Severity:** High — affects every `Card` instance app-wide, not just this screen.

**Cause:** `@acko/css`'s `card.css` does `border-radius: var(--radius5xl)`. `@acko/tokens`
only defines the radius scale up to `--radius4xl` (20px) — `--radius5xl` doesn't exist
anywhere in the shipped tokens, confirmed by grepping `tokens.css` directly.

**Confirmed via:** `getComputedStyle(document.querySelector('.acko-card')).borderRadius`
returned `"0px"` before the fix.

**Why it's not a version-skew issue:** the design system's own `radii.md` explicitly
documents `--radius4xl` (20px) as the standard for "cards, dialogs, drawers, toasts,
dropdown menus." There is no 5xl anywhere in the documented spec. `@acko/card`'s CSS is
referencing a token that was never supposed to exist — most likely a mistyped reference to
`--radius4xl` introduced when the component was built.

**Fix:** change `card.css` to reference `var(--radius4xl)` directly.

**Our workaround (not a real fix, just unblocks us):** `:root { --radius5xl: var(--radius4xl); }` in our own `index.css`.

---

## 2. `typography.md` documents a Typography API with zero CSS behind it

**Severity:** High — silently breaks every screen built by following the docs literally.

**Cause:** `typography.md` exclusively documents `variant`/`weight`
(e.g. `variant="heading-lg" weight="bold"`). The `@acko/typography` component still accepts
these props and emits classes like `.acko-typography-heading-lg` /
`.acko-typography-weight-bold` — but the installed `@acko/css@3.0.4` stylesheet ships **zero
CSS rules for those classes.** Text renders with no font-size/weight styling at all
(silently falls back to the browser default, 16px/400).

**Confirmed via:** built a screen using `variant`/`weight` per the docs — computed
`fontWeight: "400"`, `fontSize: "16px"` regardless of what variant was requested. Searched
every loaded stylesheet (including nested `@layer` blocks) for
`.acko-typography-heading-lg` and `.acko-typography-weight-bold` — neither exists anywhere.

**The only working API, undocumented:** `scale`/`emphasis` (e.g. `scale="lg" emphasis="bold"`).
The component's own `.d.ts` comments call this the "preferred" API, but `typography.md`
never mentions it. Confirmed working scale, live: `2xs`=10px, `xs`=12px, `sm`=14px,
`base`=16px, `lg`=18px, `xl`=20px, `2xl`=24px, `3xl`=30px, `4xl`=36px, `5xl`=48px.

**Fix:** either restore the CSS for `variant`/`weight`, or — more likely correct, since the
component's own types call `scale`/`emphasis` preferred — update `typography.md` to
document `scale`/`emphasis` instead, and treat `variant`/`weight` as deprecated.

---

## 3. `@acko/alert`'s `warning` variant has its background wired to the wrong token

**Severity:** Medium — makes the component visually wrong if used as-is, which is likely why
it's gone unused in favor of hand-rolled alternatives (see context below).

**Cause:** `alert.css`:
```css
.acko-alert-warning {
  --acko-alert-bg: var(--alertWarningSurface);
  ...
}
```
And in `tokens.css`:
```css
--alertWarningSurface: var(--statusWarningBorder);  /* should be --statusWarningSubtle */
```
Compare to the `info` variant, which does it correctly:
```css
--alertInfoSurface: var(--statusInfoSubtle);
```
`alertWarningSurface` is aliased to the **border** token instead of the **subtle** token —
one full shade too saturated for a background fill. `solidOrange100` (`#ffe5cc`) instead of
`solidOrange50` (`#fff3e5`).

**Confirmed via:** traced the token alias chain in `tokens.css` directly (lines 1773–1799).
Both `alertInfoSurface` and the *sibling* `toastWarningSurface` correctly use the
`Subtle → surface` pattern — only `alertWarningSurface` uses `Border → surface` instead. A
component two lines away in the same file gets its own warning variant right, which makes
this read as a one-line copy-paste slip, not an intentional design choice.

**Fix:** `--alertWarningSurface: var(--statusWarningBorder);` → `--alertWarningSurface: var(--statusWarningSubtle);`

**Context for design:** a designer flagged that we should have used `@acko/alert` for the
"About waiting periods" / "About health evaluation" cards on this screen instead of building
custom. We checked `@acko/alert` first — it's the objectively correct component for that
pattern — and passed on it specifically because of this bug: shipping it as-is would have
reproduced the same "too saturated, doesn't match Figma" complaint we'd just fixed elsewhere
on the same screen. Once this is fixed, `@acko/alert` should replace our custom AlertCard
shell in `PlanDetails.tsx` (see `missing-components-plan-details.md`).

---

## 4. `@acko/toggle`'s entire CSS still uses tokens removed in `@acko/tokens@2.0.3`

**Status:** Worked around locally, verified live — selected segment now computes
`background: rgb(20,20,20)` (`--surfaceStaticBlack`), white text, purple hover-accent border.
Toggling between both states confirmed working. Fix applied in `src/index.css` by supplying
the 16 missing legacy tokens as aliases to their real modern equivalents — not by overriding
`.acko-toggle-*` classes directly, so the component's own CSS still does the work.

**Severity:** High — broader than any bug above. Not one wrong token; the whole
`toggle.css` file was never migrated off the pre-2.0.3 naming, so the "selected" pill has no
fill anywhere it's used.

**Cause:** every color/background/border declaration in `toggle.css` references a legacy
`--color*`-prefixed variable — `--colorToggleBg`, `--colorToggleActiveBg`,
`--colorToggleActiveText`, `--colorSurfaceRaised`, `--colorBorder`, `--colorPrimaryHover`,
`--colorSuccessSubtle`, `--colorError`, `--colorBtnDisabledBg`, etc. `semantics.md` documents
these as removed in `@acko/tokens@2.0.3`, replaced by camelCase semantic names
(`--surfaceRaised`, `--borderDefault`, `--fillBrand`, ...). Checked all 11 tokens `toggle.css`
depends on against the installed `@acko/tokens` source directly — **zero are defined.**

**Confirmed via:** `getComputedStyle` on the selected `ToggleGroupItem`:
```
background:   rgba(0, 0, 0, 0)   (fully transparent — no fill)
border-color: rgb(0, 0, 0)
color:        rgb(0, 0, 0)
```
The border only *looks* deliberate. `border-color: var(--colorPrimaryHover)` is invalid
(undefined var), so it falls back to its initial value, `currentColor` — which itself resolves
from `color: var(--colorToggleActiveText)`, also undefined, which falls back to inherited
black. Three independently-broken variables coincidentally land on the same black, producing
what reads as an intentional "outline-style" selected state. It isn't one — every reference
screenshot in this project shows the selected segment as a solid black pill with white text,
not an outline.

**Fix:** re-point `toggle.css` at the current semantic tokens. Best-guess mapping based on
`semantics.md`'s documented roles and what every reference screenshot actually shows (solid
black pill, white text when selected) — worth confirming intent with whoever owns the
component before shipping, since this is inferred, not verified against original design specs:

| Legacy (undefined) | Likely current equivalent |
|---|---|
| `--colorToggleBg` | `--surfaceRaised` (`semantics.md`: "Interactive shells (tabs, toggles)") |
| `--colorToggleActiveBg` | `--surfaceStaticBlack` |
| `--colorToggleActiveText` | `--textStaticLight` |
| `--colorBorder` | `--borderDefault` |
| `--colorPrimaryHover` | `--brandHover` or `--borderBrand` |

**Impact:** affects every `ToggleGroup`/`Toggle` usage in any app on this registry version —
this screen's covered/not-covered switcher is just the one that surfaced it.

---

## 5. `@acko/button`'s secondary/ghost/*OnDark variants have no real text-color token

**Severity:** Medium-high — affects any `secondary`, `ghost`, `inverted`, or
`inverted-secondary` button anywhere on this registry version.

**Cause:** `button.css` sets each variant's foreground via `--acko-button-fg`:
```css
.acko-button-secondary        { --acko-button-fg: var(--buttonFillSecondaryText); }
.acko-button-inverted         { --acko-button-fg: var(--buttonFillPrimaryOnDarkText); }
.acko-button-inverted-secondary { --acko-button-fg: var(--buttonFillSecondaryOnDarkText); }
.acko-button-ghost            { --acko-button-fg: var(--buttonFillGhostText); }
```
None of these 4 `--buttonFill{Variant}Text` tokens are defined anywhere in `@acko/tokens` —
confirmed 0 matches for all 4. The variants that instead reuse **pre-existing semantic**
tokens work fine: `primary` → `--textStaticLight`, `link` → `--textLink`, `danger` →
`--statusErrorText`, `disabled` → `--textDisabled`. Whoever built `secondary`/`ghost`/the
`OnDark` variants invented a token-naming convention (`buttonFill{Variant}Text`) that was
never actually added to the tokens package, while every other variant just pointed at tokens
that already existed.

**Confirmed via:** "View all covers" (`variant="secondary"`) computed `color: rgb(0, 0, 0)` —
pure black — while its `background` and `border-color` resolved correctly (both point at
real tokens). Same failure mode as bug #4: an undefined `var()` inside a custom property
makes that property invalid, so `color` falls back to its inherited value instead of the
intended one.

**Fix:** define the 4 missing tokens. Best-guess mapping, same caveat as bug #4 (inferred
from context, not confirmed against original design intent):

| Missing token | Likely equivalent |
|---|---|
| `--buttonFillSecondaryText` | `--textBrand` (confirmed correct — see below) |
| `--buttonFillGhostText` | `--textBrand`, if ghost is used as a CTA; `--textPrimary` if used as a neutral icon button |
| `--buttonFillPrimaryOnDarkText` | `--textStaticLight` |
| `--buttonFillSecondaryOnDarkText` | `--textStaticLight` |

**Fixed and verified here:** only `--buttonFillSecondaryText` — the one this screen actually
uses. Aliased to `--textBrand` in `src/index.css`; computed color is now `rgb(104, 65, 230)`
(`#6841E6`, ACKO's documented brand purple). The other 3 have the identical bug but nothing
on this screen exercises them, so left logged rather than guessed at blind.

---

## 6. `@acko/skeleton`'s fill tokens are undefined — placeholders render invisible

**Severity:** High — a skeleton that doesn't show anything defeats its entire purpose. Affects
every `Skeleton` usage on this registry version.

**Cause:** `skeleton.css` reads `--colorDisabledBg` (base fill) and `--colorSurface` (the wave
animation's midpoint color) — same pre-2.0.3 legacy `--color*` naming as bugs #4 and #5. Both
confirmed undefined in the installed `@acko/tokens` (0 matches each).

**Confirmed via:** building the loading-state skeleton for this screen — `Card` shells
rendered correctly (white, shadowed), but every `Skeleton` placeholder inside them was
fully invisible, white-on-white, indistinguishable from the empty card background. Caught by
screenshotting the loading state directly, not by reading the CSS first.

**Fix:** re-point to real tokens. Per `semantics.md`'s `disabled/` section and its legacy
migration table:

| Legacy (undefined) | Real equivalent |
|---|---|
| `--colorDisabledBg` | `--disabledBg` |
| `--colorSurface` | `--surfaceBase` (explicitly listed in `semantics.md`'s own migration table) |

**Fixed and verified here:** both aliased in `src/index.css`. Skeleton placeholders now
render with visible gray fill, confirmed via screenshot, no console errors.

---

## 7. `Typography` defaults to `align-left` regardless of an ancestor's `text-align`

**Severity:** Medium — silently breaks any centered text block that wraps to more than one
line; invisible on short, single-line copy, which is why it shipped unnoticed.

**Cause:** every `Typography` instance renders an explicit `acko-typography-align-*` class
(`acko-typography-align-left` unless an `align` prop is passed). `typography.css` compiles
this to a literal `text-align: left` declaration on the element itself. An explicit
declaration on an element always wins over an inherited value, so wrapping a `Typography` in
a parent with Tailwind's `text-center` (or any inherited `text-align: center`) has no effect —
the component never actually inherits alignment from its container.

**Confirmed via:** the offline/error `StatusScreen`'s body copy wraps to two lines inside a
`flex flex-col items-center text-center` wrapper. `getComputedStyle(el).textAlign` returned
`"left"` on both the heading and body `Typography` despite the ancestor's `text-center`; each
wrapped line rendered left-justified instead of centered as a block. The hero subtitle
("Get ₹50 lakh...") has the identical setup and reproduces the same way once it wraps at
mobile widths (verified at 375px).

**Fix:** `Typography` does expose a working `align?: "left" | "center" | "right"` prop
(`typography.css` has real, correctly-wired rules for all three — unlike bug #2, this one
isn't a dead API), it just isn't the default and doesn't fall back to inheritance. Any
`Typography` meant to sit centered must pass `align="center"` explicitly; a `text-center`
wrapper class alone does nothing.

**Fixed and verified here:** added `align="center"` to both `Typography` elements in
`StatusScreen` (used by the error and offline states), the hero title/subtitle, and the two
centered labels in the Premium details card. Verified via `getComputedStyle` (`textAlign:
"center"` on all five) and screenshots of the error and offline states, and the hero at
375px where the subtitle wraps.

---

## Also worth reconciling (not a bug, a docs/registry mismatch)

`cards.md`'s catalog and the missing-components protocol both list `Tabs`, `Table`,
`Tooltip`, `Field`, `Pagination`, and `NavigationWizard` as available components. Cross-
referencing all 27 components documented in `components.md` against the real registry adds
two more: `Toast` and (again) `Pagination`. **8 components total are fully documented with
zero real package behind them:** `Tabs`, `Table`, `Tooltip`, `Field`, `Pagination`,
`NavigationWizard`, `Toast`, plus a component-tokens section for `Wizard`. None of these are
actually published in the installed `@acko/*` registry (v3.0.4) — see
[component-index.md](./component-index.md), generated directly from `node_modules`, for the
real list of 32 packages. `@acko/css` ships stylesheets for some of these (`tabs.css`,
`table.css`) with no corresponding published component package, suggesting they were pulled
from the registry after being documented, not that the docs are simply out of date.

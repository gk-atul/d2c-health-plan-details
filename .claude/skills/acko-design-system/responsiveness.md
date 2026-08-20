---
description: ACKO responsiveness — how typography, layout, and components adapt across mobile, tablet, and desktop. Read before designing or building any screen.
globs: "**/*.tsx,**/*.css,**/*.md"
alwaysApply: true
---

# ACKO Responsiveness

Three rules:

1. **Type downshifts on mobile** — large display/heading tokens render smaller. Body, labels, caption stay put.
2. **Layout rearranges** — horizontal stacks go vertical, grids collapse to one column, CTAs go full-width.
3. **Components downshift** — heavy patterns swap to lighter ones. Table → cards. Top nav → hamburger. Modal → bottom sheet.

Spacing never changes — same scale (scales.md) at every breakpoint. Layout does the work.

---

## Breakpoints

Mobile-first, min-width only. Never mix with max-width.

| Name | Range | Query |
|------|-------|-------|
| Mobile | 0–599px | Base (no query) |
| Tablet | 600–1023px | min-width: 600px |
| Desktop | 1024px+ | min-width: 1024px |

Tablet inherits the desktop type scale — type only downshifts below 600px. Desktop is safe at 1366px, comfortable to 1920px+.

> These breakpoints supersede the 768/1024 values in layout.md/scales.md until reconciled. This file wins for new work.

---

## 1. Typography — variant swap below 600px

Six large tokens swap to a smaller existing token. Nothing else changes, no new tokens created.

| Token | Desktop | Mobile renders as | Mobile size |
|-------|---------|--------------------|-------------|
| display-xl | 4.5rem/72px | display-md | 3rem/48px |
| display-lg | 3.5rem/56px | display-sm | 2.5rem/40px |
| display-md | 3rem/48px | heading-xl | 2rem/32px |
| display-sm | 2.5rem/40px | heading-lg | 1.5rem/24px |
| heading-xl | 2rem/32px | heading-lg | 1.5rem/24px |
| heading-lg | 1.5rem/24px | heading-md | 1.25rem/20px |

heading-md and below, all body/label/caption/overline sizes are unchanged at every breakpoint — body is already at the 14–18px floor.

The Typography component's variant prop stays the same; the swap happens in CSS, not viewport checks in code.

### What the swap touches

The downshift CSS overrides exactly three properties: **font-size, line-height, letter-spacing.** Never font-weight.

Weight is an independent axis, set by the `weight` prop (e.g. `weight="bold"`), not by the variant. A downshift rule that copies the mobile target token wholesale — including its weight — will silently override `.acko-typography-weight-bold` via cascade order. `display-lg` at `weight="bold"` must stay 700 at every breakpoint; only its size/line-height/letter-spacing shift toward `display-sm`'s values.

```css
/* Correct — three properties only */
@media (max-width: 599px) {
  .acko-typography-display-lg {
    font-size: var(--fontDisplaySmSize);
    line-height: var(--fontDisplaySmLineHeight);
    letter-spacing: var(--fontDisplaySmLetterSpacing);
    /* font-weight intentionally omitted — inherits from variant default or weight prop */
  }
}
```

**Rules:** never hardcode font size/line-height/letter-spacing in inline styles or component overrides · downshift CSS must never set font-weight · no clamp() for font sizing · never shrink body text on mobile · needing display-xl at 72px on a phone means pick a smaller variant, not an exception.

### Picking variants in constrained contexts

The swap table is a size ladder within the display/heading families, not a rule that every variant shrinks somewhere. Two things to check before choosing a variant:

- **It has to be in the table to downshift.** `heading-md` is the floor of the chain — `heading-lg` downshifts *to* `heading-md`, but `heading-md` itself never moves. If a piece of text needs to shrink on mobile, it must use a variant one step up the chain (`heading-lg`, not `heading-md`), not the target it would land on.
- **Display tokens assume hero-scale space.** They're sized for marketing sections with room to breathe, so their downshift deltas are large (e.g. `display-sm` 40px→24px). Dropping a display variant into a tight container — a card, a list row — will read as a jarring, disproportionate drop even though it's working as designed. In dense UI, prefer the heading family, which has smaller steps, or pair two variants that are both meant to move together (e.g. `heading-lg` name + `heading-lg` price, not `heading-md` name + `display-sm` price) so hierarchy stays coherent at both breakpoints.

---

## 2. Layout — three rearrangements

- **Horizontal → vertical** below 600px: hero CTA rows, feature rows, list items with trailing actions, form-field pairs.
- **Grids collapse**:

| Desktop cols | Tablet | Mobile |
|---|---|---|
| 4 | 2 | 1 |
| 3 | 2 | 1 |
| 2 | 2 | 1 |

- **CTAs full-width** below 600px (inline links excluded).

---

## 3. Component downshifts — heavy → light

| Desktop | Mobile | Why |
|---------|--------|-----|
| Data table | Stacked cards | Tables need horizontal room |
| Top nav bar | Hamburger menu | Doesn't fit a 390px screen |
| Centered modal | Bottom sheet | One-thumb reach |
| Large dropdown | Bottom sheet | Same thumb-reach reason |
| Multi-column form | Single-column form | Fields need full width to tap |

Use the package's built-in mobile variant (Modal → BottomSheet) rather than one-off swaps. A squeezed-down modal is not a bottom sheet — it must be the actual component.

---

## Non-negotiable

1. Every screen checked at ≤390px, ~768px, ≥1366px before shipping.
2. No hardcoded font size, spacing, or column count — flow through tokens/layout system.
3. Min-width only, never max-width.
4. Never shrink body text on mobile (14–18px floor).
5. No horizontal scroll on mobile.
6. Tap targets ≥44px (see touch-accessibility.md).
7. Downshift CSS never sets font-weight — weight stays constant across breakpoints regardless of variant.

---

## Checklist

- [ ] Tested at 390px, 768px, 1366px
- [ ] Type downshifts per swap table
- [ ] Body/labels/captions unchanged across breakpoints
- [ ] Font weight identical at every breakpoint for a given element
- [ ] Horizontal stacks → vertical below 600px
- [ ] Grids collapse per column table
- [ ] CTAs full-width on mobile
- [ ] Tables → cards, nav → hamburger, modals → bottom sheets
- [ ] No horizontal scroll
- [ ] Tap targets ≥44px

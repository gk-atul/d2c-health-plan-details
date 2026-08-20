---
description: Spacing, sizing, opacity, z-index, and utility tokens — numeric foundation for the design system
---

# Spacing & Sizing

All numeric foundations for the design system: spacing, component sizing, and utility tokens. All tokens on this page are **theme-agnostic** — they do not change between themes.

## Spacing System

Spacing is powered by Tailwind v4 utilities with a **1px base**:

```css
/* theme.css */
@theme inline {
  --spacing: 0.0625rem; /* 1px at 16px root */
}
```

**The utility number equals the pixel value.** No math, no indirection:

- `gap-12` = 12px
- `p-16` = 16px
- `h-48` = 48px
- `w-240` = 240px

Because the base is `0.0625rem` (1/16 of a rem), all spacing scales proportionally with the root font-size. A consumer app can use `clamp()` on `html { font-size }` and every spacing/sizing utility will scale fluidly.

### Rules

1. **Never use `var(--scale-*)` or `var(--space-*)`** — these tokens have been removed
2. **Never use raw `px` values** for spacing — always use a Tailwind utility via `@apply`
3. **Never use the old 4px-multiplier mapping** (`gap-2` for 8px is wrong; use `gap-8`)
4. All spacing in component CSS goes through `@apply` — zero inline `px` values for gaps, padding, margins, or dimensions
5. **Icon `size-*` utilities follow the same 1px scale** — `size-16` = 16px, `size-24` = 24px; `size-4` = 4px (not 16px). Standalone `@acko/icons` need explicit `size-*`. See `iconography.md`.

## Spacing Reference

Use Tailwind utilities directly. The number is the pixel value.

| Utility | Pixels | Use Case |
|---------|--------|----------|
| `gap-4` / `p-4` | 4px | Micro gaps |
| `gap-8` / `p-8` | 8px | Icon padding, tight gaps, inline elements |
| `gap-12` / `p-12` | 12px | Form field gaps, small component padding |
| `gap-16` / `p-16` | 16px | Standard padding, card gaps, button padding |
| `gap-20` / `p-20` | 20px | Medium gaps, card padding (md) |
| `gap-24` / `p-24` | 24px | Card padding (lg), section gaps |
| `gap-28` | 28px | Component internal spacing |
| `gap-32` | 32px | Large component gaps |
| `gap-36` | 36px | Section padding |
| `gap-40` | 40px | Large spacing |
| `gap-48` | 48px | Section margins |
| `gap-64` | 64px | Page sections |
| `gap-80` | 80px | Hero spacing |
| `gap-96` | 96px | Large section breaks |

## Component Sizing Scale

Fixed heights for interactive components — use `h-*` utilities:

| Utility | Pixels | Used by |
|---------|--------|---------|
| `h-32` | 32px | Button xs |
| `h-36` | 36px | Switch sm track, InputGroup sm |
| `h-40` | 40px | Button sm, TextInput sm, Dropdown sm |
| `h-44` | 44px | Switch md track, InputGroup md, min tap target |
| `h-48` | 48px | Button md, TextInput md, Dropdown md |
| `h-52` | 52px | InputGroup lg |
| `h-56` | 56px | Button lg, TextInput lg, Dropdown lg |
| `h-64` | 64px | Button xl |

## Inter-Component Spacing

| Between | Utility |
|---------|---------|
| Label and input | `gap-8` (8px) |
| Input and helper/error text | `gap-8` (8px) |
| Form fields | `gap-20` (20px) |
| Section heading and content | `gap-32` (32px) |
| Cards in a grid | `gap-16` mobile, `gap-24` desktop |
| Buttons in a group | `gap-12` (12px) |
| Icon and adjacent text | `gap-8` (8px) |

## Tailwind Utility Examples

With `--spacing: 0.0625rem`, utility numbers map 1:1 to pixels:

| Intent | Utility | CSS Output |
|--------|---------|------------|
| 8px gap | `gap-8` | `gap: calc(var(--spacing) * 8)` → 8px |
| 16px padding | `p-16` | `padding: calc(var(--spacing) * 16)` → 16px |
| 48px height | `h-48` | `height: calc(var(--spacing) * 48)` → 48px |
| 40px height | `h-40` | `height: calc(var(--spacing) * 40)` → 40px |
| 56px height | `h-56` | `height: calc(var(--spacing) * 56)` → 56px |
| 240px width | `w-240` | `width: calc(var(--spacing) * 240)` → 240px |
| 12px margin-top | `mt-12` | `margin-top: calc(var(--spacing) * 12)` → 12px |

### Anti-patterns

| Don't | Do |
|-------|----|
| `gap-2` for 8px (old 4px base) | `gap-8` for 8px |
| `h-12` for 48px (old 4px base) | `h-48` for 48px |
| `gap-[var(--scale8)]` | `gap-8` |
| `padding: var(--scale16)` | `@apply p-16` |
| `width: 240px` | `@apply w-240` |
| `height: 48px` | `@apply h-48` |

## Opacity Scale (`--opacity-*`)

Direct decimal values from 0 to 1. The token number represents the percentage (e.g., `--opacity48` = 0.48).

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `--opacity0` | 0 | | `--opacity44` | 0.44 |
| `--opacity2` | 0.02 | | `--opacity48` | 0.48 |
| `--opacity4` | 0.04 | | `--opacity52` | 0.52 |
| `--opacity6` | 0.06 | | `--opacity56` | 0.56 |
| `--opacity8` | 0.08 | | `--opacity64` | 0.64 |
| `--opacity10` | 0.10 | | `--opacity72` | 0.72 |
| `--opacity12` | 0.12 | | `--opacity80` | 0.80 |
| `--opacity16` | 0.16 | | `--opacity88` | 0.88 |
| `--opacity20` | 0.20 | | `--opacity96` | 0.96 |
| `--opacity24` | 0.24 | | `--opacity100` | 1.00 |
| `--opacity28` | 0.28 | | | |
| `--opacity32` | 0.32 | | | |
| `--opacity36` | 0.36 | | | |
| `--opacity40` | 0.40 | | | |

## Z-Index Scale (`--z-*`)

| Token | Value | Use Case |
|-------|-------|----------|
| `--zDropdown` | 1000 | Dropdown menus, select popups |
| `--zSticky` | 1100 | Sticky headers, floating elements |
| `--zModal` | 1300 | Modal dialogs, sheets |
| `--zToast` | 1400 | Toast notifications |
| `--zTooltip` | 1500 | Tooltips, popovers |

## Responsive Breakpoints

See `foundation/layout.mdc` for the canonical breakpoint definitions, section containers, gutters, and full-bleed rules.

| Name | Range | Media Query |
|------|-------|-------------|
| Mobile | 0 – 767px | Base styles (no media query) |
| Tablet | 768px – 1023px | `@media (min-width: 768px)` |
| Desktop | ≥ 1024px | `@media (min-width: 1024px)` |

## Hairline Border (`--borderHairline`)

A responsive border width that renders as 0.5px on retina displays:

```css
:root {
  --borderHairline: 1px;
}

@media (min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  :root {
    --borderHairline: 0.5px;
  }
}
```

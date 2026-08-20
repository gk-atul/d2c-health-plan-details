---
name: acko-design-system
description: ACKO's design system principles and patterns for building polished, accessible, production-ready UI. Use this skill when building any ACKO product UI — purchase flows, claims, renewals, dashboards, or any customer-facing surface. Triggers on: UI components, layout composition, forms, animations, transitions, responsive design, typography, spacing, color, insurance flows, mobile UX, accessibility, button states, input fields, loading states, error states, copy tone, marketing pages.
---

# ACKO Design System — Skill Orchestrator

This file is the entry point. Read it first, then drill into the specific reference and usage files listed in **Reference Files** below.

## Token Architecture

All values flow through a 3-layer system. Never skip layers.

```
Layer 1 — Primitives             Layer 2 — Semantics       Layer 3 — Components
──────────────────────────       ───────────────────       ──────────────────
primitives.md                    semantics.md              components.md
scales.md (spacing/sizing/       (role aliases like        Component CSS
opacity/z-index/breakpoints)     --textPrimary,            consumes Layer 2/3
radii.md                         --fillBrand,              tokens only.
shadows.md                       --surfaceBase)
typography.md (font tokens)
acko-motion-system (see separate skill)
```

**Rule:** Components reference Layer 2 (semantic) tokens only. Semantic tokens reference Layer 1 (primitives). Never use a primitive directly in a component.

## ACKO Product Personality

**Warm, bright, modern, and disciplined.**
Playful in spirit — never in execution.

This → Clear, human, confident, fast, trustworthy.
Not this → Cold, corporate, bloated, legal-heavy, fear-driven.
Not this → Cartoony, gimmicky, over-animated, patronizing.

## Design Principles

1. **Clear over Clever** — Plain language, no jargon, error messages explain what to do next.
2. **Effortless by Default** — No unnecessary steps, always show loading states, prefill known data.
3. **Present When It Matters** — Claims and emergencies get maximum clarity, no clutter.
4. **Respectful of User's Time** — No forced upsells in flows, no dead ends, remember context.
5. **Trustworthy at Every Touchpoint** — Visual consistency, only ACKO package components, no stale data.

## Hard Constraints

```
NEVER create a component that does not exist in the ACKO component package.
NEVER hardcode any value — always use tokens from Layer 1 via Layer 2.
NEVER write playful, witty, or clever copy. Clear always wins.
NEVER ship a layout that is not fully responsive.

NEVER leave an error state without a resolution path.
NEVER use a z-index value outside --zDropdown / --zSticky / --zModal / --zTooltip / --zToast.
NEVER use transition: all.
NEVER change font weight on hover or selected state.

NEVER reference a primitive token directly in a component — always go through semantics.

NEVER use --space-* tokens — they have been removed; use Tailwind utilities (gap-12, p-16, etc.) per scales.md.
NEVER use outline: for focus states — use box-shadow: 0 0 0 3px var(--borderFocus) per shadows.md.
NEVER use the old 4px-base Tailwind utility numbers (gap-2 for 8px) — the system uses 1px-base, so the utility number equals the pixel value (gap-8 for 8px). See scales.md.

NEVER add an app-level `@theme` / `index.css` override for Tailwind's `--spacing` when `@acko/tokens` is imported. `@acko/tokens` already defines `--spacing` (1px-per-unit base). A second definition desyncs packaged `@acko/*` component CSS from your utilities and breaks layouts. See **Tailwind spacing and @acko/tokens** below and scales.md.

NEVER place a card primary title and supporting body in a left/right split row — use vertical reading order. See cards.md.

NEVER place a title-reference Badge beside or below the title — only above the title (top-edge overlap allowed). See cards.md.

NEVER render a standalone @acko/icons component without className="size-{n}" — except inside @acko/button iconLeft/iconRight or @acko/badge icon prop where @acko/css handles sizing. See iconography.md.

NEVER use size-4, w-6, h-6, etc. expecting 16–24px icons — on ACKO's 1px scale those values are 4–6px. Standalone icons: size-16 (small) · size-24 (normal card) · size-32 (large hero). See iconography.md.
```

## Tailwind spacing and @acko/tokens

**What ships:** `@acko/tokens` includes `theme.css`, which sets `--spacing: 0.0625rem` so Tailwind v4 utilities use a **1px-per-unit** scale (`p-16` = 16px, `gap-8` = 8px). That value is intentional and is the single source of truth.

**What breaks things:** Defining `--spacing` again in your app (e.g. another `@theme inline { --spacing: … }` in `index.css`, or "restoring" the classic 0.25rem base) overrides the token package. Packaged components were built assuming the shipped base; utilities and component CSS then disagree → wrong padding, gaps, and icon sizes.

**What to do instead:**

1. Import `@acko/tokens/tokens.css` and `@acko/tokens/theme.css` as documented — do not override `--spacing` after them.
2. Use Tailwind spacing utilities with the **1px mapping** from scales.md (e.g. gutters `px-16 md:px-32 lg:px-40`, not old `px-4` expectations).
3. If migrating from the old 0.25rem mental model, multiply by 4 to get the new utility number (`gap-2` → `gap-8`, `p-4` → `p-16`).

**Not the problem:** Leaving `@acko/tokens` as the only `--spacing` definition. **Is the problem:** Any extra `--spacing` override in application CSS.

## Decision Flowcharts

### Is This Copy Correct?

```
Plain language a first-time insurance buyer would understand?
├── No → Rewrite
└── Yes → Contains jargon or hidden conditions?
           ├── Yes → Rewrite
           └── No → Warm but controlled? → Yes → Ship it
```

### Card or Flat Surface?

```
Content scanned independently? → Card (--shadowXs on variant="primary" only; --radius4xl)
Part of a list or feed?        → Flat surface with --borderHairline divider
Inline content in a flow?      → No surface, spacing tokens only
```

**Card primary vs secondary:** Same `--cardFillDefault` + `--cardBorderDefault` — elevation (`--shadowXs`) is the only differentiator. See `cards.md` § Part 1.

**Page surface Primary vs Secondary:** Primary canvas = `--surfaceBase`. Differentiated bands = **`<Surface>` full-bleed** (`w-full rounded-none`). **Form fields only** (`TextInput`, `Dropdown`, etc.) must never sit on a bare Surface — wrap in a Card. See `cards.md` § Surface content contract.

## Review Checklist

Before shipping any UI:

- [ ] All values from tokens — zero hardcoded values
- [ ] Token layering: components → semantics → primitives
- [ ] Only ACKO package components — no improvised patterns
- [ ] Copy is clear, plain, sentence case, never playful
- [ ] Fully responsive — mobile first; test at 390px, 768px, 1366px per [responsiveness.md](responsiveness.md) (600px tablet / 1024px desktop)

- [ ] Touch targets minimum 44px
- [ ] Hover effects disabled on touch devices
- [ ] Keyboard navigation works
- [ ] All icon buttons have aria labels
- [ ] Forms submit on Enter / Cmd+Enter
- [ ] Input font size minimum 16px (body-md)
- [ ] Loading states for all async content
- [ ] Error states have resolution paths
- [ ] No layout shift on dynamic content
- [ ] No `transition: all`
- [ ] Focus states use `box-shadow: 0 0 0 3px var(--borderFocus)` — never `outline:`
- [ ] z-index uses defined scale tokens only
- [ ] Tailwind utility numbers use the 1px-base mapping (`gap-8` for 8px, not `gap-2`)
- [ ] No app-level `--spacing` override — must match `@acko/tokens` only (see **Tailwind spacing and @acko/tokens**)
- [ ] Cards: title + body/subtext stack vertically — not title left / subtext right
- [ ] Title-reference badge above title only (top-edge overlap OK); unrelated badges use their own slot
- [ ] Card grids: primary CTAs align to the same vertical position (equal-height / footer pinned)
- [ ] Page secondary bands: `<Surface variant="secondary">` full-bleed (`w-full rounded-none`); cards on secondary bands use `variant="secondary"`
- [ ] Surface content contract: form fields (`TextInput`, `Dropdown`, `Checkbox`, etc.) inside Cards only — never on bare Surface/page canvas; Surface always full-bleed (`w-full rounded-none`)
- [ ] Selectable add-on line items: use **AddOnCheckboxCard** pattern (cards.md §11) — strip + optional badge row + checkbox/title; nested `Checkbox` uses `stopPropagation`; not the `Card` component
- [ ] Standalone icons follow the **simple rule**: `size-16` (small) · `size-24` (normal card) · `size-32` (hero) — not bare `<Icon />` (see iconography.md)
- [ ] Responsiveness checklist from [responsiveness.md](responsiveness.md) — type downshift, grid collapse, CTA full-width, component downshifts

### Layer 1 — Primitives (raw values)

| File | What's in it |
|------|-------------|
| [primitives.md](primitives.md) | Raw color palette: greys, purples, status colors, accent colors, alpha tokens. WCAG contrast notes. |
| [scales.md](scales.md) | Spacing (1px-base), component sizing (`h-32`–`h-64`), opacity scale, z-index scale, breakpoints, `--borderHairline`. |
| [radii.md](radii.md) | Border-radius tokens: `--radiusSm`, `--radiusMd`, `--radius2xl`, `--radius4xl`, `--radiusFull`, inset radii. |
| [shadows.md](shadows.md) | Elevation shadows + `--shadowFocusRing` for focus states + `--shadowBorder`/`--shadowBtnInner` for buttons. |

### Layer 2 — Semantics (role-based aliases)

| File | What's in it |
|------|-------------|
| [semantics.md](semantics.md) | All color role tokens: `--textPrimary`, `--surfaceBase`, `--fillBrand`, `--borderDefault`, status/accent/disabled families. Light + dark theme mappings. Legacy `--color*` migration table. |

### Layer 3 — Component tokens

| File | What's in it |
|------|-------------|
| [components.md](components.md) | Per-component token definitions. Single Value mode — Light/Dark resolves automatically through the alias chain (Component → Semantics → Primitives). |

### Layer 2/3 — Tokens + composition (split per topic)

| File | What's in it |
|------|-------------|
| [typography.md](typography.md) | Font family, type scale tokens (display/heading/body/label), Tailwind size mapping, button font scale, the `<Typography>` component API (variants, weights, color values, common patterns), text casing rules. |
| [iconography.md](iconography.md) | Icon library, arrow vs chevron semantics, size table (1px-base utilities), **tiny-icon troubleshooting**, placement, anti-patterns. |
| [layout.md](layout.md) | Breakpoints, section container, full-bleed two-layer pattern, gutters, grid rules, layout hierarchy, spacing rhythm, surface decisions, page templates, responsive composition, info density, empty states, non-negotiable rules. **For breakpoints on new work, prefer [responsiveness.md](responsiveness.md).** |
| [responsiveness.md](responsiveness.md) | **Canonical breakpoints (600px / 1024px)**, typography downshift swap table, layout rearrangement rules, component downshifts (table→cards, nav→hamburger), pre-ship checklist. Read before any screen. |
| [acko-motion-system](../acko-motion-system/SKILL.md) | Custom Acko motion system — major opens 500–600ms, exits 350–450ms, easing tokens, page transitions, pattern library, reduced motion, developer handoff. Read `references/` pages as needed. |

### Layer 3 — Component & UX usage

| File | What's in it |
|------|-------------|
| [cards.md](cards.md) | Card base API and **43 typed card patterns** in two tracks: **§1–§11** ACKO product cards (PolicyCard, PromoCard, AlertCard, DecisionCard, ServiceTile, NetworkCard, StatusCard, CommerceCard, ContentCard, **PlanRadioCard** §10, **AddOnCheckboxCard** §11) + **§12–§43** Storybook reference patterns. Includes core + extended slot vocabulary, layout hierarchy, badge placement, shell selection guide, token reference cheatsheet. |
| [forms-controls.md](forms-controls.md) | Inputs, buttons, validation timing, error handling, OTP, multi-step forms, CTA copy. |
| [touch-accessibility.md](touch-accessibility.md) | Tap targets, hover on touch, keyboard nav, ARIA, reduced motion, time-limited actions. |
| [performance.md](performance.md) | Image optimization, code splitting, list virtualization, React patterns, Vite config. |
| [ui-polish.md](ui-polish.md) | Focus states (using `--borderFocus`), skeleton loaders, gradients, dark mode implementation, safe areas, logo assets, decorative elements. |

## Reading Order

1. **Start here** — this file (SKILL.md).
2. **Tokens** — skim `semantics.md` and `scales.md` so you know what's available.
3. **Layout & responsiveness** — read `layout.md` and `responsiveness.md` end-to-end before composing any screen.
4. **Typography & icons** — read `typography.md` and `iconography.md` for any text/icon decision.
5. **Components** — `cards.md`, `forms-controls.md` for the right pattern.
6. **Polish** — `ui-polish.md`, `acko-motion-system` (when adding animation), `touch-accessibility.md`, `performance.md` before shipping.

When in doubt: re-read this file's **Hard Constraints** section.

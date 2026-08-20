---
description: Layout system — breakpoints, section containers, full-bleed sections, gutters, grid rules, desktop scaling, and composition principles
alwaysApply: true
---

# Layout & Composition

Structural layout primitives + composition principles. How screens are built, spaced, and arranged.
All pages and sections must adhere to this system unless explicitly overridden by a component specification.

## The Core Principle

Composition is not decoration. Every layout decision — spacing, surface, hierarchy — exists to help the user understand what to do next, faster.

## Layout Hierarchy

Every screen must have one clear primary action. Build the layout around it.

```
1. Primary message / heading     → Largest, highest contrast
2. Supporting context            → Secondary weight, below primary
3. Primary action (CTA)          → Most prominent interactive element
4. Secondary actions             → Visually subordinate to primary CTA
5. Escape hatches (back, cancel) → Present but never competing
```

Never put two elements of equal visual weight next to each other if one is more important.

## Breakpoints

Mobile-first only. Use `min-width` media queries exclusively. **Never** mix with `max-width`.

| Name | Range | Media Query |
|------|-------|-------------|
| Mobile | 0 – 767px | Base styles (no media query) |
| Tablet | 768px – 1023px | `@media (min-width: 768px) { }` |
| Desktop | 1024px and above | `@media (min-width: 1024px) { }` |

Mobile styles are the default. Tablet overrides at 768px. Desktop overrides at 1024px.
A device at exactly 768px receives Tablet styles. A device at exactly 1024px receives Desktop styles.

## Section Container (Default)

The standard constrained wrapper used in most sections. Controls maximum readable width, horizontal gutters, and center alignment.

### CSS

```css
.section-container {
  width: 100%;
  padding-left: 16px;   /* 16px — mobile */
  padding-right: 16px;
}

@media (min-width: 768px) {
  .section-container {
    padding-left: 32px;  /* 32px — tablet */
    padding-right: 32px;
  }
}

@media (min-width: 1024px) {
  .section-container {
    max-width: 1280px;
    margin: 0 auto;
    padding-left: 40px;  /* 40px — desktop */
    padding-right: 40px;
  }
}
```

### Effective Content Width (Desktop)

| Viewport | Container | Usable Content |
|----------|-----------|----------------|
| 1024px | 1024px (fluid) | 944px |
| 1280px | 1280px (capped) | 1200px |
| > 1280px | 1280px (centered) | 1200px |

Content must never touch viewport edges at desktop widths.

### Gutters

| Breakpoint | Gutter | Token |
|------------|--------|-------|
| Mobile | 16px | `p-16` |
| Tablet | 32px | `p-32` |
| Desktop | 40px | `p-40` |

Gutters are **internal padding**, not margin. This preserves structural alignment, maintains predictable grid calculations, prevents layout shift in nested contexts, and keeps full-bleed behavior consistent.

## Full-bleed Sections

Used for hero banners, image/video/animation backgrounds (Lottie / JSON-based), visual storytelling blocks, and edge-to-edge media.

Full-bleed sections must span the full viewport width on all devices.

### Required Two-layer Structure

```html
<!-- Outer: spans full viewport width (background/media edge-to-edge) -->
<section class="full-bleed">
  <!-- Inner: constrains content using Section Container rules -->
  <div class="section-container">
    ...content...
  </div>
</section>
```

```css
.full-bleed {
  width: 100%;
}
```

The outer wrapper carries the background/image/video/animation. The inner content uses Section Container rules for alignment. This ensures visual immersion, structural consistency, and aligned content across all sections.

### Hero / marketing strips (brand tint and gradients)

**Applies to:** Landing heroes, above-the-fold promotional bands, and any block where a **subtle brand tint**, **gradient**, or **full-width wash** sits behind headline copy plus CTAs and/or a lead form.

These backgrounds **must** behave as **full-bleed**: they span **edge to edge** of the viewport at **every** breakpoint. Readable width limits apply **only** to the **inner** layer, never to the layer that paints the background.

**Correct structure** (two layers — same rule as full-bleed above):

```html
<!-- Outer: full viewport width ONLY — background / gradient here -->
<section class="full-bleed" style="background: linear-gradient(180deg, var(--fillBrandSubtle) 0%, var(--surfaceBase) 100%);">
  <!-- Inner: section container — max-width, gutters, grid -->
  <div class="section-container">
    <div class="hero-grid"><!-- e.g. headline column + form column --></div>
  </div>
</section>
```

In Tailwind-first ACKO apps, the outer node is typically **`w-full`** (and optional vertical padding). The inner node carries **`max-w-7xl mx-auto`** (or equivalent section-container utilities: **`px-16 md:px-32 lg:px-40`**) and lays out the hero grid.

**Anti-pattern (do not ship):** Putting **`max-width`**, **`mx-auto`**, or section-container padding classes **on the same element** that defines the hero **background or gradient**. That constrains the coloured strip to a centred column and creates a “floating box” with bare margins on wide viewports — correct for **content**, wrong for the **background carrier**.

**Summary:** Background layer = **full width**. Content layer = **capped + centred**. Never combine both roles on one wrapper.

## Desktop Typography Scaling

Between **1024px and 1280px**, only typography scales. Grid column count, spacing, and component density remain constant.

| Viewport | Typography |
|----------|------------|
| 1024px | Minimum desktop type scale |
| 1280px | Maximum desktop type scale |
| > 1280px | No further scaling |

### Implementation

- **Preferred:** fluid scaling using `clamp()`
- **Acceptable:** stepped increase at `@media (min-width: 1280px)`

## Grid Rules

- Use relative units (`fr`, `%`) — no fixed pixel widths for layout columns
- Avoid `100vw` inside constrained containers (use `100%` relative to parent)
- Use `minmax(0, 1fr)` to prevent overflow issues
- Grid structure must not change between 1024px and 1280px

## Spacing Rhythm

Always use Tailwind spacing utilities with the **1px-base scale** (the utility number = the pixel value, see `scales.md`). Never hardcode padding, margin, or gap values.

### Rules

- Related elements → less space between them
- Unrelated elements → more space between them
- Section breaks → `gap-48` (48px) or larger
- Within a card or form group → `gap-16` to `gap-24` (16–24px)
- Between form fields → `gap-20` (20px)
- Between page sections → `gap-48` to `gap-64` (48–64px)

### Vertical Rhythm

Maintain consistent vertical rhythm throughout a flow. If the first screen uses `gap-20` between fields, every screen in that flow must too.

## Surface Decisions

### When to Use a Card (Elevated Surface)

Use cards when content needs to be:

- Scanned independently (a policy summary, a claim card)
- Selected or acted on individually
- Distinguished from surrounding content

Card styling: `border-radius: var(--radius4xl)` · primary cards: `box-shadow: var(--shadowXs)` · secondary cards: no shadow

### Card Spacing

- **Gap between cards:** at least `gap-12` (12px) between any two adjacent cards
- **Internal padding:** cards use `padding="md"` (20px) by default

### When to Use a Flat Surface

Use flat surfaces (no card, just spacing + dividers) when:

- Content is part of a continuous list or feed
- Items are related and belong to the same group

Divider: `border-bottom: var(--borderHairline) solid var(--borderDefault)`

### When to Use No Surface

Use no surface (spacing only) when:

- Content is inline within a flow
- It's a single piece of information

### Never

- Nest cards inside cards
- Use cards just to add visual interest
- Mix card and flat patterns within the same list

## Page Structure Templates

### Standard Flow Screen (Purchase, Claims, Renewal)

```
[Header / Progress indicator]
  ↓ gap-32
[Screen title — heading-lg or heading-xl]
  ↓ gap-8
[Supporting subtitle — body-md]
  ↓ gap-32
[Primary content area]
  ↓ gap-40
[Primary CTA — full width on mobile]
  ↓ gap-16
[Secondary action / escape hatch]
```

Spacing uses the 1px-base Tailwind scale (see `scales.md`). Example: `gap-8` = 8px, `gap-32` = 32px.

### Dashboard / Overview Screen

```
[Header with user context]
  ↓ gap-32
[Primary status card]
  ↓ gap-24
[Secondary cards / list items]
  ↓ gap-48
[Contextual actions]
```

### Form Screen

```
[Field label — label-lg]
  ↓ gap-8
[Input]
  ↓ gap-4
[Helper text or error — label-md]
  ↓ gap-20
[Next field]
```

## Responsive Composition

### What Changes at Breakpoints

| Element | Mobile | Tablet+ |
|---------|--------|---------|
| Multi-column layout | Single column | 2–3 columns |
| Side-by-side CTAs | Stacked, full width | Inline |
| Navigation | Bottom bar or hamburger | Top nav |
| Cards in a grid | 1 column | 2–3 columns |
| Form fields | Full width | Can be 2-column |
| Modal | Full screen bottom sheet | Centered dialog |

### Rules

- CTAs on mobile are always full width
- Text never overflows its container — use `overflow-wrap: break-word`
- Tap targets always minimum 44px
- Font sizes never go below 12px (label-md); use 14px (body-sm) as the floor for body text
- No horizontal scroll — ever

## Information Density

### Dense Content (Policy details, documents, claim history)

- More breathing room, not less
- Clear section headers using `heading-sm` variant
- Dividers using `--borderHairline` between logical groups
- Line height: `body-md` or `body-lg` tokens (24–28px)

### Sparse Content (Onboarding, success states, single actions)

- Generous whitespace to signal importance
- One thing at a time — don't fill empty space
- Large typography (`heading-xl` or `display-sm`), centered layout, single CTA

### Loading States

- Every piece of async content needs a skeleton loader
- Skeleton dimensions must match actual content dimensions — no layout shift
- Skeleton border-radius must match the real component's radius token

## Empty States

Empty states are never blank. They always:

1. Acknowledge what's missing
2. Explain why (if relevant)
3. Tell the user exactly what to do next

```
[Icon — lucide-react or /public/assets/icons/, size-40]
[Title — heading-md]
  ↓ gap-8
[Body — body-md, secondary color]
  ↓ gap-24
[Primary CTA]
```

Never leave a user at a dead end.

## Component Composition Rules

### Do

- Use the ACKO component package as-is
- Compose layouts using Stack, Grid, and Container components
- Use component variants as designed — don't override internal styles

### Never

- Create a new component if one exists in the package
- Override component internals with inline styles or hardcoded values
- Nest interactive components inside other interactive components
- Use a component for a purpose it wasn't designed for

## Anti-Patterns

| Don't | Do |
|-------|----|
| `max-width` media queries | `min-width` media queries (mobile-first) |
| Margin for gutters | Padding for gutters |
| Fixed pixel column widths | `fr` / `%` / `minmax()` |
| `100vw` inside constrained containers | `100%` relative to parent |
| Scale spacing between 1024–1280px | Only scale typography |
| Skip inner container in full-bleed | Always use two-layer structure |
| `max-w-*` / `mx-auto` / section gutters on the **same** element as hero gradient or full-bleed background | Outer `w-full` (background only); inner section-container for width + gutters |
| Hardcoded gutter values (`padding: 16px`) | `p-16` / `p-32` / `p-40` Tailwind utilities |
| Old 4px-base utilities (`gap-2` for 8px) | `gap-8` for 8px (1px-base) |
| Introduce new container variants | Use Section Container or Full-bleed only |

## Non-Negotiable Rules

1. Desktop layout begins at **1024px**.
2. Section Container is fluid until 1280px, then capped and centered.
3. Desktop gutters are fixed at 40px (`p-40`).
4. Tablet gutters are 32px (`p-32`).
5. Mobile gutters are 16px (`p-16`).
6. Typography is the **only** scaling variable between 1024px and 1280px.
7. Full-bleed sections **must** use the two-layer structure.
8. Hero or marketing strips with **brand tint / gradient / edge-to-edge wash** **must** use that same two-layer structure: **full-width outer** (background), **section-container inner** (content). Never constrain width on the background layer.
9. No additional container variants without system-level review.

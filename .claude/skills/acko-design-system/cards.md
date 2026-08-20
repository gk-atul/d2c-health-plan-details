# ACKO Card System

**Layer 3** of the design system — card grammar for composing contextual UI surfaces.

```
scales.md → semantics.md → components → cards.md
Raw values      Color roles    Atom components  Card grammar
```

> **Rule for LLM generation:** Every card must use a `Card` variant from the shell spec, compose from the slot vocabulary, pick a card type that matches the content's purpose, and reference only semantic tokens — never primitive values directly.

This file is the **single source of truth** for card creation. The catalog has **43 typed patterns** organised in two tracks:

- **§1–§11 — ACKO product patterns.** Domain-grounded cards for insurance flows: policies, alerts, plans, add-ons, network providers, status, commerce, content.
- **§12–§43 — Storybook reference patterns.** Layout-grounded cards mirroring `Organisms/Cards` in the Storybook (`apps/storybook/stories/CardOrganisms.stories.tsx`). Each entry names its reference function (e.g. `Card01_CreatorList`) so the implementation can be opened directly.

If a brief does not match any of the 43 patterns, **stop and ask** — do not invent a new shape.

---

## Part 0 — Surface System (read before choosing a card)

Cards always sit **on** a surface. The surface controls which card variant is correct. Always choose the surface first, then choose the card.

### Surface types (page / layout)

| Surface name | CSS token(s) | Light value | When to use |
|---|---|---|---|
| **Primary** | `--surfaceBase` | `#f5f5f5` (`--solidGrey100`) | Page / fold background — must always be the dominant surface on any page |
| **Secondary** | `<Surface variant="secondary">` → `--surfaceSecondaryBg` + `--shadowXs` | `#efeff0` (`--solidGrey150`) + elevation | Visual relief, section differentiation — **never** the first-fold background, **never** consecutive |
| **Static black** | `--surfaceStaticBlack` | `#141414` | Strong differentiation — max 1 per page |
| **Static white** | `--surfaceStaticWhite` | `#efeff0` | Designed for dark mode relief; use sparingly in light mode |
| **Brand** | `--surfaceAccent` | `#6841e6` | Brand moment — max 1 per page |
| **Brand Light** | `--surfaceAccentLight` | `rgba(153,116,249,0.16)` | Soft brand tint — **must always pair with Secondary card** |
| **Inverted** | `--surfaceInverted` | `#19191a` | Dark-on-light (or light-on-dark) differentiation |

> **Page Primary vs Secondary — fill AND elevation differ.** Primary page sections use `--surfaceBase` only (flat). Secondary page sections use **`<Surface variant="secondary">`** (applies `--surfaceSecondaryBg` + `--shadowXs`). Do **not** hand-roll `--surfaceBase` + shadow — that skips the fill step. Do **not** paste raw tokens when `@acko/surface` covers the variant.
>
> **Cards vs page surfaces — do not conflate:**
> - **Page surfaces** → Primary = `--surfaceBase`; Secondary = `--surfaceSecondaryBg` + `--shadowXs` (**different fills**).
> - **Cards** (`@acko/card`) → Primary and secondary both use `--cardFillDefault`; **shadow is the only card differentiator** (primary has `--shadowXs`, secondary does not).

> **Not page surfaces:** `--surfaceRaised` is for interactive shells (tabs, toggles, neutral chips) — not page Secondary surface and not a substitute for `--surfaceSecondaryBg`.

### Full-bleed secondary page band (implementation)

Use the two-layer structure from `layout.md`. **Prefer `@acko/surface`** — do not hand-apply `--surfaceSecondaryBg` / `--shadowXs` when the component exists.

```tsx
import { Surface } from "@acko/surface";

{/* Full-bleed: w-full + rounded-none strips Surface's default --radius4xl */}
<section className="w-full">
  <Surface variant="secondary" padding="none" className="w-full rounded-none py-64">
    <div className="section-container">{/* content */}</div>
  </Surface>
</section>
```

```tsx
{/* Inset panel (inside section-container) — keep default radius */}
<div className="section-container">
  <Surface variant="secondary" padding="lg">
    {/* content */}
  </Surface>
</div>
```

```css
/* Anti-patterns — do not ship */
.secondary-band-wrong {
  background-color: var(--surfaceBase);   /* ❌ primary fill + shadow only */
  box-shadow: var(--shadowXs);
}
/* ❌ Also avoid duplicating Surface CSS with inline style when @acko/surface exists */
```

On secondary bands, use **`Card variant="secondary"`** if the section contains cards (avoids double elevation).

### `@acko/surface` component variants (shipped CSS)

**Always use `<Surface>` for secondary (and brand / static / inverted) section shells** — full-bleed bands or inset panels. Tokens below are what the component applies; reference them for Figma parity, not for copy-paste in app CSS.

| `variant` prop | CSS class | Fill | Shadow |
|---|---|---|---|
| `"primary"` | `.acko-surface--primary` | `--surfacePrimaryBg` → `--surfaceFillDefault` | none |
| `"secondary"` | `.acko-surface--secondary` | `--surfaceSecondaryBg` → `--surfaceFillSubtle` | `--shadowXs` |
| `"staticBlack"` | `.acko-surface--static-black` | `--surfaceStaticBlack` | none |
| `"staticWhite"` | `.acko-surface--static-white` | `--surfaceStaticWhite` | none |
| `"brand"` | `.acko-surface--brand` | `--surfaceAccent` | none |
| `"brandLight"` | `.acko-surface--brand-light` | `--surfaceAccentLight` | none |
| `"inverted"` | `.acko-surface--inverted` | `--surfaceInverted` | none |

> **Page vs component:** Full-bleed page backgrounds use `--surfaceBase` (primary) or `--surfaceSecondaryBg` + `--shadowXs` (secondary). `<Surface variant="primary">` uses `--surfaceFillDefault` — a component fill for inset panels, **not** the page primary token. `<Surface variant="secondary">` uses the **same** `--surfaceSecondaryBg` fill as full-bleed secondary page bands.

### Surface content contract

**`<Surface>` is always full-bleed (edge to edge).** Use `className="w-full rounded-none"`. Put `section-container` *inside* the Surface for content alignment — never use a padded `<section>` wrapper as the background carrier with an inset Surface inside it.

**Form fields never on a bare Surface.** `TextInput`, `Textarea`, `Dropdown`, `OTP`, `Checkbox`, and `Radio` must live inside a **Card** (or equivalent form shell). This is the only hard restriction.

**Everything else is allowed on a Surface:** Typography, `Button`, `Badge`, `Progress`, `Accordion`, stats, avatars, and other components. Use **Cards** when you want grouped local content with inset padding — not as a mandatory wrapper for every interactive element.

```tsx
{/* ✅ Hero — CTAs and stats on Surface; form in Card only */}
<Surface variant="brandLight" padding="none" className="w-full rounded-none py-64">
  <div className="section-container grid gap-48 lg:grid-cols-2">
    <div className="flex flex-col gap-24">
      <Badge>Trusted by 1 crore+ Indians</Badge>
      <Typography variant="display-lg" as="h1">Headline</Typography>
      <Typography variant="body-lg" color="secondary">Supporting copy</Typography>
      <div className="flex gap-12">
        <Button variant="primary">Get your price</Button>
        <Button variant="secondary">Compare plans</Button>
      </div>
      <div className="grid grid-cols-3 gap-24">{/* stat columns */}</div>
    </div>
    <Card variant="primary">
      <form className="flex flex-col gap-20 p-24">
        <TextInput label="Pincode" />
        {/* …other form fields… */}
      </form>
    </Card>
  </div>
</Surface>

{/* ❌ Form fields directly on Surface */}
<Surface variant="brandLight">
  <TextInput label="Pincode" />
  <Dropdown label="Members" />
</Surface>
```

> **Primary page canvas (`--surfaceBase`):** Same form-field rule — never place text inputs on the bare page background. Other components follow the same guidance as on `<Surface>`. Differentiated bands use **`<Surface variant="…">`** full-bleed instead of hand-rolled tokens.

### Surface composition rules (non-negotiable)

1. **Primary surface dominates.** At any point in a page, Primary surface must occupy the highest percentage of total surface area.
2. **Max 3 differentiators per page.** Only use up to 3 non-Primary surfaces total on a single page.
3. **No two differentiating surfaces consecutively.** Never place Brand after Static black, Inverted after Brand, etc. — always return to Primary between differentiators.
4. **Don't change surface without a reason.** Only switch surface when there is a genuine visual or content hierarchy reason. Decorative alternation is an anti-pattern.

---

## Part 1 — Card Base Component

### React API (`@acko/card` + `@acko/css@2.0.6`)

```tsx
import { Card } from "@acko/card";

interface CardProps {
  variant?: 'primary' | 'secondary' | 'muted' | 'ghost';  // default: 'primary'
  className?: string;
  style?: CSSProperties;        // use only for non-visual layout (e.g. height: '100%')
  onTap?: () => void;           // when provided, renders as <button> — handles a11y automatically
  semanticLabel?: string;       // aria-label when using onTap
  children?: ReactNode;
}
```

> **CRITICAL — no sub-components exist.** `CardHeader`, `CardContent`, `CardFooter`, and a `padding` prop are **not part of this package**. Do not use them. All padding, flex layout, and gap must be applied on an **inner wrapper `<div>`** inside `<Card>`, never on `<Card>` itself.

> **CRITICAL — no inline border or background.** Never pass `border`, `borderRadius`, `backgroundColor`, or `boxShadow` via the `style` prop. The CSS class handles all of these. Overriding them breaks the token chain.

### Correct usage pattern

```tsx
<Card variant="primary">
  {/* Inner wrapper owns ALL layout — padding, flex, gap */}
  <div className="flex flex-col gap-16 p-24">
    <Typography variant="heading-sm" weight="semibold">Card title</Typography>
    <Typography variant="body-sm" color="secondary">Supporting text</Typography>
  </div>
</Card>
```

### Tappable / selectable cards

When the whole card is interactive, use `onTap` — the component renders a `<button>` element automatically:

```tsx
<Card
  variant={isSelected ? "primary" : "secondary"}
  onTap={() => setSelected(id)}
  semanticLabel="Select comprehensive plan"
>
  <div className="flex flex-col gap-16 p-24">…</div>
</Card>
```

For selection state, add a `box-shadow` ring via `className` — **never** override the `border` via `style`:

```tsx
// In index.css
.card-selected {
  box-shadow: 0 0 0 2px var(--cardBorderBrand), var(--shadowXs);
}
```

```tsx
<Card
  variant="primary"
  className={isSelected ? "card-selected" : undefined}
  onTap={…}
>
```

### Variants — Figma name → React prop

| Figma / design system name | `variant` prop | CSS class | Fill | Border | Shadow |
|---|---|---|---|---|---|
| **Primary card** | `"primary"` | `.acko-card--primary` | `--cardFillDefault` | `--borderHairline` solid `--cardBorderDefault` | `--shadowXs` (elevated) |
| **Secondary card** | `"secondary"` | `.acko-card--secondary` | `--cardFillDefault` | `--borderHairline` solid `--cardBorderDefault` | none (flat) |
| **Muted** | `"muted"` | `.acko-card--muted` | `--cardFillDisable` (grey) | `--borderHairline` solid `--cardBorderDisable` | none |
| **Ghost** | `"ghost"` | `.acko-card--ghost` | `transparent` | none | none |

> React prop names match Figma directly. `"primary"` = Primary card (elevated). `"secondary"` = Secondary card (flat). Default is `"primary"`.

> **Primary vs secondary rule (`@acko/css@2.0.6`):** Both use `--cardFillDefault` + `--cardBorderDefault` — **elevation is the only differentiator.** Primary adds `--shadowXs`; secondary has no shadow. Do not use `--cardFillHighlight` for card fill or border.

### Card-on-surface pairing rules

| Surface | Correct card variant | Reason |
|---|---|---|
| **Primary** (`--surfaceBase`) | `variant="primary"` | Shadow reads cleanly on a flat background |
| **Secondary** (`--surfaceSecondaryBg` + `--shadowXs`) | `variant="secondary"` | No card shadow — avoids double elevation on an already-raised band |
| **Brand Light** (`--surfaceAccentLight`) | `variant="secondary"` | Brand bg is already visually rich — no shadow needed |
| **Brand**, **Inverted**, **Static black**, **Static white** | `variant="primary"` or `variant="secondary"` preferred | Shadow still readable on these surfaces |

> **Sticky nav / header rule:** The top navigation bar must always use `--surfaceBase` as its background. Never use `--surfaceStaticWhite` — it ignores the theme and breaks dark mode.

### Specifications

- Border radius: `--radius4xl` (20px) — set automatically by `.acko-card`
- The `Card` element has `overflow: visible` — clipping must be applied via a wrapping element if needed
- Active (pressed) state on tappable cards uses `--cardFillHover` background automatically

### Token quick reference (card-specific)

| Token | Value chain | Use |
|---|---|---|
| `--cardFillDefault` | → `--surfaceFillDefault` → `--solidGrey50` | Fill for **Primary** + **Secondary** card |
| `--cardFillHighlight` | → `--surfaceFillHighlight` → `--solidGreyWhite` | **Not used by `@acko/card`.** Reserved for inputs, elevated surfaces, and custom patterns |
| `--cardFillDisable` | → `--surfaceFillDisable` | Fill for Muted |
| `--cardFillGhost` | → `transparent` | Fill for Ghost |
| `--cardFillHover` | → `--surfaceFillHover` | Active/pressed state |
| `--cardBorderDefault` | → `--borderDefault` (shipped `@acko/tokens@2.0.3`: `#b7b7b8`; Figma binds `card-border-default` to `#ffffff`) | Border token for **both** Primary + Secondary — same name, same value |
| `--cardBorderDisable` | → `--borderSoft` | Border for Muted |
| `--cardBorderBrand` | → `--borderBrand` → `--solidPrimary500` | Selection ring (via `box-shadow`) |
| `--borderHairline` | `1px` (0.5px on retina) | Border width |
| `--shadowXs` | Primary **card** elevation; page **secondary** surface elevation; `<Surface variant="secondary">` elevation |
| `--surfaceBase` | Page **primary** surface fill only — flat, no shadow |
| `--surfacePrimaryBg` | → `--surfaceFillDefault` → `#fafafa` light | `<Surface variant="primary">` fill — not the page background token |
| `--surfaceSecondaryBg` | → `--surfaceFillSubtle` → `#efeff0` light | Page **secondary** bands **and** `<Surface variant="secondary">` fill |
| `--surfaceAccent` | `#6841e6` | Brand surface fill |
| `--surfaceAccentLight` | `rgba(153,116,249,0.16)` | Brand Light surface fill |
| `--surfaceStaticBlack` | `#141414` | Static black surface |
| `--surfaceStaticWhite` | `#efeff0` | Static white surface |
| `--surfaceInverted` | `#19191a` light / `#efeff0` dark | Inverted surface |

---

## Part 2 — Card Grammar

1. **Identify the purpose** — match to one of the **43** card types in the catalog
2. **Pick the shell variant** specified for that type
3. **Compose slots** — use only the slots defined for that type
4. **Use real components** from the atom layer (Button, Badge, Typography, Avatar, etc.)
5. **Reference semantic tokens only** — never hardcode hex values or primitives

---

## Card layout hierarchy & badge placement (mandatory)

### Reading order — vertical, not split columns

- Do **not** place the **primary title** on the left and **supporting / body** text on the right in the same row. That left/right split is **not** a default card pattern for marketing or product cards.
- Use a **vertical reading order**: optional `eyebrow` → title-reference `status-badge` → `title` → `meta` → `body` → actions in `CardFooter`. Title and subtext **stack**; body copy is not a second column beside the title unless a **documented exception** applies (e.g. a list-event row §20, a horizontal-image card §14/§15 — flagged in their entries).

### Title-reference badges (`status-badge`)

- When a badge **qualifies the headline** (e.g. "Most popular", "New"), it must appear **above the title** in document order.
- It may sit on the **top edge of the card**, including **slight overlap** of the top border — that is a **valid** reference pattern when product chrome calls for it.
- Do **not** place title-reference badges **beside** the title, **below** the title, or in **inconsistent** corners of the card.
- Badges **not** tied to the title (e.g. price chip, ancillary tag) belong in a **separate slot** (`meta`, trailing area, or the card type's defined field) — do not reuse title-reference placement rules for those.

### Actions in card grids

- In a **row of cards** (e.g. plan comparison, feature tiles), **primary actions** must sit at a **consistent vertical position** across cards: use **equal-height** cards, column flex, and push the footer row (e.g. `mt-auto` on the action row or `CardFooter` at the bottom). Avoid **staggered button heights** when body copy length differs between cards.

---

## Slot Vocabulary

Slots are composable building blocks. A card type's entry lists which slots it uses; do not invent new structural regions outside this list.

### Core slots (used across §1–§43)

| Slot | Description | Typical Component |
|------|-------------|------------------|
| `status-badge` | Above the title — state or title qualifier (Pending, Most popular); may sit on top card edge | `Badge` |
| `eyebrow` | Small overline label above the title | `Typography variant="overline"` |
| `title` | Primary headline of the card | `Typography variant="heading-sm"` (or `heading-md`) |
| `meta` | Supporting info — id, date, duration, address | `Typography variant="body-sm" color="secondary"` or `caption` |
| `body` | Secondary descriptive content | `Typography variant="body-sm"` |
| `media` | Hero image, illustration, or wave placeholder | `<img>` with `object-fit: cover`, or styled gradient block |
| `icon` | Product or entity icon | Lucide icon or `/public/assets/icons/*.svg` |
| `primary-cta` | Main action for the card | `Button variant="primary"` or `"secondary"` |
| `secondary-cta` | Supporting action or text link | `Button variant="ghost"` or `"outline"` |
| `footer-link` | Subtle inline link at the bottom | `Typography variant="body-sm" color="brand"` as anchor / `Button variant="link"` |
| `input` | Inline text entry within the card | `TextInput` |
| `divider` | Horizontal rule between sections | `Separator` |
| `progress` | Progress bar or indicator | `Progress` |
| `inline-notice` | Nested informational strip | `Alert` (compact) |

### Extended slots (added for §12–§43)

| Slot | Description | Typical Component |
|------|-------------|------------------|
| `avatar` | Single user/entity avatar | `Avatar` |
| `avatar-stack` | Overlapped avatar row (facepile); negative-margin chain with hairline ring in `--cardFillDefault` | `Avatar` × N inside `flex` row |
| `search-trigger` | Input-shaped tappable pill — `icon` + placeholder + `ChevronRight`; `--inputFieldFill` fill, `--inputFieldBorder` stroke, `--radiusFull` | `<button>` (or `<a>`) styled as input |
| `rating` | Star rating row — filled stars in `--statusWarningBase`, empty stars in `--borderDefault` | `<div>` with star glyphs (`★`) |
| `stepper` | Quantity stepper — `Button iconOnly` (Minus) + value + `Button iconOnly` (Plus) | `Button` × 2 + `Typography body-md semibold` |
| `feed-stats` | Engagement row — repeated `icon + count` pairs (likes, saves, comments) | `<span>` rows, `--textSecondary` |
| `time-badge` | Small high-contrast time pill — `--textPrimary` fill, `--textStaticLight` text, `--radiusSm`, `label-sm` | `<span>` |
| `stat-grid` | 3-column icon + number cells | `<div>` grid |
| `task-list` | Vertical list of `icon + label` rows (Reading task pattern) | `<div>` with `Mail`/Lucide icons + `Typography` |
| `media-overlay` | Element absolutely positioned over `media` (badge, caption, control) | Composed inside `media-wrap` |
| `play-control` | Play action — circular FAB centred on media (`size="lg" iconOnly`) **or** small chip (`size="sm" iconLeft={Play}`) | `Button variant="primary"` |
| `host-pill` | Solid role label on solid-fill surfaces — `--textStaticLight` fill, `--fillBrand` text, `--radiusFull`, `label-sm` | `<span>` |
| `audience-counter` | `avatar-stack` + circular numeric extra (e.g. `40.2k`) | `Avatar` × N + ringed `<div>` |
| `dismiss` | Close (`X`) icon button — top-right of card | `Button variant="ghost" size="sm" iconOnly iconLeft={<X />}` |
| `media-caption-bar` | Bottom caption strip on full-bleed media — solid 72% black wash **or** linear gradient `to top` from 88% black; text in `color="static"` | `<div>` absolutely positioned at `bottom: 0` |
| `footer-row` | Hairline-divided footer block (`border-top: 1px solid var(--borderSubtle)`); content patterns: `view-more` (label + `ChevronRight`), `share` (`Share2` + label), `split-meta` (`Users` + count, `MapPin` + place) | `<div>` |

---

## Card Type Catalog

### 1. PolicyCard

**Purpose:** Displays an existing insurance policy (car, bike, health).

**Shell:** `Card variant="primary"` or `variant="secondary"`, `padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `icon` | Yes | Product icon — 24px |
| `title` | Yes | Policy name |
| `meta` | Yes | Vehicle reg + coverage expiry |
| `status-badge` | Conditional | Only when expiring/expired/notice |
| `primary-cta` | Conditional | Only for actionable states |
| `secondary-cta` | Optional | |
| `inline-notice` | Optional | Renewal message below actions |

**Variants:** `compact` (icon + title + meta + chevron), `standard` (+ expiry badge + actions), `with-notice`

**Token rules:** Expiry text in `--statusSuccessText` (active) / `--statusErrorText` (expired) / `--statusWarningText` (expiring soon). Chevron: `ChevronRight`, 18px.

---

### 2. PromoCard

**Purpose:** Acquisition, cross-sell, or upsell — drives toward a new product or purchase.

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | Bold value proposition |
| `primary-cta` | Yes | Always present |
| `media` | Conditional | Required for vertical-rich and carousel variants |
| `body` | Optional | Supporting subtitle |
| `eyebrow` | Optional | Offer tag — use `Badge` |

**Variants:**

| Variant | Shell | Layout |
|---------|-------|--------|
| `horizontal-banner` | `Card variant="primary" padding="md"` | Text left, image right |
| `vertical-rich` | Custom full-bleed image + gradient overlay | Image fills card, text overlays at bottom |
| `mini` | `Card variant="secondary" padding="sm"` | Eyebrow + title + CTA — compact |
| `carousel-tile` | `Card variant="primary" padding="none"` | Image top, label + CTA bottom |

---

### 3. AlertCard

**Purpose:** Status notification — policy update, system message, time-sensitive event.

**Shell:** Custom — no Card wrapper. Full-width banner with left accent border.

| Slot | Required | Notes |
|------|----------|-------|
| `eyebrow` | Yes | Policy/context name |
| `title` | Yes | Status message |
| `body` | Optional | Additional detail |
| `primary-cta` | Optional | Aligned trailing |

**Variants by severity:**

| Variant | Background | Left border | Text color |
|---------|------------|-------------|------------|
| `info` | `--statusInfoSubtle` | `--statusInfoBase` | `--statusInfoText` |
| `warning` | `--statusWarningSubtle` | `--statusWarningBase` | `--statusWarningText` |
| `error` | `--statusErrorSubtle` | `--statusErrorBase` | `--statusErrorText` |
| `success` | `--statusSuccessSubtle` | `--statusSuccessBase` | `--statusSuccessText` |
| `neutral` | `--surfaceRaised` | `--borderDefault` | `--textPrimary` |

Left accent border: `4px solid {color}`, full card height. Border radius: `--radius2xl`.

---

### 4. DecisionCard

**Purpose:** Requires explicit user choice before proceeding. High urgency. Blocks flow.

**Shell:** `Card variant="primary" padding="md"` with colored top border via `className`.

| Slot | Required | Notes |
|------|----------|-------|
| `status-badge` | Yes | "Pending", "On hold", "Action required" |
| `title` | Yes | Clear directive — `heading-md` |
| `body` | Yes | Context explaining why action is needed |
| `primary-cta` | Yes | `Button variant="primary" fullWidth` |
| `icon` | Optional | |
| `footer-link` | Optional | "Learn more" |

**Variants:** `pending` (warning border), `on-hold` (error border), `action-required` (error border)

---

### 5. ServiceTile

**Purpose:** Quick-access shortcut to a feature or service. Tappable square.

**Shell:** `Card variant="secondary" padding="sm"` — fixed square aspect ratio.

| Slot | Required | Notes |
|------|----------|-------|
| `icon` | Yes | 24px, `--textPrimary` |
| `title` | Yes | `label-lg` — 2 lines max |

Size: 80×80px to 96×96px. No explicit CTA — entire tile is interactive.

---

### 6. NetworkCard

**Purpose:** Provider in a network — hospital, garage, lab. Used in listing contexts.

**Shell:** `Card variant="primary" padding="md"` or `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | Provider name |
| `meta` | Yes | Rating + distance or address |
| `status-badge` | Optional | Network type ("Cashless") |
| `media` | Optional | Provider thumbnail, 64×64px, `--radiusLg` |
| `footer-link` | Optional | "View details" |

Selected state: `border-color: --cardBorderBrand` + `box-shadow: 0 0 0 1px var(--cardBorderBrand)`

---

### 7. StatusCard

**Purpose:** Shows status of a claim, transaction, booking, or background process.

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `status-badge` | Yes | Current status |
| `title` | Yes | What is being tracked |
| `meta` | Yes | Reference ID, date, timestamp |
| `body` | Optional | Secondary detail |
| `primary-cta` | Optional | "View details" |
| `progress` | Optional | For in-progress states |

**Badge color by state:**

| State | Badge bg | Badge text |
|-------|----------|------------|
| Completed / Paid | `--statusSuccessBadgeBg` | `--statusSuccessText` |
| Scheduled | `--fillBrandSubtle` | `--fillBrand` |
| Pending / Processing | `--statusWarningBadgeBg` | `--statusWarningText` |
| Failed / Rejected | `--statusErrorBadgeBg` | `--statusErrorText` |

---

### 8. CommerceCard

**Purpose:** Pricing, discounts, coupon entry, and reward display.

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | Offer headline or pricing label |
| `primary-cta` | Yes | Apply, Save, Explore |
| `icon` | Conditional | Coupon/offer icon — 24px |
| `input` | Conditional | `TextInput` for coupon code entry |
| `body` | Optional | Savings amount, terms |
| `secondary-cta` | Optional | Remove (for applied state) |

**Variants:** `coupon-input`, `coupon-applied`, `pricing-summary`, `reward`, `offer-banner`

---

### 9. ContentCard

**Purpose:** Editorial content — articles, how-to guides, explanations.

**Shell:** `Card variant="primary" padding="none"` for image-top; `Card variant="secondary" padding="md"` for inline banner.

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | Article title |
| `media` | Conditional | Hero image — full bleed, 16:9 or 3:2 |
| `eyebrow` | Optional | Category label — `overline color="brand"` |
| `meta` | Optional | Author, date, read time — `caption` |
| `body` | Optional | Excerpt — 3 lines max |
| `primary-cta` | Optional | "Read more" — `Button variant="outline" size="sm"` |

**Variants:** `image-top`, `thumbnail-right`, `info-banner`

---

### 10. PlanRadioCard (selectable plan option)

**Purpose:** One **plan option** inside a **radio group** (e.g. bike insurance Comprehensive vs Third-party). User selects **exactly one** plan; the **card shell** shows selection via **border** (not a full-card tint). Used in purchase flows where the card is the **entire hit target** but may include **secondary links** (see exceptions below).

**This is a documented variation** of the card shell: `Card` can't be the interactive element here (see "Why not a plain Card" below), so the real **`Card` component from `@acko/card`** is used as an inner **visual shell only** (`variant="primary"`, no `onTap`), nested inside a plain `<label>` that owns native radio-group behavior via **ACKO radio "card item"** primitives (`acko-radio-card-item`, `acko-radio-native`, `acko-radio-circle`, `acko-radio-label-content`) plus **app-level CSS** for grid layout, borders, and the selected state Card doesn't natively support yet.

**Structure:** `<label>` (native radio semantics, full-width, unstyled) → `<Card variant="primary" className="plan-radio-card acko-radio-card-item ...">` (visual shell; the `<input type="radio">` is Card's **first child** so `:focus-within` still fires on Card's own root, and stays an **immediate sibling** of `.acko-radio-circle` so the DS's `.acko-radio-native:focus-visible + .acko-radio-circle` selector keeps working) → an inner `<div className="plan-radio-card--plan-grid ...">` carrying the grid layout (radio circle, badge, title, main all live here now, not on Card's root).

**Why `variant="primary"`, not `"secondary"`:** this card sits on the flat `Primary` page surface (same surface as any other card on the same screen) — per the Card-on-surface pairing rule (Part 1), Primary surface pairs with `variant="primary"` so the shadow reads correctly against a flat background. `"secondary"` (no shadow) is for cards sitting on an already-elevated `Secondary` band, which doesn't apply here. The "no extra box-shadow for selection" rule below is about not adding a *different* shadow when selected — not about suppressing the card's baseline elevation entirely.

**Why not a plain `Card`:** `Card`'s only clickable mode (`onTap`) renders a `<button>`; a `<button>` can't provide native `<input type="radio">` keyboard/group semantics (arrow-key navigation between options, real `checked` state). So `Card` is used unclickable (no `onTap`) purely for its visual shell, and the `<label>`+`<input>` around it does the actual interaction.

**Card doesn't support a "selected" state yet:** `Card`'s `variant` enum (primary/secondary/muted/ghost) has no notion of "this one is currently chosen" — the 1px→2px selected border below is still hand-rolled app CSS on top of Card's own classes, same as before this restructure. `Card`'s own radius (`--radius5xl`) also differs from this card's spec (`--radius4xl`) and gets overridden. **TODO(card-selected-state):** once `@acko/card` ships a real selected/active variant or prop, drop the app-level border overrides and drive selection through that instead — the grid layout and radio-input plumbing described above stay either way.

**Reference implementation:** D2C bike journey — `PlanRadioCard` in `app/bike-journey/plans/page.tsx`; styles in `app/globals.css` under `.plan-radio-card*`, `.addon-select-card*` (sibling pattern) — see the `TODO(card-selected-state)` comments there.

#### Shell & border (mandatory)

| State | Border | Token / value |
|-------|--------|----------------|
| Default / unselected | **1px** solid | `var(--cardBorderDefault)` — **matches** `Card variant="primary"` (e.g. bike details / IDV strips on same screen). |
| Selected | **1px** solid | `var(--cardBorderBrand)` — color-only change, same width as unselected (no layout shift on toggle) |
| Hover (unselected) | **1px** | Border `var(--brandRing)` |
| Hover (selected) | **1px** | Border `var(--fillBrandHover)` |

- **Padding:** `var(20px)`; **radius:** `var(--radius4xl)`; **background:** `var(--cardFillDefault)` (aligns with `Card variant="primary"` shell — same fill as `"secondary"`, `"primary"` additionally adds `--shadowXs`, correct for this card's Primary-surface placement).
- **Transition:** `border-color`, `border-width`, `background-color` (~150ms).
- **Focus:** `@acko/css` applies **`box-shadow`** on **`.acko-radio-card-item:focus-within`**, which stacks with the purple border and looks like a **double** purple edge. **Override** for this pattern only: **`.plan-radio-card.acko-radio-card-item:focus-within { box-shadow: none; }`**. Keyboard focus remains on the **radio circle** via **`.acko-radio-native:focus-visible + .acko-radio-circle`** (DS).

#### Layout — CSS Grid (not default ACKO flex row)

Use **`plan-radio-card--plan-grid`**: `grid-template-columns: auto 1fr`; **`align-items: center`** on the title row so the **radio** and **plan title** align vertically.

| `plan-radio-card--has-badge` | Grid areas |
|------------------------------|------------|
| **No** | `radio | title` then `main | main` (full width) |
| **Yes** | `badge | badge` (full width), then `radio | title`, then `main | main` |

- **Badge row** must span **both** columns (`badge badge`), **`justify-self: start`**, so the **"Most popular"** pill aligns with the **radio column** — do **not** place the badge only in column 2.
- **Main** (`acko-radio-label-content.plan-radio-card-main`): set **`gap: 0`** on the label content override so spacing is controlled only by inner stacks.

#### Slots (composition)

| Slot | Required | Notes |
|------|----------|-------|
| `status-badge` | Conditional | **"Most popular"** — `Badge variant="solid" color="purple" size="md" textCase="sentence"`; optional **shimmer** (wrapper + `::after` gradient animation; badge `z-index` above shimmer; `margin-bottom: calc(var(4px) / 2)` under pill). Respect **`prefers-reduced-motion`**. |
| `title` | Yes | Plan name — `Typography` **20px** bold (`heading-sm` + explicit size/line height), primary. |
| `body` (pointers) | Yes | **Single `<ul>`** — **tenure** lines first, then **coverage** lines; same visual system for all rows: Lucide **`Check`** 18px, `var(--statusSuccessText)`, `Typography body-sm` primary **medium**; list **`gap: var(12px)`**; row **`gap: var(8px)`** icon-to-text. |
| `footer-link` | Optional | **"More details"** — `Button variant="link" size="sm"`; **`stopPropagation`** on click so the label does not toggle radio. |
| `divider` | Yes | `Separator` between body and price — tuned **`marginTop`** (e.g. `calc(var(16px) - var(4px))`) above separator block. |
| `meta` (price) | Yes | **Row:** `flex flex-nowrap justify-start items-center gap-2`. **Main price:** `heading-md` + **`--fontHeadingMd*`** tokens. **Strikethrough (optional):** `body-md` secondary, `line-through`, **`--fontBodyMd*`**, regular weight (not extrabold unless product specifies). |

**Main block top spacing:** `padding-top: calc(var(8px) + var(4px))` on `.plan-radio-card-main` for space below the title row.

#### Props (data model)

| Prop | Purpose |
|------|---------|
| `groupName` | Radio `name` (from parent `useId()`). |
| `value` / current `plan` | Option id vs selection. |
| `setPlan` | Updates selection. |
| `showHighlightBadge?` | Renders badge row + `plan-radio-card--has-badge`. |
| `title` | Plan name. |
| `tenurePointers` | `string[]` — short tenure lines (same checklist style as features). |
| `features` | `string[]` — coverage bullets. |
| `price` | Formatted amount. |
| `strikethrough?` | Optional old price. |

#### Exceptions to global card rules

- **Nested control:** Rule "no interactive inside fully interactive card" is **relaxed** here for **"More details"**: use **`type="button"`** + **`stopPropagation`** — required for product UX; document in QA.
- **Selection chrome:** Rule 12 in `Rules for LLM Card Generation` references a **box-shadow ring** — for **PlanRadioCard**, selection is **`border-width` 1→2px** + **primary color**, **not** an extra `box-shadow` on the card (and **disable** DS `:focus-within` shadow as above).

---

### 11. AddOnCheckboxCard (selectable add-on / upsell line item)

**Purpose:** One **optional insurance add-on** (e.g. Zero Dep, PA cover) in a **multi-select** list. User can toggle **many** add-ons on or off. The **entire card** is the hit target; selection is shown with a **2px primary border** (same mental model as plan cards). Used in purchase flows after plan selection.

**This is a documented variation** of the card shell: the real **`Card` component from `@acko/card`** is used as an inner **visual shell only** (`variant="primary"`, no `onTap`), nested inside a plain (non-`Card`, non-button) `<div>` that owns the "whole card is clickable" tap target. Card carries **`addon-select-card`** + **`addon-select-card--strip`** as `className`; the outer plain div carries **`addon-select-card-tap`**. All visual overrides live in **app-level CSS** in `globals.css` (strip + body + price row).

**Structure:** `<div className="addon-select-card-tap" onClick={...}>` (plain div, owns the tap-to-toggle handler) → `<Card variant="primary" className="addon-select-card addon-select-card--strip ...">` (visual shell — border/fill/radius, overridden below) → `.addon-strip` (top strip: badge, checkbox, title) + `.addon-strip-body` (pointers + price), same as before.

**Why `variant="primary"`, not `"secondary"`:** same Card-on-surface pairing reasoning as PlanRadioCard above — this card sits on the flat `Primary` page surface, so it should carry the same shadow-elevation treatment as every other card on that surface (e.g. the bike details / IDV summary cards on the Plans screen).

**Why the outer div can't be `Card` itself:** the card nests an independently-clickable `<Checkbox>` — tapping it toggles selection without also tapping the card, via `stopPropagation`. `Card`'s only clickable mode (`onTap`) renders the whole thing as a `<button>`, and HTML doesn't allow one interactive control (`Checkbox`) nested inside another (`button`) — that's a hard spec violation, not a style choice, so `Card` is used unclickable here and a plain `<div>` outside it owns the click.

**Card doesn't support a "selected" state or this card's fill yet:** `Card`'s `variant` enum has no "selected" concept (the 2px brand border below is still hand-rolled app CSS on top of Card's own classes), and `Card`'s default fill (`--cardFillDefault`) doesn't match this card's spec (`--solidGreyWhite`), so that's overridden too. `Card`'s own radius (`--radius5xl`) also differs from this card's spec (`--radius4xl`) and gets overridden. **TODO(card-selected-state):** once `@acko/card` ships a real selected/active variant or prop and a clickable-`<div>` mode, drop these overrides and the outer wrapper div, and drive selection through the component directly.

**Reference implementation:** D2C bike journey — `AddOnCheckboxCard` in `app/bike-journey/plan-details/page.tsx`; styles under `.addon-select-card*`, `.addon-strip*`, `.addon-pointer-list`, `.addon-strip-price-row` in `app/globals.css`.

#### Shell & border (mandatory)

| State | Border | Notes |
|-------|--------|--------|
| Default / unselected | **2px** solid | `var(--cardBorderDefault)` — aligns with selectable **outline** chrome. |
| Selected | **2px** solid | `var(--cardBorderBrand)` |
| Hover (unselected) | **2px** | `var(--brandRing)` |
| Hover (selected) | **2px** | `var(--fillBrandHover)` |

- **Radius:** `var(--radius4xl)`; **strip layout** uses **`addon-select-card--strip`** → **`padding: 0`**, **`overflow: hidden`**.
- **Background:** outer card uses `var(--solidGreyWhite)`; **top strip** (`.addon-strip`) uses a **demoted-tint** mix: `color-mix(in srgb, var(--surfaceFillSubtle) 22%, var(--solidGreyWhite))` with **bottom hairline** `var(--borderSubtle)`.
- **Transition:** `border-color`, `background-color` (~150ms).

#### Layout — "structure 2" (mandatory for all add-ons)

Use a **single column** inside the strip:

1. **Optional `status-badge` row** — full width, **`justify-start`**. When present, wrap badge in **`max-w-[min(100%,14rem)]`** so long copy wraps cleanly. Typical: **`Badge variant="solid" color="purple" size="md" textCase="sentence"`** ("Popular in your city"). **Omit** the row when `stripEnd` is absent.
2. **Checkbox + title row** — **`flex`**, **`gap: var(12px)`**; checkbox column **`pt-0.5`** for optical alignment with **`heading-sm`** title.
3. Inner stack **`gap: var(8px)`** between badge row and checkbox row (when a badge exists).

**Body (below strip):** `.addon-strip-body` — pointer list + dotted separator + price.

| Region | Class / behaviour |
|--------|-------------------|
| Strip container | `.addon-strip` — padding `var(16px) var(20px)` |
| Pointers | **`<ul class="addon-pointer-list">`** — reuse **PlanRadioCard** row pattern: Lucide **`Check`** 18px, **`plan-radio-card-pointer-item`** / **`plan-radio-card-pointer-icon`**, **`Typography body-sm`** primary medium; list **`gap: var(8px)`**. |
| Price | **`.addon-strip-price-row`** — **`heading-md`** with **`--fontHeadingMd*`** tokens; **dotted rule** via **`::before`** + `repeating-linear-gradient` (not browser `dotted`). |

#### Slots (composition)

| Slot | Required | Notes |
|------|----------|-------|
| `status-badge` | Optional | Title-qualifier pill **above** checkbox + title — **not** beside the title. Omit for add-ons without merchandising. |
| `title` | Yes | Add-on name — **`Typography` `heading-sm`**, **brand** when selected else **primary**, **bold**. |
| `body` (pointers) | Yes | **`string[]`** — checklist rows (same iconography as plan card features). |
| `meta` (price) | Yes | Formatted premium — **dotted line** above price row. |

#### Props (data model)

| Prop | Purpose |
|------|---------|
| `title` | Add-on label. |
| `pointers` | Feature lines for the list. |
| `price` | Number — format with journey **`formatRupees`**. |
| `selected` | Controlled checked state. |
| `onToggle` | `(next: boolean) => void` — invoked on card click or checkbox change. |
| `stripEnd?` | Optional **`ReactNode`** — almost always a **`Badge`**; omit when no badge. |

#### Exceptions to global card rules

- **Nested control:** The whole card is **`onClick`** to toggle, via the **outer plain `<div>`** (not `Card` itself — see "Why the outer div can't be `Card` itself" above). **`Checkbox`** is nested — wrap it in **`stopPropagation`** on **`onClick`** so clicking the checkbox does not double-fire; checkbox **`onChange`** still updates state. Same accessibility pattern as **PlanRadioCard** "More details" (exception to "no nested interactive" for product UX).
- **`Card` is the visual shell, not the click target:** do use **`@acko/card`** (`variant="primary"`, no `onTap`) for the box itself, but keep the tap handler on the plain wrapper `<div>` outside it — see the structure above. Still apply the **documented class names** (`addon-select-card`, `addon-select-card--strip`, etc.) as `Card`'s `className` so strip/body/price styles and the selected-state override apply.

---

## §12–§43 — Storybook Reference Catalog

Cards 12–43 mirror the layouts in `apps/storybook/stories/CardOrganisms.stories.tsx`. Each entry's **Reference** field names the source function — open it for the full implementation. All cards in this section use only `@acko/card`, `@acko/button`, `@acko/typography`, `@acko/avatar`, `@acko/badge`, and `lucide-react`. Helper class names (`sb-card-*`) live in `apps/storybook/src/preview.css`; their styles use **only semantic tokens** — no primitives, no raw hex.

> **Naming offset:** Storybook function `Card01_*` maps to skill entry **§12**, `Card02_*` to **§13**, …, `Card32_*` to **§43**.

### 12. CreatorListCard

**Purpose:** Header row introducing a list of related people — title on the left, overlapping avatar facepile on the right.

**Reference:** `Card01_CreatorList`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | `Typography variant="body-md" weight="semibold"` |
| `avatar-stack` | Yes | 4 × `Avatar size="sm"`; chained with **negative left margin** and a **2px ring** in `--cardFillDefault` for separation; `z-index` increases per child so the leftmost is behind. |

**Notes:** Title and avatar stack sit in a single `space-between` row. This is one of the documented exceptions where left/right placement is allowed because **neither side is body copy** — both are peer slots.

---

### 13. SearchRowCard

**Purpose:** Tappable search entry point — looks like a search input but routes to the search screen.

**Reference:** `Card02_SearchRow`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `search-trigger` | Yes | Pill-shaped row: leading `Search` icon, placeholder text in `body-md` `--textSecondary`, trailing `ChevronRight`; fill `--inputFieldFill`, stroke `--inputFieldBorder`, radius `--radiusFull`. |

**Notes:** This is a **navigation control disguised as an input** — the trigger is a `<button>`/`<a>`, not a real `TextInput`. Aria label must describe the destination (e.g. `aria-label="Search creators"`).

---

### 14. HorizontalImageRightCard

**Purpose:** Article / topic preview with text on the left, square media on the right; rating + bookmark live with the text.

**Reference:** `Card03_HorizontalImageRight`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | `heading-sm` |
| `rating` | Yes | 5-star row, filled stars `--statusWarningBase`, empty `--borderDefault` |
| `secondary-cta` | Yes | `Button variant="ghost" size="sm" iconOnly iconLeft={<Bookmark />}` — `aria-label` required |
| `media` | Yes | 104×104 square wave; `--radiusInsetMd` |

**Notes:** This is the **first documented exception** to the vertical-stacking rule. Text occupies the left column, media the right; both columns are vertically `stretch`-aligned. Use **only** for "topic + thumbnail" previews, never for marketing or product cards.

---

### 15. HorizontalImageLeftCard

**Purpose:** Same as §14 but image-leading — used when the media is the dominant signifier (cover art, illustration).

**Reference:** `Card04_HorizontalImageLeft`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 104×104 square wave; `--radiusInsetMd` |
| `title` | Yes | `heading-sm`, vertically centered |

**Notes:** Same exception as §14. Use the `vcenter` modifier (`align-items: center`) when the body is a single line — keeps the title visually balanced against the media.

---

### 16. TicketCard

**Purpose:** Quantity-controlled ticket / pass row (event tickets, child seats, add-on units).

**Reference:** `Card05_Ticket`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | `body-md` `weight="semibold"` |
| `meta` | Yes | `body-sm` `color="secondary"` (e.g. age range, tier) |
| `stepper` | Yes | `Button variant="secondary" size="sm" iconOnly` (Minus) + count + `Button …` (Plus); minimum is 1 — disable `−` when `n <= 1`. |

**Notes:** Stepper `Button` is **interactive nested in a non-interactive card** — the `Card` itself has no `onClick`. This is the standard composition; no exception needed.

---

### 17. ProfileFollowCard

**Purpose:** Compact person row with a Follow CTA — list item, search result, recommendation row.

**Reference:** `Card06_ProfileFollow`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `avatar` | Yes | `Avatar size="lg"` |
| `title` | Yes | Display name — `body-md` `weight="semibold"` |
| `meta` | Yes | Handle — `body-sm` `color="secondary"` |
| `primary-cta` | Yes | `Button variant="primary" size="sm"` ("Follow") |

---

### 18. SocialFeedCard

**Purpose:** Single social-feed post — author header, body, engagement stats.

**Reference:** `Card07_SocialFeed`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `avatar` | Yes | `Avatar size="md"` |
| `title` | Yes | Author name — `body-md` `weight="semibold"` |
| `meta` | Yes | Timestamp — `caption` `color="secondary"` (e.g. "· 2 weeks ago") |
| `secondary-cta` | Yes | `Button variant="ghost" size="sm" iconOnly iconLeft={<MoreHorizontal />}` |
| `body` | Yes | `body-sm` `color="secondary"` |
| `feed-stats` | Yes | Likes (`Heart`), saves (`Bookmark`), comments (`MessageCircle`); icons 18px, counts in `caption`, color `--textSecondary`; row `gap-8`, separated `space-between`. |

---

### 19. EventRowCard

**Purpose:** Event / scheduled session row — small thumbnail + time-stamped title + actions.

**Reference:** `Card08_EventRow`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 72×56 thumbnail wave; `--radiusInsetSm` |
| `time-badge` | Yes | "07:00 PM" — `--textPrimary` fill, `--textStaticLight` text |
| `title` | Yes | `body-md` `weight="semibold"` |
| `meta` | Yes | Date — `body-sm` `color="secondary"` |
| `secondary-cta` | Optional | `MoreHorizontal` ghost icon button |

---

### 20. StatBarCard

**Purpose:** Compact analytics summary — three icon + number cells in a single row.

**Reference:** `Card09_StatBar`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `stat-grid` | Yes | 3 cells, `grid-template-columns: repeat(3, minmax(0, 1fr))`; each cell stacks icon (28px, `--textSecondary`) above number (`body-md` `semibold`); cell `gap-8`, grid `gap-12`. |

**Notes:** Always 3 cells. Avoid 2 (looks empty) or 4+ (cramped) — split into a second card if more metrics are needed.

---

### 21. ReadingHeaderCard

**Purpose:** Reading-task header — overline label + leading-icon title row.

**Reference:** `Card10_ReadingHeader`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `eyebrow` | Yes | "Reading task" — `caption` `color="secondary"` |
| `icon` | Yes | 20px Lucide (e.g. `Mail`), `--textPrimary`, top-aligned with `margin-top: 2px` for optical alignment |
| `title` | Yes | `heading-sm` |

---

### 22. ReadingIconBodyCard

**Purpose:** Reading-task with a leading icon, title, and a short description.

**Reference:** `Card11_ReadingIconBody`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `icon` | Yes | 22px Lucide, `--textPrimary` |
| `title` | Yes | `heading-sm` |
| `body` | Yes | `body-sm` `color="secondary"`, ≤ 2 lines |

---

### 23. ReadingInlineLongCard

**Purpose:** Reading-task variant with **inline icon + title** in one row, then a long body paragraph below.

**Reference:** `Card12_ReadingInlineLong`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `icon` | Yes | 20px, inline with title |
| `title` | Yes | `heading-sm` |
| `body` | Yes | `body-sm` `color="secondary"`, 3–6 lines |

---

### 24. ReadingTaskListCard

**Purpose:** Reading-task with a **list of sub-items** and a Continue CTA — onboarding tasks, learning checkpoints.

**Reference:** `Card13_ReadingTaskList`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `eyebrow` | Yes | "Reading task" |
| `title` | Yes | `heading-sm` |
| `task-list` | Yes | Vertical list, `gap-12`; each row: 18px Lucide icon `--textPrimary` + label `body-md` `weight="semibold"`; row `gap-12` icon-to-label. |
| `primary-cta` | Yes | `Button variant="secondary" fullWidth` ("Continue") |

---

### 25. ReadingTimedCard

**Purpose:** Reading-task with a leading **time badge** + title + long body — used when the session is timeboxed.

**Reference:** `Card14_ReadingTimed`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `time-badge` | Yes | `align-self: flex-start` |
| `title` | Yes | `heading-sm` |
| `body` | Yes | `body-sm` `color="secondary"`, 4–6 lines |

---

### 26. ReadingMediaMetaCard

**Purpose:** Reading-task / lesson preview with a hero media block, overlay time badge, body, and trailing rating + bookmark.

**Reference:** `Card15_ReadingMediaMeta`

**Shell:** `Card variant="secondary" padding="none"` + `sb-card-clip` (overflow hidden so media corners follow card radius)

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 16:9 wave, full bleed, no inner radius |
| `media-overlay` (`time-badge`) | Yes | Absolutely positioned: `top: 12px; left: 12px;` |
| `title` | Yes | `heading-sm`; lives in the body region (`padding: 20px`) |
| `body` | Yes | `body-sm` `color="secondary"` |
| `meta` | Yes | Duration in `caption` `color="secondary"` |
| `rating` | Yes | 5-star row |
| `secondary-cta` | Yes | `Bookmark` ghost icon button, trailing |

---

### 27. ProfilePostArticleCard

**Purpose:** Article-style post — author header with Follow, then long-form title and body.

**Reference:** `Card16_ProfilePostArticle`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `avatar` | Yes | `Avatar size="lg"` |
| `title` (author) | Yes | `body-md` `weight="semibold"` |
| `meta` | Yes | Handle — `body-sm` `color="secondary"` |
| `primary-cta` | Yes | `Button variant="primary" size="sm"` ("Follow") |
| `title` (article) | Yes | `heading-sm` |
| `body` | Yes | `body-sm` `color="secondary"` |

**Notes:** Card has **two `title` slots** — author name (in the header) and article title (in the body). Document this in code comments.

---

### 28. HeroCenteredCard

**Purpose:** Centred onboarding / empty-state-style card — avatar, headline, body, full-width primary CTA.

**Reference:** `Card17_HeroCentered`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `avatar` | Yes | `Avatar size="xl"` |
| `title` | Yes | `heading-sm` `align="center"` |
| `body` | Yes | `body-sm` `color="secondary"` `align="center"` |
| `primary-cta` | Yes | `Button variant="primary" fullWidth iconRight={<ArrowRight />}` |

---

### 29. InfoViewMoreCard

**Purpose:** Info / lesson summary with a "View more" footer link.

**Reference:** `Card18_InfoViewMore`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | `heading-sm` |
| `body` | Yes | `body-sm` `color="secondary"`, 2 lines |
| `meta` | Yes | Duration — `caption` `color="secondary"` |
| `footer-row` (`view-more`) | Yes | Hairline divider + label `body-md` `weight="semibold"` + `ChevronRight` 20px; full-width `space-between`. |

---

### 30. PricingChooseShareCard

**Purpose:** Pricing card — title, price, primary "Choose" CTA, and a "Share" footer.

**Reference:** `Card19_PricingChooseShare`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | `heading-sm` |
| `meta` | Yes | Price — `body-sm` `color="secondary"` (e.g. `$39 / person`) |
| `primary-cta` | Yes | `Button variant="primary" size="sm"` ("Choose") |
| `footer-row` (`share`) | Yes | Hairline divider + `Share2` 18px + label `body-md`; inline-flex, `gap-8`. |

---

### 31. ListEventRowCard

**Purpose:** Event row for a vertical list — thumbnail, title, body, trailing time, and a footer with members + location.

**Reference:** `Card20_ListEventRow`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 80×80 thumbnail wave; `--radiusInsetMd` |
| `title` | Yes | `heading-sm` |
| `body` | Yes | `body-sm` `color="secondary"`, 2–3 lines |
| `meta` (time) | Yes | `caption` `color="secondary"`, trailing, `white-space: nowrap` |
| `footer-row` (`split-meta`) | Yes | Hairline divider + two items: (`Users` + member count) and (`MapPin` + place); `space-between`, both `body-md` primary. |

**Notes:** This is a documented exception — the body region uses a thumbnail-left + text-right split (similar to §14/§15) because it is a **list row**, not a marketing card.

---

### 32. CoverPlayBottomBarCard

**Purpose:** Full-bleed media cover with a **centred play FAB** and a **bottom caption bar** (course / video preview).

**Reference:** `Card21_CoverPlayBottomBar`

**Shell:** `Card variant="secondary" padding="none"` + `sb-card-clip`

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 16:10 wave, `min-height: 220px`, no radius |
| `play-control` (FAB) | Yes | `Button variant="primary" size="lg" iconOnly iconLeft={<Play />}` centred over media; **override**: fill `--textPrimary`, text `--textStaticLight` (`sb-card-cover-play-fab`); `pointer-events: auto` (parent overlay is `none`). |
| `media-caption-bar` | Yes | Bottom strip: solid `color-mix(in srgb, var(--textPrimary) 72%, transparent)`; padding `16px 20px`; stacks `caption color="static"` (author) above `heading-sm color="static"` (title); `gap-4`. |

---

### 33. CoverAvatarGradientFooterCard

**Purpose:** Full-bleed media cover with a **gradient bottom bar** containing avatar, title stack, and a More button.

**Reference:** `Card22_CoverAvatarGradientFooter`

**Shell:** `Card variant="secondary" padding="none"` + `sb-card-clip`

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 16:10 wave, `min-height: 220px` |
| `media-caption-bar` (gradient) | Yes | `linear-gradient(to top, color-mix(in srgb, var(--textPrimary) 88%, transparent) 0%, transparent 100%)`; padding `16px 20px`. |
| `avatar` | Yes | `Avatar size="lg"` |
| `eyebrow` | Yes | Author — `caption` `color="static"` |
| `title` | Yes | `heading-sm` `color="static"` |
| `meta` | Yes | Duration — `caption` `--textStaticLight` (mix of `--textStaticLight` 78% transparent) |
| `secondary-cta` | Yes | `MoreHorizontal` ghost icon button — color override `--textStaticLight` |

---

### 34. InsetMediaProfileRowCard

**Purpose:** White card with an **inset rounded media block at the top**, then a profile row + More button.

**Reference:** `Card23_InsetMediaProfileRow`

**Shell:** `Card variant="secondary" padding="none"` + `sb-card-clip`

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 16:10 wave, **inset**: `padding: 20px 20px 0` around media wrapper; `--radiusInsetMd` on media |
| `avatar` | Yes | `Avatar size="lg"` |
| `title` | Yes | `body-md` `weight="semibold"` |
| `meta` | Yes | Handle — `body-sm` `color="secondary"` |
| `secondary-cta` | Yes | `MoreHorizontal` ghost icon button |

---

### 35. ReadingGradientFacepileCard

**Purpose:** Reading-task card on a **purple-to-blue gradient surface** — facepile, eyebrow, title, duration, play chip.

**Reference:** `Card24_ReadingGradientFacepile`

**Shell:** `Card variant="secondary" padding="md"` + `sb-card-reading-gradient sb-card-clip`

- **Background:** `linear-gradient(125deg, var(--fillBrand) 0%, var(--textLink) 100%)`
- **Border:** transparent (gradient does the work)
- **Text:** all text uses `color="static"` or the muted alias `color-mix(in srgb, var(--textStaticLight) 78%, transparent)`

| Slot | Required | Notes |
|------|----------|-------|
| `avatar-stack` | Yes | 4 × `Avatar size="md"`; ring color `color-mix(in srgb, var(--textStaticLight) 35%, transparent)` for visibility on gradient |
| `eyebrow` | Yes | "Reading task" — `overline` muted-static |
| `title` | Yes | `heading-md` `color="static"` |
| `meta` | Yes | Duration — `caption` muted-static |
| `play-control` (chip) | Yes | `Button variant="primary" size="sm" iconLeft={<Play />}` ("Play"); chip override: fill `--textPrimary`, text `--textStaticLight`. |

---

### 36. HostSolidLocationCard

**Purpose:** Solid-primary host card — host avatar + name + Host pill, title, location.

**Reference:** `Card25_HostSolidLocation`

**Shell:** `Card variant="secondary" padding="md"` + `sb-card-host-solid`

- **Background:** `--fillBrand` (solid)
- **Border:** transparent
- **All text:** `color="static"`

| Slot | Required | Notes |
|------|----------|-------|
| `avatar` | Yes | `Avatar size="md"` |
| `title` (host) | Yes | Host name — `body-md` `weight="medium" color="static"` |
| `host-pill` | Yes | "Host" — fill `--textStaticLight`, text `--fillBrand`, radius `--radiusFull`, `label-sm` |
| `title` (event) | Yes | `heading-md` `color="static"` |
| `footer-row` (`split-meta`) | Yes | `MapPin` 18px + place name — both static; no top divider on solid surface (gap only). |

---

### 37. HostDenseAudienceCard

**Purpose:** Dense host card — title row with More, audience facepile + count, footer date + play chip.

**Reference:** `Card26_HostDenseAudience`

**Shell:** `Card variant="secondary" padding="md"` + `sb-card-host-solid`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | `heading-md` `color="static"`; same row as `MoreHorizontal` ghost (`color-static`). |
| `secondary-cta` | Yes | `MoreHorizontal` ghost icon button |
| `audience-counter` | Yes | 4 × `Avatar size="xl"` overlapped + 56×56 ringed `<div>` containing `User` 18px + count (e.g. "40.2k") in `label-md`; ring `2px solid --textStaticLight`. |
| `meta` | Yes | "2 hours · October 30, 2023" — `caption`, `color-mix(--textStaticLight 72%, transparent)` |
| `play-control` (chip) | Yes | Same chip override as §35. |

---

### 38. CourseApplyCard

**Purpose:** Course / event signup — time badge, title, duration, full-width Apply.

**Reference:** `Card27_CourseApply`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `time-badge` | Yes | `align-self: flex-start` |
| `title` | Yes | `heading-sm` |
| `meta` | Yes | Duration — `body-sm` `color="secondary"` |
| `primary-cta` | Yes | `Button variant="primary" fullWidth` ("Apply") |

---

### 39. ProfileSheetFollowCard

**Purpose:** Profile sheet / dialog-style card — top dismiss, centred avatar/name/handle, full-width Follow.

**Reference:** `Card28_ProfileSheetFollow`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `dismiss` | Yes | `Button variant="ghost" size="sm" iconOnly iconLeft={<X />}`; row `justify: flex-end`; ghost color `--textSecondary`. |
| `avatar` | Yes | `Avatar size="xl"`, centred |
| `title` | Yes | `heading-sm` `align="center"` |
| `meta` | Yes | Handle — `body-sm` `color="secondary" align="center"` |
| `primary-cta` | Yes | `Button variant="primary" fullWidth` ("Follow") |

---

### 40. CreatorChipCard

**Purpose:** Minimal horizontal "creator chip" — avatar + name + role label. Often used inline within feeds.

**Reference:** `Card29_CreatorChip`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `avatar` | Yes | `Avatar size="md"` |
| `title` | Yes | Name — `body-md` `weight="semibold"` |
| `meta` | Yes | Role label — `body-sm` `color="brand"` (e.g. "Creator") |

**Notes:** Single-row layout; meta uses `color="brand"` instead of `secondary` because the role is the value proposition.

---

### 41. CoursePreviewStackCard

**Purpose:** Course preview — hero media, then left-aligned instructor + course title + duration.

**Reference:** `Card30_CoursePreviewStack`

**Shell:** `Card variant="secondary" padding="none"` + `sb-card-clip`

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 16:9 wave, full bleed |
| `eyebrow` | Yes | Instructor — `caption` `color="secondary"` |
| `title` | Yes | `heading-sm` |
| `meta` | Yes | Duration — `body-sm` `color="secondary"` |

**Notes:** Body region uses `padding: 20px` (`sb-card-reading-body`).

---

### 42. CoursePreviewOverlapCard

**Purpose:** Course preview with an **avatar overlapping the seam** between media and body — centred body content + footer "View contents" link.

**Reference:** `Card31_CoursePreviewOverlap`

**Shell:** `Card variant="secondary" padding="none"` + `sb-card-clip`

| Slot | Required | Notes |
|------|----------|-------|
| `media` | Yes | 16:9 wave |
| `avatar` | Yes | `Avatar size="xl"`; `margin-top: -32px` to overlap; **3px ring** in `--cardFillDefault` to read against media; `border-radius: --radiusFull`. |
| `title` (instructor) | Yes | `body-md` `weight="semibold"` |
| `meta` | Yes | Course title — `body-sm` `color="secondary"` |
| `footer-row` (`view-more`) | Yes | `Button variant="link"` ("View contents"); link override: color `--textSecondary`, no underline; on hover, color `--textPrimary` + underline. Top hairline `--borderSubtle`. |

---

### 43. CoursePreviewTitleFirstCard

**Purpose:** Centred course preview — title above a square media block, then a "View contents" footer.

**Reference:** `Card32_CoursePreviewTitleFirst`

**Shell:** `Card variant="secondary" padding="md"`

| Slot | Required | Notes |
|------|----------|-------|
| `title` | Yes | `heading-sm` `align="center"` |
| `media` | Yes | Square wave, `max-width: 240px`, `aspect-ratio: 1`, `--radiusInsetMd` |
| `footer-row` (`view-more`) | Yes | Same `view-contents` link pattern as §42. |

**Notes:** Body region is centred (`align-items: center`) with `gap-16`.

---

## Shell Selection Guide

> All variants below refer to the **React `variant` prop** — in v2.0.5 the prop name matches the Figma name directly (`"primary"` / `"secondary"`).
> The `padding` prop does **not exist** in v2.0.4. Apply padding via an inner `<div>` wrapper.

| Card Type | Variant on Primary surface | Variant on Secondary surface | Notes |
|-----------|--------------------------|------------------------------|-------|
| §1 PolicyCard | `primary` | `secondary` | — |
| §2 PromoCard | `primary` | `secondary` | Rich variants use gradient overlay — not a card surface |
| §3 AlertCard | Custom (no Card wrapper) | — | Full-width banner with left accent border |
| §4 DecisionCard | `primary` | `secondary` | Coloured top border added via `className` |
| §5 ServiceTile | `primary` | `secondary` | — |
| §6 NetworkCard | `secondary` | `secondary` | Selection ring via `box-shadow: 0 0 0 2px var(--cardBorderBrand)` |
| §7 StatusCard | `primary` | `secondary` | — |
| §8 CommerceCard | `secondary` | `secondary` | — |
| §9 ContentCard | `primary` | `secondary` | — |
| §10 PlanRadioCard | Custom radio card item (not `Card` component — see §10) | — | Idle border: `1px var(--cardBorderDefault)`; selected: `2px var(--cardBorderBrand)` |
| §11 AddOnCheckboxCard | Custom addon card (not `Card` component — see §11) | — | 2px border idle/selected; strip uses muted tint |
| §12–§43 Storybook cards | `primary` on Primary surface | `secondary` on Secondary surface | Follow surface pairing rule from Part 1 |

---

## Token Quick Reference

> Always use these token names — **never** use `--color*` prefixed aliases; they do not exist in v2.0.3.

### Card and surface tokens

| Token | Use |
|-------|-----|
| `--cardFillDefault` | Card fill — Primary + Secondary (`@acko/card` primary and secondary share this token) |
| `--cardFillHighlight` | **Not for `@acko/card`.** Inputs / custom elevated surfaces only |
| `--cardFillDisable` | Card fill — Muted |
| `--cardFillGhost` | Card fill — Ghost (transparent) |
| `--cardFillHover` | Card fill — active/pressed state |
| `--cardBorderDefault` | Border — Primary + Secondary (`#b7b7b8` light / `#1e1e1f` dark) |
| `--cardBorderDisable` | Border — Muted |
| `--cardBorderBrand` | Selection ring (via `box-shadow`, not `border`) |
| `--borderHairline` | Border width (1px / 0.5px retina) |
| `--shadowXs` | Primary **card** elevation; page **secondary** surface elevation |
| `--surfaceBase` | Page **primary** surface — flat `--surfaceBase` only |
| `--surfacePrimaryBg` | `<Surface variant="primary">` — not page `--surfaceBase` |
| `--surfaceSecondaryBg` | Page **secondary** bands **and** `<Surface variant="secondary">` — pair with `--shadowXs` on page bands |
| `--surfaceRaised` | Interactive shells only (tabs, toggles) — **not** page Secondary surface |
| `--surfaceAccent` | Brand surface fill |
| `--surfaceAccentLight` | Brand Light surface fill |
| `--surfaceStaticBlack` | Static black surface fill |
| `--surfaceStaticWhite` | Static white surface fill |
| `--surfaceInverted` | Inverted surface fill |
| `--surfaceMuted` | Muted overlay tint |
| `--inputFieldFill` | Search-trigger fill (§13) |
| `--inputFieldBorder` | Search-trigger stroke (§13) |
| `--brandPrimary` | Brand primary colour (buttons, links, gradient stop) |
| `--brandSubtle` | Brand subtle tint (hero gradient, icon bg tint) |
| `--textPrimary` | Primary text |
| `--textSecondary` | Secondary / supporting text |
| `--textBrand` | Brand-coloured text (links, active labels) |
| `--textStaticLight` | Fixed white text on dark/gradient/solid surfaces |
| `--statusWarningBase` | Filled stars in `rating` slot |
| `--borderSoft` | Hairline dividers, empty stars in `rating` slot |

### Spacing in cards (1px-base, per `scales.md`)

`@acko/tokens` ships `--spacing: 0.0625rem`, so utility numbers equal pixel values.

| Utility | Pixels | Use |
|---------|--------|-----|
| `gap-4` | 4px | Caption-bar inner stack (§32, §33) |
| `gap-8` | 8px | Icon-to-text, tight rows, stat-cell stacks |
| `gap-12` | 12px | Reading-stack default, footer-row gaps, list rows |
| `gap-16` | 16px | Internal section gaps, `sb-card-split` gap |
| `gap-20` | 20px | Card padding `md` (default), reading-body padding |
| `gap-24` | 24px | Card padding `lg`, gallery grid gap |

**Card padding scale:** `sm` 12px, `md` 20px, `lg` 24px (Part 1).

### Border radius

| Token | Value | Use |
|-------|-------|-----|
| `--radiusSm` | 4px | `time-badge` |
| `--radiusLg` | 8px | Provider thumbnails |
| `--radius2xl` | 12px | AlertCard, inline notices |
| `--radiusInsetSm` | 8px | Small thumbs in `padding="sm"` cards (§19) |
| `--radiusInsetMd` | 4px | Inset media in `padding="md"` cards (§14, §15, §31, §43) |
| `--radius4xl` | 20px | All card containers |
| `--radiusFull` | 9999px | Badges, pills, search-trigger, host-pill, audience ring |

### Shadows

| Token | Use |
|-------|-----|
| `--shadowCard` | Elevated card shell |
| `--shadowSubtle` | Small internal raised elements |

### Wave / placeholder gradient (Storybook media)

```css
background: linear-gradient(
  125deg,
  var(--fillBrandSubtle) 0%,
  var(--textLink) 45%,
  var(--fillBrand) 100%
);
```

Used for `media` slots in §12, §14, §15, §19, §26, §31–§34, §41–§43. Replace with real imagery in production; gradient is a placeholder.

---

## Rules for LLM Card Generation

1. **Match type first** — identify which of the **43** types the card is. Closest type wins; extend minimally. If nothing fits, **stop and ask** — do not invent a new shape.
2. **Only use defined slots** — do not invent new structural regions. The Slot Vocabulary is the contract.
3. **One primary CTA per card** — never two primary buttons in the same card.
4. **Tokens only** — never write a raw hex, rem, or px value for color or spacing. Spacing utilities are 1px-base (`gap-12` = 12px); see `scales.md`.
5. **Typography via component** — always use `Typography` with a named variant; never `<h*>`, `<p>`, or inline `font-*` styles.
6. **Badge for status** — any state label uses `Badge`, not custom text.
7. **No decorative borders inside default cards** — use `Separator` only for genuine content divisions.
8. **Card width is always contextual** — cards never define their own `width`. Parent layout controls it.
9. **Dark theme is inherited** — do not write per-card dark-theme overrides. Semantic tokens handle it.
10. **Media must have a fallback** — if a `media` slot image fails, the card must still be usable.
11. **No CTA inside fully-interactive cards** — when the entire card is a tap target, do not nest `Button` or any interactive component inside it. **Documented exceptions:** §10 PlanRadioCard ("More details" link with `stopPropagation`), §11 AddOnCheckboxCard (nested `Checkbox` with `stopPropagation`).
12. **Selection state lives on the card shell** — variant change + visible border treatment (`box-shadow: 0 0 0 2px var(--cardBorderBrand)`, **or** §10's 1→2px border, **or** §11's 2px primary border). Never use a `Badge` or internal element to indicate selection.
13. **Title and body stack vertically by default** — never default to title-left / subtext-right in one row. **Documented split-row exceptions:** §12 (title + facepile), §14 / §15 (text + thumbnail), §31 (list-event row), §37 (title + More button).
14. **Title-reference badges stay above the title** (top-edge overlap allowed). Align primary CTAs across cards in a grid to the same vertical position.
15. **Cover and gradient surfaces use static text** — on `media-caption-bar`, `sb-card-host-solid`, and `sb-card-reading-gradient` surfaces, all text uses `Typography color="static"` (or the muted-static `color-mix` alias). Never rely on `--textPrimary` over dark/gradient fills.
16. **Reference the Storybook function** — when implementing §12–§43, link the source function (e.g. `Card01_CreatorList`) in the component file's top comment so the canonical layout is one click away.

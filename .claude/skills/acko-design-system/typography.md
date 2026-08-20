---
description: Typography — font family, type scale tokens, weight rules, sizing, and the <Typography> component API
globs: "**/*.css,**/*.tsx"
alwaysApply: true
---

# Typography

Token definitions, component API, and usage rules for all text in ACKO products.

## Rule — Never Use Raw HTML Text Tags

Never use `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<p>`, `<span>`, `<label>` for text rendering. Always use `<Typography variant="...">` from `@acko/typography`.

```tsx
// ❌ Never do this
<h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700 }}>
  Car insurance that protects you
</h1>

// ✅ Always do this
<Typography variant="display-lg" weight="bold">
  Car insurance that protects you
</Typography>
```

## Import

```tsx
import { Typography } from "@acko/typography";
```

## Props

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `variant` | `TypographyVariant` | ✅ Yes | Always required |
| `weight` | `TypographyWeight` | No | Only override when needed |
| `color` | `TypographyColor` | No | Use instead of inline color styles |
| `align` | `TypographyAlign` | No | Use instead of inline `textAlign` |
| `as` | `React.ElementType` | No | Override the rendered HTML tag |
| `truncate` | `boolean` | No | Single-line truncation with ellipsis |
| `className` | `string` | No | For Tailwind utility classes only |

## Font Family

**Euclid Circular B** — all text across the system.

```css
font-family: 'Euclid Circular B', -apple-system, BlinkMacSystemFont, sans-serif;
```

CDN base: `https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/Euclid%20Font/`

Weights: Light (300), Regular (400), Medium (500), Semibold (600), Bold (700).

## Type Scale

Each level is expressed as 4 sub-tokens in `tokens.css`:

- `--font-{level}-size` — font-size
- `--font-{level}-line` — line-height
- `--font-{level}-spacing` — letter-spacing
- `--font-{level}-weight` — font-weight

### Display (marketing, heroes)

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `--fontDisplayXl-*` | 72px | 80px | -2px | Bold 700 |
| `--fontDisplayLg-*` | 56px | 64px | -1.5px | Bold 700 |
| `--fontDisplayMd-*` | 48px | 56px | -1px | Bold 700 |
| `--fontDisplaySm-*` | 40px | 48px | -0.5px | Semibold 600 |

### Heading (UI sections)

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `--fontHeadingXl-*` | 32px | 40px | -0.5px | Semibold 600 |
| `--fontHeadingLg-*` | 24px | 32px | -0.3px | Semibold 600 |
| `--fontHeadingMd-*` | 20px | 28px | -0.2px | Semibold 600 |
| `--fontHeadingSm-*` | 18px | 24px | 0px | Semibold 600 |

### Body (content)

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `--fontBodyLg-*` | 18px | 28px | 0px | Regular 400 |
| `--fontBodyMd-*` | 16px | 24px | 0px | Regular 400 |
| `--fontBodySm-*` | 14px | 20px | 0px | Regular 400 |

### Labels & Utility

| Level | Size | Line Height | Letter Spacing | Weight |
|-------|------|-------------|----------------|--------|
| `--fontLabelLg-*` | 14px | 20px | 0.1px | Medium 500 |
| `--fontLabelMd-*` | 12px | 16px | 0.2px | Medium 500 |
| `--fontLabelSm-*` | 11px | 14px | 0.3px | Medium 500 |
| `--fontCaption-*` | 12px | 16px | 0px | Regular 400 |
| `--fontOverline-*` | 11px | 16px | 0.5px | Semibold 600 |

### Example usage in CSS

```css
.my-heading {
  font-size: var(--fontHeadingLgSize);
  line-height: var(--fontHeadingLgLine);
  letter-spacing: var(--fontHeadingLgSpacing);
  font-weight: var(--fontHeadingLgWeight);
}
```

## Tailwind Mapping

| Token | Tailwind equivalent |
|-------|-------------------|
| 11px | `text-[11px]` |
| 12px / `--fontCaptionSize` | `text-xs` |
| 14px / `--fontBodySmSize` | `text-sm` |
| 16px / `--fontBodyMdSize` | `text-base` |
| 18px / `--fontBodyLgSize` | `text-lg` |
| 20px / `--fontHeadingMdSize` | `text-xl` |
| 24px / `--fontHeadingLgSize` | `text-2xl` |
| Weight 400 | `font-normal` |
| Weight 500 | `font-medium` |
| Weight 600 | `font-semibold` |
| Weight 700 | `font-bold` |

## Button Font Sizes (Intentionally Hardcoded)

Buttons use their own scale — not body tokens:

| Size | Font | Tailwind |
|------|------|----------|
| xs | 12px | `text-xs` |
| sm | 14px | `text-sm` |
| md | 16px | `text-base` |
| lg | 18px | `text-lg` |
| xl | 20px | `text-xl` |

## Variants — Component Usage

### Display (hero headings, marketing headlines)
```tsx
<Typography variant="display-xl">Largest hero heading</Typography>
<Typography variant="display-lg">Primary hero heading</Typography>
<Typography variant="display-md">Secondary hero heading</Typography>
<Typography variant="display-sm">Smaller hero heading</Typography>
```

### Heading (section titles, card titles)
```tsx
<Typography variant="heading-xl">Page section title</Typography>
<Typography variant="heading-lg">Sub-section title</Typography>
<Typography variant="heading-md">Card title</Typography>
<Typography variant="heading-sm">Small card title or step title</Typography>
```

### Body (paragraphs, descriptions)
```tsx
<Typography variant="body-lg">Lead paragraph or subtitle</Typography>
<Typography variant="body-md">Default body text</Typography>
<Typography variant="body-sm">Supporting text, descriptions</Typography>
```

### Label (form labels, UI labels)
```tsx
<Typography variant="label-lg">Large form label</Typography>
<Typography variant="label-md">Default form label</Typography>
<Typography variant="label-sm">Small form label</Typography>
```

### Utility
```tsx
<Typography variant="caption">Fine print, timestamps, metadata</Typography>
<Typography variant="overline">Eyebrow text above headings</Typography>
```

## Weight Values

```tsx
weight="regular"   // default body text
weight="medium"    // slightly emphasised
weight="semibold"  // section titles, card titles
weight="bold"      // hero headings, CTAs
```

## Color Values

The `color` prop uses 7 intent-based values, each mapping 1:1 to a semantic text token:

| Value | Token | Use case |
|-------|-------|----------|
| `primary` (default) | `--textPrimary` | General use — headings, values, main content |
| `secondary` | `--textSecondary` | Subtext — captions, helpers, descriptions |
| `invert` | `--textInvert` | Text on dark/filled surfaces (opposite of current theme) |
| `brand` | `--textBrand` | Brand-colored text — links, emphasis |
| `error` | `--statusErrorText` | Error messages |
| `success` | `--statusSuccessText` | Success messages |
| `static` | `--textStaticLight` | Fixed color across themes — white in both light and dark |

All tokens except `static` auto-adapt across light and dark themes. `static` produces an identical color (`--solidGreyWhite`) in both themes — use it for text that must remain fixed regardless of theme (e.g., white text on a photo overlay).

## Common Patterns

### Hero section heading + subtext
```tsx
<Typography variant="display-lg" weight="bold">
  Car insurance that protects you, not just your car
</Typography>
<Typography variant="body-lg" color="secondary">
  Get comprehensive cover starting at ₹2,094/year.
</Typography>
```

### Section title + supporting text
```tsx
<Typography variant="heading-xl" weight="bold">
  Why ACKO is different
</Typography>
<Typography variant="body-lg" color="secondary">
  Built from scratch as a digital insurer.
</Typography>
```

### Card title + description
```tsx
<Typography variant="heading-md" weight="semibold">
  Instant digital policy
</Typography>
<Typography variant="body-sm" color="secondary">
  Buy in 2 minutes flat. No paperwork.
</Typography>
```

### Form label
```tsx
<Typography variant="label-md" weight="medium">
  Car Registration Number
</Typography>
```

### Eyebrow + headline
```tsx
<Typography variant="overline" color="brand">
  Trusted by 50 lakh+ car owners
</Typography>
<Typography variant="display-md" weight="bold">
  Insurance built for people who hate insurance
</Typography>
```

### Caption / fine print
```tsx
<Typography variant="caption" color="secondary">
  IRDAI Licence No. 157 · No spam. No follow-up calls.
</Typography>
```

## Rules

- Minimum 14px for body text, 12px for labels, 11px absolute minimum
- Medium (500) for emphasis in body — not Bold
- Semibold (600) for headings, Bold (700) only for display
- Tighter letter-spacing for large text, looser for small text
- Use `text-wrap: balance` on headings
- `font-variant-numeric: tabular-nums` for dynamic numbers
- **Never hardcode** `fontSize`, `fontWeight`, `lineHeight`, or `letterSpacing` in inline styles
- **Never use** `clamp()` for font sizing — the variant handles responsive sizing automatically
- **Never use** `color` in inline styles for text — use the `color` prop instead
- **Always pick** the closest variant to your intent — do not approximate with raw styles
- **Use `as` prop** when semantic HTML matters but visual style differs:

```tsx
// Renders as <h1> but styled as heading-md
<Typography variant="heading-md" as="h1" weight="bold">
  Page Title
</Typography>
```

Typography tokens are **theme-agnostic** — they do not change between themes.

## Rendering Rules

```css
body {
  font-family: 'Euclid Circular B', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; }
```

- One `h1` per screen
- Never rely on color alone for hierarchy — size and weight first
- Never change font weight on hover (causes layout shift)

## Font Loading

Preload critical fonts. Use `font-display: swap`.

```html
<link rel="preload" href="/fonts/EuclidCircularB-Regular.otf" as="font" type="font/opentype" crossorigin />
```

## Text Casing

All UI text must follow **sentence case** — capitalize only the first word and proper nouns/exceptions. This applies across the entire system: headings, buttons, labels, tabs, breadcrumbs, navigation items, links, and toast actions.

> Capitalize only the first word of a text label. All other words are lowercase unless they are proper nouns or fall under the exceptions below.

### Examples

**Correct**

- `Get a quote`
- `View my policy`
- `Continue to payment`
- `Check IDV`
- `Claim your NCB`
- `Pay with ACKO Drive`
- `Find clinics near Bengaluru`

**Incorrect**

- `Get A Quote`
- `View My Policy`
- `Continue To Payment`
- `Check Idv`
- `Claim Your NCB`
- `find clinics near bengaluru`

### Exceptions

These terms always retain their defined casing regardless of position in the label.

#### Brand names

- `ACKO` — always all-caps
- `ACKO [Product]` — sub-brands retain their casing (e.g., `ACKO Drive`, `ACKO Clinic`)

#### Proper nouns

City names, state names, country names, and person names retain their standard capitalization. Sentence case applies to common nouns and verbs — not proper nouns.

- `Check plans in Hyderabad` — correct
- `Check plans in hyderabad` — incorrect
- `Aadhaar` — always capitalized as a proper noun (not `AADHAAR` or `aadhaar`)

#### Regulatory & government bodies

- `IRDAI` — Insurance Regulatory and Development Authority of India

#### Insurance & financial acronyms

- `IDV` — Insured Declared Value
- `NCB` — No Claim Bonus
- `KYC` — Know Your Customer
- `GST` — Goods and Services Tax
- `EMI` — Equated Monthly Instalment
- `OTP` — One Time Password

#### Identity & document acronyms

- `PAN` — Permanent Account Number

### All-caps emphasis

Words like `FREE`, `NEW`, `SAVE` must remain lowercase in button, label, and navigation text. All-caps emphasis belongs in the `<Badge>` component (which defaults to `textCase="uppercase"`) — not in text labels.

- `Get a free quote` — correct (button)
- `Get a FREE quote` — incorrect (button)
- `FREE` — correct (inside a `<Badge>`)

### Common nouns

Product and coverage terms like `premium`, `claim`, `policy`, `cover` are common nouns — always lowercase unless they start the sentence.

### Where this applies

| Component | Applies? |
|-----------|----------|
| Button labels | Yes |
| Tab labels | Yes |
| Breadcrumb text | Yes |
| Navigation items | Yes |
| Link text | Yes |
| Toast action labels | Yes |
| Dialog action buttons | Yes |
| Headings | Yes |
| Badge | No — Badge has its own `textCase` prop (`uppercase` or `sentence`, default: `uppercase`). See `badge.react.mdc` → **Text Case Selection** for the decision table. |

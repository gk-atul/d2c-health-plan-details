# ACKO Umbrella DS — Semantics

> **Layer 5 of 6.** The role/theme layer. Every color on every canvas layer must trace back here. Modes: **Light | Dark**. Aliases Brand (for brand-tinted roles) or Primitives (for neutrals).

**Source of truth:** `@acko/tokens@2.0.3` → `tokens.css` under `[data-theme="light"]` / `[data-theme="dark"]`.

---

## Key rule

**One alias per token, no raw values.** A semantic token holds either a Brand alias or a Primitives alias — never an RGB literal. Components alias Semantics; they never skip to Brand or Primitives directly.

**Legacy `--color*` tokens are removed in v2.0.3.** Use the camelCase semantic names below (e.g. `--textPrimary`, not `--colorTextPrimary`).

```
Figma path          CSS var              Example alias chain
text/primary    →   --textPrimary    →   --solidGrey750 (light)
fill/brand      →   --fillBrand      →   --brandPrimary → --solidPrimary600
surface/base    →   --surfaceBase    →   --solidGrey100 (light)
```

---

## text/

Use for all `TEXT_FILL` properties.

| Figma | CSS var | Light | Dark | When to use |
|---|---|---|---|---|
| `text/primary` | `--textPrimary` | `solidGrey750` | `solidGrey100` | Default body copy, headings, input values |
| `text/secondary` | `--textSecondary` | `solidGrey500` | `solidGrey250` | Supporting text, labels, captions |
| `text/tertiary` | `--textTertiary` | `solidGrey400` | `solidGrey350` | Timestamps, helper text, subtle metadata |
| `text/muted` | `--textMuted` | `solidGrey450` | `solidGrey450` | De-emphasised labels, placeholders |
| `text/disabled` | `--textDisabled` | `solidGrey300` | `solidGrey500` | All text inside a disabled state |
| `text/invert` | `--textInvert` | `solidGrey100` | `solidGrey750` | Text on dark/filled surfaces |
| `text/brand` | `--textBrand` | `brandText` | `solidPrimary500` | Brand-coloured text (links, active labels) |
| `text/brandStrong` | `--textBrandStrong` | `solidPrimary700` | `solidPrimary400` | Stronger brand emphasis |
| `text/onBrand` | `--textOnBrand` | `brandOnPrimary` | `solidGreyWhite` | Text placed directly on a brand-fill surface |
| `text/link` | `--textLink` | `solidBlue600` | `solidBlue500` | Hyperlinks |
| `text/staticLight` | `--textStaticLight` | `solidGreyWhite` | `solidGreyWhite` | Always light regardless of theme |
| `text/staticDark` | `--textStaticDark` | `solidGrey800` | `solidGrey800` | Always dark regardless of theme |

**Typography `color` prop mapping:** `primary` → `--textPrimary` · `secondary` → `--textSecondary` · `invert` → `--textInvert` · `brand` → `--textBrand` · `error` → `--statusErrorText` · `success` → `--statusSuccessText` · `static` → `--textStaticLight`

---

## surface/

Use for `FRAME_FILL` and `SHAPE_FILL` on containers, cards, sheets.

| Figma | CSS var | Light | Dark | When to use |
|---|---|---|---|---|
| `surface/base` | `--surfaceBase` | `solidGrey100` | `solidGrey750` | Page / screen background — Primary page surface (flat) |
| `surface/raised` | `--surfaceRaised` | `solidGrey100` | `solidGrey700` | Interactive shells (tabs, toggles) — **not** page Secondary surface and **not** `<Surface variant="secondary">` |
| `surface/raisedHover` | `--surfaceRaisedHover` | `solidGrey200` | `solidGrey650` | Raised shell hover |
| `surface/raisedActive` | `--surfaceRaisedActive` | `solidGrey300` | `solidGrey600` | Raised shell pressed |
| `surface/muted` | `--surfaceMuted` | `alphaGreyA50` | `alphaGreyA700` | Muted background (sidebars, wells) |
| `surface/inverted` | `--surfaceInverted` | `solidGrey650` | `solidGrey150` | Dark surface in light mode (and vice-versa) |
| `surface/overlay` | `--surfaceOverlay` | `alphaGreyA400` | `alphaGreyA500` | Modal scrim / backdrop |
| `surface/staticBlack` | `--surfaceStaticBlack` | `solidGrey700` | `solidGrey700` | Always black surface |
| `surface/staticWhite` | `--surfaceStaticWhite` | `solidGrey150` | `solidGrey150` | Always white surface |
| `surface/brand` | `--surfaceBrand` | `brandPrimary` | `brandPrimary` | Brand-coloured surface |
| `surface/brandLight` | `--surfaceBrandLight` | `brandSubtleActive` | `alphaGreyA400` | Lighter brand-tinted surface |

---

## surface/fill/ — interactive fills

| Figma | CSS var | Light | Dark | When to use |
|---|---|---|---|---|
| `surface/fill/default` | `--surfaceFillDefault` | `solidGrey50` | `solidGrey650` | Default interactive fill |
| `surface/fill/highlight` | `--surfaceFillHighlight` | `solidGreyWhite` | `solidGrey600` | Elevated surfaces, inputs — **not** `@acko/card` primary/secondary fill |
| `surface/fill/hover` | `--surfaceFillHover` | `alphaGreyA50` | `solidGrey100` | Hover state |
| `surface/fill/active` | `--surfaceFillActive` | `solidGrey200` | `solidGrey550` | Pressed/active state |
| `surface/fill/muted` | `--surfaceFillMuted` | `solidGrey100` | `solidGrey600` | Muted background (progress track, skeleton) |
| `surface/fill/ghost` | `--surfaceFillGhost` | `transparent` | `transparent` | Ghost / transparent interactive element |
| `surface/fill/subtle` | `--surfaceFillSubtle` | `solidGrey150` | `solidGrey650` | Very light tint / demoted containers |
| `surface/fill/input` | `--surfaceFillInput` | `solidGreyWhite` | `solidGrey800` | Text input background |
| `surface/fill/inputFocus` | `--surfaceFillInputFocus` | `brandSubtleHover` | `brandSubtleHover` | Text input focused background |
| `surface/fill/inverted` | `--surfaceFillInverted` | `solidGrey700` | `solidGrey150` | Inverted interactive fill |
| `surface/fill/danger` | `--surfaceFillDanger` | `alphaRedA100` | `alphaRedA200` | Error / destructive fill |
| `surface/fill/disable` | `--surfaceFillDisable` | `alphaGreyA50` | `alphaWhiteA50` | Disabled interactive element fill |
| `surface/fill/staticWhite` | `--surfaceFillStaticWhite` | `solidGrey150` | `solidGrey150` | Always-white fill |
| `surface/fill/staticBlack` | `--surfaceFillStaticBlack` | `solidGrey700` | `solidGrey700` | Always-black fill |

---

## fill/ — brand-interactive fills

Use for buttons, toggles, checkboxes, selectors.

| Figma | CSS var | Light | Dark | When to use |
|---|---|---|---|---|
| `fill/brand` | `--fillBrand` | `brandPrimary` | `brandPrimary` | Primary interactive fill |
| `fill/brandHover` | `--fillBrandHover` | `brandHover` | `brandHover` | Brand fill hover |
| `fill/brandActive` | `--fillBrandActive` | `brandActive` | `brandActive` | Brand fill pressed |
| `fill/brandSubtle` | `--fillBrandSubtle` | `brandSubtle` | `brandSubtle` | Light brand tint (secondary button bg) |
| `fill/SubtleHover` | `--fillSubtleHover` | `brandSubtleHover` | `brandSubtleHover` | Subtle brand fill hover |
| `fill/SubtleActive` | `--fillSubtleActive` | `brandSubtleActive` | `brandSubtleActive` | Subtle brand fill pressed |
| `fill/brandDisabled` | `--fillBrandDisabled` | `brandDisable` | `brandDisable` | Disabled brand fill |

**Brand layer (Layer 4):**

| Figma | CSS var | Value |
|---|---|---|
| `Solid/primary` | `--brandPrimary` | `solidPrimary600` |
| `Solid/hover` | `--brandHover` | `solidPrimary700` |
| `Solid/active` | `--brandActive` | `solidPrimary800` |
| `Solid/disable` | `--brandDisable` | `solidPrimary400` |
| `Solid/subtle` | `--brandSubtle` | `solidPrimary100` |
| `Solid/ring` | `--brandRing` | `solidPrimary200` |
| `Solid/onPrimary` | `--brandOnPrimary` | `solidGreyWhite` |
| `Solid/text` | `--brandText` | `solidPrimary600` |

AckoDrive override: `[data-brand="ackodrive"]` swaps brand to `solidSecondary*`.

---

## border/

Use for `STROKE_COLOR`.

| Figma | CSS var | Light | Dark | When to use |
|---|---|---|---|---|
| `border/soft` | `--borderSoft` | `alphaGreyA50` | `alphaWhiteA50` | Dividers, hairline separators |
| `border/subtle` | `--borderSubtle` | `solidGrey200` | `solidGrey650` | Very light borders |
| `border/medium` | `--borderMedium` | `alphaGreyA100` | `alphaWhiteA100` | Default component border |
| `border/strong` | `--borderStrong` | `alphaGreyA150` | `alphaWhiteA150` | Emphasis border |
| `border/default` | `--borderDefault` | `solidGrey300` | `solidGrey600` | Card / input default border |
| `border/brand` | `--borderBrand` | `solidPrimary500` | `solidPrimary600` | Brand-coloured border |
| `border/selected` | `--borderSelected` | `alphaGreyA300` | `alphaWhiteA200` | Selected/active border |
| `border/focus` | `--borderFocus` | `alphaPrimaryA700` | `alphaPrimaryA600` | Keyboard focus ring |
| `border/error` | `--borderError` | `alphaRedA500` | `alphaRedA500` | Error state border |
| `border/divider` | `--borderDivider` | `solidGrey200` | `solidGrey700` | Explicit divider lines |
| `border/control` | `--borderControl` | `solidGrey150` | `solidGrey700` | Form control default |
| `border/controlHover` | `--borderControlHover` | `solidGrey200` | `solidGrey600` | Form control hover/filled |

**Focus states:** use `box-shadow: 0 0 0 3px var(--borderFocus)` — never `outline:` or legacy `--shadowFocusRing`.

---

## disabled/

| Figma | CSS var | Light | Dark |
|---|---|---|---|
| `disabled/bg` | `--disabledBg` | `solidGrey150` | `solidGrey600` |
| `disabled/border` | `--disabledBorder` | `alphaGreyA200` | `solidGrey600` |
| `disabled/text` | `--disabledText` | `solidGrey350` | `solidGrey450` |
| `disabled/colourOnDisabled` | `--disabledColourOnDisabled` | `solidGrey300` | `alphaWhiteA200` |
| `disabled/IconOnDisabled` | `--disabledIconOnDisabled` | `solidGreyWhite` | `alphaWhiteA200` |

---

## status/

Four families: `error`, `success`, `warning`, `info`. Each has the same leaves:

| Leaf | CSS var suffix | Light example | Dark example |
|---|---|---|---|
| `base` | `--status{Family}Base` | `solidRed500` | `solidRed600` |
| `text` | `--status{Family}Text` | `solidRed700` | `solidRed400` |
| `subtle` | `--status{Family}Subtle` | `solidRed100` | `solidRed900` |
| `border` | `--status{Family}Border` | `solidRed300` | `solidRed800` |
| `hover` | `--status{Family}Hover` | varies | varies |
| `badgeBg` | `--status{Family}BadgeBg` | varies | varies |
| `gradientFrom` | `--status{Family}GradientFrom` | error only | error only |
| `gradientTo` | `--status{Family}GradientTo` | error only | error only |

**Warning uses Orange** (`solidOrange*`), not Amber or Yellow.

**Info uses Primary/Purple** (`solidPrimary*`), not Blue.

---

## accent/

For hue-coded components (badges, chips, counters, tags).

```
accent/{hue}/surface      → --accent{Hue}Surface
accent/{hue}/surfaceAlt   → --accent{Hue}SurfaceAlt
accent/{hue}/content      → --accent{Hue}Content
accent/{hue}/border       → --accent{Hue}Border
accent/{hue}/strong       → --accent{Hue}Strong   (purple, blue, pink only)
```

**Available hues:** `purple`, `green`, `blue`, `orange`, `pink`, `gray`, `black`

Green accent uses **Lime** primitives (`solidLime*`) for surfaces; content maps to `solidSecondary*`.

---

## How to pick the right semantic token

```
Is it text?           → text/*
Is it a surface?      → surface/* or surface/fill/*
Is it a brand action? → fill/brand*
Is it a border?       → border/*
Is it status-driven?  → status/{error|success|warning|info}/*
Is it hue-coded?      → accent/{hue}/*
Is it disabled?       → disabled/*
```

---

## Adding a new semantic token

1. Identify the role (text, fill, border, surface, status, accent).
2. Name it `{role}/{camelCasePurpose}` — no raw color words in the name (no "purple", "dark", "500").
3. Alias it to `Brand/*` (for brand-tinted) or `solid*` / `alpha*` primitives (for neutrals).
4. Set both Light and Dark mode values in `tokens.css`.
5. Set scope: `TEXT_FILL` for text, `FRAME_FILL + SHAPE_FILL` for surfaces, `STROKE_COLOR` for borders.

---

## Legacy → new migration (removed in v2.0.3)

| Old (removed) | New |
|---|---|
| `--colorPrimary` | `--fillBrand` |
| `--colorPrimaryHover` | `--fillBrandHover` |
| `--colorPrimarySubtle` | `--fillBrandSubtle` |
| `--colorPrimaryRing` | `--brandRing` |
| `--colorOnPrimary` | `--textOnBrand` |
| `--colorSurface` | `--surfaceBase` |
| `--colorTextPrimary` | `--textPrimary` |
| `--colorTextSecondary` | `--textSecondary` |
| `--colorTextStatic` | `--textStaticLight` |
| `--colorBorder` | `--borderDefault` |
| `--colorBorderSubtle` | `--borderSubtle` |
| `--colorInputBg` | `--inputFieldFill` (component token) |
| `--colorCardBg` | `--cardFillDefault` (component token) |
| `--colorErrorText` | `--statusErrorText` |
| `--colorSuccessText` | `--statusSuccessText` |
| `--colorWarningText` | `--statusWarningText` |
| `--greyWhite` | `--solidGreyWhite` |
| `--purple600` | `--solidPrimary600` |

Per-component token mappings → see `components.md`.

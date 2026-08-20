# ACKO Umbrella DS — Primitives

> **Layer 1 of 6.** Raw values only. Never reference Primitives directly from a component or semantic token — always go through Brand (for brand-tinted roles) or Semantics (for neutrals).

**Source of truth:** `@acko/tokens@2.0.3` → `tokens.css` (Figma: *Umbrella DS V1.0 / UM Variable Test*).

---

## What lives here

| Group | Figma path | CSS prefix | Purpose |
|---|---|---|---|
| Solid colors | `Color/Grey/*`, `Color/Purple/*`, … | `--solid{Hue}{step}` | Every hue ramp (50–950) + white/black |
| Accent solids | `Color/Solid/{Hue}/*` | `--solid{Hue}{step}` | Blue, Cyan, Teal, Pink, Orange, Lime, Indigo |
| Alpha | `Color/Alpha/{Hue}A/*` | `--alpha{Hue}A{step}` | Transparency scales |
| Border widths | `border/*` | `--border{Width}` | Raw stroke widths |
| Elevation | `elevation/*` | `--elevationE{n}` | Raw shadow definitions |

---

## Naming convention

```
Figma:  Color/{Hue}/{step}     →  CSS: --solid{Hue}{step}
Figma:  Color/Alpha/{Hue}A/50 →  CSS: --alpha{Hue}A50

Examples:
  Color/Grey/50      → --solidGrey50
  Color/Purple/600   → --solidPrimary600   (brand primary palette)
  Color/Green/600    → --solidSecondary600 (brand secondary / AckoDrive)
  Color/Alpha/GreyA/500 → --alphaGreyA500
```

**Available main hues:** Grey, Purple (Primary), Green (Secondary), Red, Amber, Yellow

**Available accent solids:** Blue, Cyan, Teal, Pink, Orange, Lime, Indigo

**Step scale:** `50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950`

Special:
- `Color/Grey/White` → `--solidGreyWhite` (`#ffffff`)
- `Color/Grey/Black` → `--solidGreyBlack` / `--solidGrey900` (`#000000`)

---

## Grey (Color/Grey) — Figma exact values

| Figma | CSS var | Hex |
|---|---|---|
| White | `--solidGreyWhite` | `#ffffff` |
| 50 | `--solidGrey50` | `#fafafa` |
| 100 | `--solidGrey100` | `#f5f5f5` |
| 150 | `--solidGrey150` | `#efeff0` |
| 200 | `--solidGrey200` | `#dcdcdc` |
| 250 | `--solidGrey250` | `#cccbcd` |
| 300 | `--solidGrey300` | `#b7b7b8` |
| 350 | `--solidGrey350` | `#8f8e92` |
| 400 | `--solidGrey400` | `#7a787d` |
| 450 | `--solidGrey450` | `#605f63` |
| 500 | `--solidGrey500` | `#474649` |
| 550 | `--solidGrey550` | `#292829` |
| 600 | `--solidGrey600` | `#1e1e1f` |
| 650 | `--solidGrey650` | `#19191a` |
| 700 | `--solidGrey700` | `#141414` |
| 750 | `--solidGrey750` | `#0f0f10` |
| 800 | `--solidGrey800` | `#0a0a0a` |
| 850 | `--solidGrey850` | `#050505` |
| 900 / Black | `--solidGrey900` / `--solidGreyBlack` | `#000000` |

---

## Purple / Primary (Color/Purple)

ACKO brand anchors: `#f3f3ff` (50) · `#6841e6` (600) · `#241362` (950)

| Figma | CSS var | Hex |
|---|---|---|
| 50 | `--solidPrimary50` | `#f3f3ff` |
| 100 | `--solidPrimary100` | `#e1e0fe` |
| 150 | `--solidPrimary150` | `#d1cffd` |
| 200 | `--solidPrimary200` | `#c1bdfc` |
| 300 | `--solidPrimary300` | `#a69cf9` |
| 400 | `--solidPrimary400` | `#8e7cf4` |
| 500 | `--solidPrimary500` | `#795dee` |
| 600 | `--solidPrimary600` | `#6841e6` |
| 700 | `--solidPrimary700` | `#5a1fd4` |
| 800 | `--solidPrimary800` | `#3a1ba5` |
| 850 | `--solidPrimary850` | `#33198f` |
| 900 | `--solidPrimary900` | `#2b1678` |
| 950 | `--solidPrimary950` | `#241362` |

---

## Green / Secondary (Color/Green)

Used for success states and AckoDrive brand override.

| Figma | CSS var | Hex |
|---|---|---|
| 50 | `--solidSecondary50` | `#f0fdf4` |
| 100 | `--solidSecondary100` | `#dcfce7` |
| 200 | `--solidSecondary200` | `#bbf7d0` |
| 300 | `--solidSecondary300` | `#86efac` |
| 400 | `--solidSecondary400` | `#4ade80` |
| 500 | `--solidSecondary500` | `#22c55e` |
| 600 | `--solidSecondary600` | `#16a34a` |
| 700 | `--solidSecondary700` | `#15803d` |
| 800 | `--solidSecondary800` | `#166534` |
| 900 | `--solidSecondary900` | `#14532d` |
| 950 | `--solidSecondary950` | `#052e16` |

---

## Red (Color/Red)

| Figma | CSS var | Hex |
|---|---|---|
| 50 | `--solidRed50` | `#fef2f2` |
| 100 | `--solidRed100` | `#fee2e2` |
| 200 | `--solidRed200` | `#fecaca` |
| 300 | `--solidRed300` | `#fca5a5` |
| 400 | `--solidRed400` | `#f87171` |
| 500 | `--solidRed500` | `#ef4444` |
| 600 | `--solidRed600` | `#dc2626` |
| 700 | `--solidRed700` | `#b91c1c` |
| 800 | `--solidRed800` | `#991b1b` |
| 900 | `--solidRed900` | `#7f1d1d` |
| 950 | `--solidRed950` | `#450a0a` |

---

## Amber (Color/Amber) — warnings

| Figma | CSS var | Hex |
|---|---|---|
| 50 | `--solidAmber50` | `#fffbeb` |
| 100 | `--solidAmber100` | `#fef3c7` |
| 200 | `--solidAmber200` | `#fde68a` |
| 300 | `--solidAmber300` | `#fcd34d` |
| 400 | `--solidAmber400` | `#fbbf24` |
| 500 | `--solidAmber500` | `#f59e0b` |
| 600 | `--solidAmber600` | `#d97706` |
| 700 | `--solidAmber700` | `#b45309` |
| 800 | `--solidAmber800` | `#92400e` |
| 900 | `--solidAmber900` | `#78350f` |
| 950 | `--solidAmber950` | `#451a03` |

---

## Yellow (Color/Yellow) — highlights only, not warnings

| Figma | CSS var | Hex |
|---|---|---|
| 50 | `--solidYellow50` | `#fefae8` |
| 100 | `--solidYellow100` | `#fef9c3` |
| 200 | `--solidYellow200` | `#fef08a` |
| 300 | `--solidYellow300` | `#fde047` |
| 400 | `--solidYellow400` | `#facc15` |
| 500 | `--solidYellow500` | `#eab308` |
| 600 | `--solidYellow600` | `#d18c0a` |
| 700 | `--solidYellow700` | `#a76406` |
| 800 | `--solidYellow800` | `#875008` |
| 900 | `--solidYellow900` | `#62360f` |
| 950 | `--solidYellow950` | `#302012` |

---

## Accent solids (Color/Solid/*)

Each accent hue follows the same 50–950 scale. CSS prefix matches hue name:

| Hue | CSS prefix | Example |
|---|---|---|
| Blue | `--solidBlue*` | `--solidBlue600` = `#2563eb` |
| Cyan | `--solidCyan*` | `--solidCyan600` = `#0891b2` |
| Teal | `--solidTeal*` | `--solidTeal600` = `#0891b2` |
| Pink | `--solidPink*` | `--solidPink600` = `#db2777` |
| Orange | `--solidOrange*` | `--solidOrange600` = `#eb740a` |
| Lime | `--solidLime*` | `--solidLime600` = `#45a316` |
| Indigo | `--solidIndigo*` | `--solidIndigo600` = `#4f46e5` |

Full hex values ship in `@acko/tokens/tokens.css`.

---

## Alpha scales (Color/Alpha/*)

| Scale | CSS prefix | Format |
|---|---|---|
| GreyA (black alpha) | `--alphaGreyA{step}` | `rgba(0,0,0, …)` — steps: 00, 50, 100…950 |
| WhiteA | `--alphaWhiteA{step}` | `rgba(255,255,255, …)` |
| PrimaryA (purple) | `--alphaPrimaryA{step}` | `rgba(153,116,249, …)` — brand tint overlays |
| RedA | `--alphaRedA{step}` | `rgba(239,68,68, …)` — error overlays |

Fine-grained aliases (legacy compat): `--alphaGreyA04`, `--alphaPrimaryA02`, `--alphaRedA100`, etc.

**Common uses:**
- `--alphaGreyA400` — modal scrim (light mode)
- `--alphaGreyA500` — modal scrim (dark mode)
- `--alphaPrimaryA700` — focus ring tint (light)
- `--alphaPrimaryA600` — focus ring tint (dark)

---

## Border (raw widths)

| Figma | CSS var | Value |
|---|---|---|
| `border/none` | `--borderNone` | `0px` |
| `border/hairline` | `--borderHairline` | `1px` (0.5px on retina — see `scales.md`) |
| `border/control` | `--borderControl` | `2px` |
| `border/heavy` | `--borderHeavy` | `4px` |

---

## Elevation (raw shadows)

| Figma | CSS var | Value |
|---|---|---|
| `elevation/e0` | `--elevationE0` | `none` |
| `elevation/e1` | `--elevationE1` | `0 1px 4px rgba(0,0,0,0.06)` |
| `elevation/e2` | `--elevationE2` | `0 2px 8px rgba(0,0,0,0.06)` |
| `elevation/e3` | `--elevationE3` | `0px 2px 16px 4px rgba(0,0,0,0.04)` |
| `elevation/e4` | `--elevationE4` | `0 4px 24px rgba(0,0,0,0.10)` |
| `elevation/e5` | `--elevationE5` | `0 8px 32px rgba(0,0,0,0.12)` |

Effect-style shadows (used by cards, dropdowns): `--shadowXs`, `--shadowS`, `--shadowM`, `--shadowL`, `--shadowXl` — see `shadows.md`.

---

## Rules

1. **Never import Primitives into a component directly.** Components → Semantics → Brand → Primitives.
2. **Never use Primitives for stroke/fill on a canvas layer.** The variable scope is intentionally hidden from pickers.
3. **Adding a new hue?** Add the full 50–950 ramp here first, then create Brand aliases, then wire into Semantics.
4. **Step naming:** always numeric (`600`), never words like `dark` or `light` — those belong in Semantics role names.
5. **Legacy names removed:** `--grey50`, `--purple600`, `--blackA7` etc. do not exist in v2.0.3 — use `--solidGrey50`, `--solidPrimary600`, `--alphaGreyA500`.

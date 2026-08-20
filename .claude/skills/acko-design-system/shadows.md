---
description: Shadow tokens — primitive and semantic shadows for elevation hierarchy
---

# Shadow Tokens

**Source of truth:** `@acko/tokens@2.0.3` → `tokens.css`

---

## Primitive elevation (Figma: elevation/*)

| Figma | CSS var | Value |
|---|---|---|
| `elevation/e0` | `--elevationE0` | `none` |
| `elevation/e1` | `--elevationE1` | `0 1px 4px rgba(0,0,0,0.06)` |
| `elevation/e2` | `--elevationE2` | `0 2px 8px rgba(0,0,0,0.06)` |
| `elevation/e3` | `--elevationE3` | `0px 2px 16px 4px rgba(0,0,0,0.04)` |
| `elevation/e4` | `--elevationE4` | `0 4px 24px rgba(0,0,0,0.10)` |
| `elevation/e5` | `--elevationE5` | `0 8px 32px rgba(0,0,0,0.12)` |

---

## Effect-style shadows (Figma: Effect Styles)

| CSS var | Use Case |
|---|---|
| `--shadowXs` | Primary card elevation; page Secondary surface elevation; `<Surface variant="secondary">` elevation |
| `--shadowS` | Light elevation |
| `--shadowM` | Medium elevation |
| `--shadowL` | Cards, dropdowns |
| `--shadowXl` | Modals, dialogs |

`--shadowXs` value:
```css
0px 5px 10px 0px rgba(0,0,0,0.02),
0px 18px 18px 0px rgba(0,0,0,0.02),
0px 41px 25px 0px rgba(0,0,0,0.01)
```

**Legacy names removed:** `--shadowSm`, `--shadowMd`, `--shadowLg`, `--shadow2xl` → use `--shadowS`, `--shadowM`, `--shadowL`, `--shadowXl`.

---

## Semantic shadow aliases

| Token | Maps to | Use Case |
|---|---|---|
| Dropdown panel | `--elevationDropdown` → `--elevationE4` | Dropdown menus, popovers |

---

## Inner shadows

| CSS var | Value |
|---|---|
| `--shadowInnerS` | `inset 0px 2px 4px -1px rgba(0,0,0,0.24)` |
| `--shadowInnerM` | `inset 0px 2px 4px -1px rgba(0,0,0,0.24)` |
| `--shadowInnerL` | `inset 0px 2px 4px -1px rgba(0,0,0,0.24)` |

---

## Focus ring

Use the semantic border focus token — **not** a dedicated shadow token:

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--borderFocus);
}
```

`--borderFocus` → `alphaPrimaryA700` (light) · `alphaPrimaryA600` (dark)

Component-scoped focus rings alias the same semantic:
- `--inputFieldFocusRing` → `--borderFocus`
- `--textareaFocusRing` → `--borderFocus`
- `--dropdownFocusRing` → `--borderSelected`

**Legacy removed:** `--shadowFocusRing`, `--colorPrimaryRing`

---

## Badge gradient pattern

Solid badges use a vertical gradient fill with a solid border — no shadows:

```css
background: linear-gradient(0deg, var(--badgePurpleGradientFrom), var(--badgePurpleGradientTo));
border: 1px solid var(--badgePurpleBorder);
```

Counter badges: `--counter{Hue}GradientFrom/To/Border`

---

## Rules

- Shadows are heavier in dark mode to remain visible on dark surfaces
- Prefer `box-shadow` over `border` for hairline edges
- Never use harsh drop shadows — keep them diffused
- Never use `outline:` for focus — use `box-shadow: 0 0 0 3px var(--borderFocus)`

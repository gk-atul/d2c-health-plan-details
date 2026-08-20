---
description: Border radius tokens and nested radius rule
---

# Border Radius Tokens

| Token | Value | Use Case | Tailwind |
|-------|-------|----------|----------|
| `--radiusSm` | 4px | Nested insets | `rounded` |
| `--radiusMd` | 6px | Checkboxes md/lg | `rounded-md` |
| `--radiusLg` | 8px | Options, table cells | `rounded-lg` |
| `--radiusXl` | 10px | Tooltip | `rounded-xl` |
| `--radius2xl` | 12px | — | `rounded-2xl` |
| `--radius3xl` | 16px | — | `rounded-[16px]` |
| `--radius4xl` | 20px | Cards, dialogs, drawers, toasts, dropdown menus | `rounded-[20px]` |
| `--radiusFull` | 9999px | Buttons, inputs, pills | `rounded-full` |

**`--radius4xl` (20px)** is the standard for surface containers: cards, dialogs, drawers, toasts, dropdown menus, calendar panels.

## Nested Radius Rule

When a rectangular element is nested inside a rounded container:

```
inner radius = outer radius − padding
```

Card outer radius is `--radius4xl` (20px). Use the `--radiusInset-*` tokens when a child element fills the container edge-to-edge:

| Token | Value | When |
|-------|-------|------|
| `--radiusInsetSm` | 8px (`--radiusLg`) | Inner elements in `padding="sm"` (12px) cards → 20 − 12 = 8px |
| `--radiusInsetMd` | 4px (`--radiusSm`) | Inner elements in `padding="md"` (16px) cards → 20 − 16 = 4px |
| `--radiusInsetLg` | 0px | Inner elements in `padding="lg"` (24px) cards → 20 − 24 = 0px |

### Applies to
- Icon wrapper boxes, image thumbnails, inset panels (`<CardInset>`)

### Exempt (keep their own radius)
- Buttons, badges, avatars — intentional pill/circular shape

Radius tokens are **theme-agnostic**.

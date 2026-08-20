# UI Polish

Fine-grained details that make ACKO feel premium and consistent. All values reference semantic or component tokens — never hardcode colors, spacing, radius, or shadow values.

---

## Focus States

Never remove focus indicators. Use the canonical focus pattern from `@acko/css` — **not** `outline`:

```css
:focus-visible {
  box-shadow: 0 0 0 3px var(--borderFocus);
  border-radius: var(--radiusSm);
  outline: none;
}
:focus:not(:focus-visible) { box-shadow: none; }
```

`--borderFocus` resolves to `alphaPrimaryA700` (light) / `alphaPrimaryA600` (dark). Component tokens like `--inputFieldFocusRing` alias the same semantic.

Prefer `isolation: isolate` to create new stacking contexts instead of manipulating z-index directly.

---

## Skeleton Loaders

Must match real content dimensions and radius exactly. Never show zero states that snap to real data — always use skeletons for async content.

Tokens: `--skeletonBase` · `--skeletonShimmer`

---

## Gradients

Use eased gradients. For content fade-outs, use `mask-image` instead of a gradient overlay element.

### Marketing / hero section background (approved pattern)

Use a **subtle vertical fade** from brand tint into the page surface — not raw hex. Keeps heroes on-brand without breaking the "mostly solid UI" rule for dense chrome.

**When to use:** Full-bleed hero or landing strip above the fold. **Do not** use heavy gradients behind forms, tables, or dense data.

**Tokens only:**

| Stop | Token | Role |
|------|--------|------|
| Top (0%) | `--fillBrandSubtle` | Light purple tint |
| Bottom (100%) | `--surfaceBase` | Page background — seamless blend |

**React (inline style):**

```tsx
<section
  style={{
    background:
      "linear-gradient(180deg, var(--fillBrandSubtle) 0%, var(--surfaceBase) 100%)",
  }}
>
  {/* Inner content still uses section container / max-width rules from layout.md */}
</section>
```

**Plain CSS equivalent:**

```css
.hero-surface {
  background: linear-gradient(
    180deg,
    var(--fillBrandSubtle) 0%,
    var(--surfaceBase) 100%
  );
}
```

**Structure:** Outer wrapper = full width + gradient; **inner** = `content-container` / max-width + gutters (two-layer full-bleed pattern in `layout.md`).

---

## Dark Mode

CSS variable-based theming via `[data-theme="light"]` / `[data-theme="dark"]`. **Never** use Tailwind `dark:` modifier. Disable transitions during theme switch to prevent flash:

```js
function setTheme(theme) {
  document.documentElement.classList.add('no-transitions');
  document.documentElement.setAttribute('data-theme', theme);
  requestAnimationFrame(() => requestAnimationFrame(() =>
    document.documentElement.classList.remove('no-transitions')
  ));
}
```

See `semantics.md` for the full dark theme token mappings.

---

## Safe Areas (Mobile)

Always account for device safe areas on bottom CTAs and navigation:

```css
.bottom-cta { padding-bottom: calc(16px + env(safe-area-inset-bottom)); }
.bottom-nav { padding-bottom: env(safe-area-inset-bottom); }
```

---

## Logos

### Logo Assets

| Variant | Use When | URL |
|---------|----------|-----|
| Primary (Dark BG) | Stacked logo on dark surfaces | `https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/ACKO%20logo%20Primary%20Dark%20BG.svg` |
| Primary (Light BG) | Stacked logo on light surfaces | `https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/ACKO%20logo%20primary%20Light%20BG.svg` |
| Horizontal (Dark BG) | Inline/header logo on dark surfaces | `https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/ACKO%20logo%20horizontal%20Dark%20bg.svg` |
| Horizontal (Light BG) | Inline/header logo on light surfaces | `https://pub-c050457d48794d5bb9ffc2b4649de2c1.r2.dev/ACKO%20logo%20horizontal%20Light%20BG.svg` |

### Logo Rules

- Min height: 16px. Preferred: 24px
- Clear space: half logo height on all sides
- Never rotate, stretch, outline, or apply effects
- Choose Dark BG or Light BG variant based on the surface color token
- Use Horizontal variant for navbars and inline placements
- Use Primary (stacked) variant for hero sections, footers, and splash screens

---

## Decorative Elements

```css
.decorative { pointer-events: none; user-select: none; }
```

Always add `aria-hidden="true"` to decorative elements.

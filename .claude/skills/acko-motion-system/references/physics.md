# Physics

## Purpose

Physics defines how far, how much, and how strongly things move. Acko motion should feel grounded, controlled, precise, and smooth. Avoid motion that feels floaty, rubbery, unstable, chaotic, or game-like.

## Preferred animation properties

Use first:

```css
transform
opacity
```

Use carefully:

```css
box-shadow
height
width
border-radius
filter
```

Avoid or limit:

```css
top
left
margin
padding
large blur
huge shadows
heavy layout animation
large image sequences
multiple full-screen lottie loops
continuous decorative loops
long cascades in task-heavy screens
```

Exception: origin-aware card expand on web may animate left, top, width, height, and border-radius together when measured precisely. See `transitions.md`.

## Motion intensity

| Level | Use | Distance | Scale |
|---|---|---:|---:|
| Low | Button, icon, chip, field | 2-6px | 0.97-1.005 |
| Medium | Card, banner, form group | 8-16px | 0.99-1.01 |
| High | Page, modal, sheet | 16-32px | 0.98-1.02 |
| Expressive | Offer, reward | case-specific | up to 1.04 |

Default to low or medium. Use high only for large surfaces or page-level movement. Use expressive only for positive low-risk moments.

## Distance tokens

```css
:root {
  --acko-distance-micro: 2px;
  --acko-distance-small: 4px;
  --acko-distance-medium: 8px;
  --acko-distance-large: 16px;
  --acko-distance-page: 24px;
  --acko-distance-max: 32px;
}
```

| Token | Value | Use |
|---|---:|---|
| `--acko-distance-micro` | 2px | Icon nudge, tiny feedback |
| `--acko-distance-small` | 4px | Local error shake, hover lift |
| `--acko-distance-medium` | 8px | Dropdown, small card reveal |
| `--acko-distance-large` | 16px | Page element reveal, modal entry |
| `--acko-distance-page` | 24px | Page element reveal, step flow, sheet entry |
| `--acko-distance-max` | 32px | Maximum normal product motion |

Normal product UI should not exceed 32px movement. Right-to-left page shell movement is a navigation transition; the destination content itself should use the smaller 12-24px reveal.

## Scale tokens

```css
:root {
  --acko-scale-press-subtle: 0.99;
  --acko-scale-press: 0.98;
  --acko-scale-press-strong: 0.97;
  --acko-scale-selected: 1.005;
  --acko-scale-emphasis: 1.02;
  --acko-scale-expressive: 1.04;
}
```

| Scale | Use |
|---|---|
| `0.99` | Subtle press |
| `0.98` | Normal press |
| `0.97` | Strong primary CTA press |
| `1.005` | Selected card or selected chip |
| `1.02` | Success icon or small emphasis |
| `1.04` | Offer or reward only |

Use softer values like 0.98 or 0.99 for secondary controls. Avoid transform scale for web card morphs because it can distort content at small sizes; use measured position, size, and radius instead.

## Opacity rules

Opacity is the safest motion property for Acko. Use it for:

- page element reveal
- sensitive status change
- toast entry
- inline alert
- loading to loaded
- modal backdrop
- reduced-motion fallback
- mini/detail content timing inside card morphs

Use opacity with small transform when direction matters. Use opacity-only in sensitive states.

## Content timing inside shared morphs

For a 600ms origin-aware card expand:

| Content layer | Timing |
|---|---|
| Mini card content fades out | first 35%, 0-210ms |
| Detail content fades in | after 50%, 300-600ms |
| Close control fades in | final 25%, 450-600ms |

For a 450ms collapse:

| Content layer | Timing |
|---|---|
| Detail content fades out | first 40%, 0-180ms |
| Original card fades back in | after 75%, 337-450ms |

Keep the original card in layout with opacity 0 during expand. Restore it when collapse finishes.

## Bounce and spring

Bounce is not a default Acko behavior.

Allowed only for:

```text
reward badge
offer reveal
small success check
switch/thumb settle
```

Never use bounce for:

```text
error
warning
payment failure
claim rejection
document rejection
policy cancellation
security alert
KYC failure
OTP error
```

Spring rule:

```text
High damping. Low overshoot. One settle only.
```

## Insurance-safe rules

Motion must reduce uncertainty, not create drama.

| Situation | Motion behavior |
|---|---|
| Payment failure | Restrained local reveal, no bounce, no funny reaction. |
| Claim rejection | Minimal, clear, supportive, opacity-first. |
| Expired policy | Warning appears clearly, no alarm pulse. |
| Rejected document | Local correction and retry path, no full-screen shake. |
| Verification error | Local field or status area only. |
| Success | Satisfying but calm; do not over-celebrate serious flows. |

Use one motion focus at a time. Do not animate unrelated elements together on high-stakes screens.

## Reduced-motion physics

When reduced motion is enabled:

```text
Distance becomes 0px.
Scale becomes 1.
Bounce is removed.
Shimmer is removed or becomes static.
Parallax is removed.
Large x/y travel is removed.
Transition becomes fade-only or instant.
```

| Original motion | Reduced-motion fallback |
|---|---|
| Bottom sheet slide | Fade in surface or instant open |
| Page right-to-left slide | Crossfade or instant transition |
| Card expand to page | Fade through with no large scale or travel |
| Modal scale/slide | Opacity only |
| Drawer slide | Instant reveal or short fade |
| Error shake | Color, border, and text change only |
| Success animation | Static checkmark with opacity fade |
| Illustration loop | Stop loop and show final frame |
| Skeleton shimmer | Static skeleton or subtle opacity pulse |
| Parallax/depth movement | Remove entirely |

Example:

```css
@media (prefers-reduced-motion: reduce) {
  [data-motion] {
    transform: none;
    animation-duration: 150ms;
  }
}
```

## Lottie and vector animation

Use Lottie/vector animation for:

```text
onboarding
empty states
short success confirmations
loaders that explain system status
document verification
claim progress education
```

Avoid Lottie/vector animation for:

```text
every screen
payment failure
claim rejection
critical warnings
form errors
repetitive decorative loops
```

| Illustration use | Duration | Frames at 60fps | Ease |
|---|---:|---:|---|
| Empty state | 1000-1600ms | 60-96 | ease-in-out |
| Onboarding | 1200-2000ms | 72-120 | ease-in-out |
| Success confirmation | 600-800ms | 36-48 | ease-out |
| Loader loop | 800-1400ms | 48-84 | linear only if mechanical |

## Performance notes

- Keep animations interruptible where possible.
- Do not block user input after the key motion has communicated state.
- Use platform-native gesture physics for direct drag while the finger is down.
- Settle drag releases with the custom ease-in-out rule.
- Test on low-end mobile devices.
- Always include duration, frames, ease, velocity, ease values, trigger, behavior, reduced-motion fallback, and implementation notes in handoff.

## Do and don't

| Do | Do not |
|---|---|
| Use 500-600ms for major open surfaces. | Make major surfaces instant or robotic. |
| Use 350-450ms for exits. | Make exits slower than opens. |
| Use local error motion. | Shake the whole screen. |
| Use linear only for loaders and real progress. | Use linear for bottom sheets or pages. |
| Use one clear focus. | Animate multiple unrelated elements. |
| Respect reduced motion. | Force large motion on all users. |
| Keep success calm. | Use loud celebration in serious flows. |

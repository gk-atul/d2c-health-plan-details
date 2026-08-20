# Home

## Purpose

This page is the core rulebook for the custom Acko Motion System. These rules apply before choosing curves, physics, transitions, or animation principles.

Acko motion should feel:

```text
Calm. Secure. Stable. Clean. Premium. Trustworthy. Controlled. Useful.
```

Motion should help users understand what happened, what changed, what is loading, what needs attention, whether something succeeded or failed, and what the next step is. Motion should not be decoration.

## Work method for every answer

1. Identify the UI pattern: page, sheet, modal, card, form, control, loader, claim, payment, document, alert, success, or error.
2. If the request involves navigation, select the transition mode before selecting timing:
   - right-to-left page transition
   - origin-aware card expand to page
   - bottom sheet animation to page
3. Choose the motion token from `curves.md`.
4. Apply the relevant behavior from `transitions.md`, `physics.md`, or `pattern-library.md`.
5. State duration, frames at 60fps, ease type, velocity, ease values, trigger, behavior, reduced-motion fallback, and performance notes.
6. Keep answers short and implementation-ready unless the user asks for deeper explanation.

## Core motion principles

| Principle | Meaning |
|---|---|
| Calm over flashy | Use soft, controlled motion. Avoid loud or dramatic animation. |
| Clarity before delight | Motion must explain something first. Delight comes later. |
| Security through stability | Insurance UI should feel reliable, not playful or unstable. |
| One focus at a time | Animate the most important change only. |
| Logical direction | Motion direction should match journey direction and source position. |
| Fast and useful | Animation should never make users wait for important information. |
| Accessible by default | Always support reduced motion. |

## Rules that should never break

| Rule | Guideline |
|---|---|
| Motion needs purpose | Remove animation if it does not explain feedback, progress, status, hierarchy, source relationship, or navigation. |
| Sensitive flows stay restrained | Claims, payments, KYC, errors, rejection, cancellation, and security states use minimal motion. |
| No bounce for serious states | Never bounce errors, warnings, failures, rejections, payment failures, or security alerts. |
| No full-screen shake | Error motion stays local to the field or component. |
| No flashing or rapid pulse | Avoid accessibility and trust issues. |
| No unnecessary waiting | Important information appears quickly. |
| Use semantic motion tokens | Do not hardcode random durations, curves, or stagger values. |
| Respect reduced motion | Replace slide, scale, shimmer, and bounce with fade or instant state change. |
| Use transform and opacity first | Keep performance smooth on real devices. |

## Source-aware motion rule

Popups, menus, expanding cards, and temporary surfaces animate from their source position.

| Source or trigger | Motion direction |
|---|---|
| Card on right | Expand from right |
| Card on left | Expand from left |
| Card in center | Expand from center |
| Card near top | Expand from top/its measured y position |
| Card near bottom | Expand from bottom/its measured y position |
| Bottom sheet | Enter from bottom or continue upward into page |
| Top menu | Open from top/anchor |
| Right-side menu | Enter from right |
| Left-side menu | Enter from left |
| Center modal | Fade or scale from center |
| Dropdown | Open from dropdown anchor |
| Card detail | Expand from exact card position |

The motion should always answer: where did this come from?

## Page direction rule

For page navigation, do not default to a generic bottom-to-top page transition. Choose the page mode:

| Mode | Use when |
|---|---|
| Right-to-left page | Normal forward navigation without a strong visible source object. |
| Card expand to page | A tapped policy card, claim card, quote plan, renewal card, add-on card, document preview, list item, or tile becomes the destination. |
| Bottom sheet to page | The user is already in a sheet and that sheet becomes a full-page task or detail view. |

When using right-to-left page open, the page shell moves right-to-left and destination page elements reveal bottom-to-top with opacity.

## Risk-based motion

| Risk level | Examples | Motion behavior |
|---|---|---|
| Low | Offers, rewards, onboarding | Expressive motion allowed with strict limits. |
| Medium | Quote, dashboard, policy browsing | Standard calm motion. |
| High | Payment, claim, document upload | Clear progress, restrained motion. |
| Sensitive | Failure, rejection, cancellation, security | Minimal, opacity-first, no bounce. |

## Journey motion behavior

| Journey | Motion behavior |
|---|---|
| Quote | Smooth step transition, ordered reveal, clear premium updates, no surprise jumps. |
| Payment | Stable, transparent, no celebration before confirmation, linear only for real progress/loading. |
| Claims | Serious, supportive, progress-focused, local correction only for errors. |
| KYC / OTP | Secure, precise, minimal motion, no playful effects. |
| Document upload | Clear progress, status, verification, and retry states. |
| Offers / rewards | More expressive than claims/payments, but still controlled and short. |

## Do and don't

| Do | Do not |
|---|---|
| Use motion to clarify change. | Animate only to decorate. |
| Use subtle fade, slide, and scale. | Use dramatic zoom, bounce, or rubbery motion. |
| Use right-to-left page open for most forward navigation. | Use generic bottom-to-top full-page motion for every route. |
| Reveal destination page elements bottom-to-top with 50-60ms stagger. | Cascade dozens of items or delay task content. |
| Use origin-aware card expansion from the measured source card. | Hardcode card expansion from center or an unrelated side. |
| Use local error feedback. | Shake the full screen. |
| Use real progress for waiting states. | Hide waiting behind random decorative loaders. |
| Use semantic tokens. | Use `transition: all 300ms ease`. |
| Use badge motion only for offers/rewards. | Use endless pulsing. |
| Use calm success states. | Use confetti in claim/payment flows. |

## Motion decision rule

Before adding motion, ask:

```text
1. Does it explain what happened?
2. Does it make the next step clearer?
3. Does it reduce uncertainty?
4. Does it feel safe for insurance?
5. Is the direction logical?
6. Does it respect source position?
7. Is it smooth and accessible?
```

If the answer is no, remove or simplify the motion.

## Motion generator input

Use this schema when generating motion automatically.

```json
{
  "component": "button | card | input | modal | sheet | toast | badge | progress | page",
  "intent": "feedback | reveal | navigation | progress | success | error | warning | offer | reward",
  "risk": "low | medium | high | sensitive",
  "surfaceSize": "micro | small | medium | large",
  "navigationMode": "rightToLeft | cardExpand | sheetToPage | none",
  "direction": "none | bottomToTop | forward | backward | up | down | left | right | sourceAware",
  "sourcePosition": "left | right | top | bottom | center | anchor",
  "theme": "light | dark",
  "reducedMotion": false
}
```

## Motion generator output

```json
{
  "token": "motion.page.open",
  "duration": "500-600ms",
  "framesAt60fps": "30-36",
  "easeType": "ease-out",
  "velocity": "100 to 0",
  "easeValues": "out 50%, in 40%",
  "properties": ["opacity", "transform"],
  "behavior": "incoming page x 100% to 0%; destination elements y +12-24px to 0 and opacity 0% to 100%",
  "stagger": "50-60ms for destination page elements",
  "reducedMotionFallback": "150-200ms crossfade or instant transition",
  "notes": "Choose transition mode before timing. Do not combine right-to-left push with card expand or sheet-to-page."
}
```

## Home page checklist

```text
[ ] Motion has a clear product purpose.
[ ] It reduces uncertainty.
[ ] It feels calm and secure.
[ ] Direction is logical.
[ ] Page navigation uses the correct mode.
[ ] Right-to-left destination elements use 50-60ms visual stagger.
[ ] Popup/menu/card expansion follows source position.
[ ] Bounce is avoided in serious states.
[ ] Semantic tokens are used.
[ ] Reduced motion is supported.
```

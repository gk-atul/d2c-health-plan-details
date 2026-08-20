# Curves

## Purpose

Curves define timing, velocity, frames, and easing personality for the custom Acko motion system. Curves should feel smooth, responsive, stable, and secure.

Do not replace these values with generic Material, Fluent, iOS, Android, Airbnb, or older Acko draft values unless the user explicitly asks for a comparison.

## Frame conversion at 60fps

Use 60fps for all frame counts. Formula:

```text
frames / 60 * 1000 = milliseconds
```

| Frames | Time |
|---:|---:|
| 5 | 83ms |
| 6 | 100ms |
| 7 | 117ms |
| 8 | 133ms |
| 10 | 167ms |
| 11 | 183ms |
| 12 | 200ms |
| 13 | 217ms |
| 14 | 233ms |
| 15 | 250ms |
| 16 | 267ms |
| 18 | 300ms |
| 19 | 317ms |
| 20 | 333ms |
| 21 | 350ms |
| 24 | 400ms |
| 27 | 450ms |
| 30 | 500ms |
| 33 | 550ms |
| 36 | 600ms |
| 39 | 650ms |
| 42 | 700ms |
| 48 | 800ms |
| 60 | 1000ms |
| 72 | 1200ms |
| 84 | 1400ms |
| 96 | 1600ms |
| 120 | 2000ms |

## Master motion tokens

| Token | Duration | Frames at 60fps | Ease | Velocity | Ease value | Use for |
|---|---:|---:|---|---|---|---|
| `motion.micro.press` | 80-100ms | 5-6 | ease-out | 100 to 0 | out 50%, in 40% | button press, card tap |
| `motion.micro.release` | 120-160ms | 7-10 | ease-out | 100 to 0 | out 50%, in 40% | button release, icon return |
| `motion.small.enter` | 160-220ms | 10-13 | ease-out | 100 to 0 | out 50%, in 40% | icons, chips, inputs, helper text |
| `motion.small.exit` | 140-200ms | 8-12 | ease-in | 0 to 100 | out 40%, in 50% | small dismiss, tooltip exit |
| `motion.medium.enter` | 240-340ms | 14-20 | ease-out | 100 to 0 | out 50%, in 40% | cards, lists, banners, toasts |
| `motion.medium.transform` | 220-320ms | 13-19 | ease-in-out | 0 to 100 to 0 | out 50%, in 40% | accordions, tabs, toggles, slider settle |
| `motion.page.open` | 500-600ms | 30-36 | ease-out | 100 to 0 | out 50%, in 40% | new page right-to-left |
| `motion.page.element-reveal` | 260-340ms | 16-20 | ease-out | 100 to 0 | out 50%, in 40% | next-page elements: y +12-24px to 0, opacity 0% to 100% |
| `motion.page.element-stagger` | 50-60ms delay | 3-4 | inherits reveal | inherits reveal | inherits reveal | top-to-bottom delay between next-page elements |
| `motion.page.close` | 350-450ms | 21-27 | ease-in | 0 to 100 | out 40%, in 50% | back transition, page dismiss |
| `motion.surface.open` | 500-600ms | 30-36 | ease-out | 100 to 0 | out 50%, in 40% | bottom sheet, modal, drawer open |
| `motion.surface.close` | 350-450ms | 21-27 | ease-in | 0 to 100 | out 40%, in 50% | bottom sheet, modal, drawer close |
| `motion.shared.expand` | 500-650ms | 30-39 | ease-in-out | 0 to 100 to 0 | out 50%, in 40% | card-to-page, image expansion |
| `motion.success` | 600-800ms | 36-48 | ease-out | 100 to 0 | out 50%, in 40% | policy issued, claim submitted, payment success |
| `motion.error.local` | 200-260ms | 12-16 | ease-in-out | 0 to 100 to 0 | out 50%, in 40% | field shake, local correction |
| `motion.linear.loop` | 800-1400ms loop | 48-84 | linear | constant | 0% influence | spinner, skeleton shimmer |
| `motion.illustration` | 1000-1600ms | 60-96 | ease-in-out | 0 to 100 to 0 | out 50%, in 40% | empty state, onboarding animation |

## Default fixed values

When the user does not want a range, use these defaults:

| Motion | Default |
|---|---:|
| Button press | 100ms, 6 frames |
| Button release | 140ms, about 8 frames |
| Small UI enter | 180ms, about 11 frames |
| Medium card/list reveal | 300ms, 18 frames |
| Bottom sheet open | 550ms, 33 frames |
| New page open | 550ms, 33 frames |
| Page element reveal | 300ms, 18 frames |
| Page element stagger | 56ms, about 3-4 frames |
| Surface close | 400ms, 24 frames |
| Shared expand | 600ms, 36 frames |
| Card collapse | 450ms, 27 frames |
| Success | 700ms, 42 frames |
| Local error | 240ms, about 14 frames |
| Spinner loop | 1000ms, 60 frames |
| Skeleton shimmer | 1200ms, 72 frames |
| Illustration | 1200ms, 72 frames |

## Easing rules and After Effects setup

| Ease | Velocity | Ease values | Meaning | Use for | After Effects setup |
|---|---|---|---|---|---|
| ease-out | 100 to 0 | out 50%, in 40% | starts fast, settles softly | open, enter, reveal, appear, button press/release | start speed 100% with ease out 50%; end speed 0% with ease in 40% |
| ease-in | 0 to 100 | out 40%, in 50% | starts gently, exits quickly | close, dismiss, remove, back | start speed 0% with ease out 40%; end speed 100% with ease in 50% |
| ease-in-out | 0 to 100 to 0 | out 50%, in 40% | soft start, faster middle, soft stop | transform, expand, collapse, morph, drag settle | start speed 0% with ease out 50%; end speed 0% with ease in 40% |
| linear | constant | 0% influence | same speed throughout | spinner, real progress, timer, direct drag follow | linear interpolation, 0% influence, constant velocity |

## Easing selection

Use ease-out for:

```text
bottom sheet open, modal open, drawer open, new page open right-to-left, toast enter, dropdown open, tooltip open, card/list/section reveal, error text reveal, success reveal, button press, button release
```

Use ease-in for:

```text
bottom sheet close, modal close, drawer close, back page transition, toast exit, dropdown close, tooltip close, banner dismiss, remove document, chip deselect
```

Use ease-in-out for:

```text
card expand/collapse, search expand/collapse, image gallery open/close, shared element transition, container transform, toggle movement, tab indicator, accordion, slider settle, bottom sheet drag settle, form field error shake, claim progress update, empty-state illustration, onboarding illustration
```

Use linear only for:

```text
spinner rotation, skeleton shimmer, indeterminate progress loops, real upload/download progress, OTP resend timer, media/timer progress, and finger-follow drag while the finger is down
```

Do not use linear for sheets, pages, card expansion, modal open/close, button taps, error shakes, success animations, or toasts.

## Timing logic

| Rule | Meaning |
|---|---|
| Small UI is fast | Presses, labels, helpers, chips, and icons should not slow the task. |
| Major opens are deliberate | Pages, sheets, modals, and drawers use 500-600ms to feel stable and premium. |
| Exits are faster than opens | Back and dismiss use 350-450ms. |
| Shared element transitions are slower | Card-to-page morphs use 500-650ms because they explain spatial relationship. |
| Local error is quick | Error correction uses 200-260ms and stays local. |
| Linear is rare | Use it only for mechanical, real-time, or directly controlled motion. |

## Stagger timing

| Scenario | Stagger |
|---|---:|
| Right-to-left destination page reveal | 50-60ms |
| List reveal | 40-60ms |
| Form group reveal | 40-60ms |
| Dashboard cards | 40-60ms |
| Claim timeline | 40-60ms |
| Onboarding / storytelling | 50-70ms, only if it does not delay comprehension |
| Urgent or sensitive state | 0-20ms |

Use visual hierarchy, not DOM order. Avoid cascading dozens of items.

## Reduced-motion curve behavior

When reduced motion is active:

```text
Use opacity only.
Use 100-200ms duration depending on surface size.
Remove large x/y travel.
Remove stagger or keep it at 0-20ms.
Remove bounce, scale, shimmer, parallax, and decorative loops.
```

## Code and cubic-bezier rule

The system is defined by speed, velocity, and influence percentages. Do not invent cubic-bezier values unless the user asks for a code approximation.

When code requires an approximation, say it is an approximation and preserve the source timing. For shared expand only, `cubic-bezier(0.4, 0, 0.2, 1)` can approximate ease-in-out in common UI implementations.

## Avoid

```text
No generic ease everywhere.
No transition: all.
No elastic curves for normal UI.
No bounce for errors.
No slow animation before important information.
No old 300-400ms page open as the default.
No old 300-350ms surface open as the default.
No linear motion for pages, sheets, cards, success, or error.
```

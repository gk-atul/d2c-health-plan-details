# Transitions

## Purpose

Transitions show how users move between pages, surfaces, components, and states. A good Acko transition answers:

```text
Where did I come from?
Where am I going?
What changed?
```

Transitions should feel like a safe handoff, not a dramatic scene change.

## Core transition rules

| Rule | Guideline |
|---|---|
| Choose mode first | Page transitions must choose right-to-left, card expand, or bottom sheet to page before timing. |
| One direction | Do not animate unrelated elements from different directions. |
| Source-aware motion | Popups, menus, cards, and sheets open from their trigger/source position. |
| Destination reveal | Right-to-left page opens reveal destination elements with y +12-24px to 0 and opacity 0% to 100%. |
| Visual stagger | Destination page elements use 50-60ms top-to-bottom stagger. |
| Exit faster than enter | Closing/back/dismiss should feel efficient at 350-450ms. |
| Do not hide status | Payment, claim, upload, and error states must appear clearly. |
| Do not combine modes | Do not use a right-to-left push together with card expand or sheet-to-page. |

## Page transition selection logic

Always choose page transition mode before duration and easing.

| Mode | Use when | Motion |
|---|---|---|
| 1. Right-to-left page transition | Most forward navigation: quote step, claim step, payment step, settings page, support page, account page, dashboard section, or any new route without a strong visual source object. | Incoming page x 100% to x 0% using `motion.page.open`: 500-600ms, 30-36 frames, ease-out, velocity 100 to 0, out 50%, in 40%. Optional outgoing page x 0% to x -8% or slight opacity reduction. |
| 2. Origin-aware card expand to page | A visible policy card, claim card, quote plan, renewal card, add-on card, document preview, list item, or tile visually becomes the destination page. | Use `motion.shared.expand`: 500-650ms, 30-39 frames, ease-in-out, velocity 0 to 100 to 0, out 50%, in 40%. The card morphs from its exact screen position to the new page. |
| 3. Bottom sheet animation to page | The user is already in a bottom sheet and that sheet becomes a full-page task or detail view. | Continue the sheet bottom-to-top into the page. For simple upward motion use `motion.surface.open`: 500-600ms, ease-out. For height/width/radius morph use `motion.shared.expand`: 500-650ms, ease-in-out. Fade overlay out as the sheet becomes the page. |

Decision flow:

```text
If a tapped card/tile/list item visually becomes the destination, use card expand.
Else if the current bottom sheet becomes the page, use bottom sheet to page.
Else use right-to-left page transition.
```

When rules compete, choose the strongest spatial source. A card inside a sheet can still use card expand if the card is the source; the sheet itself uses sheet-to-page if the sheet is the source.

## Right-to-left destination element reveal

When a new page opens from right to left, the destination page elements must appear with subtle bottom-to-top position motion and opacity.

| Property | Value |
|---|---|
| Page shell | incoming x 100% to x 0% |
| Page duration | 500-600ms, default 550ms |
| Page frames | 30-36 frames at 60fps, default 33 |
| Page ease | ease-out, velocity 100 to 0, out 50%, in 40% |
| Optional outgoing page | x 0% to x -8% or slight opacity reduction |
| Element position | y +12-24px to y 0 |
| Element opacity | 0% to 100% |
| Element reveal duration | 260-340ms, default 300ms |
| Element reveal frames | 16-20 frames at 60fps, default 18 |
| Element reveal ease | ease-out, velocity 100 to 0, out 50%, in 40% |
| Stagger delay | 50-60ms between elements, default 56ms |
| Stagger frames | about 3-4 frames at 60fps |
| Order | visual top-to-bottom: first top element, then second, then third, continuing downward |
| Start time | first element starts 80-120ms into the page open or when the incoming page has visibly entered |

Use visual hierarchy, not DOM order:

```text
1. Top app bar or title
2. Progress/context label
3. Hero, summary, or primary card
4. Form fields or sections from top to bottom
5. Supporting rows from top to bottom
6. Bottom CTA or sticky action last unless already persistent
```

For long lists, stagger only meaningful first-viewport items. Avoid cascading dozens of items.

## Bottom sheet to page

Use when a sheet-origin interaction becomes a full-page task without losing context.

Examples:

```text
payment method sheet -> payment detail
document option sheet -> upload page
add-on/plan sheet -> full detail
filter/edit sheet -> full edit flow
support sheet -> ticket page
```

| Case | Duration | Frames | Ease | Behavior |
|---|---:|---:|---|---|
| Simple upward continuation | 500-600ms | 30-36 | ease-out, 100 to 0, out 50%, in 40% | Sheet y moves to page position; overlay fades out. |
| Size/radius morph | 500-650ms | 30-39 | ease-in-out, 0 to 100 to 0, out 50%, in 40% | Sheet height/width/radius morphs into page. |

Start with sheet at current bottom-sheet position, overlay visible, page content hidden. End with sheet/page at y 0 and full-page height, radius 0 if it is a true page, overlay 0%. Reduced motion: 200ms crossfade.

## Origin-aware card expand

Use when a policy, claim, renewal, quote, add-on, tile, document preview, or list item expands into a detail view. The card must morph from its exact screen position so the user never loses spatial context.

| Property | Value |
|---|---|
| Token | `motion.shared.expand` |
| Expand duration | 500-650ms, default 600ms |
| Expand frames at 60fps | 30-39 frames, default 36 |
| Collapse duration | 400-500ms, default 450ms |
| Collapse frames at 60fps | 24-30 frames, default 27 |
| Ease type | ease-in-out |
| Velocity | 0 to 100 to 0 |
| Ease values | out 50%, in 40% |
| Tone | calm, spatial, continuous, not jarring |

Core origin rule: measure the card's real screen position at tap time. Do not hardcode the start position. A card placed left expands from left; center from center; right from right; top from top; bottom from bottom. This applies to grids, lists, horizontal scroll, dashboards, and staggered layouts.

| Target | Width | Height | Border-radius | Use for |
|---|---|---|---|---|
| Half screen | about 60% viewport width | about 65% viewport height | 10-12px | add-on detail, plan summary, quick info |
| Large sheet | viewport minus 16px on all sides | viewport minus 16px on all sides | 8-10px | policy detail, claim detail, renewal summary |
| Full page | 100% viewport | 100% viewport | 0px | complete page-level experience, replaces current screen |

Animate these five properties together with the same ease-in-out curve:

```text
left/x position
top/y position
width
height
border-radius
```

Avoid transform scale for web card morphs because it can distort content at small sizes. Native shared-element systems may use platform-native matched motion as long as the visual result preserves origin, size, and radius.

### Expand sequence

```text
1. User taps card.
2. Measure real position and size using getBoundingClientRect or platform equivalent.
3. Create or reuse an absolutely positioned overlay.
4. Set overlay to exact card position, size, and border-radius.
5. Hide original card with opacity 0 but keep it in layout.
6. Begin 600ms ease-in-out morph.
7. Fade mini content out in first 35%.
8. Fade detail content in after 50%.
9. Fade close control in after 75%.
10. End with full target size and details visible.
```

### Collapse sequence

```text
1. User taps close or back.
2. Read current overlay position.
3. Begin 450ms ease-in-out morph back to original card position and size.
4. Fade detail content out in first 40%.
5. Shrink overlay.
6. Fade original card in after 75%.
7. End with overlay hidden and original card visible.
```

### Platform notes

| Platform | Guidance |
|---|---|
| Web | Use one absolutely positioned overlay on stage/body; animate left/top/width/height/border-radius in requestAnimationFrame for frame-accurate control; use opacity transitions inside overlay. |
| React Native | Use Reanimated shared element transitions, measureInWindow, withTiming(600) for expand and withTiming(450) for collapse. |
| SwiftUI | Use matchedGeometryEffect and `.easeInOut(duration: 0.6)`. |
| Jetpack Compose | Use SharedTransitionLayout, animateContentSize or animateEnterExit with tween(600) and tween(450) for collapse. |

If code approximation is required, `cubic-bezier(0.4, 0, 0.2, 1)` can approximate shared expand ease-in-out. State that this is an approximation.

### Reduced motion

Remove position and size animation. Crossfade card to expanded state in 200ms ease-out; crossfade back in 160ms ease-in; final target size appears immediately.

### Card expand do and don't

| Do | Do not |
|---|---|
| Measure card position at tap time. | Hardcode a start position. |
| Animate left, top, width, height, and border-radius together. | Use transform scale on web card morphs. |
| Keep original card in layout with opacity 0. | Remove or collapse the original card from layout. |
| Fade mini content out early. | Show mini and detail content at the same time. |
| Fade detail content in late, after 50%. | Reveal detail before the shape is large enough. |
| Restore original card after 75% of collapse. | Snap original card back only at the very end. |
| Collapse border-radius to 0 for full page. | Keep rounded corners on a full-screen expand. |
| Allow half, large, and full targets. | Force all cards to expand to the same size. |

| Card type | Recommended target | Reason |
|---|---|---|
| Policy summary card | Large sheet or full page | Full policy details need space. |
| Claim status card | Large sheet | Claim steps, documents, and timeline need room. |
| Renewal reminder card | Large sheet | IDV, add-ons, and price breakdown need room. |
| Quote plan card | Half screen or large sheet | Plan comparison should stay in context. |
| Add-on card | Half screen | Quick detail without leaving the flow. |
| Document upload card | Full page | Document preview requires full screen. |

## Popup and menu transitions

Default values:

| Property | Value |
|---|---|
| Direction | From source position |
| Opacity | 0% to 100% |
| Distance | 8-16px |
| Duration | 180-320ms depending on size |
| Ease | ease-out for enter, ease-in for exit |

| Trigger position | Menu behavior |
|---|---|
| Button near top | Menu opens downward from button. |
| Button near bottom | Menu opens upward if needed. |
| Right-side trigger | Menu opens from right. |
| Left-side trigger | Menu opens from left. |
| Center trigger | Menu fades/scales from center. |

Avoid menus appearing from unrelated directions.

## Surface enter and exit

| Surface | Enter | Exit | Ease |
|---|---:|---:|---|
| Tooltip | 180-240ms | 140-200ms | enter ease-out, exit ease-in |
| Dropdown | 240-320ms | 180-240ms | enter ease-out, exit ease-in |
| Toast | 240-300ms | 180-240ms | enter ease-out, exit ease-in |
| Modal | 500-600ms | 350-450ms | enter ease-out, exit ease-in |
| Drawer | 500-600ms | 350-450ms | enter ease-out, exit ease-in |
| Bottom sheet | 500-600ms | 350-450ms | enter ease-out, exit ease-in |

## Component transition rules

| Component | Motion |
|---|---|
| Button | Scale press plus color/shadow transition. |
| Input | Border/ring transition plus helper text fade. |
| Dropdown | Opacity plus source-aware translate. |
| Accordion | Chevron rotation plus content reveal. |
| Card | Reveal, tap feedback, origin-aware expand if it becomes a detail view. |
| Modal | Backdrop fade plus center/surface open. |
| Bottom sheet | Bottom-up surface transition or sheet-to-page continuation. |
| Toast | Opacity plus small y movement. |
| Badge | Controlled pop for offers/rewards only. |

## Reduced-motion transitions

| Original | Reduced motion |
|---|---|
| Page right-to-left slide | 150-200ms crossfade or instant transition |
| Destination element y reveal | Opacity only; no travel; stagger 0-20ms or none |
| Source-aware slide | Fade from source area without movement |
| Card expand | Instant layout plus 200ms fade-through |
| Bottom sheet to page | 200ms crossfade |
| Badge pop | Static badge plus fade |
| Bottom sheet movement | Opacity only or instant |

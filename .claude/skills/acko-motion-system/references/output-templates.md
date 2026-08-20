# Output Templates

## Compact single-motion spec

Use this for most answers:

```markdown
## [Motion name]

| Property | Value |
|---|---|
| Acko use case | [where it appears] |
| Duration | [duration] |
| Frames at 60fps | [frames] |
| Ease type | [ease-out/ease-in/ease-in-out/linear] |
| Velocity | [100 to 0 / 0 to 100 / 0 to 100 to 0 / constant] |
| Ease value | [out/in percentages] |
| Trigger | [tap/navigation/submit/upload/validation/etc.] |
| Behavior | [what moves, fades, scales, or changes] |
| Reduced motion | [fallback] |
| Performance note | [transform/opacity etc.] |
```

## Developer handoff format

Use this when the user asks for implementation:

```markdown
### [Pattern name]
Purpose: [why the motion exists]
Trigger: [tap, navigation, submit, upload, validation, etc.]
Duration: [duration]
Frames: [frames at 60fps]
Ease: [ease type]
Velocity: [velocity logic]
Ease values: [out/in percentages]
Properties: [transform y, transform x, opacity, scale, stroke, size, radius, etc.]
Start state: [values]
End state: [values]
Reduced motion: [fallback]
Performance: [implementation-safe notes]
```

## Library, audit, or guideline chart

```markdown
| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value | Behavior |
|---|---|---:|---:|---|---|---|
| ... | ... | ... | ... | ... | ... | ... |
```

## Ready examples

### Bottom sheet open

Purpose: reveal plan options, add-ons, filters, or document actions without leaving the current flow.

| Property | Value |
|---|---|
| Trigger | Tap on a temporary surface control |
| Duration | 500-600ms, default 550ms |
| Frames | 30-36 frames, default 33 |
| Ease | ease-out |
| Velocity | 100 to 0 |
| Ease values | out 50%, in 40% |
| Behavior | Sheet y 100% to 0%; overlay opacity 0% to 35-40% |
| Reduced motion | Fade in or instant open |
| Performance | Transform and opacity only |

### Page transition logic

Choose navigation source before timing:

```text
Use right-to-left for normal forward route or next step without a strong source object.
Use card expand when a tapped card, tile, list item, policy, claim, plan, renewal, or add-on becomes the destination.
Use bottom sheet animation to page when the current sheet becomes a full-page task or detail view.
Do not combine right-to-left page push with card expand or sheet-to-page.
```

### New page right-to-left

Purpose: move forward in quote, policy, payment, or claim flow.

| Property | Value |
|---|---|
| Duration | 500-600ms, default 550ms |
| Frames | 30-36 frames, default 33 |
| Ease | ease-out |
| Velocity | 100 to 0 |
| Ease values | out 50%, in 40% |
| Page behavior | Incoming page x 100% to x 0% |
| Destination elements | y +12-24px to 0, opacity 0% to 100% |
| Element reveal | 260-340ms, default 300ms |
| Stagger | 50-60ms top-to-bottom, default 56ms |
| Reduced motion | Remove x/y travel and use short opacity transition |
| Performance | Animate transform x, transform y, and opacity |

### Bottom sheet to page

Purpose: continue a sheet-origin interaction into a full-page task without losing context.

| Property | Value |
|---|---|
| Trigger | Sheet action opens payment detail, document upload, support ticket, add-on detail, or plan detail |
| Duration | 500-600ms for simple upward motion or 500-650ms for sheet size/radius morph |
| Ease | ease-out for simple upward motion; ease-in-out for size/radius morph |
| Velocity | 100 to 0 upward; 0 to 100 to 0 morph |
| Start state | Sheet at current bottom-sheet position, overlay visible, page content hidden |
| End state | Sheet/page at y 0 and full-page height, radius 0 if true page, overlay 0% |
| Reduced motion | 200ms crossfade |

### Card expand to page

Purpose: preserve continuity between a policy/claim card and its detail page.

| Property | Value |
|---|---|
| Trigger | User taps a card |
| Duration | 500-650ms, default 600ms |
| Frames | 30-39 frames, default 36 |
| Ease | ease-in-out |
| Velocity | 0 to 100 to 0 |
| Ease values | out 50%, in 40% |
| Behavior | Animate measured position, size, corner radius, and content opacity |
| Start state | Exact measured card position and size |
| End state | Target page/container position and size |
| Reduced motion | Fade through from card to detail page |

### Error field shake

Purpose: localize the problem and guide correction without alarming the user.

| Property | Value |
|---|---|
| Trigger | Invalid input or failed validation |
| Duration | 200-260ms, default 240ms |
| Frames | 12-16 frames, default about 14 |
| Ease | ease-in-out |
| Velocity | 0 to 100 to 0 |
| Ease values | out 50%, in 40% |
| Behavior | Move only the field or local error area, not the whole screen |
| Reduced motion | Remove shake; use border and error text only |
| Performance | Transform x and opacity |

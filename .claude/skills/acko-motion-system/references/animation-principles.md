# Animation Principles

## Purpose

This page adapts classic animation principles into Acko UI motion. The goal is not cartoon animation. The goal is useful, calm product behavior for insurance journeys.

Acko motion should create clarity, confidence, continuity, safety, and control.

## Principles adapted for Acko

| Principle | Acko interpretation |
|---|---|
| Squash and stretch | Use subtle press scale only. |
| Anticipation | Add small cues before action, like hover or drag handle affordance. |
| Staging | Animate the most important thing first. |
| Pose to pose | Define clear component states. |
| Follow-through | Use short, purposeful stagger based on the active pattern. |
| Slow in / slow out | Use the custom ease-out, ease-in, and ease-in-out influence values. |
| Arcs | Use rarely, mostly for gestures or illustration. |
| Secondary action | Support the main action without distraction. |
| Timing | Match speed to importance, size, and risk. |
| Exaggeration | Use only for offers, rewards, or local correction. |
| Solid drawing | Keep layout, depth, hierarchy, and source relationship stable. |
| Appeal | Make motion feel polished, calm, and premium. |

## 1. Squash and stretch -> tactile compression

Use for:

- button press
- chip selection
- toggle interaction
- card tap feedback

Acko rule:

```text
Scale: 0.97-0.99
Duration: 80-100ms press, 120-160ms release
Ease: ease-out, velocity 100 to 0, out 50%, in 40%
```

Do not make buttons, cards, or forms feel rubbery.

## 2. Anticipation -> prepare the user

Use for:

- hover state before click
- drag handle hint
- expandable card affordance
- CTA arrow nudge

Acko rule: anticipation should guide, not tease. Avoid anticipation in serious error, payment failure, rejection, or security states.

## 3. Staging -> one clear focus

Use for:

- claim status
- payment result
- policy validity
- required action
- error correction
- next-page destination reveal

Acko rule: animate the most important thing first. Do not animate header, cards, illustration, CTA, and badges all at once.

## 4. Pose to pose -> defined UI states

Define clear states for every animated component.

```text
default -> hover -> pressed -> loading -> success/error
```

Use for buttons, form validation, card expansion, progress steps, and loading-to-loaded states.

## 5. Follow-through -> purposeful stagger

Use stagger to guide the eye, not delay the task.

| Context | Stagger |
|---|---:|
| Right-to-left destination page reveal | 50-60ms |
| List/group reveal | 40-60ms |
| Sensitive or urgent state | 0-20ms |

Use for:

- destination page reveal
- dashboard cards
- claim timeline
- policy benefit list

Do not create long cascading animations that delay content.

## 6. Slow in / slow out -> custom easing

Use the custom easing logic:

```text
ease-out: 100 to 0, out 50%, in 40%
ease-in: 0 to 100, out 40%, in 50%
ease-in-out: 0 to 100 to 0, out 50%, in 40%
linear: constant, 0% influence, only for mechanical/real-time/direct gesture motion
```

Avoid linear motion except for progress, shimmer, spinners, timers, and direct finger follow.

## 7. Arcs -> natural path only when useful

Use arcs only for gestures, small illustration moments, or reward icon paths. Most product UI should move in simple, straight, logical directions.

## 8. Secondary action -> quiet support

Use secondary motion for:

- icon color change with button press
- shadow change with card hover
- helper text fade with validation
- progress label update
- mini content fade during card expand

Secondary motion must never compete with important insurance information.

## 9. Timing -> hierarchy and urgency

| Context | Timing |
|---|---:|
| Tap press | 80-100ms |
| Tap release | 120-160ms |
| Field state | 160-220ms |
| Card/list reveal | 240-340ms |
| Page open | 500-600ms |
| Page close/back | 350-450ms |
| Surface open | 500-600ms |
| Surface close | 350-450ms |
| Shared expand | 500-650ms |
| Success | 600-800ms |
| Local error | 200-260ms |
| Illustration | 1000-1600ms |

Urgent and sensitive tasks should be clearer, not more animated.

## 10. Exaggeration -> rare emphasis

Allowed:

```text
Offer badge pop
Reward reveal
Coupon applied
Small success check
Local field error shake
```

Not allowed:

```text
Full-screen shake
Error bounce
Payment failure celebration
Claim rejection animation
Endless offer pulse
Heavy confetti
Funny reaction for serious states
```

## 11. Solid drawing -> stable spatial logic

In UI, this means preserving:

- layout
- hierarchy
- depth
- scale
- source-destination relationship
- measured origin for shared elements

Use stable source-aware motion for cards, popups, menus, modals, sheets, and page transitions.

## 12. Appeal -> calm polish

Acko appeal should come from:

- smoothness
- clarity
- precision
- restraint
- trust
- premium finish

Not from cartoon bounce, loud celebration, constant movement, or decorative animation.

## Serious-state restrictions

Use minimal motion for:

- claim rejection
- payment failure
- expired policy warning
- KYC failure
- OTP error
- document rejection
- cancellation
- security alert
- health or medical issue

For these states, use opacity-first motion, local correction, text clarity, and direct status feedback.

## Quality checklist

```text
[ ] The animation has a clear product purpose.
[ ] It supports clarity, progress, feedback, hierarchy, or source relationship.
[ ] It feels calm and secure.
[ ] It uses one clear focus.
[ ] It avoids bounce in serious states.
[ ] It uses the correct custom duration and easing values.
[ ] It uses the correct page transition mode.
[ ] It respects reduced motion.
[ ] It feels premium, not playful.
```

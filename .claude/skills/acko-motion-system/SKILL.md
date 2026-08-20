---
name: acko-motion-system
description: "create, critique, and document acko insurance app motion guidelines using the user's custom motion values: 500-600ms major opens, 350-450ms exits, 100 to 0 ease-out with out 50% and in 40%, 0 to 100 ease-in with out 40% and in 50%, 0 to 100 to 0 transform easing, and linear only for loaders, real progress, timers, and direct gesture follow. use when asked to specify ui animation duration, frames at 60fps, easing, after effects keyframes, bottom sheets, page transition selection logic, right-to-left page opens with bottom-to-top staggered element reveals, origin-aware card expand to page, bottom sheet to page, cards, forms, claims, payments, policy flows, loading states, accessibility, reduced motion, or developer handoff."
---

# Acko Motion System

## Purpose

Use this skill to create, critique, audit, or hand off custom Acko insurance-app motion guidance. Motion must feel calm, secure, stable, clean, premium, trustworthy, controlled, and useful. It should reduce uncertainty, explain hierarchy, communicate progress, and preserve source-to-destination continuity.

Do not claim these values are official Acko, Airbnb, Material, Fluent, iOS, or Android values. Treat them as the user's custom Acko motion system.

## Source of truth

The custom values in this package supersede older draft values. Do not use older 300-400ms page opens, 300-350ms major surface opens, 20-40ms default page stagger, or Material-style cubic-bezier token tables as source-of-truth values unless the user explicitly asks for a comparison with an older draft.

Use these non-negotiable values first:

| Rule | Value |
|---|---|
| Major open surfaces and pages | 500-600ms, 30-36 frames at 60fps |
| Major exits and back/dismiss actions | 350-450ms, 21-27 frames at 60fps |
| Ease-out | velocity 100 to 0, out 50%, in 40% |
| Ease-in | velocity 0 to 100, out 40%, in 50% |
| Ease-in-out / transform | velocity 0 to 100 to 0, out 50%, in 40% |
| Linear | only loaders, real progress, timers, and direct gesture follow |
| Right-to-left page element reveal | y +12-24px to 0, opacity 0% to 100%, 260-340ms, 50-60ms top-to-bottom stagger |
| Origin-aware card expand | 500-650ms, 30-39 frames, ease-in-out, measured from exact source card position |

## Required workflow

1. Identify the UI pattern: page, sheet, modal, card, form, control, loader, claim, payment, document, alert, success, or error.
2. If it is page navigation, choose the transition mode first: right-to-left page, origin-aware card expand, or bottom sheet to page.
3. Choose the motion token and timing from `references/curves.md`.
4. Add behavior details from the correct page: transitions, physics, pattern library, accessibility, or animation principles.
5. State duration, frames at 60fps, ease type, velocity, ease values, trigger, behavior, reduced-motion fallback, and performance notes.
6. For After Effects, give speed and influence values, not generic bezier guesses.
7. For code, keep the same timing and easing logic; prefer transform and opacity.

## File structure

Load only the page needed for the request.

- `references/home.md`: tone, core rules, risk levels, source-aware decisions, journey decisions, and motion generator schema.
- `references/curves.md`: frame conversion, master tokens, duration ranges, easing rules, After Effects values, and reduced-motion timing.
- `references/physics.md`: distance, scale, opacity, intensity, content timing, reduced-motion physics, accessibility, safety, performance, and Lottie/vector guidance.
- `references/transitions.md`: page transition selection, right-to-left page opens, destination element reveal, bottom sheet to page, origin-aware card expand, source-aware popups, menus, and surface transitions.
- `references/pattern-library.md`: implementation-ready motion rows for navigation, surfaces, buttons, cards, forms, controls, quote, payments, claims, documents, alerts, success, error, empty states, and loading.
- `references/animation-principles.md`: classic animation principles translated into calm insurance-product motion.
- `references/output-templates.md`: compact spec, developer handoff, audit chart, and ready examples.

## Non-negotiable Acko rules

- Keep motion calm, secure, stable, and useful.
- Use motion only when it clarifies feedback, status, progress, hierarchy, navigation, or source relationship.
- Major opens use 500-600ms; major exits use 350-450ms.
- Page navigation must choose a mode before timing: right-to-left, card expand, or bottom sheet to page.
- Right-to-left page opens reveal destination elements bottom-to-top with 50-60ms visual stagger.
- Popups, menus, cards, and temporary surfaces must animate from their trigger/source direction.
- Sensitive insurance states use minimal opacity-first motion and local correction only.
- Never use bounce, confetti, full-screen shake, flashing, alarm pulse, or funny reactions for serious states.
- Use semantic motion tokens instead of random hardcoded values.
- Always provide reduced-motion behavior.

## Default output style

Prefer compact tables, token blocks, component recipes, and clear do/don't rules. For a single motion, use:

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
| Behavior | [what moves, fades, scales, or changes] |
| Reduced motion | [fallback] |
| Performance note | [transform/opacity etc.] |
```

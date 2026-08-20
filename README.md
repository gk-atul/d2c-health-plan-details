# d2c-health-plan-details

Push designs directly into ACKO's codebase: wireframe → (optional) Figma refinement → code.

## What's here

```
.claude/skills/
├── acko-design-system/   # SKILL.md + tokens (primitives → semantics → components),
│                         # typography, layout, cards, forms, iconography, a11y, perf
└── acko-motion-system/   # animation principles, curves, transitions, pattern library
wireframes/               # drop input sketches/screenshots here
```

Both skills are project-scoped (`.claude/skills`), so they only activate inside this folder
until we point this project at a real ACKO repo.

Scaffold (`package.json`, `.npmrc`, Vite/TS config, `src/`) is copied from
[ACKO-component-source](https://github.com/ramnan10118/ACKO-component-source), and
`node_modules/@acko/*` (30 packages, incl. `@acko/icons` and `@acko/tokens`, v3.0.4) is
installed live from the internal Nexus registry (`nexus-dev.acko.in`) — requires ACKO Dev VPN
to reinstall (`npm install`).

## Workflow

1. Drop a wireframe (hand sketch, screenshot, or Figma export) into `wireframes/`.
2. Ask Claude Code to build the screen. `acko-design-system` auto-triggers on UI work
   (components, layout, forms, animations, copy tone, a11y) and enforces:
   - 3-layer tokens only — never hardcode a value or skip a layer
   - real `@acko/*` imports only (e.g. `import { Button } from "@acko/button"`) — no inventing components
   - real `@acko/icons` only — no Lucide/Heroicons/inline SVG
   - clear copy over clever copy
3. `acko-motion-system` kicks in for anything animated (transitions, loading states, micro-interactions).
4. `npm run dev` to preview the screen against real components.

## Status

- Figma's Dev Mode MCP is connected — see `DESIGN-SYSTEM-BUGS.md` and
  `missing-components-plan-details.md` for how it's been used so far.
- First screen built end-to-end: `src/screens/PlanDetails.tsx` — full state handling
  (loading/error/offline), responsive across mobile/tablet/desktop, 6 confirmed
  design-system bugs found and logged for the design-systems team.

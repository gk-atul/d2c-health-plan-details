# d2c-health-plan-details

The Plan Details screen for ACKO's D2C health insurance purchase flow — a selected plan's
coverage, waiting-period and health-evaluation notices, a plan-comparison entry point, and
premium pricing. Built against ACKO's real `@acko/*` component library, not a mockup.

## Screen

`src/screens/PlanDetails.tsx` — "Platinum Lite Health Plan":

- **Hero** — plan illustration, name, sum insured, and covered members
- **Covered / not covered** — toggle between the plan's inclusions and exclusions
- **What to know before you buy** — waiting-period and health-evaluation notices
- **Plan comparison** — entry point into comparing this plan against others
- **Premium details** — sum insured, discounted premium, price-breakdown link
- **Full state handling** — loading (skeleton), error, offline (with auto-recovery), and a
  fallback if the hero illustration fails to load
- **Responsive** — scales across mobile, tablet, and desktop

## Run it

```bash
npm install   # requires ACKO Dev VPN — pulls @acko/* from the internal Nexus registry
npm run dev
```

## Also in this repo

- [`DESIGN-SYSTEM-BUGS.md`](./DESIGN-SYSTEM-BUGS.md) — 7 confirmed bugs in the installed
  `@acko/*` design system, found while building this screen, written up for the
  design-systems team.
- [`missing-components-plan-details.md`](./missing-components-plan-details.md) — every
  component substitution/decision made building this screen, including ones later reverted
  based on design feedback.
- [`RETRO-plan-details.md`](./RETRO-plan-details.md) — bug retrospective for this screen.
- [`component-index.md`](./component-index.md) — generated list of every real installed
  `@acko/*` component, regenerate with `scripts/generate-component-index.sh`.

# Retro — PlanDetails.tsx bugs

Full re-audit of the page as built so far, checked live (computed sizes, actual click
handlers, console), not by re-reading the source and assuming it's fine. Grouped by
whether each item was already known, or is new to this pass.

---

## Still open (found earlier, not yet resolved)

### 1. Premium pricing reads as a hike, not a discount — RESOLVED
Real figure provided: `₹8,000` struck through, `₹5,090/month` current — now a genuine
discount, not an apparent hike. Verified live, no console errors.

### 2. No exact icon exists for 3 of the "not covered" rows
`Family` (maternity), `Airplane` (treatment outside India), `Medicine` (outpatient) are the
closest available `@acko/icons` entries — none are exact semantic matches, confirmed by
searching the full icon set. Accepted as best-available with your sign-off, but still worth
noting: if a real illustration exists for these (like the hero shield we swapped in), it
should replace these placeholders too.

### 3. Three confirmed upstream design-system bugs, worked around locally
`@acko/card`'s radius token, `typography.md`'s dead API, `@acko/alert`'s warning-token — all
logged in detail in [DESIGN-SYSTEM-BUGS.md](./DESIGN-SYSTEM-BUGS.md). Our fixes are local
overrides in this project only; the actual packages are still broken for anyone else building
against them.

---

## New in this retro

### 4. Toggle tap targets are 40px, under the 44px minimum
`ToggleGroupItem` ("What's covered" / "What's not covered") measures **40px tall** live.
`touch-accessibility.md` requires a 44px minimum on all interactive elements. This is a real
component-sizing issue, not something we can fix by changing our own markup — `ToggleGroup`
doesn't expose a size override for this. Needs either an app-level CSS override or an upstream
fix to `@acko/toggle`.

### 5. Every secondary "interactive" element on the page does nothing when tapped
Checked every `<button>` on the page for an actual click handler. Confirmed **zero** of the
following have one:
- "View all covers"
- "See how your coverage unlocks"
- "Why is this important?"
- "See details"
- The full-width "See what makes our plan better..." teaser row

They all look tappable — cursor affordance, brand-colored text, a trailing chevron in some
cases — and none of them go anywhere or do anything. This was true from the first version of
this screen; flagging now because a full retro should say so plainly rather than let a
polished-looking screen imply it's more finished than it is.

### 6. Three of those inert elements also fail the tap-target minimum on size alone
"See how your coverage unlocks," "Why is this important?," and "See details" each measure
**24px tall** — even if wired up tomorrow, they'd still fail `touch-accessibility.md`'s 44px
rule. Fixing #5 (adding handlers) does not fix this; the tap area itself needs to grow
independently of adding behavior.

### 7. No hover/press feedback exists on any custom element
The original brief asked explicitly for "hover/press feedback" as one of the states to add.
`@acko/toggle` and `@acko/button` handle this internally for the components that use them,
but every custom element we built (`InfoCard`'s links, the teaser row) has no pressed/hover
state at all — a tap looks and feels identical to doing nothing.

### 8. Coverage-list chevron rows imply an action that isn't there
Confirmed each row is a plain `<div>` — not a `<button>`, no `role`, no click handler. That's
actually *correct* accessibility-wise (a screen reader won't announce something as
interactive that genuinely isn't), so this isn't an a11y bug. But visually, a trailing chevron
is a well-established "tap for detail" signal, and here it signals nothing. This is a content/
UX bug, not a code bug — the fix is either wiring these to a real detail view, or removing the
chevron so the row stops implying an action.

---

## Scope gap, not a bug — flagging for completeness

### 9. Sections below "Premium details" were never built
An earlier reference screenshot in this project showed a "Savings and offers" block, a "Got
questions? Find answers" FAQ card, and a sticky bottom CTA bar ("Customise this plan" / "See
other plans") — all below the Premium details card. None of that exists in the current
`PlanDetails.tsx`; the page stops at the premium card. Not logging this as a bug since it may
simply be out of scope for this pass, but a "full retro" should say so rather than let the
page look complete when a chunk of the original reference isn't there yet.

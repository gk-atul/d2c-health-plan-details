## QuizOptionTile
- **Type:** VARIANT-GAP
- **Screen:** discover-quiz (`/quiz/:quizId` — each question's four answer choices)
- **What it is:** a tap-to-instantly-answer option tile. Tapping it submits the answer
  immediately (no separate "Check" step, matching the Duolingo-style interaction requested) and
  needs per-option color-coding once answered: the tapped option turns green (correct) or red
  (incorrect), and if incorrect, the actually-correct option is separately revealed in green at
  the same time.
- **Closest @acko component:** `RadioGroup` (`@acko/radio`)
- **Why it didn't fit:** `RadioGroup`'s real API (`label`, `options`, `value`, `onChange`,
  `error?: boolean`) only has one group-level error flag — it can't mark one specific option
  green while another is red simultaneously, which this needs the instant an answer is picked.
  `Button` has the same gap: no variant expresses a per-instance "this one was right/wrong"
  state. Checked `cards.md`'s 43-pattern catalog for a quiz/poll/answer-option pattern first —
  nothing documented.
- **Props sketch:** `{ option: { id: string; label: string }; state: "neutral" | "correct-selected" | "incorrect-selected" | "correct-reveal" | "muted"; onSelect: () => void }` — a plain `<button>`, real semantic status tokens for the state colors (`--statusSuccessBase/Subtle`, `--statusErrorBase/Subtle`, `--borderDefault`, `--cardFillDefault` for the neutral/muted fill), real `Typography` for the label, real `Tick`/`Close` icons for the correct/incorrect marker.
- **Reuse potential:** HIGH — every quiz question across all 5 quizzes uses it; any future
  Discover quiz reuses the same component unchanged.

## Bug (my error): reused `--surfaceStaticWhite` as a plain white card background
- **What happened:** first pass at `QuizOptionTile`'s neutral/unanswered state used
  `background: var(--surfaceStaticWhite)`, expecting a clean white tile matching every other
  card-like surface in the app. It rendered visibly gray instead.
- **Root cause:** `--surfaceStaticWhite` resolves to `#efeff0` (confirmed live via
  `getComputedStyle`: `rgb(239, 239, 240)`) — a light gray, not white. `semantics.md`/the
  design-system's own documentation is explicit about this: it's meant for "dark mode relief,
  use sparingly in light mode," not a general-purpose light-mode card fill. I'd seen this same
  token used for other small floating dev/utility elements earlier in this project (the DEV
  status panel, the sticky "Learn more" button) where a light-gray tint happened to look
  reasonable by coincidence, and reused it here without re-checking — exactly the kind of
  "looks right by name" mistake this project's whole methodology is built to catch.
- **Fix:** switched to `--cardFillDefault` — the same token real `Card` components use for
  their own background (traced: `--cardFillDefault` → `--surfaceFillCard` → `--solidGreyWhite`
  in light theme) — so these tiles are now visually consistent with every other real Card
  surface in the app, not just "some light color."
- **Also fixed:** the tile is a bare `<button>`, not the real `Button` component, so it kept the
  browser's native button chrome (`appearance: button` — confirmed via `getComputedStyle`,
  never reset). Added `appearance-none`.

## Component sourcing rules

You are building ACKO product screens using the `@acko/*` component library. Follow these rules for every UI element you build:

### 1. Always try the library first
Before writing any custom UI, check whether an `@acko/*` component covers it. The available components are: Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Calendar, Card (+ CardHeader/CardContent/CardFooter), Checkbox, Dropdown, Field, InputGroup, Label, NavigationWizard, Pagination, Progress, RadioGroup, ScrollArea, Separator, Skeleton, Switch, Table, Tabs, TextInput, Textarea, Toggle, Tooltip, Typography. Import from the specific package (e.g. `import { Button } from "@acko/button"`) — never from `@acko/ui`.

### 2. When no library component fits, build it — then log it
If the screen needs something the library doesn't have (e.g. a price slider, plan card, stepper carousel, sticky price footer, chat bubble), go ahead and build it as a local custom component. **Immediately after creating it, append an entry to a log file at the project root named:**

```
missing-components-<pagename>.md
```

`<pagename>` is your screen's slug from the assignment sheet, without the number prefix — e.g. screen `20-customise-sum-insured.jpg` → `missing-components-customise-sum-insured.md`. One file per page; create it on the first custom component and append after that. Never skip the log entry, and never batch it for later — log at the moment you build.

### 3. Log entry format
Each entry in the file must follow this template:

```markdown
## <ComponentName>
- **Type:** MISSING | VARIANT-GAP
- **Screen:** <pagename> (<screenshot file>)
- **What it is:** one sentence describing the element and where it appears on screen.
- **Closest @acko component:** <name, or "none">
- **Why it didn't fit:** what the existing component lacks (or "no comparable component exists").
- **Props sketch:** the prop interface you gave the custom component.
- **Reuse potential:** LOW | MEDIUM | HIGH — would other ACKO screens likely need this?
```

### 4. MISSING vs VARIANT-GAP
- **MISSING** — no library component comes close; you built it from scratch.
- **VARIANT-GAP** — a library component exists but you had to wrap it, override its styles, or recreate it because it lacks a needed variant, size, or state (e.g. Button exists but no loading state; Card exists but no gradient-header recipe). These matter just as much as fully missing components — log them.

### 5. What NOT to log
- Plain layout containers (flex/grid wrappers) with no visual identity of their own.
- One-off spacing/typography tweaks done through tokens.
- Compositions that are purely existing @acko components arranged together.

### 6. Everything else still applies
Custom components must still use semantic color tokens only (no raw hex, no primitive tokens), pass ACKO ESLint with zero errors, and match the screenshot at 360–430px viewport.

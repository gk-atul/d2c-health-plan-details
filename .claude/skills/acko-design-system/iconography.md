---
description: Icon usage guidelines — the @acko/icons package, arrow vs chevron semantics, sizing, placement, and anti-patterns
alwaysApply: true
---
# Iconography

Rules for consistent, semantically correct icon usage across all ACKO products.

## Icon Library — `@acko/icons` only

**All icons must come from `@acko/icons`.** Do not use any other icon library (no Lucide, no Heroicons, no FontAwesome, no inline SVGs). Do not hand-write SVG markup.

```tsx
import { ArrowRight, Phone, Tick, Coverage, Claim } from "@acko/icons";
```

If an icon you need does not exist in `@acko/icons`, stop and pick the closest available alternative. Do not fall back to another library or a raw `<svg>` element.

## Available Icons (canonical list)

All icons ship as named React components from the `@acko/icons` package. Key icons available:

### Navigation & UI
`ArrowRight` · `ArrowLeft` · `ArrowUp` · `ArrowDown` · `ArrowDownRight` ·
`LongArrowRight` · `LongArrowLeft` · `DoubleArrowRight` · `DoubleArrowLeft` ·
`CircleArrowRight` · `CircleArrowLeft` · `CircleArrowUp` · `CircleArrowDown` ·
`ChevronRight` · `ChevronDown` · `ChevronUp` ·
`Close` · `Plus` · `Minus` · `Edit` · `Delete` · `Download` · `Share` · `Refresh` ·
`Bookmark` · `Menu01` · `Menu02` · `Menu03` · `Magnifier` · `Pointer` ·
`Settings` · `Info` · `Exclamation` · `TriangleWarning` · `Notification` ·
`Star` · `Tick` · `Thumb3` · `Thumb4`

### Communication & Identity
`Phone` · `Phone1` · `Mail` · `Messages` · `Headphone` · `CustomerService` ·
`Profile` · `Identity` · `Fingerprint` · `FacialRecognition` · `QRcode`

### Insurance & Product
`Coverage` · `Claim` · `ClaimDocument` · `Policy` · `PolicyDocument` ·
`TheftCover` · `FireAccidentCover` · `ConsumablesCover` · `EngineProtect` ·
`ZeroDepCar` · `BikeTheftCover` · `ThirdParty` · `AddOn` · `ExtraCoverage` ·
`PersonalCover` · `PassengerCover` · `DriverCoverPaid` · `HelemetCover` ·
`PillonBikeCover` · `RatBiteCover` · `WarTerrorismCover` ·
`BikeAccident` · `CarAccident` · `CarAccidentCover` · `BrokenCarGlass` ·
`BrokenPhone` · `NonAccidentalDamage` · `Calamities`

### Vehicles
`Car` · `CarFront` · `Bike` · `Bike2` · `Scooter` · `TaxiCar` ·
`NewCar` · `NewBike` · `UsedCar` · `AddCar` · `CarAndBike` ·
`Garage` · `Garage2` · `CarService` · `Towing` · `Speedometer` · `Fuel`

### Health & Medical
`Doctor` · `Hospital` · `Medicine` · `BloodTest` · `LabTest4` ·
`HealthCheckup` · `HealthEvaluation` · `Ambulance` · `DoctorOnCall`

### Finance & Payments
`Money` · `MoneyBag` · `Wallet` · `Payment` · `UPIPayment` · `CreditCard` ·
`Bank` · `Savings` · `SaveMoney` · `Discount` · `DiscountOfferSave` ·
`Tax` · `Invoice` · `Bill` · `Reciept` · `Refund` · `Commission`

### Documents & Verification
`PolicyDocument` · `ClaimDocument` · `DocumentReceived` · `PDFFile` ·
`File` · `Folder` · `FolderOpen` · `ClipboardCheck` · `ClipboardEdit` ·
`Verify` · `Verify1` · `Lock` · `LockOpen2`

### Travel & Transit
`Airplane` · `FlightArrival` · `FlightDeparture` · `FlightCancel` · `FlightPass` ·
`Passport` · `Luggage` · `BagLost` · `BagTracking` · `DelayedArrival` ·
`CourierDelay` · `Delivery` · `Tracking`

### Misc & Utilities
`Camera` · `VideoCamera` · `Award` · `Gift` · `Flash` · `Bolt` · `Tech` ·
`Craft` · `FlipCard` · `AlarmClock` · `Alarm` · `Time` · `Stopwatch` ·
`GPS` · `Location` · `Map` · `Family` · `Child` · `Spouse` ·
`ImageMountain` · `Image` · `Images2` · `Microphone` · `Inprogress` ·
`Integration` · `Lightbulb3` · `Target` · `Layers` · `Glossary` ·
`Compare` · `CompareCars` · `MultiplePolicies` · `Products`

## Arrow vs Chevron — When to Use Each

### Arrow → "Go" / "Perform an action"

Arrows carry **kinetic meaning** — they signal momentum, directional intent, and progression to a new state.

| Context | Icon | Example |
|---------|------|---------|
| Primary CTA / submit | `ArrowRight` | `<Button variant="primary" iconRight={<ArrowRight />}>Continue</Button>` |
| Back navigation (icon-only) | `ArrowLeft` | `<Button variant="ghost" iconOnly iconLeft={<ArrowLeft />}>Back</Button>` |
| Back navigation (with label) | `ArrowLeft` | `<Button variant="ghost" iconLeft={<ArrowLeft />}>Go back</Button>` |
| Pagination next/prev | `ArrowRight` / `ArrowLeft` | Moving to a new page |
| Download / send | `Download` / `Delivery` | Action that leaves the current context |

### Chevron → "Reveal" / "Browse within context"

Chevrons are **structural** — they signal "more content here" without leaving the current context.

| Context | Icon | Example |
|---------|------|---------|
| Accordion expand/collapse | `ChevronDown` / `ChevronUp` | Toggle content visibility |
| Dropdown menu trigger | `ChevronDown` | Open a menu or select list |
| Side navigation expand | `ChevronRight` | Reveal nested nav items |
| Carousel / slider | `ChevronRight` | Browse items within a container |
| Breadcrumb separator | `ChevronRight` | Visual separator between steps |

### Decision Rule

> **Will the user leave the current context or trigger a state change?**
> - **Yes** → Arrow
> - **No, content reveals in place** → Chevron

## Icon Sizing — Container Controls Size

### Simple rule (canonical — use this first)

Pick **one** of three sizes for every standalone icon. The utility number **equals pixels** on ACKO’s 1px Tailwind scale.

| Context | Size | Utility |
|---------|------|---------|
| **Small** — next to body text, list checkmarks, inline affordances | 16px | `size-16` |
| **Normal** — card / feature tile icons | 24px | `size-24` |
| **Large** — marketing hero, section emphasis | 32px | `size-32` |

**Exceptions:** `@acko/button` and `@acko/badge` icon slots — **no** `size-*` (component CSS handles it). Pattern-specific sizes in `cards.md` (e.g. 18px, 20px) only when that § explicitly calls for them.

**When in doubt:** normal card icon → `size-24`.

Icons ship as `1em` SVGs and **`@acko/icons` v3 may not accept `className`**. Wrap standalone icons when needed:

```tsx
// ✅ size-24 — normal card tile
<span className="inline-flex size-24 shrink-0 [&_svg]:size-full" aria-hidden="true">
  <Coverage aria-hidden="true" />
</span>

// ✅ size-16 — small / list check
<span className="inline-flex size-16 shrink-0 [&_svg]:size-full" aria-hidden="true">
  <Tick aria-hidden="true" />
</span>

// ✅ size-32 — large / hero
<span className="inline-flex size-32 shrink-0 [&_svg]:size-full" aria-hidden="true">
  <Award aria-hidden="true" />
</span>

// ❌ Bare icon — inherits label text size, looks tiny in tiles
<Coverage aria-hidden="true" />

// ❌ Old Tailwind habit — 4px not 16px
<Coverage className="size-4" aria-hidden="true" />

// ❌ Never use width/height props
<Coverage width={24} height={24} />
```

### Component-owned sizing (do not set size-*)

| Context | Rule |
|---------|------|
| Button icon (`iconLeft` / `iconRight`) | inherited — `.acko-button-icon` in `@acko/css` |
| Badge icon (`icon` prop) | inherited — `.acko-badge-icon-el` in `@acko/css` |

```tsx
// ✅ No size class needed inside Button
<Button variant="primary" iconRight={<ArrowRight />}>Continue</Button>

// ❌ Do not add size class on button icons
<Button iconRight={<ArrowRight className="size-16" />}>Continue</Button>
```

## Why icons look too small (troubleshooting)

This is the most common ACKO UI bug. Two causes usually combine.

### Cause 1 — `@acko/icons` are `1em` SVGs

Icons ship as `<svg width="1em" height="1em" …>`. They scale from **parent font-size**, not from a fixed pixel size.

| Usage | Rule |
|-------|------|
| Standalone (cards, lists, hero tiles) | **Always** size the icon — `size-16` / `size-24` / `size-32` per simple rule above (wrapper if no `className` on icon) |
| Inside `@acko/button` `iconLeft` / `iconRight` | **Never** add `size-*` — `.acko-button-icon` in `@acko/css` handles it |
| Inside `@acko/badge` `icon` prop | **Never** add `size-*` — `.acko-badge-icon-el` handles it |

```tsx
// ❌ Icon inherits ~12–14px label text — looks tiny in a 48px tile
<Coverage aria-hidden="true" />

// ✅ Explicit size via wrapper (preferred when icon has no className prop)
<span className="inline-flex size-24 shrink-0 [&_svg]:size-full" aria-hidden="true">
  <Coverage aria-hidden="true" />
</span>
```

**Use the simple rule above:** `size-16` (small) · `size-24` (normal) · `size-32` (large). Other `size-{n}` only when `cards.md` specifies.

### Cause 2 — ACKO Tailwind is 1px-per-unit, not 4px

Utility **number = pixels**. Default Tailwind habits produce tiny icons:

| Written (wrong habit) | Renders | Wanted | Use instead |
|----------------------|---------|--------|-------------|
| `size-4`, `w-4`, `h-4` | 4px | 16px | `size-16` |
| `size-6`, `w-6`, `h-6` | 6px | 24px | `size-24` |
| `size-3` | 3px | 12px | `size-12` |

### Cause 3 — App overrides `--spacing`

If `index.css` redefines Tailwind `--spacing` after `@acko/tokens`, packaged `@acko/css` (including button icon sizing) desyncs. **Do not override** — see `SKILL.md` → Tailwind spacing and `@acko/tokens`.

### Pre-ship icon audit

- [ ] Every standalone icon follows the **simple rule**: `size-16` (small) · `size-24` (normal) · `size-32` (large) — or pattern-specific size from `cards.md`
- [ ] No bare `<Icon />` without a size class outside Button/Badge
- [ ] No `size-3`, `size-4`, `w-5`, `h-6` used for icon dimensions
- [ ] Button/badge icons have **no** `size-*` className
- [ ] No raw `<svg>` or non-`@acko/icons` imports

## Icon Placement

| Position | Meaning | Prop |
|----------|---------|------|
| Leading (left) | Reinforces the label — describes *what* | `iconLeft` |
| Trailing (right) | Indicates direction — describes *where* | `iconRight` |

- **CTA buttons**: arrow on the **right** (`iconRight`) — it points where you're going
- **Back buttons**: arrow on the **left** (`iconLeft`) — it points where you came from
- **Destructive actions**: icon on the **left** (`iconLeft`) — icon reinforces the label

## Accessibility

- Always add `aria-hidden="true"` on **decorative** icons (icons that add no information beyond the label)
- Icons used **without a label** (icon-only buttons) must have `aria-label` on the button, not the icon

```tsx
// Decorative — icon adds no new info beyond the button label
<Button iconRight={<ArrowRight aria-hidden="true" />}>Continue</Button>

// Icon-only — label lives on the button
<Button variant="ghost" iconOnly iconLeft={<Close aria-hidden="true" />} aria-label="Close dialog" />
```

## Anti-Patterns

| Don't | Do |
|-------|-----|
| Import from any library other than `@acko/icons` | `import { ... } from "@acko/icons"` only |
| Write raw `<svg>` markup inline | Use the named component from `@acko/icons` |
| Set `width` / `height` props on an icon | Use `className="size-{n}"` |
| Use `ChevronRight` on a primary CTA button | Use `ArrowRight` — it's an action, not a reveal |
| Use `ArrowDown` for accordion toggle | Use `ChevronDown` — it's an expand, not navigation |
| Use `ArrowRight` for dropdown trigger | Use `ChevronDown` — it opens a menu in place |
| Add `size-*` className to icons inside `@acko/button` | Let the button CSS layer handle icon size |
| Decorative icon without `aria-hidden="true"` | Always hide decorative icons from screen readers |
| Use old 4px-base sizing (`size-3`, `size-4`, `w-6`, `h-6`) | Use `size-12`, `size-16`, `size-24` — the number is the pixel value |
| Render bare `<Icon />` outside Button/Badge | Always add `className="size-16"`, `size-24`, or `size-32` per sizing table |

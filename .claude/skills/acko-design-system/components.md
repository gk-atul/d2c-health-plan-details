# ACKO Umbrella DS — Component Tokens

> **Layer 6 of 6.** One token per component role. Single `Value` mode — Light/Dark resolves automatically through the alias chain (Component → Semantics → Brand → Primitives). Never holds raw values or Primitives references directly.

**Source of truth:** `@acko/tokens@2.0.3` → `tokens.css` (Component Tokens section).

---

## The rule

Every component token is exactly one alias to a **Semantics** token (for color) or a **Foundations** token (for spacing/radius/elevation). No per-mode entries. No RGB literals. No skipping to Brand or Primitives.

```
Figma path                    CSS var                         Alias chain
button/fill/primaryDefault → --buttonFillPrimaryDefault  →  --fillBrand → --brandPrimary → --solidPrimary600
inputField/fill            → --inputFieldFill            →  --surfaceFillInput → --solidGreyWhite
card/fill/default          → --cardFillDefault           →  --surfaceFillDefault → --solidGrey50
```

**Legacy `--color*` component tokens are removed in v2.0.3.** Always use the component-scoped names below.

---

## Naming convention

```
Figma path                      CSS var (camelCase, no slashes)
{component}/{role}              e.g. buttonFillPrimaryDefault
{component}/{role}{State}       e.g. buttonFillPrimaryHover
{component}/{subgroup}/{role}   e.g. alertInfoSurface
```

- Figma uses `/` grouping; CSS uses camelCase with component prefix
- Never embed color words (`purple`, `green`) — embed role words (`brand`, `danger`, `selected`)

---

## All component tokens (Figma → CSS var)

### accordion/
`--accordionBodyText` · `--accordionBorder` · `--accordionFill` · `--accordionIcon` · `--accordionTitleText` · `--accordionTitleHover` · `--accordionTitleDisabled`

### alert/
`--alertBodyText`

Per severity — maps to `--alert{Severity}{Role}`:
`--alertErrorSurface` · `--alertErrorBorder` · `--alertErrorText` · `--alertErrorIcon`
`--alertInfoSurface` · `--alertInfoBorder` · `--alertInfoText` · `--alertInfoIcon`
`--alertSuccessSurface` · `--alertSuccessBorder` · `--alertSuccessText` · `--alertSuccessIcon`
`--alertWarningSurface` · `--alertWarningBorder` · `--alertWarningText` · `--alertWarningIcon`

### avatar/
`--avatarFill` · `--avatarText` · `--avatarStatusOnline` · `--avatarStatusOffline` · `--avatarStatusAway`

### badge/
`--badgeCountText`

Per hue — `--badge{Hue}{Role}` (Hue = Purple, Green, Blue, Orange, Pink, Gray, Black):
`Fill` · `Icon` · `Text` · `GradientFrom` · `GradientTo` · `Border` · `Outline` · `CounterFill`

_(Black has no border/outline/counter/gradient leaves)_

### breadcrumb/
`--breadcrumbText` · `--breadcrumbLink` · `--breadcrumbLinkHover` · `--breadcrumbCurrent` · `--breadcrumbSeparator`

### button/
**Fill:** `--buttonFillPrimaryDefault/Hover/Active/Disabled` · `--buttonFillSecondaryDefault/Hover/Active/Disabled` · `--buttonFillGhostDefault/Hover/Active/Disabled` · `--buttonFillInvertedDefault/Hover/Active/Disabled` · `--buttonFillDangerDefault/Hover/Active/Disabled`

**Border:** `--buttonBorderSecondaryDefault/Disabled` · `--buttonBorderDefaultGradientTop/Bottom` · `--buttonBorderDangerTop/Bottom`

### calendar/
`--calendarBorder` · `--calendarDayLabel` · `--calendarDateDefault` · `--calendarDateOutOfMonth`
`--calendarSelectedBg` · `--calendarSelectedText` · `--calendarRangeBand` · `--calendarRangeBg` · `--calendarRangeText`
`--calendarHoverBg` · `--calendarCellHoverBg` · `--calendarTodayText`

### card/
**Fill:** `--cardFillDefault` · `--cardFillHighlight` · `--cardFillHover` · `--cardFillDisable` · `--cardFillGhost` · `--cardFillStaticWhite` · `--cardFillStaticBlack`
**Border:** `--cardBorderDefault` · `--cardBorderDisable` · `--cardBorderBrand`

**`@acko/card` + `@acko/css@2.0.6` variant mapping:** Primary and secondary both use `--cardFillDefault` + `--cardBorderDefault`. Primary adds `--shadowXs` only. `--cardFillHighlight` is **not** used for card fill or border. If `--cardBorderDefault` resolves too grey vs Figma (`#ffffff`), fix the token alias in `@acko/tokens`, not `card.css`.

### surface/ (component tokens for `@acko/surface`)
**Fill:** `--surfacePrimaryBg` · `--surfaceSecondaryBg`
**Border (token only — not applied in shipped CSS):** `--surfacePrimaryBorder` · `--surfaceSecondaryBorder`

**`@acko/surface` variant mapping (shipped CSS):**

| `variant` | Fill token | Shadow |
|---|---|---|
| `"primary"` | `--surfacePrimaryBg` → `--surfaceFillDefault` | none |
| `"secondary"` | `--surfaceSecondaryBg` → `--surfaceFillSubtle` | `--shadowXs` |
| `"staticBlack"` | `--surfaceStaticBlack` | none |
| `"staticWhite"` | `--surfaceStaticWhite` | none |
| `"brand"` | `--surfaceAccent` | none |
| `"brandLight"` | `--surfaceAccentLight` | none |
| `"inverted"` | `--surfaceInverted` | none |

**Page vs component:** Page primary background = `--surfaceBase` (flat). Page secondary bands = **`<Surface variant="secondary">`** (full-bleed: `w-full rounded-none`; inset: inside `section-container`). Do not hand-apply `--surfaceSecondaryBg` when `@acko/surface` is available.

### checkbox/
`--checkboxFill` · `--checkboxFillChecked` · `--checkboxFillDisabled`
`--checkboxBorder` · `--checkboxBorderHover` · `--checkboxBorderError`
`--checkboxCheck` · `--checkboxDisabled` · `--checkboxDisabledIcon`

### chip/
`--chipFill` · `--chipSelectedFill` · `--chipText` · `--chipSelectedText` · `--chipBorder` · `--chipSelectedBorder`

### counter/
Per hue — `--counter{Hue}GradientFrom` · `--counter{Hue}GradientTo` · `--counter{Hue}Border` (Pink, Purple, Blue)

### dropdown/
`--dropdownFill` · `--dropdownFillDisabled` · `--dropdownBg`
`--dropdownBorder` · `--dropdownBorderHover` · `--dropdownBorderFilled` · `--dropdownBorderDisabled` · `--dropdownBorderError` · `--dropdownBorderOpen`
`--dropdownLabeltext` · `--dropdownLabelTextActive` · `--dropdownLabelTextDisabled`
`--dropdownPlaceholderText` · `--dropdownFilledText` · `--dropdownFilledTextDisabled`
`--dropdownHelperText` · `--dropdownHelperTextError` · `--dropdownHelperTextSuccess`
`--dropdownIcon` · `--dropdownIconDisabled` · `--dropdownCheckIcon` · `--dropdownCheckboxBorder`
`--dropdownFocusRing` · `--dropdownOptionHover` · `--dropdownOptionSelectedBg` · `--dropdownOptionFill` · `--dropdownOptionText` · `--dropdownPanelFill` · `--dropdownPanelBorder`

### icon/
`--iconPrimary` · `--iconSecondary` · `--iconTertiary` · `--iconDisabled` · `--iconInvert`
`--iconBrand` · `--iconLink` · `--iconStaticLight` · `--iconStaticDark`

### inputField/
`--inputFieldFill` · `--inputFieldFillDisabled`
`--inputFieldBorder` · `--inputFieldBorderHover` · `--inputFieldBorderFilled` · `--inputFieldBorderError`
`--inputFieldLabeltext` · `--inputFieldLabelTextActive` · `--inputFieldLabelTextDisabled`
`--inputFieldPlaceholderText` · `--inputFieldFilledText` · `--inputFieldFilledTextDisabled`
`--inputFieldHelperText` · `--inputFieldHelperTextError` · `--inputFieldHelperTextSuccess`
`--inputFieldIconSuccess` · `--inputFieldFocusRing`

### otp/
`--otpFill` · `--otpFillDisabled` · `--otpFocusFill`
`--otpBorder` · `--otpBorderDisabled` · `--otpBorderError` · `--otpFocusBorder`
`--otpLabeltext` · `--otpLabelTextDisabled`
`--otpDigitText` · `--otpDigitTextDisabled`
`--otpHelperText` · `--otpHelperTextError` · `--otpHelperTextSuccess`

### progress/
`--progressTrack` · `--progressFill` · `--progressFillDisabled`
`--progressLabelText` · `--progressLabelTextDisabled` · `--progressValueText` · `--progressValueTextDisabled` · `--progressHelperText`

### radio/
`--radioFill` · `--radioFillChecked` · `--radioFillDisabled`
`--radioBorder` · `--radioBorderHover` · `--radioBorderFocus` · `--radioBorderError` · `--radioBorderSelected`
`--radioCheck` · `--radioDisabledIcon`

### separator/
`--separatorLine` · `--separatorLineStrong` · `--separatorLabelText`

### slider/
`--sliderThumbBg` · `--sliderThumbStrokeFrom` · `--sliderThumbStrokeTo`
`--sliderTrackActiveFrom` · `--sliderTrackActiveTo`
`--sliderTrackInactiveFrom` · `--sliderTrackInactiveTo` · `--trackInactive`

### switch (maps to toggle/)
`--switchTrackOff` · `--switchTrackOn` · `--switchTrackDisabledOff` · `--switchTrackDisabledOn`
`--switchThumbOff` · `--switchThumbOn` · `--switchThumbDisabled`
`--switchLabel` · `--switchLabelDisabled`

### table/
`--tableBorder` · `--tableHeaderBg` · `--tableHeaderText` · `--tableRowHover` · `--tableStripe`

### tabs/
`--tabsPillBg` · `--tabsPillActiveBg` · `--tabsPillActiveText` · `--tabsPillOuterBorder`
`--tabsTextInactive` · `--tabsTextDisabled`

### textarea/
Same pattern as inputField — prefix `--textarea*` instead of `--inputField*`

### toggle/
`--toggleFill` · `--toggleFillOn` · `--toggleFillDisabled` · `--toggleThumb` · `--toggleThumbDisabled`

### tooltip/
`--tooltipBg` · `--tooltipText`

### wizard/
`--wizardActiveBg` · `--wizardActiveShadowTop` · `--wizardActiveShadowBottom` · `--wizardActiveText`
`--wizardDoneBg` · `--wizardDoneText`
`--wizardConnectorDone` · `--wizardConnectorUpcoming`
`--wizardUpcomingBorder` · `--wizardUpcomingText`

### toast/
`--toastInfoSurface` · `--toastInfoBorder` · `--toastInfoText` (and Success, Warning, Error variants)

### dialog / drawer / skeleton / pagination
`--dialogBg` · `--dialogOverlay` · `--dialogBorder` · `--drawerBg` · `--drawerOverlay`
`--skeletonBase` · `--skeletonShimmer` · `--paginationActiveBg` · `--paginationActiveText`

---

## Adding a new component token

1. Identify the semantic role it maps to (see `semantics.md`).
2. Name it `{component}/{camelCaseRole}` — no color words, no theme words.
3. Create in the **Components** collection (single `Value` mode).
4. Set its value to a `VARIABLE_ALIAS` pointing to a **Semantics** token. Never point to Brand or Primitives directly.
5. Set scope: `TEXT_FILL`, `FRAME_FILL + SHAPE_FILL`, or `STROKE_COLOR` — never `ALL_SCOPES`.
6. Bind the canvas layer to this component token (not to the Semantics token directly).

## When NOT to create a new component token

- If two components need the exact same role (e.g. both use `text/primary` for body copy) — **reuse the semantic token directly** only if no component-specific token exists yet, then create one for each component pointing to that same semantic.
- Never add a token for a hard-coded value like white or black — use `text/staticLight` / `text/staticDark` or `surface/staticWhite` / `surface/staticBlack`.

# Forms & Controls

Patterns for inputs, buttons, validation, and form structure. All spacing and sizing values reference tokens from `primitives.md`.

---

## The ACKO Forms Rule

Insurance forms are the core of the product. Users fill these out when buying, claiming, or renewing — often on mobile, sometimes stressed, often first-timers. Every form decision must reduce friction, not add it.

---

## Inputs

### Labels

Always associate labels with inputs. Use `label-lg` typography variant. Never use placeholder text as a label substitute.

```html
<label for="vehicle-number">Vehicle number</label>
<input id="vehicle-number" type="text" />
```

### Input Types

Always use the correct `type` — controls mobile keyboard.

```html
<input type="email" />    <!-- Email keyboard -->
<input type="tel" />      <!-- Numeric dialpad — phone, vehicle numbers, policy IDs -->
<input type="number" />   <!-- Number keyboard -->
<input type="password" /> <!-- Masked -->
```

### Font Size — iOS Zoom Prevention

Input font size must be at least `body-md` (16px). Smaller sizes trigger auto-zoom on iOS.

### Autocomplete

Enable for known user data (`email`, `tel`). Disable for OTPs, policy numbers, vehicle numbers:

```html
<input autocomplete="off" spellcheck="false" />
```

### Prefilling

Always prefill with known user data — name, phone, email, vehicle number, address.

### Input Decorations

Icons and currency symbols: absolutely positioned over input. Icon left offset → `p-16`. Input left padding when icon present → `p-40`.

### Autofocus

Autofocus when a modal opens if its primary purpose is input. Never autofocus on touch devices.

```jsx
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
<input autoFocus={!isTouchDevice} />
```

---

## Forms

- Always wrap inputs in `<form>` so Enter submits
- Support `Cmd+Enter` / `Ctrl+Enter` for textareas
- Multi-step: show progress indicator, preserve state on back, validate on step exit, scroll to first error

### Validation Timing

| Scenario | When to Validate |
|----------|-----------------|
| Required field empty | On blur |
| Format error (email, phone) | On blur |
| Cross-field errors | On submit |
| Server-side errors | Immediately on response |

Never validate on every keystroke.

---

## Buttons

- Always use `<button>`, never `div` or `span` with click handlers
- Always set `type` explicitly (`submit` or `button`)
- Disable after submission with loading copy

### CTA Copy Rules

| Instead of | Use |
|------------|-----|
| Submit | Continue / Confirm / Buy now |
| Click here | View my policy / Start claim |
| OK | Got it / Done |
| Cancel | Go back / Not now |
| Yes / No | Specific label ("Delete claim" / "Keep claim") |

### Loading State Copy

| Action | Loading Copy |
|--------|-------------|
| Form submit | Processing... |
| Payment | Securing payment... |
| Document upload | Uploading... |
| Policy fetch | Fetching your policy... |

---

## Error Handling

- Errors live directly below the field. Use `label-md` variant, `--statusErrorText`, `gap-4`
- Specific: "Enter a 10-digit mobile number" — not "Invalid phone number"
- Solution-oriented, never blame the user, never technical language

```jsx
<input
  id="phone"
  type="tel"
  aria-invalid={!!errors.phone}
  aria-describedby={errors.phone ? 'phone-error' : undefined}
/>
{errors.phone && (
  <span id="phone-error" role="alert">{errors.phone}</span>
)}
```

### Server Errors

```jsx
catch (error) {
  setError("We couldn't process this right now. Please try again in a moment.");
}
```

---

## Destructive Actions

Use a proper confirmation modal — never `window.confirm()`. Destructive CTA always comes second.

```jsx
<DialogActions>
  <Button variant="ghost">Keep claim</Button>
  <Button variant="destructive">Cancel claim</Button>
</DialogActions>
```

---

## Checkboxes and Toggles

Entire row (label + control) must be clickable. Gap: `gap-2` (≈8px). Never pre-check consent boxes.

---

## OTP Inputs

- Auto-advance on digit entry
- `autocomplete="one-time-code"` on first field for SMS auto-fill
- Minimum 44px per digit cell. Gap: `gap-2`

```jsx
<input
  type="tel"
  maxLength={1}
  inputMode="numeric"
  autoComplete={index === 0 ? 'one-time-code' : 'off'}
/>
```

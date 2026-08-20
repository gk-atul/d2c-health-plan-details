# Touch & Accessibility

Users access ACKO on mobile — often in stressful situations like filing a claim or looking up a policy at a hospital. Touch and accessibility are core to the product working.

---

## Touch Devices

### Hover Effects

Disable on touch devices — hover states don't exist there:

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover { box-shadow: var(--shadowM); }
  .button:hover { background: var(--fillBrandHover); }
}
```

### Tap Targets

All interactive elements: minimum **44px**. Use a pseudo-element to extend the tap area without affecting layout:

```css
.icon-button::before {
  content: '';
  position: absolute;
  inset: calc((44px - 100%) / -2);
}
```

### Double-Tap Zoom Prevention

```css
button, a, input, select, label { touch-action: manipulation; }
```

### Custom Gestures

```css
.drag-handle, .custom-canvas { touch-action: none; }
```

---

## Keyboard Navigation

- Tab order follows visual reading order
- Use `inert` attribute for off-screen/closed panels
- Scroll focused elements into view
- Modal open → focus first interactive element; modal close → return focus to trigger

```jsx
useEffect(() => {
  if (isOpen) firstFocusableRef.current?.focus();
}, [isOpen]);
```

### Keyboard Shortcuts

Show OS-appropriate modifier:

```js
const isMac = navigator.platform.toUpperCase().includes('MAC');
const modKey = isMac ? '⌘' : 'Ctrl';
```

---

## Accessibility

### ARIA Labels

Every icon-only button must have `aria-label`:

```html
<button aria-label="Close"><CloseIcon aria-hidden="true" /></button>
```

### ARIA for Dynamic Content

```jsx
<div aria-live="polite" aria-atomic="true">{statusMessage}</div>
```

Use `aria-live="assertive"` only for critical alerts.

### Form Accessibility

```jsx
<input
  aria-required="true"
  aria-invalid={!!errors.vehicle}
  aria-describedby={errors.vehicle ? 'vehicle-error' : 'vehicle-hint'}
/>
```

### Images

- Meaningful → descriptive `alt`
- Decorative → `alt=""` and `aria-hidden="true"`
- Illustrations → `role="img"` with `aria-label`

### Reduced Motion

Every animation must have a fallback. No exceptions.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## Time-Limited Actions

Freeze timers when user switches tabs:

```js
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearTimeout(timeoutId);
    remainingTime -= Date.now() - startTime;
  } else {
    startTime = Date.now();
    timeoutId = setTimeout(callback, remainingTime);
  }
});
```

---

## Tooltips

- Delay before appearing: `150ms`
- Sequential tooltips: instant (no delay, no animation) once one is already open

---

## Feedback Visibility

Never hide feedback behind hover or collapsed sections. Critical feedback → `aria-live="assertive"` and scroll into view immediately.

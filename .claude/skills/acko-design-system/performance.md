# Performance

Performance is a product quality bar, not an optimization exercise. ACKO users are often on mid-range Android devices, on mobile networks, needing information fast.

For animation performance rules, see the `acko-motion-system` skill (`references/physics.md`).

---

## Layout Shift Prevention

- Always set explicit `width` and `height` on images/videos
- `loading="lazy"` for below-the-fold, `loading="eager"` for above-the-fold
- Skeletons must exactly match real content dimensions and radius tokens — no layout shift
- Use `font-variant-numeric: tabular-nums` for dynamic numbers to prevent width shift

---

## Image Optimization

WebP for all images with fallback. Preload above-the-fold images.

```html
<picture>
  <source srcset="/hero.webp" type="image/webp" />
  <img src="/hero.jpg" alt="Description" width={640} height={360} />
</picture>
```

---

## Code Splitting — Vite

Route-level lazy loading. Heavy components (PDFs, charts, maps) always lazy loaded.

```jsx
const ClaimsFlow = lazy(() => import('./pages/ClaimsFlow'));

<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/claims/*" element={<ClaimsFlow />} />
  </Routes>
</Suspense>
```

---

## List Virtualization

Virtualize any list with 50+ items using `@tanstack/react-virtual`.

```jsx
const virtualizer = useVirtualizer({
  count: claims.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80,
});
```

---

## React Performance

- Animate outside the render cycle using refs and `requestAnimationFrame`
- Memoize only when there is a measurable benefit
- Pause resource-intensive operations when off-screen using `IntersectionObserver`

---

## Vite-Specific

- Only `VITE_`-prefixed env vars are exposed to the client
- Use `rollup-plugin-visualizer` after major dependency additions
- Avoid animating CSS variables in deep component trees — use class swaps instead

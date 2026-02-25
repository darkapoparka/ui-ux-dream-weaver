# Treido — Design System v3.0

> Clean, content-first marketplace. No gradients, no gimmicks, no AI slop.

---

## Philosophy

**Invisible UI.** The product images ARE the design. Everything else gets out of the way. Monochrome palette, tight typography, zero decorative elements. Every pixel earns its place.

References: Vinted, Grailed, StockX, Depop, Apple Store app.

---

## Colors — Monochrome + One Accent

```css
:root {
  --background: 0 0% 98%;         /* Off-white canvas */
  --foreground: 0 0% 7%;          /* Near-black text */
  --card: 0 0% 100%;              /* Pure white surfaces */
  --primary: 0 0% 7%;             /* Black — primary actions */
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 95%;          /* Light gray — chips, inputs */
  --muted-foreground: 0 0% 45%;   /* Gray — metadata */
  --border: 0 0% 91%;             /* Subtle dividers */
  --brand: 24 90% 52%;            /* Orange — only for badges/notifications */
  --destructive: 0 72% 51%;       /* Red — discounts, errors */
  --success: 152 55% 41%;         /* Green — verified only */
}
```

**Rules:**
- Brand orange is ONLY for notification badges and the sell button
- Primary actions are BLACK, not orange
- No gradients anywhere
- No colored backgrounds on sections
- No shadows on cards (flat design). Shadows only on sticky elements

---

## Typography

**Display:** Plus Jakarta Sans — headings, prices, brand
**Body:** Inter — everything else

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Logo | 18px | 800 | foreground |
| Section heading | 15px | 600 | foreground |
| Product price | 14px | 600 | foreground |
| Product title | 13px | 400 | foreground/80 |
| Metadata | 12-13px | 500 | muted-foreground |
| Badge | 10-11px | 600 | varies |
| Nav label | 10px | 500 | muted-foreground |

---

## Components

### Product Card
- NO card border, NO shadow, NO background
- Image: `aspect-[3/4] rounded-lg` — tall, editorial crop
- Wishlist: Appears on hover only (`opacity-0 group-hover:opacity-100`)
- Price first, then title, then seller + rating
- Minimal: price → title → seller. That's it.

### Header
- Height: 48px, `bg-card/95 backdrop-blur-md border-b`
- Logo left, nav center (desktop), icons right
- Icons: 18px, strokeWidth 1.5
- Mobile: collapsible search bar below

### Bottom Nav (Mobile)
- Height: 56px + safe area
- 5 items, center "Sell" button is elevated circle
- Active = heavier stroke weight, not color change
- Clean white bg, top border only

### Category Chip
- `rounded-full px-3.5 py-1.5 text-[13px]`
- Inactive: `bg-secondary text-secondary-foreground`
- Active: `bg-primary text-primary-foreground` (black/white)
- No shadows, no borders, no icons

### Category Icons
- 56px square, `rounded-2xl bg-secondary`
- Lucide icon inside, 20px, strokeWidth 1.5
- Text below: 11px muted

---

## Spacing

4px grid. Common values:
- Card gap: `gap-x-12px gap-y-20px`
- Section padding: `px-16px pt-16px`
- Inner component: `gap-1.5 to gap-3`
- Between sections: `py-12px to py-16px`

---

## Layout

| Breakpoint | Product Columns | Max Width |
|-----------|----------------|-----------|
| Mobile | 2 | 100% |
| sm (640px) | 3 | 100% |
| md (768px) | 4 | 100% |
| lg (1024px) | 5 | 1280px |

---

## Interactions

- Card hover: wishlist fades in. That's it. No lift, no shadow.
- Chip tap: instant color swap, no animation
- Nav items: no transition, instant feedback
- Focus states: 1px ring using `--ring` (black)
- Page transitions: none. Instant navigation.

---

## Anti-Patterns (NEVER DO)

1. ❌ Gradient backgrounds or buttons
2. ❌ Decorative circles, blobs, or shapes
3. ❌ Emoji as icons
4. ❌ Bouncy/spring animations
5. ❌ Framer Motion entrance animations on cards
6. ❌ Shadow on cards
7. ❌ Colored section backgrounds
8. ❌ Hero banners with CTAs
9. ❌ Glow effects
10. ❌ More than 2 font weights visible at once in a component

---

## Do This Instead

1. ✅ Let product images be the hero
2. ✅ Use negative space generously
3. ✅ Keep text small and light — 13px body, 45% gray metadata
4. ✅ Tall image ratios (3:4) for editorial feel
5. ✅ Monochrome everything except verified badges and error states
6. ✅ Thin icon strokes (1.5px)
7. ✅ Rounded-lg on images, rounded-full on chips
8. ✅ Instant interactions, no delays
9. ✅ Flat design — depth comes from content, not shadows
10. ✅ Less is more. When in doubt, remove it.

---

*v3.0 — February 2025. Content-first marketplace design.*

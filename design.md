# Treido — Design System & UI/UX Guide v2.0

> A comprehensive, agent-ready design guide for building a world-class C2C/B2B marketplace.

---

## 1. Design Philosophy

**Warm, trustworthy, marketplace-native.** Think Depop meets Airbnb — image-forward, clean surfaces, and a warm orange brand that inspires action without overwhelming. Cards float on a soft gray canvas. Typography does the heavy lifting — no gimmicks.

### Core Principles
1. **Content-first** — Products are the hero. UI gets out of the way.
2. **Trust through polish** — Verified badges, ratings, consistent spacing = trust.
3. **Mobile-native** — Designed for thumbs. Desktop is an enhancement.
4. **Warm, not cold** — Soft backgrounds, rounded corners, warm orange brand.

---

## 2. Color System (HSL Only)

```css
:root {
  --background: 220 16% 96%;       /* #F2F3F5 — Warm gray canvas */
  --foreground: 222 30% 10%;       /* #131720 — Near-black text */
  --card: 0 0% 100%;               /* #FFFFFF — Floating cards */
  --card-foreground: 222 30% 10%;
  --primary: 24 95% 53%;           /* #F97316 — Marketplace orange */
  --primary-foreground: 0 0% 100%;
  --secondary: 220 14% 92%;        /* #E8EAED — Chip/surface */
  --secondary-foreground: 222 20% 28%;
  --muted: 220 12% 94%;
  --muted-foreground: 220 10% 46%; /* Metadata, dates */
  --accent: 217 91% 60%;           /* Blue for links */
  --success: 152 60% 44%;          /* Verified green */
  --destructive: 0 84% 60%;        /* Discount red */
  --border: 220 14% 90%;
  --ring: 24 95% 53%;              /* Focus = brand */
  --radius: 0.75rem;
}
```

### Shadow System
```css
--shadow-card: 0 1px 3px hsl(220 25% 10% / 0.05);
--shadow-card-hover: 0 8px 25px -5px hsl(220 25% 10% / 0.1);
--shadow-sticky: 0 -2px 12px hsl(220 25% 10% / 0.08);
--shadow-glow: 0 4px 14px hsl(24 95% 53% / 0.35);
```

---

## 3. Typography

**Display:** Plus Jakarta Sans (700, 800) — Headings, prices, brand
**Body:** Inter (400, 500, 600) — Everything else

| Use Case | Size | Weight | Font |
|----------|------|--------|------|
| Brand logo | 20px | 800 | Display |
| Page title | 20-24px | 700 | Display |
| Card title | 14px | 600 | Display |
| Price | 16px (card), 30px (detail) | 800 | Display |
| Body text | 14-15px | 400 | Body |
| Metadata | 11px | 500 | Body |
| Badge | 11px | 700 | Body |

---

## 4. Spacing

Base: 4px grid. Use multiples only: 4, 8, 12, 16, 20, 24, 32, 40, 48.

| Token | Value | Usage |
|-------|-------|-------|
| gap-1 | 4px | Icon-label gaps |
| gap-2 | 8px | Tight element spacing |
| gap-3 | 12px | Card internal padding |
| gap-4 | 16px | Page padding, card padding |
| gap-6 | 24px | Section gaps |
| gap-8 | 32px | Major section breaks |

---

## 5. Component Specs

### 5.1 Product Card
- Container: `bg-card rounded-2xl shadow-card` → hover: `shadow-card-hover -translate-y-1`
- Image: `aspect-[4/3] object-cover`, lazy loaded
- Discount badge: Top-left, `bg-destructive text-xs font-bold px-2 py-0.5 rounded-md`
- Wishlist: Top-right, 32px circle, `bg-card/70 backdrop-blur-sm`
- Content padding: 12px
- Category: 11px uppercase tracking-wider muted
- Seller: 20px avatar + 12px name
- Title: 14px font-semibold, `line-clamp-2`
- Price: 16px font-extrabold + old price line-through
- Bottom: Star rating + Verified badge + timestamp

### 5.2 Category Chip
- Inactive: `bg-card border border-border rounded-full px-4 py-2 text-sm font-medium`
- Active: `bg-primary text-primary-foreground shadow-glow`
- Hover: `border-primary/30 bg-primary/5`

### 5.3 Bottom Navigation (Mobile)
- Height: 64px + safe-area
- Background: `bg-card border-t shadow-sticky`
- 5 items: Home, Categories, Sell (center), Chat, Profile
- Center button: 48px circle, `bg-primary shadow-glow -mt-5`, elevated
- Active: `text-primary stroke-[2.5px]`
- Inactive: `text-muted-foreground`

### 5.4 Header
- Sticky, `bg-card/80 backdrop-blur-xl border-b`
- Logo: "treido." — 20px extrabold, orange dot
- Search: Rounded-full, secondary bg, focus → primary ring
- Mobile: Tappable search bar → navigates to /search

### 5.5 Hero Banner
- `rounded-2xl` gradient from-primary to-primary/80
- Decorative circles with `bg-primary-foreground/10`
- CTA button: `bg-card text-foreground rounded-full font-semibold`

---

## 6. Animation Guide

### Framer Motion Defaults
```tsx
// Card entrance
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.35, delay: index * 0.05 }}

// Category grid
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: i * 0.04, duration: 0.3 }}
```

### CSS Transitions
- Card hover: `transition-all duration-200` — shadow + translateY
- Button press: `active:scale-95`
- Wishlist heart: Toggle fill color
- Image zoom on hover: `group-hover:scale-105 duration-300`
- Focus ring: `focus-within:ring-2 ring-primary/20`

### Skeleton Loading
```css
.skeleton-shimmer {
  background: linear-gradient(90deg, muted 0%, muted/50% 50%, muted 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

---

## 7. Layout Grid

| Breakpoint | Columns | Gap | Side Padding |
|-----------|---------|-----|-------------|
| Mobile (<640px) | 2 | 12px | 16px |
| Tablet (640-1024px) | 3 | 16px | 24px |
| Desktop (1024-1280px) | 4 | 16px | auto (container) |
| Wide (>1280px) | 5 | 16px | auto (max-w-7xl) |

---

## 8. Page Structure

### Landing (/)
1. Header (sticky, blurred)
2. Hero banner (gradient, CTA)
3. Category icons row (horizontal scroll)
4. Tab chips (For You, Newest, Trending, Deals)
5. Product grid (2-5 cols responsive)
6. Bottom nav (mobile only)

### Categories (/categories)
1. Header
2. Page title + Filter button
3. Category grid (3-6 cols, emoji icons, item counts)
4. Subcategory chips (on selection)
5. Filtered product grid
6. Bottom nav

### Search (/search)
1. Search header (auto-focus input, back arrow, filter icon)
2. Default: Recent searches (chips) + Trending (numbered list)
3. Results: Filter chips + product grid
4. Empty state: Icon + message
5. Bottom nav

### Profile (/profile)
1. Header
2. Profile card (avatar, name, verified, location, join date)
3. Stats row (Listed, Sold, Rating, Reviews)
4. Menu items (icon + label + badge + chevron)
5. User's listings grid
6. Bottom nav

---

## 9. Agent Implementation Rules

1. **NEVER hardcode colors** — Always use semantic tokens (`text-foreground`, `bg-card`, `text-primary`)
2. **NEVER write `text-white`, `bg-gray-*`, `text-black`** — Use `text-primary-foreground`, `bg-secondary`, etc.
3. **All images**: `aspect-ratio` + `object-cover` + `loading="lazy"`
4. **Touch targets**: Minimum 44x44px on mobile
5. **Mobile-first**: Write base styles for mobile, enhance with `md:` and `lg:`
6. **Animations**: Use `framer-motion` for entrances, CSS for micro-interactions
7. **Fonts**: Headings/prices = `font-display`, body = `font-body` (default)
8. **Spacing**: Only use 4px grid multiples
9. **Border radius**: Cards = `rounded-2xl`, Buttons/Chips = `rounded-full`, Badges = `rounded-md`
10. **Shadows**: Cards = `shadow-card`, Hover = `shadow-card-hover`, Primary buttons = `shadow-glow`

---

## 10. Key UX Patterns

- **Wishlist**: Frosted glass button, heart toggles fill on tap
- **Discount**: Red badge top-left of image with "-X%"
- **Verified**: Green checkmark + "Verified" text
- **Rating**: Orange star + number + count
- **Price**: Bold number, no pill — old price in muted line-through
- **Empty state**: Centered icon + heading + description
- **Category selection**: Active = orange fill + glow shadow
- **Search**: Auto-focus, show recent + trending when empty

---

*Version 2.0 — February 2025*

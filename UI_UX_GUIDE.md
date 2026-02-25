# Treido — Complete UI/UX Implementation Guide

> This document describes every visual and interaction pattern in the Treido marketplace app. Follow it exactly to reproduce the design.

---

## 1. Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with semantic CSS variables (HSL)
- **UI Primitives:** shadcn/ui (Radix-based)
- **Routing:** react-router-dom v6
- **Icons:** lucide-react (18px, strokeWidth 1.5 default)
- **Fonts:** Plus Jakarta Sans (display/headings), Inter (body)
- **Animation:** Minimal — only opacity transitions. No spring/bounce animations. No framer-motion entrance animations on cards.
- **Drawer:** vaul (via shadcn Drawer)
- **Validation:** zod

---

## 2. Design Philosophy

**Content-first, invisible UI.** Product images are the design. Everything else gets out of the way.

### Core Rules
1. **Monochrome palette** — black, white, grays. Only 3 accent colors (brand orange, destructive red, success green) used sparingly.
2. **Flat design** — NO shadows on cards. NO gradients anywhere. NO glow effects.
3. **No decorative elements** — no blobs, circles, shapes, emoji-as-icons, hero banners.
4. **Instant interactions** — no page transitions, no bouncy animations, no delays.
5. **Small, light typography** — 13px body, muted gray metadata, tight leading.
6. **Generous negative space** — let content breathe.

### Anti-Patterns (NEVER DO)
- ❌ Gradient backgrounds or buttons
- ❌ Shadows on cards
- ❌ Colored section backgrounds
- ❌ Bouncy/spring animations
- ❌ Framer Motion entrance animations on cards
- ❌ Hero banners with CTAs
- ❌ Glow effects
- ❌ More than 2 font weights visible at once in a component
- ❌ Emoji as icons
- ❌ Decorative shapes/blobs

---

## 3. Color System (CSS Variables — HSL format)

All colors are defined as HSL values in `index.css` and consumed via `hsl(var(--token))` in Tailwind.

### Light Mode (`:root`)
```css
--background: 0 0% 98%;           /* Off-white canvas */
--foreground: 0 0% 7%;            /* Near-black text */
--card: 0 0% 100%;                /* Pure white surfaces */
--card-foreground: 0 0% 7%;
--primary: 0 0% 7%;               /* Black — primary actions, buttons */
--primary-foreground: 0 0% 100%;  /* White text on primary */
--secondary: 0 0% 95%;            /* Light gray — inputs, chips, icon bg */
--secondary-foreground: 0 0% 20%;
--muted: 0 0% 95.5%;
--muted-foreground: 0 0% 45%;     /* Gray — metadata, labels */
--accent: 0 0% 92%;               /* Hover state for secondary */
--accent-foreground: 0 0% 7%;
--border: 0 0% 91%;               /* Subtle dividers */
--input: 0 0% 91%;
--ring: 0 0% 7%;                  /* Focus ring — black */
--destructive: 0 72% 51%;         /* Red — discounts, errors */
--destructive-foreground: 0 0% 100%;
--success: 152 55% 41%;           /* Green — verified badges only */
--success-foreground: 0 0% 100%;
--brand: 24 90% 52%;              /* Orange — notification badges only */
--brand-foreground: 0 0% 100%;
--popover: 0 0% 100%;
--popover-foreground: 0 0% 7%;
--radius: 0.625rem;               /* ~10px */
```

### Dark Mode (`.dark`)
```css
--background: 0 0% 5%;
--foreground: 0 0% 95%;
--card: 0 0% 8%;
--card-foreground: 0 0% 95%;
--primary: 0 0% 95%;
--primary-foreground: 0 0% 5%;
--secondary: 0 0% 12%;
--secondary-foreground: 0 0% 80%;
--muted: 0 0% 14%;
--muted-foreground: 0 0% 55%;
--accent: 0 0% 16%;
--accent-foreground: 0 0% 95%;
--destructive: 0 62.8% 30.6%;
--border: 0 0% 16%;
--input: 0 0% 16%;
--ring: 0 0% 80%;
```

### Color Usage Rules
| Token | Used For |
|-------|----------|
| `foreground` | Primary text, primary buttons (bg), icons |
| `muted-foreground` | Metadata, labels, secondary text |
| `muted-foreground/70` | Tertiary text (seller names) |
| `muted-foreground/40` | Dot separators |
| `secondary` | Input backgrounds, chip backgrounds, icon containers |
| `border` | Dividers, card borders, input borders |
| `destructive` | Discount badges, error text, delete actions |
| `success` | Verified badges (CheckCircle2 icon) |
| `brand` | Shopping bag notification dot ONLY |
| `card` | Surface backgrounds (header, bottom nav, overlays) |

**IMPORTANT:**
- Brand orange is ONLY for notification badge on shopping bag icon
- Primary actions (buttons) are BLACK (`bg-foreground text-background`), NOT orange
- Never use colored backgrounds on page sections
- All Tailwind color classes use the semantic tokens, NEVER raw colors

---

## 4. Typography

### Font Stack (tailwind.config.ts)
```ts
fontFamily: {
  display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
  body: ['Inter', 'system-ui', 'sans-serif'],
}
```

Applied globally:
```css
body { @apply font-body antialiased; }
h1, h2, h3, h4, h5, h6 { @apply font-display tracking-tight; }
```

### Type Scale
| Element | Classes | Example |
|---------|---------|---------|
| Logo | `text-[17px] font-extrabold font-display tracking-tight` | "treido." |
| Page/section heading | `text-[15px] font-semibold text-foreground` | "Categories", "Your Listings" |
| Product price (card) | `text-[14px] font-semibold text-foreground` | "€1,950" |
| Product price (detail) | `text-[22px] font-bold font-display text-foreground` | "€1,950" |
| Product title (card) | `text-[12px] text-muted-foreground line-clamp-2 leading-snug` | |
| Product title (detail) | `text-[15px] text-foreground/80 leading-snug` | |
| Old/crossed price | `text-[11px] text-muted-foreground line-through` | "€2,200" |
| Seller name | `text-[11px] text-muted-foreground/70` | |
| Metadata (time, count) | `text-[12px] text-muted-foreground` | "4w ago · Electronics" |
| Section label | `text-[13px] font-semibold text-foreground` | Form labels, detail headings |
| Nav label (bottom) | `text-[10px] font-medium` | "Home", "Search" |
| Badge text | `text-[10px] font-semibold` or `text-[11px] font-medium` | "-22%", "Like New" |
| Category icon label | `text-[10px] font-medium text-muted-foreground` | |
| "See all" links | `text-[12px] text-muted-foreground hover:text-foreground` | |
| Nav links (desktop) | `text-[13px] font-medium text-muted-foreground hover:text-foreground` | |

---

## 5. Spacing System

Based on a **4px grid**. Common values:

| Context | Value |
|---------|-------|
| Product grid gap | `gap-x-3 gap-y-5` (12px × 20px) |
| Section horizontal padding | `px-4` (16px) |
| Section vertical padding | `pt-4 pb-3` or `pt-3 pb-2` |
| Between sections | `py-4` to `py-6` |
| Inner component spacing | `gap-1.5` to `gap-3` (6px–12px) |
| Card image to text | `mb-2` (8px) |
| Text stack inside card | `space-y-0.5` (2px) |
| Form field spacing | `space-y-5` (20px) |

---

## 6. Layout & Grid

### Responsive Product Grid
```html
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-5">
```

### Page Container
```html
<div class="max-w-7xl mx-auto">
```

### Form Container (narrower)
```html
<div class="max-w-2xl mx-auto">
```

### Page Shell Pattern
Every page follows this structure:
```tsx
<div className="min-h-screen bg-background pb-16 md:pb-0">
  <Header />
  <main className="max-w-7xl mx-auto">
    {/* Content sections */}
  </main>
  <BottomNav />
</div>
```
- `pb-16` accounts for mobile bottom nav height
- `md:pb-0` removes padding on desktop where bottom nav is hidden

---

## 7. Component Patterns

### 7.1 Header
- Height: `h-12` (48px)
- Sticky: `sticky top-0 z-40`
- Background: `bg-card/95 backdrop-blur-md border-b border-border`
- Layout: Logo left, desktop nav center (hidden on mobile), icon buttons right
- Icons: `w-[18px] h-[18px]` with `strokeWidth={1.5}`
- Icon buttons: `p-2 hover:bg-secondary rounded-full transition-colors`
- Mobile search bar below header: `h-9 px-3 rounded-lg bg-secondary text-[13px]`
- Shopping bag has notification dot: `w-3.5 h-3.5 bg-brand text-brand-foreground text-[8px] font-bold rounded-full`

### 7.2 Bottom Navigation (Mobile Only)
- Visibility: `md:hidden`
- Position: `fixed bottom-0 left-0 right-0 z-50`
- Background: `bg-card/95 backdrop-blur-md border-t border-border`
- Height: `h-[56px]` + safe area padding (`safe-bottom` utility)
- 5 items: Home, Search, **Sell** (center), Messages, Profile
- Center "Sell" button: `w-10 h-10 rounded-full bg-foreground text-background` — NO elevation, NO shadow, flush with bar
- Active state: heavier stroke weight (`strokeWidth={2}` vs `1.5`), text changes to `text-foreground`
- Inactive: `text-muted-foreground`, `strokeWidth={1.5}`
- Icon size: `w-[21px] h-[21px]`
- Label: `text-[10px] font-medium`

### 7.3 Product Card
- **No border, no shadow, no card background** — just image + text
- Wrapped in `<Link>` with `className="group block"`
- Image container: `relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary mb-2`
- Image: `w-full h-full object-cover` with `loading="lazy"`
- Wishlist button: `absolute top-2 right-2`, `opacity-0 group-hover:opacity-100 transition-opacity`, circular `w-7 h-7 rounded-full bg-card/80 backdrop-blur-sm`
- Discount badge: `absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded`
- Condition badge: `absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm text-[10px] font-medium text-foreground px-1.5 py-0.5 rounded`
- Text area: `space-y-0.5`
  - Price row: `text-[14px] font-semibold` + old price `text-[11px] line-through text-muted-foreground`
  - Title: `text-[12px] text-muted-foreground line-clamp-2 leading-snug`
  - Seller row: `text-[11px] text-muted-foreground/70` + verified icon `w-3 h-3 text-success` + rating

### 7.4 Category Chip
- Shape: `rounded-full px-3.5 py-1.5`
- Text: `text-[13px] font-medium whitespace-nowrap`
- Active: `bg-foreground text-background` (black pill, white text)
- Inactive: `bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent`
- No shadows, no borders, no icons inside chips
- Transition: `transition-all`

### 7.5 Category Icon Grid (Home page)
- Container: `w-[52px] h-[52px] rounded-xl bg-secondary`
- Hover: `group-hover:bg-accent transition-colors`
- Icon: `w-5 h-5 text-foreground/70 strokeWidth={1.5}`
- Label below: `text-[10px] font-medium text-muted-foreground`
- Row: `flex gap-4 overflow-x-auto scrollbar-hide`

### 7.6 Filter Drawer (vaul/shadcn Drawer)
- Max height: `max-h-[85vh]`
- Header: flex row with title `text-[15px] font-semibold` + close button (X icon in rounded-full)
- Sections use `space-y-6` with section labels `text-[13px] font-semibold text-foreground mb-2.5`
- Chips for sort/condition: same pattern as CategoryChip but `text-[12px]` and `px-3 py-1.5 rounded-full`
- Price inputs: `h-9 px-3 rounded-lg bg-secondary text-[13px]` with `focus:ring-1 focus:ring-ring`
- Footer: `border-t border-border`, two buttons side by side:
  - Clear: `border border-border text-foreground hover:bg-secondary` (outline style)
  - Show results: `bg-foreground text-background hover:bg-foreground/90` (primary style)

### 7.7 Sticky Bottom Action Bar
Used on Product Detail and Sell pages:
```html
<div class="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-bottom">
  <div class="max-w-2xl mx-auto px-4 py-3">
    <button class="w-full h-11 rounded-xl bg-foreground text-background text-[14px] font-semibold hover:bg-foreground/90 transition-colors">
      Action Label
    </button>
  </div>
</div>
```
- Product detail has two-button layout: message icon button + full-width "Buy Now" button
- Message button: `w-11 h-11 rounded-xl border border-border`

### 7.8 Detail Page Top Bar
- Fixed floating bar: `fixed top-0 left-0 right-0 z-50 h-12 bg-card/90 backdrop-blur-md border-b border-border`
- Back button (left): ArrowLeft in `w-8 h-8 rounded-full hover:bg-secondary`
- Action buttons (right): Heart + Share2 in same circular buttons

### 7.9 Form Inputs
- Text input: `w-full h-10 px-3 rounded-lg bg-secondary text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all`
- Textarea: same bg/text/ring pattern, `resize-none leading-relaxed`
- Price input: with `€` prefix via absolute-positioned span, input has `pl-7`
- Number inputs hide spinners: `[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
- Error text: `text-[11px] text-destructive mt-1`
- Character count: `text-[11px] text-muted-foreground` right-aligned

### 7.10 Photo Upload Row
- Horizontal scroll: `flex gap-2 overflow-x-auto scrollbar-hide`
- Add button: `w-20 h-20 rounded-xl border-2 border-dashed border-border` with Camera icon + "Add" label
- Image thumbnail: `w-20 h-20 rounded-xl overflow-hidden bg-secondary`
- Remove button: `absolute top-1 right-1 w-5 h-5 rounded-full bg-foreground/70` with X icon
- Cover badge: `absolute bottom-1 left-1 text-[9px] bg-foreground/60 text-background`

### 7.11 Profile Page
- Avatar: `w-13 h-13 rounded-full bg-secondary` with initials `text-[14px] font-bold`
- Name + verified: `text-[15px] font-bold` + Shield icon `w-3.5 h-3.5 text-success`
- Location/joined: `text-[11px] text-muted-foreground` with MapPin icon
- Edit button: `px-3 py-1.5 rounded-lg border border-border text-[13px] font-medium`
- Stats row: `flex gap-8 border-t border-border pt-4 mt-4`, centered text
- Menu list: `rounded-xl bg-card divide-y divide-border border border-border`, each row is a button with icon + label + detail + ChevronRight
- Logout: separate button below with `text-destructive hover:bg-destructive/5 rounded-xl`

### 7.12 Search Page
- Auto-focus input on mount
- Search input inside header: `flex-1 h-9 px-3 rounded-lg bg-secondary focus-within:ring-1 focus-within:ring-ring`
- "Recent" section: chips as `px-3 py-1.5 rounded-full bg-secondary text-[13px]`
- "Trending" section: numbered list with `divide-y divide-border`, rank number in `text-[12px] font-semibold text-muted-foreground w-4`
- Results view: category filter chips + count + product grid
- Empty state: `py-20 text-center text-[13px] text-muted-foreground`

### 7.13 Empty / Not Found States
- Centered: `min-h-screen flex items-center justify-center`
- Title: `text-[15px] font-semibold text-foreground mb-1`
- Subtitle: `text-[13px] text-muted-foreground mb-4`
- Action link: `text-[13px] font-medium text-foreground underline underline-offset-4`

### 7.14 Success State (after form submit)
- Centered layout
- Success icon: `w-14 h-14 rounded-full bg-success/10` with checkmark SVG `w-6 h-6 text-success`
- Title: `text-[15px] font-semibold`
- Subtitle: `text-[13px] text-muted-foreground mb-5`
- CTA: `px-5 py-2 rounded-lg bg-foreground text-background text-[13px] font-medium`

---

## 8. Divider Pattern

Section dividers use a simple `<div className="h-px bg-border" />` — no `<hr>`, no Separator component needed. Used between content blocks on detail pages and between header sections.

For horizontal chip/filter rows, a vertical divider: `<div className="w-px h-5 bg-border flex-shrink-0" />`

---

## 9. Interaction Patterns

| Interaction | Behavior |
|------------|----------|
| Card hover | Wishlist button fades in. No lift, no shadow. |
| Chip tap | Instant color swap (`bg-foreground ↔ bg-secondary`). No animation. |
| Button hover | `hover:bg-foreground/90` for primary, `hover:bg-secondary` for ghost |
| Focus | `focus:ring-1 focus:ring-ring` (thin black ring) |
| Liked heart | `fill-destructive text-destructive` when active |
| Page navigation | Instant, no transitions |
| Image load | Opacity transition from 0→1 (detail page only) |
| Horizontal scroll | `overflow-x-auto scrollbar-hide` — native scroll, hidden scrollbar |

---

## 10. Scrollbar Hide Utility

```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

## 11. Safe Area Utility

```css
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

Applied to bottom nav and sticky action bars for iPhone notch support.

---

## 12. Border Radius Scale

```ts
borderRadius: {
  lg: "var(--radius)",              // 10px — default cards
  md: "calc(var(--radius) - 2px)",  // 8px
  sm: "calc(var(--radius) - 4px)",  // 6px
  xl: "0.875rem",                   // 14px
  "2xl": "1rem",                    // 16px
}
```

Common usage:
- Images: `rounded-lg`
- Chips: `rounded-full`
- Inputs: `rounded-lg`
- Primary CTA buttons: `rounded-xl`
- Icon containers: `rounded-xl`
- Photo thumbnails: `rounded-xl`

---

## 13. Icon Usage

All icons from `lucide-react`.

| Context | Size | StrokeWidth |
|---------|------|-------------|
| Header icons | `w-[18px] h-[18px]` | 1.5 |
| Bottom nav icons | `w-[21px] h-[21px]` | 1.5 (inactive), 2 (active) |
| Category grid icons | `w-5 h-5` | 1.5 |
| Small inline icons | `w-3 h-3` to `w-3.5 h-3.5` | default |
| Card wishlist heart | `w-3.5 h-3.5` | default |
| Menu list icons | `w-[18px] h-[18px]` | 1.5 |
| Back arrow | `w-5 h-5` | 1.5 |

---

## 14. Routing Structure

| Path | Page | Layout |
|------|------|--------|
| `/` | Home (Index) | Header + BottomNav |
| `/categories` | Browse/Categories | Header + BottomNav |
| `/search` | Search | Custom header + BottomNav |
| `/profile` | Profile | Header + BottomNav |
| `/product/:id` | Product Detail | Floating top bar + Sticky buy bar |
| `/sell` | Sell Form | Back-arrow header + Sticky submit bar |
| `*` | 404 Not Found | Minimal centered |

---

## 15. Data Model

### Product
```ts
interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  category: string;
  seller: { name: string; avatar?: string };
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  timeAgo: string;
  condition?: "New" | "Used" | "Like New";
}
```

### Categories
```ts
categories: { name: string; count: number }[]
subcategories: Record<string, string[]>  // category name → subcategory list
```

---

## 16. Key Visual Decisions Summary

1. **Primary buttons** = `bg-foreground text-background rounded-xl h-11 text-[14px] font-semibold`
2. **Secondary/outline buttons** = `border border-border rounded-lg text-[13px] font-medium hover:bg-secondary`
3. **All surfaces** are flat — no box-shadow except on sticky/fixed elements (which use backdrop-blur instead)
4. **Sticky bars** use `bg-card/95 backdrop-blur-md border-t border-border` — translucent blur, not opaque
5. **Product images** are `aspect-[3/4]` (tall editorial crop) in cards, `aspect-[4/5]` on detail page
6. **Section pattern**: optional label row ("Section Title" + "See all") → content → divider
7. **Chip selection** is binary: `bg-foreground text-background` (selected) vs `bg-secondary text-muted-foreground` (unselected)
8. **Form labels**: `text-[13px] font-semibold text-foreground mb-1.5 block`
9. **"See all" links**: `text-[12px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5` with ChevronRight icon

---

*v1.0 — February 2026. Complete implementation reference for AI agents.*

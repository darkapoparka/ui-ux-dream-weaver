# Treido — UI/UX Design Guide & Audit

> A comprehensive design system and improvement guide for treido.eu, a Bulgarian marketplace platform.

---

## 1. Current State Audit

### What's Working ✅
- **Clean product card layout** — Good use of 2-column grid on mobile, image-first approach
- **Category navigation** — Horizontal scrollable chips are mobile-friendly
- **Bottom navigation bar** — Standard mobile marketplace pattern (Home, Listings, Add, Chat, Profile)
- **Price badge** — Orange/amber pill for price is eye-catching and consistent
- **Wishlist hearts** — Familiar e-commerce pattern, well-placed
- **Verified badges** — Good trust signal on listings
- **Discount badges** — Red percentage badges on product images are effective
- **Desktop sidebar categories** — Well-organized with icons

### What Needs Improvement ❌

#### 1.1 Visual Hierarchy & Spacing
- **Product cards feel cramped** — Not enough padding between card elements (image, title, price, date)
- **Inconsistent vertical rhythm** — Spacing between sections (categories → tabs → products) varies
- **Title truncation is aggressive** — "2022 BMW 330i x..." loses critical info. Use 2-line clamp instead of 1
- **Date text is too small and low-contrast** — "преди 4 седм." is barely readable

#### 1.2 Typography
- **No typographic hierarchy** — Product titles, category labels, and prices all feel the same visual weight
- **Body text is generic** — Appears to use system/default sans-serif with no personality
- **Price typography needs more punch** — The orange pill is good but the number inside could be bolder

#### 1.3 Color System
- **Too monochrome** — The palette is basically white + dark gray + orange accent. Needs more depth
- **No surface variation** — Cards, background, and header are all pure/near-white. Add subtle surface tones
- **The orange (#F97316-ish) is overworked** — Used for prices, CTAs, bottom nav highlight, and add button. Differentiate primary actions from informational elements
- **Category chips lack visual distinction** — Active vs inactive state is too subtle

#### 1.4 Product Cards
- **No hover/tap states** — Cards should have subtle lift/shadow on interaction
- **Image aspect ratios are inconsistent** — Some square, some landscape. Standardize to 4:3 or 1:1
- **Seller avatar is too small** — At ~20px it's not recognizable, consider 28-32px
- **Category label on image is hard to read** — Semi-transparent overlay on varied backgrounds fails sometimes
- **No skeleton loading states** — Products should show animated placeholders while loading

#### 1.5 Product Detail Page
- **Too much whitespace below the fold** — The accordion sections (Specifications, Description, Delivery, Seller) are collapsed with nothing to entice expansion
- **CTA button is great** — The sticky bottom "Add to cart" is well-done, keep it
- **Image gallery is basic** — No thumbnail strip, no pinch-to-zoom indicator, no image count badge
- **Breadcrumbs/tags are underutilized** — "Електроника · Настол..." is truncated and not tappable-looking
- **No social proof** — Only 1 view shown. Add "X people viewing this" or seller response time

#### 1.6 Navigation & Information Architecture
- **Desktop header is sparse** — Large search bar is good, but the "Hello / Sign in" area feels unfinished
- **Mobile search is a text input** — Could be a tappable search bar that expands to a full search experience
- **No breadcrumbs on mobile** — Back arrow + title only. Add subtle breadcrumb or category context
- **Filter/sort options are hidden** — On mobile, critical filters should be more prominent

#### 1.7 Trust & Social Proof
- **No ratings on product cards** — Star ratings (when available) should show on cards
- **Seller reputation is invisible on browse** — Show seller rating/badge on cards
- **No "Recently Viewed" or "Similar Items"** — Missing engagement hooks
- **No urgency indicators** — "Only 1 left", "5 people watching" etc.

---

## 2. Design System Specification

### 2.1 Color Palette

```
// Primary Brand
--primary: 24 100% 50%          // #FF6600 — Warm orange, marketplace energy
--primary-hover: 24 100% 45%    // Darker on hover
--primary-foreground: 0 0% 100% // White text on primary

// Surfaces
--background: 220 20% 97%       // #F4F5F7 — Warm light gray, NOT pure white
--foreground: 220 25% 10%       // #151921 — Near-black for text
--card: 0 0% 100%               // #FFFFFF — Pure white cards float on gray bg
--card-foreground: 220 25% 10%
--card-hover: 220 15% 98%       // Subtle hover tint

// Secondary
--secondary: 220 15% 93%        // #ECEDF0 — Chip/tag backgrounds
--secondary-foreground: 220 20% 30%
--secondary-active: 24 100% 97% // Light orange tint for active filters

// Text Hierarchy
--muted: 220 10% 94%
--muted-foreground: 220 10% 50% // #757B85 — Secondary text, dates, metadata
--foreground-secondary: 220 15% 35% // Subtitles, descriptions

// Accent / Success / Destructive
--accent: 220 90% 56%           // #2563EB — Links, info badges
--accent-foreground: 0 0% 100%
--success: 145 65% 42%          // #22C55E — Verified, in stock
--destructive: 0 84% 60%        // #EF4444 — Errors, discount badges
--destructive-foreground: 0 0% 100%

// Borders
--border: 220 15% 90%           // #E2E4E8 — Subtle dividers
--border-strong: 220 15% 80%    // For input borders on focus
--ring: 24 100% 50%             // Focus ring = primary

// Shadows (define as CSS custom properties)
--shadow-card: 0 1px 3px 0 hsl(220 25% 10% / 0.04), 0 1px 2px -1px hsl(220 25% 10% / 0.04)
--shadow-card-hover: 0 4px 12px 0 hsl(220 25% 10% / 0.08), 0 2px 4px -2px hsl(220 25% 10% / 0.06)
--shadow-sticky: 0 -2px 10px 0 hsl(220 25% 10% / 0.06)
```

### 2.2 Typography

```
// Font Stack
--font-display: 'Plus Jakarta Sans', system-ui, sans-serif  // Headings, prices
--font-body: 'Inter', system-ui, sans-serif                  // Body text
--font-mono: 'JetBrains Mono', monospace                     // Prices (alternative)

// Scale (mobile-first)
--text-xs: 0.6875rem / 1rem      // 11px — Timestamps, badges
--text-sm: 0.8125rem / 1.25rem   // 13px — Metadata, captions
--text-base: 0.9375rem / 1.5rem  // 15px — Body text
--text-lg: 1.0625rem / 1.5rem    // 17px — Card titles
--text-xl: 1.25rem / 1.75rem     // 20px — Section headers
--text-2xl: 1.5rem / 2rem        // 24px — Page titles
--text-3xl: 1.875rem / 2.25rem   // 30px — Product detail price

// Weights
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800   // Prices only
```

### 2.3 Spacing System

```
// Base unit: 4px
--space-0: 0
--space-1: 0.25rem   // 4px
--space-2: 0.5rem    // 8px
--space-3: 0.75rem   // 12px
--space-4: 1rem      // 16px — Default card padding
--space-5: 1.25rem   // 20px
--space-6: 1.5rem    // 24px — Section gaps
--space-8: 2rem      // 32px — Major section breaks
--space-10: 2.5rem   // 40px
--space-12: 3rem     // 48px — Page margins top/bottom
```

### 2.4 Border Radius

```
--radius-sm: 6px     // Badges, small chips
--radius-md: 10px    // Buttons, inputs
--radius-lg: 14px    // Cards
--radius-xl: 20px    // Modals, bottom sheets
--radius-full: 9999px // Avatars, pills
```

---

## 3. Component Specifications

### 3.1 Product Card

```
Structure:
┌─────────────────────────┐
│  [IMAGE — 4:3 ratio]    │  ← border-radius: 14px top corners
│  ♡ (top-right, 36x36)   │  ← Frosted glass bg: white/70% + blur(8px)
│  -25% (top-left badge)  │  ← Red badge, only if discounted
├─────────────────────────┤
│  padding: 12px           │
│  Category • Subcategory  │  ← text-xs, muted-foreground, uppercase tracking-wide
│                          │
│  [Avatar 28px] Seller    │  ← text-sm, font-medium
│                          │
│  Product Title Here      │  ← text-base, font-semibold, line-clamp-2
│  That Can Wrap to Two    │
│                          │
│  €1,950  ̶€̶2̶,̶2̶0̶0̶         │  ← Price: text-lg font-extrabold
│                          │     Old price: text-sm line-through muted
│  ★ 4.8 (123) · 2h ago   │  ← text-xs, muted-foreground
│  ✓ Verified              │  ← text-xs, success color
└─────────────────────────┘

States:
- Default: shadow-card, bg-card
- Hover: shadow-card-hover, translateY(-2px), transition 200ms ease
- Active/Pressed: scale(0.98), transition 100ms
- Loading: Skeleton with shimmer animation
```

#### Card Image Best Practices
- **Aspect ratio**: Always 4:3 (or 1:1 for fashion/square items)
- **Object-fit**: `cover` with `object-position: center`
- **Lazy loading**: Use `loading="lazy"` + blur-up placeholder
- **Error state**: Show category-specific placeholder icon on gray bg

### 3.2 Category Chips / Filter Pills

```
// Inactive
bg: secondary (#ECEDF0)
text: secondary-foreground, font-medium, text-sm
border-radius: radius-full
padding: 6px 14px
border: 1px solid transparent

// Active
bg: primary (orange)
text: primary-foreground (white)
font-weight: semibold
shadow: 0 2px 8px hsl(24 100% 50% / 0.3)

// Hover (inactive)
bg: secondary darkened slightly
border: 1px solid border

Transition: all 200ms ease
```

### 3.3 Bottom Navigation (Mobile)

```
Height: 64px + safe-area-inset-bottom
Background: white with shadow-sticky
Border-top: 1px solid border

Items: 5 (Home, Browse, Add, Chat, Profile)
- Icon: 24x24
- Label: text-xs, 10px
- Gap between icon and label: 2px

Active state:
- Icon + label color: primary (orange)
- Icon: filled variant (not outline)
- Optional: Dot indicator below icon instead of color change

Center "Add" button:
- 52x52px circle
- bg: primary gradient (linear-gradient 135deg, hsl(24,100%,55%), hsl(24,100%,45%))
- shadow: 0 4px 12px hsl(24 100% 50% / 0.4)
- icon: white, 28px
- Elevated: translateY(-12px) above nav bar
```

### 3.4 Search Bar

```
// Mobile: Tappable bar (not input)
Height: 44px
bg: secondary
border-radius: radius-full
padding: 0 16px
Icon: Search (20px), muted-foreground
Placeholder text: "Search products, brands..."
Tap → Full-screen search overlay

// Desktop: Functional input
Height: 48px
bg: white
border: 1.5px solid border
border-radius: radius-full
Focus: border-color primary, ring: 0 0 0 3px hsl(24 100% 50% / 0.15)
```

### 3.5 Price Display

```
// Current price
font-family: font-display
font-weight: 800 (extrabold)
font-size: text-lg on cards, text-3xl on detail
color: foreground
letter-spacing: -0.02em

// Consider NOT using a colored pill for the price.
// Instead, let the number speak for itself with weight + size.
// Reserve colored pills for discount percentages only.

// Old/crossed price
font-weight: 400
font-size: text-sm
color: muted-foreground
text-decoration: line-through

// Discount badge
bg: destructive
color: white
font-weight: 700
font-size: text-xs
padding: 4px 8px
border-radius: radius-sm
position: absolute top-left of image
```

### 3.6 Product Detail Page

```
Structure:
┌─────────────────────────────┐
│ [← Back] [SellerAvatar Name] [♡] [↗Share] │  ← Sticky header, 56px
├─────────────────────────────┤
│                              │
│  [IMAGE GALLERY]             │  ← Full-width, swipeable
│  [● ○ ○ ○] 1/4              │  ← Dot indicators + count
│                              │
├─────────────────────────────┤
│  padding: 16px               │
│                              │
│  Category · Subcategory      │  ← Tappable links, text-sm
│  ⏱ 3 months · 👁 12 views   │  ← Right-aligned metadata
│                              │
│  €499,99                     │  ← text-3xl, font-extrabold
│  ̶€̶6̶6̶6̶ · Save 25%           │  ← Show savings explicitly
│                              │
│  Product Full Title Here     │  ← text-xl, font-semibold
│                              │
│  [New] [Free Shipping]       │  ← Condition + shipping badges
│  📍 Sofia, Bulgaria          │
│                              │
│  ─────────────────────────   │
│                              │
│  [Expandable Sections]       │
│  ▸ Specifications (3)        │  ← Show count of specs
│  ▸ Description               │  ← Show first 2 lines preview
│  ▸ Shipping & Returns        │
│  ▸ Seller Info ★4.8          │  ← Show seller rating inline
│                              │
│  ─────────────────────────   │
│                              │
│  Similar Products            │  ← Horizontal scroll cards
│  [Card] [Card] [Card] →      │
│                              │
├─────────────────────────────┤
│ [💬 Chat]  [🛒 Add · €499]  │  ← Sticky bottom, 72px + safe area
│  secondary    primary btn     │
└─────────────────────────────┘

Accordion improvements:
- Show preview content (2-line snippet for Description)
- Show item count for Specifications
- Animate with spring easing, not linear
- Add subtle left border accent on expanded state
```

---

## 4. Interaction & Animation Guide

### 4.1 Micro-interactions

```
// Card hover (desktop)
transform: translateY(-2px)
box-shadow: shadow-card → shadow-card-hover
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)

// Card press (mobile)
transform: scale(0.98)
transition: transform 100ms ease

// Wishlist heart
Tap → Scale bounce: 1 → 1.3 → 1 (300ms spring)
Fill animation: stroke-dashoffset from 100% to 0
Color: muted-foreground → destructive (red)

// Price count-up (detail page)
Numbers animate from 0 to final value on page load
Duration: 600ms, ease-out

// Pull-to-refresh
Custom branded animation (treido logo pulse)

// Bottom nav item switch
Active indicator: width morphs from pill to pill
Duration: 250ms, spring easing

// Skeleton loading
Shimmer gradient: 
  linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.4), transparent)
  animate: translateX(-100% → 100%), 1.5s infinite
```

### 4.2 Page Transitions

```
// Forward navigation (e.g., card → detail)
Shared element transition on product image (if supported)
Fallback: Slide in from right, 250ms ease

// Back navigation
Slide out to right, 200ms ease

// Tab/filter switch
Content: fade + translateY(8px → 0), 200ms
```

### 4.3 Scroll Behaviors

```
// Header
Scroll down → header collapses to compact (search bar only)
Scroll up → header expands
transition: height 200ms ease, opacity 150ms

// Bottom nav
Scroll down → hide (translateY 100%)
Scroll up → show
transition: transform 300ms ease

// Sticky CTA on detail page
Always visible, but add shadow only when page is scrolled
```

---

## 5. Layout & Grid System

### 5.1 Product Grid

```
// Mobile (< 640px)
Columns: 2
Gap: 10px
Card padding: 10px
Side margins: 12px

// Tablet (640px - 1024px)
Columns: 3
Gap: 16px
Card padding: 12px
Side margins: 24px

// Desktop (1024px - 1440px)
Columns: 4 (with sidebar)
Gap: 16px
Sidebar width: 240px

// Wide (> 1440px)
Columns: 5
Max content width: 1400px
Center aligned
```

### 5.2 Mobile Breakpoints

```
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1440px
```

---

## 6. UX Improvements Roadmap

### Priority 1 — Quick Wins (1-2 days)

1. **Fix image aspect ratios** — Force 4:3 on all product card images
2. **2-line title clamp** — `line-clamp-2` instead of `line-clamp-1`
3. **Increase card padding** — 10px → 12px internal padding
4. **Add card hover elevation** — Shadow + translateY
5. **Fix date readability** — Slightly larger, better contrast
6. **Add skeleton loading** — Shimmer placeholders for product cards
7. **Background color** — Change from pure white to warm gray (#F4F5F7)

### Priority 2 — Medium Effort (3-5 days)

8. **Redesign price display** — Remove orange pill, use bold typography instead. Reserve pills for discounts
9. **Add seller ratings to cards** — Star + number below seller name
10. **Improve filter chips** — Better active state with shadow/animation
11. **Image gallery on detail** — Add thumbnail strip, image count, pinch zoom
12. **Add "Similar Products" section** — Horizontal scroll on detail page
13. **Search UX** — Full-screen search on mobile with recent searches + suggestions
14. **Empty states** — Design branded empty states for no results, empty cart, etc.

### Priority 3 — High Impact (1-2 weeks)

15. **Shared element transitions** — Image morphs from card to detail page
16. **Pull-to-refresh** — Custom branded animation
17. **Smart header** — Collapse on scroll down, expand on scroll up
18. **Bottom nav hide on scroll** — More screen real estate for content
19. **Onboarding flow** — First-time user category selection
20. **Dark mode** — Full dark theme with all tokens mapped

---

## 7. Accessibility Checklist

- [ ] All interactive elements have min 44x44px touch targets
- [ ] Color contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for large text
- [ ] Focus indicators visible on all interactive elements (use --ring)
- [ ] Alt text on all product images (product title as alt)
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] Screen reader labels on icon-only buttons (wishlist, share, back)
- [ ] Reduced motion: respect `prefers-reduced-motion` — disable animations
- [ ] Keyboard navigation works for all interactive elements
- [ ] ARIA labels on filter chips indicating active/inactive state
- [ ] Skip-to-content link for keyboard users

---

## 8. Performance Guidelines

- **Images**: Use WebP/AVIF with `srcset` for responsive sizes. Max 800px wide for card thumbnails
- **Lazy load**: All images below the fold. Use `loading="lazy"` or Intersection Observer
- **Font loading**: `font-display: swap` on custom fonts. Preload primary font
- **Skeleton screens**: Show immediately, no spinner wheels
- **Virtualized lists**: For 50+ products, use virtual scrolling (e.g., `react-window`)
- **Critical CSS**: Inline above-fold styles
- **Bundle splitting**: Lazy load detail page, profile, chat modules

---

## 9. Competitive Benchmarks

Study these apps for inspiration on specific patterns:

| Feature | Reference App | What to Learn |
|---------|--------------|---------------|
| Product cards | **Depop** | Image-first, clean metadata |
| Search UX | **Amazon** | Predictive, category-scoped |
| Filters | **Airbnb** | Beautiful filter modals |
| Detail page | **StockX** | Price display, trust signals |
| Bottom nav | **Instagram** | Smooth transitions, center action |
| Animations | **Apple Store app** | Shared element, spring physics |
| Trust signals | **Vinted** | Seller ratings, verification |
| Empty states | **Shopify** | Branded, actionable illustrations |

---

## 10. Design Tokens Summary (Copy-Paste Ready)

### For CSS Variables (index.css / globals.css)

```css
:root {
  /* Surfaces */
  --background: 220 20% 97%;
  --foreground: 220 25% 10%;
  --card: 0 0% 100%;
  --card-foreground: 220 25% 10%;

  /* Brand */
  --primary: 24 100% 50%;
  --primary-foreground: 0 0% 100%;
  --primary-hover: 24 100% 45%;

  /* Secondary */
  --secondary: 220 15% 93%;
  --secondary-foreground: 220 20% 30%;

  /* Muted */
  --muted: 220 10% 94%;
  --muted-foreground: 220 10% 50%;

  /* Accent */
  --accent: 220 90% 56%;
  --accent-foreground: 0 0% 100%;

  /* Success */
  --success: 145 65% 42%;
  --success-foreground: 0 0% 100%;

  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Borders */
  --border: 220 15% 90%;
  --input: 220 15% 90%;
  --ring: 24 100% 50%;

  /* Radius */
  --radius: 0.625rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1.25rem;

  /* Shadows */
  --shadow-card: 0 1px 3px 0 hsl(220 25% 10% / 0.04), 0 1px 2px -1px hsl(220 25% 10% / 0.04);
  --shadow-card-hover: 0 4px 12px 0 hsl(220 25% 10% / 0.08), 0 2px 4px -2px hsl(220 25% 10% / 0.06);
  --shadow-sticky: 0 -2px 10px 0 hsl(220 25% 10% / 0.06);
}
```

### For Tailwind Config Extensions

```js
// Add to theme.extend
fontFamily: {
  display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
  body: ['Inter', 'system-ui', 'sans-serif'],
},
boxShadow: {
  card: 'var(--shadow-card)',
  'card-hover': 'var(--shadow-card-hover)',
  sticky: 'var(--shadow-sticky)',
},
```

---

## 11. Agent Instructions

When implementing this design system:

1. **NEVER use hardcoded colors** — Always reference CSS variables via Tailwind tokens
2. **NEVER use `text-white`, `bg-gray-100`** etc directly — Use `text-primary-foreground`, `bg-secondary`
3. **Component variants** — Create variants in shadcn components (e.g., `<Button variant="cta">`, `<Badge variant="discount">`)
4. **Mobile-first** — Write all styles mobile-first, enhance with `md:` and `lg:` breakpoints
5. **Animations** — Use `framer-motion` for page transitions and complex animations. CSS transitions for simple hover/focus states
6. **Images** — Always use `aspect-ratio`, `object-cover`, `loading="lazy"`, and error fallbacks
7. **Touch targets** — Minimum 44x44px on all interactive elements
8. **Consistency** — Use the spacing scale (multiples of 4px). Don't invent arbitrary values
9. **Test on real devices** — Especially the bottom nav safe area and sticky CTA

---

*Last updated: February 2025*
*Version: 1.0*

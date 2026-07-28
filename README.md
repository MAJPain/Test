# Maison Noire

An awards-style, editorial real-estate experience for a fictional boutique luxury brokerage. Built to feel cinematic — oversized typography, asymmetric layouts, smooth scrolling, and quiet, deliberate motion.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** (custom design tokens)
- **Framer Motion** — reveals, parallax, page transitions
- **Lenis** — smooth scroll
- **shadcn/ui** primitives (Button, Slider, Dialog), heavily customised
- **Lucide** icons
- **next/font** — Poppins (400 / 700 / 900)

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> Imagery is loaded from Unsplash's CDN, so a network connection is needed on first render. The allowed remote host is configured in `next.config.mjs`.

## Design system

Defined once in `tailwind.config.ts`:

| Token | Hex | Use |
| --- | --- | --- |
| `navy` | `#0A2540` | Backgrounds, headers, primary text |
| `navy-light` | `#1A3A5C` | Supporting blue |
| `brown` | `#8B6B47` | CTAs, accents, dividers |
| `cream` | `#E8E2D8` | Section fills |
| `offwhite` | `#FAFAF7` | Negative space, cards |
| `ink` | `#0A0A0A` | Near-black text |

## Structure

```
app/
  layout.tsx            Root shell — fonts, cursor, smooth scroll, nav, footer
  template.tsx          Per-route page-transition motion
  page.tsx              Home (hero → about → featured → curated → agent → testimonials)
  properties/           Listings grid + map toggle, and [slug] detail pages
  about/  agents/  contact/
components/
  ui/                   Customised shadcn primitives
  home/                 Home-page sections
  CustomCursor, SmoothScroll, LoadingScreen, Navbar, Footer,
  PropertyCard, ImageGallery, HorizontalScroller, Marquee,
  FilterBar, ScrollReveal, AnimatedHeading, MagneticButton,
  RevealImage, PropertyMap, FloorPlan, AgentsRoster, ContactForm
data/
  properties.ts  agents.ts  testimonials.ts  types.ts
lib/
  utils.ts              cn(), formatPrice(), pad()
```

## Notes

- The **map** is a self-contained stylised panel (`PropertyMap`) — no API keys or tile provider required. Swap in Mapbox/Google here if you want live tiles.
- The **contact** and **newsletter** forms are front-end only; wire them to your CRM/email endpoint in `ContactForm.tsx` and `Footer.tsx`.
- The loading screen shows once per browser session (guarded by `sessionStorage`).
- The custom cursor only activates on fine-pointer devices; touch devices keep native behaviour.

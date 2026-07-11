# erikjearl.com — Architecture & Stack Design

**Date:** 2026-07-10
**Status:** Approved direction (static-first; backend explicitly deferred)
**Companion:** `2026-07-10-visual-design.md` (what to build); this doc (how to build it).

## 1. Decision summary

| Axis | Decision | Why |
|---|---|---|
| Rendering | Static single-page site (no SSR) | Portfolio content; GitHub Pages hosting; Erik: "not adding complexity could be nice" |
| Frontend | React 18 + Vite + TypeScript | Erik's stack (TS on resume); Vite matches old portfolio's tooling but modern |
| Styling | Plain CSS with custom properties (design tokens) + CSS Modules per component | The design is bespoke; utility frameworks fight it. Tokens come straight from the visual spec |
| Animation | Hand-rolled hooks (IntersectionObserver, rAF) — no react-spring | The mockup proved the effects need ~150 lines of vanilla logic; a library adds weight and the old site's react-spring was part of its bugginess |
| Hosting | GitHub Pages, custom domain `erikjearl.com` | Free, already his workflow (`github.com/erikjearl/erikjearl.com`) |
| Backend | **None in v1.** Flask contact API sketched as Phase 2 | Erik: frontend-focused project for now |
| Resume | Static `public/resume.pdf`, linked from the Contact button | No server needed |

## 2. Repository layout

```
erikjearl.com/
├── docs/superpowers/specs/     # these design docs
├── media/                      # ORIGINAL photos (HEIC/JPG, source of truth)
├── mockups/                    # approved HTML mockups + assets (design reference, kept)
├── public/
│   ├── assets/                 # web-ready images (generated, committed)
│   ├── resume.pdf
│   └── CNAME                   # erikjearl.com
├── scripts/
│   └── convert-images.sh       # sips/sharp pipeline: media/ → public/assets/
├── src/
│   ├── main.tsx / App.tsx
│   ├── styles/tokens.css       # §3 of visual spec as :root custom properties
│   ├── content/                # ALL words & data live here, not in components
│   │   ├── jobs.ts             # experience rows
│   │   ├── projects.ts         # project cards
│   │   ├── prints.ts           # floating prints (src, caption, corner, tilt, speed, ar)
│   │   └── site.ts             # name, role, links, hero stamp, section labels
│   ├── hooks/
│   │   ├── useScrollProgress.ts  # lerped page % for the rail
│   │   ├── useParallax.ts        # data-speed translate3d
│   │   ├── useReveal.ts          # IO-driven reveal (never on positioned/parallax els)
│   │   └── useReducedMotion.ts
│   └── components/
│       ├── TopNav/
│       ├── RouteRail/          # wandering SVG line + clamped anchor dots
│       ├── Section/            # bg-layer + scrim + content scaffolding
│       ├── Hero/
│       ├── About/
│       ├── Experience/         # maps jobs.ts
│       ├── Projects/           # Banner + CardGrid, maps projects.ts
│       ├── Contact/            # Starfield + FloatPhoto×4, maps prints.ts
│       ├── FloatPhoto/
│       ├── Starfield/
│       └── GrainOverlay/
└── .github/workflows/deploy.yml
```

**Design rule carried over:** content (copy, jobs, climbs) is data in `src/content/`; changing a job or adding a climb never touches a component.

## 3. Component contracts (the load-bearing ones)

- **`Section`** — props: `id`, `bg?` (src, speed, filter/blend preset, masks), `scrim?`, `children`. Owns the bg-layer/scrim/content stacking so per-section CSS only handles its gradient and layout. Prevents the class-soup the mockup accumulated.
- **`RouteRail`** — reads section ids from `site.ts`; measures offsets on mount/resize; renders track+fill paths (`pathLength=100`) and clamped (3.5–96.5%) anchor buttons. Consumes `useScrollProgress`.
- **`FloatPhoto`** — props: `src, caption?, position (corner offsets), tilt, speed, aspect`. Wrapper gets parallax translate; inner `figure` gets rotation + border + caption. Never wrapped in reveal (transform-conflict rule, visual spec §7).
- **`Starfield`** — renders N stars once (useMemo), pure CSS twinkle; skips animation under reduced motion.

## 4. Image pipeline

- `scripts/convert-images.sh`: converts `media/` originals → `public/assets/` JPEG (1600px, q80; panoramas 2000px), kebab-case names. Run manually when photos change; outputs committed (no build-time dependency on HEIC tooling in CI).
- Hero (`elcap.jpg`) gets `<link rel="preload">`; below-fold images `loading="lazy"`; explicit width/height to avoid CLS.
- Later (non-blocking): WebP/AVIF + `srcset`.

## 5. Build & deploy

- `npm run dev` (Vite), `npm run build` → `dist/`.
- GitHub Actions workflow on push to `main`: build → deploy to Pages (official `actions/deploy-pages`). No `gh-pages` npm package (old portfolio's approach; Actions is cleaner).
- `public/CNAME` = `erikjearl.com`; DNS A/ALIAS records at registrar per GitHub Pages docs; enforce HTTPS.
- Vite `base: '/'` (custom domain = root path — simpler than the old project-pages `/Portfolio-Page/` base).

## 6. Phase 2 sketch (explicitly deferred — do not build in v1)

Contact form + messaging, if/when wanted:
- Small Flask service: `POST /api/contact` (name, email, message; validation + rate limiting) → email relay or store.
- Host on Erik's home-lab Kubernetes (his DBaaS/operator experience makes this trivial) behind Cloudflare, or a free-tier PaaS.
- Static site talks to it via `fetch`; CORS pinned to erikjearl.com. Site must keep working if the API is down (mailto fallback).
- Also possible later: live climbing-ticks feed from his Mountain Project MCP/data platform.

## 7. Verification plan for v1

- Visual: side-by-side scroll of built site vs `mockups/d-immersive.html` at 1440×900 (the approved reference), plus 1280 and a mobile width.
- Lighthouse: perf ≥ 85 (image-heavy page — preload hero, lazy the rest), a11y ≥ 95.
- Manual: rail dots navigate & clamp; reveals fire once; reduced-motion honored; all links + resume download; grain/starfield present; no console errors.

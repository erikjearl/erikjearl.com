# erikjearl.com — Visual Design Spec

**Date:** 2026-07-10
**Status:** Approved by Erik (first draft locked from `mockups/d-immersive.html`)
**Reference artifact:** `mockups/d-immersive.html` — a standalone HTML mockup that IS the approved design. When this spec and the mockup disagree, the mockup wins.

## 1. What this site is

A personal portfolio for Erik Earl — software engineer (currently Applied Materials; previously Platform & DevOps at Qualcomm), rock climber, and hiker. It replaces the 2023 GitHub Pages portfolio (`~/Developer/GitHub/Portfolio-Page`), whose playful, personal feel we want to keep, with a mature execution.

**The identity statement the site makes:** a credible, senior-reading engineer whose life happens outdoors. The professional content could stand alone in front of any recruiter; the climbing identity is carried entirely by photography, color, and motion.

**The governing tone rule (most important decision in this project):**
> Explicit climbing metaphors in *written copy* read as corny. Images and visuals do the climbing talking; text stays professional. The ceiling for metaphor in writing is a quiet section label like "i. The Approach". No grades on jobs, no "Pitch 1", no "beta" sidebars, no "summit register".
> Exception: photo captions may state real climbing facts (route name, grade, area) because they are factual, not metaphorical.

## 2. Core concept: scroll as ascent

One continuous page. Scrolling down represents moving up and through a day in the mountains — expressed only through visuals:

- **Light journey:** daylight valley (hero) → shaded granite/forest (about) → warm rock (experience) → desert dusk (projects) → night with stars and moon (contact).
- **Route rail (signature element):** a fixed left rail with a hand-drawn-feeling, gently wandering SVG line that fills in amber as you scroll, with clickable anchor dots per section.
- All photography is Erik's own (in `media/`, web-converted into `mockups/assets/`).

## 3. Design tokens

### Color (CSS custom properties)
| Token | Value | Role |
|---|---|---|
| `--valley-dark` | `#101612` | Page base, hero/about depths |
| `--valley-green` | `#2c4632` | Valley gradient stop |
| `--rock-warm` | `#54402f` | About → experience bridge |
| `--sandstone` | `#c46a34` | Experience bottom / projects top |
| `--sandstone-deep` | `#71351b` | Experience mid |
| `--dusk-pink` | `#d98a83` | (reserved; no longer in projects gradient) |
| `--dusk-lav` | `#75648c` | (reserved; contact now opens on sampled sand) |
| `--summit-indigo` | `#221f3e` | Contact night |
| `--summit-ink` | `#131226` | Page end |
| `--paper` | `#f1ece1` | Text |
| `--rope` | `#e8c15a` | Accent: rail fill, numerals, links |
| `--rope-bright` | `#f4d98a` | Accent hover/emphasis |
| Sampled `#c9ab8a → #a8937a → #89775F` | from `landscape.jpg` ground | Projects fade (see §5.5) |

### Type
- **Display:** Fraunces (600/700; italic 500/600) — headings, year numerals, brand.
- **Body/utility:** IBM Plex Mono (400/500/600) — body copy, labels, tags, captions. Uppercase + letter-spacing for eyebrows/labels.
- Loaded via Google Fonts. This pairing was kept deliberately after testing well with Erik across mockups.

### Layout
- Left rail width `--rail-w: 112px` (64px under 1080px). Content padding-left `calc(--rail-w + 28px)`, right `8vw`.
- Full-viewport sections (`min-height:100vh`), desktop-first; must not break at 1280px.

### Texture/motion
- Film grain: fixed body::after, SVG feTurbulence data-URI, opacity .055 — unifies the mixed photography.
- Reveal-on-scroll: IntersectionObserver, staggered delays (.1/.22/.34/.46s), translateY(38px) fade-in.
- Parallax: `.bg-layer` and `.float-photo` translate by `section.getBoundingClientRect().top × data-speed` (speeds .05–.15 backgrounds, −.03–−.05 prints).
- Rope fill is lerp-smoothed (factor .14) via requestAnimationFrame.
- `prefers-reduced-motion`: disables Ken Burns, bob, twinkle, reveals, parallax, smooth scroll.

## 4. Persistent chrome

### Top nav (adopted from mockup C at Erik's request)
Fixed; "Erik Earl" brand in Fraunces italic left; mono uppercase links About / Experience / Projects / Contact right; top gradient fade background; rope-gold hover underline.

### Route rail
- Wandering SVG path (two strands: dim track + amber fill via `pathLength=100` + dasharray). The wander is intentional and liked; do not straighten.
- Anchor dots: buttons placed by JS at each section's scroll fraction, **clamped to 3.5%–96.5%** (unclamped dots were cut off at viewport edges — fixed bug). States: passed (gold), active (bright + halo). Hover/focus tooltip: About/Experience/Projects/Contact (plain names, not metaphor names).
- **Rejected:** live elevation readout chip + elevation tick labels ("altimeter"). Tried, felt arbitrary. The elevation *stamp* in the hero stays; the instrument does not.

## 5. Sections

### 5.1 Hero
- Full-bleed `elcap.jpg` with slow Ken Burns settle (scale 1.09→1, 7s) + parallax; bottom scrim.
- Eyebrow stamp: `Yosemite Valley · El. 3,966 ft` (rope gold, rules either side) — explicitly liked; keep.
- H1 "Erik Earl / *Software Engineer*" (italic gold em). Role line: "Currently building at **Applied Materials**. Platform & DevOps engineer who spends weekdays in Kubernetes clusters and weekends on granite." (This one personality line is approved copy.)
- Bobbing "Scroll" cue bottom-right (was "Start the climb" — rejected as corny).

### 5.2 i. The Approach (About)
The panel that took the most iteration. Final design:
- Background: `gear.jpg` (helmet + rack on JT granite, ringtail cat) on right 48%, `blur(1.2px) saturate(.85) brightness(.88)`, `scale(1.03)` to hide blur edges. Left→right scrim from `--valley-dark` to transparent. Depth-of-field: background recedes, print pops.
- Portrait: `erik.jpg` (film-look headshot) as a **physical print** — `width:min(26vw,400px)`, square crop, **8px paper matte border `#ece5d6`**, deep shadow, tilt −2.2°, slight parallax drift, vertically centered (`top:50%; margin-top:-215px`). No caption (removed at Erik's request).
- Copy: "Hi, I'm Erik." + two professional paragraphs (Kubernetes/CKAD/Applied Materials; CWRU B.S. CS, AI minor, Cum Laude Dec 2024; climbing mentioned once, factually). Tags: Kubernetes · CKAD Certified · Platform Engineering (Trad Climber tag removed).
- **Rejected on the way here:** (a) two stacked busy climbing photos (rappel frame over climber bg) — didn't flow; (b) soft-mask "double exposure" blend of the headshot into a storm background — pale-sky halo, city-content collage mismatch, and a transform conflict bug (see §7). Documented so we don't retry it.

### 5.3 ii. Experience
- Background: `topo.jpg` (mountain face with drawn route lines) at **opacity .42, mix-blend soft-light, contrast 1.2, saturate 1.35** — punchy and visible (was luminosity .14 — rejected as "blurred away"). Bottom 18% mask-faded so texture doesn't hard-stop at the section seam.
- Section gradient: `--rock-warm → #64381f → --sandstone-deep → --sandstone`.
- Header: "ii. Experience / Where I've worked." + one-line sub.
- Jobs as full-width rows (grid `110px 1fr 200px`): left = Fraunces italic year (`2026 Present`, `2025 —2026`, `2023 & 2024`, `2022 —2023`), middle = company eyebrow + role h3 + professional paragraph, right = small mono tech list with rope-dim left border (Kubernetes/Python·Kopf/Cilium·Jenkins etc.). **No grades, no pitch numbers** — these replaced them.
- Content: Applied Materials (current, "Just getting started — more to come."), Qualcomm Platform & DevOps (DBaaS, Kopf operator, RKE2/Cilium migration, ExternalDNS/BlueCat, Jenkins), Qualcomm interns (cert-manager, Django IP lifecycle ~80%), Lubrizol co-op.

### 5.4 (removed) Field Notes
A standalone 3-photo band existed briefly — rejected ("takes unrelated space, doesn't deserve its own section"). Its idea survives as the floating prints on Contact.

### 5.5 iii. Projects — banner layout
- **Banner:** Erik's edited `landscape.jpg` (2000×885 — the `landscape banner` panorama plus extra ground at the bottom, extended by Erik specifically so the photo dissolves naturally). Anchored `object-position: center top`, img `height:155%` of the banner box so the added ground runs down behind the cards; masked in at the top (transparent→opaque over 0–17%, so the Experience orange bleeds in) and out over 52%→94%. `blur(.7px) saturate(.92) brightness(.94)` — "light tint/blur like the other backgrounds," dialed down from 1.5px on request.
- **Text pocket:** heading block ("iii. Projects / Selected projects." + home-lab sub) sits at banner bottom-left over a soft radial darkening (`ellipse 720×340 at 20% 82%, rgba(26,14,9,.58)`) — legibility without a visible scrim box. Plus a light warm→sand tint wash overall.
- **Gradient below (sampled, not invented):** `--sandstone → #c9ab8a (26%) → #a8937a (55%) → #89775F (100%)`. `#89775F` is the measured average of the photo's bottom strip; `#9F8B71` was the earlier banner-bottom sample. **No purple in this section** (explicit request — earlier orange→pink→lavender fade rejected).
- Cards: 3 glassy translucent cards (blur backdrop, 1px white border, hover lift): Minecraft Server Deployment Platform, Climbing Data AI Platform, Manga Translation Pipeline — each with description, mono stack line, gold context line (Home lab / Senior capstone).
- Seam fix (documented): projects gradient starts on the same `--sandstone` the Experience section ends on; banner top mask + topo bottom mask make the section boundary invisible.

### 5.6 iv. Contact — night summit
- Gradient picks up the projects end color and does the dusk-to-night: `#89775F → #6a5d68 → #3d3560 → --summit-indigo → --summit-ink`.
- Background: `introck.jpg` (JT formation, moon) at opacity .55 with a light radial scrim (approved: "shading much better"). Starfield: 130 CSS-twinkle stars in the upper 62%, random size/period/delay.
- Center: "iv. Contact / Get in *touch.*" + "Whether it's about work, climbing, or anything in between — my inbox is open." + dashed-row card (Email / GitHub / LinkedIn) + "Download Resume" button (`/resume`). Footer "© 2026 Erik Earl".
- **Four floating prints — Erik's real tick list, one per corner** (the personality payoff of the whole page; captions are factual so allowed):
  - Top-left: `white-rasta.jpg` — "White Rasta · V2 · Joshua Tree" (left 8vw, −2.6°, 3/4)
  - Top-right: `the-chief.jpg` — "The Chief · V4 · Black Mountain" (right 5vw, 2.2°, 4/3, 300px — enlarged on request)
  - Bottom-left: `slippery-souls.jpg` — "Slippery Souls · 5.10 · San Bernardino" (left 9vw, 1.8°, 3/4)
  - Bottom-right: `whodunnit.jpg` — "Whodunnit · 5.9 · Tahquitz" (right 6vw, −1.6°, 3/4)
  - All: 1px light border, dark caption bar, tilt via `--tilt`, drift via negative `data-speed`. Left-side prints were nudged inward from 5/6vw to 8/9vw to look centered.

## 6. Photo asset inventory

Source of truth: `media/` (originals, HEIC/JPG). Web assets: `mockups/assets/` (sips → JPEG, 1600px wide, q80; banner/landscape at 2000px).

| Asset | Content | Used in |
|---|---|---|
| elcap.jpg | El Capitan from valley floor | Hero background |
| erik.jpg | Film headshot (Erik-cropped) | About print |
| gear.jpg | Helmet + rack + ringtail on granite | About background |
| topo.jpg | Face with drawn route lines | Experience texture |
| landscape.jpg | Dusk panorama, Erik-extended bottom (2000×885) | Projects banner |
| introck.jpg | JT formation with moon | Contact background |
| white-rasta / the-chief / slippery-souls / whodunnit .jpg | Named climbs | Contact corner prints |
| rappel, climber, waterfall, storm, boulder, face, jtree, climbingrock, sandstone, landscape-banner .jpg | Tried and/or available | Unused in final — keep as bench |

## 7. Engineering notes from the mockup (carry into the real build)

- **Transform conflict rule:** never put `.reveal` (animates `transform`) on an element whose base position depends on its own transform or that parallax writes to. This caused the About portrait to render ~400px too low. Floating prints therefore do not use `.reveal`.
- Parallax writes `translate3d` inline on `.bg-layer`/`.float-photo`; rotation must live on a child (`figure`) not the drifting wrapper.
- Anchor dot positions are computed from `offsetTop / (scrollHeight − innerHeight)` and clamped.
- Masked images that also blur need a slight `scale()` to avoid bright edge fringing.
- Quality floor shipped in mockup: `:focus-visible` outlines, aria-labels on rail buttons, alt text everywhere, reduced-motion support, <1080px degrade (rail shrinks, stack grids, hide floats/stacks). Real build must keep all of it and do proper mobile.

## 8. Out of scope (explicitly)

- Backend of any kind (see architecture doc — phase 2 sketch only).
- Blog, project detail pages, CMS, analytics — not discussed; not in v1.
- Light mode. The design is photographic/dark by nature.

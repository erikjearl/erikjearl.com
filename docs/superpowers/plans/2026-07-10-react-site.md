# erikjearl.com React Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the approved design mockup (`mockups/d-immersive.html`) as a production Vite + React + TypeScript static site deployed to GitHub Pages at erikjearl.com.

**Architecture:** Single-page scroll site. All copy/data lives in `src/content/*.ts`; scroll/parallax/reveal behavior in small hooks over pure, unit-tested functions in `src/lib/`; each page section is a component with its own plain CSS file whose class names match the mockup 1:1 for faithful porting. No animation libraries, no backend.

**Tech Stack:** Vite 5, React 18, TypeScript (strict), Vitest + @testing-library/react + jsdom, plain CSS with custom properties, GitHub Actions → GitHub Pages.

## Global Constraints

- **`mockups/d-immersive.html` is the design source of truth.** When this plan's CSS/copy and the mockup disagree, the mockup wins. Copy text verbatim from it — do not paraphrase site copy.
- **Tone rule (from visual spec):** no climbing-metaphor copy beyond section labels like "i. The Approach". Photo captions with real route facts are allowed.
- **No animation/runtime libraries** beyond React + ReactDOM. No react-spring, no framer-motion, no Tailwind.
- Node 20.x. TypeScript `strict: true`.
- Class names in CSS must match the mockup's (`bg-layer`, `scrim`, `reveal`, `float-photo`, etc.) — CSS files are plain (not CSS Modules) and imported for side effects.
- `prefers-reduced-motion` must disable: Ken Burns, scroll-cue bob, star twinkle, reveals, parallax, smooth scroll.
- Never `git push` — Erik pushes himself. Committing locally per task is expected.
- Do not modify `mockups/`, `media/`, or `docs/superpowers/specs/`.

---

### Task 1: Scaffold Vite + React + TS + Vitest

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `src/App.test.tsx`
- Modify: `.gitignore` (append coverage/)

**Interfaces:**
- Produces: `App` component (default export) rendering `<main>` — every later component task mounts inside it. Test setup all later tests rely on (`npm test`).

- [ ] **Step 1: Write project files**

`package.json`:
```json
{
  "name": "erikjearl.com",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.0",
    "typescript": "^5.5.3",
    "vite": "^5.3.3",
    "vitest": "^2.0.2"
  }
}
```

`vite.config.ts`:
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
});
```

`src/test-setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';

// jsdom lacks IntersectionObserver; components guard on it, tests get a stub.
class IOStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).IntersectionObserver ??= IOStub;
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noEmit": true,
    "skipLibCheck": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"]
}
```

`index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Erik Earl — Software Engineer</title>
  <meta name="description" content="Erik Earl — software engineer at Applied Materials. Platform & DevOps engineering, Kubernetes, and rock climbing." />
  <meta property="og:title" content="Erik Earl — Software Engineer" />
  <meta property="og:description" content="Platform & DevOps engineer. Weekdays in Kubernetes clusters, weekends on granite." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://erikjearl.com" />
  <meta property="og:image" content="https://erikjearl.com/assets/elcap.jpg" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
  <link rel="preload" as="image" href="/assets/elcap.jpg" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

`src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

`src/App.tsx`:
```tsx
export default function App() {
  return <main />;
}
```

`src/vite-env.d.ts`:
```ts
/// <reference types="vite/client" />
```

Append to `.gitignore`:
```
coverage/
```

- [ ] **Step 2: Write the failing smoke test**

`src/App.test.tsx`:
```tsx
import { render } from '@testing-library/react';
import App from './App';

test('renders a main landmark', () => {
  const { getByRole } = render(<App />);
  expect(getByRole('main')).toBeInTheDocument();
});
```

- [ ] **Step 3: Install and run test (fails until install works, then passes)**

Run: `npm install && npm test`
Expected: 1 test PASS. Then `npm run build` → succeeds; `dist/` created.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json index.html src .gitignore
git commit -m "chore: scaffold Vite + React + TS + Vitest"
```

---

### Task 2: Design tokens, base styles, grain overlay

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/base.css`
- Modify: `src/main.tsx` (import both), `src/App.tsx`

**Interfaces:**
- Produces: CSS custom properties (`--valley-dark`, `--rope`, `--rail-w`, …) and shared classes `bg-layer`, `scrim`, `content`, `reveal`/`in`/`d1..d4`, `section-eyebrow`, `photo-cap`, `float-photo`, `tag-row` used by every section task. `App` gains class `site`.

- [ ] **Step 1: Write `src/styles/tokens.css`** (values verbatim from mockup `:root`)

```css
:root {
  --valley-dark: #101612;
  --valley-green: #2c4632;
  --rock-warm: #54402f;
  --sandstone: #c46a34;
  --sandstone-deep: #71351b;
  --dusk-pink: #d98a83;
  --dusk-lav: #75648c;
  --summit-indigo: #221f3e;
  --summit-ink: #131226;
  --paper: #f1ece1;
  --ink: #1c1912;
  --rope: #e8c15a;
  --rope-bright: #f4d98a;
  --rope-dim: rgba(232, 193, 90, .3);
  --sand-fade: #89775f; /* sampled from landscape.jpg bottom */
  --rail-w: 112px;
}
```

- [ ] **Step 2: Write `src/styles/base.css`** — port these blocks **verbatim from the mockup `<style>`**: the `*`/`html`/`body` reset (body font IBM Plex Mono, background `var(--valley-dark)`, `overflow-x:hidden`), `h1,h2,h3` (Fraunces), `a`, `img`, `:focus-visible`, the `body::after` film-grain rule (feTurbulence data-URI, opacity .055), `section` scaffolding (`min-height:100vh`, flex, padding `6rem 8vw 6rem calc(var(--rail-w) + 28px)`, `overflow:hidden`), `.bg-layer` (+ img), `.scrim`, `.content`, `.reveal`/`.reveal.in`/`.d1–.d4`, `.section-eyebrow` (+ `.num`, `.name`), `.photo-cap`, `.float-photo` (+ `figure` with `--tilt`/`--ar`, `.photo-cap` size override), `.tag-row`, and the two media queries (`max-width:1080px` incl. `--rail-w:64px`, hide `.float-photo`; `prefers-reduced-motion` block). Copy each rule exactly — open `mockups/d-immersive.html` and transcribe; do not restyle.

- [ ] **Step 3: Import styles and add site shell**

`src/main.tsx` — add above the App import:
```tsx
import './styles/tokens.css';
import './styles/base.css';
```

`src/App.tsx`:
```tsx
export default function App() {
  return <main className="site" />;
}
```

- [ ] **Step 4: Verify** — `npm test` still passes; `npm run dev`, open browser: page background is `#101612`, subtle grain texture visible on a white-ish element if you temporarily inspect (grain overlays whole viewport).

- [ ] **Step 5: Commit**

```bash
git add src/styles src/main.tsx src/App.tsx
git commit -m "feat: design tokens, base styles, film grain"
```

---

### Task 3: Content data modules

**Files:**
- Create: `src/content/site.ts`, `src/content/jobs.ts`, `src/content/projects.ts`, `src/content/prints.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Produces:
  - `site.ts`: `export interface SectionDef { id: string; label: string }`, `export const sections: SectionDef[]` (hero/Top, approach/About, experience/Experience, projects/Projects, contact/Contact), `export const site` with fields `name, role, company, heroStamp, heroLede, aboutHeading, aboutParas: string[], aboutTags: string[], email, github, linkedin, resumeHref`.
  - `jobs.ts`: `export interface Job { year: string; yearNote: string; company: string; title: string; description: string; stack: string[] }`, `export const jobs: Job[]` (4 entries).
  - `projects.ts`: `export interface Project { num: string; title: string; description: string; stack: string; context: string }`, `export const projects: Project[]` (3 entries).
  - `prints.ts`: `export interface Print { src: string; alt: string; caption: string; pos: React.CSSProperties; tilt: string; speed: number; ar: string; width?: string }`, `export const contactPrints: Print[]` (4), `export const aboutPrint: Print` (erik.jpg, no caption → `caption: ''`).

- [ ] **Step 1: Write the failing test**

`src/content/content.test.ts`:
```ts
import { sections, site } from './site';
import { jobs } from './jobs';
import { projects } from './projects';
import { contactPrints, aboutPrint } from './prints';

test('five sections in ascent order', () => {
  expect(sections.map(s => s.id)).toEqual(['hero', 'approach', 'experience', 'projects', 'contact']);
  expect(sections.map(s => s.label)).toEqual(['Top', 'About', 'Experience', 'Projects', 'Contact']);
});

test('hero stamp keeps the elevation Erik liked', () => {
  expect(site.heroStamp).toBe('Yosemite Valley · El. 3,966 ft');
});

test('four jobs, newest first, no climbing-metaphor labels', () => {
  expect(jobs).toHaveLength(4);
  expect(jobs[0].company).toBe('Applied Materials');
  for (const j of jobs) {
    expect(`${j.title} ${j.description}`).not.toMatch(/pitch|belay|crux|summit register|5\.\d/i);
  }
});

test('three projects with context lines', () => {
  expect(projects).toHaveLength(3);
  expect(projects.map(p => p.context)).toEqual(['Home lab', 'Home lab', 'Senior capstone']);
});

test('four contact prints = the tick list, with factual captions', () => {
  expect(contactPrints).toHaveLength(4);
  expect(contactPrints.map(p => p.caption)).toEqual([
    'White Rasta · V2 · Joshua Tree',
    'The Chief · V4 · Black Mountain',
    'Slippery Souls · 5.10 · San Bernardino',
    'Whodunnit · 5.9 · Tahquitz',
  ]);
  for (const p of [...contactPrints, aboutPrint]) expect(p.alt.length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL (modules don't exist).

- [ ] **Step 3: Implement the four modules.** All strings verbatim from `mockups/d-immersive.html` body copy. Key excerpts (transcribe the rest from the mockup):

`src/content/site.ts`:
```ts
export interface SectionDef { id: string; label: string }
export const sections: SectionDef[] = [
  { id: 'hero', label: 'Top' },
  { id: 'approach', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
export const site = {
  name: 'Erik Earl',
  role: 'Software Engineer',
  company: 'Applied Materials',
  heroStamp: 'Yosemite Valley · El. 3,966 ft',
  heroLede: 'Platform & DevOps engineer who spends weekdays in Kubernetes clusters and weekends on granite.',
  aboutHeading: "Hi, I'm Erik.",
  aboutParas: [
    "I'm a Platform & DevOps engineer specializing in Kubernetes — CKAD certified, currently a software engineer at Applied Materials. I hold a B.S. in Computer Science with an AI minor from Case Western Reserve University, graduated Cum Laude in December 2024.",
    "Outside of work I'm a rock climber and hiker, happiest on granite in Yosemite or desert rock in Joshua Tree.",
  ],
  aboutTags: ['Kubernetes', 'CKAD Certified', 'Platform Engineering'],
  email: 'erikjearl@gmail.com',
  github: 'https://github.com/erikjearl',
  linkedin: 'https://linkedin.com/in/erikjearl',
  resumeHref: '/resume.pdf',
};
```

`src/content/prints.ts` (positions/tilts/speeds verbatim from mockup inline styles):
```ts
import type { CSSProperties } from 'react';

export interface Print {
  src: string; alt: string; caption: string;
  pos: CSSProperties; tilt: string; speed: number; ar: string; width?: string;
}

export const contactPrints: Print[] = [
  { src: '/assets/white-rasta.jpg', alt: 'White Rasta boulder, Joshua Tree', caption: 'White Rasta · V2 · Joshua Tree', pos: { left: '8vw', top: '7rem' }, tilt: '-2.6deg', speed: -0.03, ar: '3/4' },
  { src: '/assets/the-chief.jpg', alt: 'The Chief boulder at golden hour, Black Mountain', caption: 'The Chief · V4 · Black Mountain', pos: { right: '5vw', top: '8.5rem' }, tilt: '2.2deg', speed: -0.05, ar: '4/3', width: '300px' },
  { src: '/assets/slippery-souls.jpg', alt: 'Climbing Slippery Souls beside a waterfall, San Bernardino', caption: 'Slippery Souls · 5.10 · San Bernardino', pos: { left: '9vw', bottom: '4rem' }, tilt: '1.8deg', speed: -0.045, ar: '3/4' },
  { src: '/assets/whodunnit.jpg', alt: 'Looking down the slab on Whodunnit, Tahquitz', caption: 'Whodunnit · 5.9 · Tahquitz', pos: { right: '6vw', bottom: '5rem' }, tilt: '-1.6deg', speed: -0.035, ar: '3/4' },
];

export const aboutPrint: Print = {
  src: '/assets/erik.jpg', alt: 'Erik', caption: '',
  pos: { right: '10vw', top: '50%', marginTop: '-215px' }, tilt: '-2.2deg', speed: -0.035, ar: '1/1',
};
```

`jobs.ts` and `projects.ts`: transcribe the four `.job` rows and three `.proj-card`s from the mockup (Applied Materials 2026/Present "Just getting started — more to come." stack `['New chapter']`; Qualcomm 2025/— 2026 Platform & DevOps paragraph, stack `['Kubernetes','Python · Kopf','Cilium · Jenkins']`; Qualcomm 2023/& 2024 intern paragraph, stack `['Cert-Manager','Python · Django']`; Lubrizol 2022/— 2023 co-op paragraph, stack `['Bash · C++','JavaScript']`; projects: Minecraft Server Deployment Platform / Climbing Data AI Platform / Manga Translation Pipeline with their descriptions, stack strings `'Kubernetes · CRDs · Flask · Python'`, `'TypeScript · MCP · Kubernetes'`, `'PyTorch · U-Net · Computer Vision'`).

- [ ] **Step 4: Run tests** — `npm test` → all PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content
git commit -m "feat: content data modules (site, jobs, projects, prints)"
```

---

### Task 4: Static assets — images, resume, CNAME, favicon

**Files:**
- Create: `scripts/convert-images.sh`, `public/CNAME`, `public/favicon.svg`
- Create (generated): `public/assets/*.jpg`, `public/resume.pdf`

**Interfaces:**
- Produces: `/assets/<name>.jpg` URLs used by all section components: `elcap, erik, gear, topo, landscape, introck, white-rasta, the-chief, slippery-souls, whodunnit`.

- [ ] **Step 1: Write `scripts/convert-images.sh`**

```bash
#!/usr/bin/env bash
# Convert originals in media/ to web JPEGs in public/assets/ (macOS sips).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/assets

conv() { # conv <source-in-media> <out-name> <width>
  local src="media/$1" out="public/assets/$2.jpg" w="$3"
  sips -s format jpeg -s formatOptions 80 --resampleWidth "$w" "$src" --out "$out" >/dev/null
  echo "wrote $out"
}

conv "elcap.jpg"            elcap           1600
conv "erik.JPG"             erik            1200
conv "gear.HEIC"            gear            1600
conv "topo.jpg"             topo            1600
conv "landscape.HEIC"       landscape       2000
conv "introck.heic"         introck         1600
conv "white rasta.heic"     white-rasta     1600
conv "the cheif.heic"       the-chief       1600
conv "slippery souls.HEIC"  slippery-souls  1600
conv "whodunnit.HEIC"       whodunnit       1600
```

- [ ] **Step 2: Run it**

Run: `chmod +x scripts/convert-images.sh && ./scripts/convert-images.sh`
Expected: 10 `wrote public/assets/<name>.jpg` lines. Verify: `ls public/assets | wc -l` → 10.

- [ ] **Step 3: Resume, CNAME, favicon**

```bash
cp "/Users/erikjearl/Desktop/Erik Earl.pdf" public/resume.pdf
printf 'erikjearl.com\n' > public/CNAME
```

`public/favicon.svg` (amber route line on valley dark — the rail motif):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#101612"/>
  <path d="M16 4 C12 9 20 13 16 18 C13 22 19 25 16 28" fill="none" stroke="#e8c15a" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="16" cy="4" r="2.4" fill="#e8c15a"/>
</svg>
```

- [ ] **Step 4: Verify** — `npm run dev`, open `http://localhost:5173/assets/elcap.jpg` and `/resume.pdf` → both load.

- [ ] **Step 5: Commit**

```bash
git add scripts public
git commit -m "feat: image pipeline, web assets, resume, CNAME, favicon"
```

---

### Task 5: Pure scroll/star logic (TDD)

**Files:**
- Create: `src/lib/progress.ts`, `src/lib/stars.ts`
- Test: `src/lib/progress.test.ts`, `src/lib/stars.test.ts`

**Interfaces:**
- Produces:
  - `computeProgress(scrollY: number, docHeight: number, viewportH: number): number` — 0–100, 0 when unscrollable.
  - `clampAnchorPct(pct: number): number` — clamps to [3.5, 96.5].
  - `lerp(current: number, target: number, factor: number): number` — snaps to target when |Δ| < 0.05.
  - `generateStars(count: number, rand?: () => number): Star[]` where `Star = { left: string; top: string; size: number; period: string; delay: string; opacity: string }` (top within 0–62%, size 2 or 3).

- [ ] **Step 1: Write failing tests**

`src/lib/progress.test.ts`:
```ts
import { computeProgress, clampAnchorPct, lerp } from './progress';

test('computeProgress maps scroll range to 0..100', () => {
  expect(computeProgress(0, 5000, 1000)).toBe(0);
  expect(computeProgress(4000, 5000, 1000)).toBe(100);
  expect(computeProgress(2000, 5000, 1000)).toBe(50);
});

test('computeProgress is 0 for unscrollable pages and clamps overscroll', () => {
  expect(computeProgress(100, 800, 1000)).toBe(0);
  expect(computeProgress(9999, 5000, 1000)).toBe(100);
});

test('clampAnchorPct keeps dots off the viewport edges', () => {
  expect(clampAnchorPct(0)).toBe(3.5);
  expect(clampAnchorPct(50)).toBe(50);
  expect(clampAnchorPct(100)).toBe(96.5);
});

test('lerp approaches target and snaps when close', () => {
  expect(lerp(0, 100, 0.14)).toBeCloseTo(14);
  expect(lerp(99.98, 100, 0.14)).toBe(100);
});
```

`src/lib/stars.test.ts`:
```ts
import { generateStars } from './stars';

test('generates n stars within the upper 62% with valid CSS values', () => {
  const stars = generateStars(130, () => 0.5);
  expect(stars).toHaveLength(130);
  for (const s of stars) {
    expect(parseFloat(s.top)).toBeLessThanOrEqual(62);
    expect([2, 3]).toContain(s.size);
    expect(s.period).toMatch(/^\d+(\.\d+)?s$/);
  }
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL (modules missing).

- [ ] **Step 3: Implement**

`src/lib/progress.ts`:
```ts
export function computeProgress(scrollY: number, docHeight: number, viewportH: number): number {
  const range = docHeight - viewportH;
  if (range <= 0) return 0;
  return Math.min(Math.max((scrollY / range) * 100, 0), 100);
}

export function clampAnchorPct(pct: number): number {
  return Math.min(Math.max(pct, 3.5), 96.5);
}

export function lerp(current: number, target: number, factor: number): number {
  const next = current + (target - current) * factor;
  return Math.abs(target - next) < 0.05 ? target : next;
}
```

`src/lib/stars.ts`:
```ts
export interface Star {
  left: string; top: string; size: number;
  period: string; delay: string; opacity: string;
}

export function generateStars(count: number, rand: () => number = Math.random): Star[] {
  return Array.from({ length: count }, () => ({
    left: `${(rand() * 100).toFixed(2)}%`,
    top: `${(rand() * 62).toFixed(2)}%`,
    size: rand() < 0.2 ? 3 : 2,
    period: `${(2.6 + rand() * 4).toFixed(2)}s`,
    delay: `${(rand() * 5).toFixed(2)}s`,
    opacity: `${(0.3 + rand() * 0.6).toFixed(2)}`,
  }));
}
```

- [ ] **Step 4: Run tests** — `npm test` → all PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib
git commit -m "feat: pure progress/star logic with tests"
```

---

### Task 6: Behavior hooks + Reveal component

**Files:**
- Create: `src/hooks/useReducedMotion.ts`, `src/hooks/useScrollProgress.ts`, `src/hooks/useParallax.ts`, `src/components/Reveal.tsx`
- Test: `src/components/Reveal.test.tsx`

**Interfaces:**
- Produces:
  - `useReducedMotion(): boolean`
  - `useScrollProgress(): number` — lerp-smoothed 0–100 (uses `computeProgress` + `lerp`, rAF loop).
  - `useParallax(ref: React.RefObject<HTMLElement>, speed: number): void` — writes `translate3d(0, <sectionTop×speed>px, 0)` on scroll (parent section's `getBoundingClientRect().top`); no-op under reduced motion.
  - `Reveal` component: `({ as?: 'div'|'p'|'h1'|'h2'|'h3'|'span', delay?: 0|1|2|3|4, className?, children, immediate? })` → renders element with classes `reveal d{delay}` and adds `in` when intersecting (or immediately if `immediate` or reduced motion or no IO). **Never wrap parallax/absolutely-transform-positioned elements in Reveal (transform conflict — visual spec §7).**

- [ ] **Step 1: Write failing test**

`src/components/Reveal.test.tsx`:
```tsx
import { render } from '@testing-library/react';
import { Reveal } from './Reveal';

test('renders with reveal + delay classes and custom element', () => {
  const { container } = render(<Reveal as="h2" delay={1} className="x">Hi</Reveal>);
  const el = container.querySelector('h2.reveal.d1.x');
  expect(el).not.toBeNull();
  expect(el).toHaveTextContent('Hi');
});

test('immediate reveal starts with in class', () => {
  const { container } = render(<Reveal immediate>Now</Reveal>);
  expect(container.querySelector('.reveal.in')).not.toBeNull();
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL.

- [ ] **Step 3: Implement**

`src/hooks/useReducedMotion.ts`:
```ts
import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
```

`src/hooks/useScrollProgress.ts`:
```ts
import { useEffect, useState } from 'react';
import { computeProgress, lerp } from '../lib/progress';

export function useScrollProgress(): number {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let raf: number | null = null;

    const tick = () => {
      current = lerp(current, target, 0.14);
      setShown(current);
      raf = current !== target ? requestAnimationFrame(tick) : null;
    };
    const onScroll = () => {
      target = computeProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return shown;
}
```

`src/hooks/useParallax.ts`:
```ts
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useParallax(ref: RefObject<HTMLElement>, speed: number): void {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !speed) return;
    const el = ref.current;
    if (!el) return;
    const section = el.closest('section');
    if (!section) return;

    const onScroll = () => {
      const top = section.getBoundingClientRect().top;
      el.style.transform = `translate3d(0, ${(top * speed).toFixed(1)}px, 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, speed, reduced]);
}
```

`src/components/Reveal.tsx`:
```tsx
import { createElement, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface RevealProps {
  as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'span';
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  immediate?: boolean;
  children: ReactNode;
}

export function Reveal({ as = 'div', delay = 0, className = '', immediate = false, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(immediate);

  useEffect(() => {
    if (immediate || reduced || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate, reduced]);

  const cls = ['reveal', delay ? `d${delay}` : '', inView ? 'in' : '', className]
    .filter(Boolean).join(' ');
  return createElement(as, { ref, className: cls }, children);
}
```

- [ ] **Step 4: Run tests** — `npm test` → PASS (jsdom IO stub keeps non-immediate hidden; both tests target deterministic paths).

- [ ] **Step 5: Commit**

```bash
git add src/hooks src/components/Reveal.tsx src/components/Reveal.test.tsx
git commit -m "feat: reduced-motion, scroll-progress, parallax hooks + Reveal"
```

---

### Task 7: Section scaffold + FloatPhoto + TopNav

**Files:**
- Create: `src/components/Section.tsx`, `src/components/FloatPhoto.tsx`, `src/components/TopNav.tsx`, `src/styles/topnav.css`
- Test: `src/components/TopNav.test.tsx`

**Interfaces:**
- Produces:
  - `Section({ id, className?, bg?: { src, alt, speed }, scrim?: boolean, children })` → `<section id>` containing optional `.bg-layer` (parallaxed) + optional `.scrim` + children. Sections needing custom bg treatment style via `#id .bg-layer img` in their CSS file.
  - `FloatPhoto({ print: Print })` → `.float-photo` wrapper (parallax via `useParallax`, inline `pos`, `--tilt`, `--ar`, optional width) containing `figure > img + figcaption.photo-cap` (caption omitted when empty). No Reveal (transform-conflict rule).
  - `TopNav()` → fixed header `#topnav`, brand link `#hero`, nav links from `sections` (skipping `hero`).

- [ ] **Step 1: Write failing test**

`src/components/TopNav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { TopNav } from './TopNav';

test('brand plus one link per non-hero section', () => {
  render(<TopNav />);
  expect(screen.getByText('Erik Earl')).toHaveAttribute('href', '#hero');
  for (const [label, href] of [
    ['About', '#approach'], ['Experience', '#experience'],
    ['Projects', '#projects'], ['Contact', '#contact'],
  ] as const) {
    expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
  }
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL.

- [ ] **Step 3: Implement**

`src/components/Section.tsx`:
```tsx
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useParallax } from '../hooks/useParallax';

interface SectionProps {
  id: string;
  className?: string;
  bg?: { src: string; alt: string; speed: number };
  scrim?: boolean;
  children: ReactNode;
}

export function Section({ id, className, bg, scrim = false, children }: SectionProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  useParallax(bgRef, bg?.speed ?? 0);

  return (
    <section id={id} className={className}>
      {bg && (
        <div className="bg-layer" ref={bgRef}>
          <img src={bg.src} alt={bg.alt} loading={id === 'hero' ? 'eager' : 'lazy'} />
        </div>
      )}
      {scrim && <div className="scrim" />}
      {children}
    </section>
  );
}
```

`src/components/FloatPhoto.tsx`:
```tsx
import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useParallax } from '../hooks/useParallax';
import type { Print } from '../content/prints';

export function FloatPhoto({ print }: { print: Print }) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, print.speed);

  const style: CSSProperties = {
    ...print.pos,
    ...(print.width ? { width: print.width } : {}),
    ['--tilt' as string]: print.tilt,
    ['--ar' as string]: print.ar,
  };

  return (
    <div className="float-photo" ref={ref} style={style}>
      <figure>
        <img src={print.src} alt={print.alt} loading="lazy" />
        {print.caption && <figcaption className="photo-cap">{print.caption}</figcaption>}
      </figure>
    </div>
  );
}
```

`src/components/TopNav.tsx`:
```tsx
import { sections, site } from '../content/site';
import '../styles/topnav.css';

export function TopNav() {
  return (
    <header id="topnav">
      <a className="brand" href="#hero">{site.name}</a>
      <nav aria-label="Main">
        <ul>
          {sections.filter((s) => s.id !== 'hero').map((s) => (
            <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

`src/styles/topnav.css`: port the `#topnav` block verbatim from the mockup (fixed, gradient fade bg, Fraunces italic `.brand`, mono uppercase links with rope hover underline).

- [ ] **Step 4: Run tests** — `npm test` → PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Section.tsx src/components/FloatPhoto.tsx src/components/TopNav.tsx src/components/TopNav.test.tsx src/styles/topnav.css
git commit -m "feat: Section scaffold, FloatPhoto, TopNav"
```

---

### Task 8: RouteRail (progress line + anchor dots)

**Files:**
- Create: `src/components/RouteRail.tsx`, `src/styles/routerail.css`
- Test: `src/components/RouteRail.test.tsx`

**Interfaces:**
- Consumes: `useScrollProgress`, `clampAnchorPct`, `sections`.
- Produces: `RouteRail()` — fixed left `nav#rail` with track+fill SVG paths (the wandering path `M22,0 C14,110 30,210 22,320 C15,430 29,540 22,650 C16,760 28,870 22,1000`, `pathLength=100`, fill `strokeDasharray = "<pct> 100"`), one `button.anchor` per section (aria-label `Scroll to <label>`, tooltip via `data-label`, `passed`/`active` classes, click → `scrollIntoView`). Dot `top` = clamped section offset fraction, recomputed on mount + resize.

- [ ] **Step 1: Write failing test**

`src/components/RouteRail.test.tsx`:
```tsx
import { render } from '@testing-library/react';
import { RouteRail } from './RouteRail';

test('renders five clamped anchor buttons with labels', () => {
  const { container } = render(<RouteRail />);
  const dots = container.querySelectorAll('button.anchor');
  expect(dots).toHaveLength(5);
  expect(dots[0]).toHaveAttribute('aria-label', 'Scroll to Top');
  // jsdom: all offsets are 0 → every dot clamps to the 3.5% floor
  for (const d of Array.from(dots)) {
    expect((d as HTMLElement).style.top).toBe('3.5%');
  }
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL.

- [ ] **Step 3: Implement**

`src/components/RouteRail.tsx`:
```tsx
import { useEffect, useState } from 'react';
import { sections } from '../content/site';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { clampAnchorPct } from '../lib/progress';
import '../styles/routerail.css';

const ROUTE_D = 'M22,0 C14,110 30,210 22,320 C15,430 29,540 22,650 C16,760 28,870 22,1000';

export function RouteRail() {
  const pct = useScrollProgress();
  const reduced = useReducedMotion();
  const [tops, setTops] = useState<number[]>(() => sections.map(() => 3.5));

  useEffect(() => {
    const place = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setTops(sections.map((s) => {
        const el = document.getElementById(s.id);
        const frac = el && range > 0 ? Math.min(el.offsetTop / range, 1) * 100 : 0;
        return clampAnchorPct(frac);
      }));
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, []);

  const activeIdx = sections.reduce((acc, s, i) => {
    const el = document.getElementById(s.id);
    if (el && el.offsetTop <= window.scrollY + window.innerHeight * 0.4) return i;
    return acc;
  }, 0);

  return (
    <nav id="rail" aria-label="Page progress">
      <svg viewBox="0 0 44 1000" preserveAspectRatio="none" aria-hidden="true">
        <path className="track" d={ROUTE_D} />
        <path className="fill" pathLength={100} d={ROUTE_D}
          style={{ strokeDasharray: `${pct} 100` }} />
      </svg>
      {sections.map((s, i) => (
        <button
          key={s.id}
          className={`anchor${i <= activeIdx ? ' passed' : ''}${i === activeIdx ? ' active' : ''}`}
          data-label={s.label}
          aria-label={`Scroll to ${s.label}`}
          style={{ top: `${tops[i]}%` }}
          onClick={() =>
            document.getElementById(s.id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
          }
        />
      ))}
    </nav>
  );
}
```

`src/styles/routerail.css`: port `#rail`, `#rail svg`, `.track`, `.fill`, `.anchor` (+ `::after` tooltip, `.passed`, `.active`) verbatim from the mockup, including the <1080px overrides (`#rail svg{left:18px}`, `.anchor{left:40px}`).

- [ ] **Step 4: Run tests** — `npm test` → PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/RouteRail.tsx src/components/RouteRail.test.tsx src/styles/routerail.css
git commit -m "feat: RouteRail wandering progress line with clamped anchors"
```

---

### Task 9: Hero section

**Files:**
- Create: `src/components/Hero.tsx`, `src/styles/hero.css`

**Interfaces:**
- Consumes: `Section`, `Reveal`, `site`.
- Produces: `Hero()` rendered first in App.

- [ ] **Step 1: Implement**

`src/components/Hero.tsx`:
```tsx
import { Section } from './Section';
import { Reveal } from './Reveal';
import { site } from '../content/site';
import '../styles/hero.css';

export function Hero() {
  return (
    <Section id="hero" bg={{ src: '/assets/elcap.jpg', alt: 'El Capitan rising from the Yosemite valley floor', speed: 0.15 }} scrim>
      <div className="content">
        <Reveal immediate className="hero-stamp">{site.heroStamp}</Reveal>
        <Reveal as="h1" immediate>
          {site.name}<br /><em>{site.role.replace(' ', ' ')}</em>
        </Reveal>
        <Reveal as="p" immediate delay={1} className="hero-role">
          Currently building at <span className="co">{site.company}</span>. {site.heroLede}
        </Reveal>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </Section>
  );
}
```

`src/styles/hero.css`: port verbatim the mockup blocks `#hero`, `#hero .bg-layer img` (Ken Burns `@keyframes kenburns` scale 1.09→1 over 7s), `#hero .scrim`, `.hero-stamp` (+ `::before/::after` rules), `#hero h1` (+ `em`), `.hero-role` (+ `.co`), `.scroll-cue` (+ `.line`, `@keyframes bob`).

- [ ] **Step 2: Mount in App and eyeball**

`src/App.tsx`:
```tsx
import { TopNav } from './components/TopNav';
import { RouteRail } from './components/RouteRail';
import { Hero } from './components/Hero';

export default function App() {
  return (
    <main className="site">
      <TopNav />
      <RouteRail />
      <Hero />
    </main>
  );
}
```

Run: `npm run dev` → hero matches mockup: El Cap full-bleed with slow settle, gold elevation stamp, huge Fraunces name, rail on left, nav on top. `npm test` still green.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx src/styles/hero.css src/App.tsx
git commit -m "feat: hero section"
```

---

### Task 10: About section ("i. The Approach")

**Files:**
- Create: `src/components/About.tsx`, `src/styles/about.css`

**Interfaces:**
- Consumes: `Section`, `Reveal`, `FloatPhoto`, `site`, `aboutPrint`.

- [ ] **Step 1: Implement**

`src/components/About.tsx`:
```tsx
import { Section } from './Section';
import { Reveal } from './Reveal';
import { FloatPhoto } from './FloatPhoto';
import { site } from '../content/site';
import { aboutPrint } from '../content/prints';
import '../styles/about.css';

export function About() {
  return (
    <Section id="approach" bg={{ src: '/assets/gear.jpg', alt: 'Climbing helmet and rack on Joshua Tree granite, with a curious ringtail', speed: 0.07 }} scrim>
      <FloatPhoto print={aboutPrint} />
      <div className="content" style={{ maxWidth: 600 }}>
        <Reveal className="section-eyebrow">
          <span className="num">i.</span>
          <span className="name">The Approach</span>
        </Reveal>
        <Reveal as="h2" delay={1}>{site.aboutHeading}</Reveal>
        {site.aboutParas.map((p, i) => (
          <Reveal as="p" key={i} delay={(i + 2) as 2 | 3}>{p}</Reveal>
        ))}
        <Reveal className="tag-row" delay={4}>
          {site.aboutTags.map((t) => <span key={t}>{t}</span>)}
        </Reveal>
      </div>
    </Section>
  );
}
```

`src/styles/about.css`: port verbatim `#approach` (gradient), `#approach .bg-layer` (right 48%), `#approach .bg-layer img` (`blur(1.2px) saturate(.85) contrast(1.02) brightness(.88)` + `scale(1.03)`), `#approach .scrim` (left→right dark fade), `#approach .float-photo` (`width:min(26vw,400px)`) and `#approach .float-photo figure` (8px `#ece5d6` matte border, deep shadow), `#approach h2`, `#approach p`, and the <1080px `#approach{flex-direction:column}` override.

- [ ] **Step 2: Mount, eyeball, test** — add `<About />` after `<Hero />` in `App.tsx`. `npm run dev`: gear photo right (blurred, receded), tilted paper-matte portrait centered over it, no caption, three tags. `npm test` green.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx src/styles/about.css src/App.tsx
git commit -m "feat: about section with portrait print"
```

---

### Task 11: Experience section

**Files:**
- Create: `src/components/Experience.tsx`, `src/styles/experience.css`
- Test: `src/components/Experience.test.tsx`

**Interfaces:**
- Consumes: `Section`, `Reveal`, `jobs`.

- [ ] **Step 1: Write failing test**

`src/components/Experience.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';
import { jobs } from '../content/jobs';

test('renders every job with company, title, and stack', () => {
  render(<Experience />);
  for (const job of jobs) {
    expect(screen.getByText(job.title)).toBeInTheDocument();
  }
  expect(screen.getAllByText(/Qualcomm/)).not.toHaveLength(0);
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL.

- [ ] **Step 3: Implement**

`src/components/Experience.tsx`:
```tsx
import { Section } from './Section';
import { Reveal } from './Reveal';
import { jobs } from '../content/jobs';
import '../styles/experience.css';

export function Experience() {
  return (
    <Section id="experience" bg={{ src: '/assets/topo.jpg', alt: 'Climbing routes drawn over a granite face', speed: 0.05 }}>
      <div className="exp-head">
        <Reveal className="section-eyebrow">
          <span className="num">ii.</span>
          <span className="name">Experience</span>
        </Reveal>
        <Reveal as="h2" delay={1}>Where I've worked.</Reveal>
        <Reveal as="p" delay={2} className="sub">
          Four years of building platforms, automating infrastructure, and shipping tools other engineers rely on.
        </Reveal>
      </div>
      {jobs.map((job) => (
        <Reveal className="job" key={`${job.company}-${job.year}`}>
          <div className="years">{job.year}<small>{job.yearNote}</small></div>
          <div>
            <div className="co">{job.company}</div>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
          <div className="stack">
            {job.stack.map((line) => <span key={line}>{line}<br /></span>)}
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
```

`src/styles/experience.css`: port verbatim `#experience` (column flex, gradient `--rock-warm → #64381f → --sandstone-deep → --sandstone`, zero side padding), `#experience .bg-layer` (**opacity .42, soft-light, bottom mask fade 82%→100%**), `#experience .bg-layer img` (contrast 1.2 saturate 1.35), `.exp-head`, `.job` grid (`110px 1fr 200px`), `.years` (+ small), `.co`, `.job h3`, `.job p`, `.stack`, and the <1080 `.job{grid-template-columns:80px 1fr}` + `.stack{display:none}` overrides.

- [ ] **Step 4: Mount + run tests** — add `<Experience />` to App; `npm test` → PASS; dev-server eyeball: topo texture clearly visible, four rows, year numerals gold italic.

- [ ] **Step 5: Commit**

```bash
git add src/components/Experience.tsx src/components/Experience.test.tsx src/styles/experience.css src/App.tsx
git commit -m "feat: experience section over topo texture"
```

---

### Task 12: Projects section (banner layout)

**Files:**
- Create: `src/components/Projects.tsx`, `src/styles/projects.css`
- Test: `src/components/Projects.test.tsx`

**Interfaces:**
- Consumes: `Reveal`, `projects`. (Not `Section` — this section has bespoke structure: banner + grid, no `.bg-layer`.)

- [ ] **Step 1: Write failing test**

`src/components/Projects.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';
import { projects } from '../content/projects';

test('renders banner heading and all three project cards', () => {
  render(<Projects />);
  expect(screen.getByText('Selected projects.')).toBeInTheDocument();
  for (const p of projects) {
    expect(screen.getByText(p.title)).toBeInTheDocument();
  }
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL.

- [ ] **Step 3: Implement**

`src/components/Projects.tsx`:
```tsx
import { Reveal } from './Reveal';
import { projects } from '../content/projects';
import '../styles/projects.css';

export function Projects() {
  return (
    <section id="projects">
      <div className="proj-banner">
        <img className="banner-img" src="/assets/landscape.jpg" alt="Joshua Tree desert panorama at dusk" loading="lazy" />
        <div className="proj-head">
          <Reveal className="section-eyebrow">
            <span className="num">iii.</span>
            <span className="name">Projects</span>
          </Reveal>
          <Reveal as="h2" delay={1}>Selected projects.</Reveal>
          <Reveal as="p" delay={2} className="sub">
            Side projects built for the love of the problem — most of them running on a Kubernetes cluster in my home lab.
          </Reveal>
        </div>
      </div>
      <div className="proj-grid">
        {projects.map((p, i) => (
          <Reveal className="proj-card" key={p.num} delay={(i + 1) as 1 | 2 | 3}>
            <div className="pnum">{p.num}</div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="stack">{p.stack}</div>
            <div className="where">{p.context}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

`src/styles/projects.css`: port verbatim `#projects` (**gradient `--sandstone → #c9ab8a 26% → #a8937a 55% → #89775f 100%` — no purple**), `.proj-banner` (min-height 46vh, flex-end, padding), `.proj-banner .banner-img` (**`height:155%`, `object-position:center top`, `blur(.7px) saturate(.92) brightness(.94)`, mask in 0→17% / out 52%→94%**), `.proj-banner::after` (radial text pocket `720px 340px at 20% 82%, rgba(26,14,9,.58)` + warm→sand tint, same mask), `.proj-head` (+ h2 text-shadow, `.sub`), `.proj-grid` (z-index 2, margins, 3 columns), `.proj-card` (+ hover, `.pnum`, `h3`, `p`, `.stack`, `.where`), and the <1080 single-column override.

- [ ] **Step 4: Mount + run tests** — add `<Projects />` to App; `npm test` → PASS. Eyeball: banner fades in from Experience orange, heading legible over rocks, dirt dissolves into sand color behind cards.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx src/components/Projects.test.tsx src/styles/projects.css src/App.tsx
git commit -m "feat: projects banner section with sampled desert fade"
```

---

### Task 13: Contact section (night summit)

**Files:**
- Create: `src/components/Contact.tsx`, `src/components/Starfield.tsx`, `src/styles/contact.css`
- Test: `src/components/Contact.test.tsx`

**Interfaces:**
- Consumes: `Section`, `Reveal`, `FloatPhoto`, `Starfield`, `site`, `contactPrints`, `generateStars`.

- [ ] **Step 1: Write failing test**

`src/components/Contact.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';
import { contactPrints } from '../content/prints';

test('contact rows, resume button, and all four tick-list prints', () => {
  render(<Contact />);
  expect(screen.getByRole('link', { name: 'erikjearl@gmail.com' })).toHaveAttribute('href', 'mailto:erikjearl@gmail.com');
  expect(screen.getByRole('link', { name: 'Download Resume' })).toHaveAttribute('href', '/resume.pdf');
  for (const p of contactPrints) {
    expect(screen.getByText(p.caption)).toBeInTheDocument();
  }
});
```

- [ ] **Step 2: Run to verify failure** — `npm test` → FAIL.

- [ ] **Step 3: Implement**

`src/components/Starfield.tsx`:
```tsx
import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { generateStars } from '../lib/stars';

export function Starfield({ count = 130 }: { count?: number }) {
  const stars = useMemo(() => generateStars(count), [count]);
  return (
    <div id="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className="star" style={{
          left: s.left, top: s.top, width: s.size, height: s.size,
          ['--tw' as string]: s.period,
          ['--td' as string]: s.delay,
          ['--to' as string]: s.opacity,
        } as CSSProperties} />
      ))}
    </div>
  );
}
```

`src/components/Contact.tsx`:
```tsx
import { Section } from './Section';
import { Reveal } from './Reveal';
import { FloatPhoto } from './FloatPhoto';
import { Starfield } from './Starfield';
import { site } from '../content/site';
import { contactPrints } from '../content/prints';
import '../styles/contact.css';

export function Contact() {
  return (
    <Section id="contact" bg={{ src: '/assets/introck.jpg', alt: 'Joshua Tree rock formation at dusk with the moon rising', speed: 0.1 }} scrim>
      <Starfield />
      <div className="content">
        <Reveal className="section-eyebrow">
          <span className="num">iv.</span>
          <span className="name">Contact</span>
        </Reveal>
        <Reveal as="h2" delay={1}>Get in <em>touch.</em></Reveal>
        <Reveal as="p" delay={2} className="lede">
          Whether it's about work, climbing, or anything in between — my inbox is open.
        </Reveal>
        <Reveal className="contact-card" delay={3}>
          <div className="contact-row"><span className="k">Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
          <div className="contact-row"><span className="k">GitHub</span><a href={site.github} target="_blank" rel="noopener noreferrer">github.com/erikjearl</a></div>
          <div className="contact-row"><span className="k">LinkedIn</span><a href={site.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/erikjearl</a></div>
        </Reveal>
        <Reveal as="span" delay={4}>
          <a className="resume-btn" href={site.resumeHref}>Download Resume</a>
        </Reveal>
        <footer>© 2026 Erik Earl</footer>
      </div>
      {contactPrints.map((p) => <FloatPhoto key={p.caption} print={p} />)}
    </Section>
  );
}
```

`src/styles/contact.css`: port verbatim `#contact` (centered column, **gradient `#89775f → #6a5d68 18% → #3d3560 42% → --summit-indigo 62% → --summit-ink`**), `#contact .bg-layer` (opacity .55), `#contact .bg-layer img`, `#contact .scrim` (radial), `#stars`/`.star`/`@keyframes twinkle`, `#contact .content`, eyebrow centering, `#contact h2` (+ em), `.lede`, `.contact-card` (dashed rows), `.contact-row` (+ `.k`, link hover), `.resume-btn` (+ hover), `footer`.

- [ ] **Step 4: Mount + run tests** — add `<Contact />` to App; `npm test` → PASS. Eyeball: dusk→night gradient, moon photo visible, stars twinkle, four tilted prints in the corners.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.tsx src/components/Starfield.tsx src/components/Contact.test.tsx src/styles/contact.css src/App.tsx
git commit -m "feat: contact night-summit section with tick-list prints"
```

---

### Task 14: Full-page assembly + visual parity pass

**Files:**
- Modify: `src/App.tsx` (final form below), `src/styles/base.css` (only if parity fixes require)

- [ ] **Step 1: Final App**

```tsx
import { TopNav } from './components/TopNav';
import { RouteRail } from './components/RouteRail';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <main className="site">
      <TopNav />
      <RouteRail />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Side-by-side parity screenshots**

Run (dev server on :5173):
```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1440,900 \
  --screenshot=/tmp/parity-react.png "http://localhost:5173" 2>/dev/null
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1440,900 \
  --screenshot=/tmp/parity-mockup.png "file://$PWD/mockups/d-immersive.html" 2>/dev/null
open /tmp/parity-react.png /tmp/parity-mockup.png
```
Expected: heroes indistinguishable (stamp, type sizes, scrim). Then manually scroll the dev site next to the open mockup through all five sections and fix any drift (typical culprits: missed CSS block during porting, wrong mask stop, missing filter). Every fix goes in the relevant section CSS file.

- [ ] **Step 3: Behavior QA checklist** (all must pass)

- Rail fills smoothly; dots highlight per section; first/last dots fully visible; clicking dots and nav links scrolls to sections.
- Reveals fire once per element; floating prints drift slightly on scroll and never jump.
- macOS System Settings → Accessibility → Display → Reduce motion ON → reload: no Ken Burns, no bob, no twinkle, content visible immediately, jump (not smooth) scrolling.
- 1280px window: nothing broken. ~900px window: rail shrinks, grids stack, prints hidden.
- Console: zero errors/warnings. `npm test` and `npm run build` both green.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: assemble full page; visual parity with approved mockup"
```

---

### Task 15: Deploy to GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit (Erik pushes)**

```bash
git add .github
git commit -m "ci: GitHub Pages deploy workflow"
```
Then **Erik** runs `git push`.

- [ ] **Step 3: One-time settings (Erik, in browser/registrar)**

1. GitHub repo → Settings → Pages → Source: **GitHub Actions**.
2. Settings → Pages → Custom domain: `erikjearl.com` (CNAME file already in `public/`); check "Enforce HTTPS" once the cert issues.
3. DNS at the registrar: apex `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME → `erikjearl.github.io` (optional).

- [ ] **Step 4: Post-deploy verification**

- Actions run green; https://erikjearl.com loads the site (DNS may take a bit).
- `https://erikjearl.com/resume.pdf` downloads the resume.
- Lighthouse (Chrome DevTools) on the live URL: Accessibility ≥ 95, Performance ≥ 85. If perf is short: confirm hero preload, below-fold `loading="lazy"`, and image sizes from Task 4.
- Share-card check: paste the URL into a private Slack/LinkedIn — OG title/description/elcap image appear.

---

## Self-review notes

- Spec coverage: hero (T9), about incl. rejected-approach guardrails (T10), experience texture values (T11), projects banner + sampled fade (T12), contact prints/starfield/gradient handoff (T13), rail + clamp + no-altimeter (T8), grain/tokens/reduced-motion (T2/T6), tone rule enforced by a test (T3), assets/resume/CNAME (T4), deploy (T15). Mobile: base.css + per-section media queries (T2, T10–T12) with QA in T14.
- CSS porting steps say "verbatim from mockup" instead of inlining ~700 lines twice; the mockup is committed and is the declared source of truth, so this is a copy instruction, not a placeholder.
- Type consistency: `Print` (T3) consumed by `FloatPhoto` (T7), `Job`/`Project` field names match component usage (T11/T12), `clampAnchorPct`/`computeProgress`/`lerp` signatures match hook/component usage (T5→T6/T8).

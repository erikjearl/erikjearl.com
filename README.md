# erikjearl.com

Personal website for Erik Earl — software engineer, climber, hiker.

Vite + React + TypeScript static site, deployed to GitHub Pages at [erikjearl.com](https://erikjearl.com).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173, hot reload
npm test           # vitest suite
npm run build      # production bundle -> dist/
npm run preview    # serve dist/ at http://localhost:4173
```

- Site copy and data (jobs, projects, photo prints, links) live in `src/content/` — edit there, never in components.
- Photos: originals in `media/` (untracked); run `./scripts/convert-images.sh` to regenerate web assets in `public/assets/`.
- Deploys automatically via GitHub Actions on push to `main` (`.github/workflows/deploy.yml`).

## Design lineage

**The live site (`src/`) is the canonical design.** The docs and mockups below are the historical record:

- `docs/superpowers/specs/2026-07-10-visual-design.md` — visual spec + decision log from the design phase
- `docs/superpowers/specs/2026-07-10-architecture-design.md` — stack decisions (incl. deferred Flask phase 2)
- `mockups/d-immersive.html` — the approved design mockup the site was built from (frozen as of 2026-07-11; the site has since diverged with content updates)
- `mockups/a-ascent.html`, `b-topo.html`, `c-minimal.html` — earlier concept explorations

## Concept in one line

Scroll-as-ascent: one continuous page that travels from the Yosemite valley floor in daylight to a desert night sky — the climbing identity carried entirely by Erik's own photography, color, and motion, while the written content stays strictly professional.

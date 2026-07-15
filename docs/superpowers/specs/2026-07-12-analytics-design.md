# erikjearl.com — Analytics Design (GoatCounter)

**Date:** 2026-07-12
**Status:** Approved scope (GoatCounter only; Cloudflare explicitly deferred)
**Branch:** `analytics`

## 1. Goal

Answer, with near-zero cost and zero maintenance: *is anyone visiting the site, where did they come from, and did they grab the resume?* The audience for these answers is Erik during a job-search/networking cycle — not product analytics.

## 2. Decision

**GoatCounter** (goatcounter.com), hosted free tier, integrated as a single script tag.

Why it wins for this site:
- GitHub Pages provides no server logs; analytics must be client-side or proxy-level.
- Free, open-source, no cookies → no GDPR consent banner, no privacy-policy obligation beyond a mention.
- ~3.5KB script; irrelevant to page performance.
- Dashboard covers exactly the questions in §1: pageviews, unique visitors, referrers, country-level geography, device/browser.
- Deliberately does NOT expose visitor IPs — which we accept: IPs are low-signal for a portfolio and carrying personal data creates obligations with no payoff.

Rejected for now: Google Analytics 4 (cookie/consent weight; widely ad-blocked by exactly this site's audience), Plausible/Fathom (paid, no added value at this scale), DIY beacon on home-lab K8s (real backend project — revisit if wanted as a project, not as analytics).

## 3. What gets tracked

1. **Pageview** on load — one page site, so this is "a visit."
2. **Resume clicks** — the `Download Resume` button gets `data-goatcounter-click="resume-download"` so resume pulls appear as a named event. This is the single most interesting signal the site can produce.
3. Nothing else. No section-scroll events, no lightbox events, no custom dimensions (YAGNI — add named click events later only if a real question arises).

Hash navigation (`#experience` etc.) is ignored by GoatCounter by default — correct behavior for a one-pager; in-page nav is not a new visit.

## 4. Integration design

- **Prerequisite (Erik, one time):** create a free GoatCounter account with site code `erikjearl` → dashboard at `https://erikjearl.goatcounter.com`.
- **Script tag** in `index.html` before `</body>` (not in the React bundle — it's third-party, has no reason to enter the module graph, and must not delay hydration):

```html
<script data-goatcounter="https://erikjearl.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

- **Resume event:** in `src/components/Contact.tsx`, add `data-goatcounter-click="resume-download"` to the existing `.resume-btn` anchor. No other code changes.
- **Localhost hygiene:** `count.js` skips `localhost` by default — dev sessions don't pollute the numbers. No config needed.
- **Site code is not a secret** — it's visible in page source by design; committing it is fine.

## 5. Privacy posture

- No cookies, no fingerprinting, no PII stored by us; GoatCounter stores aggregated counts (it hashes IP+UA transiently for uniqueness within a day, never exposes it).
- README gets one line noting the site uses GoatCounter (cookie-less) — transparency without ceremony.

## 6. Verification

1. Deploy; visit erikjearl.com from a phone (off wifi, so a distinct network) → dashboard shows the visit with country + referrer within a minute.
2. Click Download Resume → event `resume-download` appears in the dashboard's events view.
3. Confirm a `npm run dev` localhost visit does NOT appear.
4. Lighthouse re-run: no measurable performance change (script is async).

## 7. Future work (explicitly out of scope now)

- **Cloudflare proxy** — stacks on top with zero changes to this design: it operates at DNS, sees requests ad-blockers hide from scripts, and adds CDN caching + bot filtering. Layering order is irrelevant; add whenever wanted.
- DIY home-lab beacon if Erik wants IP-level data as a backend project (see architecture doc phase 2).
- Additional named click events (e.g., GitHub/LinkedIn link clicks) if a concrete question demands them.

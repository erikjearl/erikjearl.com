import type { CSSProperties } from 'react';

export interface Print {
  src: string;
  alt: string;
  caption: string;
  pos: CSSProperties;
  tilt: string;
  speed: number;
  ar: string;
  width?: string;
  /** Magnify the photo inside its frame (1 = no zoom, 1.3 = 30% closer). */
  zoom?: number;
  /** Which part of the photo stays in frame — CSS object-position,
   *  e.g. 'center 30%' (favor the top) or '70% 50%' (favor the right). */
  focus?: string;
  /** Optional sentence shown under the caption in the click-to-view lightbox. */
  story?: string;
}

/* ── Contact-section prints ─────────────────────────────────────────────
 * One entry per pinned photo. The knobs:
 *   pos    where it sits: any of { top, bottom, left, right } with CSS
 *          units ('7rem', '6vw', '12%'...). Add zIndex here if they overlap.
 *   width  print width; height follows the aspect ratio `ar`.
 *   tilt   rotation ('2deg' leans right, '-2deg' leans left).
 *   speed  parallax drift while scrolling; keep around -0.03 .. -0.05.
 *   zoom   optional close-up of the photo inside the frame (try 1.2-1.6).
 *   focus  optional object-position to pick WHAT the zoom centers on.
 * Notes:
 *   - below 1560px wide, prints slim to 200px (see contact.css);
 *     below 1080px they hide entirely.
 *   - the contact card spans roughly the middle 540px of the section, from
 *     ~45% down to ~90% of its height — keep bottom prints out of that band.
 * ──────────────────────────────────────────────────────────────────── */
export const contactPrints: Print[] = [
  {
    src: '/assets/slippery-souls.jpg',
    alt: 'Climbing Slippery Souls beside a waterfall, San Bernardino Mountains',
    caption: 'Slippery Souls · 5.10 · San Bernardino Mountains',
    pos: { left: '11vw', top: '8rem' },
    width: '275px',
    tilt: '-2.4deg',
    speed: -0.03,
    ar: '3/4',
    story: 'A slippery pitch of slab hidden in a slot canyon nestled in the San Bernardino mountains ',
  },
  {
    src: '/assets/erikjam.jpg',
    alt: 'Erik jamming a crack on Joshua Tree granite',
    caption: 'Toe Jam · 5.7 · Joshua Tree',
    pos: { right: '6.5vw', top: '7.5rem' },
    width: '315px',
    tilt: '2deg',
    speed: -0.045,
    ar: '4/5',
    story: 'Classic hand jams on Joshua Tree granite, located right in the heart of Hidden Valley Campground.',
  },
];

/* The framed portrait on the About panel — same knobs. */
export const aboutPrint: Print = {
  src: '/assets/erik.jpg',
  alt: 'Erik',
  caption: '',
  pos: { right: '10vw', top: '50%', marginTop: '-215px' },
  width: undefined,
  tilt: '-2.2deg',
  speed: -0.035,
  ar: '1/1',
};

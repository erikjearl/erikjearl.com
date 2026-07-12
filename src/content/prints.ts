import type { CSSProperties } from 'react';

export interface Print {
  src: string; alt: string; caption: string;
  pos: CSSProperties; tilt: string; speed: number; ar: string; width?: string;
}

export const contactPrints: Print[] = [
  { src: '/assets/slippery-souls.jpg', alt: 'Climbing Slippery Souls beside a waterfall, San Bernardino Mountains', caption: 'Slippery Souls · 5.10 · San Bernardino Mountains', pos: { left: '7vw', bottom: '11rem' }, tilt: '1.8deg', speed: -0.045, ar: '3/4', width: '260px' },
  { src: '/assets/whodunnit.jpg', alt: 'Looking down the slab on Whodunnit, Tahquitz', caption: 'Whodunnit · 5.9 · Tahquitz', pos: { right: '7vw', bottom: '6rem' }, tilt: '-1.6deg', speed: -0.035, ar: '3/4', width: '250px' },
];

export const aboutPrint: Print = {
  src: '/assets/erik.jpg', alt: 'Erik', caption: '',
  pos: { right: '10vw', top: '50%', marginTop: '-215px' }, tilt: '-2.2deg', speed: -0.035, ar: '1/1',
};

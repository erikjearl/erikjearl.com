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

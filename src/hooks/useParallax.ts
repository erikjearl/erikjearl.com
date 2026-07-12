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
      let d = top * speed;
      // Background images overscan their layer (e.g. top:-8%/height:116%).
      // Clamp the shift to that overhang so image edges never slide into view.
      if (el.classList.contains('bg-layer')) {
        const img = el.querySelector('img');
        if (img) {
          const overTop = -img.offsetTop;
          const overBottom = img.offsetTop + img.offsetHeight - section.clientHeight;
          if (overTop >= 0 && overBottom >= 0) {
            d = Math.min(Math.max(d, -overBottom), overTop);
          }
        }
      }
      el.style.transform = `translate3d(0, ${d.toFixed(1)}px, 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, speed, reduced]);
}

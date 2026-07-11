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

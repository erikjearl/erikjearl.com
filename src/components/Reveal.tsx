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

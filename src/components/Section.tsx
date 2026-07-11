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

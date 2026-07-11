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

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

  const imgStyle: CSSProperties = {
    ...(print.focus ? { objectPosition: print.focus } : {}),
    ...(print.zoom && print.zoom !== 1
      ? { transform: `scale(${print.zoom})`, transformOrigin: print.focus ?? 'center' }
      : {}),
  };

  return (
    <div className="float-photo" ref={ref} style={style}>
      <figure>
        <img src={print.src} alt={print.alt} loading="lazy" style={imgStyle} />
        {print.caption && <figcaption className="photo-cap">{print.caption}</figcaption>}
      </figure>
    </div>
  );
}

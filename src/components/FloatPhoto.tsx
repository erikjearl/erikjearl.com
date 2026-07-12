import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { useParallax } from '../hooks/useParallax';
import { Lightbox } from './Lightbox';
import type { Print } from '../content/prints';

export function FloatPhoto({ print }: { print: Print }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useParallax(ref, print.speed);

  const style: CSSProperties = {
    ...print.pos,
    ...(print.width ? { ['--w' as string]: print.width } : {}),
    ['--tilt' as string]: print.tilt,
    ['--ar' as string]: print.ar,
  };

  const imgStyle: CSSProperties = {
    ...(print.focus ? { objectPosition: print.focus } : {}),
    ...(print.zoom && print.zoom !== 1
      ? { transform: `scale(${print.zoom})`, transformOrigin: print.focus ?? 'center' }
      : {}),
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div className="float-photo" ref={ref} style={style}>
      <figure
        role="button"
        tabIndex={0}
        aria-label={`View larger: ${print.alt}`}
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
      >
        <img src={print.src} alt={print.alt} loading="lazy" style={imgStyle} />
        {print.caption && <figcaption className="photo-cap">{print.caption}</figcaption>}
      </figure>
      {open && <Lightbox print={print} onClose={() => setOpen(false)} />}
    </div>
  );
}

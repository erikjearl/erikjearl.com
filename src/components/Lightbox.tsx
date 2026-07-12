import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Print } from '../content/prints';
import '../styles/lightbox.css';

export function Lightbox({ print, onClose }: { print: Print; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={print.alt} onClick={onClose}>
      <figure className="lightbox-print" onClick={(e) => e.stopPropagation()}>
        <img src={print.src} alt={print.alt} />
        {(print.caption || print.story) && (
          <figcaption>
            {print.caption && <div className="lightbox-caption">{print.caption}</div>}
            {print.story && <p className="lightbox-story">{print.story}</p>}
          </figcaption>
        )}
      </figure>
      <button className="lightbox-close" aria-label="Close" onClick={onClose}>
        ×
      </button>
    </div>,
    document.body,
  );
}

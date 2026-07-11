import { useEffect, useState } from 'react';
import { computeProgress, lerp } from '../lib/progress';

export function useScrollProgress(): number {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let raf: number | null = null;

    const tick = () => {
      current = lerp(current, target, 0.14);
      setShown(current);
      raf = current !== target ? requestAnimationFrame(tick) : null;
    };
    const onScroll = () => {
      target = computeProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return shown;
}

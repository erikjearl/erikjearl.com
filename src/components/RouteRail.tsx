import { useEffect, useState } from 'react';
import { sections } from '../content/site';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { clampAnchorPct } from '../lib/progress';
import '../styles/routerail.css';

const ROUTE_D = 'M22,0 C14,110 30,210 22,320 C15,430 29,540 22,650 C16,760 28,870 22,1000';

export function RouteRail() {
  const pct = useScrollProgress();
  const reduced = useReducedMotion();
  const [tops, setTops] = useState<number[]>(() => sections.map(() => 3.5));

  useEffect(() => {
    const place = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setTops(sections.map((s) => {
        const el = document.getElementById(s.id);
        const frac = el && range > 0 ? Math.min(el.offsetTop / range, 1) * 100 : 0;
        return clampAnchorPct(frac);
      }));
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, []);

  const activeIdx = sections.reduce((acc, s, i) => {
    const el = document.getElementById(s.id);
    if (el && el.offsetTop <= window.scrollY + window.innerHeight * 0.4) return i;
    return acc;
  }, 0);

  return (
    <nav id="rail" aria-label="Page progress">
      <svg viewBox="0 0 44 1000" preserveAspectRatio="none" aria-hidden="true">
        <path className="track" d={ROUTE_D} />
        <path className="fill" pathLength={100} d={ROUTE_D}
          style={{ strokeDasharray: `${pct} 100` }} />
      </svg>
      {sections.map((s, i) => (
        <button
          key={s.id}
          className={`anchor${i <= activeIdx ? ' passed' : ''}${i === activeIdx ? ' active' : ''}`}
          data-label={s.label}
          aria-label={`Scroll to ${s.label}`}
          style={{ top: `${tops[i]}%` }}
          onClick={() =>
            document.getElementById(s.id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
          }
        />
      ))}
    </nav>
  );
}

import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { generateStars } from '../lib/stars';

export function Starfield({ count = 130 }: { count?: number }) {
  const stars = useMemo(() => generateStars(count), [count]);
  return (
    <div id="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className="star" style={{
          left: s.left, top: s.top, width: s.size, height: s.size,
          ['--tw' as string]: s.period,
          ['--td' as string]: s.delay,
          ['--to' as string]: s.opacity,
        } as CSSProperties} />
      ))}
    </div>
  );
}

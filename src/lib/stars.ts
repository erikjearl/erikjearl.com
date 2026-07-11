export interface Star {
  left: string; top: string; size: number;
  period: string; delay: string; opacity: string;
}

export function generateStars(count: number, rand: () => number = Math.random): Star[] {
  return Array.from({ length: count }, () => ({
    left: `${(rand() * 100).toFixed(2)}%`,
    top: `${(rand() * 62).toFixed(2)}%`,
    size: rand() < 0.2 ? 3 : 2,
    period: `${(2.6 + rand() * 4).toFixed(2)}s`,
    delay: `${(rand() * 5).toFixed(2)}s`,
    opacity: `${(0.3 + rand() * 0.6).toFixed(2)}`,
  }));
}

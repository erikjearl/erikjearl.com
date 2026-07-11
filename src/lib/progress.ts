export function computeProgress(scrollY: number, docHeight: number, viewportH: number): number {
  const range = docHeight - viewportH;
  if (range <= 0) return 0;
  return Math.min(Math.max((scrollY / range) * 100, 0), 100);
}

export function clampAnchorPct(pct: number): number {
  return Math.min(Math.max(pct, 3.5), 96.5);
}

export function lerp(current: number, target: number, factor: number): number {
  const next = current + (target - current) * factor;
  return Math.abs(target - next) < 0.05 ? target : next;
}

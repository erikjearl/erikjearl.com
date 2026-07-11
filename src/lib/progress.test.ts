import { computeProgress, clampAnchorPct, lerp } from './progress';

test('computeProgress maps scroll range to 0..100', () => {
  expect(computeProgress(0, 5000, 1000)).toBe(0);
  expect(computeProgress(4000, 5000, 1000)).toBe(100);
  expect(computeProgress(2000, 5000, 1000)).toBe(50);
});

test('computeProgress is 0 for unscrollable pages and clamps overscroll', () => {
  expect(computeProgress(100, 800, 1000)).toBe(0);
  expect(computeProgress(9999, 5000, 1000)).toBe(100);
});

test('clampAnchorPct keeps dots off the viewport edges', () => {
  expect(clampAnchorPct(0)).toBe(3.5);
  expect(clampAnchorPct(50)).toBe(50);
  expect(clampAnchorPct(100)).toBe(96.5);
});

test('lerp approaches target and snaps when close', () => {
  expect(lerp(0, 100, 0.14)).toBeCloseTo(14);
  expect(lerp(99.98, 100, 0.14)).toBe(100);
});

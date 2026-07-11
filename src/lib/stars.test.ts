import { generateStars } from './stars';

test('generates n stars within the upper 62% with valid CSS values', () => {
  const stars = generateStars(130, () => 0.5);
  expect(stars).toHaveLength(130);
  for (const s of stars) {
    expect(parseFloat(s.top)).toBeLessThanOrEqual(62);
    expect([2, 3]).toContain(s.size);
    expect(s.period).toMatch(/^\d+(\.\d+)?s$/);
  }
});

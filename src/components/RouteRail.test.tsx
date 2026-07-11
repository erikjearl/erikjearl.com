import { render } from '@testing-library/react';
import { RouteRail } from './RouteRail';

test('renders five clamped anchor buttons with labels', () => {
  const { container } = render(<RouteRail />);
  const dots = container.querySelectorAll('button.anchor');
  expect(dots).toHaveLength(5);
  expect(dots[0]).toHaveAttribute('aria-label', 'Scroll to Top');
  // jsdom: all offsets are 0 → every dot clamps to the 3.5% floor
  for (const d of Array.from(dots)) {
    expect((d as HTMLElement).style.top).toBe('3.5%');
  }
});

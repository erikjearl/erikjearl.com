import { render, screen } from '@testing-library/react';
import { TopNav } from './TopNav';

test('brand plus one link per non-hero section', () => {
  render(<TopNav />);
  expect(screen.getByText('Erik Earl')).toHaveAttribute('href', '#hero');
  for (const [label, href] of [
    ['About', '#approach'], ['Experience', '#experience'],
    ['Projects', '#projects'], ['Contact', '#contact'],
  ] as const) {
    expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
  }
});

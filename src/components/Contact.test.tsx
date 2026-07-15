import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';
import { contactPrints } from '../content/prints';

test('contact rows, resume button, and all four tick-list prints', () => {
  render(<Contact />);
  expect(screen.getByRole('link', { name: 'erikjearl@gmail.com' })).toHaveAttribute('href', 'mailto:erikjearl@gmail.com');
  const resume = screen.getByRole('link', { name: 'Download Resume' });
  expect(resume).toHaveAttribute('href', '/resume.pdf');
  expect(resume).toHaveAttribute('data-goatcounter-click', 'resume-download');
  for (const p of contactPrints) {
    expect(screen.getByText(p.caption)).toBeInTheDocument();
  }
});

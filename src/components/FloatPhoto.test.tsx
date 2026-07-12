import { render, screen, fireEvent } from '@testing-library/react';
import { FloatPhoto } from './FloatPhoto';
import type { Print } from '../content/prints';

const print: Print = {
  src: '/assets/x.jpg',
  alt: 'Test print',
  caption: 'Cap · 5.9',
  pos: {},
  tilt: '1deg',
  speed: 0,
  ar: '3/4',
  story: 'A short story.',
};

test('click opens a lightbox with caption and story; Escape closes it', () => {
  render(<FloatPhoto print={print} />);
  fireEvent.click(screen.getByRole('button', { name: /Test print/ }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText('A short story.')).toBeInTheDocument();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).toBeNull();
});

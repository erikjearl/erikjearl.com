import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';
import { projects } from '../content/projects';

test('renders banner heading and all three project cards', () => {
  render(<Projects />);
  expect(screen.getByText('Selected projects.')).toBeInTheDocument();
  for (const p of projects) {
    expect(screen.getByText(p.title)).toBeInTheDocument();
  }
});

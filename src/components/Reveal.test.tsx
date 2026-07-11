import { render } from '@testing-library/react';
import { Reveal } from './Reveal';

test('renders with reveal + delay classes and custom element', () => {
  const { container } = render(<Reveal as="h2" delay={1} className="x">Hi</Reveal>);
  const el = container.querySelector('h2.reveal.d1.x');
  expect(el).not.toBeNull();
  expect(el).toHaveTextContent('Hi');
});

test('immediate reveal starts with in class', () => {
  const { container } = render(<Reveal immediate>Now</Reveal>);
  expect(container.querySelector('.reveal.in')).not.toBeNull();
});

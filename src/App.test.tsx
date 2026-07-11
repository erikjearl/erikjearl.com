import { render } from '@testing-library/react';
import App from './App';

test('renders a main landmark', () => {
  const { getByRole } = render(<App />);
  expect(getByRole('main')).toBeInTheDocument();
});

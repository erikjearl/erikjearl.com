import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';
import { jobs } from '../content/jobs';

test('renders every job with company, title, and stack', () => {
  render(<Experience />);
  for (const job of jobs) {
    expect(screen.getByText(job.title)).toBeInTheDocument();
  }
  expect(screen.getAllByText(/Qualcomm/)).not.toHaveLength(0);
});

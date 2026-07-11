import { sections, site } from './site';
import { jobs } from './jobs';
import { projects } from './projects';
import { contactPrints, aboutPrint } from './prints';

test('five sections in ascent order', () => {
  expect(sections.map(s => s.id)).toEqual(['hero', 'approach', 'experience', 'projects', 'contact']);
  expect(sections.map(s => s.label)).toEqual(['Top', 'About', 'Experience', 'Projects', 'Contact']);
});

test('hero stamp keeps the elevation Erik liked', () => {
  expect(site.heroStamp).toBe('Yosemite Valley · El. 3,966 ft');
});

test('four jobs, newest first, no climbing-metaphor labels', () => {
  expect(jobs).toHaveLength(4);
  expect(jobs[0].company).toBe('Applied Materials');
  for (const j of jobs) {
    expect(`${j.title} ${j.description}`).not.toMatch(/pitch|belay|crux|summit register|5\.\d/i);
  }
});

test('three projects with context lines', () => {
  expect(projects).toHaveLength(3);
  expect(projects.map(p => p.context)).toEqual(['Home lab', 'Home lab', 'Senior capstone']);
});

test('four contact prints = the tick list, with factual captions', () => {
  expect(contactPrints).toHaveLength(4);
  expect(contactPrints.map(p => p.caption)).toEqual([
    'White Rasta · V2 · Joshua Tree',
    'The Chief · V4 · Black Mountain',
    'Slippery Souls · 5.10 · San Bernardino',
    'Whodunnit · 5.9 · Tahquitz',
  ]);
  for (const p of [...contactPrints, aboutPrint]) expect(p.alt.length).toBeGreaterThan(0);
});

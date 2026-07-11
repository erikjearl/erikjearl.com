export interface SectionDef { id: string; label: string }
export const sections: SectionDef[] = [
  { id: 'hero', label: 'Top' },
  { id: 'approach', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
export const site = {
  name: 'Erik Earl',
  role: 'Software Engineer',
  company: 'Applied Materials',
  heroStamp: 'Yosemite Valley · El. 3,966 ft',
  heroLede: 'Platform & DevOps engineer who spends weekdays in Kubernetes clusters and weekends on granite.',
  aboutHeading: "Hi, I'm Erik.",
  aboutParas: [
    "I'm a Platform & DevOps engineer specializing in Kubernetes — CKAD certified, currently a software engineer at Applied Materials. I hold a B.S. in Computer Science with an AI minor from Case Western Reserve University, graduated Cum Laude in December 2024.",
    "Outside of work I'm a rock climber and hiker, happiest on granite in Yosemite or desert rock in Joshua Tree.",
  ],
  aboutTags: ['Software Engineer', 'Kubernetes', 'Python'],
  email: 'erikjearl@gmail.com',
  github: 'https://github.com/erikjearl',
  linkedin: 'https://linkedin.com/in/erikjearl',
  resumeHref: '/resume.pdf',
};

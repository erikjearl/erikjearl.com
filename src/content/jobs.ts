export interface Job {
  year: string;
  yearNote: string;
  company: string;
  title: string;
  description: string;
  stack: string[];
}

export const jobs: Job[] = [
  {
    year: '2026',
    yearNote: 'Present',
    company: 'Applied Materials',
    title: 'Software Engineer',
    description: 'Just getting started — more to come.',
    stack: ['New chapter'],
  },
  {
    year: '2025',
    yearNote: '— 2026',
    company: 'Qualcomm',
    title: 'Software Engineer, Platform & DevOps',
    description: 'Built a Kubernetes-native Database-as-a-Service platform from the ground up, including a custom Python/Kopf operator managing MySQL, PostgreSQL, and MongoDB CRDs across clusters, with cross-cluster backup and restore via S3. Led the RKE1 → RKE2 migration alongside a Calico → Cilium CNI transition, shipped a custom ExternalDNS webhook provider for BlueCat DNS, and administered the shared Jenkins CI/CD platform.',
    stack: ['Kubernetes · Python', 'CI/CD · Linux', 'AWS · Networking'],
  },
  {
    year: '2023',
    yearNote: '& 2024',
    company: 'Qualcomm',
    title: 'Software Engineer Intern',
    description: 'Automated TLS certificate issuance with cert-manager and a custom Python Kubernetes operator. Built Django REST APIs for IP lifecycle management that cut manual approval work by roughly 80%.',
    stack: ['Backend Development', 'Python · Django', 'REST API · Node.js'],
  },
  {
    year: '2022',
    yearNote: '— 2023',
    company: 'Lubrizol',
    title: 'Software Engineering Co-op',
    description: 'Built internal automation tooling and software solutions in Bash, C++, and JavaScript.',
    stack: ['Bash · C++', 'JavaScript'],
  },
];

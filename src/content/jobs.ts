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
    description: 'Supporting the Kubernetes platform powering engineering and collaboration at the EPIC Center.',
    stack: ['New chapter'],
  },
  {
    year: '2025',
    yearNote: '— 2026',
    company: 'Qualcomm',
    title: 'Software Engineer, Platform & DevOps',
    description: 'Built and operated Kubernetes-native platform infrastructure across a multi-cluster environment, including a Database-as-a-Service platform that replaced manual VM provisioning with an API-driven, self-service workflow. Developed production software and automation in Python, Go, and Bash — a custom Python/Kopf operator managing MySQL, PostgreSQL, and MongoDB resources, S3-based cross-cluster backup and restore workflows, backend services, internal APIs, and infrastructure tooling. Supported Kubernetes networking and administered the shared Jenkins CI/CD platform through reusable pipeline tooling and operational support.',
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

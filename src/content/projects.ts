export interface Project {
  num: string;
  title: string;
  description: string;
  stack: string;
  context: string;
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'Minecraft Server Deployment Platform',
    description: 'A Kubernetes operator and set of CRDs that provision containerized Minecraft servers on demand, fronted by a Flask control plane exposing REST APIs for spin-up, teardown, and management.',
    stack: 'Kubernetes · KOPF · Flask · Python',
    context: 'Home lab',
  },
  {
    num: '02',
    title: 'Climbing Data AI Platform',
    description: 'A TypeScript MCP server exposing AI-queryable APIs over millions of crowd-sourced Mountain Project climbing records, backed by self-hosted Kubernetes data scraping and processing pipelines.',
    stack: 'TypeScript · MCP · Kubernetes · HTML',
    context: 'Home lab',
  },
  {
    num: '03',
    title: 'Manga Translation Pipeline',
    description: 'A computer vision pipeline covering detection, segmentation, OCR, and translation, built around a PyTorch ResNet34 U-Net model for automated panel and text segmentation.',
    stack: 'PyTorch · U-Net · Computer Vision',
    context: 'Senior capstone',
  },
];

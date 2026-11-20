export interface ProfileLink {
  label: string;
  value: string;
  href: string;
  icon: string;
}

export const profile = {
  name: 'Vitaly Nudelman',
  title: 'Software Developer / DevOps Engineer',
  greeting: 'Welcome to My Website!',
  bio: [
    'Full-cycle software developer who writes code and owns the pipeline. My experience spans mission-critical real-time C++, Kubernetes-based DevOps infrastructure, and CI/CD design, which gives me an end-to-end view from code commit to production deployment.',
    "More than three years of that has been on the DevOps side, and I kept those responsibilities when I moved into a developer role: CI/CD pipelines and Helm charts, SaaS provisioning and monitoring, and supporting the teams that depend on both.",
    'Outside work I solve CTF challenges, reverse engineering and network recon, which keeps me close to how systems actually break.',
  ],
  resumePath: '/resume/resume.pdf',
} as const;

export const profileLinks: ProfileLink[] = [
  {
    label: 'LinkedIn',
    value: 'Vitaly Nudelman',
    href: 'https://www.linkedin.com/in/vitaly-nudelman-932750264/',
    icon: '💼',
  },
  {
    label: 'GitHub',
    value: 'github.com/vitalynudelman',
    href: 'https://github.com/vitalynudelman',
    icon: '💻',
  },
];

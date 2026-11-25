export interface Role {
  title: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
}

/**
 * Carried over verbatim from the full-cycle resume the site serves
 * (public/resume/resume.pdf), so the two surfaces cannot drift apart.
 */
export const experience: Role[] = [
  {
    title: 'Software Developer',
    company: 'SkySoft Solutions',
    location: 'Yokneam Illit',
    period: 'Feb 2025 – Present',
    bullets: [
      'Designed and wrote new features for mission-critical real-time systems in C++.',
      "Debugged and upgraded systems built on proprietary legacy libraries, increasing the system's feature upgradability and serviceability.",
      'Designed support applications to implement requirements from Interface Control Documents (ICDs).',
      "Continued to carry DevOps responsibilities alongside the developer role — supporting the company's DevOps team and maintaining CI/CD and deployment infrastructure across company projects.",
    ],
  },
  {
    title: 'DevOps Engineer',
    company: 'Commit',
    location: 'Petah Tikva',
    period: 'Aug 2023 – Feb 2025',
    bullets: [
      'Simplified adding new microservices to the main project by designing its CI/CD pipelines and Helm charts for Kubernetes.',
      'Diagnosed issues quickly for development and integration teams by analyzing logs to find the root cause in either code or infrastructure configuration, often incorrect use of SaaS services.',
      'Helped optimize SaaS and service performance by building detailed monitoring dashboards, while deploying and managing Kubernetes microservices for SaaS customers.',
      'Improved handoffs to customers and development teams by writing engineering documentation for complex cloud configurations, covering automation, monitoring, and performance.',
      'Managed and upgraded customer systems and delivered diverse projects with ongoing post-deployment support.',
    ],
  },
  {
    title: 'Integration Specialist',
    company: 'Israel Aerospace Industries',
    period: 'Nov 2021 – Feb 2023',
    bullets: [
      'Configured and maintained AIX Unix servers, airborne computers, and electronics systems.',
    ],
  },
];

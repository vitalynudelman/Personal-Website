export interface Certification {
  name: string;
  icon: string;
  date: string;
  issuer: string;
  description: string;
}

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect',
    icon: '/certifications/aws-solutions-architect-associate.png',
    date: 'Obtained: Dec 2023',
    issuer: 'Amazon Web Services',
    description: 'Validates expertise in designing distributed systems on AWS',
  },
  {
    name: 'DevOps Certified Practitioner',
    icon: '/certifications/certified-devops-practitioner.png',
    date: 'Obtained: Jul 2022',
    issuer: 'DevOps Institute',
    description: 'Demonstrates mastery of DevOps principles and practices',
  },
];

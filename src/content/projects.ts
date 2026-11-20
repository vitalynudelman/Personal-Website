export interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  tags: string[];
  icon: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Complete CICD Pipeline',
    description:
      'Complete Jenkins pipeline as part of DevOps course. Implements continuous integration and deployment with automated testing and quality gates.',
    githubLink: 'https://github.com/makexcake/complete-pipeline-jenkins',
    tags: ['Jenkins', 'CI/CD', 'DevOps', 'Automation'],
    icon: '🔄',
  },
  {
    id: 2,
    title: 'Elasticdump GUI',
    description:
      'A web application that allows users to import and export data from Elasticsearch using the elasticdump library. Features an intuitive interface for managing Elasticsearch operations.',
    githubLink: 'https://github.com/makexcake/elasticdump-gui',
    tags: ['JavaScript', 'Elasticsearch', 'Web App', 'Data Management'],
    icon: '📊',
  },
  {
    id: 3,
    title: 'Lab Provisioning With Ansible',
    description:
      'Provisioning lab environments using Ansible and Terraform. Enables quick setup of development and testing environments with infrastructure as code.',
    githubLink: 'https://github.com/makexcake/deploy-lab-with-ansible',
    tags: ['Ansible', 'Terraform', 'IaC', 'DevOps'],
    icon: '🏗️',
  },
];

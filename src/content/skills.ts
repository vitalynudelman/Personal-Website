export interface Skill {
  name: string;
  icon: string;
  category: SkillCategoryId;
}

export interface SkillCategory {
  id: SkillCategoryId;
  name: string;
}

export type SkillCategoryId =
  | 'programming'
  | 'container'
  | 'cicd'
  | 'monitoring'
  | 'cloud'
  | 'automation'
  | 'iac'
  | 'os'
  | 'tools';

export const skillCategories: SkillCategory[] = [
  { id: 'programming', name: 'Programming' },
  { id: 'container', name: 'Containerization' },
  { id: 'cicd', name: 'CI/CD' },
  { id: 'monitoring', name: 'Monitoring' },
  { id: 'cloud', name: 'Cloud' },
  { id: 'automation', name: 'Automation' },
  { id: 'iac', name: 'Infrastructure as Code' },
  { id: 'os', name: 'Operating Systems' },
  { id: 'tools', name: 'Tools' },
];

export const skills: Skill[] = [
  { name: 'Linux', icon: '/skills/linux-logo.png', category: 'os' },
  { name: 'BASH', icon: '/skills/bash-logo.jpg', category: 'programming' },
  { name: 'Python', icon: '/skills/python-logo.png', category: 'programming' },
  { name: 'C++', icon: '/skills/cpp-logo.png', category: 'programming' },
  { name: 'Git', icon: '/skills/git-logo.png', category: 'tools' },
  { name: 'Docker', icon: '/skills/docker-logo.png', category: 'container' },
  { name: 'Kubernetes', icon: '/skills/k8s-logo.png', category: 'container' },
  { name: 'OpenShift', icon: '/skills/ocp-logo.png', category: 'container' },
  { name: 'Helm', icon: '/skills/helm-logo.png', category: 'container' },
  { name: 'Artifactory', icon: '/skills/artifactory-logo.png', category: 'cicd' },
  { name: 'Jenkins', icon: '/skills/jenkins-logo.png', category: 'cicd' },
  { name: 'Ansible', icon: '/skills/ansible-logo.png', category: 'automation' },
  { name: 'Elasticsearch', icon: '/skills/elasticsearch-logo.png', category: 'monitoring' },
  { name: 'Prometheus', icon: '/skills/prometheus-logo.png', category: 'monitoring' },
  { name: 'Grafana', icon: '/skills/grafana-logo.png', category: 'monitoring' },
  { name: 'AWS', icon: '/skills/aws-logo-dark.png', category: 'cloud' },
  { name: 'Terraform', icon: '/skills/terraform-logo.png', category: 'iac' },
];

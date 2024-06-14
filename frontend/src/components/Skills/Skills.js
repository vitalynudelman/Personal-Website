import React from 'react';
import './Skills.css';

function Skills() {
  const skills = [
    { name: 'Linux', icon: 'skills/linux-logo.png' },
    { name: 'BASH', icon: 'skills/bash-logo.jpg' },
    { name: 'Python', icon: 'skills/python-logo.png' },
    { name: 'Git', icon: 'skills/git-logo.png' },
    { name: 'Docker', icon: 'skills/docker-logo.png' },
    { name: 'Kubernetes', icon: 'skills/k8s-logo.png' },
    { name: 'OpenShift', icon: 'skills/ocp-logo.png' },
    { name: 'Helm', icon: 'skills/helm-logo.png' },
    { name: 'Artifactory', icon: 'skills/artifactory-logo.png' },
    { name: 'Jenkins', icon: 'skills/jenkins-logo.png' },
    { name: 'Ansible', icon: 'skills/ansible-logo.png' },
    { name: 'Prometheus', icon: 'skills/prometheus-logo.png' },
    { name: 'Grafana', icon: 'skills/grafana-logo.png' },
    { name: 'AWS', icon: 'skills/aws-logo-dark.png' },
    { name: 'Terraform', icon: 'skills/terraform-logo.png' },
    // Add more skills and their corresponding icons
  ];

  return (
    <section className="Skills">
      <h2>Skills and Technologies</h2>
      <div className="skill-list">
        {skills.map((skill, index) => (
          <div className="skill" key={index}>
            <img src={skill.icon} alt={skill.name} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
import React from 'react';
import './Projects.css';

function Projects() {
  const projects = [
    {
      title: 'Complete CICD Pipeline',
      description: 'Complete Jenkins pipeline as part of DevOps course.',
      githubLink: 'https://github.com/makexcake/complete-pipeline-jenkins',
    },
    {
      title: 'Elasticdump GUI',
      description: 'A web application that allows users to import and export data from Elasticsearch using the elasticdump library.',
      githubLink: 'https://github.com/makexcake/elasticdump-gui',
    },
    {
      title: 'Lab Provisoning With Ansible',
      description: 'Provisioning lab using Ansible and Terraform.',
      githubLink: 'https://github.com/makexcake/deploy-lab-with-ansible',
    }
  ];

  return (
    <section className="Projects">
      <h2>My Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project" key={index}>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <h3>{project.title}</h3>
            </a>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
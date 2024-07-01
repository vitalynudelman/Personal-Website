import React from 'react';
import './Projects.css';

function Projects() {
  const projects = [
    {
      title: 'Project 1',
      description: 'Description of Project 1.',
      githubLink: 'https://github.com/your-username/project1',
    },
    {
      title: 'Project 2',
      description: 'Description of Project 2.',
      githubLink: 'https://github.com/your-username/project2',
    },
    // Add more projects as needed
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
import React, { useState, useRef, useEffect } from 'react';
import './Projects.css';

function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [animateProjects, setAnimateProjects] = useState(false);
  const projectsRef = useRef(null);
  
  // Enhanced project data
  const projects = [
    {
      id: 1,
      title: 'Complete CICD Pipeline',
      description: 'Complete Jenkins pipeline as part of DevOps course. Implements continuous integration and deployment with automated testing and quality gates.',
      githubLink: 'https://github.com/makexcake/complete-pipeline-jenkins',
      tags: ['Jenkins', 'CI/CD', 'DevOps', 'Automation'],
      icon: '🔄'
    },
    {
      id: 2,
      title: 'Elasticdump GUI',
      description: 'A web application that allows users to import and export data from Elasticsearch using the elasticdump library. Features an intuitive interface for managing Elasticsearch operations.',
      githubLink: 'https://github.com/makexcake/elasticdump-gui',
      tags: ['JavaScript', 'Elasticsearch', 'Web App', 'Data Management'],
      icon: '📊'
    },
    {
      id: 3,
      title: 'Lab Provisioning With Ansible',
      description: 'Provisioning lab environments using Ansible and Terraform. Enables quick setup of development and testing environments with infrastructure as code.',
      githubLink: 'https://github.com/makexcake/deploy-lab-with-ansible',
      tags: ['Ansible', 'Terraform', 'IaC', 'DevOps'],
      icon: '🏗️'
    }
  ];
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateProjects(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);
  
  // Handle card expansion
  const toggleProject = (id) => {
    if (activeProject === id) {
      setActiveProject(null);
    } else {
      setActiveProject(id);
    }
  };

  return (
    <section className="Projects" ref={projectsRef} id="projects">
      <div className="section-header">
        <h2 className="section-title">My Projects</h2>
        <div className="section-subtitle">A collection of my work and personal projects</div>
      </div>
      
      <div className={`project-list ${animateProjects ? 'animate' : ''}`}>
        {projects.map((project, index) => (
          <div 
            className={`project-card ${activeProject === project.id ? 'active' : ''}`}
            key={project.id}
            style={{ animationDelay: `${0.1 * index}s` }}
            onClick={() => toggleProject(project.id)}
          >
            <div className="project-icon">{project.icon}</div>
            <h3 className="project-title">{project.title}</h3>
            
            <div className="project-tags">
              {project.tags.map((tag, tagIndex) => (
                <span className="project-tag" key={tagIndex}>{tag}</span>
              ))}
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-actions">
              <a 
                href={project.githubLink} 
                className="project-link" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="github-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </span>
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
import React from 'react';
import './Projects.css';

function Projects() {
  return (
    <section className="Projects">
      <h2>My Projects</h2>
      <div className="project-list">
        <div className="project">
          <h3>Project 1</h3>
          <p>Description of Project 1.</p>
        </div>
        <div className="project">
          <h3>Project 2</h3>
          <p>Description of Project 2.</p>
        </div>
        {/* Add more project divs as needed */}
      </div>
    </section>
  );
}

export default Projects;
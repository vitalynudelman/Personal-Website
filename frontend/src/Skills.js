import React from 'react';
import './Skills.css';

function Skills() {
  const skills = [
    { name: 'Kubernetes', icon: 'path/to/kubernetes-icon.png' },
    { name: 'Jenkins', icon: 'jenkins.png' },
    { name: 'Docker', icon: 'path/to/docker-icon.png' },
    { name: 'AWS', icon: 'path/to/aws-icon.png' },
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
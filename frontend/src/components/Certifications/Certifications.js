import React from 'react';
import './Certifications.css';

function Certifications() {
  const certifications = [
    { name: 'AWS Certified Solutions Architect', icon: 'certifications/aws-solutions-architect-associate.png' },
    { name: 'DevOps', icon: 'certifications/certified-devops-practitioner.png' },
    // Add more certifications and their corresponding icons
  ];

  return (
    <section className="Certifications">
      <h2>Certifications</h2>
      <div className="certification-list">
        {certifications.map((certification, index) => (
          <div className="certification" key={index}>
            <img src={certification.icon} alt={certification.name} />
            <p>{certification.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
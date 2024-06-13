import React from 'react';
import './Certifications.css';

function Certifications() {
  const certifications = [
    { name: 'AWS Certified Solutions Architect', icon: 'path/to/aws-certification-icon.png' },
    { name: 'Kubernetes Administrator', icon: 'path/to/kubernetes-certification-icon.png' },
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
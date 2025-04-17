import React, { useState, useRef, useEffect } from 'react';
import './Certifications.css';

function Certifications() {
  const [animateCerts, setAnimateCerts] = useState(false);
  const certsRef = useRef(null);
  
  // Enhanced certifications data
  const certifications = [
    { 
      name: 'AWS Certified Solutions Architect',
      icon: 'certifications/aws-solutions-architect-associate.png',
      date: 'Obtained: Dec 2023',
      issuer: 'Amazon Web Services',
      description: 'Validates expertise in designing distributed systems on AWS'
    },
    { 
      name: 'DevOps Certified Practitioner',
      icon: 'certifications/certified-devops-practitioner.png',
      date: 'Obtained: Jul 2022',
      issuer: 'DevOps Institute',
      description: 'Demonstrates mastery of DevOps principles and practices'
    }
    // Add more certifications and their corresponding details
  ];
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateCerts(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (certsRef.current) {
      observer.observe(certsRef.current);
    }
    
    return () => {
      if (certsRef.current) {
        observer.unobserve(certsRef.current);
      }
    };
  }, []);
  
  return (
    <section className="Certifications" ref={certsRef} id="certifications">
      <div className="section-header">
        <h2 className="section-title">Professional Certifications</h2>
        <div className="section-subtitle">Credentials validating my technical expertise</div>
      </div>
      
      <div className={`certification-list ${animateCerts ? 'animate' : ''}`}>
        {certifications.map((certification, index) => (
          <div 
            className="certification-card" 
            key={index}
            style={{ animationDelay: `${0.2 * index}s` }}
          >
            <div className="certification-image">
              <img src={certification.icon} alt={certification.name} />
            </div>
            <div className="certification-details">
              <h3 className="certification-title">{certification.name}</h3>
              <div className="certification-meta">
                <span className="certification-issuer">{certification.issuer}</span>
                <span className="certification-date">{certification.date}</span>
              </div>
              <p className="certification-description">{certification.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
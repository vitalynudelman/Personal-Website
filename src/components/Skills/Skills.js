import React, { useState, useRef, useEffect } from 'react';
import './Skills.css';

function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [animateSkills, setAnimateSkills] = useState(false);
  const skillsRef = useRef(null);
  
  // Group skills by category
  const skillsData = [
    { name: 'Linux', icon: 'skills/linux-logo.png', category: 'os' },
    { name: 'BASH', icon: 'skills/bash-logo.jpg', category: 'programming' },
    { name: 'Python', icon: 'skills/python-logo.png', category: 'programming' },
    { name: 'Git', icon: 'skills/git-logo.png', category: 'tools' },
    { name: 'Docker', icon: 'skills/docker-logo.png', category: 'container' },
    { name: 'Kubernetes', icon: 'skills/k8s-logo.png', category: 'container' },
    { name: 'OpenShift', icon: 'skills/ocp-logo.png', category: 'container' },
    { name: 'Helm', icon: 'skills/helm-logo.png', category: 'container' },
    { name: 'Artifactory', icon: 'skills/artifactory-logo.png', category: 'cicd' },
    { name: 'Jenkins', icon: 'skills/jenkins-logo.png', category: 'cicd' },
    { name: 'Ansible', icon: 'skills/ansible-logo.png', category: 'automation' },
    { name: 'Elasticsearch', icon: 'skills/elasticsearch-logo.png', category: 'monitoring' },
    { name: 'Prometheus', icon: 'skills/prometheus-logo.png', category: 'monitoring' },
    { name: 'Grafana', icon: 'skills/grafana-logo.png', category: 'monitoring' },
    { name: 'AWS', icon: 'skills/aws-logo-dark.png', category: 'cloud' },
    { name: 'Terraform', icon: 'skills/terraform-logo.png', category: 'iac' },
  ];
  
  // Define categories with human-readable names
  const categories = [
    { id: 'all', name: 'All Skills' },
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
  
  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);
    
  // Animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section className="Skills" ref={skillsRef}>
      <div className="section-header">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="section-subtitle">Technical proficiencies I've developed over the years</div>
      </div>
      
      <div className="skill-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className={`skill-list ${animateSkills ? 'animate' : ''}`}>
        {filteredSkills.map((skill, index) => (
          <div 
            className="skill" 
            key={index}
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <div className="skill-icon">
              <img src={skill.icon} alt={skill.name} />
            </div>
            <div className="skill-name">{skill.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
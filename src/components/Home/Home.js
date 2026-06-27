import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import Certifications from '../Certifications/Certifications';
import profileImage from './me.jpg';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const bioRef = useRef(null);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
    );
    
    if (bioRef.current) {
      observer.observe(bioRef.current);
    }
    
    return () => {
      if (bioRef.current) {
        observer.unobserve(bioRef.current);
      }
    };
  }, []);
  
  // Typed text effect
  const [typedText, setTypedText] = useState('');
  const fullText = 'Software Developer / DevOps Engineer';
  
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText]);
  
  return (
    <div className="home-container">
      <section className="hero-section">
        <header className="App-header">
          <div className={`profile-container ${isVisible ? 'fade-in' : ''}`} ref={bioRef}>
            <div className="intro-text">
              <h1 className="animate-in">Vitaly Nudelman</h1>
              <h2 className="typing-text">{typedText}<span className="cursor">|</span></h2>
              
              <div className="bio-content">
                <p className="animate-in" style={{ animationDelay: '0.2s' }}>Welcome to My Website!</p>
                <p className="animate-in" style={{ animationDelay: '0.4s' }}>
                  Highly motivated and passionate software developer with proven experience implementing software and DevOps solutions. My work has spanned a broad spectrum of tasks — from designing and writing software for embedded, mission-critical real-time systems to creating and optimizing CI/CD pipelines and writing Helm charts for Kubernetes applications.
                </p>
                <p className="animate-in" style={{ animationDelay: '0.6s' }}>
                  This website showcases my personal projects and tools—both those created to streamline my team's workflow and others developed for learning and enjoyment.
                </p>
                <p className="animate-in" style={{ animationDelay: '0.8s' }}>Enjoy exploring my work, and feel free to contact me.</p>
                
                <div className="cta-buttons animate-in" style={{ animationDelay: '1s' }}>
                  <a href="#projects" className="cta-button primary">View Projects</a>
                  <a href="#skills" className="cta-button secondary">My Skills</a>
                </div>
              </div>
            </div>
            <div className="profile-image-container animate-in" style={{ animationDelay: '0.3s' }}>
              <img src={profileImage} alt="Profile" className="profile-image" />
              <div className="image-outline"></div>
              <div className="image-backdrop"></div>
            </div>
          </div>
        </header>
      </section>
      
      <section id="skills" className="section-container">
        <Skills />
      </section>
      
      <section id="certifications" className="section-container">
        <Certifications />
      </section>
      
      <section id="projects" className="section-container">
        <Projects />
      </section>
    </div>
  );
}

export default Home;
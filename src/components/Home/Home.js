import React from 'react';
import './Home.css';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import Certifications from '../Certifications/Certifications';
import profileImage from './me.jpg';

function Home() {
  return (
    <div>
      <header className="App-header">
        <div className="profile-container">
          <div className="intro-text">
            <h1>Vitaly Nudelman</h1>
            <h2>DevOps Engineer</h2>
            <p>Welcome to My Website!</p>
            <p>
              My name is Vitaly, and I am a DevOps Engineer. I specialize in creating and optimizing CI/CD pipelines and
              writing Helm charts for Kubernetes applications, ensuring seamless integration and continuous delivery in both
              connected and air-gapped environments. My professional journey has equipped me with extensive experience in
              designing and implementing efficient systems and processes.
            </p>
            <p>
              This website will showcase my personal projects and tools that I've written to make my team's working
              process smoother and more efficient, as well as projects that I've made just for learning and fun.
            </p>
            <p>Enjoy and feel free to contact me.</p>
          </div>
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
      </header>
      <Skills />
      <Certifications />
      <Projects />
    </div>
  );
}


export default Home;
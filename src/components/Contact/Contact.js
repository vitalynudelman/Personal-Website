import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="Contact">
      <h2>Contact Me</h2>
      <p>Email: v.nudelman@gmail.com</p>
      <p>Phone: +972 54 648 7047</p>
      <p>Location: Israel</p>

      <div className="resume-section">
        <h3>Resume</h3>
        <iframe src="resume/resume.pdf" width="100%" height="600px"></iframe>
        <a href="resume/resume.pdf" target="_blank" rel="noopener noreferrer" download>
          Download Resume
        </a>
      </div>
    </div>
  );
}

export default Contact;
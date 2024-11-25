import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="Contact">
      <h2>Contact Me</h2>

      <div className="resume-section">
        <iframe src="resume/resume.pdf" width="100%" height="600px"></iframe>
        <a href="resume/resume.pdf" target="_blank" rel="noopener noreferrer" download>
          Download Resume
        </a>
      </div>
    </div>
  );
}

export default Contact;
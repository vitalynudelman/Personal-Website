import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

function Contact() {
  const [animateContact, setAnimateContact] = useState(false);
  const contactRef = useRef(null);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateContact(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }
    
    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);
  
  // Form handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock form submission - in a real scenario, this would send data to a server
    setSubmitStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });
    
    // Reset form after successful submission
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setSubmitStatus({ submitted: false, success: false, message: '' });
    }, 5000);
  };
  
  return (
    <div className="Contact" ref={contactRef}>
      <div className={`contact-wrapper ${animateContact ? 'animate' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-subtitle">Feel free to reach out for collaboration or questions</div>
        </div>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-method">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>vitaly@example.com</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">💼</div>
              <div className="contact-details">
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/example" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/example
                </a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">💻</div>
              <div className="contact-details">
                <h3>GitHub</h3>
                <a href="https://github.com/makexcake" target="_blank" rel="noopener noreferrer">
                  github.com/makexcake
                </a>
              </div>
            </div>
            
            <div className="resume-download">
              <h3>My Resume</h3>
              <a 
                href="resume/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                download
                className="download-button"
              >
                <span className="download-icon">📄</span>
                Download Resume
              </a>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h3>Send a Message</h3>
            {submitStatus.submitted ? (
              <div className={`submission-message ${submitStatus.success ? 'success' : 'error'}`}>
                {submitStatus.message}
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="resume-preview">
          <h3>Resume Preview</h3>
          <div className="pdf-container">
            <iframe 
              src="resume/resume.pdf" 
              title="Resume Preview"
              width="100%" 
              height="600px"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
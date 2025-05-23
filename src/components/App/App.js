import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Contact from '../Contact/Contact';

// Navigation component with active state
const Navigation = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className="navbar">
      <div className="nav-logo">VN</div>
      
      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li className={location.pathname === '/contact' ? 'active' : ''}>
          <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
        </li>
      </ul>
      
      <div className="navbar-controls">
        <button 
          onClick={toggleTheme} 
          className="theme-toggle" 
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
};

// App content with navigation context
const AppContent = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply theme and persist to localStorage
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    
    // Add smooth page load transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      document.body.className = newTheme;
      return newTheme;
    });
  };

  if (isLoading) {
    return <div className="page-loader"></div>;
  }

  return (
    <div className="App">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Vitaly Nudelman</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
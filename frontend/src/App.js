import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './Home.css';
import './Contact.css';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <header className="App-header">
      <h1>Vitaly Nudelman</h1>
      <h2>DevOps Engineer</h2>
      <p>
        Welcome to My Website!
      </p>
      <p>
        My name is Vitaly, and I am a DevOps Engineer. I specialize in creating and optimizing CI/CD pipelines and
        writing Helm charts for Kubernetes applications, ensuring seamless integration and continuous delivery in both
        connected and air-gapped environments. My professional journey has equipped me with extensive experience in
        designing and implementing efficient systems and processes.
      </p>
      <p>
        This website will showcase my personal projects and tools that I've written to make my and my team's working
        process smoother and more efficient, as well as projects that I've made just for fun.
      </p>
      <p>
        Enjoy and feel free to contact me.
      </p>
    </header>
  );
}

export default App;
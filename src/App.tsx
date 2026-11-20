import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './pages/Home';
import Contact from './pages/Contact';
import styles from './App.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <a className={styles.skipLink} href="#main">
          Skip to content
        </a>

        <Nav />

        <main id="main" className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Vitaly Nudelman</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

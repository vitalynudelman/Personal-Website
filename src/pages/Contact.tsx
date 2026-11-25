import { profile, profileLinks } from '../content/profile';
import Section from '../components/Section/Section';
import styles from '../components/Contact/Contact.module.css';

export default function Contact() {
  return (
    <Section
      title="Get In Touch"
      subtitle="Feel free to reach out on LinkedIn for collaboration or questions"
    >
      <ul className={styles.links}>
        {profileLinks.map((link) => (
          <li key={link.label} className={styles.link}>
            <span className={styles.icon} aria-hidden="true">
              {link.icon}
            </span>
            <span className={styles.details}>
              <span className={styles.label}>{link.label}</span>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.value}
              </a>
            </span>
          </li>
        ))}

        <li className={styles.resume}>
          <span className={styles.label}>My Resume</span>
          <a className={styles.download} href={profile.resumePath} download>
            <DownloadIcon />
            Download Resume
          </a>
        </li>
      </ul>
    </Section>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

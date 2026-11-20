import { projects } from '../../content/projects';
import Section from '../Section/Section';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <Section
      id="projects"
      title="My Projects"
      subtitle="A collection of my work and personal projects"
    >
      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.id}>
            <a
              className={styles.card}
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.icon} aria-hidden="true">
                {project.icon}
              </span>

              <h3 className={styles.title}>{project.title}</h3>

              <ul className={styles.tags}>
                {project.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>

              <p className={styles.description}>{project.description}</p>

              <span className={styles.cta}>
                <GitHubIcon />
                View on GitHub
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

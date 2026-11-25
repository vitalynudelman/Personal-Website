import { experience } from '../../content/experience';
import Section from '../Section/Section';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Where I've worked and what I built there"
    >
      <ol className={styles.timeline}>
        {experience.map((role) => (
          <li key={`${role.company}-${role.period}`} className={styles.role}>
            <div className={styles.heading}>
              <div className={styles.who}>
                <h3 className={styles.title}>{role.title}</h3>
                <p className={styles.company}>
                  {role.company}
                  {role.location ? <span className={styles.location}>, {role.location}</span> : null}
                </p>
              </div>
              <p className={styles.period}>{role.period}</p>
            </div>

            <ul className={styles.bullets}>
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

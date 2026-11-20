import { certifications } from '../../content/certifications';
import Section from '../Section/Section';
import styles from './Certifications.module.css';

export default function Certifications() {
  return (
    <Section
      id="certifications"
      title="Professional Certifications"
      subtitle="Credentials validating my technical expertise"
    >
      <ul className={styles.grid}>
        {certifications.map((certification) => (
          <li key={certification.name} className={styles.card}>
            <img
              src={certification.icon}
              alt=""
              width={72}
              height={72}
              loading="lazy"
              className={styles.badge}
            />
            <div>
              <h3 className={styles.name}>{certification.name}</h3>
              <p className={styles.meta}>
                <span>{certification.issuer}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{certification.date}</span>
              </p>
              <p className={styles.description}>{certification.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

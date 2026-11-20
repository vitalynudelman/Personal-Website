import { useMemo, useState } from 'react';
import { skillCategories, skills } from '../../content/skills';
import Section from '../Section/Section';
import styles from './Skills.module.css';

const ALL = 'all';

export default function Skills() {
  const [active, setActive] = useState<string>(ALL);

  const filters = useMemo(() => [{ id: ALL, name: 'All Skills' }, ...skillCategories], []);
  const visible = active === ALL ? skills : skills.filter((skill) => skill.category === active);

  return (
    <Section
      id="skills"
      title="Skills & Technologies"
      subtitle="Technical proficiencies I've developed over the years"
    >
      <div className={styles.filters} role="group" aria-label="Filter skills by category">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={styles.filter}
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
          >
            {filter.name}
          </button>
        ))}
      </div>

      <ul className={styles.grid}>
        {visible.map((skill) => (
          <li key={skill.name} className={styles.skill}>
            <img src={skill.icon} alt="" width={40} height={40} loading="lazy" />
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

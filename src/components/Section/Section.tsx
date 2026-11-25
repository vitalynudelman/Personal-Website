import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** A titled page section that fades in the first time it scrolls into view. */
export default function Section({ id, title, subtitle, children }: SectionProps) {
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <section id={id} ref={ref} className={`${styles.section} reveal`} data-revealed={revealed}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </header>
      {children}
    </section>
  );
}

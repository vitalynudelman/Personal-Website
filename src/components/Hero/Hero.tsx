import { profile } from '../../content/profile';
import profileImage from '../../assets/me.jpg';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.greeting}>{profile.greeting}</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>{profile.title}</p>

        <div className={styles.bio}>
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.actions}>
          <a className={styles.primary} href="#experience">
            View Experience
          </a>
          <a className={styles.secondary} href="#skills">
            My Skills
          </a>
        </div>
      </div>

      <div className={styles.portrait}>
        <img
          src={profileImage}
          alt={`${profile.name}, ${profile.title}`}
          width={320}
          height={320}
        />
      </div>
    </header>
  );
}

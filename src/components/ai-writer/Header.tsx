// components/Header.tsx
import styles from "../../components/Home/home.module.css";

const Header = () => {
  return (
    <section className={`${styles.glassmorphism} ${styles.hero}`}>
      <h1 className={styles.heroTitle}>🤖➡️👤 AI to Human Text Converter</h1>
      <p className={styles.heroText}>
        Transform AI-generated text into natural, human-like content
      </p>
    </section>
  );
};

export default Header;

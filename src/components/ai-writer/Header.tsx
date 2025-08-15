// components/Header.tsx
import styles from '../../app/styles/aiwriter.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>🤖➡️👤 AI to Human Text Converter</h1>
      <p className={styles.headerSubtitle}>Transform AI-generated text into natural, human-like content</p>
    </div>
  );
};

export default Header;
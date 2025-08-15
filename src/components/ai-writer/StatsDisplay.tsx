// components/StatsDisplay.tsx
import { Stats } from '../../types';
import styles from '../../app/styles/aiwriter.module.css'

interface StatsDisplayProps {
  stats: Stats;
}

const StatsDisplay = ({ stats }: StatsDisplayProps) => {
  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.wordCount}</div>
        <div className={styles.statLabel}>Words</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.sentenceCount}</div>
        <div className={styles.statLabel}>Sentences</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.changesCount}</div>
        <div className={styles.statLabel}>Changes Made</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statNumber}>{stats.humanScore}%</div>
        <div className={styles.statLabel}>Human Score</div>
      </div>
    </div>
  );
};

export default StatsDisplay;
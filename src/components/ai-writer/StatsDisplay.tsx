// components/StatsDisplay.tsx
import { Stats } from '../../types';
import styles from './page.module.css'
import homeStyle from "../../components/Home/home.module.css";

interface StatsDisplayProps {
  stats: Stats;
}

const StatsDisplay = ({ stats }: StatsDisplayProps) => {
  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.wordCount}</div>
        <div className={homeStyle.normalText}>Words</div>
      </div>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.sentenceCount}</div>
        <div className={homeStyle.normalText}>Sentences</div>
      </div>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.changesCount}</div>
        <div className={homeStyle.normalText}>Changes Made</div>
      </div>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.humanScore}%</div>
        <div className={homeStyle.normalText}>Human Score</div>
      </div>
    </div>
  ); 
};

export default StatsDisplay;
// components/StatsDisplay.tsx
import styles from "../../../app/ai-writer/page.module.css";
import homeStyle from "../../../components/Home/home.module.css";

import { IDateProgressResult } from "./page";

const StatsDisplay = ({ stats }: { stats: IDateProgressResult }) => {
  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.percentage}%</div>
        <div className={homeStyle.normalText}>Elapsed</div>
      </div>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.remainingPercentage}%</div>
        <div className={homeStyle.normalText}>Remaining</div>
      </div>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.elapsedDays}</div>
        <div className={homeStyle.normalText}>Days Passed</div>
      </div>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.remainingDays}</div>
        <div className={homeStyle.normalText}>Days Left</div>
      </div>
      <div className={styles.statCard}>
        <div className={homeStyle.heroTitle}>{stats.totalDays}</div>
        <div className={homeStyle.normalText}>Total Days</div>
      </div>
    </div>
  );
};

export default StatsDisplay;

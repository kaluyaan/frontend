// components/LoadingSpinner.tsx
import styles from '../../app/ai-writer/page.module.css'
import homeStyle from "../../components/Home/home.module.css";


interface LoadingSpinnerProps {
  isVisible: boolean;
}

const LoadingSpinner = ({ isVisible }: LoadingSpinnerProps) => {
  if (!isVisible) return null;

  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p className={homeStyle.reverseTitle}>Humanizing your text...</p>
    </div>
  );
};

export default LoadingSpinner;
// components/LoadingSpinner.tsx
import styles from '../../app/styles/aiwriter.module.css'

interface LoadingSpinnerProps {
  isVisible: boolean;
}

const LoadingSpinner = ({ isVisible }: LoadingSpinnerProps) => {
  if (!isVisible) return null;

  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Humanizing your text...</p>
    </div>
  );
};

export default LoadingSpinner;
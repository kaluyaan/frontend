// components/LoadingSpinner.tsx
import styles from './page.module.css'
import homeStyle from "../../components/Home/home.module.css";


interface LoadingSpinnerProps {
  isVisible: boolean;
  text?: string;
}

const LoadingSpinner = ({ isVisible,text =  "Humanizing your text..."}: LoadingSpinnerProps) => {
  if (!isVisible) return null;

  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p className={homeStyle.reverseTitle}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
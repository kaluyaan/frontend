// components/ConvertButton.tsx
import styles from '../../app/styles/aiwriter.module.css'

interface ConvertButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const ConvertButton = ({ onClick, disabled = false }: ConvertButtonProps) => {
  return (
    <div className={styles.buttonContainer}>
      <button 
        className={styles.convertBtn}
        onClick={onClick}
        disabled={disabled}
      >
        🔄 Humanize Text
      </button>
    </div>
  );
};

export default ConvertButton;
// components/ConvertButton.tsx
import homeStyle from "../../components/Home/home.module.css";

interface ConvertButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const ConvertButton = ({ onClick, disabled = false }: ConvertButtonProps) => {
  return (
    <div className={homeStyle.buttonContainer}>
      <button 
        className={homeStyle.button}
        onClick={onClick}
        disabled={disabled}
      >
        🔄 Humanize Text
      </button>
    </div>
  );
};

export default ConvertButton;
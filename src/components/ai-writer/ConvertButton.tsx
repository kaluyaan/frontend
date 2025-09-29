import homeStyle from "../../components/Home/home.module.css";

interface ConvertButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

const ConvertButton = ({ onClick, disabled = false, label = "🔄 Humanize Text" }: ConvertButtonProps) => {
  return (
    <div className={homeStyle.buttonContainer}>
      <button 
        className={homeStyle.button}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default ConvertButton;
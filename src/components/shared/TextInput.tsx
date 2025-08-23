// components/TextInput.tsx
import { useEffect, useRef } from 'react';
import styles from '../../app/ai-writer/page.module.css'
import homeStyle from "../../components/Home/home.module.css";


interface TextInputProps {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  title: string;
  placeholder: string;
}

const TextInput = ({ disabled = false,value, onChange, title, placeholder }: TextInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const handleInput = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      };

      textarea.addEventListener('input', handleInput);
      
      // Initial height adjustment
      handleInput();

      return () => {
        textarea.removeEventListener('input', handleInput);
      };
    }
  }, []);

  return (
    <div className={styles.inputSection}>
      <div className={homeStyle.reverseTitle}>{title}</div>
      <textarea
        ref={textareaRef}
        disabled={disabled}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
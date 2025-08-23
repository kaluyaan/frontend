// components/TextInput.tsx
import { useEffect, useRef } from 'react';
import styles from '../../app/ai-writer/page.module.css'

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput = ({ value, onChange }: TextInputProps) => {
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
      <div className={styles.sectionTitle}>Input Text (AI-generated)</div>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your AI-generated text here..."
      />
    </div>
  );
};

export default TextInput;
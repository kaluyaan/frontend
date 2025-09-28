// components/TextOutput.tsx
import { useEffect, useRef } from 'react';
import styles from './page.module.css'
import homeStyle from "../../components/Home/home.module.css";
interface TextOutputProps {
  value: string;
}

const TextOutput = ({ value }: TextOutputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const handleInput = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      };

      textarea.addEventListener('input', handleInput);
      
      // Adjust height when value changes
      handleInput();

      return () => {
        textarea.removeEventListener('input', handleInput);
      };
    }
  }, [value]);

  return (
    <div className={styles.outputSection}>
      <div className={homeStyle.reverseTitle}>Humanized Output</div>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        placeholder="Your humanized text will appear here..."
        readOnly
      />
    </div>
  );
};

export default TextOutput;
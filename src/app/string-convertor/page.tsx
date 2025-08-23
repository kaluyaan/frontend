
'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function StringConverter() {
  const [input, setInput] = useState('');

  const conversions = {
    lowercase: input.toLowerCase(),
    uppercase: input.toUpperCase(),
    camelCase: input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''),
    pascalCase: input.replace(/(?:^\w|[A-Z]|\b\w)/g, word => 
      word.toUpperCase()).replace(/\s+/g, ''),
    snakeCase: input.toLowerCase().replace(/\s+/g, '_'),
    kebabCase: input.toLowerCase().replace(/\s+/g, '-'),
    titleCase: input.replace(/\w\S*/g, txt => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>String Case Converter</h1>
      
      <div className={styles.inputSection}>
        <textarea
          className={styles.input}
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />
      </div>

      <div className={styles.results}>
        {Object.entries(conversions).map(([type, result]) => (
          <div key={type} className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <h3 className={styles.resultTitle}>
                {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <button 
                className={styles.copyBtn}
                onClick={() => copyToClipboard(result)}
                disabled={!result}
              >
                Copy
              </button>
            </div>
            <div className={styles.resultText}>{result || 'Enter text to see result'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


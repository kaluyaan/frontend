"use client";

import { useState } from "react";
import styles from "./ResultsDisplay.module.css";

interface ResultsDisplayProps {
  originalSentence: string;
  results: string[];
}

export default function ResultsDisplay({
  originalSentence,
  results,
}: ResultsDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (results.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Generated Similar Sentences</h3>
        <span className={styles.count}>{results.length} variations</span>
      </div>

      <div className={styles.original}>
        <div className={styles.originalLabel}>Original:</div>
        <div className={styles.originalText}>{originalSentence}</div>
      </div>

      <div className={styles.results}>
        {results.map((sentence, index) => (
          <div key={index} className={styles.resultItem}>
            <div className={styles.resultTextWrapper}>
              <div className={styles.resultNumber}>{index + 1}</div>
              <button
                onClick={() => copyToClipboard(sentence, index)}
                className={styles.copyBtn}
                title="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className={styles.resultText}>{sentence}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

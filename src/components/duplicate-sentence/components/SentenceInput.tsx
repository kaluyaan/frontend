"use client";

import { useState } from "react";
import styles from "./SentenceInput.module.css";
import pageStyle from "../page.module.css";
import homeStyle from "../../../components/Home/home.module.css";

interface SentenceInputProps {
  onGenerate: (sentence: string, level: number, tone: string) => void;
  isLoading: boolean;
}

export default function SentenceInput({
  onGenerate,
  isLoading,
}: SentenceInputProps) {
  const [sentence, setSentence] = useState("");
  const [level, setLevel] = useState(3);
  const [tone, setTone] = useState("formal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sentence.trim()) {
      onGenerate(sentence.trim(), level, tone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="sentence" className={homeStyle.normalTitle}>
          Enter your sentence
        </label>
        <textarea
          id="sentence"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Type your sentence here..."
          className={pageStyle.textarea}
          rows={3}
          required
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="level" className={homeStyle.normalTitle}>
            Similarity Level: {level}
          </label>
          <input
            type="range"
            id="level"
            min="1"
            max="5"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>Conservative</span>
            <span>Aggressive</span>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="tone" className={homeStyle.normalTitle}>
            Tone
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className={styles.select}
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>

      <div className={homeStyle.buttonContainer}>
        <button
          type="submit"
          className={homeStyle.button}
          disabled={!sentence.trim() || isLoading}
        >
          {isLoading ? "Generating..." : "Generate Similar Sentences"}
        </button>
      </div>
    </form>
  );
}

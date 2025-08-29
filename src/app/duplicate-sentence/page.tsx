"use client";

import { useState } from "react";
import SentenceInput from "./components/SentenceInput";
import ResultsDisplay from "./components/ResultsDisplay";
import { generateSimilarSentences } from "./utils/dictionary";
import styles from "./page.module.css";
import homeStyle from "../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";

export default function DuplicateSentencePage() {
  const [results, setResults] = useState<string[]>([]);
  const [originalSentence, setOriginalSentence] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (
    sentence: string,
    level: number,
    tone: string
  ) => {
    setIsLoading(true);
    setOriginalSentence(sentence);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const similarSentences = generateSimilarSentences(
        sentence,
        level,
        tone as "formal" | "casual" | "professional"
      );
      console.log("similarSentences: ", similarSentences);
      setResults(similarSentences);
    } catch (error) {
      console.error("Error generating sentences:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          icon={"🔄"}
          title="Duplicate Sentence Generator"
          text="Transform your sentences with AI-powered paraphrasing. Choose similarity levels and tones to create perfect variations."
        />

        <div className={homeStyle.sectionWrapper}>
          <SentenceInput onGenerate={handleGenerate} isLoading={isLoading} />

          {(results.length > 0 || isLoading) && (
            <div className={styles.resultsSection}>
              {isLoading ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <p>Generating similar sentences...</p>
                </div>
              ) : (
                <ResultsDisplay
                  originalSentence={originalSentence}
                  results={results}
                />
              )}
            </div>
          )}
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Precision Control</h3>
            <p>
              Adjust similarity levels from conservative to aggressive
              transformations
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎭</div>
            <h3>Tone Variations</h3>
            <p>
              Switch between formal, casual, and professional writing styles
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📚</div>
            <h3>Rich Dictionary</h3>
            <p>
              Powered by comprehensive synonym database for natural variations
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

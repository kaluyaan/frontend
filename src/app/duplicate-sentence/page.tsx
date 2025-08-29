"use client";

import { useState } from "react";
import SentenceInput from "./components/SentenceInput";
import ResultsDisplay from "./components/ResultsDisplay";
import { generateSimilarSentences } from "./utils/dictionary";
import styles from "./page.module.css";
import homeStyle from "../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";

const features = [
  {
    icon: "🎯",
    title: "Precision Control",
    description:
      "Adjust similarity levels from conservative to aggressive transformations",
  },
  {
    icon: "🎭",
    title: "Tone Variations",
    description:
      "Switch between formal, casual, and professional writing styles",
  },
  {
    icon: "📚",
    title: "Rich Dictionary",
    description:
      "Powered by comprehensive synonym database for natural variations",
  },
];

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
          {features.map((feature, index) => (
            <div className={styles.feature} key={index}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

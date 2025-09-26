"use client";
import { JSX, useState } from "react";
import styles from "../../shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

// TypeScript interfaces
interface CrushSign {
  sign: string;
  weight: number;
}

interface CalculationResult {
  percentage: number;
  message: string;
  advice: string;
}

interface LetterCount {
  [key: string]: number;
}

export default function CrushCalculator(): JSX.Element {
  const [yourName, setYourName] = useState<string>("");
  const [crushName, setCrushName] = useState<string>("");
  const [signs, setSigns] = useState<string[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const crushSigns: CrushSign[] = [
    { sign: "Makes prolonged eye contact", weight: 8 },
    { sign: "Texts you first or responds quickly", weight: 9 },
    { sign: "Remembers small details about you", weight: 10 },
    { sign: "Finds excuses to spend time together", weight: 9 },
    { sign: "Laughs at your jokes (even bad ones)", weight: 7 },
    { sign: "Asks personal questions about your life", weight: 8 },
    { sign: "Touches you playfully or accidentally", weight: 9 },
    { sign: "Gets a bit jealous when you talk to others", weight: 8 },
    { sign: "Compliments you frequently", weight: 7 },
    { sign: "Shows up where you usually are", weight: 6 },
    { sign: "Their friends tease them around you", weight: 10 },
    { sign: "They seem nervous or fidgety around you", weight: 6 },
  ];

  const toggleSign = (sign: string) => {
    setSigns((prev) =>
      prev.includes(sign) ? prev.filter((s) => s !== sign) : [...prev, sign]
    );
  };

  const getNameCompatibility = (name1: string, name2: string): number => {
    // Simple FLAMES-inspired algorithm
    const combined: string = (name1 + name2).toLowerCase().replace(/\s/g, "");
    const letterCount: LetterCount = {};

    for (const char of combined) {
      letterCount[char] = (letterCount[char] || 0) + 1;
    }

    let uniqueLetters: number = 0;
    for (const count of Object.values(letterCount)) {
      if (count % 2 === 1) uniqueLetters++;
    }

    // Convert to percentage (0-40 range for name compatibility)
    return Math.min(uniqueLetters * 6 + 10, 40);
  };

  const calculateCrush = (): void => {
    if (!yourName.trim() || !crushName.trim()) {
      alert("Please enter both names!");
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      // Name compatibility score (0-40 points)
      const nameScore: number = getNameCompatibility(yourName, crushName);

      // Signs score with weighted values (0-60 points)
      const maxSignScore: number = crushSigns.reduce(
        (sum, item) => sum + item.weight,
        0
      );
      const currentSignScore: number = signs.reduce((sum, selectedSign) => {
        const signObj = crushSigns.find((item) => item.sign === selectedSign);
        return sum + (signObj ? signObj.weight : 0);
      }, 0);

      const signScore: number = (currentSignScore / maxSignScore) * 60;

      // Total percentage
      const total: number = Math.min(Math.round(nameScore + signScore), 100);

      let message: string = "";
      let advice: string = "";

      if (total >= 85) {
        message = "They're totally into you! 💕";
        advice = "Go for it! The signs are all there - ask them out!";
      } else if (total >= 70) {
        message = "Very promising signs! 😍";
        advice = "Time to make your move - start with casual hangouts!";
      } else if (total >= 55) {
        message = "Good potential! 😊";
        advice = "Keep building that connection - spend more time together!";
      } else if (total >= 40) {
        message = "Mixed signals... 🤔";
        advice =
          "Be patient and look for more clear signs before making a move.";
      } else if (total >= 25) {
        message = "Might be just friends 😅";
        advice = "Focus on building a stronger friendship first!";
      } else {
        message = "Probably not feeling it 💙";
        advice =
          "Don't worry! The right person will show clear interest in you.";
      }

      setResult({ percentage: total, message, advice });
      setIsCalculating(false);
    }, 2000);
  };

  // const resetCalculator = (): void => {
  //   setYourName("");
  //   setCrushName("");
  //   setSigns([]);
  //   setResult(null);
  // };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          // icon="👁️"
          title="💕 Crush Calculator 💕"
          text="Discover if your crush likes you back!"
        />

        <div className={homeStyle.sectionWrapper}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label htmlFor="sentence" className={homeStyle.normalTitle}>
                Enter your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={yourName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setYourName(e.target.value)
                }
                className={styles.input}
                disabled={isCalculating}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={homeStyle.normalTitle}>{`Crush's Name`}</label>
              <input
                type="text"
                placeholder="Enter your crush's name"
                value={crushName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCrushName(e.target.value)
                }
                className={styles.input}
                disabled={isCalculating}
              />
            </div>
          </div>

          <div className={styles.signsSection}>
            <label className={homeStyle.normalTitle}>
              Signs they might like you:
            </label>
            <div className={styles.grid}>
              {crushSigns.map(({ sign }) => (
                <div key={sign} className={homeStyle.normalText}>
                  <label key={sign} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={signs.includes(sign)}
                      onChange={() => toggleSign(sign)}
                      className={styles.checkbox}
                      disabled={isCalculating}
                    />
                    <span className={styles.checkboxText}>{sign}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <ConvertButton
              onClick={calculateCrush}
              disabled={isCalculating}
              label={
                isCalculating
                  ? "Calculating Magic..."
                  : "Calculate My Chances! ✨"
              }
            />
          </div>

          {result && (
            <section className={homeStyle.sectionWrapper}>
              <div className={homeStyle.heroTitle}>{result.percentage}%</div>
              <div className={homeStyle.normalText}>{result.message}</div>
              <div className={homeStyle.normalText}>{result.advice}</div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

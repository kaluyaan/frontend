"use client";

import React, { JSX, useState } from "react";
import styles from "./page.module.css";
import { TestResult, TestType, LanguageKey } from "./types";
import {
  LANGUAGES,
  COLOR_TESTS,
  TEST_MESSAGES,
  VISION_THRESHOLDS,
} from "./constants";
import homeStyle from "../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

function EyeSightTest() {
  const [currentTest, setCurrentTest] = useState<TestType>("visual");
  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageKey>("english");
  const [colorTestResults, setColorTestResults] = useState<boolean[]>([]);
  const [testResults, setTestResults] = useState<TestResult | null>(null);

  const handleColorTest = (
    selectedColor: string,
    correctAnswer: string
  ): void => {
    const isCorrect = selectedColor === correctAnswer;
    setColorTestResults((prev) => [...prev, isCorrect]);

    if (colorTestResults.length + 1 >= COLOR_TESTS.length) {
      const correctCount =
        colorTestResults.filter((result) => result).length +
        (isCorrect ? 1 : 0);
      const percentage = (correctCount / COLOR_TESTS.length) * 100;

      setTestResults({
        type: "color",
        score: percentage,
        details: `${correctCount}/${COLOR_TESTS.length} correct answers`,
      });
    }
  };

  const handleVisualTest = (lineIndex: number): void => {
    const percentage =
      ((lineIndex + 1) / LANGUAGES[currentLanguage].chart.length) * 100;
    setTestResults({
      type: "visual",
      score: percentage,
      details: `Read up to line ${lineIndex + 1} (${
        LANGUAGES[currentLanguage].chart[lineIndex].size
      }px font)`,
    });
  };

  const handleReadAll = (): void => {
    setTestResults({
      type: "visual",
      score: 100,
      details: `Read all lines perfectly (${
        LANGUAGES[currentLanguage].chart[
          LANGUAGES[currentLanguage].chart.length - 1
        ].size
      }px font)`,
    });
  };

  const resetTest = (): void => {
    setColorTestResults([]);
    setTestResults(null);
  };

  const printResults = (): void => {
    if (!testResults) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Eye Sight Test Results - Kaluyaan</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .company { font-size: 24px; font-weight: bold; color: #667eea; margin-bottom: 10px; }
          .title { font-size: 20px; color: #333; }
          .results { margin: 30px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          .score { font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px; }
          .details { margin: 10px 0; }
          .recommendation { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company">KALUYAAN</div>
          <div class="title">Eye Sight Test Results</div>
        </div>
        
        <div class="results">
          <div class="score">
            ${
              testResults.type === "visual"
                ? "👁️ Visual Acuity Test"
                : "🌈 Color Vision Test"
            }
          </div>
          <div class="details">
            <strong>Score:</strong> ${testResults.score.toFixed(1)}%
          </div>
          <div class="details">
            <strong>Details:</strong> ${testResults.details}
          </div>
          <div class="recommendation">
            <strong>Recommendation:</strong><br>
            ${
              testResults.score >= VISION_THRESHOLDS.EXCELLENT
                ? TEST_MESSAGES.RESULTS.EXCELLENT
                : testResults.score >= VISION_THRESHOLDS.GOOD
                ? TEST_MESSAGES.RESULTS.GOOD
                : testResults.score >= VISION_THRESHOLDS.MODERATE
                ? TEST_MESSAGES.RESULTS.MODERATE
                : TEST_MESSAGES.RESULTS.POOR
            }
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Test Date:</strong> ${currentDate} at ${currentTime}</p>
          <p><strong>Disclaimer:</strong> This is a basic vision screening tool and should not replace professional eye examinations.</p>
          <p><strong>Kaluyaan Eye Care Services</strong></p>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const renderVisualChart = (): JSX.Element => {
    const chart = LANGUAGES[currentLanguage].chart;

    return (
      <div className={styles.visualChart}>
        {chart.map((line, index) => (
          <div
            key={index}
            className={styles.chartLine}
            style={{ fontSize: `${line.size}px` }}
          >
            {line.letters.join(" ")}
            <div
              style={{ marginLeft: "20px", display: "inline-flex", gap: "8px" }}
            >
              <button
                onClick={() => handleVisualTest(index)}
                style={{
                  padding: "5px 10px",
                  fontSize: "12px",
                  background: "#ff6b6b",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {TEST_MESSAGES.BUTTONS.CANT_READ}
              </button>
              {index === chart.length - 1 && (
                <button
                  onClick={handleReadAll}
                  style={{
                    padding: "5px 10px",
                    fontSize: "12px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {TEST_MESSAGES.BUTTONS.READ_ALL}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderColorTest = (): JSX.Element | null => {
    const currentTestIndex = colorTestResults.length;
    if (currentTestIndex >= COLOR_TESTS.length) return null;

    const currentColorTest = COLOR_TESTS[currentTestIndex];

    return (
      <div>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          {currentColorTest.question}
        </h3>
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          Can you see the number:{" "}
          <span style={{ color: currentColorTest.correctAnswer }}>
            {currentColorTest.hiddenNumber}
          </span>
        </div>
        <div className={styles.colorTest}>
          {currentColorTest.colors.map((color, index) => (
            <div
              key={index}
              className={styles.colorCircle}
              style={{ backgroundColor: color }}
              onClick={() =>
                handleColorTest(color, currentColorTest.correctAnswer)
              }
            >
              {color === currentColorTest.correctAnswer
                ? currentColorTest.hiddenNumber
                : "?"}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Test {currentTestIndex + 1} of {COLOR_TESTS.length}
        </div>
      </div>
    );
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          icon="👁️"
          title="Eye Sight Test"
          text="Professional vision screening with multiple languages and color vision testing"
        />

        <section className={homeStyle.sectionWrapper}>
          <div className={styles.testSelector}>
            <button
              className={`${styles.testButton} ${
                currentTest === "visual" ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentTest("visual");
                resetTest();
              }}
            >
              📖 Visual Acuity Test
            </button>
            <button
              className={`${styles.testButton} ${
                currentTest === "color" ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentTest("color");
                resetTest();
              }}
            >
              🌈 Color Vision Test
            </button>
          </div>

          <div className={styles.distanceInfo}>
            📏 Please sit 6 feet (2 meters) away from your screen for accurate
            results
          </div>
        </section>

        {currentTest === "visual" && (
          <>
            <section className={homeStyle.sectionWrapper}>
              <h3 className={homeStyle.normalTitle}>
                Visual Acuity Test Instructions:
              </h3>
              <div className={homeStyle.normalText}>
                1. Cover one eye with your hand
                <br />
                2. Read the letters from top to bottom
                <br />
                3. Click "Can't read smaller" when letters become unclear
                <br />
                4. Repeat with the other eye
              </div>
            </section>

            <div className={styles.languageSelector}>
              {Object.entries(LANGUAGES).map(([key, lang]) => (
                <button
                  key={key}
                  className={`${styles.languageButton} ${
                    currentLanguage === key ? styles.active : ""
                  }`}
                  onClick={() => setCurrentLanguage(key as LanguageKey)}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            <div className={styles.testArea}>{renderVisualChart()}</div>
          </>
        )}

        {currentTest === "color" && (
          <>
            <section className={homeStyle.sectionWrapper}>
              <h3 className={homeStyle.normalTitle}>
                Color Vision Test Instructions:
              </h3>
              <div className={homeStyle.normalText}>
                1. Look at each color pattern
                <br />
                2. Try to identify the hidden number
                <br />
                3. Click on the color that matches the question
                <br />
                4. Complete all tests for accurate results
              </div>
            </section>

            <div className={styles.testArea}>
              {colorTestResults.length < COLOR_TESTS.length ? (
                renderColorTest()
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h3>Color Vision Test Complete!</h3>
                  <p>Click "Reset Test" to try again</p>
                </div>
              )}
            </div>
          </>
        )}

        <div className={styles.controls}>
          <ConvertButton
            onClick={resetTest}
            disabled={false}
            label={"🔄 Reset Test"}
          />

          <ConvertButton
            onClick={printResults}
            disabled={!testResults}
            label={"🖨️ Print Results"}
          />
        </div>

        {testResults && (
          <div className={styles.results}>
            <div className={styles.resultTitle}>
              {testResults.type === "visual"
                ? "👁️ Visual Acuity Results"
                : "🌈 Color Vision Results"}
            </div>
            <div className={styles.resultDetails}>
              <div>Score: {testResults.score.toFixed(1)}%</div>
              <div>{testResults.details}</div>
              <div style={{ marginTop: "15px", fontSize: "0.9rem" }}>
                {testResults.score >= VISION_THRESHOLDS.EXCELLENT
                  ? TEST_MESSAGES.RESULTS.EXCELLENT
                  : testResults.score >= VISION_THRESHOLDS.GOOD
                  ? TEST_MESSAGES.RESULTS.GOOD
                  : testResults.score >= VISION_THRESHOLDS.MODERATE
                  ? TEST_MESSAGES.RESULTS.MODERATE
                  : TEST_MESSAGES.RESULTS.POOR}
              </div>
            </div>
          </div>
        )}

        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>⚠️ Important Disclaimer</h3>

          <p className={homeStyle.normalText}>
            {`This is a basic vision screening tool and should not replace
            professional eye examinations. For accurate diagnosis and treatment,
            please consult a qualified eye care professional.`}
          </p>
        </section>
      </main>
    </div>
  );
}

export default EyeSightTest;

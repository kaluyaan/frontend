
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function ColorBlindnessTest() {
  const [currentTest, setCurrentTest] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  const colorTests = [
    { colors: ['#FF0000', '#00FF00'], correct: 0, number: '12' },
    { colors: ['#0000FF', '#FFFF00'], correct: 1, number: '8' },
    { colors: ['#FF00FF', '#00FFFF'], correct: 0, number: '29' },
    { colors: ['#FFA500', '#800080'], correct: 1, number: '5' },
    { colors: ['#008000', '#FF0000'], correct: 0, number: '74' }
  ];

  const handleAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === colorTests[currentTest].correct;
    const newResults = [...results, isCorrect];
    setResults(newResults);

    if (currentTest < colorTests.length - 1) {
      setCurrentTest(currentTest + 1);
    } else {
      setTestComplete(true);
    }
  };

  const resetTest = () => {
    setCurrentTest(0);
    setResults([]);
    setTestComplete(false);
  };

  const getScore = () => {
    const correct = results.filter(r => r).length;
    return (correct / colorTests.length) * 100;
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/vision-tests/color-blindness" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>🌈 Color Blindness Test</h1>
        <p className={styles.subtitle}>Advanced color vision deficiency screening</p>

        {!testComplete ? (
          <>
            <div className={styles.instructions}>
              <div className={styles.instructionTitle}>Test Instructions:</div>
              <div className={styles.instructionText}>
                Look at the color pattern and identify the hidden number. Click on the color that contains the number.
              </div>
            </div>

            <div className={styles.testArea}>
              <h3>Test {currentTest + 1} of {colorTests.length}</h3>
              <div style={{ fontSize: '3rem', margin: '20px 0', color: colorTests[currentTest].colors[colorTests[currentTest].correct] }}>
                Can you see: {colorTests[currentTest].number}
              </div>
              <div className={styles.optionsGrid}>
                {colorTests[currentTest].colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswer(index)}
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: color,
                      borderRadius: '10px',
                      cursor: 'pointer',
                      border: '3px solid #333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: index === colorTests[currentTest].correct ? 'white' : 'transparent'
                    }}
                  >
                    {index === colorTests[currentTest].correct ? colorTests[currentTest].number : '?'}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Color Vision Results</div>
            <div className={styles.resultValue}>{getScore().toFixed(1)}%</div>
            <div className={styles.resultDetails}>
              <div>Correct: {results.filter(r => r).length}/{colorTests.length}</div>
              <div>{getScore() >= 80 ? '✅ Normal color vision' : '⚠️ Possible color vision deficiency'}</div>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={resetTest}>
            🔄 Reset Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColorBlindnessTest;


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function HearingTest() {
  const [testStarted, setTestStarted] = useState(false);
  const [currentFreq, setCurrentFreq] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  const frequencies = [250, 500, 1000, 2000, 4000, 8000];

  const startTest = () => {
    setTestStarted(true);
    setCurrentFreq(0);
    setResults([]);
    setTestComplete(false);
  };

  const handleResponse = (canHear: boolean) => {
    const newResults = [...results, canHear];
    setResults(newResults);

    if (currentFreq < frequencies.length - 1) {
      setCurrentFreq(currentFreq + 1);
    } else {
      setTestComplete(true);
    }
  };

  const getScore = () => {
    const heard = results.filter(r => r).length;
    return (heard / frequencies.length) * 100;
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/vision-tests/hearing-test" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>👂 Hearing Test</h1>
        <p className={styles.subtitle}>Audio frequency range and hearing acuity test</p>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>Test Instructions:</div>
          <div className={styles.instructionText}>
            Use headphones for best results. Listen carefully and indicate if you can hear each tone.
          </div>
        </div>

        {!testStarted ? (
          <div className={styles.testArea}>
            <h3>Ready to test your hearing?</h3>
            <button className={styles.button} onClick={startTest}>
              Start Hearing Test
            </button>
          </div>
        ) : !testComplete ? (
          <div className={styles.testArea}>
            <h3>Frequency: {frequencies[currentFreq]} Hz</h3>
            <div className={styles.scoreDisplay}>
              Test {currentFreq + 1} of {frequencies.length}
            </div>
            <div style={{ margin: '30px 0' }}>
              <div>🔊 Playing tone...</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
                (Simulated - real test would play audio)
              </div>
            </div>
            <div className={styles.controls}>
              <button className={styles.controlButton} onClick={() => handleResponse(true)}>
                ✅ I can hear it
              </button>
              <button className={styles.controlButton} onClick={() => handleResponse(false)}>
                ❌ I cannot hear it
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Hearing Test Results</div>
            <div className={styles.resultValue}>{getScore().toFixed(1)}%</div>
            <div className={styles.resultDetails}>
              <div>Frequencies heard: {results.filter(r => r).length}/{frequencies.length}</div>
              <div>{getScore() >= 80 ? '✅ Normal hearing range' : '⚠️ Consider professional hearing test'}</div>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={startTest}>
            🔄 Restart Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default HearingTest;
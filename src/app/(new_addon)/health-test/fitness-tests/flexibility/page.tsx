'use client';

import { useState } from 'react';
import { FlexibilityResult } from '../../types';
import { COMPANY_INFO } from '../../constants';
import Navigation from '../../Navigation';
import styles from '../../shared.module.css';

export default function FlexibilityTest() {
  const [currentTest, setCurrentTest] = useState<'sit-reach' | 'shoulder' | 'results'>('sit-reach');
  const [sitAndReach, setSitAndReach] = useState<number>(0);
  const [shoulderFlexibility, setShoulderFlexibility] = useState<number>(0);
  const [result, setResult] = useState<FlexibilityResult | null>(null);

  const calculateFlexibility = () => {
    const overallScore = (sitAndReach + shoulderFlexibility) / 2;
    let category = '';
    
    if (overallScore >= 85) category = 'Excellent';
    else if (overallScore >= 70) category = 'Good';
    else if (overallScore >= 55) category = 'Fair';
    else category = 'Needs Improvement';

    const flexResult: FlexibilityResult = {
      sitAndReach,
      shoulderFlexibility,
      overallScore,
      category
    };

    setResult(flexResult);
    setCurrentTest('results');
  };

  const printResults = () => {
    window.print();
  };

  const resetTest = () => {
    setCurrentTest('sit-reach');
    setSitAndReach(0);
    setShoulderFlexibility(0);
    setResult(null);
  };

  return (
    <div className={styles.container}>
      <Navigation currentPath="/health-test/health-assessments/symptom-checker"/>
      
      <div className={styles.header}>
        <h1 className={styles.title}>🤸 Flexibility Test</h1>
        <p className={styles.subtitle}>Assess your body flexibility and mobility</p>
      </div>

      {currentTest === 'sit-reach' && (
        <div className={styles.testSection}>
          <h2>Sit and Reach Test</h2>
          <div className={styles.instructions}>
            <p>1. Sit with legs straight, feet against a wall</p>
            <p>2. Reach forward as far as possible</p>
            <p>3. Measure distance reached (cm)</p>
          </div>
          <div className={styles.inputGroup}>
            <label>Distance reached (cm):</label>
            <input
              type="number"
              value={sitAndReach}
              onChange={(e) => setSitAndReach(Number(e.target.value))}
              className={styles.input}
            />
          </div>
          <button 
            onClick={() => setCurrentTest('shoulder')}
            className={styles.button}
            disabled={sitAndReach <= 0}
          >
            Next Test
          </button>
        </div>
      )}

      {currentTest === 'shoulder' && (
        <div className={styles.testSection}>
          <h2>Shoulder Flexibility Test</h2>
          <div className={styles.instructions}>
            <p>1. Reach one arm over shoulder, other behind back</p>
            <p>2. Try to touch fingers together</p>
            <p>3. Measure gap or overlap (cm)</p>
          </div>
          <div className={styles.inputGroup}>
            <label>Gap/Overlap (cm, negative if gap):</label>
            <input
              type="number"
              value={shoulderFlexibility}
              onChange={(e) => setShoulderFlexibility(Number(e.target.value))}
              className={styles.input}
            />
          </div>
          <button 
            onClick={calculateFlexibility}
            className={styles.button}
          >
            Calculate Results
          </button>
        </div>
      )}

      {currentTest === 'results' && result && (
        <div className={styles.results}>
          <h2>Flexibility Test Results</h2>
          <div className={styles.resultCard}>
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreValue}>{result.overallScore.toFixed(1)}</span>
              <span className={styles.scoreLabel}>Overall Score</span>
            </div>
            <div className={styles.category}>Category: {result.category}</div>
            
            <div className={styles.breakdown}>
              <div>Sit & Reach: {result.sitAndReach} cm</div>
              <div>Shoulder Flexibility: {result.shoulderFlexibility} cm</div>
            </div>

            <div className={styles.recommendation}>
              <h3>Recommendations:</h3>
              <p>
                {result.category === 'Excellent' && 'Maintain your flexibility with regular stretching.'}
                {result.category === 'Good' && 'Continue stretching routine to maintain flexibility.'}
                {result.category === 'Fair' && 'Increase stretching frequency and duration.'}
                {result.category === 'Needs Improvement' && 'Start daily stretching routine and consider yoga.'}
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={printResults} className={styles.button}>Print Results</button>
            <button onClick={resetTest} className={styles.secondaryButton}>Test Again</button>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <p className={styles.company}>{COMPANY_INFO.name}</p>
        <p className={styles.disclaimer}>{COMPANY_INFO.disclaimer}</p>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { BalanceResult } from '../../types';
import { COMPANY_INFO } from '../../constants';
import Navigation from '../../Navigation';
import styles from '../../shared.module.css';

export default function BalanceTest() {
  const [currentTest, setCurrentTest] = useState<'single-leg' | 'eyes-closed' | 'results'>('single-leg');
  const [singleLegTime, setSingleLegTime] = useState<number>(0);
  const [eyesClosedTime, setEyesClosedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [result, setResult] = useState<BalanceResult | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setTimer(0);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (currentTest === 'single-leg') {
      setSingleLegTime(timer);
    } else if (currentTest === 'eyes-closed') {
      setEyesClosedTime(timer);
    }
  };

  const calculateBalance = () => {
    const singleLegScore = Math.min(singleLegTime * 10, 100);
    const eyesClosedScore = Math.min(eyesClosedTime * 15, 100);
    const overallScore = (singleLegScore + eyesClosedScore) / 2;
    
    let category = '';
    if (overallScore >= 85) category = 'Excellent';
    else if (overallScore >= 70) category = 'Good';
    else if (overallScore >= 55) category = 'Fair';
    else category = 'Needs Improvement';

    const balanceResult: BalanceResult = {
      singleLegStand: singleLegTime,
      eyesClosedBalance: eyesClosedTime,
      overallScore,
      category
    };

    setResult(balanceResult);
    setCurrentTest('results');
  };

  const printResults = () => {
    window.print();
  };

  const resetTest = () => {
    setCurrentTest('single-leg');
    setSingleLegTime(0);
    setEyesClosedTime(0);
    setTimer(0);
    setIsRunning(false);
    setResult(null);
  };

  return (
    <div className={styles.container}>
      <Navigation currentPath="/health-test/health-assessments/symptom-checker"/>
      
      <div className={styles.header}>
        <h1 className={styles.title}>⚖️ Balance Test</h1>
        <p className={styles.subtitle}>Test your balance and stability</p>
      </div>

      {currentTest === 'single-leg' && (
        <div className={styles.testSection}>
          <h2>Single Leg Stand Test</h2>
          <div className={styles.instructions}>
            <p>1. Stand on one leg with hands on hips</p>
            <p>2. Keep your eyes open and look straight ahead</p>
            <p>3. Time how long you can maintain balance</p>
            <p>4. Stop when you put your foot down or move your hands</p>
          </div>
          
          <div className={styles.timerDisplay}>
            <div className={styles.timer}>{timer.toFixed(1)}s</div>
          </div>

          <div className={styles.timerControls}>
            {!isRunning ? (
              <button onClick={startTimer} className={styles.button}>
                Start Timer
              </button>
            ) : (
              <button onClick={stopTimer} className={styles.button}>
                Stop Timer
              </button>
            )}
          </div>

          {singleLegTime > 0 && (
            <div className={styles.result}>
              <p>Single Leg Stand Time: {singleLegTime.toFixed(1)} seconds</p>
              <button 
                onClick={() => setCurrentTest('eyes-closed')}
                className={styles.button}
              >
                Next Test
              </button>
            </div>
          )}
        </div>
      )}

      {currentTest === 'eyes-closed' && (
        <div className={styles.testSection}>
          <h2>Eyes Closed Balance Test</h2>
          <div className={styles.instructions}>
            <p>1. Stand with feet together, hands on hips</p>
            <p>2. Close your eyes</p>
            <p>3. Time how long you can maintain balance</p>
            <p>4. Stop when you sway significantly or open eyes</p>
          </div>
          
          <div className={styles.timerDisplay}>
            <div className={styles.timer}>{timer.toFixed(1)}s</div>
          </div>

          <div className={styles.timerControls}>
            {!isRunning ? (
              <button onClick={startTimer} className={styles.button}>
                Start Timer
              </button>
            ) : (
              <button onClick={stopTimer} className={styles.button}>
                Stop Timer
              </button>
            )}
          </div>

          {eyesClosedTime > 0 && (
            <div className={styles.result}>
              <p>Eyes Closed Balance Time: {eyesClosedTime.toFixed(1)} seconds</p>
              <button 
                onClick={calculateBalance}
                className={styles.button}
              >
                Calculate Results
              </button>
            </div>
          )}
        </div>
      )}

      {currentTest === 'results' && result && (
        <div className={styles.results}>
          <h2>Balance Test Results</h2>
          <div className={styles.resultCard}>
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreValue}>{result.overallScore.toFixed(1)}</span>
              <span className={styles.scoreLabel}>Balance Score</span>
            </div>
            <div className={styles.category}>Category: {result.category}</div>
            
            <div className={styles.breakdown}>
              <div>Single Leg Stand: {result.singleLegStand.toFixed(1)}s</div>
              <div>Eyes Closed Balance: {result.eyesClosedBalance.toFixed(1)}s</div>
            </div>

            <div className={styles.recommendation}>
              <h3>Recommendations:</h3>
              <p>
                {result.category === 'Excellent' && 'Outstanding balance! Continue with balance exercises.'}
                {result.category === 'Good' && 'Good balance. Practice yoga or tai chi to improve further.'}
                {result.category === 'Fair' && 'Practice balance exercises daily to improve stability.'}
                {result.category === 'Needs Improvement' && 'Start with basic balance exercises and consider physical therapy.'}
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

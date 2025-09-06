'use client';

import { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../../constants';
import Navigation from '../../Navigation';
import styles from '../../shared.module.css';

export default function AttentionSpanTest() {
  const [phase, setPhase] = useState<'instructions' | 'test' | 'results'>('instructions');
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [targetNumber, setTargetNumber] = useState<number>(7);
  const [correctClicks, setCorrectClicks] = useState<number>(0);
  const [totalNumbers, setTotalNumbers] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [result, setResult] = useState<{
    accuracy: number;
    totalClicks: number;
    correctClicks: number;
    category: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'test' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setCurrentNumber(Math.floor(Math.random() * 10));
        setTotalNumbers(prev => prev + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      calculateResults();
    }
    return () => clearInterval(interval);
  }, [phase, timeLeft]);

  const startTest = () => {
    setPhase('test');
    setCurrentNumber(Math.floor(Math.random() * 10));
    setCorrectClicks(0);
    setTotalNumbers(0);
    setTimeLeft(60);
  };

  const handleNumberClick = () => {
    if (currentNumber === targetNumber) {
      setCorrectClicks(prev => prev + 1);
    }
  };

  const calculateResults = () => {
    const accuracy = totalNumbers > 0 ? (correctClicks / totalNumbers) * 100 : 0;
    let category = '';
    let color = '';

    if (accuracy >= 90) { category = 'Excellent'; color = '#4CAF50'; }
    else if (accuracy >= 75) { category = 'Good'; color = '#2196F3'; }
    else if (accuracy >= 60) { category = 'Fair'; color = '#FF9800'; }
    else { category = 'Needs Practice'; color = '#F44336'; }

    setResult({
      accuracy: Math.round(accuracy),
      totalClicks: totalNumbers,
      correctClicks,
      category,
      color
    });
    setPhase('results');
  };

  const resetTest = () => {
    setPhase('instructions');
    setResult(null);
  };

  return (
    <div className={styles.container}>
      <Navigation currentPath=''/>
      
      <div className={styles.header}>
        <h1 className={styles.title}>🎯 Attention Span Test</h1>
        <p className={styles.subtitle}>Focus and concentration assessment</p>
      </div>

      {phase === 'instructions' && (
        <div className={styles.testSection}>
          <div className={styles.instructions}>
            <h3>Instructions:</h3>
            <p>• Numbers will appear on screen every second</p>
            <p>• Click when you see the number <strong>{targetNumber}</strong></p>
            <p>• Test duration: 60 seconds</p>
            <p>• Stay focused and click only on {targetNumber}</p>
          </div>
          <button onClick={startTest} className={styles.button}>
            Start Test
          </button>
        </div>
      )}

      {phase === 'test' && (
        <div className={styles.testSection}>
          <div className={styles.timer}>Time: {timeLeft}s</div>
          <div className={styles.targetDisplay}>
            Target Number: <span className={styles.targetNumber}>{targetNumber}</span>
          </div>
          <div 
            className={styles.numberDisplay}
            onClick={handleNumberClick}
          >
            {currentNumber}
          </div>
          <div className={styles.stats}>
            <div>Correct: {correctClicks}</div>
            <div>Total: {totalNumbers}</div>
          </div>
        </div>
      )}

      {phase === 'results' && result && (
        <div className={styles.results}>
          <h2>Attention Test Results</h2>
          <div className={styles.resultCard}>
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreValue}>{result.accuracy}%</span>
              <span className={styles.scoreLabel}>Accuracy</span>
            </div>
            <div className={styles.category} style={{ color: result.color }}>
              {result.category}
            </div>
            
            <div className={styles.breakdown}>
              <div>Correct Clicks: {result.correctClicks}</div>
              <div>Total Numbers: {result.totalClicks}</div>
            </div>

            <div className={styles.recommendation}>
              <h3>Recommendations:</h3>
              <p>
                {result.category === 'Excellent' && 'Outstanding focus! Continue mental exercises.'}
                {result.category === 'Good' && 'Good attention span. Practice mindfulness to improve.'}
                {result.category === 'Fair' && 'Practice concentration exercises daily.'}
                {result.category === 'Needs Practice' && 'Try meditation and reduce distractions.'}
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <button onClick={() => window.print()} className={styles.button}>Print Results</button>
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
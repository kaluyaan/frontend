'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function ReactionTimeTest() {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'click' | 'result'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);

  const maxAttempts = 5;

  const startTest = () => {
    setGameState('ready');
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    
    setTimeout(() => {
      setStartTime(Date.now());
      setGameState('click');
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'click') {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      
      const newAttempts = [...attempts, reaction];
      setAttempts(newAttempts);
      setCurrentAttempt(currentAttempt + 1);
      
      if (currentAttempt + 1 >= maxAttempts) {
        setGameState('result');
      } else {
        setGameState('waiting');
      }
    } else if (gameState === 'ready') {
      // Too early click
      setGameState('waiting');
      alert('Too early! Wait for the green screen.');
    }
  };

  const resetTest = () => {
    setGameState('waiting');
    setAttempts([]);
    setCurrentAttempt(0);
    setReactionTime(0);
  };

  const getAverageTime = () => {
    if (attempts.length === 0) return 0;
    return attempts.reduce((sum, time) => sum + time, 0) / attempts.length;
  };

  const getPerformanceRating = (avgTime: number) => {
    if (avgTime < 200) return { rating: 'Excellent', color: '#4CAF50' };
    if (avgTime < 300) return { rating: 'Good', color: '#2196F3' };
    if (avgTime < 400) return { rating: 'Average', color: '#FF9800' };
    return { rating: 'Needs Practice', color: '#F44336' };
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/cognitive-tests/reaction-time" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>⚡ Reaction Time Test</h1>
        <p className={styles.subtitle}>Measure your response time and reflexes</p>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>Test Instructions:</div>
          <div className={styles.instructionText}>
            Click the area as soon as it turns green. You'll complete 5 attempts for an accurate average.
          </div>
        </div>

        <div className={styles.scoreDisplay}>
          Attempt: {currentAttempt + 1} / {maxAttempts}
        </div>

        <div 
          className={styles.testArea}
          onClick={handleClick}
          style={{
            backgroundColor: 
              gameState === 'waiting' ? '#f8f9fa' :
              gameState === 'ready' ? '#ff6b6b' :
              gameState === 'click' ? '#4CAF50' : '#f8f9fa',
            cursor: 'pointer',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: gameState === 'click' || gameState === 'ready' ? 'white' : '#333'
          }}
        >
          {gameState === 'waiting' && 'Click "Start Test" to begin'}
          {gameState === 'ready' && 'Wait for GREEN...'}
          {gameState === 'click' && 'CLICK NOW!'}
          {gameState === 'result' && `Test Complete!`}
        </div>

        {gameState === 'waiting' && currentAttempt === 0 && (
          <button className={styles.button} onClick={startTest}>
            Start Test
          </button>
        )}

        {gameState === 'waiting' && currentAttempt > 0 && currentAttempt < maxAttempts && (
          <button className={styles.button} onClick={startTest}>
            Next Attempt ({currentAttempt}/{maxAttempts})
          </button>
        )}

        {reactionTime > 0 && gameState !== 'result' && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div className={styles.scoreDisplay}>
              Last Reaction Time: {reactionTime}ms
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Reaction Time Results</div>
            <div className={styles.resultValue}>{Math.round(getAverageTime())}ms</div>
            <div className={styles.resultDetails}>
              <div>Average of {attempts.length} attempts</div>
              <div>Best: {Math.min(...attempts)}ms</div>
              <div style={{ color: getPerformanceRating(getAverageTime()).color }}>
                {getPerformanceRating(getAverageTime()).rating}
              </div>
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

export default ReactionTimeTest;
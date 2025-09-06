'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function MemoryTest() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showSequence, setShowSequence] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  const generateSequence = (length: number) => {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * 6));
    }
    return newSequence;
  };

  const startGame = () => {
    const newSequence = generateSequence(3);
    setSequence(newSequence);
    setUserSequence([]);
    setShowSequence(true);
    setGameStarted(true);
    setScore(0);
    setLevel(1);
    setGameOver(false);

    setTimeout(() => {
      setShowSequence(false);
    }, 2000);
  };

  const handleColorClick = (colorIndex: number) => {
    if (showSequence || gameOver) return;

    const newUserSequence = [...userSequence, colorIndex];
    setUserSequence(newUserSequence);

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setGameOver(true);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      setScore(score + 1);
      setLevel(level + 1);
      
      setTimeout(() => {
        const nextSequence = generateSequence(3 + level);
        setSequence(nextSequence);
        setUserSequence([]);
        setShowSequence(true);
        
        setTimeout(() => {
          setShowSequence(false);
        }, 2000 + level * 200);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/cognitive-tests/memory-test" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>🧠 Memory Test</h1>
        <p className={styles.subtitle}>Short-term and working memory assessment</p>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>Test Instructions:</div>
          <div className={styles.instructionText}>
            Watch the sequence of colors, then repeat it by clicking the colors in the same order.
          </div>
        </div>

        {!gameStarted ? (
          <div className={styles.testArea}>
            <h3>Ready to test your memory?</h3>
            <button className={styles.button} onClick={startGame}>
              Start Memory Test
            </button>
          </div>
        ) : (
          <div className={styles.gameArea}>
            <div className={styles.scoreDisplay}>
              Level: {level} | Score: {score}
            </div>
            
            {showSequence && (
              <div style={{ fontSize: '1.2rem', color: '#667eea', marginBottom: '20px' }}>
                Watch the sequence...
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleColorClick(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: color,
                    borderRadius: '10px',
                    cursor: showSequence ? 'default' : 'pointer',
                    border: showSequence && sequence.includes(index) ? '4px solid #333' : '2px solid #ddd',
                    opacity: showSequence && !sequence.includes(index) ? 0.3 : 1,
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {gameOver && (
              <div className={styles.resultCard}>
                <div className={styles.resultTitle}>Memory Test Complete</div>
                <div className={styles.resultValue}>Level {level}</div>
                <div className={styles.resultDetails}>
                  <div>Score: {score}</div>
                  <div>{score >= 5 ? '✅ Excellent memory' : score >= 3 ? '✅ Good memory' : '⚠️ Practice recommended'}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={startGame}>
            🔄 Restart Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemoryTest;


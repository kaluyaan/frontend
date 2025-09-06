'use client';

import { useState } from 'react';
import { COMPANY_INFO, LOVE_QUOTES } from '../../constants';
import Navigation from '../../Navigation';
import styles from '../../shared.module.css';

export default function LoveCalculator() {
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [birthDate1, setBirthDate1] = useState<string>('');
  const [birthDate2, setBirthDate2] = useState<string>('');
  const [result, setResult] = useState<{
    percentage: number;
    category: string;
    description: string;
    advice: string[];
    color: string;
  } | null>(null);

  const calculateLove = () => {
    if (!name1 || !name2) return;

    // Love calculation algorithm based on names and dates
    const nameScore = calculateNameCompatibility(name1, name2);
    const dateScore = birthDate1 && birthDate2 ? calculateDateCompatibility(birthDate1, birthDate2) : 50;
    
    const percentage = Math.round((nameScore + dateScore) / 2);
    const loveResult = getLoveResult(percentage);

    setResult({
      percentage,
      category: loveResult.category,
      description: loveResult.description,
      advice: loveResult.advice,
      color: loveResult.color
    });
  };

  const calculateNameCompatibility = (n1: string, n2: string): number => {
    const combined = (n1 + n2).toLowerCase().replace(/\s/g, '');
    let score = 0;
    
    // Count matching letters
    const letters1 = n1.toLowerCase().split('');
    const letters2 = n2.toLowerCase().split('');
    
    letters1.forEach(letter => {
      if (letters2.includes(letter)) score += 10;
    });

    // Add randomness based on name lengths
    score += (combined.length % 10) * 5;
    score += Math.abs(n1.length - n2.length) * 3;
    
    return Math.min(Math.max(score % 100, 20), 98);
  };

  const calculateDateCompatibility = (date1: string, date2: string): number => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    const dayDiff = Math.abs(d1.getDate() - d2.getDate());
    const monthDiff = Math.abs(d1.getMonth() - d2.getMonth());
    
    let score = 50;
    score += (12 - monthDiff) * 3;
    score += (31 - dayDiff) * 2;
    
    return Math.min(Math.max(score, 25), 95);
  };

  const getLoveResult = (percentage: number) => {
    if (percentage >= 90) {
      return {
        category: 'Perfect Match! 💕',
        description: 'You two are absolutely meant for each other! This is true love.',
        color: '#ff1744',
        advice: [
          'You have found your soulmate',
          'Cherish this beautiful connection',
          'Plan your future together',
          'Never let each other go'
        ]
      };
    } else if (percentage >= 75) {
      return {
        category: 'Excellent Love! 💖',
        description: 'Your love is strong and beautiful. You complement each other perfectly.',
        color: '#e91e63',
        advice: [
          'Your relationship has great potential',
          'Keep communicating openly',
          'Support each other\'s dreams',
          'Create beautiful memories together'
        ]
      };
    } else if (percentage >= 60) {
      return {
        category: 'Good Compatibility 💗',
        description: 'You have a solid foundation for love. Work together to strengthen your bond.',
        color: '#ff6b9d',
        advice: [
          'Focus on understanding each other',
          'Spend quality time together',
          'Be patient and kind',
          'Build trust and intimacy'
        ]
      };
    } else if (percentage >= 40) {
      return {
        category: 'Potential Love 💓',
        description: 'There\'s potential here, but you\'ll need to work on your connection.',
        color: '#ff9800',
        advice: [
          'Get to know each other better',
          'Find common interests',
          'Be open to compromise',
          'Give love time to grow'
        ]
      };
    } else {
      return {
        category: 'Friendship Zone 💛',
        description: 'You might be better as friends, but love can surprise us!',
        color: '#ffc107',
        advice: [
          'Focus on building friendship first',
          'Don\'t force romantic feelings',
          'Appreciate what you have',
          'Sometimes friendship is more valuable'
        ]
      };
    }
  };

  const resetCalculator = () => {
    setName1('');
    setName2('');
    setBirthDate1('');
    setBirthDate2('');
    setResult(null);
  };

  const printResults = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <Navigation currentPath="/love-calculator/love-tests/love-calculator" />
      
      <div className={styles.header}>
        <h1 className={styles.title}>💕 Love Calculator</h1>
        <p className={styles.subtitle}>Calculate love compatibility percentage between two people</p>
      </div>

      <div className={styles.testSection}>
        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>How it works:</div>
          <div className={styles.instructionText}>
            Enter both names and optionally birth dates to calculate your love compatibility percentage. 
            Our algorithm analyzes name harmony and astrological compatibility.
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>First Person's Name:</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className={styles.input}
              placeholder="Enter first name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Second Person's Name:</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className={styles.input}
              placeholder="Enter second name"
            />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>First Person's Birth Date (Optional):</label>
            <input
              type="date"
              value={birthDate1}
              onChange={(e) => setBirthDate1(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Second Person's Birth Date (Optional):</label>
            <input
              type="date"
              value={birthDate2}
              onChange={(e) => setBirthDate2(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <button 
          onClick={calculateLove}
          className={styles.button}
          disabled={!name1 || !name2}
        >
          Calculate Love Compatibility 💖
        </button>

        {result && (
          <div className={styles.results}>
            <h2>Love Compatibility Results</h2>
            <div className={styles.resultCard}>
              <div className={styles.scoreDisplay}>
                <span className={styles.scoreValue} style={{ color: result.color }}>
                  {result.percentage}%
                </span>
                <span className={styles.scoreLabel}>Love Compatibility</span>
              </div>
              <div className={styles.category} style={{ color: result.color }}>
                {result.category}
              </div>
              
              <div className={styles.breakdown}>
                <div><strong>{name1}</strong> ❤️ <strong>{name2}</strong></div>
                <div>{result.description}</div>
              </div>

              <div className={styles.recommendation}>
                <h3>Love Advice:</h3>
                <ul>
                  {result.advice.map((advice, index) => (
                    <li key={index}>{advice}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={printResults} className={styles.button}>Print Results</button>
              <button onClick={resetCalculator} className={styles.secondaryButton}>Calculate Again</button>
            </div>
          </div>
        )}

        <div className={styles.loveQuote}>
          "{LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)]}"
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.company}>{COMPANY_INFO.name}</p>
        <p className={styles.disclaimer}>{COMPANY_INFO.disclaimer}</p>
      </div>
    </div>
  );
}

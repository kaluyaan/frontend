
'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { LOVE_CATEGORIES, COMPANY_INFO, LOVE_QUOTES } from './constants';

function LoveCalculatorHub() {
  const totalCalculators = LOVE_CATEGORIES.reduce((sum, category) => sum + category.calculators.length, 0);
  const avgDuration = '3-7 min';
  const categories = LOVE_CATEGORIES.length;
  const randomQuote = LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)];

  return (
    <div className={styles.container}>
      <div className={styles.loveHub}>
        <div className={styles.header}>
          <div className={styles.companyName}>{COMPANY_INFO.name}</div>
          <h1 className={styles.title}>💕 Love Calculator Suite</h1>
          <p className={styles.subtitle}>{COMPANY_INFO.tagline}</p>
        </div>

        <div className={styles.loveQuote}>
          "{randomQuote}"
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statsTitle}>Discover Your Love Story</div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{totalCalculators}</span>
              <span className={styles.statLabel}>Love Calculators</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{categories}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{avgDuration}</span>
              <span className={styles.statLabel}>Avg Duration</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>💖</span>
              <span className={styles.statLabel}>Fun & Romantic</span>
            </div>
          </div>
        </div>

        {LOVE_CATEGORIES.map((category, categoryIndex) => (
          <div key={categoryIndex} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.name}</h2>
            <div className={styles.calculatorsGrid}>
              {category.calculators.map((calculator, calcIndex) => (
                <Link key={calcIndex} href={calculator.path} style={{ textDecoration: 'none' }}>
                  <div className={styles.calculatorCard}>
                    <div className={styles.calculatorIcon}>{calculator.icon}</div>
                    <h3 className={styles.calculatorTitle}>{calculator.title}</h3>
                    <p className={styles.calculatorDescription}>{calculator.description}</p>
                    <div className={styles.calculatorMeta}>
                      <span className={styles.duration}>⏱️ {calculator.duration}</span>
                      <span className={`${styles.difficulty} ${
                        calculator.difficulty === 'Easy' ? styles.difficultyEasy :
                        calculator.difficulty === 'Medium' ? styles.difficultyMedium :
                        styles.difficultyHard
                      }`}>
                        {calculator.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.disclaimer}>
          <div className={styles.disclaimerTitle}>
            💝 Love Disclaimer
          </div>
          <div className={styles.disclaimerText}>
            {COMPANY_INFO.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoveCalculatorHub;

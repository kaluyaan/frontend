'use client';

import React from 'react';
import Link from 'next/link';
import styles from './shared.module.css';
import { CATEGORIES, COMPANY_INFO } from './constants';

function FunHub() {
  const totalCalculators = CATEGORIES.reduce((sum, category) => sum + category.calculators.length, 0);

  return (
    <div className={styles.container}>
      <div className={styles.hub}>
        <div className={styles.header}>
          <div className={styles.companyName}>{COMPANY_INFO.name}</div>
          <h1 className={styles.title}>🎉 Fun & Entertainment</h1>
          <p className={styles.subtitle}>{COMPANY_INFO.tagline}</p>
        </div>

        {CATEGORIES.map((category, categoryIndex) => (
          <div key={categoryIndex}>
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
          <div className={styles.disclaimerTitle}>🎭 Fun Disclaimer</div>
          <div className={styles.disclaimerText}>{COMPANY_INFO.disclaimer}</div>
        </div>
      </div>
    </div>
  );
}

export default FunHub;

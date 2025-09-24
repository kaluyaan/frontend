'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { HEALTH_CATEGORIES, COMPANY_INFO } from './constants';

function HealthTestHub() {
  const totalTests = HEALTH_CATEGORIES.reduce((sum, category) => sum + category.tests.length, 0);
  const avgDuration = '5-10 min';
  const categories = HEALTH_CATEGORIES.length;

  return (
    <div className={styles.container}>
      <div className={styles.healthHub}>
        <div className={styles.header}>
          <div className={styles.companyName}>{COMPANY_INFO.name}</div>
          <h1 className={styles.title}>🏥 Health Test Suite</h1>
          <p className={styles.subtitle}>{COMPANY_INFO.tagline}</p>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statsTitle}>Comprehensive Health Screening</div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{totalTests}</span>
              <span className={styles.statLabel}>Total Tests</span>
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
              <span className={styles.statNumber}>📱</span>
              <span className={styles.statLabel}>Mobile Ready</span>
            </div>
          </div>
        </div>

        {HEALTH_CATEGORIES.map((category, categoryIndex) => (
          <div key={categoryIndex} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.name}</h2>
            <div className={styles.testsGrid}>
              {category.tests.map((test, testIndex) => (
                <Link key={testIndex} href={test.path} style={{ textDecoration: 'none' }}>
                  <div className={styles.testCard}>
                    <div className={styles.testIcon}>{test.icon}</div>
                    <h3 className={styles.testTitle}>{test.title}</h3>
                    <p className={styles.testDescription}>{test.description}</p>
                    <div className={styles.testMeta}>
                      <span className={styles.duration}>⏱️ {test.duration}</span>
                      <span className={`${styles.difficulty} ${
                        test.difficulty === 'Easy' ? styles.difficultyEasy :
                        test.difficulty === 'Medium' ? styles.difficultyMedium :
                        styles.difficultyHard
                      }`}>
                        {test.difficulty}
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
            ⚠️ Medical Disclaimer
          </div>
          <div className={styles.disclaimerText}>
            {COMPANY_INFO.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthTestHub;
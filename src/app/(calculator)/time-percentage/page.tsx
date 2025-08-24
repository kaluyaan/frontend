
'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';

interface DateProgressResult {
  percentage: string;           // e.g. "45.67" (% elapsed)
  remainingPercentage: string;  // e.g. "54.33" (% remaining)
  totalDays: number;
  elapsedDays: number;
  remainingDays: number;
  startFormatted: string;       // "August 10th, 2023"
  endFormatted: string;         // "August 23rd, 2025"
  currentFormatted: string;     // "August 23rd, 2024"
  isComplete: boolean;          // true if current > end
  isBeforeStart: boolean;       // true if current < start
}


function TimePercentageCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const [result, setResult] = useState<DateProgressResult | null>(null);
  const [error, setError] = useState('');

  const calculatePercentage = () => {
    if (!startDate || !endDate) {
      setError('Please enter both start and end dates');
      return;
    }

    const start = moment(startDate);
    const end = moment(endDate);
    const current = moment(currentDate);

    if (!start.isValid() || !end.isValid() || !current.isValid()) {
      setError('Please enter valid dates');
      return;
    }

    if (start.isAfter(end)) {
      setError('End date must be after start date');
      return;
    }

    const totalDuration = end.diff(start);
    const elapsedDuration = current.diff(start);
    // const remainingDuration = end.diff(current);

    const percentage = (elapsedDuration / totalDuration) * 100;
    const remainingPercentage = 100 - percentage;

    const totalDays = end.diff(start, 'days');
    const elapsedDays = current.diff(start, 'days');
    const remainingDays = end.diff(current, 'days');

    setResult({
      percentage: Math.max(0, Math.min(100, percentage)).toFixed(2),
      remainingPercentage: Math.max(0, Math.min(100, remainingPercentage)).toFixed(2),
      totalDays,
      elapsedDays: Math.max(0, elapsedDays),
      remainingDays: Math.max(0, remainingDays),
      startFormatted: start.format('MMMM Do, YYYY'),
      endFormatted: end.format('MMMM Do, YYYY'),
      currentFormatted: current.format('MMMM Do, YYYY'),
      isComplete: current.isAfter(end),
      isBeforeStart: current.isBefore(start)
    });
    setError('');
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/time-percentage" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Time Percentage Calculator</h1>
        <p className={styles.subtitle}>Calculate what percentage of time has passed between two dates</p>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Current Date (Reference Point):</label>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className={styles.input}
          />
        </div>

        <button onClick={calculatePercentage} className={styles.button}>
          Calculate Percentage
        </button>

        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>
              {result.isComplete ? 'Period Complete' : result.isBeforeStart ? 'Period Not Started' : 'Time Progress'}
            </div>
            <div className={styles.resultValue}>
              {result.percentage}% Complete
            </div>
            <div className={styles.resultDetails}>
              <div>From: {result.startFormatted}</div>
              <div>To: {result.endFormatted}</div>
              <div>Current: {result.currentFormatted}</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.percentage}%</span>
              <span className={styles.unitLabel}>Elapsed</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.remainingPercentage}%</span>
              <span className={styles.unitLabel}>Remaining</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.elapsedDays}</span>
              <span className={styles.unitLabel}>Days Passed</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.remainingDays}</span>
              <span className={styles.unitLabel}>Days Left</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalDays}</span>
              <span className={styles.unitLabel}>Total Days</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimePercentageCalculator;

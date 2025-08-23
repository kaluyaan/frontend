'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';

interface TimeOperationResult {
  originalTime: string;   // "HH:mm:ss"
  resultTime: string;     // "HH:mm:ss"
  operation: "Added" | "Subtracted";
  difference: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
}


function TimeCalculator() {
  const [operation, setOperation] = useState('add');
  const [baseTime, setBaseTime] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [result, setResult] = useState<TimeOperationResult | null>(null);
  const [error, setError] = useState('');

  const calculateTime = () => {
    if (!baseTime) {
      setError('Please enter a base time');
      return;
    }

    const base = moment(baseTime, 'HH:mm:ss');
    if (!base.isValid()) {
      setError('Please enter a valid time format (HH:MM:SS)');
      return;
    }

    const hoursToAdd = parseInt(hours) || 0;
    const minutesToAdd = parseInt(minutes) || 0;
    const secondsToAdd = parseInt(seconds) || 0;

    let resultTime;
    if (operation === 'add') {
      resultTime = base.clone()
        .add(hoursToAdd, 'hours')
        .add(minutesToAdd, 'minutes')
        .add(secondsToAdd, 'seconds');
    } else {
      resultTime = base.clone()
        .subtract(hoursToAdd, 'hours')
        .subtract(minutesToAdd, 'minutes')
        .subtract(secondsToAdd, 'seconds');
    }

    const totalSeconds = Math.abs(base.diff(resultTime, 'seconds'));
    const totalMinutes = Math.abs(base.diff(resultTime, 'minutes'));
    const totalHours = Math.abs(base.diff(resultTime, 'hours'));

    setResult({
      originalTime: base.format('HH:mm:ss'),
      resultTime: resultTime.format('HH:mm:ss'),
      operation: operation === 'add' ? 'Added' : 'Subtracted',
      difference: {
        hours: hoursToAdd,
        minutes: minutesToAdd,
        seconds: secondsToAdd
      },
      totalSeconds,
      totalMinutes,
      totalHours
    });
    setError('');
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/time-calculator" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Time Calculator</h1>
        <p className={styles.subtitle}>Add or subtract time intervals from a base time</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Base Time (HH:MM:SS):</label>
          <input
            type="time"
            step="1"
            value={baseTime}
            onChange={(e) => setBaseTime(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Operation:</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className={styles.input}
          >
            <option value="add">Add Time</option>
            <option value="subtract">Subtract Time</option>
          </select>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Hours:</label>
            <input
              type="number"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className={styles.input}
              placeholder="0"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Minutes:</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className={styles.input}
              placeholder="0"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Seconds:</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className={styles.input}
            placeholder="0"
          />
        </div>

        <button onClick={calculateTime} className={styles.button}>
          Calculate Time
        </button>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Calculation Result</div>
            <div className={styles.resultValue}>
              {result.resultTime}
            </div>
            <div className={styles.resultDetails}>
              <div>Original Time: {result.originalTime}</div>
              <div>{result.operation}: {result.difference.hours}h {result.difference.minutes}m {result.difference.seconds}s</div>
              <div>Result Time: {result.resultTime}</div>
            </div>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>Time Calculations</div>
          <div className={styles.infoText}>
            This calculator allows you to add or subtract hours, minutes, and seconds from a base time. 
            Perfect for calculating work hours, scheduling, or time zone conversions.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeCalculator;


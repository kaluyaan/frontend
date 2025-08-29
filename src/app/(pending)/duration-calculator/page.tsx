'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../../(calculator)/Navigation';

interface TimeCalculationResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  totalDays: number;
  businessHours: number; // If your `calculateBusinessHours` returns number, otherwise adjust
  isNegative: boolean;
  startFormatted: string;
  endFormatted: string;
  humanReadable: string;
}



function DurationCalculator() {
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [result, setResult] = useState<TimeCalculationResult | null>(null);
  const [error, setError] = useState('');

  const calculateDuration = () => {
    if (!startDateTime || !endDateTime) {
      setError('Please enter both start and end date/time');
      return;
    }

    const start = moment(startDateTime);
    const end = moment(endDateTime);

    if (!start.isValid() || !end.isValid()) {
      setError('Please enter valid date and time');
      return;
    }

    // const duration = moment.duration(end.diff(start));
    const isNegative = start.isAfter(end);
    
    const absDuration = moment.duration(Math.abs(end.diff(start)));
    
    const days = Math.floor(absDuration.asDays());
    const hours = absDuration.hours();
    const minutes = absDuration.minutes();
    const seconds = absDuration.seconds();

    const totalSeconds = Math.abs(end.diff(start, 'seconds'));
    const totalMinutes = Math.abs(end.diff(start, 'minutes'));
    const totalHours = Math.abs(end.diff(start, 'hours'));
    const totalDays = Math.abs(end.diff(start, 'days'));

    // Calculate business hours (9 AM to 5 PM, Monday to Friday)
    const businessHours = calculateBusinessHours(start, end);

    setResult({
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
      totalMinutes,
      totalHours,
      totalDays,
      businessHours,
      isNegative,
      startFormatted: start.format('MMMM Do, YYYY [at] h:mm:ss A'),
      endFormatted: end.format('MMMM Do, YYYY [at] h:mm:ss A'),
      humanReadable: absDuration.humanize()
    });
    setError('');
  };

  const calculateBusinessHours = (start: moment.Moment, end: moment.Moment) => {
    let businessHours = 0;
    const current = start.clone();
    
    while (current.isBefore(end)) {
      // Check if it's a weekday (Monday = 1, Friday = 5)
      if (current.day() >= 1 && current.day() <= 5) {
        const dayStart = current.clone().hour(9).minute(0).second(0);
        const dayEnd = current.clone().hour(17).minute(0).second(0);
        
        const periodStart = moment.max(current, dayStart);
        const periodEnd = moment.min(end, dayEnd);
        
        if (periodStart.isBefore(periodEnd)) {
          businessHours += periodEnd.diff(periodStart, 'hours', true);
        }
      }
      current.add(1, 'day').hour(0).minute(0).second(0);
    }
    
    return Math.round(businessHours * 100) / 100;
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/duration-calculator" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Duration Calculator</h1>
        <p className={styles.subtitle}>Calculate precise duration between two points in time</p>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Start Date & Time:</label>
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>End Date & Time:</label>
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <button onClick={calculateDuration} className={styles.button}>
          Calculate Duration
        </button>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>
              {result.isNegative ? 'Negative ' : ''}Duration
            </div>
            <div className={styles.resultValue}>
              {result.days}d {result.hours}h {result.minutes}m {result.seconds}s
            </div>
            <div className={styles.resultDetails}>
              <div>From: {result.startFormatted}</div>
              <div>To: {result.endFormatted}</div>
              <div>Human readable: {result.humanReadable}</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalDays.toLocaleString()}</span>
              <span className={styles.unitLabel}>Total Days</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalHours.toLocaleString()}</span>
              <span className={styles.unitLabel}>Total Hours</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalMinutes.toLocaleString()}</span>
              <span className={styles.unitLabel}>Total Minutes</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalSeconds.toLocaleString()}</span>
              <span className={styles.unitLabel}>Total Seconds</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.businessHours}</span>
              <span className={styles.unitLabel}>Business Hours</span>
            </div>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>Duration Calculations</div>
          <div className={styles.infoText}>
            This calculator measures the exact duration between two specific points in time, including date and time. 
            It also calculates business hours (9 AM - 5 PM, Monday-Friday) for work-related calculations.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DurationCalculator;

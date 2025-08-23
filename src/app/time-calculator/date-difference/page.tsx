'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';
interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  weekdays: number;
  weekends: number;
  isNegative: boolean;
  startFormatted: string;  // e.g. "August 10th, 2023"
  endFormatted: string;    // e.g. "August 23rd, 2025"
}

function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<DateDifferenceResult | null>(null);
  const [error, setError] = useState('');

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      setError('Please enter both start and end dates');
      return;
    }

    const start = moment(startDate);
    const end = moment(endDate);

    if (!start.isValid() || !end.isValid()) {
      setError('Please enter valid dates');
      return;
    }

    const isNegative = start.isAfter(end);
    const earlier = isNegative ? end : start;
    const later = isNegative ? start : end;

    const years = later.diff(earlier, 'years');
    const months = later.diff(earlier, 'months') % 12;
    const days = later.diff(earlier.clone().add(years, 'years').add(months, 'months'), 'days');

    const totalDays = Math.abs(end.diff(start, 'days'));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = Math.abs(end.diff(start, 'months'));
    const totalHours = Math.abs(end.diff(start, 'hours'));
    const totalMinutes = Math.abs(end.diff(start, 'minutes'));

    const weekdays = calculateWeekdays(earlier, later);
    const weekends = totalDays - weekdays;

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      weekdays,
      weekends,
      isNegative,
      startFormatted: start.format('MMMM Do, YYYY'),
      endFormatted: end.format('MMMM Do, YYYY')
    });
    setError('');
  };

  const calculateWeekdays = (start: moment.Moment, end: moment.Moment) => {
    let weekdays = 0;
    const current = start.clone();
    
    while (current.isBefore(end)) {
      if (current.day() !== 0 && current.day() !== 6) {
        weekdays++;
      }
      current.add(1, 'day');
    }
    
    return weekdays;
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/date-difference" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Date Difference Calculator</h1>
        <p className={styles.subtitle}>Calculate the difference between two dates</p>

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

        <button onClick={calculateDifference} className={styles.button}>
          Calculate Difference
        </button>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>
              {result.isNegative ? 'Negative ' : ''}Date Difference
            </div>
            <div className={styles.resultValue}>
              {result.years} years, {result.months} months, {result.days} days
            </div>
            <div className={styles.resultDetails}>
              <div>From: {result.startFormatted}</div>
              <div>To: {result.endFormatted}</div>
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
              <span className={styles.unitValue}>{result.totalWeeks.toLocaleString()}</span>
              <span className={styles.unitLabel}>Total Weeks</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalMonths.toLocaleString()}</span>
              <span className={styles.unitLabel}>Total Months</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.weekdays.toLocaleString()}</span>
              <span className={styles.unitLabel}>Weekdays</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.weekends.toLocaleString()}</span>
              <span className={styles.unitLabel}>Weekends</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalHours.toLocaleString()}</span>
              <span className={styles.unitLabel}>Total Hours</span>
            </div>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>Date Calculations</div>
          <div className={styles.infoText}>
            This calculator determines the exact difference between two dates, including years, months, days, 
            weekdays, weekends, and total time units. Perfect for project planning, age calculations, or event planning.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateDifferenceCalculator;

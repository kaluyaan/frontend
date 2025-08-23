'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';
interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  daysUntilBirthday: number;
  nextBirthday: string;
}


function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    if (!birthDate) {
      setError('Please enter your birth date');
      return;
    }

    const birth = moment(birthDate);
    const now = moment();

    if (!birth.isValid()) {
      setError('Please enter a valid date');
      return;
    }

    if (birth.isAfter(now)) {
      setError('Birth date cannot be in the future');
      return;
    }

    const years = now.diff(birth, 'years');
    const months = now.diff(birth, 'months') % 12;
    const days = now.diff(birth.clone().add(years, 'years').add(months, 'months'), 'days');
    
    const totalDays = now.diff(birth, 'days');
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = now.diff(birth, 'months');
    const totalHours = now.diff(birth, 'hours');
    const totalMinutes = now.diff(birth, 'minutes');

    const nextBirthday = birth.clone().add(years + 1, 'years');
    const daysUntilBirthday = nextBirthday.diff(now, 'days');

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      daysUntilBirthday,
      nextBirthday: nextBirthday.format('MMMM Do, YYYY')
    });
    setError('');
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/age-calculator" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Age Calculator</h1>
        <p className={styles.subtitle}>Calculate your exact age and get detailed statistics</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Enter your birth date:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={styles.input}
            max={moment().format('YYYY-MM-DD')}
          />
        </div>

        <button onClick={calculateAge} className={styles.button}>
          Calculate Age
        </button>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Your Age</div>
            <div className={styles.resultValue}>
              {result.years} years, {result.months} months, {result.days} days
            </div>
            <div className={styles.resultDetails}>
              <div>Total Days: {result.totalDays.toLocaleString()}</div>
              <div>Total Weeks: {result.totalWeeks.toLocaleString()}</div>
              <div>Total Months: {result.totalMonths.toLocaleString()}</div>
              <div>Total Hours: {result.totalHours.toLocaleString()}</div>
              <div>Total Minutes: {result.totalMinutes.toLocaleString()}</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>Next Birthday</div>
            <div className={styles.countdownNumber}>{result.daysUntilBirthday}</div>
            <div>days until {result.nextBirthday}</div>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>How it works</div>
          <div className={styles.infoText}>
            {`This calculator determines your exact age by calculating the difference between your birth date and today's date. 
            It provides detailed statistics including total days lived, weeks, months, hours, and minutes since birth.`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgeCalculator;
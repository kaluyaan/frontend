
'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';

function BirthdayCountdown() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
      if (result) {
        calculateCountdown();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [result, birthDate]);

  const calculateCountdown = () => {
    if (!birthDate) {
      setError('Please enter your birth date');
      return;
    }

    const birth = moment(birthDate);
    const now = moment();

    if (!birth.isValid()) {
      setError('Please enter a valid birth date');
      return;
    }

    if (birth.isAfter(now)) {
      setError('Birth date cannot be in the future');
      return;
    }

    // Calculate current age
    const currentAge = now.diff(birth, 'years');
    
    // Calculate next birthday
    let nextBirthday = birth.clone().add(currentAge + 1, 'years');
    
    // If birthday already passed this year, it's next year's birthday
    const thisYearBirthday = birth.clone().year(now.year());
    if (thisYearBirthday.isBefore(now, 'day')) {
      nextBirthday = birth.clone().year(now.year() + 1);
    } else {
      nextBirthday = thisYearBirthday;
    }

    const duration = moment.duration(nextBirthday.diff(now));
    
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    // Check if today is birthday
    const isBirthdayToday = thisYearBirthday.isSame(now, 'day');
    
    // Calculate age on next birthday
    const ageOnNextBirthday = nextBirthday.diff(birth, 'years');
    
    // Calculate some fun facts
    const totalDaysLived = now.diff(birth, 'days');
    const totalBirthdaysCelebrated = currentAge;
    const daysUntilNextMilestone = calculateNextMilestone(currentAge) - currentAge;

    setResult({
      days,
      hours,
      minutes,
      seconds,
      currentAge,
      ageOnNextBirthday,
      nextBirthdayDate: nextBirthday.format('MMMM Do, YYYY'),
      nextBirthdayDay: nextBirthday.format('dddd'),
      isBirthdayToday,
      totalDaysLived,
      totalBirthdaysCelebrated,
      daysUntilNextMilestone,
      nextMilestone: calculateNextMilestone(currentAge),
      birthDayOfWeek: birth.format('dddd'),
      birthDateFormatted: birth.format('MMMM Do, YYYY')
    });
    setError('');
  };

  const calculateNextMilestone = (age: number) => {
    const milestones = [18, 21, 25, 30, 40, 50, 60, 65, 70, 75, 80, 90, 100];
    return milestones.find(milestone => milestone > age) || age + 10;
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/birthday-countdown" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Birthday Countdown</h1>
        <p className={styles.subtitle}>Count down to your next birthday with live updates</p>

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

        <button onClick={calculateCountdown} className={styles.button}>
          Start Countdown
        </button>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {result && result.isBirthdayToday && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>🎉 Happy Birthday! 🎉</div>
            <div className={styles.countdownNumber}>TODAY</div>
            <div>You are now {result.currentAge} years old!</div>
          </div>
        )}

        {result && !result.isBirthdayToday && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>Next Birthday Countdown</div>
            <div className={styles.timeUnits}>
              <div className={styles.timeUnit}>
                <span className={styles.unitValue}>{result.days}</span>
                <span className={styles.unitLabel}>Days</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.unitValue}>{result.hours}</span>
                <span className={styles.unitLabel}>Hours</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.unitValue}>{result.minutes}</span>
                <span className={styles.unitLabel}>Minutes</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.unitValue}>{result.seconds}</span>
                <span className={styles.unitLabel}>Seconds</span>
              </div>
            </div>
            <div style={{ marginTop: '15px' }}>
              Until {result.nextBirthdayDate} ({result.nextBirthdayDay})
            </div>
          </div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Birthday Information</div>
            <div className={styles.resultDetails}>
              <div>Current Age: {result.currentAge} years old</div>
              <div>Born on: {result.birthDateFormatted} ({result.birthDayOfWeek})</div>
              <div>Age on next birthday: {result.ageOnNextBirthday}</div>
              <div>Total days lived: {result.totalDaysLived.toLocaleString()}</div>
              <div>Birthdays celebrated: {result.totalBirthdaysCelebrated}</div>
              <div>Next milestone: {result.nextMilestone} years old</div>
            </div>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>Birthday Countdown</div>
          <div className={styles.infoText}>
            This countdown timer shows exactly how much time is left until your next birthday, 
            updating in real-time. It also provides fun statistics about your age and birthdays.
          </div>
        </div>
      </div>
    </div>
  );
}

export default BirthdayCountdown;

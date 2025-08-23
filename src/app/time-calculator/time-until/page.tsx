
'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';

function TimeUntilCalculator() {
  const [targetDateTime, setTargetDateTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [result, setResult] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
      if (result) {
        calculateTimeUntil();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [result, targetDateTime]);

  const calculateTimeUntil = () => {
    if (!targetDateTime) {
      return;
    }

    const target = moment(targetDateTime);
    const now = moment();

    if (!target.isValid()) {
      return;
    }

    const duration = moment.duration(target.diff(now));
    const isPast = target.isBefore(now);
    
    const absDuration = moment.duration(Math.abs(target.diff(now)));
    
    const days = Math.floor(absDuration.asDays());
    const hours = absDuration.hours();
    const minutes = absDuration.minutes();
    const seconds = absDuration.seconds();

    const totalHours = Math.floor(absDuration.asHours());
    const totalMinutes = Math.floor(absDuration.asMinutes());
    const totalSeconds = Math.floor(absDuration.asSeconds());

    setResult({
      days,
      hours,
      minutes,
      seconds,
      totalHours,
      totalMinutes,
      totalSeconds,
      isPast,
      targetFormatted: target.format('MMMM Do, YYYY [at] h:mm:ss A'),
      eventName: eventName || 'Target Event'
    });
  };

  const handleCalculate = () => {
    calculateTimeUntil();
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/time-until" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Time Until Calculator</h1>
        <p className={styles.subtitle}>Calculate time remaining until specific future events</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Event Name (Optional):</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className={styles.input}
            placeholder="Enter event name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Target Date & Time:</label>
          <input
            type="datetime-local"
            value={targetDateTime}
            onChange={(e) => setTargetDateTime(e.target.value)}
            className={styles.input}
          />
        </div>

        <button onClick={handleCalculate} className={styles.button}>
          Start Countdown
        </button>

        {result && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>
              {result.isPast ? `${result.eventName} was` : `Time until ${result.eventName}`}
            </div>
            {result.isPast ? (
              <div className={styles.countdownNumber}>
                {result.days}d {result.hours}h {result.minutes}m {result.seconds}s ago
              </div>
            ) : (
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
            )}
            <div style={{ marginTop: '15px', fontSize: '0.9rem' }}>
              Target: {result.targetFormatted}
            </div>
          </div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Total Time</div>
            <div className={styles.resultDetails}>
              <div>Total Hours: {result.totalHours.toLocaleString()}</div>
              <div>Total Minutes: {result.totalMinutes.toLocaleString()}</div>
              <div>Total Seconds: {result.totalSeconds.toLocaleString()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeUntilCalculator;


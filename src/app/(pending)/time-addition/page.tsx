
'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../../(calculator)/Navigation';

interface TimeBreakdownResult {
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string; // e.g. "1d 5h 30m 20s"
}


function TimeAdditionCalculator() {
  const [timePeriods, setTimePeriods] = useState([{ hours: '', minutes: '', seconds: '' }]);
  const [result, setResult] = useState<TimeBreakdownResult | null>(null);

  const addTimePeriod = () => {
    setTimePeriods([...timePeriods, { hours: '', minutes: '', seconds: '' }]);
  };

  const removeTimePeriod = (index: number) => {
    if (timePeriods.length > 1) {
      setTimePeriods(timePeriods.filter((_, i) => i !== index));
    }
  };

  const updateTimePeriod = (index: number, field: string, value: string) => {
    const updated = [...timePeriods];
    updated[index] = { ...updated[index], [field]: value };
    setTimePeriods(updated);
  };

  const calculateTotal = () => {
    let totalSeconds = 0;
    
    timePeriods.forEach(period => {
      const hours = parseInt(period.hours) || 0;
      const minutes = parseInt(period.minutes) || 0;
      const seconds = parseInt(period.seconds) || 0;
      
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });

    const duration = moment.duration(totalSeconds, 'seconds');
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    setResult({
      totalSeconds,
      totalMinutes: Math.floor(totalSeconds / 60),
      totalHours: Math.floor(totalSeconds / 3600),
      days,
      hours,
      minutes,
      seconds,
      formatted: `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s`
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/time-addition" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Time Addition Calculator</h1>
        <p className={styles.subtitle}>Add multiple time periods together</p>

        {timePeriods.map((period, index) => (
          <div key={index} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #e1e5e9', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: '600' }}>Time Period {index + 1}</span>
              {timePeriods.length > 1 && (
                <button onClick={() => removeTimePeriod(index)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                  Remove
                </button>
              )}
            </div>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Hours:</label>
                <input
                  type="number"
                  min="0"
                  value={period.hours}
                  onChange={(e) => updateTimePeriod(index, 'hours', e.target.value)}
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
                  value={period.minutes}
                  onChange={(e) => updateTimePeriod(index, 'minutes', e.target.value)}
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
                value={period.seconds}
                onChange={(e) => updateTimePeriod(index, 'seconds', e.target.value)}
                className={styles.input}
                placeholder="0"
              />
            </div>
          </div>
        ))}

        <button onClick={addTimePeriod} style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', marginBottom: '15px', cursor: 'pointer' }}>
          + Add Another Time Period
        </button>

        <button onClick={calculateTotal} className={styles.button}>
          Calculate Total Time
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Total Time</div>
            <div className={styles.resultValue}>{result.formatted}</div>
            <div className={styles.resultDetails}>
              <div>Total Seconds: {result.totalSeconds.toLocaleString()}</div>
              <div>Total Minutes: {result.totalMinutes.toLocaleString()}</div>
              <div>Total Hours: {result.totalHours.toLocaleString()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeAdditionCalculator;

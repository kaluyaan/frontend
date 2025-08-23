'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';
interface ResultType {
  totalDays: number;
  businessDays: number;
  businessDaysWithoutHolidays: number;
  weekends: number;
  holidays: number;
  totalWeeks: number;
  remainingDays: number;
  startFormatted: string;
  endFormatted: string;
  holidayDates: string[];
};


function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [holidays, setHolidays] = useState(['']);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState('');

  const addHoliday = () => {
    setHolidays([...holidays, '']);
  };

  const removeHoliday = (index:number) => {
    setHolidays(holidays.filter((_, i) => i !== index));
  };

  const updateHoliday = (index:number, value:string) => {
    const updated = [...holidays];
    updated[index] = value;
    setHolidays(updated);
  };

  const calculateBusinessDays = () => {
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

    if (start.isAfter(end)) {
      setError('End date must be after start date');
      return;
    }

    // Parse holidays
    const holidayDates = holidays
      .filter(h => h.trim())
      .map(h => moment(h))
      .filter(h => h.isValid());

    let businessDays = 0;
    let weekends = 0;
    let holidayCount = 0;
    let totalDays = 0;

    const current = start.clone();
    
    while (current.isSameOrBefore(end, 'day')) {
      totalDays++;
      
      // Check if it's a weekend (Saturday = 6, Sunday = 0)
      if (current.day() === 0 || current.day() === 6) {
        weekends++;
      }
      // Check if it's a holiday
      else if (holidayDates.some(holiday => holiday.isSame(current, 'day'))) {
        holidayCount++;
      }
      // It's a business day
      else {
        businessDays++;
      }
      
      current.add(1, 'day');
    }

    // Calculate business days in different scenarios
    const businessDaysExcludingHolidays = businessDays;
    const businessDaysIncludingHolidays = totalDays - weekends;
    
    // Calculate weeks
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    setResult({
      totalDays,
      businessDays: businessDaysExcludingHolidays,
      businessDaysWithoutHolidays: businessDaysIncludingHolidays,
      weekends,
      holidays: holidayCount,
      totalWeeks,
      remainingDays,
      startFormatted: start.format('MMMM Do, YYYY'),
      endFormatted: end.format('MMMM Do, YYYY'),
      holidayDates: holidayDates.map(h => h.format('MMMM Do, YYYY'))
    });
    setError('');
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/business-days" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Business Days Calculator</h1>
        <p className={styles.subtitle}>Calculate working days excluding weekends and holidays</p>

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

        <div style={{ marginBottom: '20px' }}>
          <label className={styles.label}>Holidays (Optional):</label>
          {holidays.map((holiday, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="date"
                value={holiday}
                onChange={(e) => updateHoliday(index, e.target.value)}
                className={styles.input}
                style={{ flex: 1 }}
                placeholder="Select holiday date"
              />
              <button onClick={() => removeHoliday(index)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={addHoliday} style={{ width: '100%', padding: '8px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            + Add Holiday
          </button>
        </div>

        <button onClick={calculateBusinessDays} className={styles.button}>
          Calculate Business Days
        </button>

        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Business Days</div>
            <div className={styles.resultValue}>{result.businessDays} days</div>
            <div className={styles.resultDetails}>
              <div>From: {result.startFormatted}</div>
              <div>To: {result.endFormatted}</div>
              <div>Excluding weekends and holidays</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalDays}</span>
              <span className={styles.unitLabel}>Total Days</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.businessDays}</span>
              <span className={styles.unitLabel}>Business Days</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.weekends}</span>
              <span className={styles.unitLabel}>Weekend Days</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.holidays}</span>
              <span className={styles.unitLabel}>Holidays</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalWeeks}</span>
              <span className={styles.unitLabel}>Full Weeks</span>
            </div>
          </div>
        )}

        {result && result.holidayDates.length > 0 && (
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>Holidays Excluded</div>
            <div className={styles.infoText}>
              {result.holidayDates.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessDaysCalculator;

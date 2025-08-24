'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';

interface RelevantEvent {
  year: number;
  event: string;
}

interface PeriodAge {
  age: number;
  name: string;
  startYear: number;
}

interface DateResult {
  inputDate: string;        // formatted date like "August 20th, 2025"
  dayName: string;          // e.g. "Wednesday"
  dayOfYear: number;        // 1–365/366
  weekOfYear: number;       // 1–52
  isLeapYear: boolean;
  daysInMonth: number;      // 28–31
  daysInYear: number;       // 365 or 366
  julianDay: number;        // floor(julianDay)
  romanDay: string;         // Roman numeral for day
  romanMonth: string;       // Roman numeral for month
  romanYear: string;        // Roman numeral for year
  relevantEvents: RelevantEvent[]; // adjust if it's objects instead of strings
  periodAges: PeriodAge[];     // adjust if it's objects instead of strings
  century: number;          // e.g. 21
  millennium: number;       // e.g. 3
  decade: number;           // e.g. 2020
  yearProgress: string;     // percentage string, e.g. "64.2"
}



function HistoricalDateCalculator() {
  const [inputDate, setInputDate] = useState(moment().format('YYYY-MM-DD'));
  const [result, setResult] = useState<DateResult | null>(null);

  const calculateHistoricalInfo = () => {
    const date = moment(inputDate);
    if (!date.isValid()) return;

    const dayOfYear = date.dayOfYear();
    const weekOfYear = date.week();
    const isLeapYear = date.isLeapYear();
    const daysInMonth = date.daysInMonth();
    const daysInYear = isLeapYear ? 366 : 365;
    
    // Calculate various calendar systems
    const julianDay = date.valueOf() / 86400000 + 2440587.5;
    
    // Roman numerals for day and month
    const romanNumerals = (num:number) => {
      const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
      let result = '';
      for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
          result += symbols[i];
          num -= values[i];
        }
      }
      return result;
    };

    // Historical events (simplified examples)
    const historicalEvents = [
      { year: 1969, event: 'Moon Landing' },
      { year: 1989, event: 'Fall of Berlin Wall' },
      { year: 2000, event: 'Y2K Millennium' },
      { year: 2001, event: '9/11 Attacks' },
      { year: 2008, event: 'Global Financial Crisis' },
      { year: 2020, event: 'COVID-19 Pandemic' }
    ];

    const relevantEvents = historicalEvents.filter(event => 
      Math.abs(event.year - date.year()) <= 5
    );

    // Calculate age of various historical periods
    const historicalPeriods = [
      { name: 'Internet Era', startYear: 1991 },
      { name: 'Space Age', startYear: 1957 },
      { name: 'Computer Age', startYear: 1946 },
      { name: 'Modern Era', startYear: 1500 },
      { name: 'Common Era', startYear: 1 }
    ];

    const periodAges = historicalPeriods.map(period => ({
      ...period,
      age: Math.max(0, date.year() - period.startYear)
    }));

    setResult({
      inputDate: date.format('MMMM Do, YYYY'),
      dayName: date.format('dddd'),
      dayOfYear,
      weekOfYear,
      isLeapYear,
      daysInMonth,
      daysInYear,
      julianDay: Math.floor(julianDay),
      romanDay: romanNumerals(date.date()),
      romanMonth: romanNumerals(date.month() + 1),
      romanYear: romanNumerals(date.year()),
      relevantEvents,
      periodAges,
      century: Math.ceil(date.year() / 100),
      millennium: Math.ceil(date.year() / 1000),
      decade: Math.floor(date.year() / 10) * 10,
      yearProgress: ((dayOfYear / daysInYear) * 100).toFixed(1)
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/historical-date" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Historical Date Calculator</h1>
        <p className={styles.subtitle}>Calculate dates in different calendar systems and historical context</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Select Date:</label>
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className={styles.input}
          />
        </div>

        <button onClick={calculateHistoricalInfo} className={styles.button}>
          Analyze Historical Date
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Date Analysis</div>
            <div className={styles.resultValue}>{result.inputDate}</div>
            <div className={styles.resultDetails}>
              <div>{result.dayName}</div>
              <div>Day {result.dayOfYear} of {result.daysInYear}</div>
              <div>Week {result.weekOfYear} of the year</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.century}</span>
              <span className={styles.unitLabel}>Century</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.millennium}</span>
              <span className={styles.unitLabel}>Millennium</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.decade}s</span>
              <span className={styles.unitLabel}>Decade</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.julianDay}</span>
              <span className={styles.unitLabel}>Julian Day</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.yearProgress}%</span>
              <span className={styles.unitLabel}>Year Progress</span>
            </div>
          </div>
        )}

        {result && (
          <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>Roman Numerals</div>
              <div className={styles.infoText}>
                <div>Day: {result.romanDay}</div>
                <div>Month: {result.romanMonth}</div>
                <div>Year: {result.romanYear}</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>Calendar Information</div>
              <div className={styles.infoText}>
                <div>Days in this month: {result.daysInMonth}</div>
                <div>Days in this year: {result.daysInYear}</div>
                <div>Leap year: {result.isLeapYear ? 'Yes' : 'No'}</div>
              </div>
            </div>

            {result.periodAges.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.infoTitle}>Historical Periods</div>
                <div className={styles.infoText}>
                  {result.periodAges.map((period, index) => (
                    <div key={index}>
                      {period.name}: {period.age} years old
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.relevantEvents.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.infoTitle}>Historical Events (±5 years)</div>
                <div className={styles.infoText}>
                  {result.relevantEvents.map((event, index) => (
                    <div key={index}>
                      {event.year}: {event.event}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoricalDateCalculator;


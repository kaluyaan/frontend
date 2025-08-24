'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';

// ---------------------- Interfaces ----------------------

interface WorkDay {
  hours: string;
  minutes: string;
  break: string;
}

type WorkDays = Record<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', WorkDay>;

interface DailyHours {
  gross: number;
  net: number;
  break: number;
}

type DailyHoursMap = Record<string, DailyHours>;

interface TimesheetResult {
  grossHours: string;
  netHours: string;
  regularHours: string;
  overtimeHours: string;
  totalBreakHours: string;
  regularPay: string;
  overtimePay: string;
  totalPay: string;
  dailyHours: DailyHoursMap;
  weekStart: string;
  weekEnd: string;
}

// ---------------------- Component ----------------------

function TimesheetCalculator() {
  const [weekStart, setWeekStart] = useState<string>(
    moment().startOf('week').format('YYYY-MM-DD')
  );
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [overtimeRate, setOvertimeRate] = useState<string>('');
  const [weeklyHours, setWeeklyHours] = useState<string>('40');

  const [workDays, setWorkDays] = useState<WorkDays>({
    monday: { hours: '8', minutes: '0', break: '60' },
    tuesday: { hours: '8', minutes: '0', break: '60' },
    wednesday: { hours: '8', minutes: '0', break: '60' },
    thursday: { hours: '8', minutes: '0', break: '60' },
    friday: { hours: '8', minutes: '0', break: '60' },
    saturday: { hours: '0', minutes: '0', break: '0' },
    sunday: { hours: '0', minutes: '0', break: '0' }
  });

  const [result, setResult] = useState<TimesheetResult | null>(null);

  const dayNames: (keyof WorkDays)[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];
  const dayLabels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const updateWorkDay = (
    day: keyof WorkDays,
    field: keyof WorkDay,
    value: string
  ) => {
    setWorkDays(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const calculateTimesheet = () => {
    let totalMinutes = 0;
    let totalBreakMinutes = 0;
    const dailyHours: DailyHoursMap = {};

    dayNames.forEach(day => {
      const hours = parseInt(workDays[day].hours) || 0;
      const minutes = parseInt(workDays[day].minutes) || 0;
      const breakMins = parseInt(workDays[day].break) || 0;

      const dayMinutes = hours * 60 + minutes;
      totalMinutes += dayMinutes;
      totalBreakMinutes += breakMins;

      dailyHours[day] = {
        gross: dayMinutes / 60,
        net: (dayMinutes - breakMins) / 60,
        break: breakMins / 60
      };
    });

    const grossHours = totalMinutes / 60;
    const netHours = (totalMinutes - totalBreakMinutes) / 60;
    const regularHoursLimit = parseInt(weeklyHours);

    const regularHours = Math.min(netHours, regularHoursLimit);
    const overtimeHours = Math.max(0, netHours - regularHoursLimit);

    const rate = parseFloat(hourlyRate) || 0;
    const otRate = parseFloat(overtimeRate) || rate * 1.5;

    const regularPay = regularHours * rate;
    const overtimePay = overtimeHours * otRate;
    const totalPay = regularPay + overtimePay;

    setResult({
      grossHours: grossHours.toFixed(2),
      netHours: netHours.toFixed(2),
      regularHours: regularHours.toFixed(2),
      overtimeHours: overtimeHours.toFixed(2),
      totalBreakHours: (totalBreakMinutes / 60).toFixed(2),
      regularPay: regularPay.toFixed(2),
      overtimePay: overtimePay.toFixed(2),
      totalPay: totalPay.toFixed(2),
      dailyHours,
      weekStart: moment(weekStart).format('MMMM Do, YYYY'),
      weekEnd: moment(weekStart).add(6, 'days').format('MMMM Do, YYYY')
    });
  };

  const fillStandardWeek = () => {
    setWorkDays({
      monday: { hours: '8', minutes: '0', break: '60' },
      tuesday: { hours: '8', minutes: '0', break: '60' },
      wednesday: { hours: '8', minutes: '0', break: '60' },
      thursday: { hours: '8', minutes: '0', break: '60' },
      friday: { hours: '8', minutes: '0', break: '60' },
      saturday: { hours: '0', minutes: '0', break: '0' },
      sunday: { hours: '0', minutes: '0', break: '0' }
    });
  };

  const clearAll = () => {
    setWorkDays({
      monday: { hours: '0', minutes: '0', break: '0' },
      tuesday: { hours: '0', minutes: '0', break: '0' },
      wednesday: { hours: '0', minutes: '0', break: '0' },
      thursday: { hours: '0', minutes: '0', break: '0' },
      friday: { hours: '0', minutes: '0', break: '0' },
      saturday: { hours: '0', minutes: '0', break: '0' },
      sunday: { hours: '0', minutes: '0', break: '0' }
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/timesheet-calculator" />

      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Timesheet Calculator</h1>
        <p className={styles.subtitle}>Weekly/monthly timesheet with pay calculations</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Week Starting:</label>
          <input
            type="date"
            value={weekStart}
            onChange={e => setWeekStart(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Hourly Rate ($):</label>
            <input
              type="number"
              step="0.01"
              value={hourlyRate}
              onChange={e => setHourlyRate(e.target.value)}
              className={styles.input}
              placeholder="0.00"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Overtime Rate ($):</label>
            <input
              type="number"
              step="0.01"
              value={overtimeRate}
              onChange={e => setOvertimeRate(e.target.value)}
              className={styles.input}
              placeholder="Auto (1.5x)"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Regular Hours Per Week:</label>
          <input
            type="number"
            value={weeklyHours}
            onChange={e => setWeeklyHours(e.target.value)}
            className={styles.input}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={fillStandardWeek}
            style={{
              flex: 1,
              padding: '8px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Fill Standard Week (8h/day)
          </button>
          <button
            onClick={clearAll}
            style={{
              flex: 1,
              padding: '8px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        </div>

        {dayNames.map((day, index) => (
          <div
            key={day}
            style={{
              marginBottom: '15px',
              padding: '15px',
              border: '1px solid #e1e5e9',
              borderRadius: '10px'
            }}
          >
            <h4 style={{ marginBottom: '10px', color: '#333' }}>{dayLabels[index]}</h4>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Hours:</label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={workDays[day].hours}
                  onChange={e => updateWorkDay(day, 'hours', e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Minutes:</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={workDays[day].minutes}
                  onChange={e => updateWorkDay(day, 'minutes', e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Break (minutes):</label>
              <input
                type="number"
                min="0"
                value={workDays[day].break}
                onChange={e => updateWorkDay(day, 'break', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        ))}

        <button onClick={calculateTimesheet} className={styles.button}>
          Calculate Timesheet
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Weekly Summary</div>
            <div className={styles.resultValue}>{result.netHours} hours</div>
            <div className={styles.resultDetails}>
              <div>
                Week: {result.weekStart} - {result.weekEnd}
              </div>
              <div>
                Regular: {result.regularHours}h | Overtime: {result.overtimeHours}h
              </div>
              <div>Breaks: {result.totalBreakHours}h</div>
            </div>
          </div>
        )}

        {result && parseFloat(hourlyRate) > 0 && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>${result.regularPay}</span>
              <span className={styles.unitLabel}>Regular Pay</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>${result.overtimePay}</span>
              <span className={styles.unitLabel}>Overtime Pay</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>${result.totalPay}</span>
              <span className={styles.unitLabel}>Total Pay</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimesheetCalculator;

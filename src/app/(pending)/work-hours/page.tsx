
'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../../(calculator)/Navigation';

interface WorkResult {
  totalHours: string;          // since you are using .toFixed(2), it's a string
  regularHours: string;
  overtimeHours: string;
  totalMinutes: number;        // no .toFixed() => number
  regularPay: string;
  overtimePay: string;
  totalPay: string;
  averageHoursPerDay: string;
  workDaysCount: number;
}

function WorkHoursCalculator() {
  const [workDays, setWorkDays] = useState([
    { date: moment().format('YYYY-MM-DD'), startTime: '09:00', endTime: '17:00', breakMinutes: '60' }
  ]);
  const [hourlyRate, setHourlyRate] = useState('');
  const [overtimeRate, setOvertimeRate] = useState('');
  const [regularHoursPerDay, setRegularHoursPerDay] = useState('8');
  const [result, setResult] = useState<WorkResult | null>(null);

  const addWorkDay = () => {
    setWorkDays([...workDays, { 
      date: moment().add(workDays.length, 'days').format('YYYY-MM-DD'), 
      startTime: '09:00', 
      endTime: '17:00', 
      breakMinutes: '60' 
    }]);
  };

  const removeWorkDay = (index : number) => {
    if (workDays.length > 1) {
      setWorkDays(workDays.filter((_, i) => i !== index));
    }
  };

  const updateWorkDay = (index : number, field : string, value : string) => {
    const updated = [...workDays];
    updated[index] = { ...updated[index], [field]: value };
    setWorkDays(updated);
  };

  const calculateHours = () => {
    let totalMinutes = 0;
    let totalRegularMinutes = 0;
    let totalOvertimeMinutes = 0;
    const regularMinutesPerDay = parseInt(regularHoursPerDay) * 60;

    workDays.forEach(day => {
      const start = moment(`${day.date} ${day.startTime}`);
      const end = moment(`${day.date} ${day.endTime}`);
      const breakMinutes = parseInt(day.breakMinutes) || 0;
      
      if (start.isValid() && end.isValid() && end.isAfter(start)) {
        const workMinutes = end.diff(start, 'minutes') - breakMinutes;
        totalMinutes += workMinutes;
        
        if (workMinutes <= regularMinutesPerDay) {
          totalRegularMinutes += workMinutes;
        } else {
          totalRegularMinutes += regularMinutesPerDay;
          totalOvertimeMinutes += workMinutes - regularMinutesPerDay;
        }
      }
    });

    const totalHours = totalMinutes / 60;
    const regularHours = totalRegularMinutes / 60;
    const overtimeHours = totalOvertimeMinutes / 60;

    const rate = parseFloat(hourlyRate) || 0;
    const otRate = parseFloat(overtimeRate) || rate * 1.5;

    const regularPay = regularHours * rate;
    const overtimePay = overtimeHours * otRate;
    const totalPay = regularPay + overtimePay;

    setResult({
      totalHours: totalHours.toFixed(2),
      regularHours: regularHours.toFixed(2),
      overtimeHours: overtimeHours.toFixed(2),
      totalMinutes,
      regularPay: regularPay.toFixed(2),
      overtimePay: overtimePay.toFixed(2),
      totalPay: totalPay.toFixed(2),
      averageHoursPerDay: (totalHours / workDays.length).toFixed(2),
      workDaysCount: workDays.length
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/work-hours" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Work Hours Calculator</h1>
        <p className={styles.subtitle}>Calculate total work hours, overtime, and pay</p>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Hourly Rate ($):</label>
            <input
              type="number"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
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
              onChange={(e) => setOvertimeRate(e.target.value)}
              className={styles.input}
              placeholder="Auto (1.5x regular)"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Regular Hours Per Day:</label>
          <input
            type="number"
            value={regularHoursPerDay}
            onChange={(e) => setRegularHoursPerDay(e.target.value)}
            className={styles.input}
          />
        </div>

        {workDays.map((day, index) => (
          <div key={index} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #e1e5e9', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: '600' }}>Day {index + 1}</span>
              {workDays.length > 1 && (
                <button onClick={() => removeWorkDay(index)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>
                  Remove
                </button>
              )}
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Date:</label>
              <input
                type="date"
                value={day.date}
                onChange={(e) => updateWorkDay(index, 'date', e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Start Time:</label>
                <input
                  type="time"
                  value={day.startTime}
                  onChange={(e) => updateWorkDay(index, 'startTime', e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>End Time:</label>
                <input
                  type="time"
                  value={day.endTime}
                  onChange={(e) => updateWorkDay(index, 'endTime', e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Break Duration (minutes):</label>
              <input
                type="number"
                min="0"
                value={day.breakMinutes}
                onChange={(e) => updateWorkDay(index, 'breakMinutes', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        ))}

        <button onClick={addWorkDay} style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', marginBottom: '15px', cursor: 'pointer' }}>
          + Add Another Day
        </button>

        <button onClick={calculateHours} className={styles.button}>
          Calculate Work Hours
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Work Summary</div>
            <div className={styles.resultValue}>{result.totalHours} hours</div>
            <div className={styles.resultDetails}>
              <div>Regular Hours: {result.regularHours}</div>
              <div>Overtime Hours: {result.overtimeHours}</div>
              <div>Work Days: {result.workDaysCount}</div>
              <div>Average Hours/Day: {result.averageHoursPerDay}</div>
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

export default WorkHoursCalculator;



'use client';

import React from 'react';
import Link from 'next/link';
import styles from './shared.module.css';

function TimeCalculatorHub() {
  const categories = [
    {
      name: 'Basic Time Calculations',
      calculators: [
        { title: 'Age Calculator', description: 'Computes age based on date of birth', path: '/time-calculator/age-calculator', icon: '🎂' },
        { title: 'Time Calculator', description: 'Calculates time intervals or conversions', path: '/time-calculator/time-calculator', icon: '⏰' },
        { title: 'Date Difference Calculator', description: 'Determines difference between two dates', path: '/time-calculator/date-difference', icon: '📅' },
        { title: 'Duration Calculator', description: 'Measures duration between two points in time', path: '/time-calculator/duration-calculator', icon: '⏱️' }
      ]
    },
    {
      name: 'Advanced Time Math',
      calculators: [
        { title: 'Time Addition Calculator', description: 'Add multiple time periods together', path: '/time-calculator/time-addition', icon: '➕' },
        { title: 'Time Percentage Calculator', description: 'Calculate what percentage of time has passed', path: '/time-calculator/time-percentage', icon: '📊' },
        { title: 'Time Until Calculator', description: 'Calculate time remaining until specific events', path: '/time-calculator/time-until', icon: '⏳' }
      ]
    },
    {
      name: 'Countdown & Events',
      calculators: [
        { title: 'Birthday Countdown', description: 'Counts down days until next birthday', path: '/time-calculator/birthday-countdown', icon: '🎉' },
        { title: 'Custom Event Countdown', description: 'Create custom countdowns for any event', path: '/time-calculator/custom-countdown', icon: '🎯' },
        { title: 'Time Capsule Calculator', description: 'Calculate future dates for time capsules', path: '/time-calculator/time-capsule', icon: '📦' }
      ]
    },
    {
      name: 'Work & Productivity',
      calculators: [
        { title: 'Work Hours Calculator', description: 'Calculate total work hours and overtime', path: '/time-calculator/work-hours', icon: '💼' },
        { title: 'Timesheet Calculator', description: 'Weekly/monthly timesheet with pay calculations', path: '/time-calculator/timesheet-calculator', icon: '📋' },
        { title: 'Pomodoro Timer Calculator', description: 'Work/break intervals with productivity tracking', path: '/time-calculator/pomodoro-timer', icon: '🍅' },
        { title: 'Business Days Calculator', description: 'Calculate working days excluding weekends', path: '/time-calculator/business-days', icon: '🏢' }
      ]
    },
    {
      name: 'Time Zones & World Time',
      calculators: [
        { title: 'Time Zone Converter', description: 'Convert time between different time zones', path: '/time-calculator/timezone-converter', icon: '🌍' },
        { title: 'UTC Converter', description: 'Convert local time to/from UTC', path: '/time-calculator/utc-converter', icon: '🌐' }
      ]
    },
    {
      name: 'Special Calculators',
      calculators: [
        { title: 'Event Duration Calculator', description: 'Calculate event or project timeline duration', path: '/time-calculator/event-duration', icon: '📊' },
        { title: 'Pregnancy Due Date Calculator', description: 'Calculate due date and pregnancy milestones', path: '/time-calculator/pregnancy-calculator', icon: '👶' },
        { title: 'Historical Date Calculator', description: 'Calculate dates in different calendar systems', path: '/time-calculator/historical-date', icon: '📜' },
        { title: 'Moon Phase Calculator', description: 'Calculate moon phases for any date', path: '/time-calculator/moon-phase', icon: '🌙' },
        { title: 'Sunrise/Sunset Calculator', description: 'Calculate sun times for any location/date', path: '/time-calculator/sunrise-sunset', icon: '🌅' }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Time Calculator Suite</h1>
        <p className={styles.subtitle}>Choose from our collection of time and date calculation tools</p>

        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#333', fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>
              {category.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {category.calculators.map((calc, index) => (
                <Link key={index} href={calc.path} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                    border: '2px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '15px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px', textAlign: 'center' }}>
                      {calc.icon}
                    </div>
                    <h3 style={{ 
                      color: '#333', 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      marginBottom: '8px',
                      textAlign: 'center'
                    }}>
                      {calc.title}
                    </h3>
                    <p style={{ 
                      color: '#666', 
                      fontSize: '0.85rem', 
                      lineHeight: '1.4',
                      textAlign: 'center',
                      flex: 1
                    }}>
                      {calc.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>About Time Calculator Suite</div>
          <div className={styles.infoText}>
            Our comprehensive collection of 21 time calculation tools covers everything from basic age calculations to advanced 
            productivity tracking, time zone conversions, and astronomical calculations. Each tool is designed for accuracy 
            and ease of use across personal and professional applications.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeCalculatorHub;



import React from 'react';
import Link from 'next/link';

const calculators = [
  { name: 'Age Calculator', path: '/time-calculator/age-calculator' },
  { name: 'Time Calculator', path: '/time-calculator/time-calculator' },
  { name: 'Date Difference', path: '/time-calculator/date-difference' },
  { name: 'Duration Calculator', path: '/time-calculator/duration-calculator' },
  { name: 'Birthday Countdown', path: '/time-calculator/birthday-countdown' },
  { name: 'Event Duration', path: '/time-calculator/event-duration' },
  { name: 'Time Addition', path: '/time-calculator/time-addition' },
  { name: 'Time Percentage', path: '/time-calculator/time-percentage' },
  { name: 'Time Until', path: '/time-calculator/time-until' },
  { name: 'Custom Countdown', path: '/time-calculator/custom-countdown' },
  { name: 'Time Capsule', path: '/time-calculator/time-capsule' },
  { name: 'Work Hours', path: '/time-calculator/work-hours' },
  { name: 'Timesheet Calculator', path: '/time-calculator/timesheet-calculator' },
  { name: 'Pomodoro Timer', path: '/time-calculator/pomodoro-timer' },
  { name: 'Business Days', path: '/time-calculator/business-days' },
  { name: 'Timezone Converter', path: '/time-calculator/timezone-converter' },
  { name: 'UTC Converter', path: '/time-calculator/utc-converter' },
  { name: 'Pregnancy Calculator', path: '/time-calculator/pregnancy-calculator' },
  { name: 'Historical Date', path: '/time-calculator/historical-date' },
  { name: 'Moon Phase', path: '/time-calculator/moon-phase' },
  { name: 'Sunrise/Sunset', path: '/time-calculator/sunrise-sunset' }
];

interface NavigationProps {
  currentPath: string;
}

function Navigation({ currentPath }: NavigationProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '70px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      zIndex: 10
    }}>
      <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
        Other Calculators ({calculators.filter(calc => calc.path !== currentPath).length})
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {calculators
          .filter(calc => calc.path !== currentPath)
          .map((calc, index) => (
          <Link key={index} href={calc.path} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '8px 12px',
              margin: '2px 0',
              borderRadius: '6px',
              color: '#666',
              fontSize: '0.85rem',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
              e.currentTarget.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#666';
            }}>
              {calc.name}
            </div>
          </Link>
          ))}
      </div>
    </div>
  );
}

export default Navigation;



'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from './page.module.css';

type Theme = 'default' | 'dark' | 'neon' | 'vintage';

export default function ClockPage() {
  const [currentTime, setCurrentTime] = useState(moment());
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getThemeClass = () => {
    switch (theme) {
      case 'dark': return styles.darkTheme;
      case 'neon': return styles.neonTheme;
      case 'vintage': return styles.vintageTheme;
      default: return '';
    }
  };

  const getHandRotation = (value: number, max: number) => {
    return (value / max) * 360;
  };

  const hourRotation = getHandRotation(currentTime.hours() % 12, 12) + (currentTime.minutes() / 60) * 30;
  const minuteRotation = getHandRotation(currentTime.minutes(), 60) + (currentTime.seconds() / 60) * 6;
  const secondRotation = getHandRotation(currentTime.seconds(), 60);

  const renderHourMarkers = () => {
    const markers = [];
    for (let i = 0; i < 12; i++) {
      markers.push(
        <div
          key={i}
          className={styles.hourMarker}
          style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
        />
      );
    }
    return markers;
  };

  const renderMinuteMarkers = () => {
    const markers = [];
    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        markers.push(
          <div
            key={i}
            className={styles.minuteMarker}
            style={{ transform: `translateX(-50%) rotate(${i * 6}deg)` }}
          />
        );
      }
    }
    return markers;
  };

  return (
    <div className={`${styles.clockContainer} ${getThemeClass()}`}>
      <div className={styles.themeSelector}>
        <button
          className={`${styles.themeButton} ${theme === 'default' ? styles.active : ''}`}
          onClick={() => setTheme('default')}
        >
          Classic
        </button>
        <button
          className={`${styles.themeButton} ${theme === 'dark' ? styles.active : ''}`}
          onClick={() => setTheme('dark')}
        >
          Dark
        </button>
        <button
          className={`${styles.themeButton} ${theme === 'neon' ? styles.active : ''}`}
          onClick={() => setTheme('neon')}
        >
          Neon
        </button>
        <button
          className={`${styles.themeButton} ${theme === 'vintage' ? styles.active : ''}`}
          onClick={() => setTheme('vintage')}
        >
          Vintage
        </button>
      </div>

      <div className={styles.clockWrapper}>
        <div className={styles.analogClock}>
          <div className={styles.clockFace}>
            {renderHourMarkers()}
            {renderMinuteMarkers()}
            
            <div
              className={styles.hourHand}
              style={{ transform: `translate(-50%, -100%) rotate(${hourRotation}deg)` }}
            />
            <div
              className={styles.minuteHand}
              style={{ transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)` }}
            />
            <div
              className={styles.secondHand}
              style={{ transform: `translate(-50%, -100%) rotate(${secondRotation}deg)` }}
            />
            <div className={styles.centerDot} />
          </div>
        </div>

        <div className={styles.digitalTime}>
          <div className={styles.timeDisplay}>
            {currentTime.format('HH:mm:ss')}
          </div>
          <div className={styles.dateDisplay}>
            {currentTime.format('dddd, MMMM Do YYYY')}
          </div>
          <div className={styles.timezoneDisplay}>
            {currentTime.format('z')} | UTC{currentTime.format('Z')}
          </div>
        </div>
      </div>
    </div>
  );
}

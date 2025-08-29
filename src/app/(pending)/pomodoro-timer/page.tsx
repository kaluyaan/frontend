"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "../shared.module.css";
import Navigation from "../../(calculator)/Navigation";

function PomodoroTimer() {
  const [workMinutes, setWorkMinutes] = useState("25");
  const [breakMinutes, setBreakMinutes] = useState("5");
  const [longBreakMinutes, setLongBreakMinutes] = useState("15");
  const [sessionsUntilLongBreak, setSessionsUntilLongBreak] = useState("4");

  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [totalBreakTime, setTotalBreakTime] = useState(0);

  const handleSessionComplete = useCallback(() => {
    setIsRunning(false);

    if (currentSession === "work") {
      setTotalWorkTime((prev) => prev + parseInt(workMinutes));
      setCompletedSessions((prev) => prev + 1);

      const nextSessionsCount = completedSessions + 1;
      if (nextSessionsCount % parseInt(sessionsUntilLongBreak) === 0) {
        setCurrentSession("longBreak");
        setTimeLeft(parseInt(longBreakMinutes) * 60);
      } else {
        setCurrentSession("break");
        setTimeLeft(parseInt(breakMinutes) * 60);
      }
    } else {
      if (currentSession === "break") {
        setTotalBreakTime((prev) => prev + parseInt(breakMinutes));
      } else {
        setTotalBreakTime((prev) => prev + parseInt(longBreakMinutes));
      }

      setCurrentSession("work");
      setTimeLeft(parseInt(workMinutes) * 60);
    }
  }, [
    currentSession,
    workMinutes,
    breakMinutes,
    longBreakMinutes,
    sessionsUntilLongBreak,
    completedSessions,
  ]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, handleSessionComplete]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentSession("work");
    setTimeLeft(parseInt(workMinutes) * 60);
  };

  const resetAll = () => {
    setIsRunning(false);
    setCurrentSession("work");
    setTimeLeft(parseInt(workMinutes) * 60);
    setCompletedSessions(0);
    setTotalWorkTime(0);
    setTotalBreakTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getSessionColor = () => {
    switch (currentSession) {
      case "work":
        return "#e74c3c";
      case "break":
        return "#2ecc71";
      case "longBreak":
        return "#3498db";
      default:
        return "#667eea";
    }
  };

  const getSessionTitle = () => {
    switch (currentSession) {
      case "work":
        return "Work Session";
      case "break":
        return "Short Break";
      case "longBreak":
        return "Long Break";
      default:
        return "Pomodoro";
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/pomodoro-timer" />

      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Pomodoro Timer</h1>
        <p className={styles.subtitle}>
          Work/break intervals with productivity tracking
        </p>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Work Minutes:</label>
            <input
              type="number"
              min="1"
              max="60"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(e.target.value)}
              className={styles.input}
              disabled={isRunning}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Break Minutes:</label>
            <input
              type="number"
              min="1"
              max="30"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
              className={styles.input}
              disabled={isRunning}
            />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Long Break Minutes:</label>
            <input
              type="number"
              min="1"
              max="60"
              value={longBreakMinutes}
              onChange={(e) => setLongBreakMinutes(e.target.value)}
              className={styles.input}
              disabled={isRunning}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Sessions Until Long Break:</label>
            <input
              type="number"
              min="2"
              max="10"
              value={sessionsUntilLongBreak}
              onChange={(e) => setSessionsUntilLongBreak(e.target.value)}
              className={styles.input}
              disabled={isRunning}
            />
          </div>
        </div>

        <div
          style={{
            background: getSessionColor(),
            color: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            {getSessionTitle()}
          </div>
          <div
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {formatTime(timeLeft)}
          </div>

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            {!isRunning ? (
              <button
                onClick={startTimer}
                style={{
                  padding: "10px 20px",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Start
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                style={{
                  padding: "10px 20px",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Pause
              </button>
            )}
            <button
              onClick={resetTimer}
              style={{
                padding: "10px 20px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
            <button
              onClick={resetAll}
              style={{
                padding: "10px 20px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Reset All
            </button>
          </div>
        </div>

        <div className={styles.timeUnits}>
          <div className={styles.timeUnit}>
            <span className={styles.unitValue}>{completedSessions}</span>
            <span className={styles.unitLabel}>Completed Sessions</span>
          </div>
          <div className={styles.timeUnit}>
            <span className={styles.unitValue}>{totalWorkTime}</span>
            <span className={styles.unitLabel}>Total Work Minutes</span>
          </div>
          <div className={styles.timeUnit}>
            <span className={styles.unitValue}>{totalBreakTime}</span>
            <span className={styles.unitLabel}>Total Break Minutes</span>
          </div>
          <div className={styles.timeUnit}>
            <span className={styles.unitValue}>
              {Math.floor((totalWorkTime + totalBreakTime) / 60)}h{" "}
              {(totalWorkTime + totalBreakTime) % 60}m
            </span>
            <span className={styles.unitLabel}>Total Time</span>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>Pomodoro Technique</div>
          <div className={styles.infoText}>
            The Pomodoro Technique uses timed intervals to boost focus and
            productivity. Work for 25 minutes, then take a 5-minute break. After
            4 work sessions, take a longer 15-30 minute break.
          </div>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;

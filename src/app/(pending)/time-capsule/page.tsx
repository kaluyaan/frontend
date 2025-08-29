"use client";

import React, { useState } from "react";
import moment, { unitOfTime } from "moment";
import Link from "next/link";
import styles from "../shared.module.css";
import Navigation from "../../(calculator)/Navigation";

type DurationConstructor =
  | "years"
  | "y"
  | "months"
  | "M"
  | "weeks"
  | "w"
  | "days"
  | "d"
  | "hours"
  | "h"
  | "minutes"
  | "m"
  | "seconds"
  | "s"
  | "milliseconds"
  | "ms";

interface AgeProgression {
  childToTeen: boolean;
  teenToAdult: boolean;
  youngToMiddle: boolean;
  middleToSenior: boolean;
}

interface PresetDuration {
  value: number;
  type: DurationConstructor;
  label: string;
}

interface Result {
  startDate: string; // e.g., "August 20th, 2025"
  openDate: string; // formatted open date
  openDay: string; // e.g., "Monday"
  duration: number | string; // depends on your calculation
  durationType: string; // e.g., "days", "weeks", "months", "years"
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalYears: number;
  ageProgression: AgeProgression | null; // message like "You are X years older"
  message: string; // custom message
}

function TimeCapsuleCalculator() {
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [openDuration, setOpenDuration] = useState("10");
  const [durationType, setDurationType] =
    useState<unitOfTime.DurationConstructor>("years");
  const [customMessage, setCustomMessage] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const calculateOpenDate = () => {
    const start = moment(currentDate);
    const duration = parseInt(openDuration);

    const openDate = start.clone().add(duration, durationType);
    const totalDays = openDate.diff(start, "days");
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = openDate.diff(start, "months");
    const totalYears = openDate.diff(start, "years");

    // Calculate age progression if it's a long-term capsule
    const ageProgression =
      duration >= 5
        ? {
            childToTeen: duration >= 8,
            teenToAdult: duration >= 10,
            youngToMiddle: duration >= 20,
            middleToSenior: duration >= 30,
          }
        : null;

    setResult({
      startDate: start.format("MMMM Do, YYYY"),
      openDate: openDate.format("MMMM Do, YYYY"),
      openDay: openDate.format("dddd"),
      duration,
      durationType,
      totalDays,
      totalWeeks,
      totalMonths,
      totalYears,
      ageProgression,
      message: customMessage,
    });
  };

  const presetDurations: PresetDuration[] = [
    { value: 1, type: "years", label: "1 Year Capsule" },
    { value: 5, type: "years", label: "5 Year Capsule" },
    { value: 10, type: "years", label: "10 Year Capsule" },
    { value: 25, type: "years", label: "25 Year Capsule" },
    { value: 50, type: "years", label: "50 Year Capsule" },
  ];

  const setPreset = (preset: PresetDuration) => {
    setOpenDuration(preset.value.toString());
    setDurationType(preset.type);
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/time-capsule" />

      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Time Capsule Calculator</h1>
        <p className={styles.subtitle}>
          Calculate future dates for time capsules
        </p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Seal Date:</label>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Duration:</label>
            <input
              type="number"
              min="1"
              value={openDuration}
              onChange={(e) => setOpenDuration(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Time Unit:</label>
            <select
              value={durationType}
              onChange={(e) =>
                setDurationType(
                  e.target.value as unitOfTime.DurationConstructor
                )
              }
              className={styles.input}
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label className={styles.label}>Quick Presets:</label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {presetDurations.map((preset, index) => (
              <button
                key={index}
                onClick={() => setPreset(preset)}
                style={{
                  padding: "8px 12px",
                  background: "rgba(102, 126, 234, 0.1)",
                  border: "1px solid rgba(102, 126, 234, 0.3)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Message for Future Self (Optional):
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className={styles.input}
            rows={3}
            placeholder="Write a message to your future self..."
            style={{ resize: "vertical" }}
          />
        </div>

        <button onClick={calculateOpenDate} className={styles.button}>
          Calculate Open Date
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Time Capsule Details</div>
            <div className={styles.resultValue}>Open on {result.openDate}</div>
            <div className={styles.resultDetails}>
              <div>Sealed: {result.startDate}</div>
              <div>
                Duration: {result.duration} {result.durationType}
              </div>
              <div>Open Day: {result.openDay}</div>
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
              <span className={styles.unitValue}>{result.totalWeeks}</span>
              <span className={styles.unitLabel}>Total Weeks</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalMonths}</span>
              <span className={styles.unitLabel}>Total Months</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalYears}</span>
              <span className={styles.unitLabel}>Total Years</span>
            </div>
          </div>
        )}

        {result && result.message && (
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>Your Message</div>
            <div className={styles.infoText}>{result.message}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeCapsuleCalculator;

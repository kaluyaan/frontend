"use client";

import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import styles from "../shared.module.css";
import Navigation from "../Navigation";

interface Conversion {
  timezone: string;
  time: string;
  formatted: string;
  label: string;
}

interface Result {
  originalTime: string;
  originalFormatted: string;
  fromTimezone: string;
  conversions: Conversion[];
}

function TimezoneConverter() {
  const [inputTime, setInputTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [fromTimezone, setFromTimezone] = useState("0");
  const [toTimezones, setToTimezones] = useState(["-5", "0", "+5"]);
  const [result, setResult] = useState<Result | null>(null);

  const timezones = [
    { value: "-12", label: "UTC-12 (Baker Island)" },
    { value: "-11", label: "UTC-11 (American Samoa)" },
    { value: "-10", label: "UTC-10 (Hawaii)" },
    { value: "-9", label: "UTC-9 (Alaska)" },
    { value: "-8", label: "UTC-8 (Pacific Time)" },
    { value: "-7", label: "UTC-7 (Mountain Time)" },
    { value: "-6", label: "UTC-6 (Central Time)" },
    { value: "-5", label: "UTC-5 (Eastern Time)" },
    { value: "-4", label: "UTC-4 (Atlantic Time)" },
    { value: "-3", label: "UTC-3 (Argentina)" },
    { value: "-2", label: "UTC-2 (South Georgia)" },
    { value: "-1", label: "UTC-1 (Azores)" },
    { value: "0", label: "UTC+0 (London, GMT)" },
    { value: "+1", label: "UTC+1 (Paris, Berlin)" },
    { value: "+2", label: "UTC+2 (Cairo, Athens)" },
    { value: "+3", label: "UTC+3 (Moscow, Istanbul)" },
    { value: "+4", label: "UTC+4 (Dubai, Baku)" },
    { value: "+5", label: "UTC+5 (Karachi, Tashkent)" },
    { value: "+5.5", label: "UTC+5:30 (India, Sri Lanka)" },
    { value: "+6", label: "UTC+6 (Dhaka, Almaty)" },
    { value: "+7", label: "UTC+7 (Bangkok, Jakarta)" },
    { value: "+8", label: "UTC+8 (Beijing, Singapore)" },
    { value: "+9", label: "UTC+9 (Tokyo, Seoul)" },
    { value: "+9.5", label: "UTC+9:30 (Adelaide)" },
    { value: "+10", label: "UTC+10 (Sydney, Melbourne)" },
    { value: "+11", label: "UTC+11 (Solomon Islands)" },
    { value: "+12", label: "UTC+12 (New Zealand)" },
  ];

  const convertTime = () => {
    const baseTime = moment(inputTime);
    if (!baseTime.isValid()) return;

    const fromOffset = parseFloat(fromTimezone);
    const utcTime = baseTime.clone().subtract(fromOffset, "hours");

    const conversions = toTimezones.map((tz) => {
      const offset = parseFloat(tz);
      const convertedTime = utcTime.clone().add(offset, "hours");
      const timezoneInfo = timezones.find((t) => t.value === tz);

      return {
        timezone: tz,
        label: timezoneInfo?.label || `UTC${offset >= 0 ? "+" : ""}${offset}`,
        time: convertedTime.format("YYYY-MM-DD HH:mm:ss"),
        formatted: convertedTime.format("dddd, MMMM Do, YYYY [at] h:mm:ss A"),
      };
    });

    const fromTimezoneInfo = timezones.find((t) => t.value === fromTimezone);

    setResult({
      originalTime: baseTime.format("YYYY-MM-DD HH:mm:ss"),
      originalFormatted: baseTime.format("dddd, MMMM Do, YYYY [at] h:mm:ss A"),
      fromTimezone:
        fromTimezoneInfo?.label ||
        (typeof fromTimezone === "number"
          ? `UTC${fromTimezone >= 0 ? "+" : ""}${fromTimezone}`
          : fromTimezone), // if it's already a string
      conversions,
    });
  };

  const addTimezone = () => {
    setToTimezones([...toTimezones, "0"]);
  };

  const removeTimezone = (index : number) => {
    if (toTimezones.length > 1) {
      setToTimezones(toTimezones.filter((_, i) => i !== index));
    }
  };

  const updateTimezone = (index : number, value : string) => {
    const updated = [...toTimezones];
    updated[index] = value;
    setToTimezones(updated);
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/timezone-converter" />

      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Time Zone Converter</h1>
        <p className={styles.subtitle}>
          Convert time between different time zones
        </p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Input Date & Time:</label>
          <input
            type="datetime-local"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>From Time Zone:</label>
          <select
            value={fromTimezone}
            onChange={(e) => setFromTimezone(e.target.value)}
            className={styles.input}
          >
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label className={styles.label}>Convert To Time Zones:</label>
          {toTimezones.map((tz, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
            >
              <select
                value={tz}
                onChange={(e) => updateTimezone(index, e.target.value)}
                className={styles.input}
                style={{ flex: 1 }}
              >
                {timezones.map((timezone) => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
              {toTimezones.length > 1 && (
                <button
                  onClick={() => removeTimezone(index)}
                  style={{
                    background: "#ff6b6b",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addTimezone}
            style={{
              width: "100%",
              padding: "8px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            + Add Time Zone
          </button>
        </div>

        <button onClick={convertTime} className={styles.button}>
          Convert Time
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Original Time</div>
            <div className={styles.resultValue}>{result.originalTime}</div>
            <div className={styles.resultDetails}>
              <div>{result.fromTimezone}</div>
              <div>{result.originalFormatted}</div>
            </div>
          </div>
        )}

        {result && (
          <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
            {result.conversions.map((conversion, index) => (
              <div
                key={index}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                  border: "1px solid rgba(102, 126, 234, 0.2)",
                  borderRadius: "10px",
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "5px",
                  }}
                >
                  {conversion.label}
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "#667eea",
                    marginBottom: "5px",
                  }}
                >
                  {conversion.time}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  {conversion.formatted}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TimezoneConverter;

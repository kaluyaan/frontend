"use client";

import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import styles from "../shared.module.css";
import Navigation from "../Navigation";

interface TimeConversionResult {
  inputTime: string;
  inputFormatted: string;
  utcTime: string;
  utcFormatted: string;
  localTime: string;
  localFormatted: string;
  offset: number;
  offsetLabel: string;
  conversionType: string; // or you can make this a union of specific strings if it's fixed
}

function UTCConverter() {
  const [inputTime, setInputTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [conversionType, setConversionType] = useState("toUTC");
  const [localOffset, setLocalOffset] = useState("0");
  const [result, setResult] = useState<TimeConversionResult | null>(null);

  const convertTime = () => {
    const inputMoment = moment(inputTime);
    if (!inputMoment.isValid()) return;

    const offset = parseFloat(localOffset);
    let utcTime, localTime;

    if (conversionType === "toUTC") {
      // Convert local time to UTC
      localTime = inputMoment;
      utcTime = inputMoment.clone().subtract(offset, "hours");
    } else {
      // Convert UTC to local time
      utcTime = inputMoment;
      localTime = inputMoment.clone().add(offset, "hours");
    }

    setResult({
      inputTime: inputMoment.format("YYYY-MM-DD HH:mm:ss"),
      inputFormatted: inputMoment.format("dddd, MMMM Do, YYYY [at] h:mm:ss A"),
      utcTime: utcTime.format("YYYY-MM-DD HH:mm:ss"),
      utcFormatted: utcTime.format("dddd, MMMM Do, YYYY [at] h:mm:ss A"),
      localTime: localTime.format("YYYY-MM-DD HH:mm:ss"),
      localFormatted: localTime.format("dddd, MMMM Do, YYYY [at] h:mm:ss A"),
      offset: offset,
      offsetLabel: `UTC${offset >= 0 ? "+" : ""}${offset}`,
      conversionType,
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/utc-converter" />

      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>UTC Converter</h1>
        <p className={styles.subtitle}>
          Convert between local time and UTC (Coordinated Universal Time)
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
          <label className={styles.label}>Conversion Type:</label>
          <select
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value)}
            className={styles.input}
          >
            <option value="toUTC">Local Time → UTC</option>
            <option value="fromUTC">UTC → Local Time</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Local Time Zone Offset (hours from UTC):
          </label>
          <select
            value={localOffset}
            onChange={(e) => setLocalOffset(e.target.value)}
            className={styles.input}
          >
            <option value="-12">UTC-12 (Baker Island)</option>
            <option value="-11">UTC-11 (American Samoa)</option>
            <option value="-10">UTC-10 (Hawaii)</option>
            <option value="-9">UTC-9 (Alaska)</option>
            <option value="-8">UTC-8 (Pacific Time)</option>
            <option value="-7">UTC-7 (Mountain Time)</option>
            <option value="-6">UTC-6 (Central Time)</option>
            <option value="-5">UTC-5 (Eastern Time)</option>
            <option value="-4">UTC-4 (Atlantic Time)</option>
            <option value="-3">UTC-3 (Argentina)</option>
            <option value="-2">UTC-2 (South Georgia)</option>
            <option value="-1">UTC-1 (Azores)</option>
            <option value="0">UTC+0 (London, GMT)</option>
            <option value="1">UTC+1 (Paris, Berlin)</option>
            <option value="2">UTC+2 (Cairo, Athens)</option>
            <option value="3">UTC+3 (Moscow, Istanbul)</option>
            <option value="4">UTC+4 (Dubai, Baku)</option>
            <option value="5">UTC+5 (Karachi, Tashkent)</option>
            <option value="5.5">UTC+5:30 (India, Sri Lanka)</option>
            <option value="6">UTC+6 (Dhaka, Almaty)</option>
            <option value="7">UTC+7 (Bangkok, Jakarta)</option>
            <option value="8">UTC+8 (Beijing, Singapore)</option>
            <option value="9">UTC+9 (Tokyo, Seoul)</option>
            <option value="9.5">UTC+9:30 (Adelaide)</option>
            <option value="10">UTC+10 (Sydney, Melbourne)</option>
            <option value="11">UTC+11 (Solomon Islands)</option>
            <option value="12">UTC+12 (New Zealand)</option>
          </select>
        </div>

        <button onClick={convertTime} className={styles.button}>
          Convert Time
        </button>

        {result && (
          <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
            <div className={styles.resultCard}>
              <div className={styles.resultTitle}>
                {result.conversionType === "toUTC" ? "Local Time" : "UTC Time"}
              </div>
              <div className={styles.resultValue}>{result.inputTime}</div>
              <div className={styles.resultDetails}>
                <div>{result.inputFormatted}</div>
                <div>
                  {result.conversionType === "toUTC"
                    ? result.offsetLabel
                    : "UTC+0"}
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: "2rem",
                color: "#667eea",
              }}
            >
              ↓
            </div>

            <div className={styles.countdownCard}>
              <div className={styles.resultTitle}>
                {result.conversionType === "toUTC" ? "UTC Time" : "Local Time"}
              </div>
              <div
                className={styles.countdownNumber}
                style={{ fontSize: "1.5rem" }}
              >
                {result.conversionType === "toUTC"
                  ? result.utcTime
                  : result.localTime}
              </div>
              <div>
                {result.conversionType === "toUTC"
                  ? result.utcFormatted
                  : result.localFormatted}
              </div>
              <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                {result.conversionType === "toUTC"
                  ? "UTC+0"
                  : result.offsetLabel}
              </div>
            </div>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>About UTC</div>
          <div className={styles.infoText}>
            UTC (Coordinated Universal Time) is the primary time standard by
            which the world regulates clocks and time. It's essentially the same
            as GMT (Greenwich Mean Time) and serves as the reference point for
            all time zones worldwide.
          </div>
        </div>
      </div>
    </div>
  );
}

export default UTCConverter;

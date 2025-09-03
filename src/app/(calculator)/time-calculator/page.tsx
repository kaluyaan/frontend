"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "../shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerField from "@/components/shared/DatePicker/DatePicker";
import TimePickerField from "@/components/shared/DatePicker/TimePicker";

interface DateTimeOperationResult {
  originalDateTime: string; // "DD-MM-YYYY HH:mm"
  resultDateTime: string; // "DD-MM-YYYY HH:mm"
  operation: "Added" | "Subtracted";
  difference: {
    hours: number;
    minutes: number;
  };
  totalMinutes: number;
  totalHours: number;
}

function DateTimeCalculator() {
  const [operation, setOperation] = useState("add");
  const [baseDate, setBaseDate] = useState<Moment | null>(null);
  const [baseTime, setBaseTime] = useState<Moment | null>(null);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [result, setResult] = useState<DateTimeOperationResult | null>(null);
  const [error, setError] = useState("");

  const calculateDateTime = () => {
    if (!baseDate || !baseTime) {
      setError("Please select both date and time");
      return;
    }

    // Merge date and time
    const base = moment(
      `${baseDate.format("DD-MM-YYYY")} ${baseTime.format("HH:mm")}`,
      "DD-MM-YYYY HH:mm"
    );

    if (!base.isValid()) {
      setError("Invalid date or time");
      return;
    }

    const hoursToAdd = parseInt(hours) || 0;
    const minutesToAdd = parseInt(minutes) || 0;

    let resultDateTime: Moment;
    if (operation === "add") {
      resultDateTime = base
        .clone()
        .add(hoursToAdd, "hours")
        .add(minutesToAdd, "minutes");
    } else {
      resultDateTime = base
        .clone()
        .subtract(hoursToAdd, "hours")
        .subtract(minutesToAdd, "minutes");
    }

    const totalMinutes = Math.abs(base.diff(resultDateTime, "minutes"));
    const totalHours = Math.abs(base.diff(resultDateTime, "hours", true));

    setResult({
      originalDateTime: base.format("DD-MM-YYYY HH:mm"),
      resultDateTime: resultDateTime.format("DD-MM-YYYY HH:mm"),
      operation: operation === "add" ? "Added" : "Subtracted",
      difference: {
        hours: hoursToAdd,
        minutes: minutesToAdd,
      },
      totalMinutes,
      totalHours,
    });
    setError("");
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Date & Time Calculator"
          text="Add or subtract hours and minutes from a base date and time"
        />

        <section className={homeStyle.sectionWrapper}>
          <div className={styles.grid}>
            <div>
              <DatePickerField
                label="Base Date"
                selectedDate={baseDate}
                onChange={setBaseDate}
              />
            </div>
            <div>
              <TimePickerField
                label="Base Time (HH:MM)"
                selectedTime={baseTime}
                onChange={setBaseTime}
              />
            </div>
          </div>
          <div className={styles.inputGroup} style={{ marginTop: "20px" }}>
            <h3 className={homeStyle.normalTitle}>Operation:</h3>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className={styles.input}
            >
              <option value="add">Add</option>
              <option value="subtract">Subtract</option>
            </select>
          </div>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <h3 className={homeStyle.normalTitle}>Hours:</h3>
              <input
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className={styles.input}
                placeholder="0"
              />
            </div>
            <div className={styles.inputGroup}>
              <h3 className={homeStyle.normalTitle}>Minutes:</h3>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className={styles.input}
                placeholder="0"
              />
            </div>
          </div>
        </section>

        <ConvertButton
          onClick={calculateDateTime}
          disabled={false}
          label="Calculate"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Calculation Result</div>
            <div className={styles.resultValue}>{result.resultDateTime}</div>
            <div className={styles.resultDetails}>
              <div>Original Date & Time: {result.originalDateTime}</div>
              <div>
                {result.operation}: {result.difference.hours}h{" "}
                {result.difference.minutes}m
              </div>
              <div>Result Date & Time: {result.resultDateTime}</div>
            </div>
          </div>
        )}

        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>How it works</h3>
          <p className={homeStyle.normalText}>
            {`This calculator allows you to add or subtract hours and minutes from
            a selected date and time. It's useful for scheduling, calculating
            deadlines, or planning events across time zones.`}
          </p>
        </section>
      </main>
    </div>
  );
}

export default DateTimeCalculator;

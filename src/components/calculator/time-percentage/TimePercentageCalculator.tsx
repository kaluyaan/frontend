"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "../shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerField from "@/components/shared/DatePicker/DatePickerWrapper";
import LoadingSpinner from "@/components/ai-writer/LoadingSpinner";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import StatsDisplay from "./StatsDisplay";

export interface IDateProgressResult {
  percentage: string; // e.g. "45.67" (% elapsed)
  remainingPercentage: string; // e.g. "54.33" (% remaining)
  totalDays: number;
  elapsedDays: number;
  remainingDays: number;
  startFormatted: string; // "August 10th, 2023"
  endFormatted: string; // "August 23rd, 2025"
  currentFormatted: string; // "August 23rd, 2024"
  isComplete: boolean; // true if current > end
  isBeforeStart: boolean; // true if current < start
}

function TimePercentageCalculator() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [result, setResult] = useState<IDateProgressResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const calculatePercentage = () => {
    setIsLoading(true);
    if (!startDate || !endDate) {
      setError("Please enter both start and end dates");
      setIsLoading(false);
      return;
    }

    const start = moment(startDate);
    const end = moment(endDate);
    const current = moment();

    if (!start.isValid() || !end.isValid() || !current.isValid()) {
      setError("Please enter valid dates");
      setIsLoading(false);
      return;
    }

    if (start.isAfter(end)) {
      setError("End date must be after start date");
      setIsLoading(false);
      return;
    }

    const totalDuration = end.diff(start);
    const elapsedDuration = current.diff(start);
    // const remainingDuration = end.diff(current);

    const percentage = (elapsedDuration / totalDuration) * 100;
    const remainingPercentage = 100 - percentage;

    const totalDays = end.diff(start, "days");
    const elapsedDays = current.diff(start, "days");
    const remainingDays = current.isBefore(start) 
  ? totalDays 
  : Math.max(0, end.diff(current, "days"));
    setResult({
      percentage: Math.max(0, Math.min(100, percentage)).toFixed(2),
      remainingPercentage: Math.max(
        0,
        Math.min(100, remainingPercentage)
      ).toFixed(2),
      totalDays,
      elapsedDays: Math.max(0, elapsedDays),
      remainingDays: Math.max(0, remainingDays),
      startFormatted: start.format("MMMM Do, YYYY"),
      endFormatted: end.format("MMMM Do, YYYY"),
      currentFormatted: current.format("MMMM Do, YYYY"),
      isComplete: current.isAfter(end),
      isBeforeStart: current.isBefore(start),
    });
    setError("");
    setIsLoading(false);
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Time Percentage Calculator"
          text="Calculate the percentage of time that has passed between two dates."
        />

        <div className={styles.grid}>
          <DatePickerField
            label="Enter Start Date:"
            selectedDate={startDate}
            onChange={setStartDate}
            required
            maxDate={endDate ? moment(endDate) : undefined}
            error={error}
          />
          <DatePickerField
            label="Enter End Date:"
            selectedDate={endDate}
            onChange={setEndDate}
            required
            minDate={startDate ? moment(startDate) : undefined}
            error={error}
          />
        </div>

        {isLoading ? (
          <LoadingSpinner isVisible={isLoading} text={"Loading....."} />
        ) : (
          <ConvertButton
            onClick={calculatePercentage}
            disabled={isLoading}
            label={"Calculate Percentage"}
          />
        )}

        {error && <div className={styles.errorMessage}>{error}</div>}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>
              {result.isComplete
                ? "Period Complete"
                : result.isBeforeStart
                ? "Period Not Started"
                : "Time Progress"}
            </div>
            <div className={styles.resultValue}>
              {result.percentage}% Complete
            </div>
            <div className={styles.resultDetails}>
              <div>From: {result.startFormatted}</div>
              <div>To: {result.endFormatted}</div>
              <div>Current: {result.currentFormatted}</div>
            </div>
          </div>
        )}

        {result && <StatsDisplay stats={result} />}
      </main>
    </div>
  );
}

export default TimePercentageCalculator;

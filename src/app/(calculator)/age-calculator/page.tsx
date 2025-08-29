"use client";

import React, { useState } from "react";
import styles from "../shared.module.css";
// import Navigation from '../Navigation';
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerField from "@/components/shared/DatePicker/DatePicker";
import moment, { Moment } from "moment";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import LoadingSpinner from "@/components/ai-writer/LoadingSpinner";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  daysUntilBirthday: number;
  nextBirthday: string;
}

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Moment | null>(null);
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateAge = () => {
    setIsLoading(true);
    if (!birthDate) {
      setError("Please enter your birth date");
      setIsLoading(false);
      return;
    }

    const now = moment();

    if (!birthDate.isValid()) {
      setError("Please enter a valid date");
      setIsLoading(false);
      return;
    }
    console.log("birthDate", birthDate);
    if (birthDate.isAfter(now)) {
      setError("Birth date cannot be in the future");
      setIsLoading(false);
      return;
    }

    // Years, months, days
    const years = now.diff(birthDate, "year");
    const months = now.diff(birthDate.clone().add(years, "year"), "month");
    const days = now.diff(
      birthDate.clone().add(years, "year").add(months, "month"),
      "day"
    );

    console.log("years, months, days", years, months, days);

    // Totals
    const totalDays = now.diff(birthDate, "day");
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = now.diff(birthDate, "month");
    const totalHours = now.diff(birthDate, "hour");
    const totalMinutes = now.diff(birthDate, "minute");

    // Next birthday
    const nextBirthday = birthDate.clone().add(years + 1, "year");
    const daysUntilBirthday = nextBirthday.diff(now, "day");

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      daysUntilBirthday,
      nextBirthday: nextBirthday.format("MMMM D, YYYY"),
    });
    setError("");
    setIsLoading(false);
  };

  return (
    <div className={homeStyle.container}>
      {/* <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/age-calculator" /> */}

      <main className={homeStyle.mainContent}>
        {/* <h1 className={styles.title}>Age Calculator</h1>
        <p className={styles.subtitle}>Calculate your exact age and get detailed statistics</p> */}

        <HeroSection
          title="Age Calculator"
          text="Calculate your exact age in years, months, and days. Get detailed statistics including total days, weeks, months, hours, and minutes since birth."
        />

        <DatePickerField
          label="Enter your birth date:"
          selectedDate={birthDate}
          onChange={setBirthDate}
          required
          minDate={moment().subtract(100, "year")}
          maxDate={moment()}
          error={error}
        />

        {isLoading ? (
          <LoadingSpinner isVisible={isLoading} text={"Loading....."} />
        ) : (
          <ConvertButton
            onClick={calculateAge}
            disabled={isLoading}
            label={"Calculate Age"}
          />
        )}

        {error && <div className={styles.errorMessage}>{error}</div>}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Your Age</div>
            <div className={styles.resultValue}>
              {result.years} years, {result.months} months, {result.days} days
            </div>
            <div className={styles.resultDetails}>
              <div>Total Days: {result.totalDays.toLocaleString()}</div>
              <div>Total Weeks: {result.totalWeeks.toLocaleString()}</div>
              <div>Total Months: {result.totalMonths.toLocaleString()}</div>
              <div>Total Hours: {result.totalHours.toLocaleString()}</div>
              <div>Total Minutes: {result.totalMinutes.toLocaleString()}</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>Next Birthday</div>
            <div className={styles.countdownNumber}>
              {result.daysUntilBirthday}
            </div>
            <div>days until {result.nextBirthday}</div>
          </div>
        )}

        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>How it works</h3>

          <p className={homeStyle.normalText}>
            {`This calculator determines your exact age by calculating the
        difference between your birth date and today's date. It provides
        detailed statistics including total days lived, weeks, months,
        hours, and minutes since birth.`}
          </p>
        </section>
      </main>
    </div>
  );
}

export default AgeCalculator;

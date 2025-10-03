"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "./shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerFieldWrapper from "@/components/shared/DatePicker/DatePickerWrapper";
import DatePickerField from "@/components/shared/DatePicker/DatePicker";
import ConvertButton from "@/components/ai-writer/ConvertButton";
interface ResultType {
  totalDays: number;
  businessDays: number;
  businessDaysWithoutHolidays: number;
  weekends: number;
  holidays: number;
  totalWeeks: number;
  remainingDays: number;
  startFormatted: string;
  endFormatted: string;
  holidayDates: string[];
}

function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [holidays, setHolidays] = useState<Moment[]>([]);
  const [newHoliday, setNewHoliday] = useState<Moment | null>(null);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");

  const addHoliday = () => {
    if (!newHoliday || !newHoliday.isValid()) return;
    if (holidays.some((h) => h.isSame(newHoliday, "day"))) return;
    setHolidays([...holidays, newHoliday.clone()]);
    setNewHoliday(null);
  };

  const removeHoliday = (index: number) => {
    setHolidays(holidays.filter((_, i) => i !== index));
  };

  // No longer needed

  const calculateBusinessDays = () => {
    if (!startDate || !endDate) {
      setError("Please enter both start and end dates");
      return;
    }

    const start = moment(startDate);
    const end = moment(endDate);

    if (!start.isValid() || !end.isValid()) {
      setError("Please enter valid dates");
      return;
    }

    if (start.isAfter(end)) {
      setError("End date must be after start date");
      return;
    }

    // Parse holidays
    const holidayDates = holidays.filter((h) => h.isValid());

    let businessDays = 0;
    let weekends = 0;
    let holidayCount = 0;
    let totalDays = 0;

    const current = start.clone();

    while (current.isSameOrBefore(end, "day")) {
      totalDays++;

      // Check if it's a weekend (Saturday = 6, Sunday = 0)
      if (current.day() === 0 || current.day() === 6) {
        weekends++;
      }
      // Check if it's a holiday
      else if (holidayDates.some((holiday) => holiday.isSame(current, "day"))) {
        holidayCount++;
      }
      // It's a business day
      else {
        businessDays++;
      }

      current.add(1, "day");
    }

    // Calculate business days in different scenarios
    const businessDaysExcludingHolidays = businessDays;
    const businessDaysIncludingHolidays = totalDays - weekends;

    // Calculate weeks
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    setResult({
      totalDays,
      businessDays: businessDaysExcludingHolidays,
      businessDaysWithoutHolidays: businessDaysIncludingHolidays,
      weekends,
      holidays: holidayCount,
      totalWeeks,
      remainingDays,
      startFormatted: start.format("MMMM Do, YYYY"),
      endFormatted: end.format("MMMM Do, YYYY"),
      holidayDates: holidayDates.map((h) => h.format("MMMM Do, YYYY")),
    });
    setError("");
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Business Days Calculator"
          text="Calculate working days excluding weekends and holidays."
        />

        <div className={styles.grid}>
          <DatePickerFieldWrapper
            label="Start Date:"
            selectedDate={startDate}
            onChange={setStartDate}
            required
            maxDate={endDate ? moment(endDate) : undefined}
          />
          <DatePickerFieldWrapper
            label="End Date:"
            selectedDate={endDate}
            onChange={setEndDate}
            required
            minDate={startDate ? moment(startDate) : undefined}
          />
        </div>

        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>Holidays (Optional)</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "85% 15%",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <div>
              <DatePickerField
                selectedDate={newHoliday}
                onChange={setNewHoliday}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={addHoliday}
                style={{
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  height: "auto",
                }}
              >
                Add Holiday
              </button>
            </div>
          </div>
          {holidays.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              {holidays.map((holiday, index) => {
                const dateObj = moment(holiday);
                const formatted = dateObj.isValid()
                  ? `${dateObj.format("MMMM Do, YYYY")} (${dateObj.format(
                      "dddd"
                    )})`
                  : holiday;
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                      background: "#f7f7fa",
                      borderRadius: "5px",
                      padding: "8px 12px",
                    }}
                  >
                    <span style={{ flex: 1 }}>
                      {typeof formatted === "string"
                        ? formatted
                        : formatted.toString()}
                    </span>
                    <button
                      onClick={() => removeHoliday(index)}
                      style={{
                        background: "#ff6b6b",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <ConvertButton
          onClick={calculateBusinessDays}
          disabled={false}
          label={"Calculate Business Days"}
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Business Days</div>
            <div className={styles.resultValue}>{result.businessDays} days</div>
            <div className={styles.resultDetails}>
              <div>From: {result.startFormatted}</div>
              <div>To: {result.endFormatted}</div>
              <div>Excluding weekends and holidays</div>
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
              <span className={styles.unitValue}>{result.businessDays}</span>
              <span className={styles.unitLabel}>Business Days</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.weekends}</span>
              <span className={styles.unitLabel}>Weekend Days</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.holidays}</span>
              <span className={styles.unitLabel}>Holidays</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.totalWeeks}</span>
              <span className={styles.unitLabel}>Full Weeks</span>
            </div>
          </div>
        )}

        {result && result.holidayDates.length > 0 && (
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>Holidays Excluded</div>
            <div className={styles.infoText}>
              {result.holidayDates.join(", ")}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default BusinessDaysCalculator;

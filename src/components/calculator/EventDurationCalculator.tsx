"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "./shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import HeroSection from "@/components/shared/HeroSection";
import DateTimePickerField from "@/components/shared/DatePicker/DateTimePicker";

interface DurationDetails {
  days: number;
  hours: number; // remainder hours (0–23)
  minutes: number; // remainder minutes (0–59)
  totalHours: number; // full hours
  totalMinutes: number; // full minutes
}

interface EstimatedCost {
  consultant: number;
  developer: number;
  designer: number;
  manager: number;
}

interface ProductivityResult {
  eventName: string;
  startFormatted: string; // e.g. "August 23rd, 2025 at 2:00 PM"
  endFormatted: string; // e.g. "August 23rd, 2025 at 5:30 PM"
  totalDuration: DurationDetails;
  netDuration: DurationDetails;
  breakDuration: number; // in minutes
  workingHours: number; // from calculateWorkingHours()
  efficiency: number | string; // % (string if toFixed used)
  estimatedCost: EstimatedCost; // from calculateEstimatedCost()
}

function EventDurationCalculator() {
  const [eventName, setEventName] = useState("");
  const [startDateTime, setStartDateTime] = useState<Moment | null>(null);
  const [endDateTime, setEndDateTime] = useState<Moment | null>(null);
  const [breakDuration, setBreakDuration] = useState("");
  const [result, setResult] = useState<ProductivityResult | null>(null);
  const [error, setError] = useState("");

  const calculateEventDuration = () => {
    if (!eventName || !startDateTime || !endDateTime) {
      setError("Please fill in all required fields");
      return;
    }

    const start = moment(startDateTime);
    const end = moment(endDateTime);

    if (!start.isValid() || !end.isValid()) {
      setError("Please enter valid date and time");
      return;
    }

    if (start.isAfter(end)) {
      setError("End time must be after start time");
      return;
    }

    const totalDuration = moment.duration(end.diff(start));
    const breakMinutes = parseInt(breakDuration) || 0;
    const netDuration = moment.duration(
      totalDuration.asMinutes() - breakMinutes,
      "minutes"
    );

    const totalDays = Math.floor(totalDuration.asDays());
    const totalHours = Math.floor(totalDuration.asHours());
    const totalMinutes = Math.floor(totalDuration.asMinutes());

    const netDays = Math.floor(netDuration.asDays());
    const netHours = Math.floor(netDuration.asHours());
    const netMinutesTotal = Math.floor(netDuration.asMinutes());

    // Calculate cost if hourly rate is considered
    const estimatedCost = calculateEstimatedCost(netHours);

    // Calculate productivity metrics
    const workingHours = calculateWorkingHours(start, end);
    const efficiency =
      breakMinutes > 0
        ? ((netMinutesTotal / totalMinutes) * 100).toFixed(1)
        : 100;

    setResult({
      eventName,
      startFormatted: start.format("MMMM Do, YYYY [at] h:mm A"),
      endFormatted: end.format("MMMM Do, YYYY [at] h:mm A"),
      totalDuration: {
        days: totalDays,
        hours: totalHours % 24,
        minutes: totalMinutes % 60,
        totalHours,
        totalMinutes,
      },
      netDuration: {
        days: netDays,
        hours: netHours % 24,
        minutes: netMinutesTotal % 60,
        totalHours: netHours,
        totalMinutes: netMinutesTotal,
      },
      breakDuration: breakMinutes,
      workingHours,
      efficiency,
      estimatedCost,
    });
    setError("");
  };

  const calculateWorkingHours = (start: moment.Moment, end: moment.Moment) => {
    let workingHours = 0;
    const current = start.clone();

    while (current.isBefore(end)) {
      if (current.day() >= 1 && current.day() <= 5) {
        const dayStart = current.clone().hour(9).minute(0);
        const dayEnd = current.clone().hour(17).minute(0);

        const periodStart = moment.max(current, dayStart);
        const periodEnd = moment.min(end, dayEnd);

        if (periodStart.isBefore(periodEnd)) {
          workingHours += periodEnd.diff(periodStart, "hours", true);
        }
      }
      current.add(1, "day").hour(0).minute(0);
    }

    return Math.round(workingHours * 100) / 100;
  };

  const calculateEstimatedCost = (hours: number) => {
    const rates = {
      consultant: 150,
      developer: 75,
      designer: 65,
      manager: 85,
    };

    return {
      consultant: hours * rates.consultant,
      developer: hours * rates.developer,
      designer: hours * rates.designer,
      manager: hours * rates.manager,
    };
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Event Duration Calculator"
          text="Calculate duration and metrics for events or project timelines"
        />
        <section className={homeStyle.sectionWrapper}>
          <div className={styles.inputGroup}>
            <h3 className={homeStyle.normalTitle}>Event/Project Name:</h3>

            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className={styles.input}
              placeholder="Enter event or project name"
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <DateTimePickerField
                label="Start Date & Time:"
                selectedDateTime={startDateTime}
                onChange={setStartDateTime}
              />
            </div>
            <div className={styles.inputGroup}>
              <DateTimePickerField
                label="End Date & Time:"
                selectedDateTime={endDateTime}
                onChange={setEndDateTime}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <h3 className={homeStyle.normalTitle}>
              Break Duration (minutes) - Optional:
            </h3>

            <input
              type="number"
              min="0"
              value={breakDuration}
              onChange={(e) => setBreakDuration(e.target.value)}
              className={styles.input}
              placeholder="0"
            />
          </div>
        </section>

        <ConvertButton
          onClick={calculateEventDuration}
          disabled={false}
          label={"Calculate Event Duration"}
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>{result.eventName}</div>
            <div className={styles.resultValue}>
              {result.netDuration.totalHours}h {result.netDuration.minutes}m
            </div>
            <div className={styles.resultDetails}>
              <div>From: {result.startFormatted}</div>
              <div>To: {result.endFormatted}</div>
              <div>Net Duration: {result.netDuration.totalMinutes} minutes</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>
                {result.totalDuration.totalHours}
              </span>
              <span className={styles.unitLabel}>Total Hours</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>
                {result.netDuration.totalHours}
              </span>
              <span className={styles.unitLabel}>Net Hours</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.breakDuration}</span>
              <span className={styles.unitLabel}>Break Minutes</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.workingHours}</span>
              <span className={styles.unitLabel}>Business Hours</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.efficiency}%</span>
              <span className={styles.unitLabel}>Efficiency</span>
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: "2.5rem",
          }}
        ></div>
        {result && (
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>Estimated Costs (USD)</div>
            <div className={styles.infoText}>
              <div>
                Consultant Rate ($150/hr): $
                {result.estimatedCost.consultant.toLocaleString()}
              </div>
              <div>
                Developer Rate ($75/hr): $
                {result.estimatedCost.developer.toLocaleString()}
              </div>
              <div>
                Designer Rate ($65/hr): $
                {result.estimatedCost.designer.toLocaleString()}
              </div>
              <div>
                Manager Rate ($85/hr): $
                {result.estimatedCost.manager.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>Event Duration Analysis</div>
          <div className={styles.infoText}>
            This calculator helps you analyze event or project durations,
            including break times, business hours, efficiency metrics, and
            estimated costs based on different hourly rates.
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventDurationCalculator;

"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "./shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerField from "../shared/DatePicker/DatePicker";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import CustomSelectField from "@/components/shared/CustomSelectBox/CustomSelectBox";

interface Milestone {
  week: number;
  event: string;
}

interface PregnancyResult {
  conceptionDate: string; // formatted date string e.g. "March 15th, 2025"
  dueDate: string; // formatted date string e.g. "December 20th, 2025"
  dueDateDay: string; // day of the week e.g. "Sunday"
  weeksPregnant: number; // number of weeks since conception
  daysIntoWeek: number; // days into the current week
  totalDaysPregnant: number; // total number of days pregnant so far
  daysUntilDue: number; // remaining days until due date
  currentTrimester: string; // e.g. "First Trimester", "Second Trimester"
  upcomingMilestones: Milestone[]; // list of milestone descriptions
  isOverdue: boolean; // true if due date has passed
  percentComplete: string; // percentage string like "57.5"
}

function PregnancyCalculator() {
  const [lastPeriod, setLastPeriod] = useState<Moment | null>(null);
  const [cycleLength, setCycleLength] = useState("28");
  const [calculationType, setCalculationType] = useState("lmp");
  const [conceptionDate, setConceptionDate] = useState<Moment | null>(null);
  const [result, setResult] = useState<PregnancyResult | null>(null);
  const [error, setError] = useState("");

  const calculatePregnancy = () => {
    let conception, dueDate;

    if (calculationType === "lmp") {
      if (!lastPeriod) {
        setError("Please enter your last menstrual period date");
        return;
      }
      const lmp = moment(lastPeriod);
      if (!lmp.isValid()) {
        setError("Please enter a valid date");
        return;
      }

      conception = lmp.clone().add(14, "days");
      dueDate = lmp.clone().add(280, "days");
    } else {
      if (!conceptionDate) {
        setError("Please enter the conception date");
        return;
      }
      conception = moment(conceptionDate);
      if (!conception.isValid()) {
        setError("Please enter a valid conception date");
        return;
      }

      dueDate = conception.clone().add(266, "days");
    }

    const today = moment();
    const weeksPregnant = today.diff(conception, "weeks");
    const daysIntoWeek = today.diff(
      conception.clone().add(weeksPregnant, "weeks"),
      "days"
    );
    const totalDaysPregnant = today.diff(conception, "days");
    const daysUntilDue = dueDate.diff(today, "days");

    const trimesters = {
      first: { start: 0, end: 13, name: "First Trimester" },
      second: { start: 14, end: 27, name: "Second Trimester" },
      third: { start: 28, end: 42, name: "Third Trimester" },
    };

    let currentTrimester = "Not pregnant yet";
    if (weeksPregnant >= 0) {
      if (weeksPregnant <= 13) currentTrimester = trimesters.first.name;
      else if (weeksPregnant <= 27) currentTrimester = trimesters.second.name;
      else currentTrimester = trimesters.third.name;
    }

    const milestones = [
      { week: 4, event: "Missed period" },
      { week: 6, event: "Heartbeat detectable" },
      { week: 12, event: "End of first trimester" },
      { week: 20, event: "Anatomy scan" },
      { week: 24, event: "Viability milestone" },
      { week: 28, event: "Third trimester begins" },
      { week: 36, event: "Baby considered full-term soon" },
      { week: 40, event: "Due date" },
    ];

    const upcomingMilestones = milestones
      .filter((m) => m.week > weeksPregnant)
      .slice(0, 3);

    setResult({
      conceptionDate: conception.format("MMMM Do, YYYY"),
      dueDate: dueDate.format("MMMM Do, YYYY"),
      dueDateDay: dueDate.format("dddd"),
      weeksPregnant: Math.max(0, weeksPregnant),
      daysIntoWeek,
      totalDaysPregnant: Math.max(0, totalDaysPregnant),
      daysUntilDue: Math.max(0, daysUntilDue),
      currentTrimester,
      upcomingMilestones,
      isOverdue: daysUntilDue < 0,
      percentComplete: Math.min(
        100,
        Math.max(0, (totalDaysPregnant / 280) * 100)
      ).toFixed(1),
    });
    setError("");
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Pregnancy Due Date Calculator"
          text="Calculate your pregnancy due date and track milestones."
        />

        <section className={homeStyle.sectionWrapper}>
          <div className={styles.inputGroup}>
            <CustomSelectField
              label="Calculation Method:"
              options={[
                { label: "Last Menstrual Period (LMP)", value: "lmp" },
                { label: "Conception Date", value: "conception" },
              ]}
              value={calculationType}
              onChange={setCalculationType}
            />
          </div>
          {calculationType === "lmp" ? (
            <>
              <div className={styles.inputGroup}>
                <DatePickerField
                  label="Last Menstrual Period Date:"
                  selectedDate={lastPeriod}
                  onChange={setLastPeriod}
                  required
                  maxDate={moment()}
                  error={error}
                />
              </div>
              <div className={styles.inputGroup}>
                <div className={homeStyle.normalTitle}>
                  Average Cycle Length (days):
                </div>

                <input
                  type="number"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className={styles.input}
                />
              </div>
            </>
          ) : (
            <div className={styles.inputGroup}>
              <DatePickerField
                label="Conception Date:"
                selectedDate={conceptionDate}
                onChange={setConceptionDate}
                required
                maxDate={moment()}
                error={error}
              />
            </div>
          )}
        </section>

        <ConvertButton
          onClick={calculatePregnancy}
          disabled={false}
          label={"Calculate Due Date"}
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Due Date</div>
            <div className={styles.resultValue}>{result.dueDate}</div>
            <div className={styles.resultDetails}>
              <div>Due Day: {result.dueDateDay}</div>
              <div>Conception: {result.conceptionDate}</div>
              <div>
                {result.isOverdue ? "Overdue by" : "Days until due"}:{" "}
                {result.daysUntilDue}
              </div>
            </div>
          </div>
        )}

        {result && result.weeksPregnant >= 0 && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>Current Progress</div>
            <div className={styles.countdownNumber}>
              {result.weeksPregnant} weeks {result.daysIntoWeek} days
            </div>
            <div>{result.currentTrimester}</div>
            <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
              {result.percentComplete}% Complete
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.weeksPregnant}</span>
              <span className={styles.unitLabel}>Weeks Pregnant</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>
                {result.totalDaysPregnant}
              </span>
              <span className={styles.unitLabel}>Days Pregnant</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.daysUntilDue}</span>
              <span className={styles.unitLabel}>Days Until Due</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>
                {result.percentComplete}%
              </span>
              <span className={styles.unitLabel}>Complete</span>
            </div>
          </div>
        )}

        {result && result.upcomingMilestones.length > 0 && (
          <section className={homeStyle.sectionWrapper}>
            <div className={homeStyle.normalTitle}>Upcoming Milestones</div>
            <div className={styles.infoText}>
              {result.upcomingMilestones.map((milestone, index) => (
                <div key={index} style={{ marginBottom: "5px" }}>
                  Week {milestone.week}: {milestone.event}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>Important Note</h3>

          <p className={homeStyle.normalText}>
            {`This calculator provides estimates based on standard pregnancy
            calculations. Always consult with your healthcare provider for
            accurate medical information and personalized care.`}
          </p>
        </section>
      </main>
    </div>
  );
}

export default PregnancyCalculator;

"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "../shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerField from "@/components/shared/DatePicker/DatePicker";
import LoadingSpinner from "@/components/ai-writer/LoadingSpinner";
import ConvertButton from "@/components/ai-writer/ConvertButton";

interface NextPhase {
  name: string;
  icon: string;
  date: string;
  daysAway: number;
}

interface MoonPhaseResult {
  inputDate: string;
  phaseName: string;
  phaseIcon: string;
  illumination: number;
  phaseDescription: string;
  daysSinceNewMoon: number;
  lunarCycle: number;
  nextPhases: NextPhase[];
  isFullMoon: boolean;
  isNewMoon: boolean;
}

function MoonPhaseCalculator() {
  const [inputDate, setInputDate] = useState<Moment | null>(null);
  const [result, setResult] = useState<MoonPhaseResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateMoonPhase = () => {
    setIsLoading(true);
    const date = moment(inputDate);
    if (!date.isValid()) {
      setError("Please enter a valid date");
      setIsLoading(false);
      return;
    }

    // Moon phase calculation using astronomical algorithms
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    // Calculate Julian Day Number
    const a = Math.floor((14 - month) / 12);
    const y = year - a;
    const m = month + 12 * a - 3;
    const jd =
      day +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) +
      1721119;

    // Calculate moon phase
    const daysSinceNewMoon = (jd - 2451549.5) % 29.53058867;
    const phase = daysSinceNewMoon / 29.53058867;

    let phaseName, phaseIcon, illumination, phaseDescription;

    if (phase < 0.0625 || phase >= 0.9375) {
      phaseName = "New Moon";
      phaseIcon = "🌑";
      illumination = 0;
      phaseDescription = "The moon is not visible from Earth";
    } else if (phase < 0.1875) {
      phaseName = "Waxing Crescent";
      phaseIcon = "🌒";
      illumination = Math.round(phase * 4 * 25);
      phaseDescription = "A thin crescent of light appears on the right side";
    } else if (phase < 0.3125) {
      phaseName = "First Quarter";
      phaseIcon = "🌓";
      illumination = 50;
      phaseDescription = "Half of the moon is illuminated on the right side";
    } else if (phase < 0.4375) {
      phaseName = "Waxing Gibbous";
      phaseIcon = "🌔";
      illumination = Math.round(50 + (phase - 0.25) * 4 * 25);
      phaseDescription = "More than half illuminated, growing larger";
    } else if (phase < 0.5625) {
      phaseName = "Full Moon";
      phaseIcon = "🌕";
      illumination = 100;
      phaseDescription = "The entire face of the moon is illuminated";
    } else if (phase < 0.6875) {
      phaseName = "Waning Gibbous";
      phaseIcon = "🌖";
      illumination = Math.round(100 - (phase - 0.5) * 4 * 25);
      phaseDescription = "More than half illuminated, shrinking";
    } else if (phase < 0.8125) {
      phaseName = "Last Quarter";
      phaseIcon = "🌗";
      illumination = 50;
      phaseDescription = "Half of the moon is illuminated on the left side";
    } else {
      phaseName = "Waning Crescent";
      phaseIcon = "🌘";
      illumination = Math.round((1 - phase) * 4 * 25);
      phaseDescription = "A thin crescent of light appears on the left side";
    }

    // Calculate next major phases
    const nextPhases = [];
    const phaseNames = [
      "New Moon",
      "First Quarter",
      "Full Moon",
      "Last Quarter",
    ];
    const phaseIcons = ["🌑", "🌓", "🌕", "🌗"];

    for (let i = 0; i < 4; i++) {
      const targetPhase = i * 0.25;
      let daysToPhase;

      if (targetPhase > phase) {
        daysToPhase = (targetPhase - phase) * 29.53058867;
      } else {
        daysToPhase = (1 - phase + targetPhase) * 29.53058867;
      }

      const phaseDate = date.clone().add(Math.round(daysToPhase), "days");
      nextPhases.push({
        name: phaseNames[i],
        icon: phaseIcons[i],
        date: phaseDate.format("MMMM Do, YYYY"),
        daysAway: Math.round(daysToPhase),
      });
    }

    // Sort by days away
    nextPhases.sort((a, b) => a.daysAway - b.daysAway);

    setResult({
      inputDate: date.format("MMMM Do, YYYY"),
      phaseName,
      phaseIcon,
      illumination,
      phaseDescription,
      daysSinceNewMoon: Math.round(daysSinceNewMoon * 10) / 10,
      lunarCycle: Math.round(phase * 100),
      nextPhases: nextPhases.slice(0, 4),
      isFullMoon: phaseName === "Full Moon",
      isNewMoon: phaseName === "New Moon",
    });
    setError("");
    setIsLoading(false);
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Moon Phase Calculator"
          text="Calculate the current moon phase and its illumination."
        />

        <DatePickerField
          label="Select Date:"
          selectedDate={inputDate}
          onChange={setInputDate}
          required
          error={error}
        />

        {isLoading ? (
          <LoadingSpinner isVisible={isLoading} text={"Loading....."} />
        ) : (
          <ConvertButton
            onClick={calculateMoonPhase}
            disabled={isLoading}
            label={"Calculate Moon Phase"}
          />
        )}

        {result && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>Moon Phase</div>
            <div style={{ fontSize: "4rem", margin: "20px 0" }}>
              {result.phaseIcon}
            </div>
            <div
              className={styles.countdownNumber}
              style={{ fontSize: "2rem" }}
            >
              {result.phaseName}
            </div>
            <div style={{ marginTop: "15px" }}>{result.inputDate}</div>
            <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
              {result.illumination}% Illuminated
            </div>
          </div>
        )}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Lunar Information</div>
            <div className={styles.resultDetails}>
              <div>{result.phaseDescription}</div>
              <div>Days since new moon: {result.daysSinceNewMoon}</div>
              <div>Lunar cycle progress: {result.lunarCycle}%</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={homeStyle.heroTitle}>
                {result.illumination}%
              </span>
              <span className={homeStyle.normalText}>Illuminated</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={homeStyle.heroTitle}>
                {result.daysSinceNewMoon}
              </span>
              <span className={homeStyle.normalText}>Days Since New</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={homeStyle.heroTitle}>{result.lunarCycle}%</span>
              <span className={homeStyle.normalText}>Cycle Progress</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={homeStyle.heroTitle}>29.5</span>
              <span className={homeStyle.normalText}>Days Per Cycle</span>
            </div>
          </div>
        )}

        {result && (
          <section className={homeStyle.sectionWrapper}>
            <div className={homeStyle.normalTitle}>Upcoming Moon Phases</div>
            <div className={styles.infoText}>
              {result.nextPhases.map((phase, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span className={homeStyle.normalText}>
                    {phase.icon} {phase.name}
                  </span>
                  <span className={homeStyle.normalText}>
                    {phase.date} ({phase.daysAway} days)
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>About Moon Phases</h3>

          <p className={homeStyle.normalText}>
            {`Moon phases are caused by the changing positions of the Moon, Earth,
            and Sun. The lunar cycle takes approximately 29.5 days to complete,
            during which the Moon goes through eight distinct phases from New
            Moon to Full Moon and back.`}
          </p>
        </section>
      </main>
    </div>
  );
}

export default MoonPhaseCalculator;

"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "./shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerFieldWrapper from "@/components/shared/DatePicker/DatePickerWrapper";

interface RelevantEvent {
  year: number;
  event: string;
}

interface PeriodAge {
  age: number;
  name: string;
  startYear: number;
}

interface HinduCalendar {
  vikramSamvat: number;
  shakaSamvat: number;
  kaliyuga: number;
  masa: string; // Hindu month
  paksha: string; // Shukla/Krishna paksha
  tithi: string; // Lunar day
  nakshatra: string; // Star constellation
  rashi: string; // Zodiac sign
}

interface PlanetPosition {
  name: string;
  longitude: number;
  sign: string;
  degree: string;
}

interface MoonPhase {
  phase: string;
  illumination: number;
  age: number; // days since new moon
  nextNewMoon: string;
  nextFullMoon: string;
}

interface DateResult {
  inputDate: string;
  dayName: string;
  dayOfYear: number;
  weekOfYear: number;
  isLeapYear: boolean;
  daysInMonth: number;
  daysInYear: number;
  julianDay: number;
  romanDay: string;
  romanMonth: string;
  romanYear: string;
  relevantEvents: RelevantEvent[];
  periodAges: PeriodAge[];
  century: number;
  millennium: number;
  decade: number;
  yearProgress: string;
  hinduCalendar: HinduCalendar;
  moonPhase: MoonPhase;
  planetPositions: PlanetPosition[];
  sunriseTime: string;
  sunsetTime: string;
  dayLength: string;
  season: string;
}

function HistoricalDateCalculator() {
  const [inputDate, setInputDate] = useState<Moment | null>(null);
  const [result, setResult] = useState<DateResult | null>(null);

  // Hindu calendar calculations
  const calculateHinduCalendar = (date: moment.Moment): HinduCalendar => {
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    // Vikram Samvat (starts 57 BCE)
    const vikramSamvat = year + 57;

    // Shaka Samvat (starts 78 CE)
    const shakaSamvat = year - 78;

    // Kali Yuga (starts 3102 BCE)
    const kaliyuga = year + 3102;

    // Simplified Hindu months (approximate)
    const hinduMonths = [
      "Chaitra",
      "Vaishakha",
      "Jyeshtha",
      "Ashadha",
      "Shravana",
      "Bhadrapada",
      "Ashwina",
      "Kartika",
      "Margashirsha",
      "Pausha",
      "Magha",
      "Phalguna",
    ];

    // Approximate lunar day calculation
    const daysSinceNewMoon = (date.valueOf() / 86400000) % 29.53 | 0;
    const paksha = daysSinceNewMoon < 15 ? "Shukla Paksha" : "Krishna Paksha";
    const tithiNumber =
      daysSinceNewMoon < 15 ? daysSinceNewMoon + 1 : 29 - daysSinceNewMoon;

    const tithiNames = [
      "Pratipada",
      "Dwitiya",
      "Tritiya",
      "Chaturthi",
      "Panchami",
      "Shashthi",
      "Saptami",
      "Ashtami",
      "Navami",
      "Dashami",
      "Ekadashi",
      "Dwadashi",
      "Trayodashi",
      "Chaturdashi",
      "Purnima/Amavasya",
    ];

    // Nakshatras (27 lunar mansions)
    const nakshatras = [
      "Ashwini",
      "Bharani",
      "Krittika",
      "Rohini",
      "Mrigashira",
      "Ardra",
      "Punarvasu",
      "Pushya",
      "Ashlesha",
      "Magha",
      "Purva Phalguni",
      "Uttara Phalguni",
      "Hasta",
      "Chitra",
      "Swati",
      "Vishakha",
      "Anuradha",
      "Jyeshtha",
      "Mula",
      "Purva Ashadha",
      "Uttara Ashadha",
      "Shravana",
      "Dhanishta",
      "Shatabhisha",
      "Purva Bhadrapada",
      "Uttara Bhadrapada",
      "Revati",
    ];

    // Rashis (12 zodiac signs)
    const rashis = [
      "Mesha",
      "Vrishabha",
      "Mithuna",
      "Karka",
      "Simha",
      "Kanya",
      "Tula",
      "Vrishchika",
      "Dhanu",
      "Makara",
      "Kumbha",
      "Meena",
    ];

    const nakshatraIndex = Math.floor((date.dayOfYear() * 27) / 365) % 27;
    const rashiIndex = Math.floor((month - 1 + (day > 15 ? 1 : 0)) % 12);

    return {
      vikramSamvat,
      shakaSamvat,
      kaliyuga,
      masa: hinduMonths[(month - 1) % 12],
      paksha,
      tithi: tithiNames[Math.min(tithiNumber - 1, 14)],
      nakshatra: nakshatras[nakshatraIndex],
      rashi: rashis[rashiIndex],
    };
  };

  // Moon phase calculations
  const calculateMoonPhase = (date: moment.Moment): MoonPhase => {
    const daysSinceNewMoon = (date.valueOf() / 86400000) % 29.53;
    const age = Math.floor(daysSinceNewMoon);

    let phase = "";
    let illumination = 0;

    if (age < 1) {
      phase = "New Moon";
      illumination = 0;
    } else if (age < 7) {
      phase = "Waxing Crescent";
      illumination = (age / 14.75) * 50;
    } else if (age < 8) {
      phase = "First Quarter";
      illumination = 50;
    } else if (age < 15) {
      phase = "Waxing Gibbous";
      illumination = 50 + ((age - 7) / 7.75) * 50;
    } else if (age < 16) {
      phase = "Full Moon";
      illumination = 100;
    } else if (age < 22) {
      phase = "Waning Gibbous";
      illumination = 100 - ((age - 15) / 7) * 50;
    } else if (age < 23) {
      phase = "Last Quarter";
      illumination = 50;
    } else {
      phase = "Waning Crescent";
      illumination = 50 - ((age - 22) / 7.5) * 50;
    }

    const nextNewMoon = moment(date)
      .add(29.53 - daysSinceNewMoon, "days")
      .format("MMMM Do");
    const nextFullMoon = moment(date)
      .add((14.75 - daysSinceNewMoon + 29.53) % 29.53, "days")
      .format("MMMM Do");

    return {
      phase,
      illumination: Math.round(illumination),
      age,
      nextNewMoon,
      nextFullMoon,
    };
  };

  // Simplified planet positions (approximation for demonstration)
  const calculatePlanetPositions = (date: moment.Moment): PlanetPosition[] => {
    const signs = [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ];

    const daysSinceEpoch = date.valueOf() / 86400000;

    const planets = [
      { name: "Sun", period: 365.25, offset: 80 },
      { name: "Moon", period: 27.32, offset: 0 },
      { name: "Mercury", period: 87.97, offset: 45 },
      { name: "Venus", period: 224.7, offset: 120 },
      { name: "Mars", period: 686.98, offset: 200 },
      { name: "Jupiter", period: 4332.59, offset: 300 },
      { name: "Saturn", period: 10759.22, offset: 30 },
    ];

    return planets.map((planet) => {
      const longitude =
        ((daysSinceEpoch / planet.period) * 360 + planet.offset) % 360;
      const signIndex = Math.floor(longitude / 30);
      const degree = (longitude % 30).toFixed(1);

      return {
        name: planet.name,
        longitude: Math.round(longitude),
        sign: signs[signIndex],
        degree: `${degree}°`,
      };
    });
  };

  // Calculate sunrise/sunset times (simplified)
  const calculateSunTimes = (date: moment.Moment) => {
    const dayOfYear = date.dayOfYear();
    const latitude = 28.6139; // Delhi latitude as default

    // Simplified calculation - in reality you'd use more complex formulas
    const declination =
      23.45 * Math.sin((((360 * (284 + dayOfYear)) / 365) * Math.PI) / 180);
    const hourAngle = Math.acos(
      -Math.tan((latitude * Math.PI) / 180) *
        Math.tan((declination * Math.PI) / 180)
    );

    const sunriseHour = 12 - (hourAngle * 180) / Math.PI / 15;
    const sunsetHour = 12 + (hourAngle * 180) / Math.PI / 15;

    const sunrise = moment()
      .hour(Math.floor(sunriseHour))
      .minute((sunriseHour % 1) * 60)
      .format("h:mm A");
    const sunset = moment()
      .hour(Math.floor(sunsetHour))
      .minute((sunsetHour % 1) * 60)
      .format("h:mm A");
    const dayLength = `${Math.floor(sunsetHour - sunriseHour)}h ${Math.round(
      ((sunsetHour - sunriseHour) % 1) * 60
    )}m`;

    return { sunrise, sunset, dayLength };
  };

  // Determine season
  const getSeason = (date: moment.Moment): string => {
    const month = date.month() + 1;
    const day = date.date();

    if (
      (month === 12 && day >= 21) ||
      month === 1 ||
      month === 2 ||
      (month === 3 && day < 20)
    ) {
      return "Winter";
    } else if (
      (month === 3 && day >= 20) ||
      month === 4 ||
      month === 5 ||
      (month === 6 && day < 21)
    ) {
      return "Spring";
    } else if (
      (month === 6 && day >= 21) ||
      month === 7 ||
      month === 8 ||
      (month === 9 && day < 22)
    ) {
      return "Summer";
    } else {
      return "Autumn";
    }
  };

  const calculateHistoricalInfo = () => {
    const date = moment(inputDate);
    if (!date.isValid()) return;

    const dayOfYear = date.dayOfYear();
    const weekOfYear = date.week();
    const isLeapYear = date.isLeapYear();
    const daysInMonth = date.daysInMonth();
    const daysInYear = isLeapYear ? 366 : 365;

    const julianDay = date.valueOf() / 86400000 + 2440587.5;

    const romanNumerals = (num: number) => {
      const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      const symbols = [
        "M",
        "CM",
        "D",
        "CD",
        "C",
        "XC",
        "L",
        "XL",
        "X",
        "IX",
        "V",
        "IV",
        "I",
      ];
      let result = "";
      for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
          result += symbols[i];
          num -= values[i];
        }
      }
      return result;
    };

    const historicalEvents = [
      { year: 1969, event: "Moon Landing" },
      { year: 1989, event: "Fall of Berlin Wall" },
      { year: 2000, event: "Y2K Millennium" },
      { year: 2001, event: "9/11 Attacks" },
      { year: 2008, event: "Global Financial Crisis" },
      { year: 2020, event: "COVID-19 Pandemic" },
    ];

    const relevantEvents = historicalEvents.filter(
      (event) => Math.abs(event.year - date.year()) <= 5
    );

    const historicalPeriods = [
      { name: "Internet Era", startYear: 1991 },
      { name: "Space Age", startYear: 1957 },
      { name: "Computer Age", startYear: 1946 },
      { name: "Modern Era", startYear: 1500 },
      { name: "Common Era", startYear: 1 },
    ];

    const periodAges = historicalPeriods.map((period) => ({
      ...period,
      age: Math.max(0, date.year() - period.startYear),
    }));

    const hinduCalendar = calculateHinduCalendar(date);
    const moonPhase = calculateMoonPhase(date);
    const planetPositions = calculatePlanetPositions(date);
    const sunTimes = calculateSunTimes(date);
    const season = getSeason(date);

    setResult({
      inputDate: date.format("MMMM Do, YYYY"),
      dayName: date.format("dddd"),
      dayOfYear,
      weekOfYear,
      isLeapYear,
      daysInMonth,
      daysInYear,
      julianDay: Math.floor(julianDay),
      romanDay: romanNumerals(date.date()),
      romanMonth: romanNumerals(date.month() + 1),
      romanYear: romanNumerals(date.year()),
      relevantEvents,
      periodAges,
      century: Math.ceil(date.year() / 100),
      millennium: Math.ceil(date.year() / 1000),
      decade: Math.floor(date.year() / 10) * 10,
      yearProgress: ((dayOfYear / daysInYear) * 100).toFixed(1),
      hinduCalendar,
      moonPhase,
      planetPositions,
      sunriseTime: sunTimes.sunrise,
      sunsetTime: sunTimes.sunset,
      dayLength: sunTimes.dayLength,
      season,
    });
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Historical Date Calculator"
          text="Calculate dates in different calendar systems, astrological
          information, and historical context"
        />

        <DatePickerFieldWrapper
          label="Select Date:"
          selectedDate={inputDate}
          onChange={setInputDate}
          required
          maxDate={moment()}
          error={""}
        />

        <ConvertButton
          onClick={calculateHistoricalInfo}
          disabled={false}
          label={"Analyze Historical Date"}
        />

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Date Analysis</div>
            <div className={styles.resultValue}>{result.inputDate}</div>
            <div className={styles.resultDetails}>
              <div>
                {result.dayName} • {result.season}
              </div>
              <div>
                Day {result.dayOfYear} of {result.daysInYear}
              </div>
              <div>Week {result.weekOfYear} of the year</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.century}</span>
              <span className={styles.unitLabel}>Century</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.millennium}</span>
              <span className={styles.unitLabel}>Millennium</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.decade}s</span>
              <span className={styles.unitLabel}>Decade</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.julianDay}</span>
              <span className={styles.unitLabel}>Julian Day</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.yearProgress}%</span>
              <span className={styles.unitLabel}>Year Progress</span>
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: "2.5rem",
          }}
        ></div>
        {/* <div className={styles.grid}> */}
        {result && (
          <div className={styles.grid}>
            {/* Hindu Calendar Information */}
            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>
                🕉️ Hindu Calendar (Panchang)
              </div>
              <div className={styles.infoText}>
                <div>
                  <strong>Vikram Samvat:</strong>{" "}
                  {result.hinduCalendar.vikramSamvat}
                </div>
                <div>
                  <strong>Shaka Samvat:</strong>{" "}
                  {result.hinduCalendar.shakaSamvat}
                </div>
                <div>
                  <strong>Kali Yuga:</strong> {result.hinduCalendar.kaliyuga}
                </div>
                <div>
                  <strong>Masa:</strong> {result.hinduCalendar.masa}
                </div>
                <div>
                  <strong>Paksha:</strong> {result.hinduCalendar.paksha}
                </div>
                <div>
                  <strong>Tithi:</strong> {result.hinduCalendar.tithi}
                </div>
                <div>
                  <strong>Nakshatra:</strong> {result.hinduCalendar.nakshatra}
                </div>
                <div>
                  <strong>Rashi:</strong> {result.hinduCalendar.rashi}
                </div>
              </div>
            </div>

            {/* Planetary Positions */}
            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>🪐 Planetary Positions</div>
              <div className={styles.infoText}>
                {result.planetPositions.map((planet, index) => (
                  <div key={index}>
                    <strong>{planet.name}:</strong> {planet.degree} in{" "}
                    {planet.sign}
                  </div>
                ))}
              </div>
            </div>

            {/* Moon Phase Information */}
            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>🌙 Moon Phase</div>
              <div className={styles.infoText}>
                <div>
                  <strong>Phase:</strong> {result.moonPhase.phase}
                </div>
                <div>
                  <strong>Illumination:</strong> {result.moonPhase.illumination}
                  %
                </div>
                <div>
                  <strong>Age:</strong> {result.moonPhase.age} days
                </div>
                <div>
                  <strong>Next New Moon:</strong> {result.moonPhase.nextNewMoon}
                </div>
                <div>
                  <strong>Next Full Moon:</strong>{" "}
                  {result.moonPhase.nextFullMoon}
                </div>
              </div>
            </div>

            {/* historical period */}
            {result.periodAges.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.infoTitle}>Historical Periods</div>
                <div className={styles.infoText}>
                  {result.periodAges.map((period, index) => (
                    <div key={index}>
                      {period.name}: {period.age} years old
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sun Information */}
            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>☀️ Solar Information</div>
              <div className={styles.infoText}>
                <div>
                  <strong>Sunrise:</strong> {result.sunriseTime}
                </div>
                <div>
                  <strong>Sunset:</strong> {result.sunsetTime}
                </div>
                <div>
                  <strong>Day Length:</strong> {result.dayLength}
                </div>
                <div>
                  <strong>Season:</strong> {result.season}
                </div>
              </div>
            </div>

            {/* Calendar Information */}
            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>Calendar Information</div>
              <div className={styles.infoText}>
                <div>Days in this month: {result.daysInMonth}</div>
                <div>Days in this year: {result.daysInYear}</div>
                <div>Leap year: {result.isLeapYear ? "Yes" : "No"}</div>
              </div>
            </div>

            {/* Roman Numerals */}
            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>Roman Numerals</div>
              <div className={styles.infoText}>
                <div>Day: {result.romanDay}</div>
                <div>Month: {result.romanMonth}</div>
                <div>Year: {result.romanYear}</div>
              </div>
            </div>

            {/* historical events */}
            {result.relevantEvents.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.infoTitle}>
                  Historical Events (±5 years)
                </div>
                <div className={styles.infoText}>
                  {result.relevantEvents.map((event, index) => (
                    <div key={index}>
                      {event.year}: {event.event}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {/* </div> */}
      </main>
    </div>
  );
}

export default HistoricalDateCalculator;

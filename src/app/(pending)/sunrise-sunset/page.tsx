"use client";

import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import styles from "../shared.module.css";
import Navigation from "../../(calculator)/Navigation";

interface SolarResult {
  inputDate: string; // formatted date, e.g. "August 20th, 2025"
  location: string; // "lat°, lng°"
  sunrise: string; // sunrise time string
  sunset: string; // sunset time string
  solarNoon: string; // solar noon time string
  daylightHours: string; // hours of daylight, formatted with .toFixed(2)
  nightHours: string; // hours of night, formatted with .toFixed(2)
  civilTwilightMorning: string; // morning twilight time
  civilTwilightEvening: string; // evening twilight time
  season: string; // e.g. "Summer", "Winter"
  dayLengthComparison: string; // description like "longer than yesterday"
  dayOfYear: number; // 1–365/366
  isLongDay: boolean; // true if daylight > 12 hours
  timezone: string; // e.g. "UTC+5.5"
}

type PresetLocationKey = "new-york" | "london" | "tokyo" | "sydney" | "paris";

interface LocationInfo {
  lat: string;
  lng: string;
  tz: string;
  name: string;
}

const locations: Record<PresetLocationKey, LocationInfo> = {
  "new-york": { lat: "40.7128", lng: "-74.0060", tz: "-5", name: "New York" },
  london: { lat: "51.5074", lng: "-0.1278", tz: "0", name: "London" },
  tokyo: { lat: "35.6762", lng: "139.6503", tz: "+9", name: "Tokyo" },
  sydney: { lat: "-33.8688", lng: "151.2093", tz: "+10", name: "Sydney" },
  paris: { lat: "48.8566", lng: "2.3522", tz: "+1", name: "Paris" },
};

function SunriseSunsetCalculator() {
  const [inputDate, setInputDate] = useState(moment().format("YYYY-MM-DD"));
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.0060");
  const [timezone, setTimezone] = useState("-5");
  const [result, setResult] = useState<SolarResult | null>(null);

  const calculateSunTimes = () => {
    const date = moment(inputDate);
    if (!date.isValid()) return;

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const tz = parseFloat(timezone);

    // Simplified sunrise/sunset calculation
    const dayOfYear = date.dayOfYear();
    const P = Math.asin(
      0.39795 * Math.cos((0.98563 * (dayOfYear - 173) * Math.PI) / 180)
    );

    const argument = -Math.tan((lat * Math.PI) / 180) * Math.tan(P);
    let hourAngle;

    if (argument < -1) {
      hourAngle = Math.PI; // Midnight sun
    } else if (argument > 1) {
      hourAngle = 0; // Polar night
    } else {
      hourAngle = Math.acos(argument);
    }

    const decimalHours = 12 - (hourAngle * 180) / Math.PI / 15;
    const sunriseDecimal = decimalHours - lng / 15 + tz;
    const sunsetDecimal = 24 - decimalHours - lng / 15 + tz;

    const formatTime = (decimal: number) => {
      const hours = Math.floor(decimal);
      const minutes = Math.round((decimal - hours) * 60);
      return moment().hour(hours).minute(minutes).format("h:mm A");
    };

    const sunriseTime = formatTime(sunriseDecimal);
    const sunsetTime = formatTime(sunsetDecimal);

    const daylightHours = sunsetDecimal - sunriseDecimal;
    const nightHours = 24 - daylightHours;

    // Solar noon calculation
    const solarNoon = (sunriseDecimal + sunsetDecimal) / 2;
    const solarNoonTime = formatTime(solarNoon);

    // Calculate twilight times (approximate)
    const civilTwilightMorning = formatTime(sunriseDecimal - 0.5);
    const civilTwilightEvening = formatTime(sunsetDecimal + 0.5);

    // Season determination
    const month = date.month();
    let season;
    if (month >= 2 && month <= 4) season = "Spring";
    else if (month >= 5 && month <= 7) season = "Summer";
    else if (month >= 8 && month <= 10) season = "Autumn";
    else season = "Winter";

    // Day length comparison
    const summerSolstice = moment(date).month(5).date(21);
    const winterSolstice = moment(date).month(11).date(21);

    let dayLengthComparison;
    if (Math.abs(date.diff(summerSolstice, "days")) < 30) {
      dayLengthComparison = "Near longest day of year";
    } else if (Math.abs(date.diff(winterSolstice, "days")) < 30) {
      dayLengthComparison = "Near shortest day of year";
    } else {
      dayLengthComparison = "Moderate day length";
    }

    setResult({
      inputDate: date.format("MMMM Do, YYYY"),
      location: `${lat}°, ${lng}°`,
      sunrise: sunriseTime,
      sunset: sunsetTime,
      solarNoon: solarNoonTime,
      daylightHours: daylightHours.toFixed(2),
      nightHours: nightHours.toFixed(2),
      civilTwilightMorning,
      civilTwilightEvening,
      season,
      dayLengthComparison,
      dayOfYear: date.dayOfYear(),
      isLongDay: daylightHours > 12,
      timezone: `UTC${tz >= 0 ? "+" : ""}${tz}`,
    });
  };

  const setPresetLocation = (location: PresetLocationKey) => {
    const loc = locations[location];
    setLatitude(loc.lat);
    setLongitude(loc.lng);
    setTimezone(loc.tz);
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/sunrise-sunset" />

      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Sunrise/Sunset Calculator</h1>
        <p className={styles.subtitle}>
          Calculate sun times for any location and date
        </p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Date:</label>
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className={styles.input}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label className={styles.label}>Quick Locations:</label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["new-york", "london", "tokyo", "sydney", "paris"].map((city) => (
              <button
                key={city}
                onClick={() => setPresetLocation(city as PresetLocationKey)}
                style={{
                  padding: "6px 12px",
                  background: "rgba(102, 126, 234, 0.1)",
                  border: "1px solid rgba(102, 126, 234, 0.3)",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                {city
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Latitude:</label>
            <input
              type="number"
              step="0.0001"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className={styles.input}
              placeholder="40.7128"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Longitude:</label>
            <input
              type="number"
              step="0.0001"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className={styles.input}
              placeholder="-74.0060"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Timezone (UTC offset):</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className={styles.input}
          >
            <option value="-12">UTC-12</option>
            <option value="-11">UTC-11</option>
            <option value="-10">UTC-10</option>
            <option value="-9">UTC-9</option>
            <option value="-8">UTC-8</option>
            <option value="-7">UTC-7</option>
            <option value="-6">UTC-6</option>
            <option value="-5">UTC-5</option>
            <option value="-4">UTC-4</option>
            <option value="-3">UTC-3</option>
            <option value="-2">UTC-2</option>
            <option value="-1">UTC-1</option>
            <option value="0">UTC+0</option>
            <option value="1">UTC+1</option>
            <option value="2">UTC+2</option>
            <option value="3">UTC+3</option>
            <option value="4">UTC+4</option>
            <option value="5">UTC+5</option>
            <option value="6">UTC+6</option>
            <option value="7">UTC+7</option>
            <option value="8">UTC+8</option>
            <option value="9">UTC+9</option>
            <option value="10">UTC+10</option>
            <option value="11">UTC+11</option>
            <option value="12">UTC+12</option>
          </select>
        </div>

        <button onClick={calculateSunTimes} className={styles.button}>
          Calculate Sun Times
        </button>

        {result && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>🌅 Sun Times 🌇</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                margin: "20px 0",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem" }}>🌅</div>
                <div style={{ fontWeight: "bold" }}>Sunrise</div>
                <div style={{ fontSize: "1.5rem" }}>{result.sunrise}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem" }}>🌇</div>
                <div style={{ fontWeight: "bold" }}>Sunset</div>
                <div style={{ fontSize: "1.5rem" }}>{result.sunset}</div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <div>{result.inputDate}</div>
              <div style={{ fontSize: "0.9rem", marginTop: "5px" }}>
                {result.location} ({result.timezone})
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.timeUnits}>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.daylightHours}h</span>
              <span className={styles.unitLabel}>Daylight</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.nightHours}h</span>
              <span className={styles.unitLabel}>Night</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.solarNoon}</span>
              <span className={styles.unitLabel}>Solar Noon</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.unitValue}>{result.season}</span>
              <span className={styles.unitLabel}>Season</span>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>Additional Information</div>
            <div className={styles.infoText}>
              <div>Civil Twilight (Morning): {result.civilTwilightMorning}</div>
              <div>Civil Twilight (Evening): {result.civilTwilightEvening}</div>
              <div>Day of Year: {result.dayOfYear}</div>
              <div>Day Length: {result.dayLengthComparison}</div>
            </div>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>About Sun Calculations</div>
          <div className={styles.infoText}>
            {`Sunrise and sunset times are calculated using astronomical formulas
            based on your location's latitude and longitude. Times may vary
            slightly from official sources due to atmospheric conditions and
            local terrain.`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SunriseSunsetCalculator;

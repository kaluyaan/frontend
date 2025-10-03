"use client";

import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import styles from "./shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import LoadingSpinner from "@/components/ai-writer/LoadingSpinner";
import DatePickerField from "@/components/shared/DatePicker/DatePickerWrapper";
import CustomSelectField from "@/components/shared/CustomSelectBox/CustomSelectBox";

interface SolarResult {
  inputDate: string;
  location: string;
  sunrise: string;
  sunset: string;
  solarNoon: string;
  daylightHours: string;
  nightHours: string;
  civilTwilightMorning: string;
  civilTwilightEvening: string;
  season: string;
  dayLengthComparison: string;
  dayOfYear: number;
  isLongDay: boolean;
  timezone: string;
  locationName: string;
}

interface LocationSuggestion {
  lat: string;
  lon: string;
  display_name: string;
}

function SunriseSunsetCalculator() {
  const [inputDate, setInputDate] = useState<Moment | null>(null);
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.0060");
  const [timezone, setTimezone] = useState("-5");
  const [locationName, setLocationName] = useState("New York");
  const [searchLocation, setSearchLocation] = useState("");
  const [result, setResult] = useState<SolarResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce API call when typing
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchLocation.trim().length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            searchLocation
          )}&format=json&limit=5`
        );

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error("Error fetching suggestions", err);
        setSuggestions([]);
      }
    };

    const timer = setTimeout(fetchSuggestions, 400); // debounce 400ms
    return () => clearTimeout(timer);
  }, [searchLocation]);

  // Handle select
  const handleSuggestionClick = (location: LocationSuggestion) => {
    const lat = parseFloat(location.lat);
    const lng = parseFloat(location.lon);

    setLatitude(lat.toFixed(4));
    setLongitude(lng.toFixed(4));
    setLocationName(location.display_name.split(",")[0]);

    // Estimate timezone from lng
    const estimatedTz = Math.round(lng / 15);
    setTimezone(estimatedTz.toString());

    setSearchLocation(location.display_name.split(",")[0]); // Fill input
    setSuggestions([]);
    setShowDropdown(false);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);

    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setIsGettingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat.toFixed(4));
        setLongitude(lng.toFixed(4));
        setLocationName("Current Location");
        // Rough timezone estimation based on longitude
        const estimatedTz = Math.round(lng / 15);
        setTimezone(estimatedTz.toString());
        setIsGettingLocation(false);
      },
      () => {
        setError(
          "Unable to get your current location. Please check your browser permissions."
        );
        setIsGettingLocation(false);
      }
    );
  };

  const calculateSunTimes = () => {
    setIsLoading(true);
    setError("");
    const date = moment(inputDate);
    if (!date.isValid()) {
      setError("Please enter a valid date");
      setIsLoading(false);
      return;
    }
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const tz = parseFloat(timezone);
    if (isNaN(lat) || isNaN(lng) || isNaN(tz)) {
      setError("Please enter valid coordinates and timezone");
      setIsLoading(false);
      return;
    }
    if (lat < -90 || lat > 90) {
      setError("Latitude must be between -90 and 90 degrees");
      setIsLoading(false);
      return;
    }
    if (lng < -180 || lng > 180) {
      setError("Longitude must be between -180 and 180 degrees");
      setIsLoading(false);
      return;
    } // Simplified sunrise/sunset calculation
    const dayOfYear = date.dayOfYear();
    const P = Math.asin(
      0.39795 * Math.cos((0.98563 * (dayOfYear - 173) * Math.PI) / 180)
    );
    const argument = -Math.tan((lat * Math.PI) / 180) * Math.tan(P);
    let hourAngle;
    if (argument < -1) {
      hourAngle = Math.PI;
      // Midnight sun
    } else if (argument > 1) {
      hourAngle = 0;
      // Polar night
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
      locationName,
    });
    setIsLoading(false);
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        {/* Hero Section */}
        <HeroSection
          title="Sunrise & Sunset Calculator"
          text="Calculate precise sun times for any location and date. Get detailed information about daylight hours, twilight times, and solar positions."
        />

        {/* Date Picker */}
        <DatePickerField
          label="Select Date:"
          selectedDate={inputDate}
          onChange={setInputDate}
          required
          error={error}
        />

        {/* Location Options */}
        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>Location Options:</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "16fr 1fr 4fr",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <div style={{ position: "relative", marginBottom: "15px" }}>
              {/* Search Input */}
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search by city name (e.g., Paris, Tokyo, Mumbai)"
                className={homeStyle.dateInput}
                style={{
                  height: "3.5rem",
                }}
                onFocus={() => {
                  if (suggestions.length > 0) setShowDropdown(true);
                }}
                onBlur={() => {
                  // Delay closing so click registers
                  setTimeout(() => setShowDropdown(false), 150);
                }}
              />

              {/* Suggestions Dropdown */}
              {showDropdown && suggestions.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    marginTop: "4px",
                    maxHeight: "180px",
                    overflowY: "auto",
                    zIndex: 1000,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        borderBottom: "1px solid #eee",
                      }}
                      onMouseDown={(e) => e.preventDefault()} // prevents input blur
                    >
                      {s.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span
              style={{
                height: "3.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              OR
            </span>
            <div
              style={{
                marginBottom: "15px",
                height: "3.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                style={{
                  padding: "10px 20px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: isGettingLocation ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  opacity: isGettingLocation ? 0.7 : 1,
                }}
              >
                {isGettingLocation
                  ? "Getting Location..."
                  : "📍 Use Current Location"}
              </button>
            </div>
          </div>
        </section>

        {/* Manual Coordinates (Collapsible) */}
        <section className={homeStyle.sectionWrapper}>
          <details style={{ marginBottom: "20px" }}>
            <summary
              style={{
                cursor: "pointer",
                fontWeight: "500",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3 className={homeStyle.normalTitle}>
                ⚙️ Advanced: Enter Coordinates Manually
              </h3>
            </summary>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              <div className={styles.inputGroup}>
                <label
                  className={homeStyle.normalTitle}
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  Latitude:
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className={homeStyle.dateInput}
                  placeholder="40.7128"
                />
              </div>

              <div className={styles.inputGroup}>
                <label
                  className={homeStyle.normalTitle}
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  Longitude:
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className={homeStyle.dateInput}
                  placeholder="-74.0060"
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <CustomSelectField
                label="Timezone (UTC offset):"
                options={
                  Array.from({ length: 25 }, (_, i) => i - 12).map(
                    (offset) => ({
                      label: offset >= 0 ? `UTC+${offset}` : `UTC${offset}`,
                      value: offset.toString(),
                    })
                  ) as { label: string; value: string }[]
                }
                value={timezone}
                onChange={setTimezone}
              />
            </div>
          </details>
        </section>

        <section className={homeStyle.sectionWrapper}>
          {/* Current Location Display */}
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #ff6b6b, #ffa500)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <strong>Selected Location:</strong> {locationName} ({latitude}°,{""}
            {longitude}°) : {inputDate?.format("D MMMM YYYY")}
          </div>

          {/* Calculate Button / Loading */}
          {isLoading || isGettingLocation ? (
            <LoadingSpinner
              isVisible={isLoading || isGettingLocation}
              text={
                isGettingLocation
                  ? "Getting your location..."
                  : "Calculating sun times..."
              }
            />
          ) : (
            <ConvertButton
              onClick={calculateSunTimes}
              disabled={isLoading || isGettingLocation}
              label="Calculate Sun Times"
            />
          )}
        </section>
        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Results */}
        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>🌅 Sun Times 🌇</div>
            <div className={styles.resultValue}>
              {result.inputDate} - {result.locationName}
            </div>

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

            <div className={styles.resultDetails}>
              <div>Daylight Hours: {result.daylightHours}h</div>
              <div>Night Hours: {result.nightHours}h</div>
              <div>Solar Noon: {result.solarNoon}</div>
              <div>Season: {result.season}</div>
              <div>Day of Year: {result.dayOfYear}</div>
            </div>
          </div>
        )}

        {result && (
          <div className={styles.countdownCard}>
            <div className={styles.resultTitle}>Additional Details</div>
            <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
              <div>
                <strong>Civil Twilight (Morning):</strong>{" "}
                {result.civilTwilightMorning}
              </div>
              <div>
                <strong>Civil Twilight (Evening):</strong>{" "}
                {result.civilTwilightEvening}
              </div>
              <div>
                <strong>Day Length:</strong> {result.dayLengthComparison}
              </div>
              <div>
                <strong>Location:</strong> {result.location} ({result.timezone})
              </div>
            </div>
          </div>
        )}

        {/* How it Works Section */}
        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>How it works</h3>
          <p className={homeStyle.normalText}>
            {`This calculator determines sunrise and sunset times using astronomical formulas 
          based on your location's latitude and longitude. You can use your current location, 
          search for any city worldwide, or enter coordinates manually. Times may vary slightly 
          from official sources due to atmospheric conditions and local terrain.`}
          </p>
        </section>
      </main>
    </div>
  );
}

export default SunriseSunsetCalculator;

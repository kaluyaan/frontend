"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "./shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import DateTimePickerField from "@/components/shared/DatePicker/DateTimePicker";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import CustomSelectField from "@/components/shared/CustomSelectBox/CustomSelectBox";

interface TimeConversionResult {
  inputTime: string;
  inputFormatted: string;
  utcTime: string;
  utcFormatted: string;
  localTime: string;
  localFormatted: string;
  offset: number;
  offsetLabel: string;
  conversionType: string; // or you can make this a union of specific strings if it's fixed
}

function UTCConverter() {
  const [inputTime, setInputTime] = useState<Moment | null>(null);
  const [conversionType, setConversionType] = useState("toUTC");
  const [localOffset, setLocalOffset] = useState("0");
  const [result, setResult] = useState<TimeConversionResult | null>(null);

  const convertTime = () => {
    const inputMoment = moment(inputTime);
    if (!inputMoment.isValid()) return;

    const offset = parseFloat(localOffset);
    let utcTime, localTime;

    if (conversionType === "toUTC") {
      // Convert local time to UTC
      localTime = inputMoment;
      utcTime = inputMoment.clone().subtract(offset, "hours");
    } else {
      // Convert UTC to local time
      utcTime = inputMoment;
      localTime = inputMoment.clone().add(offset, "hours");
    }

    setResult({
      inputTime: inputMoment.format("YYYY-MM-DD HH:mm:ss"),
      inputFormatted: inputMoment.format("dddd, MMMM Do, YYYY [at] h:mm:ss A"),
      utcTime: utcTime.format("YYYY-MM-DD HH:mm:ss"),
      utcFormatted: utcTime.format("dddd, MMMM Do, YYYY [at] h:mm:ss A"),
      localTime: localTime.format("YYYY-MM-DD HH:mm:ss"),
      localFormatted: localTime.format("dddd, MMMM Do, YYYY [at] h:mm:ss A"),
      offset: offset,
      offsetLabel: `UTC${offset >= 0 ? "+" : ""}${offset}`,
      conversionType,
    });
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="UTC Converter"
          text="Convert between local time and UTC (Coordinated Universal Time)"
        />

        {/* <div className={styles.inputGroup}>
          <label className={styles.label}>Input Date & Time:</label>
          <input
            type="datetime-local"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            className={styles.input}
          />
        </div> */}
        <section className={homeStyle.sectionWrapper}>
          <DateTimePickerField
            label="Input Date & Time:"
            selectedDateTime={inputTime}
            onChange={setInputTime}
            // required
            // error={result?.inputFormatted}
          />

          <div
            className={styles.grid}
            style={{
              marginTop: "20px",
            }}
          >
            <div className={styles.inputGroup}>
              <CustomSelectField
                label="Conversion Type:"
                options={[
                  { label: "Local Time → UTC", value: "toUTC" },
                  { label: "UTC → Local Time", value: "fromUTC" },
                ]}
                value={conversionType}
                onChange={setConversionType}
              />
            </div>

            <div className={styles.inputGroup}>
              <CustomSelectField
                label="Local Time Zone Offset (hours from UTC):"
                options={[
                  { label: "UTC-12 (Baker Island)", value: "-12" },
                  { label: "UTC-11 (American Samoa)", value: "-11" },
                  { label: "UTC-10 (Hawaii)", value: "-10" },
                  { label: "UTC-9 (Alaska)", value: "-9" },
                  { label: "UTC-8 (Pacific Time)", value: "-8" },
                  { label: "UTC-7 (Mountain Time)", value: "-7" },
                  { label: "UTC-6 (Central Time)", value: "-6" },
                  { label: "UTC-5 (Eastern Time)", value: "-5" },
                  { label: "UTC-4 (Atlantic Time)", value: "-4" },
                  { label: "UTC-3 (Argentina)", value: "-3" },
                  { label: "UTC-2 (South Georgia)", value: "-2" },
                  { label: "UTC-1 (Azores)", value: "-1" },
                  { label: "UTC+0 (London, GMT)", value: "0" },
                  { label: "UTC+1 (Paris, Berlin)", value: "1" },
                  { label: "UTC+2 (Cairo, Athens)", value: "2" },
                  { label: "UTC+3 (Moscow, Istanbul)", value: "3" },
                  { label: "UTC+4 (Dubai, Baku)", value: "4" },
                  { label: "UTC+5 (Karachi, Tashkent)", value: "5" },
                  { label: "UTC+5:30 (India, Sri Lanka)", value: "5.5" },
                  { label: "UTC+6 (Dhaka, Almaty)", value: "6" },
                  { label: "UTC+7 (Bangkok, Jakarta)", value: "7" },
                  { label: "UTC+8 (Beijing, Singapore)", value: "8" },
                  { label: "UTC+9 (Tokyo, Seoul)", value: "9" },
                  { label: "UTC+9:30 (Adelaide)", value: "9.5" },
                  { label: "UTC+10 (Sydney, Melbourne)", value: "10" },
                  { label: "UTC+11 (Solomon Islands)", value: "11" },
                  { label: "UTC+12 (New Zealand)", value: "12" },
                ]}
                value={localOffset}
                onChange={setLocalOffset}
              />
            </div>
          </div>
        </section>

        <ConvertButton
          onClick={convertTime}
          disabled={false}
          label={"Convert Time"}
        />

        {result && (
          <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
            <div className={styles.resultCard}>
              <div className={styles.resultTitle}>
                {result.conversionType === "toUTC" ? "Local Time" : "UTC Time"}
              </div>
              <div className={styles.resultValue}>{result.inputTime}</div>
              <div className={styles.resultDetails}>
                <div>{result.inputFormatted}</div>
                <div>
                  {result.conversionType === "toUTC"
                    ? result.offsetLabel
                    : "UTC+0"}
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: "2rem",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              ↓↓↓
            </div>

            <div className={styles.countdownCard}>
              <div className={styles.resultTitle}>
                {result.conversionType === "toUTC" ? "UTC Time" : "Local Time"}
              </div>
              <div
                className={styles.countdownNumber}
                style={{ fontSize: "1.5rem" }}
              >
                {result.conversionType === "toUTC"
                  ? result.utcTime
                  : result.localTime}
              </div>
              <div>
                {result.conversionType === "toUTC"
                  ? result.utcFormatted
                  : result.localFormatted}
              </div>
              <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                {result.conversionType === "toUTC"
                  ? "UTC+0"
                  : result.offsetLabel}
              </div>
            </div>
          </div>
        )}

        <section className={homeStyle.sectionWrapper}>
          <h3 className={homeStyle.normalTitle}>About UTC</h3>

          <p className={homeStyle.normalText}>
            {`UTC (Coordinated Universal Time) is the primary time standard by
            which the world regulates clocks and time. It's essentially the same
            as GMT (Greenwich Mean Time) and serves as the reference point for
            all time zones worldwide.`}
          </p>
        </section>
      </main>
    </div>
  );
}

export default UTCConverter;

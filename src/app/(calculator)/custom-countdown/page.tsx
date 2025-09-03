"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "../shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerField from "@/components/shared/DatePicker/DatePicker";
import TimePickerField from "@/components/shared/DatePicker/TimePicker";
import ConvertButton from "@/components/ai-writer/ConvertButton";

interface IEvent {
  id?: number;
  name: string;
  date: Moment | null;
  time: Moment | null;
  formatted?: string;
}

function CustomEventCountdown() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [newEvent, setNewEvent] = useState<IEvent>({
    name: "",
    date: null,
    time: null,
  });

  const addEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.time) {
      return;
    }

    alert("Event added successfully! 44");
    const eventDate = moment(newEvent.date).format("YYYY-MM-DD");
    const eventTime = moment(newEvent.time).format("HH:mm");
    const eventDateTime = moment(
      `${eventDate} ${eventTime}`,
      "YYYY-MM-DD HH:mm"
    );
    alert("Event added successfully! 47" + JSON.stringify(newEvent));
    if (!eventDateTime.isValid()) {
      return;
    }

    const event = {
      id: Date.now(),
      name: newEvent.name,
      date: newEvent.date,
      time: newEvent.time,
      formatted: eventDateTime.format("MMMM Do, YYYY [at] h:mm A").toString(),
    };
    alert("Event added successfully! 59");

    setEvents((pre: IEvent[]) => {
      return [...pre, event];
    });
    alert("Event added successfully! 64");
    setNewEvent({ name: "", date: null, time: null, formatted: "" });
  };

  const removeEvent = (id: number) => {
    setEvents(events.filter((event: IEvent) => event.id !== id));
  };

  const getCountdown = ({ date, time }: { date: Moment; time: Moment }) => {
    const now = moment();
    const eventDateTime = moment(
      `${date.format("YYYY-MM-DD")} ${time.format("HH:mm")}`
    );
    const isPast = eventDateTime.isBefore(now);

    const absDuration = moment.duration(Math.abs(eventDateTime.diff(now)));

    return {
      days: Math.floor(absDuration.asDays()),
      hours: absDuration.hours(),
      minutes: absDuration.minutes(),
      seconds: absDuration.seconds(),
      isPast,
    };
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Custom Event Countdown"
          text="Create countdowns for your important events."
        />

        <section className={homeStyle.sectionWrapper}>
          {/* <h3 style={{ marginBottom: "15px", color: "#333" }}>Add New Event</h3> */}

          <div className={styles.inputGroup}>
            <div className={homeStyle.normalTitle}>Event Name:</div>
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className={styles.input}
              placeholder="Enter event name"
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <DatePickerField
                label="Event Date:"
                selectedDate={newEvent.date}
                onChange={(date) => setNewEvent({ ...newEvent, date })}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <TimePickerField
                label="Event Time:"
                selectedTime={newEvent.time}
                onChange={(time) => setNewEvent({ ...newEvent, time })}
                required
              />
            </div>
          </div>
        </section>

        <ConvertButton
          onClick={addEvent}
          disabled={false}
          label={"Add Event"}
        />

        {events.length === 0 ? (
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>No Events Added</div>
            <div className={styles.infoText}>
              Add your first event above to start tracking countdowns to
              important dates and times.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {events.map((event) => {
              const countdown = getCountdown({
                date: event.date as Moment,
                time: event.time as Moment,
              });
              return (
                <div
                  key={event.id}
                  style={{
                    background: countdown.isPast
                      ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)"
                      : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => removeEvent(event.id as number)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "rgba(255,255,255,0.2)",
                      border: "none",
                      color: "white",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>

                  <h3 style={{ marginBottom: "10px", fontSize: "1.3rem" }}>
                    {event.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      marginBottom: "15px",
                      opacity: 0.9,
                    }}
                  >
                    {event.formatted}
                  </div>

                  {countdown.isPast ? (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                        Event Completed
                      </div>
                      <div>
                        {countdown.days}d {countdown.hours}h {countdown.minutes}
                        m {countdown.seconds}s ago
                      </div>
                    </div>
                  ) : (
                    <div className={styles.timeUnits}>
                      <div className={styles.timeUnit}>
                        <span className={styles.unitValue}>
                          {countdown.days}
                        </span>
                        <span className={styles.unitLabel}>Days</span>
                      </div>
                      <div className={styles.timeUnit}>
                        <span className={styles.unitValue}>
                          {countdown.hours}
                        </span>
                        <span className={styles.unitLabel}>Hours</span>
                      </div>
                      <div className={styles.timeUnit}>
                        <span className={styles.unitValue}>
                          {countdown.minutes}
                        </span>
                        <span className={styles.unitLabel}>Minutes</span>
                      </div>
                      <div className={styles.timeUnit}>
                        <span className={styles.unitValue}>
                          {countdown.seconds}
                        </span>
                        <span className={styles.unitLabel}>Seconds</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default CustomEventCountdown;

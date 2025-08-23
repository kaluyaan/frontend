'use client';

import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../shared.module.css';
import Navigation from '../Navigation';
interface Event {
  id: number;
  name: string;
  dateTime: moment.Moment;
  formatted: string;
}


function CustomEventCountdown() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', time: '' });
  // const [currentTime, setCurrentTime] = useState(moment());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(moment());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  const addEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.time) {
      return;
    }

    const eventDateTime = moment(`${newEvent.date} ${newEvent.time}`);
    if (!eventDateTime.isValid()) {
      return;
    }

    const event = {
      id: Date.now(),
      name: newEvent.name,
      dateTime: eventDateTime,
      formatted: eventDateTime.format('MMMM Do, YYYY [at] h:mm A')
    };

    setEvents([...events, event]);
    setNewEvent({ name: '', date: '', time: '' });
  };

  const removeEvent = (id:number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const getCountdown = (eventDateTime:moment.Moment) => {
    const now = moment();
    // const duration = moment.duration(eventDateTime.diff(now));
    const isPast = eventDateTime.isBefore(now);
    
    const absDuration = moment.duration(Math.abs(eventDateTime.diff(now)));
    
    return {
      days: Math.floor(absDuration.asDays()),
      hours: absDuration.hours(),
      minutes: absDuration.minutes(),
      seconds: absDuration.seconds(),
      isPast
    };
  };

  return (
    <div className={styles.container}>
      <Link href="/time-calculator">
        <button className={styles.backButton}>← Back</button>
      </Link>
      <Navigation currentPath="/time-calculator/custom-countdown" />
      
      <div className={styles.calculatorCard}>
        <h1 className={styles.title}>Custom Event Countdown</h1>
        <p className={styles.subtitle}>Create custom countdowns for any event</p>

        <div style={{ marginBottom: '30px', padding: '20px', border: '2px dashed rgba(102, 126, 234, 0.3)', borderRadius: '10px' }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Add New Event</h3>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Event Name:</label>
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
              className={styles.input}
              placeholder="Enter event name"
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Date:</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Time:</label>
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                className={styles.input}
              />
            </div>
          </div>

          <button onClick={addEvent} className={styles.button}>
            Add Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>No Events Added</div>
            <div className={styles.infoText}>
              Add your first event above to start tracking countdowns to important dates and times.
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {events.map(event => {
              const countdown = getCountdown(event.dateTime);
              return (
                <div key={event.id} style={{
                  background: countdown.isPast ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  position: 'relative'
                }}>
                  <button 
                    onClick={() => removeEvent(event.id)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                  
                  <h3 style={{ marginBottom: '10px', fontSize: '1.3rem' }}>{event.name}</h3>
                  <div style={{ fontSize: '0.9rem', marginBottom: '15px', opacity: 0.9 }}>
                    {event.formatted}
                  </div>
                  
                  {countdown.isPast ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Event Completed</div>
                      <div>{countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s ago</div>
                    </div>
                  ) : (
                    <div className={styles.timeUnits}>
                      <div className={styles.timeUnit}>
                        <span className={styles.unitValue}>{countdown.days}</span>
                        <span className={styles.unitLabel}>Days</span>
                      </div>
                      <div className={styles.timeUnit}>
                        <span className={styles.unitValue}>{countdown.hours}</span>
                        <span className={styles.unitLabel}>Hours</span>
                      </div>
                      <div className={styles.timeUnit}>
                        <span className={styles.unitValue}>{countdown.minutes}</span>
                        <span className={styles.unitLabel}>Minutes</span>
                      </div>
                      <div className={styles.timeUnit}>
                        <span className={styles.unitValue}>{countdown.seconds}</span>
                        <span className={styles.unitLabel}>Seconds</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomEventCountdown;


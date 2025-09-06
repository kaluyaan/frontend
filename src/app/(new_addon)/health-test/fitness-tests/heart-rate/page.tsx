'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function HeartRateMonitor() {
  const [isRecording, setIsRecording] = useState(false);
  const [heartRate, setHeartRate] = useState(0);
  const [countdown, setCountdown] = useState(15);
  const [result, setResult] = useState<{
    heartRate: number;
    category: string;
    color: string;
    description: string;
    maxHeartRate: number;
    targetZone: { lower: number; upper: number };
    age: number;
  } | null>(null);
  const [age, setAge] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
        // Simulate heart rate detection (in real app, would use camera/sensor)
        setHeartRate(Math.floor(Math.random() * 40) + 60); // 60-100 BPM range
      }, 1000);
    } else if (countdown === 0) {
      setIsRecording(false);
      calculateResult();
    }

    return () => clearInterval(interval);
  }, [isRecording, countdown]);

  const startRecording = () => {
    if (!age) {
      alert('Please enter your age first');
      return;
    }
    setIsRecording(true);
    setCountdown(15);
    setResult(null);
  };

  const calculateResult = () => {
    const finalRate = Math.floor(Math.random() * 40) + 60; // Simulated final reading
    const ageNum = parseInt(age);
    const maxHeartRate = 220 - ageNum;
    const restingCategory = getRestingCategory(finalRate);
    const targetZone = {
      lower: Math.round(maxHeartRate * 0.5),
      upper: Math.round(maxHeartRate * 0.85)
    };

    setResult({
      heartRate: finalRate,
      category: restingCategory.name,
      color: restingCategory.color,
      description: restingCategory.description,
      maxHeartRate,
      targetZone,
      age: ageNum
    });
  };

  const getRestingCategory = (rate: number) => {
    if (rate < 60) return { name: 'Bradycardia', color: '#2196F3', description: 'Below normal resting rate' };
    if (rate <= 100) return { name: 'Normal', color: '#4CAF50', description: 'Healthy resting heart rate' };
    return { name: 'Tachycardia', color: '#F44336', description: 'Above normal resting rate' };
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/fitness-tests/heart-rate" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>❤️ Heart Rate Monitor</h1>
        <p className={styles.subtitle}>Measure and track your heart rate</p>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>Instructions:</div>
          <div className={styles.instructionText}>
            Sit quietly for 5 minutes before testing. Place your finger gently over your phone's camera and flashlight.
            (Note: This is a simulation - real implementation would use camera sensor)
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Your Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={styles.input}
            placeholder="Enter your age"
            min="1"
            max="120"
          />
        </div>

        <div className={styles.testArea}>
          {!isRecording && !result && (
            <div>
              <h3>Ready to measure your heart rate?</h3>
              <button className={styles.button} onClick={startRecording}>
                Start Measurement
              </button>
            </div>
          )}

          {isRecording && (
            <div>
              <div className={styles.timer}>{countdown}</div>
              <div>Keep your finger steady...</div>
              <div className={styles.scoreDisplay}>
                Current: {heartRate} BPM
              </div>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                backgroundColor: '#ff6b6b', 
                borderRadius: '50%', 
                margin: '20px auto',
                animation: 'pulse 1s infinite'
              }} />
            </div>
          )}
        </div>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Heart Rate Results</div>
            <div className={styles.resultValue}>{result.heartRate} BPM</div>
            <div className={styles.resultDetails}>
              <div style={{ color: result.color, fontWeight: 'bold' }}>
                {result.category}
              </div>
              <div>{result.description}</div>
              <div style={{ marginTop: '15px' }}>
                <strong>Your Stats:</strong><br/>
                Max Heart Rate: {result.maxHeartRate} BPM<br/>
                Target Zone: {result.targetZone.lower} - {result.targetZone.upper} BPM
              </div>
            </div>
          </div>
        )}

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>Heart Rate Zones:</div>
          <div className={styles.instructionText}>
            • Resting: 60-100 BPM (normal)<br/>
            • Fat Burn: 50-70% of max<br/>
            • Cardio: 70-85% of max<br/>
            • Peak: 85-100% of max
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default HeartRateMonitor;

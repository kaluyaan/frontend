'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [result, setResult] = useState<{
    urgencyScore: number;
    urgencyLevel: { level: string; color: string };
    recommendations: string[];
    symptomsCount: number;
    severity: string;
    duration: string;
  } | null>(null);

  const symptoms = [
    'Headache', 'Fever', 'Cough', 'Sore Throat', 'Fatigue', 'Nausea',
    'Dizziness', 'Chest Pain', 'Shortness of Breath', 'Abdominal Pain',
    'Joint Pain', 'Muscle Aches', 'Skin Rash', 'Loss of Appetite',
    'Sleep Problems', 'Anxiety', 'Depression', 'Memory Issues'
  ];

  const severityLevels = [
    { value: 'mild', label: 'Mild - Barely noticeable' },
    { value: 'moderate', label: 'Moderate - Noticeable but manageable' },
    { value: 'severe', label: 'Severe - Significantly impacts daily life' },
    { value: 'critical', label: 'Critical - Unable to function normally' }
  ];

  const durationOptions = [
    { value: 'hours', label: 'Few hours' },
    { value: 'days', label: '1-3 days' },
    { value: 'week', label: '1 week' },
    { value: 'weeks', label: '2+ weeks' },
    { value: 'months', label: '1+ months' }
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0 || !severity || !duration) return;

    const urgencyScore = calculateUrgency();
    const recommendations = getRecommendations(urgencyScore);
    
    setResult({
      urgencyScore,
      urgencyLevel: getUrgencyLevel(urgencyScore),
      recommendations,
      symptomsCount: selectedSymptoms.length,
      severity,
      duration
    });
  };

  const calculateUrgency = () => {
    let score = selectedSymptoms.length * 10;
    
    // Severity multiplier
    const severityMultiplier = {
      mild: 1,
      moderate: 1.5,
      severe: 2,
      critical: 3
    };
    score *= severityMultiplier[severity as keyof typeof severityMultiplier];
    
    // Duration factor
    const durationFactor = {
      hours: 0.5,
      days: 1,
      week: 1.2,
      weeks: 1.5,
      months: 2
    };
    score *= durationFactor[duration as keyof typeof durationFactor];
    
    // Critical symptoms
    const criticalSymptoms = ['Chest Pain', 'Shortness of Breath', 'Severe Headache'];
    if (selectedSymptoms.some(s => criticalSymptoms.includes(s))) {
      score *= 2;
    }
    
    return Math.min(score, 100);
  };

  const getUrgencyLevel = (score: number) => {
    if (score >= 80) return { level: 'Emergency', color: '#F44336' };
    if (score >= 60) return { level: 'Urgent', color: '#FF9800' };
    if (score >= 40) return { level: 'Moderate', color: '#2196F3' };
    return { level: 'Low', color: '#4CAF50' };
  };

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        'Seek immediate emergency medical attention',
        'Call emergency services if symptoms worsen',
        'Do not delay medical care'
      ];
    }
    if (score >= 60) {
      return [
        'Schedule urgent appointment with healthcare provider',
        'Monitor symptoms closely',
        'Seek immediate care if symptoms worsen'
      ];
    }
    if (score >= 40) {
      return [
        'Schedule appointment with healthcare provider within few days',
        'Rest and stay hydrated',
        'Monitor symptoms for changes'
      ];
    }
    return [
      'Monitor symptoms for 24-48 hours',
      'Rest, hydrate, and practice self-care',
      'Contact healthcare provider if symptoms persist or worsen'
    ];
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/health-assessments/symptom-checker" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>🩺 Symptom Checker</h1>
        <p className={styles.subtitle}>Basic symptom analysis and recommendations</p>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>⚠️ Important Notice:</div>
          <div className={styles.instructionText}>
            This tool provides general guidance only and should not replace professional medical advice. 
            Always consult healthcare professionals for proper diagnosis and treatment.
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Select Your Symptoms:</label>
          <div className={styles.optionsGrid}>
            {symptoms.map(symptom => (
              <div
                key={symptom}
                className={`${styles.option} ${selectedSymptoms.includes(symptom) ? styles.selected : ''}`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Severity Level:</label>
          <div className={styles.optionsGrid}>
            {severityLevels.map(level => (
              <div
                key={level.value}
                className={`${styles.option} ${severity === level.value ? styles.selected : ''}`}
                onClick={() => setSeverity(level.value)}
              >
                {level.label}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Duration:</label>
          <div className={styles.optionsGrid}>
            {durationOptions.map(option => (
              <div
                key={option.value}
                className={`${styles.option} ${duration === option.value ? styles.selected : ''}`}
                onClick={() => setDuration(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>

        <button 
          className={styles.button} 
          onClick={analyzeSymptoms}
          disabled={selectedSymptoms.length === 0 || !severity || !duration}
        >
          Analyze Symptoms
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Symptom Analysis</div>
            <div className={styles.resultValue} style={{ color: result.urgencyLevel.color }}>
              {result.urgencyLevel.level} Priority
            </div>
            <div className={styles.resultDetails}>
              <div><strong>Symptoms:</strong> {result.symptomsCount} selected</div>
              <div><strong>Severity:</strong> {result.severity}</div>
              <div><strong>Duration:</strong> {result.duration}</div>
              <div style={{ marginTop: '15px' }}>
                <strong>Recommendations:</strong>
                <ul style={{ textAlign: 'left', marginTop: '10px' }}>
                  {result.recommendations.map((rec: string, index: number) => (
                    <li key={index} style={{ margin: '5px 0' }}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomChecker;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function StressAssessment() {
  const [responses, setResponses] = useState<{[key: string]: number}>({});
  const [result, setResult] = useState<{
    totalScore: number;
    stressLevel: string;
    color: string;
    description: string;
    recommendations: string[];
  } | null>(null);

  const questions = [
    'How often have you felt nervous or stressed?',
    'How often have you felt unable to control important things in your life?',
    'How often have you felt confident about handling personal problems?',
    'How often have you felt that things were going your way?',
    'How often have you found that you could not cope with all the things you had to do?',
    'How often have you been able to control irritations in your life?',
    'How often have you felt that you were on top of things?',
    'How often have you been angered because of things outside of your control?',
    'How often have you felt difficulties were piling up so high you could not overcome them?',
    'How often have you been upset because of something that happened unexpectedly?'
  ];

  const options = [
    { value: 0, label: 'Never' },
    { value: 1, label: 'Almost Never' },
    { value: 2, label: 'Sometimes' },
    { value: 3, label: 'Fairly Often' },
    { value: 4, label: 'Very Often' }
  ];

  const handleResponse = (questionIndex: number, value: number) => {
    setResponses(prev => ({ ...prev, [questionIndex]: value }));
  };

  const calculateStress = () => {
    if (Object.keys(responses).length < questions.length) return;

    // Reverse score for positive questions (2, 3, 5, 6)
    const positiveQuestions = [2, 3, 5, 6];
    let totalScore = 0;

    Object.entries(responses).forEach(([questionIndex, score]) => {
      const qIndex = parseInt(questionIndex);
      if (positiveQuestions.includes(qIndex)) {
        totalScore += 4 - score; // Reverse score
      } else {
        totalScore += score;
      }
    });

    const stressLevel = getStressLevel(totalScore);
    const recommendations = getStressRecommendations(totalScore);

    setResult({
      totalScore,
      stressLevel: stressLevel.level,
      color: stressLevel.color,
      description: stressLevel.description,
      recommendations
    });
  };

  const getStressLevel = (score: number) => {
    if (score <= 13) return { level: 'Low Stress', color: '#4CAF50', description: 'You are managing stress well' };
    if (score <= 26) return { level: 'Moderate Stress', color: '#FF9800', description: 'Some stress management techniques may help' };
    return { level: 'High Stress', color: '#F44336', description: 'Consider professional stress management support' };
  };

  const getStressRecommendations = (score: number) => {
    if (score <= 13) {
      return [
        'Continue your current stress management practices',
        'Maintain regular exercise and healthy sleep',
        'Keep practicing mindfulness or relaxation techniques'
      ];
    }
    if (score <= 26) {
      return [
        'Practice deep breathing exercises daily',
        'Consider meditation or yoga',
        'Ensure adequate sleep (7-9 hours)',
        'Regular physical exercise can help reduce stress'
      ];
    }
    return [
      'Consider speaking with a mental health professional',
      'Practice stress reduction techniques daily',
      'Prioritize self-care and relaxation',
      'Consider counseling or therapy',
      'Evaluate and reduce stressors where possible'
    ];
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/cognitive-tests/stress-assessment" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>😰 Stress Level Assessment</h1>
        <p className={styles.subtitle}>Evaluate your current stress levels</p>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>Stress Assessment:</div>
          <div className={styles.instructionText}>
            Think about how you have felt over the past month and rate how often each situation applied to you.
          </div>
        </div>

        {questions.map((question, index) => (
          <div key={index} className={styles.inputGroup}>
            <label className={styles.label}>{index + 1}. {question}</label>
            <div className={styles.optionsGrid}>
              {options.map(option => (
                <div
                  key={option.value}
                  className={`${styles.option} ${responses[index] === option.value ? styles.selected : ''}`}
                  onClick={() => handleResponse(index, option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button 
          className={styles.button} 
          onClick={calculateStress}
          disabled={Object.keys(responses).length < questions.length}
        >
          Calculate Stress Level
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Stress Assessment Results</div>
            <div className={styles.resultValue} style={{ color: result.color }}>
              {result.stressLevel}
            </div>
            <div className={styles.resultDetails}>
              <div><strong>Score:</strong> {result.totalScore}/40</div>
              <div>{result.description}</div>
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

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>⚠️ Important Note:</div>
          <div className={styles.instructionText}>
            This assessment is for informational purposes only. If you're experiencing significant stress or mental health concerns, please consult with a qualified healthcare professional.
          </div>
        </div>
      </div>
    </div>
  );
}

export default StressAssessment;
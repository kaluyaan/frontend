'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function WellnessTracker() {
  const [responses, setResponses] = useState<{[key: string]: number}>({});
  const [result, setResult] = useState<any>(null);

  const questions = [
    { id: 'sleep', text: 'How would you rate your sleep quality?', category: 'Sleep' },
    { id: 'energy', text: 'How is your energy level throughout the day?', category: 'Energy' },
    { id: 'stress', text: 'How well do you manage stress?', category: 'Mental Health' },
    { id: 'exercise', text: 'How often do you exercise?', category: 'Physical Activity' },
    { id: 'nutrition', text: 'How healthy is your diet?', category: 'Nutrition' },
    { id: 'social', text: 'How satisfied are you with your social connections?', category: 'Social' },
    { id: 'work', text: 'How satisfied are you with work-life balance?', category: 'Work-Life' },
    { id: 'mood', text: 'How would you rate your overall mood?', category: 'Mental Health' }
  ];

  const options = [
    { value: 1, label: 'Poor' },
    { value: 2, label: 'Fair' },
    { value: 3, label: 'Good' },
    { value: 4, label: 'Very Good' },
    { value: 5, label: 'Excellent' }
  ];

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateWellness = () => {
    if (Object.keys(responses).length < questions.length) return;

    const totalScore = Object.values(responses).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / questions.length;
    const percentage = (averageScore / 5) * 100;

    const categories = {
      'Sleep': responses.sleep || 0,
      'Energy': responses.energy || 0,
      'Mental Health': ((responses.stress || 0) + (responses.mood || 0)) / 2,
      'Physical Activity': responses.exercise || 0,
      'Nutrition': responses.nutrition || 0,
      'Social': responses.social || 0,
      'Work-Life': responses.work || 0
    };

    setResult({
      overallScore: percentage,
      averageRating: averageScore,
      categories,
      recommendations: getRecommendations(categories)
    });
  };

  const getRecommendations = (categories: {[key: string]: number}) => {
    const recommendations = [];
    
    Object.entries(categories).forEach(([category, score]) => {
      if (score < 3) {
        switch (category) {
          case 'Sleep':
            recommendations.push('Improve sleep hygiene - aim for 7-9 hours nightly');
            break;
          case 'Energy':
            recommendations.push('Consider regular exercise and balanced nutrition');
            break;
          case 'Mental Health':
            recommendations.push('Practice stress management and mindfulness');
            break;
          case 'Physical Activity':
            recommendations.push('Increase physical activity - aim for 150 min/week');
            break;
          case 'Nutrition':
            recommendations.push('Focus on balanced, whole food nutrition');
            break;
          case 'Social':
            recommendations.push('Strengthen social connections and relationships');
            break;
          case 'Work-Life':
            recommendations.push('Improve work-life balance and set boundaries');
            break;
        }
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('Great job! Continue maintaining your healthy lifestyle');
    }

    return recommendations;
  };

  const getWellnessLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: '#4CAF50' };
    if (score >= 60) return { level: 'Good', color: '#2196F3' };
    if (score >= 40) return { level: 'Fair', color: '#FF9800' };
    return { level: 'Needs Attention', color: '#F44336' };
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/health-assessments/wellness-tracker" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>🌟 Wellness Tracker</h1>
        <p className={styles.subtitle}>Overall wellness and lifestyle assessment</p>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>Wellness Assessment:</div>
          <div className={styles.instructionText}>
            Rate each aspect of your wellness on a scale from 1 (Poor) to 5 (Excellent).
          </div>
        </div>

        {questions.map(question => (
          <div key={question.id} className={styles.inputGroup}>
            <label className={styles.label}>{question.text}</label>
            <div className={styles.optionsGrid}>
              {options.map(option => (
                <div
                  key={option.value}
                  className={`${styles.option} ${responses[question.id] === option.value ? styles.selected : ''}`}
                  onClick={() => handleResponse(question.id, option.value)}
                >
                  {option.value} - {option.label}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button 
          className={styles.button} 
          onClick={calculateWellness}
          disabled={Object.keys(responses).length < questions.length}
        >
          Calculate Wellness Score
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>Wellness Assessment Results</div>
            <div className={styles.resultValue} style={{ color: getWellnessLevel(result.overallScore).color }}>
              {result.overallScore.toFixed(1)}% - {getWellnessLevel(result.overallScore).level}
            </div>
            <div className={styles.resultDetails}>
              <div><strong>Average Rating:</strong> {result.averageRating.toFixed(1)}/5</div>
              <div style={{ marginTop: '15px' }}>
                <strong>Category Scores:</strong>
                {Object.entries(result.categories).map(([category, score]) => (
                  <div key={category} style={{ margin: '5px 0' }}>
                    {category}: {(score as number).toFixed(1)}/5
                  </div>
                ))}
              </div>
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

export default WellnessTracker;

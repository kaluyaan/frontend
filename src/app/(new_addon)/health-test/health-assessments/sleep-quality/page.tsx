'use client';

import { useState } from 'react';
import { COMPANY_INFO } from '../../constants';
import Navigation from '../../Navigation';
import styles from '../../shared.module.css';

export default function SleepQualityAssessment() {
  const [responses, setResponses] = useState<{[key: string]: number}>({});
  const [result, setResult] = useState<{
    totalScore: number;
    sleepQuality: string;
    color: string;
    recommendations: string[];
    categories: {[key: string]: number};
  } | null>(null);

  const questions = [
    { id: 'bedtime', text: 'How long does it take you to fall asleep?', scores: [3, 2, 1, 0], options: ['<15 min', '15-30 min', '30-60 min', '>60 min'] },
    { id: 'wake_up', text: 'How often do you wake up during the night?', scores: [3, 2, 1, 0], options: ['Never', 'Once', '2-3 times', '>3 times'] },
    { id: 'duration', text: 'How many hours do you sleep per night?', scores: [3, 3, 2, 1, 0], options: ['7-9 hours', '6-7 hours', '5-6 hours', '4-5 hours', '<4 hours'] },
    { id: 'refreshed', text: 'How refreshed do you feel upon waking?', scores: [3, 2, 1, 0], options: ['Very refreshed', 'Somewhat refreshed', 'Slightly tired', 'Very tired'] },
    { id: 'daytime_sleepiness', text: 'How often do you feel sleepy during the day?', scores: [3, 2, 1, 0], options: ['Never', 'Rarely', 'Sometimes', 'Often'] },
    { id: 'sleep_schedule', text: 'How consistent is your sleep schedule?', scores: [3, 2, 1, 0], options: ['Very consistent', 'Mostly consistent', 'Somewhat irregular', 'Very irregular'] },
    { id: 'sleep_environment', text: 'How would you rate your sleep environment?', scores: [3, 2, 1, 0], options: ['Excellent', 'Good', 'Fair', 'Poor'] },
    { id: 'caffeine', text: 'When do you consume caffeine?', scores: [3, 2, 1, 0], options: ['Morning only', 'Before 2 PM', 'Before 6 PM', 'Evening/night'] },
    { id: 'screen_time', text: 'Screen time before bed?', scores: [3, 2, 1, 0], options: ['None', '<30 min', '30-60 min', '>60 min'] },
    { id: 'stress_sleep', text: 'How often does stress affect your sleep?', scores: [3, 2, 1, 0], options: ['Never', 'Rarely', 'Sometimes', 'Often'] }
  ];

  const handleResponse = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    const score = question?.scores[optionIndex] || 0;
    setResponses(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateSleepQuality = () => {
    if (Object.keys(responses).length < questions.length) return;

    const totalScore = Object.values(responses).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.scores), 0);
    const percentage = (totalScore / maxScore) * 100;

    const categories = {
      sleepHygiene: (responses.caffeine || 0) + (responses.screen_time || 0) + (responses.sleep_environment || 0),
      sleepPattern: (responses.bedtime || 0) + (responses.duration || 0) + (responses.sleep_schedule || 0),
      sleepQuality: (responses.wake_up || 0) + (responses.refreshed || 0) + (responses.daytime_sleepiness || 0),
      stressImpact: responses.stress_sleep || 0
    };

    const sleepQuality = getSleepQuality(percentage);
    const recommendations = getSleepRecommendations(percentage, categories);

    setResult({
      totalScore: Math.round(percentage),
      sleepQuality: sleepQuality.level,
      color: sleepQuality.color,
      recommendations,
      categories
    });
  };

  const getSleepQuality = (percentage: number) => {
    if (percentage >= 80) return { level: 'Excellent Sleep', color: '#4CAF50' };
    if (percentage >= 65) return { level: 'Good Sleep', color: '#2196F3' };
    if (percentage >= 50) return { level: 'Fair Sleep', color: '#FF9800' };
    return { level: 'Poor Sleep', color: '#F44336' };
  };

  const getSleepRecommendations = (percentage: number, categories: {[key: string]: number}) => {
    const recommendations = [];

    if (categories.sleepHygiene < 6) {
      recommendations.push('Improve sleep hygiene: avoid screens before bed, limit evening caffeine');
    }
    if (categories.sleepPattern < 6) {
      recommendations.push('Establish consistent sleep schedule and aim for 7-9 hours nightly');
    }
    if (categories.sleepQuality < 6) {
      recommendations.push('Address sleep disruptions and create better sleep environment');
    }
    if (categories.stressImpact < 2) {
      recommendations.push('Practice stress management techniques before bedtime');
    }

    if (percentage >= 80) {
      recommendations.push('Maintain your excellent sleep habits');
    } else if (percentage >= 65) {
      recommendations.push('Fine-tune your sleep routine for optimal rest');
    } else if (percentage >= 50) {
      recommendations.push('Focus on improving sleep consistency and environment');
    } else {
      recommendations.push('Consider consulting a sleep specialist for comprehensive evaluation');
    }

    return recommendations;
  };

  return (
    <div className={styles.container}>
      <Navigation currentPath=''/>
      
      <div className={styles.header}>
        <h1 className={styles.title}>😴 Sleep Quality Assessment</h1>
        <p className={styles.subtitle}>Evaluate your sleep patterns and quality</p>
      </div>

      <div className={styles.testSection}>
        {questions.map((question, index) => (
          <div key={question.id} className={styles.inputGroup}>
            <label className={styles.label}>{index + 1}. {question.text}</label>
            <div className={styles.optionsGrid}>
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`${styles.option} ${responses[question.id] === question.scores[optionIndex] ? styles.selected : ''}`}
                  onClick={() => handleResponse(question.id, optionIndex)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={calculateSleepQuality}
          className={styles.button}
          disabled={Object.keys(responses).length < questions.length}
        >
          Assess Sleep Quality
        </button>

        {result && (
          <div className={styles.results}>
            <h2>Sleep Quality Results</h2>
            <div className={styles.resultCard}>
              <div className={styles.scoreDisplay}>
                <span className={styles.scoreValue} style={{ color: result.color }}>
                  {result.sleepQuality}
                </span>
                <span className={styles.scoreLabel}>Score: {result.totalScore}%</span>
              </div>
              
              <div className={styles.breakdown}>
                <div>Sleep Hygiene: {result.categories.sleepHygiene}/9</div>
                <div>Sleep Pattern: {result.categories.sleepPattern}/9</div>
                <div>Sleep Quality: {result.categories.sleepQuality}/9</div>
                <div>Stress Impact: {result.categories.stressImpact}/3</div>
              </div>

              <div className={styles.recommendation}>
                <h3>Recommendations:</h3>
                <ul>
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={() => window.print()} className={styles.button}>Print Results</button>
              <button onClick={() => setResult(null)} className={styles.secondaryButton}>Reset</button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <p className={styles.company}>{COMPANY_INFO.name}</p>
        <p className={styles.disclaimer}>{COMPANY_INFO.disclaimer}</p>
      </div>
    </div>
  );
}
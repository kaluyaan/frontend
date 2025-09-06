
'use client';

import { useState } from 'react';
import { COMPANY_INFO } from '../../constants';
import Navigation from '../../Navigation';
import styles from '../../shared.module.css';

export default function RiskAssessment() {
  const [responses, setResponses] = useState<{[key: string]: string | number}>({});
  const [result, setResult] = useState<{
    totalScore: number;
    riskLevel: string;
    color: string;
    recommendations: string[];
    categories: {[key: string]: number};
  } | null>(null);

  const questions = [
    { id: 'age', label: 'Age', type: 'select', options: ['18-30', '31-45', '46-60', '60+'], scores: [0, 1, 2, 3] },
    { id: 'smoking', label: 'Smoking Status', type: 'select', options: ['Never', 'Former', 'Current'], scores: [0, 1, 3] },
    { id: 'exercise', label: 'Exercise Frequency', type: 'select', options: ['Daily', '3-4 times/week', '1-2 times/week', 'Rarely'], scores: [0, 1, 2, 3] },
    { id: 'diet', label: 'Diet Quality', type: 'select', options: ['Excellent', 'Good', 'Fair', 'Poor'], scores: [0, 1, 2, 3] },
    { id: 'alcohol', label: 'Alcohol Consumption', type: 'select', options: ['None', 'Moderate', 'Heavy'], scores: [0, 1, 3] },
    { id: 'sleep', label: 'Sleep Quality', type: 'select', options: ['Excellent', 'Good', 'Fair', 'Poor'], scores: [0, 1, 2, 3] },
    { id: 'stress', label: 'Stress Level', type: 'select', options: ['Low', 'Moderate', 'High'], scores: [0, 2, 3] },
    { id: 'family_history', label: 'Family History of Disease', type: 'select', options: ['None', 'Some', 'Significant'], scores: [0, 2, 4] },
    { id: 'bmi', label: 'BMI Category', type: 'select', options: ['Normal', 'Overweight', 'Obese'], scores: [0, 2, 3] },
    { id: 'checkups', label: 'Regular Health Checkups', type: 'select', options: ['Annual', 'Every 2-3 years', 'Rarely'], scores: [0, 1, 2] }
  ];

  const handleResponse = (questionId: string, value: string) => {
    const question = questions.find(q => q.id === questionId);
    const optionIndex = question?.options.indexOf(value) || 0;
    const score = question?.scores[optionIndex] || 0;
    
    setResponses(prev => ({ ...prev, [questionId]: value, [`${questionId}_score`]: score }));
  };

  const calculateRisk = () => {
    if (Object.keys(responses).length < questions.length) return;

    let totalScore = 0;
    const categories = {
      lifestyle: 0,
      medical: 0,
      behavioral: 0
    };

    questions.forEach(question => {
      const score = responses[`${question.id}_score`] as number || 0;
      totalScore += score;

      // Categorize scores
      if (['smoking', 'exercise', 'diet', 'alcohol'].includes(question.id)) {
        categories.lifestyle += score;
      } else if (['family_history', 'bmi', 'checkups'].includes(question.id)) {
        categories.medical += score;
      } else {
        categories.behavioral += score;
      }
    });

    const riskLevel = getRiskLevel(totalScore);
    const recommendations = getRiskRecommendations(totalScore, categories);

    setResult({
      totalScore,
      riskLevel: riskLevel.level,
      color: riskLevel.color,
      recommendations,
      categories
    });
  };

  const getRiskLevel = (score: number) => {
    if (score <= 8) return { level: 'Low Risk', color: '#4CAF50' };
    if (score <= 16) return { level: 'Moderate Risk', color: '#FF9800' };
    return { level: 'High Risk', color: '#F44336' };
  };

  const getRiskRecommendations = (score: number, categories: {[key: string]: number}) => {
    const recommendations = [];
    
    if (categories.lifestyle > 5) {
      recommendations.push('Focus on lifestyle improvements: quit smoking, exercise regularly, improve diet');
    }
    if (categories.medical > 4) {
      recommendations.push('Schedule regular health checkups and monitor family history conditions');
    }
    if (categories.behavioral > 3) {
      recommendations.push('Manage stress levels and improve sleep quality');
    }
    
    if (score <= 8) {
      recommendations.push('Maintain current healthy habits');
      recommendations.push('Continue regular preventive care');
    } else if (score <= 16) {
      recommendations.push('Consider lifestyle modifications');
      recommendations.push('Discuss risk factors with healthcare provider');
    } else {
      recommendations.push('Consult healthcare provider for comprehensive evaluation');
      recommendations.push('Prioritize immediate lifestyle changes');
    }

    return recommendations;
  };

  return (
    <div className={styles.container}>
      <Navigation currentPath=""/>
      
      <div className={styles.header}>
        <h1 className={styles.title}>📊 Risk Assessment</h1>
        <p className={styles.subtitle}>Health risk evaluation based on lifestyle</p>
      </div>

      <div className={styles.testSection}>
        {questions.map((question) => (
          <div key={question.id} className={styles.inputGroup}>
            <label className={styles.label}>{question.label}:</label>
            <div className={styles.optionsGrid}>
              {question.options.map(option => (
                <div
                  key={option}
                  className={`${styles.option} ${responses[question.id] === option ? styles.selected : ''}`}
                  onClick={() => handleResponse(question.id, option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button 
          onClick={calculateRisk}
          className={styles.button}
          disabled={Object.keys(responses).length < questions.length * 2}
        >
          Calculate Risk Level
        </button>

        {result && (
          <div className={styles.results}>
            <h2>Risk Assessment Results</h2>
            <div className={styles.resultCard}>
              <div className={styles.scoreDisplay}>
                <span className={styles.scoreValue} style={{ color: result.color }}>
                  {result.riskLevel}
                </span>
                <span className={styles.scoreLabel}>Score: {result.totalScore}/30</span>
              </div>
              
              <div className={styles.breakdown}>
                <div>Lifestyle Risk: {result.categories.lifestyle}</div>
                <div>Medical Risk: {result.categories.medical}</div>
                <div>Behavioral Risk: {result.categories.behavioral}</div>
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
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared.module.css';
import Navigation from '../../Navigation';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{
    bmi: string;
    category: string;
    color: string;
    description: string;
    idealWeight: { min: number; max: number };
    weightDiff: number;
  } | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    if (!weightNum || !heightNum) return;

    let bmi: number;
    if (unit === 'metric') {
      bmi = weightNum / ((heightNum / 100) ** 2);
    } else {
      bmi = (weightNum / (heightNum ** 2)) * 703;
    }

    const category = getBMICategory(bmi);
    const idealWeight = getIdealWeight(heightNum);
    
    setResult({
      bmi: bmi.toFixed(1),
      category: category.name,
      color: category.color,
      description: category.description,
      idealWeight,
      weightDiff: weightNum - idealWeight.max
    });
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { name: 'Underweight', color: '#2196F3', description: 'Below normal weight' };
    if (bmi < 25) return { name: 'Normal', color: '#4CAF50', description: 'Healthy weight range' };
    if (bmi < 30) return { name: 'Overweight', color: '#FF9800', description: 'Above normal weight' };
    return { name: 'Obese', color: '#F44336', description: 'Significantly above normal weight' };
  };

  const getIdealWeight = (height: number) => {
    const heightM = unit === 'metric' ? height / 100 : height * 0.0254;
    const minWeight = 18.5 * (heightM ** 2);
    const maxWeight = 24.9 * (heightM ** 2);
    
    if (unit === 'imperial') {
      return {
        min: Math.round(minWeight * 2.205),
        max: Math.round(maxWeight * 2.205)
      };
    }
    
    return {
      min: Math.round(minWeight),
      max: Math.round(maxWeight)
    };
  };

  return (
    <div className={styles.container}>
      <Link href="/health-test">
        <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          ← Back to Health Tests
        </button>
      </Link>
      <Navigation currentPath="/health-test/fitness-tests/bmi-calculator" />
      
      <div className={styles.testCard}>
        <h1 className={styles.title}>⚖️ BMI Calculator</h1>
        <p className={styles.subtitle}>Body Mass Index and healthy weight assessment</p>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>BMI Assessment:</div>
          <div className={styles.instructionText}>
            Enter your weight and height to calculate your Body Mass Index and get health recommendations.
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Unit System:</label>
          <div className={styles.optionsGrid}>
            <div 
              className={`${styles.option} ${unit === 'metric' ? styles.selected : ''}`}
              onClick={() => setUnit('metric')}
            >
              Metric (kg/cm)
            </div>
            <div 
              className={`${styles.option} ${unit === 'imperial' ? styles.selected : ''}`}
              onClick={() => setUnit('imperial')}
            >
              Imperial (lbs/in)
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Weight ({unit === 'metric' ? 'kg' : 'lbs'}):
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={styles.input}
              placeholder={unit === 'metric' ? '70' : '154'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Height ({unit === 'metric' ? 'cm' : 'inches'}):
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={styles.input}
              placeholder={unit === 'metric' ? '175' : '69'}
            />
          </div>
        </div>

        <button className={styles.button} onClick={calculateBMI}>
          Calculate BMI
        </button>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>BMI Results</div>
            <div className={styles.resultValue}>{result.bmi}</div>
            <div className={styles.resultDetails}>
              <div style={{ color: result.color, fontWeight: 'bold' }}>
                {result.category}
              </div>
              <div>{result.description}</div>
              <div style={{ marginTop: '15px' }}>
                <strong>Ideal Weight Range:</strong><br/>
                {result.idealWeight.min} - {result.idealWeight.max} {unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
          </div>
        )}

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>BMI Categories:</div>
          <div className={styles.instructionText}>
            • Underweight: Below 18.5<br/>
            • Normal: 18.5 - 24.9<br/>
            • Overweight: 25.0 - 29.9<br/>
            • Obese: 30.0 and above
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;

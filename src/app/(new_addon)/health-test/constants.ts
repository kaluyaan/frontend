
import { HealthCategory } from './types';

export const HEALTH_CATEGORIES: HealthCategory[] = [
  {
    name: 'Vision & Hearing Tests',
    tests: [
      {
        title: 'Eye Sight Test',
        description: 'Comprehensive visual acuity and color vision screening',
        path: '/health-test/vision-tests/eye-sight',
        icon: '👁️',
        duration: '5-10 min',
        difficulty: 'Easy'
      },
      {
        title: 'Color Blindness Test',
        description: 'Advanced color vision deficiency screening',
        path: '/health-test/vision-tests/color-blindness',
        icon: '🌈',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Hearing Test',
        description: 'Audio frequency range and hearing acuity test',
        path: '/health-test/vision-tests/hearing-test',
        icon: '👂',
        duration: '5-8 min',
        difficulty: 'Medium'
      }
    ]
  },
  {
    name: 'Cognitive & Mental Health',
    tests: [
      {
        title: 'Memory Test',
        description: 'Short-term and working memory assessment',
        path: '/health-test/cognitive-tests/memory-test',
        icon: '🧠',
        duration: '10-15 min',
        difficulty: 'Medium'
      },
      {
        title: 'Reaction Time Test',
        description: 'Measure your response time and reflexes',
        path: '/health-test/cognitive-tests/reaction-time',
        icon: '⚡',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Attention Span Test',
        description: 'Focus and concentration assessment',
        path: '/health-test/cognitive-tests/attention-span',
        icon: '🎯',
        duration: '8-12 min',
        difficulty: 'Medium'
      },
      {
        title: 'Stress Level Assessment',
        description: 'Evaluate your current stress levels',
        path: '/health-test/cognitive-tests/stress-assessment',
        icon: '😰',
        duration: '5-7 min',
        difficulty: 'Easy'
      }
    ]
  },
  {
    name: 'Physical Fitness Tests',
    tests: [
      {
        title: 'BMI Calculator',
        description: 'Body Mass Index and health weight assessment',
        path: '/health-test/fitness-tests/bmi-calculator',
        icon: '⚖️',
        duration: '2-3 min',
        difficulty: 'Easy'
      },
      {
        title: 'Heart Rate Monitor',
        description: 'Measure and track your heart rate',
        path: '/health-test/fitness-tests/heart-rate',
        icon: '❤️',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Flexibility Test',
        description: 'Assess your body flexibility and mobility',
        path: '/health-test/fitness-tests/flexibility',
        icon: '🤸',
        duration: '10-15 min',
        difficulty: 'Medium'
      },
      {
        title: 'Balance Test',
        description: 'Test your balance and stability',
        path: '/health-test/fitness-tests/balance',
        icon: '⚖️',
        duration: '5-8 min',
        difficulty: 'Medium'
      },
      {
        title: 'Flexibility Test',
        description: 'Assess your body flexibility and mobility',
        path: '/health-test/fitness-tests/flexibility',
        icon: '🤸',
        duration: '10-15 min',
        difficulty: 'Medium'
      },
      {
        title: 'Balance Test',
        description: 'Test your balance and stability',
        path: '/health-test/fitness-tests/balance',
        icon: '⚖️',
        duration: '5-8 min',
        difficulty: 'Medium'
      }
    ]
  },
  {
    name: 'Health Assessments',
    tests: [
      {
        title: 'Symptom Checker',
        description: 'Basic symptom analysis and recommendations',
        path: '/health-test/health-assessments/symptom-checker',
        icon: '🩺',
        duration: '5-10 min',
        difficulty: 'Easy'
      },
      {
        title: 'Risk Assessment',
        description: 'Health risk evaluation based on lifestyle',
        path: '/health-test/health-assessments/risk-assessment',
        icon: '📊',
        duration: '8-12 min',
        difficulty: 'Medium'
      },
      {
        title: 'Wellness Tracker',
        description: 'Overall wellness and lifestyle assessment',
        path: '/health-test/health-assessments/wellness-tracker',
        icon: '🌟',
        duration: '10-15 min',
        difficulty: 'Easy'
      },
      {
        title: 'Sleep Quality Assessment',
        description: 'Evaluate your sleep patterns and quality',
        path: '/health-test/health-assessments/sleep-quality',
        icon: '😴',
        duration: '5-8 min',
        difficulty: 'Easy'
      }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'KALUYAAN',
  tagline: 'Comprehensive Health Testing Suite',
  disclaimer: 'These are basic health screening tools and should not replace professional medical examinations. For accurate diagnosis and treatment, please consult qualified healthcare professionals.'
};
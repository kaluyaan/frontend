import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    name: 'Academic & Educational',
    calculators: [
      {
        title: 'GPA Calculator',
        description: 'Calculate your Grade Point Average from course grades',
        path: '/educate/gpa-calculator',
        icon: '📊',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Grade Calculator',
        description: 'Calculate final grades and required scores',
        path: '/educate/grade-calculator',
        icon: '📝',
        duration: '2-4 min',
        difficulty: 'Easy'
      },
      {
        title: 'Percentage Calculator',
        description: 'Calculate percentages for academic scores',
        path: '/educate/percentage-calculator',
        icon: '📈',
        duration: '1-2 min',
        difficulty: 'Easy'
      },
      {
        title: 'Study Time Calculator',
        description: 'Plan optimal study schedules and time allocation',
        path: '/educate/study-time',
        icon: '⏰',
        duration: '5-7 min',
        difficulty: 'Medium'
      },
      {
        title: 'Exam Score Predictor',
        description: 'Predict exam scores based on preparation',
        path: '/educate/exam-score',
        icon: '🎯',
        duration: '4-6 min',
        difficulty: 'Medium'
      },
      {
        title: 'Scholarship Calculator',
        description: 'Calculate scholarship eligibility and amounts',
        path: '/educate/scholarship-calculator',
        icon: '🎓',
        duration: '6-8 min',
        difficulty: 'Medium'
      }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'KALUYAAN',
  tagline: 'Academic & Educational Calculator Suite',
  disclaimer: 'These calculators provide estimates and should not replace official academic counseling or institutional requirements.'
};
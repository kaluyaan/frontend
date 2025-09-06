import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    name: 'Lifestyle & Personal',
    calculators: [
      {
        title: 'Personality Calculator',
        description: 'Discover your personality type and traits',
        path: '/life-style/personality-calculator',
        icon: '🧠',
        duration: '8-12 min',
        difficulty: 'Medium'
      },
      {
        title: 'Lucky Number Generator',
        description: 'Generate your personal lucky numbers',
        path: '/life-style/lucky-number',
        icon: '🍀',
        duration: '2-3 min',
        difficulty: 'Easy'
      },
      {
        title: 'Name Numerology',
        description: 'Calculate numerological meaning of your name',
        path: '/life-style/name-numerology',
        icon: '🔢',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Biorhythm Calculator',
        description: 'Track your physical, emotional, and intellectual cycles',
        path: '/life-style/biorhythm-calculator',
        icon: '📊',
        duration: '4-6 min',
        difficulty: 'Medium'
      },
      {
        title: 'Mood Calculator',
        description: 'Analyze and track your daily mood patterns',
        path: '/life-style/mood-calculator',
        icon: '😊',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Productivity Calculator',
        description: 'Measure and optimize your productivity levels',
        path: '/life-style/productivity-calculator',
        icon: '⚡',
        duration: '6-8 min',
        difficulty: 'Medium'
      }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'KALUYAAN',
  tagline: 'Lifestyle & Personal Calculator Suite',
  disclaimer: 'These calculators are for entertainment and self-reflection purposes only and should not replace professional advice.'
};

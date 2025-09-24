import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    name: 'Fun & Entertainment',
    calculators: [
      {
        title: 'Compatibility Calculator (Friends)',
        description: 'Test friendship compatibility between two people',
        path: '/fun/compatibility-calculator',
        icon: '👫',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Celebrity Look-alike',
        description: 'Find out which celebrity you look like most',
        path: '/fun/celebrity-lookalike',
        icon: '🌟',
        duration: '2-4 min',
        difficulty: 'Easy'
      },
      {
        title: 'Fortune Teller',
        description: 'Get predictions about your future',
        path: '/fun/fortune-teller',
        icon: '🔮',
        duration: '3-6 min',
        difficulty: 'Easy'
      },
      {
        title: 'Random Decision Maker',
        description: 'Let fate decide for you with random choices',
        path: '/fun/random-decision',
        icon: '🎲',
        duration: '1-2 min',
        difficulty: 'Easy'
      },
      {
        title: 'Quiz Score Calculator',
        description: 'Calculate and analyze quiz performance',
        path: '/fun/quiz-score',
        icon: '🧩',
        duration: '2-4 min',
        difficulty: 'Easy'
      },
      {
        title: 'Game Statistics Calculator',
        description: 'Track and analyze your gaming performance',
        path: '/fun/game-statistics',
        icon: '🎮',
        duration: '4-6 min',
        difficulty: 'Medium'
      }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'KALUYAAN',
  tagline: 'Fun & Entertainment Calculator Suite',
  disclaimer: 'These calculators are purely for entertainment purposes and should be taken with a sense of humor!'
};

import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    name: 'Love & Relationship Calculators',
    calculators: [
      {
        title: 'Love Calculator',
        description: 'Calculate love compatibility percentage between two people',
        path: '/relationship/love-calculator',
        icon: '💕',
        duration: '2-3 min',
        difficulty: 'Easy'
      },
      {
        title: 'Relationship Compatibility Test',
        description: 'Deep analysis of relationship compatibility factors',
        path: '/relationship/compatibility-test',
        icon: '💑',
        duration: '8-10 min',
        difficulty: 'Medium'
      },
      {
        title: 'Soulmate Finder',
        description: 'Discover if someone is your perfect soulmate match',
        path: '/relationship/soulmate-finder',
        icon: '💖',
        duration: '5-7 min',
        difficulty: 'Medium'
      },
      {
        title: 'Wedding Date Calculator',
        description: 'Calculate your ideal wedding date and timeline',
        path: '/relationship/wedding-date',
        icon: '💒',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Anniversary Calculator',
        description: 'Calculate important relationship milestones',
        path: '/relationship/anniversary-calculator',
        icon: '🎉',
        duration: '2-4 min',
        difficulty: 'Easy'
      },
      {
        title: 'Breakup Recovery Timeline',
        description: 'Calculate your breakup recovery timeline and tips',
        path: '/relationship/breakup-recovery',
        icon: '💔',
        duration: '5-8 min',
        difficulty: 'Easy'
      }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'KALUYAAN',
  tagline: 'Love & Relationship Calculator Suite',
  disclaimer: 'These calculators are for entertainment purposes only and should not replace professional relationship counseling.'
};
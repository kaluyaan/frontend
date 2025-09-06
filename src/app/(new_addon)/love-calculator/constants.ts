import { LoveCategory } from './types';

export const LOVE_CATEGORIES: LoveCategory[] = [
  {
    name: 'Love & Compatibility',
    calculators: [
      {
        title: 'Love Calculator',
        description: 'Calculate love compatibility percentage between two people',
        path: '/love-calculator/love-tests/love-calculator',
        icon: '💕',
        duration: '2-3 min',
        difficulty: 'Easy'
      },
      {
        title: 'Soulmate Finder',
        description: 'Discover if someone is your perfect soulmate match',
        path: '/love-calculator/love-tests/soulmate-finder',
        icon: '💖',
        duration: '5-7 min',
        difficulty: 'Medium'
      },
      {
        title: 'Relationship Compatibility',
        description: 'Deep analysis of relationship compatibility factors',
        path: '/love-calculator/love-tests/relationship-compatibility',
        icon: '💑',
        duration: '8-10 min',
        difficulty: 'Medium'
      }
    ]
  },
  {
    name: 'Relationship Timeline',
    calculators: [
      {
        title: 'Wedding Date Predictor',
        description: 'Predict your ideal wedding date and timeline',
        path: '/love-calculator/timeline/wedding-date',
        icon: '💒',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Anniversary Calculator',
        description: 'Calculate important relationship milestones',
        path: '/love-calculator/timeline/anniversary-calculator',
        icon: '🎉',
        duration: '2-4 min',
        difficulty: 'Easy'
      },
      {
        title: 'Relationship Stage',
        description: 'Determine your current relationship stage and next steps',
        path: '/love-calculator/timeline/relationship-stage',
        icon: '📈',
        duration: '6-8 min',
        difficulty: 'Medium'
      }
    ]
  },
  {
    name: 'Fun Love Tests',
    calculators: [
      {
        title: 'Crush Calculator',
        description: 'Find out if your crush likes you back',
        path: '/love-calculator/fun-tests/crush-calculator',
        icon: '😍',
        duration: '3-5 min',
        difficulty: 'Easy'
      },
      {
        title: 'Love Language Test',
        description: 'Discover your primary love language',
        path: '/love-calculator/fun-tests/love-language',
        icon: '💬',
        duration: '7-10 min',
        difficulty: 'Medium'
      },
      {
        title: 'Future Relationship',
        description: 'Predict your future romantic relationship',
        path: '/love-calculator/fun-tests/future-relationship',
        icon: '🔮',
        duration: '4-6 min',
        difficulty: 'Easy'
      }
    ]
  },
  {
    name: 'Relationship Health',
    calculators: [
      {
        title: 'Relationship Strength',
        description: 'Assess the strength and health of your relationship',
        path: '/love-calculator/health/relationship-strength',
        icon: '💪',
        duration: '8-12 min',
        difficulty: 'Medium'
      },
      {
        title: 'Breakup Recovery',
        description: 'Calculate your breakup recovery timeline and tips',
        path: '/love-calculator/health/breakup-recovery',
        icon: '💔',
        duration: '5-8 min',
        difficulty: 'Easy'
      },
      {
        title: 'Trust Calculator',
        description: 'Evaluate trust levels in your relationship',
        path: '/love-calculator/health/trust-calculator',
        icon: '🤝',
        duration: '6-9 min',
        difficulty: 'Medium'
      }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'KALUYAAN',
  tagline: 'Love & Relationship Calculator Suite',
  disclaimer: 'These calculators are for entertainment purposes only and should not replace professional relationship counseling or advice.'
};

export const LOVE_QUOTES = [
  "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
  "The best love is the kind that awakens the soul and makes us reach for more.",
  "Love is composed of a single soul inhabiting two bodies.",
  "In all the world, there is no heart for me like yours.",
  "Love is friendship that has caught fire."
];

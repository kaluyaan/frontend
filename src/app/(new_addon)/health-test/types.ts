
export interface HealthTest {
  title: string;
  description: string;
  path: string;
  icon: string;
  duration?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface HealthCategory {
  name: string;
  tests: HealthTest[];
}

export interface TestResult {
  type: string;
  score: number | string;
  details: string;
  recommendation?: string;
  date?: string;
  status?: 'excellent' | 'good' | 'fair' | 'poor' | 'needs-attention';
}

export interface FlexibilityResult {
  sitAndReach: number;
  shoulderFlexibility: number;
  overallScore: number;
  category: string;
}

export interface BalanceResult {
  singleLegStand: number;
  eyesClosedBalance: number;
  overallScore: number;
  category: string;
}

export type TestType = 'vision' | 'cognitive' | 'fitness' | 'assessment';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type TestStatus = 'not-started' | 'in-progress' | 'completed';


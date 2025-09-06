
export interface LoveCalculator {
  title: string;
  description: string;
  path: string;
  icon: string;
  duration?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface LoveCategory {
  name: string;
  calculators: LoveCalculator[];
}

export interface LoveResult {
  type: string;
  score: number | string;
  details: string;
  recommendation?: string;
  date?: string;
  status?: 'perfect' | 'excellent' | 'good' | 'fair' | 'poor';
}

export interface CompatibilityResult {
  percentage: number;
  category: string;
  description: string;
  advice: string[];
}

export interface RelationshipResult {
  stage: string;
  timeline: string;
  nextStep: string;
  tips: string[];
}

export type CalculatorType = 'love' | 'compatibility' | 'relationship' | 'fun';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type ResultStatus = 'calculating' | 'completed' | 'error';


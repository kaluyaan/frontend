export interface Calculator {
  title: string;
  description: string;
  path: string;
  icon: string;
  duration?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface Category {
  name: string;
  calculators: Calculator[];
}

export interface CalculatorResult {
  type: string;
  score: number | string;
  details: string;
  recommendation?: string;
  date?: string;
}

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';


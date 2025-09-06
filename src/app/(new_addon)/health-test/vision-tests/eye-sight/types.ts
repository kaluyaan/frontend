
export interface ChartLine {
  size: number;
  letters: string[];
}

export interface Language {
  name: string;
  letters: string[];
  chart: ChartLine[];
}

export interface Languages {
  [key: string]: Language;
}

export interface ColorTest {
  id: number;
  colors: string[];
  correctAnswer: string;
  question: string;
  hiddenNumber: string;
}

export interface TestResult {
  type: 'visual' | 'color';
  score: number;
  details: string;
}

export type TestType = 'visual' | 'color';
export type LanguageKey = 'english' | 'spanish' | 'arabic' | 'chinese' | 'hindi';


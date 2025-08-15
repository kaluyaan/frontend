// types/index.ts
export interface HumanizationOptions {
  addPersonalTouch: boolean;
  varyStructure: boolean;
  useContractions: boolean;
  addFillers: boolean;
  casualTone: boolean;
}

export interface Stats {
  wordCount: number;
  sentenceCount: number;
  changesCount: number;
  humanScore: number;
}

export interface HumanizationResult {
  text: string;
  stats: Stats;
}
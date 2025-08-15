// lib/textHumanizer.ts
import { HumanizationOptions, HumanizationResult, Stats } from '../types';

export class TextHumanizer {
  private personalExpressions = [
    "you know", "I mean", "honestly", "frankly", "to be honest",
    "if you ask me", "in my opinion", "personally", "I think",
    "basically", "actually", "really", "quite", "pretty much",
    "sort of", "kind of", "somehow", "anyway", "well"
  ];

  private transitionWords = [
    "however", "although", "meanwhile", "furthermore", "moreover",
    "consequently", "therefore", "nonetheless", "nevertheless",
    "in addition", "on the other hand", "for instance", "similarly",
    "in contrast", "as a result", "that said", "even so"
  ];

  private casualReplacements = {
    "utilize": "use",
    "commence": "start",
    "terminate": "end",
    "demonstrate": "show",
    "implement": "put in place",
    "facilitate": "help",
    "optimize": "improve",
    "leverage": "use",
    "subsequent": "next",
    "prior to": "before",
    "in order to": "to",
    "due to the fact that": "because",
    "it is important to note": "note that",
    "it should be mentioned": "also",
    "furthermore": "also",
    "additionally": "plus"
  };

  private contractions = {
    "do not": "don't",
    "does not": "doesn't",
    "did not": "didn't",
    "will not": "won't",
    "would not": "wouldn't",
    "could not": "couldn't",
    "should not": "shouldn't",
    "cannot": "can't",
    "is not": "isn't",
    "are not": "aren't",
    "was not": "wasn't",
    "were not": "weren't",
    "have not": "haven't",
    "has not": "hasn't",
    "had not": "hadn't",
    "I am": "I'm",
    "you are": "you're",
    "he is": "he's",
    "she is": "she's",
    "it is": "it's",
    "we are": "we're",
    "they are": "they're",
    "I have": "I've",
    "you have": "you've",
    "we have": "we've",
    "they have": "they've",
    "I will": "I'll",
    "you will": "you'll",
    "he will": "he'll",
    "she will": "she'll",
    "it will": "it'll",
    "we will": "we'll",
    "they will": "they'll"
  };

  private fillerPhrases = [
    "you see", "look", "listen", "here's the thing", "the way I see it",
    "if you think about it", "at the end of the day", "when it comes down to it",
    "let's be real", "truth is", "the fact is", "believe it or not"
  ];

  private changesMade = 0;

  public humanize(text: string, options: HumanizationOptions): HumanizationResult {
    this.changesMade = 0;
    let result = text;

    if (options.useContractions) {
      result = this.addContractions(result);
    }

    if (options.casualTone) {
      result = this.makeCasual(result);
    }

    if (options.varyStructure) {
      result = this.varyStructure(result);
    }

    if (options.addPersonalTouch) {
      result = this.addPersonalExpressions(result);
    }

    if (options.addFillers) {
      result = this.addFillers(result);
    }

    result = this.addTypos(result);
    result = this.addImperfections(result);
    result = this.adjustPunctuation(result);
    result = this.addEmotionalVariations(result);

    const stats = this.calculateStats(text, result);

    return {
      text: result,
      stats
    };
  }

  private addContractions(text: string): string {
    let result = text;
    for (const [full, contracted] of Object.entries(this.contractions)) {
      const regex = new RegExp(`\\b${full}\\b`, 'gi');
      if (result.match(regex)) {
        result = result.replace(regex, contracted);
        this.changesMade++;
      }
    }
    return result;
  }

  private makeCasual(text: string): string {
    let result = text;
    for (const [formal, casual] of Object.entries(this.casualReplacements)) {
      const regex = new RegExp(`\\b${formal}\\b`, 'gi');
      if (result.match(regex)) {
        result = result.replace(regex, casual);
        this.changesMade++;
      }
    }
    return result;
  }

  private varyStructure(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const result: string[] = [];

    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences[i].trim();
      if (!sentence) continue;

      // Randomly combine short sentences
      if (sentence.split(' ').length < 8 && i < sentences.length - 1 && Math.random() > 0.6) {
        const nextSentence = sentences[i + 1].trim();
        if (nextSentence) {
          const connectors = ['and', 'but', 'so', 'plus', 'also'];
          const connector = connectors[Math.floor(Math.random() * connectors.length)];
          sentence = `${sentence}, ${connector} ${nextSentence.toLowerCase()}`;
          i++; // Skip next sentence
          this.changesMade++;
        }
      }

      // Randomly split long sentences
      if (sentence.split(' ').length > 20 && Math.random() > 0.7) {
        const words = sentence.split(' ');
        const midPoint = Math.floor(words.length / 2);
        const firstPart = words.slice(0, midPoint).join(' ');
        const secondPart = words.slice(midPoint).join(' ');
        result.push(firstPart + '.');
        result.push(secondPart.charAt(0).toUpperCase() + secondPart.slice(1));
        this.changesMade++;
      } else {
        result.push(sentence);
      }
    }

    return result.join('. ') + '.';
  }

  private addPersonalExpressions(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const result: string[] = [];

    for (let sentence of sentences) {
      sentence = sentence.trim();
      if (!sentence) continue;

      // Add personal expressions randomly
      if (Math.random() > 0.7) {
        const expression = this.personalExpressions[Math.floor(Math.random() * this.personalExpressions.length)];
        if (Math.random() > 0.5) {
          sentence = `${expression}, ${sentence.toLowerCase()}`;
        } else {
          sentence = `${sentence}, ${expression}`;
        }
        this.changesMade++;
      }

      result.push(sentence);
    }

    return result.join('. ') + '.';
  }

  private addFillers(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    
    for (let i = 0; i < sentences.length; i++) {
      if (Math.random() > 0.8) {
        const filler = this.fillerPhrases[Math.floor(Math.random() * this.fillerPhrases.length)];
        sentences[i] = sentences[i].trim();
        if (Math.random() > 0.5) {
          sentences[i] = `${filler}, ${sentences[i].toLowerCase()}`;
        } else {
          sentences[i] = `${sentences[i]} - ${filler}`;
        }
        this.changesMade++;
      }
    }

    return sentences.join('. ') + '.';
  }

  private addTypos(text: string): string {
    let result = text;
    const patterns: Record<string, string> = {
      'because': Math.random() > 0.9 ? 'becuase' : 'because',
      'definitely': Math.random() > 0.9 ? 'definately' : 'definitely',
      'separate': Math.random() > 0.9 ? 'seperate' : 'separate'
    };

    for (const [correct, maybe] of Object.entries(patterns)) {
      if (maybe !== correct) {
        result = result.replace(new RegExp(`\\b${correct}\\b`, 'g'), maybe);
        this.changesMade++;
      }
    }

    return result;
  }

  private addImperfections(text: string): string {
    let result = text;
    
    // Add redundant words occasionally
    if (Math.random() > 0.8) {
      result = result.replace(/\bthat\b/g, Math.random() > 0.5 ? 'that' : 'that actually');
      this.changesMade++;
    }

    // Add hesitation markers
    if (Math.random() > 0.7) {
      result = result.replace(/\. /g, Math.random() > 0.8 ? '... ' : '. ');
      this.changesMade++;
    }

    return result;
  }

  private adjustPunctuation(text: string): string {
    let result = text;
    
    // Replace some periods with exclamation marks for enthusiasm
    if (Math.random() > 0.8) {
      const sentences = result.split('.');
      for (let i = 0; i < sentences.length - 1; i++) {
        if (Math.random() > 0.9 && sentences[i].trim()) {
          sentences[i] += '!';
          this.changesMade++;
          break;
        }
      }
      result = sentences.join('.');
    }

    return result;
  }

  private addEmotionalVariations(text: string): string {
    let result = text;
    
    const emotionalWords: Record<string, string[]> = {
      'good': ['great', 'awesome', 'nice', 'cool', 'sweet'],
      'bad': ['terrible', 'awful', 'crappy', 'horrible'],
      'big': ['huge', 'massive', 'enormous'],
      'small': ['tiny', 'little', 'mini'],
      'very': ['really', 'super', 'pretty', 'quite']
    };

    for (const [word, alternatives] of Object.entries(emotionalWords)) {
      if (result.includes(word) && Math.random() > 0.7) {
        const alternative = alternatives[Math.floor(Math.random() * alternatives.length)];
        result = result.replace(new RegExp(`\\b${word}\\b`, 'i'), alternative);
        this.changesMade++;
      }
    }

    return result;
  }

  private calculateStats(original: string, humanized: string): Stats {
    const wordCount = humanized.split(/\s+/).length;
    const sentenceCount = humanized.split(/[.!?]+/).filter(s => s.trim()).length;
    const humanScore = Math.min(95, 60 + (this.changesMade * 2));

    return {
      wordCount,
      sentenceCount,
      changesCount: this.changesMade,
      humanScore
    };
  }
}

// Export the main function for use in components
export const humanizeText = (text: string, options: HumanizationOptions): HumanizationResult => {
  const humanizer = new TextHumanizer();
  return humanizer.humanize(text, options);
};
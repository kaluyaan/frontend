

export interface SynonymGroup {
  [key: string]: string[];
}

export const synonymDictionary: SynonymGroup = {
  // Common verbs
  "make": ["create", "build", "construct", "produce", "generate", "craft"],
  "get": ["obtain", "acquire", "receive", "fetch", "retrieve", "gain"],
  "go": ["travel", "move", "proceed", "advance", "journey", "head"],
  "see": ["observe", "view", "notice", "witness", "spot", "glimpse"],
  "say": ["state", "declare", "mention", "express", "announce", "utter"],
  "think": ["believe", "consider", "ponder", "reflect", "contemplate", "assume"],
  "know": ["understand", "realize", "comprehend", "recognize", "grasp", "perceive"],
  "want": ["desire", "wish", "crave", "need", "require", "seek"],
  "use": ["utilize", "employ", "apply", "operate", "implement", "leverage"],
  "work": ["function", "operate", "perform", "labor", "toil", "execute"],
  
  // Common adjectives
  "good": ["excellent", "great", "wonderful", "fantastic", "superb", "outstanding"],
  "bad": ["terrible", "awful", "horrible", "poor", "dreadful", "unpleasant"],
  "big": ["large", "huge", "enormous", "massive", "gigantic", "substantial"],
  "small": ["tiny", "little", "miniature", "compact", "petite", "minor"],
  "fast": ["quick", "rapid", "swift", "speedy", "hasty", "brisk"],
  "slow": ["sluggish", "gradual", "leisurely", "unhurried", "delayed", "steady"],
  "easy": ["simple", "effortless", "straightforward", "uncomplicated", "basic", "smooth"],
  "hard": ["difficult", "challenging", "tough", "complex", "demanding", "strenuous"],
  "new": ["fresh", "recent", "modern", "latest", "contemporary", "novel"],
  "old": ["ancient", "aged", "vintage", "mature", "elderly", "outdated"],
  
  // Common nouns
  "person": ["individual", "human", "being", "character", "soul", "citizen"],
  "place": ["location", "spot", "area", "site", "position", "venue"],
  "thing": ["object", "item", "element", "matter", "substance", "entity"],
  "time": ["moment", "period", "duration", "era", "epoch", "interval"],
  "way": ["method", "approach", "technique", "manner", "style", "procedure"],
  "day": ["date", "period", "time", "occasion", "moment", "era"],
  "man": ["gentleman", "male", "guy", "fellow", "individual", "person"],
  "woman": ["lady", "female", "girl", "individual", "person", "being"],
  "child": ["kid", "youngster", "youth", "minor", "juvenile", "offspring"],
  "world": ["globe", "earth", "planet", "universe", "realm", "domain"],
  
  // Adverbs
  "very": ["extremely", "incredibly", "remarkably", "exceptionally", "tremendously", "highly"],
  "really": ["truly", "genuinely", "actually", "indeed", "certainly", "definitely"],
  "quite": ["rather", "fairly", "somewhat", "pretty", "moderately", "reasonably"],
  "always": ["constantly", "perpetually", "continuously", "forever", "eternally", "invariably"],
  "never": ["not ever", "at no time", "under no circumstances", "not once", "not at all"],
  "often": ["frequently", "regularly", "commonly", "repeatedly", "habitually", "usually"],
  "sometimes": ["occasionally", "periodically", "now and then", "from time to time", "sporadically"],
  
  // Additional common words
  "help": ["assist", "aid", "support", "guide", "facilitate", "contribute"],
  "show": ["display", "demonstrate", "reveal", "exhibit", "present", "illustrate"],
  "find": ["discover", "locate", "identify", "uncover", "detect", "spot"],
  "give": ["provide", "offer", "supply", "deliver", "present", "grant"],
  "take": ["grab", "seize", "acquire", "obtain", "capture", "collect"],
  "come": ["arrive", "approach", "reach", "appear", "emerge", "visit"],
  "look": ["glance", "gaze", "stare", "observe", "examine", "inspect"],
  "feel": ["sense", "experience", "perceive", "detect", "notice", "realize"],
  "seem": ["appear", "look", "sound", "feel", "come across", "give impression"],
  "try": ["attempt", "endeavor", "strive", "effort", "seek", "aim"],
  "ask": ["inquire", "question", "request", "demand", "seek", "query"],
  "need": ["require", "demand", "necessitate", "call for", "must have", "depend on"],
  "become": ["turn into", "transform", "develop into", "evolve", "grow", "change"],
  "important": ["significant", "crucial", "vital", "essential", "critical", "key"],

  "possible": ["feasible", "achievable", "potential", "viable", "likely", "probable"],
  "available": ["accessible", "obtainable", "ready", "present", "at hand", "offered"],
  "sure": ["certain", "confident", "positive", "convinced", "definite", "assured"],
  "right": ["correct", "accurate", "proper", "appropriate", "suitable", "fitting"],
  "little": ["small", "tiny", "minor", "slight", "minimal", "compact"],
  "long": ["lengthy", "extended", "prolonged", "extensive", "stretched", "drawn-out"],
  "high": ["tall", "elevated", "lofty", "towering", "raised", "upper"],
};

export const toneTransformations = {
  formal: {
    patterns: [
      { from: /\bI think\b/gi, to: "I believe" },
      { from: /\bkinda\b/gi, to: "somewhat" },
      { from: /\bwanna\b/gi, to: "wish to" },
      { from: /\bgonna\b/gi, to: "going to" },
      { from: /\bcan't\b/gi, to: "cannot" },
      { from: /\bwon't\b/gi, to: "will not" },
      { from: /\bdon't\b/gi, to: "do not" },
    ]
  },
  casual: {
    patterns: [
      { from: /\bI believe\b/gi, to: "I think" },
      { from: /\bcannot\b/gi, to: "can't" },
      { from: /\bwill not\b/gi, to: "won't" },
      { from: /\bdo not\b/gi, to: "don't" },
      { from: /\bgoing to\b/gi, to: "gonna" },
    ]
  },
  professional: {
    patterns: [
      { from: /\bI think\b/gi, to: "In my opinion" },
      { from: /\bmaybe\b/gi, to: "perhaps" },
      { from: /\bokay\b/gi, to: "acceptable" },
      { from: /\bgreat\b/gi, to: "excellent" },
    ]
  }
};

export function generateSimilarSentences(
  sentence: string, 
  level: number = 3, 
  tone: keyof typeof toneTransformations = 'formal'
): string[] {
  const results: string[] = [];
  const words = sentence.split(/\s+/);
  
  // Apply tone transformation first
  let baseSentence = sentence;
  if (toneTransformations[tone]) {
    toneTransformations[tone].patterns.forEach(pattern => {
      baseSentence = baseSentence.replace(pattern.from, pattern.to);
    });
  }
  
  // Generate multiple variations
  const numVariations = Math.max(level, 3);
  const replacementIntensity = Math.min(0.8, 0.2 + (level - 1) * 0.15);
  
  for (let i = 0; i < numVariations; i++) {
    let variation = baseSentence;
    const wordsProcessed = new Set<number>();
    
    words.forEach((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[^a-zA-Z]/g, '');
      
      if (synonymDictionary[cleanWord] && 
          Math.random() < replacementIntensity && 
          !wordsProcessed.has(index)) {
        
        const synonyms = synonymDictionary[cleanWord];
        const randomSynonym = synonyms[Math.floor(Math.random() * synonyms.length)];
        
        // Preserve original capitalization
        const finalSynonym = word[0] === word[0].toUpperCase() 
          ? randomSynonym.charAt(0).toUpperCase() + randomSynonym.slice(1)
          : randomSynonym;
        
        // Replace while preserving punctuation
        const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        variation = variation.replace(regex, word.replace(cleanWord, finalSynonym));
        wordsProcessed.add(index);
      }
    });
    
    // Ensure variation is different and unique
    if (variation !== sentence && variation !== baseSentence && !results.includes(variation)) {
      results.push(variation);
    }
  }
  
  // If no variations generated, create at least one
  if (results.length === 0 && baseSentence !== sentence) {
    results.push(baseSentence);
  }
  
  return results.slice(0, Math.max(level, 3));
}



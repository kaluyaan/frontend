"use client";
import { useState, useEffect, JSX } from "react";
import styles from "../shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

// Types
interface TestResult {
  accuracy: number;
  score: number;
  totalAttempts: number;
  category: string;
  color: string;
  testType: string;
}

interface TestType {
  id: string;
  name: string;
  icon: string;
}

interface Instructions {
  title: string;
  instructions: string[];
}

// Mock constants since they're not provided
const mockCompanyInfo = {
  name: "Kaaluyaan Health",
  disclaimer: "This test is for educational purposes only and should not replace professional medical advice."
};

export default function AttentionSpanTest(): JSX.Element {
  const [activeTest, setActiveTest] = useState<string>("number");
  const [phase, setPhase] = useState<"instructions" | "test" | "results">("instructions");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [result, setResult] = useState<TestResult | null>(null);

  // Number Test State
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [targetNumber, setTargetNumber] = useState<number>(7);

  // Color Test State
  const [currentColor, setCurrentColor] = useState<string>("");
  const [targetColor, setTargetColor] = useState<string>("red");
  const [colors] = useState<string[]>(["red", "blue", "green", "yellow", "purple", "orange"]);

  // Word Test State
  const [currentWord, setCurrentWord] = useState<string>("");
  const [targetWord, setTargetWord] = useState<string>("FOCUS");
  const [words] = useState<string[]>(["FOCUS", "THINK", "LEARN", "STUDY", "BRAIN", "MIND", "SHARP", "QUICK"]);

  // Sequence Test State
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState<boolean>(false);
  const [sequenceStep, setSequenceStep] = useState<number>(0);

  // Stroop Test State
  const [colorWord, setColorWord] = useState<string>("");
  const [wordColor, setWordColor] = useState<string>("");
  const [stroopOptions, setStroopOptions] = useState<string[]>([]);

  const testTypes: TestType[] = [
    { id: "number", name: "Number Focus", icon: "🔢" },
    { id: "color", name: "Color Recognition", icon: "🎨" },
    { id: "word", name: "Word Spotting", icon: "📝" },
    { id: "sequence", name: "Memory Sequence", icon: "🧩" },
    { id: "stroop", name: "Stroop Test", icon: "🌈" }
  ];

  // Generate random data functions
  const generateRandomNumber = (): number => Math.floor(Math.random() * 10);
  
  const generateRandomColor = (): string => colors[Math.floor(Math.random() * colors.length)];
  
  const generateRandomWord = (): string => words[Math.floor(Math.random() * words.length)];
  
  const generateSequence = (): number[] => {
    const newSequence: number[] = [];
    const sequenceLength = Math.min(3 + Math.floor(score / 5), 8);
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(Math.floor(Math.random() * 9));
    }
    return newSequence;
  };

  const generateStroopTest = (): { word: string; color: string; options: string[] } => {
    const colorNames = ["RED", "BLUE", "GREEN", "YELLOW"];
    const colorHexes = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"];
    const word = colorNames[Math.floor(Math.random() * colorNames.length)];
    const color = colorHexes[Math.floor(Math.random() * colorHexes.length)];
    const options = [...colorNames].sort(() => Math.random() - 0.5);
    
    return { word, color, options };
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (phase === "test" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        
        // Update test content based on active test
        switch (activeTest) {
          case "number":
            setCurrentNumber(generateRandomNumber());
            break;
          case "color":
            setCurrentColor(generateRandomColor());
            break;
          case "word":
            setCurrentWord(generateRandomWord());
            break;
          case "stroop":
            const stroopData = generateStroopTest();
            setColorWord(stroopData.word);
            setWordColor(stroopData.color);
            setStroopOptions(stroopData.options);
            break;
        }
        
        setTotalAttempts(prev => prev + 1);
      }, activeTest === "sequence" ? 2000 : 1000);
    } else if (timeLeft === 0 && phase === "test") {
      calculateResults();
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [phase, timeLeft, activeTest, score]); // Added missing dependencies

  const startTest = (): void => {
    setPhase("test");
    setScore(0);
    setTotalAttempts(0);
    setTimeLeft(60);
    setUserSequence([]);
    
    // Initialize test-specific data
    switch (activeTest) {
      case "number":
        setTargetNumber(Math.floor(Math.random() * 10));
        setCurrentNumber(generateRandomNumber());
        break;
      case "color":
        setTargetColor(generateRandomColor());
        setCurrentColor(generateRandomColor());
        break;
      case "word":
        setTargetWord(words[Math.floor(Math.random() * words.length)]);
        setCurrentWord(generateRandomWord());
        break;
      case "sequence":
        const newSeq = generateSequence();
        setSequence(newSeq);
        showSequenceToUser(newSeq);
        break;
      case "stroop":
        const stroopData = generateStroopTest();
        setColorWord(stroopData.word);
        setWordColor(stroopData.color);
        setStroopOptions(stroopData.options);
        break;
    }
  };

  const showSequenceToUser = async (seq: number[]): Promise<void> => {
    setShowingSequence(true);
    setSequenceStep(0);
    
    for (let i = 0; i < seq.length; i++) {
      setSequenceStep(i);
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
    }
    
    setShowingSequence(false);
    setSequenceStep(-1);
  };

  const handleTestAction = (value?: number | string): void => {
    let isCorrect = false;
    
    switch (activeTest) {
      case "number":
        isCorrect = currentNumber === targetNumber;
        break;
      case "color":
        isCorrect = currentColor === targetColor;
        break;
      case "word":
        isCorrect = currentWord === targetWord;
        break;
      case "sequence":
        if (typeof value === "number") {
          const newUserSequence = [...userSequence, value];
          setUserSequence(newUserSequence);
          if (newUserSequence.length === sequence.length) {
            isCorrect = newUserSequence.every((val, idx) => val === sequence[idx]);
            if (isCorrect) {
              setScore(prev => prev + 1);
            }
            setTimeout(() => {
              const nextSeq = generateSequence();
              setSequence(nextSeq);
              setUserSequence([]);
              showSequenceToUser(nextSeq);
            }, 1000);
            return;
          }
        }
        return;
      case "stroop":
        const correctColorName = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"]
          .indexOf(wordColor);
        const correctAnswer = ["RED", "BLUE", "GREEN", "YELLOW"][correctColorName];
        isCorrect = value === correctAnswer;
        break;
    }
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const calculateResults = (): void => {
    const accuracy = totalAttempts > 0 ? (score / totalAttempts) * 100 : 0;
    let category = "";
    let color = "";

    if (accuracy >= 90) {
      category = "Excellent Focus";
      color = "#4CAF50";
    } else if (accuracy >= 75) {
      category = "Good Attention";
      color = "#2196F3";
    } else if (accuracy >= 60) {
      category = "Fair Concentration";
      color = "#FF9800";
    } else {
      category = "Needs Practice";
      color = "#F44336";
    }

    const currentTest = testTypes.find(t => t.id === activeTest);
    
    setResult({
      accuracy: Math.round(accuracy),
      score,
      totalAttempts,
      category,
      color,
      testType: currentTest?.name || "Unknown Test"
    });
    setPhase("results");
  };

  const resetTest = (): void => {
    setPhase("instructions");
    setResult(null);
    setUserSequence([]);
    setSequenceStep(-1);
  };

  const renderTestContent = (): JSX.Element => {
    switch (activeTest) {
      case "number":
        return (
          <div className={styles.gameArea}>
            <div className={styles.enhancedTargetDisplay}>
              <div className={styles.targetLabel}>Target Number:</div>
              <span className={styles.enhancedTargetNumber}>{targetNumber}</span>
            </div>
            <div className={styles.numberDisplay} onClick={() => handleTestAction()}>
              {currentNumber}
            </div>
            <div className={styles.enhancedStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{score}</span>
                <span className={styles.statLabel}>Correct</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{totalAttempts}</span>
                <span className={styles.statLabel}>Total</span>
              </div>
            </div>
          </div>
        );

      case "color":
        return (
          <div className={styles.gameArea}>
            <div className={styles.enhancedTargetDisplay}>
              <div className={styles.targetLabel}>Target Color:</div>
              <span className={styles.enhancedTargetNumber}>{targetColor.toUpperCase()}</span>
            </div>
            <div 
              className={styles.colorTestBox} 
              style={{ backgroundColor: currentColor }}
              onClick={() => handleTestAction()}
            />
            <div className={styles.enhancedStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{score}</span>
                <span className={styles.statLabel}>Correct</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{totalAttempts}</span>
                <span className={styles.statLabel}>Total</span>
              </div>
            </div>
          </div>
        );

      case "word":
        return (
          <div className={styles.gameArea}>
            <div className={styles.enhancedTargetDisplay}>
              <div className={styles.targetLabel}>Target Word:</div>
              <span className={styles.enhancedTargetNumber}>{targetWord}</span>
            </div>
            <div className={styles.wordTestDisplay} onClick={() => handleTestAction()}>
              {currentWord}
            </div>
            <div className={styles.enhancedStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{score}</span>
                <span className={styles.statLabel}>Correct</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{totalAttempts}</span>
                <span className={styles.statLabel}>Total</span>
              </div>
            </div>
          </div>
        );

      case "sequence":
        return (
          <div className={styles.gameArea}>
            <div className="mb-4">
              {showingSequence ? (
                <div className={styles.sequenceLoader}>
                  Watch the sequence<span className="loadingDots"></span>
                </div>
              ) : (
                <h3 className={homeStyle.normalTitle}>Click the sequence in order:</h3>
              )}
            </div>
            <div className={styles.sequenceDisplay}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <div
                  key={num}
                  className={`${styles.sequenceItem} ${
                    showingSequence && sequenceStep >= 0 && sequence[sequenceStep] === num
                      ? styles.sequenceActive
                      : userSequence.includes(num)
                      ? styles.sequenceSelected
                      : styles.sequenceDefault
                  }`}
                  onClick={() => !showingSequence && handleTestAction(num)}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className={styles.enhancedStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{score}</span>
                <span className={styles.statLabel}>Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{userSequence.join('-') || 'None'}</span>
                <span className={styles.statLabel}>Current</span>
              </div>
            </div>
          </div>
        );

      case "stroop":
        return (
          <div className={styles.gameArea}>
            <div className="mb-6">
              <h3 className={homeStyle.normalTitle}>Click the COLOR of the text, not the word:</h3>
            </div>
            <div 
              className={styles.stroopWordDisplay}
              style={{ color: wordColor }}
            >
              {colorWord}
            </div>
            <div className={styles.stroopOptionsGrid}>
              {stroopOptions.map(option => (
                <button
                  key={option}
                  className={styles.stroopOption}
                  onClick={() => handleTestAction(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className={styles.enhancedStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{score}</span>
                <span className={styles.statLabel}>Correct</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{totalAttempts}</span>
                <span className={styles.statLabel}>Total</span>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Test not found</div>;
    }
  };

  const getInstructions = (): Instructions => {
    switch (activeTest) {
      case "number":
        return {
          title: "Number Focus Test",
          instructions: [
            "Numbers will appear on screen every second",
            `Click when you see the target number: ${targetNumber}`,
            "Test duration: 60 seconds",
            "Stay focused and click only on the target number"
          ]
        };
      case "color":
        return {
          title: "Color Recognition Test",
          instructions: [
            "Different colored boxes will appear every second",
            `Click when you see the target color: ${targetColor}`,
            "Test duration: 60 seconds",
            "Focus on color recognition and quick responses"
          ]
        };
      case "word":
        return {
          title: "Word Spotting Test",
          instructions: [
            "Words will appear on screen every second",
            `Click when you see the target word: ${targetWord}`,
            "Test duration: 60 seconds",
            "Improve reading speed and word recognition"
          ]
        };
      case "sequence":
        return {
          title: "Memory Sequence Test",
          instructions: [
            "Watch the sequence of numbers light up",
            "After the sequence ends, click the numbers in the same order",
            "Sequences get longer as you progress",
            "Tests working memory and attention span"
          ]
        };
      case "stroop":
        return {
          title: "Stroop Interference Test",
          instructions: [
            "You'll see color names written in different colors",
            "Click the COLOR of the text, NOT the word itself",
            "Example: If 'BLUE' is written in red, click 'RED'",
            "Tests cognitive flexibility and attention control"
          ]
        };
      default:
        return { title: "", instructions: [] };
    }
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection 
          icon="🧠" 
          title="Advanced Attention Span Tests" 
          text="Challenge your mind with multiple types of attention and focus tests. Track your progress and improve your concentration skills."
        />

        <div className={homeStyle.sectionWrapper}>
          <div className={styles.navTabs}>
            {testTypes.map(test => (
              <div
                key={test.id}
                className={`${styles.navTab} ${
                  activeTest === test.id ? styles.activeTab : styles.inactiveTab
                }`}
                onClick={() => {
                  setActiveTest(test.id);
                  setPhase("instructions");
                  setResult(null);
                }}
              >
                <span className={styles.testIcon}>{test.icon}</span>
                {test.name}
              </div>
            ))}
          </div>

          {phase === "instructions" && (
            <div className={homeStyle.sectionWrapper}>
              <div className={styles.instructions}>
                <h3 className={styles.instructionTitle}>
                  {getInstructions().title}
                </h3>
                {getInstructions().instructions.map((instruction, index) => (
                  <p key={index} className={styles.instructionText}>
                    • {instruction}
                  </p>
                ))}
              </div>
              <ConvertButton 
                onClick={startTest} 
                disabled={false} 
                label={`Start ${testTypes.find(t => t.id === activeTest)?.name || 'Test'} Test`} 
              />
            </div>
          )}

          {phase === "test" && (
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>
                {testTypes.find(t => t.id === activeTest)?.name || 'Test'} - Active Test
              </h2>
              <div className="text-center mb-4">
                <div className={styles.timer}>Time: {timeLeft}s</div>
                <div className={styles.enhancedProgressBar}>
                  <div 
                    className={styles.enhancedProgressFill}
                    style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
                  />
                </div>
              </div>
              {renderTestContent()}
              <ConvertButton onClick={resetTest} disabled={false} label="Stop Test" />
            </div>
          )}

          {phase === "results" && result && (
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>{result.testType} Results</h2>
              <div className={styles.resultCard}>
                <div className={styles.scoreDisplay}>
                  <span className={styles.scoreValue}>{result.accuracy}%</span>
                  <span className={styles.scoreLabel}>Accuracy</span>
                </div>
                <div className={styles.category} style={{ color: result.color }}>
                  {result.category}
                </div>
                <div className={styles.breakdown}>
                  <div>
                    <div className={styles.statValue}>{result.score}</div>
                    <div className={styles.statLabel}>Correct</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{result.totalAttempts}</div>
                    <div className={styles.statLabel}>Total</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>Good</div>
                    <div className={styles.statLabel}>Response</div>
                  </div>
                </div>
                <div className={styles.recommendation}>
                  <h3 className={homeStyle.normalTitle}>Recommendations:</h3>
                  <ul>
                    {result.category === "Excellent Focus" && (
                      <>
                        <li>Outstanding attention span! Keep challenging yourself</li>
                        <li>Try more complex cognitive tasks</li>
                        <li>Share your strategies with others</li>
                      </>
                    )}
                    {result.category === "Good Attention" && (
                      <>
                        <li>Good focus abilities. Practice mindfulness daily</li>
                        <li>Try meditation for 10-15 minutes</li>
                        <li>Reduce distractions in your environment</li>
                      </>
                    )}
                    {result.category === "Fair Concentration" && (
                      <>
                        <li>Practice concentration exercises regularly</li>
                        <li>Get adequate sleep (7-9 hours)</li>
                        <li>Exercise regularly to improve cognitive function</li>
                      </>
                    )}
                    {result.category === "Needs Practice" && (
                      <>
                        <li>Start with short meditation sessions</li>
                        <li>Eliminate digital distractions</li>
                        <li>Practice deep breathing exercises</li>
                        <li>Consider consulting a healthcare professional</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className={styles.actions}>
                <ConvertButton onClick={() => window.print()} disabled={false} label="Print Results" />
                <ConvertButton onClick={resetTest} disabled={false} label="Try Another Test" />
              </div>
            </div>
          )}
        </div>

        <section className={homeStyle.sectionWrapper}>
          <h2 className={homeStyle.normalTitle}>{mockCompanyInfo.name}</h2>
          <p className={homeStyle.normalText}>{mockCompanyInfo.disclaimer}</p>
        </section>
      </main>
    </div>
  );
}
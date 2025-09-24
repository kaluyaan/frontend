"use client";
import { useState, useEffect, JSX } from "react";
import { COMPANY_INFO } from "../constants";
import styles from "../shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

// Types
interface SleepResult {
  totalScore: number;
  sleepQuality: string;
  color: string;
  recommendations: string[];
  categories: { [key: string]: number };
  percentageScore: number;
  severity: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}

interface SleepTest {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions?: any[];
  isInteractive?: boolean;
}

interface DreamEntry {
  id: string;
  date: string;
  dream: string;
  mood: string;
  quality: number;
}

// Mock constants
const mockCompanyInfo = {
  name: "Kaaluyaan Health",
  disclaimer: "This assessment is for educational purposes only and should not replace professional medical advice."
};

export default function EnhancedSleepAssessment(): JSX.Element {
  const [activeTest, setActiveTest] = useState<string>("comprehensive");
  const [responses, setResponses] = useState<{[key: string]: number | string}>({});
  const [result, setResult] = useState<SleepResult | null>(null);
  const [phase, setPhase] = useState<"instructions" | "test" | "results">("instructions");
  
  // Sleep Pattern Tracker State
  const [sleepLog, setSleepLog] = useState<any[]>([]);
  const [currentLogEntry, setCurrentLogEntry] = useState({
    bedtime: '',
    wakeTime: '',
    quality: 5,
    notes: ''
  });

  // Dream Journal State
  const [dreamEntries, setDreamEntries] = useState<DreamEntry[]>([]);
  const [currentDream, setCurrentDream] = useState({
    dream: '',
    mood: '',
    quality: 5
  });

  // Sleep Challenge State
  const [challengeDay, setChallengeDay] = useState(1);
  const [challengeProgress, setChallengeProgress] = useState<{[key: string]: boolean}>({});

  // Sleep Meditation State
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationTime, setMeditationTime] = useState(300); // 5 minutes
  const [currentMeditationTime, setCurrentMeditationTime] = useState(300);

  const sleepTests: SleepTest[] = [
    {
      id: "comprehensive",
      name: "Comprehensive Sleep Quality",
      icon: "🛏️",
      description: "Complete assessment of your sleep patterns, quality, and habits"
    },
    {
      id: "insomnia",
      name: "Insomnia Severity Index",
      icon: "🌙",
      description: "Clinical assessment for insomnia symptoms and severity"
    },
    {
      id: "chronotype",
      name: "Chronotype Assessment",
      icon: "⏰",
      description: "Discover if you're a morning lark, night owl, or something in between"
    },
    {
      id: "tracker",
      name: "Sleep Pattern Tracker",
      icon: "📊",
      description: "Track your daily sleep patterns and identify trends",
      isInteractive: true
    },
    {
      id: "dreams",
      name: "Dream Journal",
      icon: "💭",
      description: "Record and analyze your dreams for better sleep insights",
      isInteractive: true
    },
    {
      id: "challenge",
      name: "30-Day Sleep Challenge",
      icon: "🏆",
      description: "Gamified sleep improvement program with daily challenges",
      isInteractive: true
    },
    {
      id: "meditation",
      name: "Sleep Meditation Guide",
      icon: "🧘",
      description: "Guided relaxation and breathing exercises for better sleep",
      isInteractive: true
    }
  ];

  // Dynamic question generators
  const generateComprehensiveQuestions = () => [
    { 
      id: 'bedtime_routine', 
      text: 'How consistent is your bedtime routine?', 
      scores: [3, 2, 1, 0], 
      options: ['Very consistent (same time ±15 min)', 'Mostly consistent (±30 min)', 'Somewhat irregular (±1 hour)', 'Very irregular (varies widely)'],
      category: 'routine'
    },
    { 
      id: 'sleep_latency', 
      text: 'How long does it usually take you to fall asleep?', 
      scores: [3, 2, 1, 0], 
      options: ['Less than 15 minutes', '15-30 minutes', '30-60 minutes', 'More than 60 minutes'],
      category: 'quality'
    },
    { 
      id: 'night_wakings', 
      text: 'How often do you wake up during the night?', 
      scores: [3, 2, 1, 0], 
      options: ['Rarely (0-1 times)', 'Sometimes (2-3 times)', 'Often (4-5 times)', 'Very often (6+ times)'],
      category: 'quality'
    },
    { 
      id: 'sleep_duration', 
      text: 'How many hours do you typically sleep?', 
      scores: [3, 3, 2, 1, 0], 
      options: ['7-9 hours', '6-7 hours', '5-6 hours', '4-5 hours', 'Less than 4 hours'],
      category: 'duration'
    },
    { 
      id: 'morning_alertness', 
      text: 'How alert do you feel in the morning?', 
      scores: [3, 2, 1, 0], 
      options: ['Very alert and refreshed', 'Somewhat alert', 'Groggy but manageable', 'Very tired and groggy'],
      category: 'quality'
    },
    { 
      id: 'daytime_energy', 
      text: 'How is your energy level throughout the day?', 
      scores: [3, 2, 1, 0], 
      options: ['Consistently high energy', 'Good energy most of the time', 'Tired in afternoon', 'Tired all day'],
      category: 'impact'
    },
    { 
      id: 'sleep_environment', 
      text: 'Rate your sleep environment (darkness, quiet, temperature)', 
      scores: [3, 2, 1, 0], 
      options: ['Optimal (dark, quiet, cool)', 'Good (minor issues)', 'Fair (some problems)', 'Poor (many disruptions)'],
      category: 'environment'
    },
    { 
      id: 'screen_exposure', 
      text: 'Screen time within 1 hour of bedtime?', 
      scores: [3, 2, 1, 0], 
      options: ['No screens', 'Minimal (reading mode)', 'Moderate usage', 'Heavy usage'],
      category: 'hygiene'
    },
    { 
      id: 'caffeine_timing', 
      text: 'When do you consume your last caffeinated drink?', 
      scores: [3, 2, 1, 0], 
      options: ['Before 12 PM', '12-3 PM', '3-6 PM', 'After 6 PM'],
      category: 'hygiene'
    },
    { 
      id: 'stress_impact', 
      text: 'How often does stress or worry affect your sleep?', 
      scores: [3, 2, 1, 0], 
      options: ['Never', 'Occasionally', 'Often', 'Almost always'],
      category: 'psychological'
    }
  ];

  const generateInsomniaQuestions = () => [
    { 
      id: 'difficulty_falling_asleep', 
      text: 'Difficulty falling asleep', 
      scores: [0, 1, 2, 3, 4], 
      options: ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
      category: 'severity'
    },
    { 
      id: 'difficulty_staying_asleep', 
      text: 'Difficulty staying asleep', 
      scores: [0, 1, 2, 3, 4], 
      options: ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
      category: 'severity'
    },
    { 
      id: 'early_morning_awakening', 
      text: 'Problem with waking up too early', 
      scores: [0, 1, 2, 3, 4], 
      options: ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
      category: 'severity'
    },
    { 
      id: 'sleep_satisfaction', 
      text: 'How satisfied/dissatisfied are you with your current sleep pattern?', 
      scores: [4, 3, 2, 1, 0], 
      options: ['Very Satisfied', 'Satisfied', 'Moderately Satisfied', 'Dissatisfied', 'Very Dissatisfied'],
      category: 'satisfaction'
    },
    { 
      id: 'daytime_impairment', 
      text: 'How noticeable to others do you think your sleep problem is in terms of impairing your quality of life?', 
      scores: [0, 1, 2, 3, 4], 
      options: ['Not at all noticeable', 'A little', 'Somewhat', 'Much', 'Very much noticeable'],
      category: 'impairment'
    },
    { 
      id: 'worry_about_sleep', 
      text: 'How worried/distressed are you about your current sleep problem?', 
      scores: [0, 1, 2, 3, 4], 
      options: ['Not at all worried', 'A little', 'Somewhat', 'Much', 'Very much worried'],
      category: 'distress'
    },
    { 
      id: 'interference_daily', 
      text: 'To what extent do you consider your sleep problem to interfere with your daily functioning?', 
      scores: [0, 1, 2, 3, 4], 
      options: ['Not at all interfering', 'A little', 'Somewhat', 'Much', 'Very much interfering'],
      category: 'interference'
    }
  ];

  const generateChronotypeQuestions = () => [
    { 
      id: 'preferred_bedtime', 
      text: 'If you were entirely free to plan your evening, what time would you go to bed?', 
      scores: [1, 2, 3, 4, 5], 
      options: ['8:00-9:00 PM', '9:00-10:15 PM', '10:15 PM-12:30 AM', '12:30-1:45 AM', 'After 1:45 AM'],
      category: 'evening'
    },
    { 
      id: 'preferred_wake_time', 
      text: 'If you were entirely free to plan your morning, what time would you get up?', 
      scores: [1, 2, 3, 4, 5], 
      options: ['5:00-6:30 AM', '6:30-7:45 AM', '7:45-9:45 AM', '9:45-11:00 AM', 'After 11:00 AM'],
      category: 'morning'
    },
    { 
      id: 'morning_feeling', 
      text: 'During the first half-hour after having awakened in the morning, how tired do you feel?', 
      scores: [1, 2, 3, 4], 
      options: ['Very tired', 'Fairly tired', 'Fairly refreshed', 'Very refreshed'],
      category: 'morning'
    },
    { 
      id: 'evening_feeling', 
      text: 'During the first half-hour after having awakened in the morning, how is your appetite?', 
      scores: [1, 2, 3, 4], 
      options: ['Very poor', 'Fairly poor', 'Fairly good', 'Very good'],
      category: 'morning'
    },
    { 
      id: 'peak_alertness', 
      text: 'At what time in the evening do you feel tired and in need of sleep?', 
      scores: [1, 2, 3, 4, 5], 
      options: ['8:00-9:00 PM', '9:00-10:15 PM', '10:15 PM-12:45 AM', '12:45-2:00 AM', 'After 2:00 AM'],
      category: 'evening'
    },
    { 
      id: 'physical_exercise_time', 
      text: 'At what time of day do you feel you reach your feeling of best?', 
      scores: [1, 2, 3, 4, 5], 
      options: ['5:00-8:00 AM', '8:00-10:00 AM', '10:00 AM-5:00 PM', '5:00-10:00 PM', '10:00 PM-5:00 AM'],
      category: 'peak'
    }
  ];

  const getCurrentQuestions = () => {
    switch (activeTest) {
      case "comprehensive":
        return generateComprehensiveQuestions();
      case "insomnia":
        return generateInsomniaQuestions();
      case "chronotype":
        return generateChronotypeQuestions();
      default:
        return generateComprehensiveQuestions();
    }
  };

  const handleResponse = (questionId: string, optionIndex: number): void => {
    const questions = getCurrentQuestions();
    const question = questions.find(q => q.id === questionId);
    const score = question?.scores[optionIndex] || 0;
    setResponses(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateResults = (): void => {
    const questions = getCurrentQuestions();
    if (Object.keys(responses).length < questions.length) return;

    const totalScore = Object.values(responses).reduce((sum: number, score) => {
      if (typeof score === 'number') return sum + score;
      const parsed = Number(score);
      return sum + (isNaN(parsed) ? 0 : parsed);
    }, 0);
    const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.scores), 0);
    const percentage = (Number(totalScore) / Number(maxScore)) * 100;

    const categories: { [key: string]: number } = {};
    questions.forEach(question => {
      if (question.category) {
        const score = responses[question.id] as number || 0;
        categories[question.category] = (categories[question.category] || 0) + score;
      }
    });

    const sleepData = getSleepQuality(percentage, activeTest);
    const recommendations = getSleepRecommendations(percentage, categories, activeTest);

    setResult({
      totalScore: Number(totalScore),
      sleepQuality: sleepData.level,
      color: sleepData.color,
      recommendations,
      categories,
      percentageScore: Math.round(percentage),
      severity: sleepData.severity,
      description: sleepData.description
    });
    setPhase("results");
  };

  const getSleepQuality = (percentage: number, testType: string) => {
    if (testType === "insomnia") {
      if (percentage <= 20) return { level: 'No Clinically Significant Insomnia', color: '#4CAF50', severity: 'excellent' as const, description: 'Your sleep patterns appear healthy with minimal insomnia symptoms' };
      if (percentage <= 40) return { level: 'Subthreshold Insomnia', color: '#2196F3', severity: 'good' as const, description: 'Mild sleep difficulties that may benefit from sleep hygiene improvements' };
      if (percentage <= 60) return { level: 'Clinical Insomnia (Moderate)', color: '#FF9800', severity: 'fair' as const, description: 'Moderate insomnia symptoms affecting sleep quality and daily function' };
      return { level: 'Clinical Insomnia (Severe)', color: '#F44336', severity: 'poor' as const, description: 'Severe insomnia requiring professional evaluation and treatment' };
    }
    
    if (testType === "chronotype") {
      if (percentage <= 25) return { level: 'Definite Morning Type', color: '#FFC107', severity: 'excellent' as const, description: 'Strong morning lark - peak performance in early hours' };
      if (percentage <= 45) return { level: 'Moderate Morning Type', color: '#8BC34A', severity: 'good' as const, description: 'Morning preference with good early day performance' };
      if (percentage <= 65) return { level: 'Neither Type', color: '#2196F3', severity: 'fair' as const, description: 'Balanced chronotype - adaptable to various schedules' };
      if (percentage <= 85) return { level: 'Moderate Evening Type', color: '#9C27B0', severity: 'good' as const, description: 'Evening preference with peak performance later in day' };
      return { level: 'Definite Evening Type', color: '#3F51B5', severity: 'excellent' as const, description: 'Strong night owl - peak performance in evening hours' };
    }

    // Default comprehensive assessment
    if (percentage >= 80) return { level: 'Excellent Sleep Quality', color: '#4CAF50', severity: 'excellent' as const, description: 'Outstanding sleep patterns promoting optimal health and well-being' };
    if (percentage >= 65) return { level: 'Good Sleep Quality', color: '#2196F3', severity: 'good' as const, description: 'Generally healthy sleep with room for minor improvements' };
    if (percentage >= 50) return { level: 'Fair Sleep Quality', color: '#FF9800', severity: 'fair' as const, description: 'Moderate sleep issues affecting rest and recovery' };
    return { level: 'Poor Sleep Quality', color: '#F44336', severity: 'poor' as const, description: 'Significant sleep problems requiring attention and intervention' };
  };

  const getSleepRecommendations = (percentage: number, categories: {[key: string]: number}, testType: string): string[] => {
    const recommendations: string[] = [];
    
    if (testType === "insomnia") {
      if (percentage > 60) {
        recommendations.push('Consider consulting a sleep medicine specialist');
        recommendations.push('Explore Cognitive Behavioral Therapy for Insomnia (CBT-I)');
        recommendations.push('Keep a detailed sleep diary for 2 weeks');
      }
      if (percentage > 40) {
        recommendations.push('Practice progressive muscle relaxation before bed');
        recommendations.push('Limit daytime naps to 20-30 minutes before 3 PM');
        recommendations.push('Create a worry journal to address bedtime thoughts');
      }
      recommendations.push('Maintain consistent sleep-wake times, even on weekends');
      recommendations.push('Optimize bedroom environment: cool (60-67°F), dark, quiet');
    } else if (testType === "chronotype") {
      if (percentage <= 35) { // Morning types
        recommendations.push('Schedule important tasks and meetings in the morning');
        recommendations.push('Get bright light exposure immediately upon waking');
        recommendations.push('Avoid late evening social commitments when possible');
        recommendations.push('Consider earlier dinner times to align with natural rhythms');
      } else if (percentage >= 75) { // Evening types
        recommendations.push('Negotiate flexible work hours if possible');
        recommendations.push('Use bright light therapy in the morning');
        recommendations.push('Avoid morning exercise; schedule workouts for afternoon/evening');
        recommendations.push('Be extra careful with sleep hygiene due to late preference');
      } else {
        recommendations.push('Take advantage of your chronotype flexibility');
        recommendations.push('Adapt your schedule based on daily demands');
        recommendations.push('Pay attention to natural energy peaks and plan accordingly');
      }
    } else {
      // Comprehensive recommendations
      Object.entries(categories).forEach(([category, score]) => {
        if (category === 'hygiene' && score < 4) {
          recommendations.push('Improve sleep hygiene: limit screens, avoid late caffeine');
        }
        if (category === 'environment' && score < 3) {
          recommendations.push('Optimize sleep environment: blackout curtains, white noise, cool temperature');
        }
        if (category === 'routine' && score < 3) {
          recommendations.push('Establish consistent bedtime and wake-time routines');
        }
        if (category === 'psychological' && score < 3) {
          recommendations.push('Practice stress management and relaxation techniques');
        }
      });
    }

    // General recommendations based on overall score
    if (percentage >= 80) {
      recommendations.push('Maintain your excellent sleep habits as a foundation for health');
    } else if (percentage >= 65) {
      recommendations.push('Focus on consistency to optimize your already good sleep');
    } else if (percentage >= 50) {
      recommendations.push('Prioritize sleep as essential for health and productivity');
    } else {
      recommendations.push('Consider comprehensive sleep evaluation with healthcare provider');
    }

    return recommendations.slice(0, 8);
  };

  const startTest = (): void => {
    setPhase("test");
    setResponses({});
    setResult(null);
  };

  const resetTest = (): void => {
    setPhase("instructions");
    setResult(null);
    setResponses({});
  };

  const switchTest = (testId: string): void => {
    setActiveTest(testId);
    setPhase("instructions");
    setResult(null);
    setResponses({});
  };

  const getInstructions = () => {
    const currentTest = sleepTests.find(t => t.id === activeTest);
    const baseInstructions = {
      title: currentTest?.name || "Sleep Assessment",
      instructions: [
        "Answer all questions honestly based on your typical sleep patterns",
        "Consider your sleep over the past 2-4 weeks",
        "Choose the option that best describes your usual experience",
        "Results will provide personalized sleep improvement recommendations"
      ]
    };

    switch (activeTest) {
      case "insomnia":
        return {
          ...baseInstructions,
          instructions: [
            "This assessment evaluates insomnia severity based on clinical criteria",
            "Rate each symptom based on the past 2 weeks",
            "Consider how sleep problems affect your daily life",
            "Higher scores indicate more severe insomnia symptoms"
          ]
        };
      case "chronotype":
        return {
          ...baseInstructions,
          instructions: [
            "This assessment determines your natural sleep-wake preference",
            "Answer based on your ideal schedule, not current obligations",
            "Consider times when you feel most alert and energetic",
            "Results will help optimize your daily schedule"
          ]
        };
      case "tracker":
        return {
          ...baseInstructions,
          instructions: [
            "Log your daily sleep and wake times",
            "Rate your sleep quality each morning",
            "Add notes about factors affecting your sleep",
            "Track patterns over time for better insights"
          ]
        };
      case "dreams":
        return {
          ...baseInstructions,
          instructions: [
            "Record your dreams immediately upon waking",
            "Note your mood and emotions in the dream",
            "Rate the overall quality of your sleep",
            "Build a dream journal to identify patterns"
          ]
        };
      case "challenge":
        return {
          ...baseInstructions,
          instructions: [
            "Complete daily sleep improvement challenges",
            "Track your progress over 30 days",
            "Earn points for consistent healthy sleep habits",
            "Build lasting positive sleep behaviors"
          ]
        };
      case "meditation":
        return {
          ...baseInstructions,
          instructions: [
            "Choose from various guided sleep meditations",
            "Practice deep breathing and progressive relaxation",
            "Use before bedtime to improve sleep onset",
            "Track your meditation consistency"
          ]
        };
      default:
        return baseInstructions;
    }
  };

  const renderTestContent = (): JSX.Element => {
    const currentTest = sleepTests.find(t => t.id === activeTest);
    
    if (currentTest?.isInteractive) {
      switch (activeTest) {
        case "tracker":
          return (
            <div className={styles.interactiveSection}>
              <h3 className={homeStyle.normalTitle}>Sleep Pattern Tracker</h3>
              <div className={styles.trackerForm}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Bedtime:</label>
                  <input 
                    type="time" 
                    value={currentLogEntry.bedtime}
                    onChange={(e) => setCurrentLogEntry({...currentLogEntry, bedtime: e.target.value})}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Wake Time:</label>
                  <input 
                    type="time" 
                    value={currentLogEntry.wakeTime}
                    onChange={(e) => setCurrentLogEntry({...currentLogEntry, wakeTime: e.target.value})}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Sleep Quality (1-10):</label>
                  <div className={styles.sliderContainer}>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={currentLogEntry.quality}
                      onChange={(e) => setCurrentLogEntry({...currentLogEntry, quality: parseInt(e.target.value)})}
                      className={styles.slider}
                    />
                    <span className={styles.sliderValue}>{currentLogEntry.quality}</span>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Notes:</label>
                  <textarea 
                    value={currentLogEntry.notes}
                    onChange={(e) => setCurrentLogEntry({...currentLogEntry, notes: e.target.value})}
                    className={styles.textarea}
                    placeholder="How did you feel? Any factors affecting sleep?"
                    rows={3}
                  />
                </div>
                <ConvertButton 
                  onClick={() => {
                    setSleepLog([...sleepLog, {...currentLogEntry, date: new Date().toISOString().split('T')[0]}]);
                    setCurrentLogEntry({bedtime: '', wakeTime: '', quality: 5, notes: ''});
                  }}
                  disabled={!currentLogEntry.bedtime || !currentLogEntry.wakeTime}
                  label="Log Sleep Entry"
                />
              </div>
              {sleepLog.length > 0 && (
                <div className={styles.logHistory}>
                  <h4 className={homeStyle.normalTitle}>Recent Sleep Log</h4>
                  {sleepLog.slice(-7).map((entry, index) => (
                    <div key={index} className={styles.logEntry}>
                      <div className={styles.logDate}>{entry.date}</div>
                      <div className={styles.logDetails}>
                        Bed: {entry.bedtime} | Wake: {entry.wakeTime} | Quality: {entry.quality}/10
                      </div>
                      {entry.notes && <div className={styles.logNotes}>{entry.notes}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        
        case "dreams":
          return (
            <div className={styles.interactiveSection}>
              <h3 className={homeStyle.normalTitle}>Dream Journal</h3>
              <div className={styles.dreamForm}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Describe your dream:</label>
                  <textarea 
                    value={currentDream.dream}
                    onChange={(e) => setCurrentDream({...currentDream, dream: e.target.value})}
                    className={styles.textarea}
                    placeholder="What happened in your dream? Include emotions, people, places..."
                    rows={4}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Dream mood:</label>
                  <select 
                    value={currentDream.mood}
                    onChange={(e) => setCurrentDream({...currentDream, mood: e.target.value})}
                    className={styles.select}
                  >
                    <option value="">Select mood...</option>
                    <option value="happy">Happy/Joyful</option>
                    <option value="anxious">Anxious/Worried</option>
                    <option value="scary">Scary/Frightening</option>
                    <option value="peaceful">Peaceful/Calm</option>
                    <option value="exciting">Exciting/Adventurous</option>
                    <option value="sad">Sad/Melancholic</option>
                    <option value="weird">Weird/Surreal</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Sleep Quality (1-10):</label>
                  <div className={styles.sliderContainer}>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={currentDream.quality}
                      onChange={(e) => setCurrentDream({...currentDream, quality: parseInt(e.target.value)})}
                      className={styles.slider}
                    />
                    <span className={styles.sliderValue}>{currentDream.quality}</span>
                  </div>
                </div>
                <ConvertButton 
                  onClick={() => {
                    const newEntry: DreamEntry = {
                      id: Date.now().toString(),
                      date: new Date().toISOString().split('T')[0],
                      dream: currentDream.dream,
                      mood: currentDream.mood,
                      quality: currentDream.quality
                    };
                    setDreamEntries([...dreamEntries, newEntry]);
                    setCurrentDream({dream: '', mood: '', quality: 5});
                  }}
                  disabled={!currentDream.dream || !currentDream.mood}
                  label="Save Dream Entry"
                />
              </div>
              {dreamEntries.length > 0 && (
                <div className={styles.dreamHistory}>
                  <h4 className={homeStyle.normalTitle}>Dream Journal Entries</h4>
                  {dreamEntries.slice(-5).map((entry) => (
                    <div key={entry.id} className={styles.dreamEntry}>
                      <div className={styles.dreamHeader}>
                        <span className={styles.dreamMood}>{entry.mood}</span>
                        <span className={styles.dreamQuality}>Quality: {entry.quality}/10</span>
                      </div>
                      <div className={styles.dreamContent}>{entry.dream}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "challenge":
          return (
            <div className={styles.interactiveSection}>
              <h3 className={homeStyle.normalTitle}>30-Day Sleep Challenge</h3>
              <div className={styles.challengeProgress}>
                <div className={styles.challengeDay}>
                  <span className={styles.dayNumber}>Day {challengeDay}</span>
                  <span className={styles.dayProgress}>{Object.keys(challengeProgress).length}/30 days completed</span>
                </div>
                <div className={styles.enhancedProgressBar}>
                  <div 
                    className={styles.enhancedProgressFill}
                    style={{ width: `${(Object.keys(challengeProgress).length / 30) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className={styles.todayChallenge}>
                <h4 className={homeStyle.normalTitle}>Today's Challenge:</h4>
                <div className={styles.challengeCard}>
                  {getChallengeForDay(challengeDay)}
                </div>
                <ConvertButton 
                  onClick={() => {
                    setChallengeProgress({...challengeProgress, [challengeDay]: true});
                    setChallengeDay(Math.min(challengeDay + 1, 30));
                  }}
                  disabled={challengeProgress[challengeDay]}
                  label={challengeProgress[challengeDay] ? "Challenge Completed!" : "Mark as Complete"}
                />
              </div>

              {Object.keys(challengeProgress).length > 0 && (
                <div className={styles.completedChallenges}>
                  <h4 className={homeStyle.normalTitle}>Progress Overview</h4>
                  <div className={styles.challengeGrid}>
                    {Array.from({length: 30}, (_, i) => i + 1).map(day => (
                      <div 
                        key={day} 
                        className={`${styles.challengeGridItem} ${challengeProgress[day] ? styles.completed : ''}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );

        case "meditation":
          return (
            <div className={styles.interactiveSection}>
              <h3 className={homeStyle.normalTitle}>Sleep Meditation Guide</h3>
              <div className={styles.meditationControls}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Meditation Duration:</label>
                  <select 
                    value={meditationTime}
                    onChange={(e) => {
                      const time = parseInt(e.target.value);
                      setMeditationTime(time);
                      setCurrentMeditationTime(time);
                    }}
                    className={styles.select}
                    disabled={meditationActive}
                  >
                    <option value={180}>3 minutes</option>
                    <option value={300}>5 minutes</option>
                    <option value={600}>10 minutes</option>
                    <option value={900}>15 minutes</option>
                    <option value={1200}>20 minutes</option>
                  </select>
                </div>
                
                <div className={styles.meditationTimer}>
                  <div className={styles.timerDisplay}>
                    {Math.floor(currentMeditationTime / 60)}:{(currentMeditationTime % 60).toString().padStart(2, '0')}
                  </div>
                  <div className={styles.enhancedProgressBar}>
                    <div 
                      className={styles.enhancedProgressFill}
                      style={{ width: `${((meditationTime - currentMeditationTime) / meditationTime) * 100}%` }}
                    />
                  </div>
                </div>

                <div className={styles.meditationButtons}>
                  <ConvertButton 
                    onClick={() => {
                      setMeditationActive(!meditationActive);
                      if (!meditationActive) {
                        // Start meditation timer
                        const interval = setInterval(() => {
                          setCurrentMeditationTime(prev => {
                            if (prev <= 1) {
                              setMeditationActive(false);
                              clearInterval(interval);
                              return meditationTime;
                            }
                            return prev - 1;
                          });
                        }, 1000);
                      }
                    }}
                    disabled={false}
                    label={meditationActive ? "Pause Meditation" : "Start Meditation"}
                  />
                  
                  <ConvertButton 
                    onClick={() => {
                      setMeditationActive(false);
                      setCurrentMeditationTime(meditationTime);
                    }}
                    disabled={false}
                    label="Reset"
                  />
                </div>
              </div>

              <div className={styles.meditationGuide}>
                <h4 className={homeStyle.normalTitle}>Breathing Exercise</h4>
                <div className={styles.breathingInstructions}>
                  <div className={styles.instructionStep}>
                    <strong>1. Get Comfortable:</strong> Lie down in your bed, close your eyes, and relax your body
                  </div>
                  <div className={styles.instructionStep}>
                    <strong>2. Deep Breathing:</strong> Breathe in slowly through your nose for 4 counts
                  </div>
                  <div className={styles.instructionStep}>
                    <strong>3. Hold:</strong> Hold your breath gently for 4 counts
                  </div>
                  <div className={styles.instructionStep}>
                    <strong>4. Exhale:</strong> Breathe out slowly through your mouth for 6 counts
                  </div>
                  <div className={styles.instructionStep}>
                    <strong>5. Repeat:</strong> Continue this pattern, letting your mind focus only on your breath
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return <div>Interactive content not available</div>;
      }
    }

    // Regular questionnaire tests
    const questions = getCurrentQuestions();
    return (
      <div className={styles.questionsContainer}>
        {questions.map((question, index) => (
          <div key={question.id} className={styles.questionCard}>
            <div className={styles.questionText}>
              {index + 1}. {question.text}
            </div>
            <div className={styles.optionsContainer}>
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`${styles.stressOption} ${
                    responses[question.id] === question.scores[optionIndex] ? styles.selectedOption : ''
                  }`}
                  onClick={() => handleResponse(question.id, optionIndex)}
                >
                  <div className={styles.optionLabel}>{option}</div>
                  <div className={styles.optionScore}>Score: {question.scores[optionIndex]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className={styles.buttonContainer}>
          <ConvertButton 
            onClick={calculateResults}
            disabled={Object.keys(responses).length < questions.length}
            label="Calculate Sleep Assessment"
          />
        </div>
      </div>
    );
  };

  const getChallengeForDay = (day: number): string => {
    const challenges = [
      "Set a consistent bedtime and stick to it tonight",
      "Create a 30-minute wind-down routine before bed",
      "Remove all electronic devices from your bedroom",
      "Try a 5-minute meditation before sleep",
      "Take a warm bath or shower before bed",
      "Write in a gratitude journal for 5 minutes",
      "Avoid caffeine after 2 PM today",
      "Make your bedroom completely dark",
      "Keep your bedroom temperature between 65-68°F",
      "Try progressive muscle relaxation technique",
      "Avoid large meals 3 hours before bedtime",
      "Use aromatherapy (lavender) in your bedroom",
      "Practice deep breathing exercises (4-7-8 technique)",
      "Read a physical book instead of using devices",
      "Try gentle stretching or yoga before bed",
      "Limit daytime naps to 20 minutes",
      "Get morning sunlight exposure within 1 hour of waking",
      "Create a worry journal to clear your mind",
      "Try listening to calming nature sounds",
      "Practice visualization or guided imagery",
      "Avoid alcohol 3 hours before bedtime",
      "Try chamomile tea before bed",
      "Use comfortable, breathable bedding",
      "Practice mindful body scan meditation",
      "Create a bedtime routine checklist",
      "Try the military sleep technique",
      "Limit fluids 2 hours before bedtime",
      "Practice gratitude reflection",
      "Try gentle self-massage before sleep",
      "Celebrate completing your 30-day sleep challenge!"
    ];
    return challenges[day - 1] || challenges[0];
  };

  const isCurrentTestComplete = (): boolean => {
    const currentTest = sleepTests.find(t => t.id === activeTest);
    if (currentTest?.isInteractive) return true;
    
    const questions = getCurrentQuestions();
    return questions.every(q => responses[q.id] !== undefined);
  };

  // Meditation timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (meditationActive && currentMeditationTime > 0) {
      interval = setInterval(() => {
        setCurrentMeditationTime(prev => {
          if (prev <= 1) {
            setMeditationActive(false);
            return meditationTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meditationActive, currentMeditationTime, meditationTime]);

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection 
          icon="😴" 
          title="Comprehensive Sleep Health Center" 
          text="Explore multiple sleep assessments, track your patterns, and improve your sleep quality with interactive tools and personalized insights."
        />

        <div className={homeStyle.sectionWrapper}>
          {/* Test Type Navigation */}
          <div className={styles.navTabs}>
            {sleepTests.map(test => (
              <div
                key={test.id}
                className={`${styles.navTab} ${
                  activeTest === test.id ? styles.activeTab : styles.inactiveTab
                }`}
                onClick={() => switchTest(test.id)}
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
                <div className={styles.instructionText}>
                  <p className={homeStyle.normalText}>
                    {sleepTests.find(t => t.id === activeTest)?.description}
                  </p>
                </div>
                {getInstructions().instructions.map((instruction, index) => (
                  <p key={index} className={styles.instructionText}>
                    • {instruction}
                  </p>
                ))}
              </div>
              
              {!sleepTests.find(t => t.id === activeTest)?.isInteractive && (
                <ConvertButton 
                  onClick={startTest} 
                  disabled={false} 
                  label={`Start ${sleepTests.find(t => t.id === activeTest)?.name || 'Assessment'}`} 
                />
              )}
            </div>
          )}

          {(phase === "test" || sleepTests.find(t => t.id === activeTest)?.isInteractive) && (
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>
                {sleepTests.find(t => t.id === activeTest)?.name}
              </h2>
              {renderTestContent()}
              {!sleepTests.find(t => t.id === activeTest)?.isInteractive && (
                <ConvertButton onClick={resetTest} disabled={false} label="Back to Instructions" />
              )}
            </div>
          )}

          {phase === "results" && result && (
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>
                {sleepTests.find(t => t.id === activeTest)?.name} Results
              </h2>
              <div className={styles.resultCard}>
                <div className={styles.scoreDisplay}>
                  <span className={styles.scoreValue} style={{ color: result.color }}>
                    {result.sleepQuality}
                  </span>
                  <span className={styles.scoreLabel}>Score: {result.percentageScore}%</span>
                </div>
                
                <div className={styles.stressDescription}>
                  <p>{result.description}</p>
                </div>

                <div className={styles.breakdown}>
                  <div>
                    <div className={styles.statValue}>{result.totalScore}</div>
                    <div className={styles.statLabel}>Total Score</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{result.percentageScore}%</div>
                    <div className={styles.statLabel}>Quality Rating</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{Object.keys(result.categories).length}</div>
                    <div className={styles.statLabel}>Categories</div>
                  </div>
                </div>

                <div className={styles.recommendation}>
                  <h3 className={homeStyle.normalTitle}>Sleep Improvement Recommendations:</h3>
                  <ul className={styles.recommendationList}>
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className={styles.recommendationItem}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.actions}>
                <ConvertButton 
                  onClick={() => window.print()} 
                  disabled={false} 
                  label="Print Results" 
                />
                <ConvertButton 
                  onClick={resetTest} 
                  disabled={false} 
                  label="Try Another Assessment" 
                />
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className={styles.instructions}>
            <div className={styles.instructionTitle}>💡 Sleep Health Tips</div>
            <div className={styles.instructionText}>
              Quality sleep is essential for physical health, mental well-being, and cognitive performance. 
              Most adults need 7-9 hours of sleep per night. Consistent sleep schedules, good sleep hygiene, 
              and addressing sleep disorders can significantly improve your overall health and quality of life.
            </div>
          </div>
        </div>

        <section className={homeStyle.sectionWrapper}>
          <h2 className={homeStyle.normalTitle}>{mockCompanyInfo.name}</h2>
          <p className={homeStyle.normalText}>{mockCompanyInfo.disclaimer}</p>
        </section>
      </main>
    </div>
  );
}

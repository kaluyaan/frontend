"use client";
import React, { JSX, useState } from "react";
import styles from "./shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

// Types
interface WellnessResult {
  overallScore: number;
  averageRating: number;
  categories: { [key: string]: number };
  recommendations: string[];
  wellnessLevel: { level: string; color: string; description: string };
  strengths: string[];
  improvementAreas: string[];
}

interface Question {
  id: string;
  text: string;
  category: string;
  weight: number;
  description?: string;
}

interface TrackerCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
}

// Mock constants
const mockCompanyInfo = {
  name: "Kaaluyaan Health",
  disclaimer: "This wellness tracker is for educational purposes and personal reflection only."
};

export default function WellnessTracker(): JSX.Element {
  const [activeTracker, setActiveTracker] = useState<string>("comprehensive");
  const [responses, setResponses] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<WellnessResult | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const trackerCategories: TrackerCategory[] = [
    {
      id: "comprehensive",
      name: "Comprehensive Wellness",
      icon: "🌟",
      description: "Complete assessment of physical, mental, and social wellbeing",
      questions: [
        { id: "sleep_quality", text: "How would you rate your sleep quality?", category: "Physical Health", weight: 1.2, description: "Quality of rest and recovery" },
        { id: "sleep_duration", text: "Do you get adequate sleep duration (7-9 hours)?", category: "Physical Health", weight: 1.1, description: "Sufficient sleep hours" },
        { id: "energy_morning", text: "How is your energy level in the morning?", category: "Physical Health", weight: 1.0, description: "Morning vitality and alertness" },
        { id: "energy_afternoon", text: "How is your energy level in the afternoon?", category: "Physical Health", weight: 1.0, description: "Sustained energy throughout day" },
        { id: "exercise_cardio", text: "How often do you do cardiovascular exercise?", category: "Physical Activity", weight: 1.1, description: "Heart-healthy aerobic activity" },
        { id: "exercise_strength", text: "How often do you do strength training?", category: "Physical Activity", weight: 1.0, description: "Muscle-building activities" },
        { id: "exercise_flexibility", text: "How often do you stretch or do flexibility work?", category: "Physical Activity", weight: 0.9, description: "Mobility and flexibility maintenance" },
        { id: "nutrition_quality", text: "How healthy is your overall diet?", category: "Nutrition", weight: 1.2, description: "Quality of food choices" },
        { id: "nutrition_hydration", text: "How well do you stay hydrated?", category: "Nutrition", weight: 1.0, description: "Adequate water intake" },
        { id: "nutrition_portions", text: "How well do you control portion sizes?", category: "Nutrition", weight: 1.0, description: "Mindful eating practices" },
        { id: "stress_management", text: "How well do you manage daily stress?", category: "Mental Health", weight: 1.3, description: "Stress coping strategies" },
        { id: "mood_general", text: "How would you rate your overall mood?", category: "Mental Health", weight: 1.2, description: "General emotional wellbeing" },
        { id: "anxiety_level", text: "How well do you manage anxiety?", category: "Mental Health", weight: 1.1, description: "Anxiety management skills" },
        { id: "life_satisfaction", text: "How satisfied are you with your life overall?", category: "Mental Health", weight: 1.2, description: "General life contentment" },
        { id: "social_connections", text: "How satisfied are you with your social relationships?", category: "Social Wellbeing", weight: 1.1, description: "Quality of relationships" },
        { id: "social_support", text: "Do you feel you have adequate emotional support?", category: "Social Wellbeing", weight: 1.2, description: "Available support system" },
        { id: "work_satisfaction", text: "How satisfied are you with your work or daily activities?", category: "Purpose & Growth", weight: 1.1, description: "Professional fulfillment" },
        { id: "work_balance", text: "How well do you balance work and personal life?", category: "Purpose & Growth", weight: 1.2, description: "Work-life integration" },
        { id: "personal_growth", text: "How satisfied are you with your personal development?", category: "Purpose & Growth", weight: 1.0, description: "Learning and growth" },
        { id: "leisure_time", text: "How satisfied are you with your leisure and recreation time?", category: "Purpose & Growth", weight: 0.9, description: "Fun and relaxation" }
      ]
    },
    {
      id: "physical",
      name: "Physical Wellness",
      icon: "💪",
      description: "Focus on physical health, fitness, and body wellness",
      questions: [
        { id: "overall_fitness", text: "How would you rate your overall physical fitness?", category: "Fitness", weight: 1.2, description: "General physical condition" },
        { id: "cardiovascular_health", text: "How is your cardiovascular endurance?", category: "Fitness", weight: 1.3, description: "Heart and lung fitness" },
        { id: "strength_level", text: "How would you rate your muscle strength?", category: "Fitness", weight: 1.1, description: "Physical strength" },
        { id: "flexibility_mobility", text: "How is your flexibility and mobility?", category: "Fitness", weight: 1.0, description: "Range of motion" },
        { id: "body_composition", text: "How satisfied are you with your body composition?", category: "Body Health", weight: 1.0, description: "Muscle-to-fat ratio" },
        { id: "weight_management", text: "How well do you maintain a healthy weight?", category: "Body Health", weight: 1.1, description: "Weight stability" },
        { id: "chronic_pain", text: "How well do you manage any chronic pain or discomfort?", category: "Body Health", weight: 1.2, description: "Pain management" },
        { id: "injury_prevention", text: "How well do you prevent injuries during activities?", category: "Body Health", weight: 1.0, description: "Injury avoidance" },
        { id: "recovery_time", text: "How well does your body recover from exercise or physical activity?", category: "Recovery", weight: 1.1, description: "Physical recovery" },
        { id: "rest_days", text: "How well do you balance activity with rest?", category: "Recovery", weight: 1.0, description: "Rest and recovery balance" }
      ]
    },
    {
      id: "mental",
      name: "Mental Wellness",
      icon: "🧠",
      description: "Mental health, emotional wellbeing, and cognitive function",
      questions: [
        { id: "emotional_stability", text: "How emotionally stable do you feel day-to-day?", category: "Emotional Health", weight: 1.3, description: "Emotional regulation" },
        { id: "stress_resilience", text: "How well do you bounce back from stressful situations?", category: "Emotional Health", weight: 1.2, description: "Resilience and adaptation" },
        { id: "positive_thinking", text: "How often do you maintain a positive outlook?", category: "Emotional Health", weight: 1.1, description: "Optimistic mindset" },
        { id: "self_esteem", text: "How would you rate your self-confidence and self-worth?", category: "Emotional Health", weight: 1.2, description: "Self-perception and confidence" },
        { id: "cognitive_function", text: "How sharp is your mental clarity and focus?", category: "Cognitive Health", weight: 1.1, description: "Mental sharpness" },
        { id: "memory_function", text: "How would you rate your memory function?", category: "Cognitive Health", weight: 1.0, description: "Memory performance" },
        { id: "decision_making", text: "How confident are you in your decision-making abilities?", category: "Cognitive Health", weight: 1.0, description: "Decision confidence" },
        { id: "creativity", text: "How satisfied are you with your creative expression?", category: "Cognitive Health", weight: 0.9, description: "Creative fulfillment" },
        { id: "mindfulness", text: "How often do you practice mindfulness or present-moment awareness?", category: "Mental Practices", weight: 1.0, description: "Mindful awareness" },
        { id: "mental_health_care", text: "How well do you take care of your mental health needs?", category: "Mental Practices", weight: 1.2, description: "Mental health maintenance" }
      ]
    },
    {
      id: "lifestyle",
      name: "Lifestyle Balance",
      icon: "⚖️",
      description: "Work-life balance, habits, and daily lifestyle choices",
      questions: [
        { id: "daily_routine", text: "How satisfied are you with your daily routine structure?", category: "Daily Habits", weight: 1.0, description: "Routine consistency" },
        { id: "time_management", text: "How well do you manage your time?", category: "Daily Habits", weight: 1.2, description: "Time utilization" },
        { id: "healthy_habits", text: "How consistent are you with healthy daily habits?", category: "Daily Habits", weight: 1.1, description: "Positive habit maintenance" },
        { id: "screen_time", text: "How well do you manage your screen time and technology use?", category: "Daily Habits", weight: 1.0, description: "Digital wellness" },
        { id: "work_productivity", text: "How satisfied are you with your work productivity?", category: "Work Balance", weight: 1.0, description: "Professional efficiency" },
        { id: "work_stress", text: "How well do you manage work-related stress?", category: "Work Balance", weight: 1.2, description: "Workplace stress management" },
        { id: "personal_boundaries", text: "How well do you set and maintain personal boundaries?", category: "Work Balance", weight: 1.1, description: "Boundary setting" },
        { id: "leisure_activities", text: "How satisfied are you with your hobbies and leisure activities?", category: "Personal Time", weight: 1.0, description: "Recreational satisfaction" },
        { id: "relaxation", text: "How well do you make time for relaxation and unwinding?", category: "Personal Time", weight: 1.1, description: "Relaxation practices" },
        { id: "personal_space", text: "How satisfied are you with your personal living environment?", category: "Personal Time", weight: 0.9, description: "Living space satisfaction" }
      ]
    }
  ];

  const options = [
    { value: 1, label: "Poor", description: "Significant improvement needed", color: "#f44336" },
    { value: 2, label: "Fair", description: "Below average, needs attention", color: "#ff9800" },
    { value: 3, label: "Good", description: "Average, room for improvement", color: "#2196f3" },
    { value: 4, label: "Very Good", description: "Above average, doing well", color: "#4caf50" },
    { value: 5, label: "Excellent", description: "Outstanding, maintain current level", color: "#388e3c" }
  ];

  const questionsPerPage = 5;
  const currentTracker = trackerCategories.find(t => t.id === activeTracker) || trackerCategories[0];
  const currentQuestions = currentTracker.questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );
  const totalPages = Math.ceil(currentTracker.questions.length / questionsPerPage);

  const handleResponse = (questionId: string, value: number): void => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const nextPage = (): void => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const calculateWellness = (): void => {
    if (Object.keys(responses).length < currentTracker.questions.length) return;

    // Calculate weighted scores
    let totalWeightedScore = 0;
    let totalWeight = 0;
    const categoryScores: { [key: string]: { score: number; count: number; weight: number } } = {};

    currentTracker.questions.forEach(question => {
      const response = responses[question.id] || 0;
      const weightedScore = response * question.weight;
      
      totalWeightedScore += weightedScore;
      totalWeight += question.weight;

      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { score: 0, count: 0, weight: 0 };
      }
      categoryScores[question.category].score += weightedScore;
      categoryScores[question.category].count += 1;
      categoryScores[question.category].weight += question.weight;
    });

    const averageRating = totalWeightedScore / totalWeight;
    const overallScore = (averageRating / 5) * 100;

    // Calculate category averages
    const categories: { [key: string]: number } = {};
    Object.entries(categoryScores).forEach(([category, data]) => {
      categories[category] = data.score / data.weight;
    });

    const wellnessLevel = getWellnessLevel(overallScore);
    const recommendations = getRecommendations(categories, responses);
    const { strengths, improvementAreas } = analyzeStrengthsAndAreas(categories);

    setResult({
      overallScore,
      averageRating,
      categories,
      recommendations,
      wellnessLevel,
      strengths,
      improvementAreas
    });
  };

  const getWellnessLevel = (score: number) => {
    if (score >= 85) {
      return { 
        level: "Outstanding", 
        color: "#4CAF50", 
        description: "Exceptional wellness - you're thriving in most areas!"
      };
    }
    if (score >= 70) {
      return { 
        level: "Very Good", 
        color: "#8BC34A", 
        description: "Strong wellness foundation with room for fine-tuning"
      };
    }
    if (score >= 55) {
      return { 
        level: "Good", 
        color: "#2196F3", 
        description: "Solid wellness base with several areas for improvement"
      };
    }
    if (score >= 40) {
      return { 
        level: "Fair", 
        color: "#FF9800", 
        description: "Some wellness foundations in place, focus needed on key areas"
      };
    }
    return { 
      level: "Needs Attention", 
      color: "#F44336", 
      description: "Multiple areas need focus for improved wellbeing"
    };
  };

  const getRecommendations = (categories: { [key: string]: number }, responses: { [key: string]: number }): string[] => {
    const recommendations: string[] = [];

    // Category-based recommendations
    Object.entries(categories).forEach(([category, score]) => {
      if (score < 3) {
        switch (category) {
          case "Physical Health":
            recommendations.push("Prioritize sleep hygiene and establish a consistent sleep schedule");
            break;
          case "Physical Activity":
            recommendations.push("Gradually increase physical activity - start with 10-15 minutes daily");
            break;
          case "Nutrition":
            recommendations.push("Focus on whole foods, adequate hydration, and mindful eating practices");
            break;
          case "Mental Health":
            recommendations.push("Consider stress management techniques like meditation or deep breathing");
            break;
          case "Social Wellbeing":
            recommendations.push("Invest time in meaningful relationships and community connections");
            break;
          case "Purpose & Growth":
            recommendations.push("Explore activities that align with your values and promote personal growth");
            break;
          case "Fitness":
            recommendations.push("Develop a balanced fitness routine including cardio, strength, and flexibility");
            break;
          case "Body Health":
            recommendations.push("Focus on body awareness and gentle, sustainable health practices");
            break;
          case "Emotional Health":
            recommendations.push("Practice emotional awareness and healthy coping strategies");
            break;
          case "Cognitive Health":
            recommendations.push("Engage in mentally stimulating activities and practice mindfulness");
            break;
          case "Daily Habits":
            recommendations.push("Create structured, healthy daily routines that support your wellbeing");
            break;
          case "Work Balance":
            recommendations.push("Establish clear work-life boundaries and manage professional stress");
            break;
          case "Personal Time":
            recommendations.push("Make time for relaxation, hobbies, and activities you enjoy");
            break;
        }
      }
    });

    // Specific response-based recommendations
    if (responses.sleep_quality && responses.sleep_quality < 3) {
      recommendations.push("Create a bedtime routine and optimize your sleep environment");
    }
    if (responses.stress_management && responses.stress_management < 3) {
      recommendations.push("Learn and practice stress reduction techniques like progressive muscle relaxation");
    }
    if (responses.exercise_cardio && responses.exercise_cardio < 3) {
      recommendations.push("Find enjoyable forms of cardiovascular exercise you can sustain");
    }

    // General wellness recommendations
    if (recommendations.length === 0) {
      recommendations.push("Excellent work! Continue maintaining your healthy lifestyle habits");
      recommendations.push("Consider sharing your wellness strategies with others");
    } else {
      recommendations.push("Start with small, sustainable changes in 1-2 areas");
      recommendations.push("Consider tracking your progress and celebrating small wins");
    }

    return recommendations.slice(0, 6);
  };

  const analyzeStrengthsAndAreas = (categories: { [key: string]: number }) => {
    const strengths: string[] = [];
    const improvementAreas: string[] = [];

    Object.entries(categories).forEach(([category, score]) => {
      if (score >= 4) {
        strengths.push(category);
      } else if (score < 3) {
        improvementAreas.push(category);
      }
    });

    return { strengths, improvementAreas };
  };

  const resetTracker = (): void => {
    setResponses({});
    setResult(null);
    setCurrentPage(0);
  };

  const switchTracker = (trackerId: string): void => {
    setActiveTracker(trackerId);
    setResponses({});
    setResult(null);
    setCurrentPage(0);
  };

  const getCompletionPercentage = (): number => {
    const answered = Object.keys(responses).length;
    const total = currentTracker.questions.length;
    return (answered / total) * 100;
  };

  const isCurrentPageComplete = (): boolean => {
    return currentQuestions.every(q => responses[q.id] !== undefined);
  };

  const isTrackerComplete = (): boolean => {
    return currentTracker.questions.every(q => responses[q.id] !== undefined);
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection 
          icon="🌟" 
          title="Comprehensive Wellness Tracker" 
          text="Assess your overall wellbeing across multiple dimensions. Get personalized insights and actionable recommendations for a balanced, healthy lifestyle."
        />

        <div className={homeStyle.sectionWrapper}>
          {/* Tracker Type Navigation */}
          <div className={styles.navTabs}>
            {trackerCategories.map(tracker => (
              <div
                key={tracker.id}
                className={`${styles.navTab} ${
                  activeTracker === tracker.id ? styles.activeTab : styles.inactiveTab
                }`}
                onClick={() => switchTracker(tracker.id)}
              >
                <span className={styles.testIcon}>{tracker.icon}</span>
                {tracker.name}
              </div>
            ))}
          </div>

          {!result ? (
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>{currentTracker.name}</h2>
              <p className={homeStyle.normalText}>{currentTracker.description}</p>

              {/* Progress Indicator */}
              <div className={styles.enhancedProgressBar}>
                <div 
                  className={styles.enhancedProgressFill}
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
              <div className="text-center mb-4">
                <span className={homeStyle.normalText}>
                  Progress: {Object.keys(responses).length}/{currentTracker.questions.length} questions
                </span>
              </div>

              {/* Page Indicator */}
              <div className="text-center mb-6">
                <span className={homeStyle.normalTitle}>
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>

              {/* Questions */}
              <div className={styles.wellnessQuestionsContainer}>
                {currentQuestions.map((question) => (
                  <div key={question.id} className={styles.wellnessQuestionCard}>
                    <div className={styles.wellnessQuestionHeader}>
                      <h3 className={styles.wellnessQuestionText}>{question.text}</h3>
                      {question.description && (
                        <p className={styles.wellnessQuestionDescription}>{question.description}</p>
                      )}
                      <span className={styles.wellnessCategoryBadge}>{question.category}</span>
                    </div>
                    <div className={styles.wellnessOptionsContainer}>
                      {options.map(option => (
                        <div
                          key={option.value}
                          className={`${styles.wellnessOption} ${
                            responses[question.id] === option.value ? styles.selectedWellnessOption : ''
                          }`}
                          onClick={() => handleResponse(question.id, option.value)}
                          style={{ borderLeftColor: option.color }}
                        >
                          <div className={styles.wellnessOptionLabel}>{option.value} - {option.label}</div>
                          <div className={styles.wellnessOptionDescription}>{option.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className={styles.navigationButtons}>
                {currentPage > 0 && (
                  <ConvertButton 
                    onClick={prevPage}
                    disabled={false}
                    label="Previous"
                  />
                )}
                
                {currentPage < totalPages - 1 ? (
                  <ConvertButton 
                    onClick={nextPage}
                    disabled={!isCurrentPageComplete()}
                    label="Next"
                  />
                ) : (
                  <ConvertButton 
                    onClick={calculateWellness}
                    disabled={!isTrackerComplete()}
                    label="Calculate Wellness Score"
                  />
                )}
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>{currentTracker.name} Results</h2>
              
              <div className={styles.wellnessResultCard}>
                <div className={styles.scoreDisplay}>
                  <span className={styles.scoreValue} style={{ color: result.wellnessLevel.color }}>
                    {result.overallScore.toFixed(1)}%
                  </span>
                  <span className={styles.scoreLabel}>{result.wellnessLevel.level}</span>
                </div>
                
                <div className={styles.wellnessDescription}>
                  <p>{result.wellnessLevel.description}</p>
                </div>
                
                <div className={styles.breakdown}>
                  <div>
                    <div className={styles.statValue}>{result.averageRating.toFixed(1)}</div>
                    <div className={styles.statLabel}>Average Rating</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{currentTracker.questions.length}</div>
                    <div className={styles.statLabel}>Areas Assessed</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{result.strengths.length}</div>
                    <div className={styles.statLabel}>Strength Areas</div>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className={styles.categoryBreakdown}>
                  <h3 className={homeStyle.normalTitle}>Category Scores:</h3>
                  <div className={styles.categoryWellnessGrid}>
                    {Object.entries(result.categories).map(([category, score]) => (
                      <div key={category} className={styles.categoryWellnessItem}>
                        <div className={styles.categoryName}>{category}</div>
                        <div className={styles.categoryScore}>
                          {score.toFixed(1)}/5
                        </div>
                        <div className={styles.categoryBar}>
                          <div 
                            className={styles.categoryFill}
                            style={{ 
                              width: `${(score / 5) * 100}%`,
                              backgroundColor: score >= 4 ? '#4CAF50' : score >= 3 ? '#2196F3' : score >= 2 ? '#FF9800' : '#F44336'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths and Areas for Improvement */}
                <div className={styles.strengthsAreasSection}>
                  {result.strengths.length > 0 && (
                    <div className={styles.strengthsArea}>
                      <h4 className={styles.strengthsTitle}>Your Wellness Strengths:</h4>
                      <div className={styles.strengthsList}>
                        {result.strengths.map(strength => (
                          <span key={strength} className={styles.strengthTag}>{strength}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {result.improvementAreas.length > 0 && (
                    <div className={styles.improvementArea}>
                      <h4 className={styles.improvementTitle}>Areas for Growth:</h4>
                      <div className={styles.improvementList}>
                        {result.improvementAreas.map(area => (
                          <span key={area} className={styles.improvementTag}>{area}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendations */}
                <div className={styles.recommendation}>
                  <h3 className={homeStyle.normalTitle}>Personalized Wellness Recommendations:</h3>
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
                  onClick={resetTracker} 
                  disabled={false} 
                  label="Track Another Area" 
                />
              </div>
            </div>
          )}

          {/* Wellness Tips */}
          <div className={styles.instructions}>
            <div className={styles.instructionTitle}>🌱 Wellness Journey Tips:</div>
            <div className={styles.instructionText}>
              Remember that wellness is a journey, not a destination. Small, consistent changes often lead to the most sustainable improvements. Focus on progress, not perfection, and be kind to yourself throughout your wellness journey. Consider reassessing your wellness monthly to track improvements and adjust your goals.
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.company}>{mockCompanyInfo.name}</p>
          <p className={styles.disclaimer}>{mockCompanyInfo.disclaimer}</p>
        </div>
      </main>
    </div>
  );
}
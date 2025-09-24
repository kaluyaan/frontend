"use client";
import React, { JSX, useState } from "react";
import styles from "../shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

// Types
interface StressResult {
  totalScore: number;
  stressLevel: string;
  color: string;
  description: string;
  recommendations: string[];
  category: string;
  severity: "low" | "moderate" | "high" | "severe";
}

interface Question {
  id: number;
  text: string;
  category: "general" | "work" | "personal" | "physical" | "emotional";
  isReversed?: boolean;
}

interface Option {
  value: number;
  label: string;
  description?: string;
}

interface AssessmentType {
  id: string;
  name: string;
  icon: string;
  questions: Question[];
  description: string;
}

// Mock constants
const mockCompanyInfo = {
  name: "Kaaluyaan Health",
  disclaimer:
    "This assessment is for educational purposes only and should not replace professional medical advice.",
};

export default function StressAssessment(): JSX.Element {
  const [activeAssessment, setActiveAssessment] = useState<string>("general");
  const [responses, setResponses] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<StressResult | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const options: Option[] = [
    { value: 0, label: "Never", description: "Not at all" },
    { value: 1, label: "Rarely", description: "Once in a while" },
    { value: 2, label: "Sometimes", description: "About half the time" },
    { value: 3, label: "Often", description: "Most of the time" },
    { value: 4, label: "Always", description: "All the time" },
  ];

  const assessmentTypes: AssessmentType[] = [
    {
      id: "general",
      name: "General Stress",
      icon: "🧠",
      description: "Overall stress and coping assessment",
      questions: [
        {
          id: 0,
          text: "How often have you felt nervous or stressed?",
          category: "general",
        },
        {
          id: 1,
          text: "How often have you felt unable to control important things in your life?",
          category: "general",
        },
        {
          id: 2,
          text: "How often have you felt confident about handling personal problems?",
          category: "general",
          isReversed: true,
        },
        {
          id: 3,
          text: "How often have you felt that things were going your way?",
          category: "general",
          isReversed: true,
        },
        {
          id: 4,
          text: "How often have you found that you could not cope with all the things you had to do?",
          category: "general",
        },
        {
          id: 5,
          text: "How often have you been able to control irritations in your life?",
          category: "general",
          isReversed: true,
        },
        {
          id: 6,
          text: "How often have you felt that you were on top of things?",
          category: "general",
          isReversed: true,
        },
        {
          id: 7,
          text: "How often have you been angered because of things outside of your control?",
          category: "general",
        },
        {
          id: 8,
          text: "How often have you felt difficulties were piling up so high you could not overcome them?",
          category: "general",
        },
        {
          id: 9,
          text: "How often have you been upset because of something that happened unexpectedly?",
          category: "general",
        },
      ],
    },
    {
      id: "workplace",
      name: "Workplace Stress",
      icon: "💼",
      description: "Work-related stress and pressure assessment",
      questions: [
        {
          id: 0,
          text: "How often do you feel overwhelmed by your workload?",
          category: "work",
        },
        {
          id: 1,
          text: "How often do you worry about work when you're not at work?",
          category: "work",
        },
        {
          id: 2,
          text: "How often do you feel satisfied with your work performance?",
          category: "work",
          isReversed: true,
        },
        {
          id: 3,
          text: "How often do you feel supported by your colleagues or supervisor?",
          category: "work",
          isReversed: true,
        },
        {
          id: 4,
          text: "How often do you feel pressured to meet unrealistic deadlines?",
          category: "work",
        },
        {
          id: 5,
          text: "How often do you feel your work-life balance is healthy?",
          category: "work",
          isReversed: true,
        },
        {
          id: 6,
          text: "How often do you feel recognized for your contributions at work?",
          category: "work",
          isReversed: true,
        },
        {
          id: 7,
          text: "How often do you feel stressed about job security?",
          category: "work",
        },
        {
          id: 8,
          text: "How often do you feel physically exhausted after work?",
          category: "work",
        },
        {
          id: 9,
          text: "How often do you look forward to going to work?",
          category: "work",
          isReversed: true,
        },
      ],
    },
    {
      id: "relationship",
      name: "Relationship Stress",
      icon: "💕",
      description: "Personal and social relationship stress",
      questions: [
        {
          id: 0,
          text: "How often do you feel supported by your family and friends?",
          category: "personal",
          isReversed: true,
        },
        {
          id: 1,
          text: "How often do you have conflicts with people close to you?",
          category: "personal",
        },
        {
          id: 2,
          text: "How often do you feel lonely or isolated?",
          category: "personal",
        },
        {
          id: 3,
          text: "How often do you feel satisfied with your relationships?",
          category: "personal",
          isReversed: true,
        },
        {
          id: 4,
          text: "How often do you worry about disappointing others?",
          category: "personal",
        },
        {
          id: 5,
          text: "How often do you feel comfortable expressing your feelings?",
          category: "personal",
          isReversed: true,
        },
        {
          id: 6,
          text: "How often do you feel judged by others?",
          category: "personal",
        },
        {
          id: 7,
          text: "How often do you feel like you have someone to talk to?",
          category: "personal",
          isReversed: true,
        },
        {
          id: 8,
          text: "How often do you avoid social situations due to stress?",
          category: "personal",
        },
        {
          id: 9,
          text: "How often do you feel appreciated by the people in your life?",
          category: "personal",
          isReversed: true,
        },
      ],
    },
    {
      id: "physical",
      name: "Physical Stress",
      icon: "💪",
      description: "Physical symptoms and health-related stress",
      questions: [
        {
          id: 0,
          text: "How often do you experience headaches or muscle tension?",
          category: "physical",
        },
        {
          id: 1,
          text: "How often do you have trouble sleeping due to stress?",
          category: "physical",
        },
        {
          id: 2,
          text: "How often do you feel energetic and well-rested?",
          category: "physical",
          isReversed: true,
        },
        {
          id: 3,
          text: "How often do you experience digestive issues related to stress?",
          category: "physical",
        },
        {
          id: 4,
          text: "How often do you feel physically tense or restless?",
          category: "physical",
        },
        {
          id: 5,
          text: "How often do you engage in regular physical exercise?",
          category: "physical",
          isReversed: true,
        },
        {
          id: 6,
          text: "How often do you eat well-balanced, nutritious meals?",
          category: "physical",
          isReversed: true,
        },
        {
          id: 7,
          text: "How often do you use substances (caffeine, alcohol, etc.) to cope with stress?",
          category: "physical",
        },
        {
          id: 8,
          text: "How often do you feel physically healthy and strong?",
          category: "physical",
          isReversed: true,
        },
        {
          id: 9,
          text: "How often do you experience rapid heartbeat or breathing when stressed?",
          category: "physical",
        },
      ],
    },
  ];

  const questionsPerPage = 3;
  const currentAssessment =
    assessmentTypes.find((a) => a.id === activeAssessment) ||
    assessmentTypes[0];
  const currentQuestions = currentAssessment.questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );
  const totalPages = Math.ceil(
    currentAssessment.questions.length / questionsPerPage
  );

  const handleResponse = (questionId: number, value: number): void => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const nextPage = (): void => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const calculateStress = (): void => {
    if (Object.keys(responses).length < currentAssessment.questions.length)
      return;

    let totalScore = 0;

    currentAssessment.questions.forEach((question) => {
      const response = responses[question.id] || 0;
      if (question.isReversed) {
        totalScore += 4 - response; // Reverse score for positive questions
      } else {
        totalScore += response;
      }
    });

    const maxScore = currentAssessment.questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    const stressData = getStressLevel(percentage);
    const recommendations = getStressRecommendations(
      percentage,
      activeAssessment
    );

    setResult({
      totalScore,
      stressLevel: stressData.level,
      color: stressData.color,
      description: stressData.description,
      recommendations,
      category: stressData.category,
      severity: stressData.severity,
    });
  };

  const getStressLevel = (percentage: number) => {
    if (percentage <= 25) {
      return {
        level: "Low Stress",
        color: "#4CAF50",
        description: "You are managing stress very well",
        category: "Excellent",
        severity: "low" as const,
      };
    }
    if (percentage <= 50) {
      return {
        level: "Moderate Stress",
        color: "#2196F3",
        description: "Some areas could benefit from stress management",
        category: "Good",
        severity: "moderate" as const,
      };
    }
    if (percentage <= 75) {
      return {
        level: "High Stress",
        color: "#FF9800",
        description: "Consider implementing stress reduction strategies",
        category: "Concerning",
        severity: "high" as const,
      };
    }
    return {
      level: "Very High Stress",
      color: "#F44336",
      description: "Professional support is recommended",
      category: "Critical",
      severity: "severe" as const,
    };
  };

  const getStressRecommendations = (
    percentage: number,
    assessmentType: string
  ): string[] => {
    const baseRecommendations = {
      low: [
        "Continue your current stress management practices",
        "Maintain regular exercise and healthy sleep schedule",
        "Keep practicing mindfulness or relaxation techniques",
        "Share your coping strategies with others",
      ],
      moderate: [
        "Practice deep breathing exercises daily",
        "Consider meditation, yoga, or mindfulness apps",
        "Ensure adequate sleep (7-9 hours per night)",
        "Regular physical exercise can help reduce stress",
        "Consider talking to a counselor or therapist",
      ],
      high: [
        "Prioritize stress reduction techniques daily",
        "Consider professional counseling or therapy",
        "Evaluate and reduce stressors where possible",
        "Practice progressive muscle relaxation",
        "Join a support group or stress management program",
      ],
      severe: [
        "Seek immediate professional mental health support",
        "Consider intensive therapy or counseling",
        "Evaluate major life changes that may reduce stress",
        "Practice crisis coping skills",
        "Build a strong support network",
        "Consider medical evaluation for stress-related symptoms",
      ],
    };

    const specificRecommendations = {
      workplace: [
        "Set clear boundaries between work and personal time",
        "Practice time management and prioritization skills",
        "Communicate with supervisor about workload concerns",
        "Take regular breaks throughout the workday",
      ],
      relationship: [
        "Practice active listening and communication skills",
        "Set healthy boundaries in relationships",
        "Consider couples or family therapy if needed",
        "Build and maintain a social support network",
      ],
      physical: [
        "Focus on regular exercise and physical activity",
        "Maintain consistent sleep schedule",
        "Practice good nutrition and hydration",
        "Consider medical evaluation for physical symptoms",
      ],
    };

    let recommendations: string[] = [];

    if (percentage <= 25) recommendations = baseRecommendations.low;
    else if (percentage <= 50) recommendations = baseRecommendations.moderate;
    else if (percentage <= 75) recommendations = baseRecommendations.high;
    else recommendations = baseRecommendations.severe;

    // Add specific recommendations based on assessment type
    if (
      specificRecommendations[
        assessmentType as keyof typeof specificRecommendations
      ]
    ) {
      recommendations = [
        ...recommendations,
        ...specificRecommendations[
          assessmentType as keyof typeof specificRecommendations
        ],
      ];
    }

    return recommendations.slice(0, 6); // Limit to 6 recommendations
  };

  const resetAssessment = (): void => {
    setResponses({});
    setResult(null);
    setCurrentPage(0);
  };

  const switchAssessment = (assessmentId: string): void => {
    setActiveAssessment(assessmentId);
    setResponses({});
    setResult(null);
    setCurrentPage(0);
  };

  const getCompletionPercentage = (): number => {
    const answered = Object.keys(responses).length;
    const total = currentAssessment.questions.length;
    return (answered / total) * 100;
  };

  const isCurrentPageComplete = (): boolean => {
    return currentQuestions.every((q) => responses[q.id] !== undefined);
  };

  const isAssessmentComplete = (): boolean => {
    return currentAssessment.questions.every(
      (q) => responses[q.id] !== undefined
    );
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          icon="😰"
          title="Comprehensive Stress Assessment"
          text="Evaluate your stress levels across different areas of life. Get personalized recommendations for managing and reducing stress."
        />

        <div className={homeStyle.sectionWrapper}>
          {/* Assessment Type Navigation */}
          <div className={styles.navTabs}>
            {assessmentTypes.map((assessment) => (
              <div
                key={assessment.id}
                className={`${styles.navTab} ${
                  activeAssessment === assessment.id
                    ? styles.activeTab
                    : styles.inactiveTab
                }`}
                onClick={() => switchAssessment(assessment.id)}
              >
                <span className={styles.testIcon}>{assessment.icon}</span>
                {assessment.name}
              </div>
            ))}
          </div>

          {!result ? (
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>
                {currentAssessment.name} Assessment
              </h2>
              <p className={homeStyle.normalText}>
                {currentAssessment.description}
              </p>

              {/* Progress Indicator */}
              <div className={styles.enhancedProgressBar}>
                <div
                  className={styles.enhancedProgressFill}
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
              <div className="text-center mb-4">
                <span className={homeStyle.normalText}>
                  Progress: {Object.keys(responses).length}/
                  {currentAssessment.questions.length} questions
                </span>
              </div>

              {/* Page Indicator */}
              <div className="text-center mb-6">
                <span className={homeStyle.normalTitle}>
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>

              {/* Questions */}
              <div className={styles.questionsContainer}>
                {currentQuestions.map((question) => (
                  <div key={question.id} className={styles.questionCard}>
                    <h3 className={styles.questionText}>
                      {question.id + 1}. {question.text}
                    </h3>
                    <div className={styles.optionsContainer}>
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className={`${styles.stressOption} ${
                            responses[question.id] === option.value
                              ? styles.selectedOption
                              : ""
                          }`}
                          onClick={() =>
                            handleResponse(question.id, option.value)
                          }
                        >
                          <div className={styles.optionLabel}>
                            {option.label}
                          </div>
                          <div className={styles.optionDescription}>
                            {option.description}
                          </div>
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
                    onClick={calculateStress}
                    disabled={!isAssessmentComplete()}
                    label="Calculate Stress Level"
                  />
                )}
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>
                {currentAssessment.name} Results
              </h2>

              <div className={styles.resultCard}>
                <div className={styles.scoreDisplay}>
                  <span
                    className={styles.scoreValue}
                    style={{ color: result.color }}
                  >
                    {result.stressLevel}
                  </span>
                  <span className={styles.scoreLabel}>Assessment Result</span>
                </div>

                <div
                  className={styles.category}
                  style={{ color: result.color }}
                >
                  {result.category}
                </div>

                <div className={styles.breakdown}>
                  <div>
                    <div className={styles.statValue}>{result.totalScore}</div>
                    <div className={styles.statLabel}>Total Score</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>
                      {currentAssessment.questions.length}
                    </div>
                    <div className={styles.statLabel}>Questions</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>
                      {Math.round(
                        (result.totalScore /
                          (currentAssessment.questions.length * 4)) *
                          100
                      )}
                      %
                    </div>
                    <div className={styles.statLabel}>Stress Level</div>
                  </div>
                </div>

                <div className={styles.stressDescription}>
                  <p>{result.description}</p>
                </div>

                <div className={styles.recommendation}>
                  <h3 className={homeStyle.normalTitle}>
                    Personalized Recommendations:
                  </h3>
                  <ul className={styles.recommendationList}>
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className={styles.recommendationItem}>
                        {rec}
                      </li>
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
                  onClick={resetAssessment}
                  disabled={false}
                  label="Take Another Assessment"
                />
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className={styles.instructions}>
            <div className={styles.instructionTitle}>⚠️ Important Note:</div>
            <div className={styles.instructionText}>
              {`This assessment is for informational and educational purposes only. It should not replace professional medical advice, diagnosis, or treatment. If you're experiencing significant stress, anxiety, or mental health concerns, please consult with a qualified healthcare professional or mental health provider.`}{" "}
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

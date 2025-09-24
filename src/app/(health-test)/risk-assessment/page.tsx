"use client";
import { useState, useEffect, JSX } from "react";
import { COMPANY_INFO } from "../constants";
import styles from "../shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

// Types
interface RiskResult {
  totalScore: number;
  maxScore: number;
  riskLevel: string;
  color: string;
  recommendations: string[];
  categories: { [key: string]: number };
  percentageScore: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  description: string;
}

interface Question {
  id: string;
  label: string;
  type: 'select' | 'range';
  category: 'lifestyle' | 'medical' | 'behavioral' | 'environmental';
  options: string[];
  scores: number[];
  description?: string;
  weight?: number;
}

interface AssessmentType {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
}

// Mock constants
const mockCompanyInfo = {
  name: "Kaaluyaan Health",
  disclaimer: "This assessment is for educational purposes only and should not replace professional medical advice."
};

export default function RiskAssessment(): JSX.Element {
  const [activeAssessment, setActiveAssessment] = useState<string>("general");
  const [responses, setResponses] = useState<{[key: string]: string | number}>({});
  const [result, setResult] = useState<RiskResult | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const assessmentTypes: AssessmentType[] = [
    {
      id: "general",
      name: "General Health Risk",
      icon: "🏥",
      description: "Overall health risk assessment based on lifestyle and medical factors",
      questions: [
        { 
          id: 'age', 
          label: 'Age Group', 
          type: 'select', 
          category: 'medical',
          options: ['18-30', '31-45', '46-60', '60+'], 
          scores: [0, 1, 2, 4],
          description: "Age is a significant risk factor for many health conditions"
        },
        { 
          id: 'smoking', 
          label: 'Smoking Status', 
          type: 'select', 
          category: 'lifestyle',
          options: ['Never smoked', 'Former smoker (>2 years)', 'Former smoker (<2 years)', 'Current smoker'], 
          scores: [0, 1, 2, 4],
          description: "Smoking significantly increases risk of heart disease, cancer, and stroke"
        },
        { 
          id: 'exercise', 
          label: 'Physical Activity Level', 
          type: 'select', 
          category: 'lifestyle',
          options: ['Very active (daily)', 'Active (4-5 times/week)', 'Moderate (2-3 times/week)', 'Low (1-2 times/week)', 'Sedentary'], 
          scores: [0, 1, 2, 3, 4],
          description: "Regular exercise reduces risk of chronic diseases"
        },
        { 
          id: 'diet', 
          label: 'Diet Quality', 
          type: 'select', 
          category: 'lifestyle',
          options: ['Excellent (balanced, whole foods)', 'Good (mostly healthy)', 'Fair (some processed foods)', 'Poor (mostly processed)'], 
          scores: [0, 1, 2, 4],
          description: "Diet quality affects cardiovascular health and diabetes risk"
        },
        { 
          id: 'alcohol', 
          label: 'Alcohol Consumption', 
          type: 'select', 
          category: 'behavioral',
          options: ['None', 'Moderate (1-2 drinks/day)', 'Heavy (3+ drinks/day)', 'Binge drinking'], 
          scores: [0, 1, 3, 4],
          description: "Excessive alcohol increases risk of liver disease and other conditions"
        },
        { 
          id: 'sleep', 
          label: 'Sleep Quality', 
          type: 'select', 
          category: 'behavioral',
          options: ['Excellent (7-9 hours, quality)', 'Good (7-9 hours)', 'Fair (5-7 hours)', 'Poor (<5 hours or >10 hours)'], 
          scores: [0, 1, 2, 3],
          description: "Sleep quality affects immune function and mental health"
        },
        { 
          id: 'stress', 
          label: 'Chronic Stress Level', 
          type: 'select', 
          category: 'behavioral',
          options: ['Low (well-managed)', 'Moderate (occasional stress)', 'High (frequent stress)', 'Severe (constant stress)'], 
          scores: [0, 1, 3, 4],
          description: "Chronic stress increases risk of heart disease and mental health issues"
        },
        { 
          id: 'family_history', 
          label: 'Family History of Chronic Disease', 
          type: 'select', 
          category: 'medical',
          options: ['None known', 'Some conditions (1-2 relatives)', 'Multiple conditions', 'Strong family history'], 
          scores: [0, 2, 3, 4],
          description: "Family history indicates genetic predisposition"
        },
        { 
          id: 'bmi', 
          label: 'Body Mass Index (BMI)', 
          type: 'select', 
          category: 'medical',
          options: ['Normal (18.5-24.9)', 'Overweight (25-29.9)', 'Obese Class I (30-34.9)', 'Obese Class II+ (35+)'], 
          scores: [0, 2, 3, 4],
          description: "Obesity increases risk of diabetes, heart disease, and other conditions"
        },
        { 
          id: 'checkups', 
          label: 'Preventive Healthcare', 
          type: 'select', 
          category: 'behavioral',
          options: ['Regular annual checkups', 'Every 2-3 years', 'Only when sick', 'Rarely or never'], 
          scores: [0, 1, 2, 3],
          description: "Regular checkups help detect and prevent health issues early"
        }
      ]
    },
    {
      id: "cardiovascular",
      name: "Heart Disease Risk",
      icon: "❤️",
      description: "Cardiovascular disease risk assessment",
      questions: [
        { 
          id: 'age', 
          label: 'Age', 
          type: 'select', 
          category: 'medical',
          options: ['Under 40', '40-49', '50-59', '60-69', '70+'], 
          scores: [0, 1, 2, 3, 4]
        },
        { 
          id: 'gender', 
          label: 'Gender', 
          type: 'select', 
          category: 'medical',
          options: ['Female (premenopausal)', 'Female (postmenopausal)', 'Male'], 
          scores: [0, 1, 2]
        },
        { 
          id: 'blood_pressure', 
          label: 'Blood Pressure', 
          type: 'select', 
          category: 'medical',
          options: ['Normal (<120/80)', 'Elevated (120-129/<80)', 'Stage 1 (130-139/80-89)', 'Stage 2 (≥140/90)'], 
          scores: [0, 1, 2, 4]
        },
        { 
          id: 'cholesterol', 
          label: 'Cholesterol Level', 
          type: 'select', 
          category: 'medical',
          options: ['Normal (<200 mg/dL)', 'Borderline (200-239)', 'High (≥240)', 'Unknown'], 
          scores: [0, 2, 4, 2]
        },
        { 
          id: 'diabetes', 
          label: 'Diabetes Status', 
          type: 'select', 
          category: 'medical',
          options: ['No diabetes', 'Prediabetes', 'Type 2 diabetes (controlled)', 'Type 2 diabetes (uncontrolled)'], 
          scores: [0, 2, 3, 4]
        },
        { 
          id: 'smoking_cardio', 
          label: 'Smoking History', 
          type: 'select', 
          category: 'lifestyle',
          options: ['Never', 'Quit >10 years ago', 'Quit 1-10 years ago', 'Current smoker'], 
          scores: [0, 1, 2, 4]
        },
        { 
          id: 'exercise_cardio', 
          label: 'Aerobic Exercise', 
          type: 'select', 
          category: 'lifestyle',
          options: ['≥150 min/week moderate', '75-149 min/week', '30-74 min/week', '<30 min/week'], 
          scores: [0, 1, 2, 3]
        },
        { 
          id: 'family_heart', 
          label: 'Family History of Heart Disease', 
          type: 'select', 
          category: 'medical',
          options: ['None', 'One parent/sibling', 'Multiple relatives', 'Early onset in family'], 
          scores: [0, 2, 3, 4]
        }
      ]
    },
    {
      id: "diabetes",
      name: "Diabetes Risk",
      icon: "🩺",
      description: "Type 2 diabetes risk assessment",
      questions: [
        { 
          id: 'age_diabetes', 
          label: 'Age', 
          type: 'select', 
          category: 'medical',
          options: ['Under 40', '40-49', '50-59', '60+'], 
          scores: [0, 1, 2, 3]
        },
        { 
          id: 'weight', 
          label: 'Weight Status', 
          type: 'select', 
          category: 'medical',
          options: ['Normal weight', 'Overweight', 'Obese', 'Severely obese'], 
          scores: [0, 1, 2, 3]
        },
        { 
          id: 'waist', 
          label: 'Waist Circumference', 
          type: 'select', 
          category: 'medical',
          options: ['Normal (M<40in, F<35in)', 'Elevated (M40-42in, F35-37in)', 'High (M>42in, F>37in)'], 
          scores: [0, 1, 2]
        },
        { 
          id: 'activity_diabetes', 
          label: 'Physical Activity', 
          type: 'select', 
          category: 'lifestyle',
          options: ['Regular (≥3 times/week)', 'Occasional (1-2 times/week)', 'Rare (<1 time/week)'], 
          scores: [0, 1, 2]
        },
        { 
          id: 'diet_diabetes', 
          label: 'Diet Pattern', 
          type: 'select', 
          category: 'lifestyle',
          options: ['Low sugar/refined carbs', 'Moderate sugar intake', 'High sugar/processed foods'], 
          scores: [0, 1, 2]
        },
        { 
          id: 'family_diabetes', 
          label: 'Family History of Diabetes', 
          type: 'select', 
          category: 'medical',
          options: ['None', 'Grandparents/aunts/uncles', 'Parents/siblings'], 
          scores: [0, 1, 3]
        },
        { 
          id: 'gestational', 
          label: 'Gestational Diabetes History (if applicable)', 
          type: 'select', 
          category: 'medical',
          options: ['Not applicable/No', 'Yes'], 
          scores: [0, 2]
        },
        { 
          id: 'blood_sugar', 
          label: 'Previous Blood Sugar Tests', 
          type: 'select', 
          category: 'medical',
          options: ['Always normal', 'Borderline high', 'Pre-diabetes range', 'Unknown'], 
          scores: [0, 1, 2, 1]
        }
      ]
    },
    {
      id: "cancer",
      name: "Cancer Risk",
      icon: "🎗️",
      description: "General cancer risk assessment",
      questions: [
        { 
          id: 'age_cancer', 
          label: 'Age', 
          type: 'select', 
          category: 'medical',
          options: ['Under 30', '30-49', '50-64', '65+'], 
          scores: [0, 1, 2, 3]
        },
        { 
          id: 'smoking_cancer', 
          label: 'Tobacco Use', 
          type: 'select', 
          category: 'lifestyle',
          options: ['Never', 'Former (>10 years)', 'Former (<10 years)', 'Current'], 
          scores: [0, 1, 2, 4]
        },
        { 
          id: 'alcohol_cancer', 
          label: 'Alcohol Consumption', 
          type: 'select', 
          category: 'lifestyle',
          options: ['None/Rare', 'Light (1-3 drinks/week)', 'Moderate (4-14 drinks/week)', 'Heavy (>14 drinks/week)'], 
          scores: [0, 1, 2, 3]
        },
        { 
          id: 'diet_cancer', 
          label: 'Diet Quality', 
          type: 'select', 
          category: 'lifestyle',
          options: ['High fruits/vegetables, low processed', 'Balanced diet', 'Some processed foods', 'High processed/red meat'], 
          scores: [0, 1, 2, 3]
        },
        { 
          id: 'sun_exposure', 
          label: 'Sun Exposure/UV Protection', 
          type: 'select', 
          category: 'environmental',
          options: ['Always protected', 'Usually protected', 'Sometimes protected', 'Rarely protected'], 
          scores: [0, 1, 2, 3]
        },
        { 
          id: 'family_cancer', 
          label: 'Family History of Cancer', 
          type: 'select', 
          category: 'medical',
          options: ['None known', 'Distant relatives', 'Close relatives (1-2)', 'Multiple close relatives'], 
          scores: [0, 1, 3, 4]
        },
        { 
          id: 'screening', 
          label: 'Cancer Screening Compliance', 
          type: 'select', 
          category: 'behavioral',
          options: ['Up to date with all screenings', 'Mostly up to date', 'Some screenings missed', 'Rarely screened'], 
          scores: [0, 1, 2, 3]
        },
        { 
          id: 'environmental', 
          label: 'Environmental/Occupational Exposures', 
          type: 'select', 
          category: 'environmental',
          options: ['None known', 'Minimal exposure', 'Some exposure', 'Significant exposure'], 
          scores: [0, 1, 2, 3]
        }
      ]
    }
  ];

  const questionsPerPage = 3;
  const currentAssessment = assessmentTypes.find(a => a.id === activeAssessment) || assessmentTypes[0];
  const currentQuestions = currentAssessment.questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );
  const totalPages = Math.ceil(currentAssessment.questions.length / questionsPerPage);

  const handleResponse = (questionId: string, value: string): void => {
    const question = currentAssessment.questions.find(q => q.id === questionId);
    const optionIndex = question?.options.indexOf(value) || 0;
    const score = question?.scores[optionIndex] || 0;
    
    setResponses(prev => ({ 
      ...prev, 
      [questionId]: value, 
      [`${questionId}_score`]: score 
    }));
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

  const calculateRisk = (): void => {
    if (Object.keys(responses).length < currentAssessment.questions.length * 2) return;

    let totalScore = 0;
    const categories: { [key: string]: number } = {
      lifestyle: 0,
      medical: 0,
      behavioral: 0,
      environmental: 0
    };

    const maxScore = currentAssessment.questions.reduce((sum, q) => sum + Math.max(...q.scores), 0);

    currentAssessment.questions.forEach(question => {
      const score = responses[`${question.id}_score`] as number || 0;
      totalScore += score;
      categories[question.category] = (categories[question.category] || 0) + score;
    });

    const percentageScore = (totalScore / maxScore) * 100;
    const riskData = getRiskLevel(percentageScore, totalScore, maxScore);
    const recommendations = getRiskRecommendations(percentageScore, categories, activeAssessment);

    setResult({
      totalScore,
      maxScore,
      riskLevel: riskData.level,
      color: riskData.color,
      recommendations,
      categories,
      percentageScore: Math.round(percentageScore),
      severity: riskData.severity,
      description: riskData.description
    });
  };

  const getRiskLevel = (percentage: number, score: number, maxScore: number) => {
    if (percentage <= 25) {
      return { 
        level: 'Low Risk', 
        color: '#4CAF50', 
        severity: 'low' as const,
        description: 'Your risk factors are well-controlled'
      };
    }
    if (percentage <= 50) {
      return { 
        level: 'Moderate Risk', 
        color: '#2196F3', 
        severity: 'moderate' as const,
        description: 'Some risk factors need attention'
      };
    }
    if (percentage <= 75) {
      return { 
        level: 'High Risk', 
        color: '#FF9800', 
        severity: 'high' as const,
        description: 'Multiple risk factors require intervention'
      };
    }
    return { 
      level: 'Critical Risk', 
      color: '#F44336', 
      severity: 'critical' as const,
      description: 'Immediate lifestyle changes and medical consultation recommended'
    };
  };

  const getRiskRecommendations = (percentage: number, categories: {[key: string]: number}, assessmentType: string): string[] => {
    const recommendations: string[] = [];
    
    // Category-specific recommendations
    Object.entries(categories).forEach(([category, score]) => {
      if (score > 0) {
        switch (category) {
          case 'lifestyle':
            if (score >= 3) recommendations.push('Focus on lifestyle improvements: quit smoking, exercise regularly, improve diet quality');
            break;
          case 'medical':
            if (score >= 4) recommendations.push('Schedule comprehensive medical evaluation and discuss family history with healthcare provider');
            break;
          case 'behavioral':
            if (score >= 3) recommendations.push('Address behavioral factors: manage stress, improve sleep quality, maintain preventive care');
            break;
          case 'environmental':
            if (score >= 2) recommendations.push('Reduce environmental risk exposures and use appropriate protective measures');
            break;
        }
      }
    });

    // Risk level recommendations
    if (percentage <= 25) {
      recommendations.push('Maintain current healthy habits and continue regular preventive care');
      recommendations.push('Consider being a health advocate for family and friends');
    } else if (percentage <= 50) {
      recommendations.push('Focus on improving identified risk factors');
      recommendations.push('Discuss prevention strategies with your healthcare provider');
      recommendations.push('Consider working with health professionals for lifestyle changes');
    } else if (percentage <= 75) {
      recommendations.push('Prioritize immediate lifestyle modifications');
      recommendations.push('Consult healthcare provider for comprehensive risk management plan');
      recommendations.push('Consider referrals to specialists if indicated');
    } else {
      recommendations.push('Seek immediate medical consultation for comprehensive evaluation');
      recommendations.push('Implement urgent lifestyle changes with professional guidance');
      recommendations.push('Consider intensive intervention programs');
      recommendations.push('Regular monitoring and follow-up care essential');
    }

    // Assessment-specific recommendations
    const specificRecs = {
      cardiovascular: [
        'Monitor blood pressure and cholesterol regularly',
        'Follow heart-healthy diet (Mediterranean or DASH)',
        'Aim for 150 minutes of moderate aerobic activity weekly'
      ],
      diabetes: [
        'Monitor blood glucose levels as recommended',
        'Focus on weight management and portion control',
        'Include fiber-rich foods and limit refined sugars'
      ],
      cancer: [
        'Stay up-to-date with recommended cancer screenings',
        'Maintain healthy weight and active lifestyle',
        'Limit alcohol consumption and avoid tobacco'
      ]
    };

    if (specificRecs[assessmentType as keyof typeof specificRecs]) {
      recommendations.push(...specificRecs[assessmentType as keyof typeof specificRecs]);
    }

    return recommendations.slice(0, 8); // Limit to 8 recommendations
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
    const answered = Object.keys(responses).filter(key => !key.endsWith('_score')).length;
    const total = currentAssessment.questions.length;
    return (answered / total) * 100;
  };

  const isCurrentPageComplete = (): boolean => {
    return currentQuestions.every(q => responses[q.id] !== undefined);
  };

  const isAssessmentComplete = (): boolean => {
    return currentAssessment.questions.every(q => responses[q.id] !== undefined);
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection 
          icon="📊" 
          title="Comprehensive Health Risk Assessment" 
          text="Evaluate your health risks across multiple categories. Get personalized recommendations for prevention and early intervention."
        />

        <div className={homeStyle.sectionWrapper}>
          {/* Assessment Type Navigation */}
          <div className={styles.navTabs}>
            {assessmentTypes.map(assessment => (
              <div
                key={assessment.id}
                className={`${styles.navTab} ${
                  activeAssessment === assessment.id ? styles.activeTab : styles.inactiveTab
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
              <h2 className={homeStyle.normalTitle}>{currentAssessment.name}</h2>
              <p className={homeStyle.normalText}>{currentAssessment.description}</p>

              {/* Progress Indicator */}
              <div className={styles.enhancedProgressBar}>
                <div 
                  className={styles.enhancedProgressFill}
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
              <div className="text-center mb-4">
                <span className={homeStyle.normalText}>
                  Progress: {Object.keys(responses).filter(key => !key.endsWith('_score')).length}/{currentAssessment.questions.length} questions
                </span>
              </div>

              {/* Page Indicator */}
              <div className="text-center mb-6">
                <span className={homeStyle.normalTitle}>
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>

              {/* Questions */}
              <div className={styles.riskQuestionsContainer}>
                {currentQuestions.map((question) => (
                  <div key={question.id} className={styles.riskQuestionCard}>
                    <div className={styles.questionHeader}>
                      <h3 className={styles.riskQuestionText}>{question.label}</h3>
                      {question.description && (
                        <p className={styles.questionDescription}>{question.description}</p>
                      )}
                      <span className={styles.categoryBadge}>{question.category}</span>
                    </div>
                    <div className={styles.riskOptionsContainer}>
                      {question.options.map((option, index) => (
                        <div
                          key={option}
                          className={`${styles.riskOption} ${
                            responses[question.id] === option ? styles.selectedRiskOption : ''
                          } ${styles[`risk-level-${question.scores[index]}`]}`}
                          onClick={() => handleResponse(question.id, option)}
                        >
                          <div className={styles.riskOptionLabel}>{option}</div>
                          <div className={styles.riskScore}>Risk: {question.scores[index]}</div>
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
                    onClick={calculateRisk}
                    disabled={!isAssessmentComplete()}
                    label="Calculate Risk Level"
                  />
                )}
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>{currentAssessment.name} Results</h2>
              
              <div className={styles.riskResultCard}>
                <div className={styles.scoreDisplay}>
                  <span className={styles.scoreValue} style={{ color: result.color }}>
                    {result.riskLevel}
                  </span>
                  <span className={styles.scoreLabel}>{result.percentageScore}% Risk Score</span>
                </div>
                
                <div className={styles.riskDescription}>
                  <p>{result.description}</p>
                </div>
                
                <div className={styles.breakdown}>
                  <div>
                    <div className={styles.statValue}>{result.totalScore}</div>
                    <div className={styles.statLabel}>Total Score</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{result.maxScore}</div>
                    <div className={styles.statLabel}>Max Score</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{result.percentageScore}%</div>
                    <div className={styles.statLabel}>Risk Level</div>
                  </div>
                </div>

                <div className={styles.categoryBreakdown}>
                  <h3 className={homeStyle.normalTitle}>Risk Categories:</h3>
                  <div className={styles.categoryGrid}>
                    {Object.entries(result.categories).map(([category, score]) => (
                      <div key={category} className={styles.categoryItem}>
                        <div className={styles.categoryName}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </div>
                        <div className={styles.categoryScore}>{score}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.recommendation}>
                  <h3 className={homeStyle.normalTitle}>Personalized Recommendations:</h3>
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
                  onClick={resetAssessment} 
                  disabled={false} 
                  label="Take Another Assessment" 
                />
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className={styles.instructions}>
            <div className={styles.instructionTitle}>⚠️ Important Medical Disclaimer:</div>
            <div className={styles.instructionText}>
              This risk assessment is for educational purposes only and should not replace professional medical advice, diagnosis, or treatment. Risk calculators provide estimates based on population data and may not reflect individual circumstances. Always consult with qualified healthcare professionals for personalized medical advice and before making any decisions about your health care.
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
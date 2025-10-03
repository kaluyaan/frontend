"use client";
import React, { JSX, useState } from "react";
import styles from "./shared.module.css";
import homeStyle from "../../../components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

// Types
interface SymptomResult {
  urgencyScore: number;
  urgencyLevel: { level: string; color: string; description: string };
  recommendations: string[];
  symptomsCount: number;
  severity: string;
  duration: string;
  riskFactors: string[];
  category: string;
}

interface Symptom {
  id: string;
  name: string;
  category:
    | "general"
    | "respiratory"
    | "cardiovascular"
    | "neurological"
    | "digestive"
    | "musculoskeletal"
    | "psychological";
  urgencyWeight: number;
  description?: string;
}

interface SymptomCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  symptoms: Symptom[];
}

// Mock constants
const mockCompanyInfo = {
  name: "Kaaluyaan Health",
  disclaimer:
    "This tool is for educational purposes only and should not replace professional medical advice.",
};

export default function SymptomChecker(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [result, setResult] = useState<SymptomResult | null>(null);

  const symptomCategories: SymptomCategory[] = [
    {
      id: "general",
      name: "General Symptoms",
      icon: "🩺",
      description: "Common symptoms that affect overall wellbeing",
      symptoms: [
        {
          id: "fever",
          name: "Fever",
          category: "general",
          urgencyWeight: 2,
          description: "Body temperature above 100.4°F (38°C)",
        },
        {
          id: "fatigue",
          name: "Fatigue",
          category: "general",
          urgencyWeight: 1,
          description: "Unusual tiredness or exhaustion",
        },
        {
          id: "headache",
          name: "Headache",
          category: "general",
          urgencyWeight: 2,
          description: "Pain in head or neck area",
        },
        {
          id: "dizziness",
          name: "Dizziness",
          category: "general",
          urgencyWeight: 2,
          description: "Feeling lightheaded or unsteady",
        },
        {
          id: "nausea",
          name: "Nausea",
          category: "general",
          urgencyWeight: 1,
          description: "Feeling sick to stomach",
        },
        {
          id: "vomiting",
          name: "Vomiting",
          category: "general",
          urgencyWeight: 2,
          description: "Forceful emptying of stomach contents",
        },
        {
          id: "weakness",
          name: "Weakness",
          category: "general",
          urgencyWeight: 1,
          description: "Lack of physical strength",
        },
        {
          id: "loss_appetite",
          name: "Loss of Appetite",
          category: "general",
          urgencyWeight: 1,
          description: "Decreased desire to eat",
        },
      ],
    },
    {
      id: "respiratory",
      name: "Respiratory",
      icon: "🫁",
      description: "Breathing and lung-related symptoms",
      symptoms: [
        {
          id: "cough",
          name: "Cough",
          category: "respiratory",
          urgencyWeight: 1,
          description: "Persistent coughing",
        },
        {
          id: "shortness_breath",
          name: "Shortness of Breath",
          category: "respiratory",
          urgencyWeight: 4,
          description: "Difficulty breathing or feeling breathless",
        },
        {
          id: "sore_throat",
          name: "Sore Throat",
          category: "respiratory",
          urgencyWeight: 1,
          description: "Pain or irritation in throat",
        },
        {
          id: "chest_congestion",
          name: "Chest Congestion",
          category: "respiratory",
          urgencyWeight: 2,
          description: "Feeling of fullness in chest",
        },
        {
          id: "wheezing",
          name: "Wheezing",
          category: "respiratory",
          urgencyWeight: 3,
          description: "High-pitched breathing sound",
        },
        {
          id: "runny_nose",
          name: "Runny Nose",
          category: "respiratory",
          urgencyWeight: 1,
          description: "Nasal discharge",
        },
        {
          id: "sneezing",
          name: "Sneezing",
          category: "respiratory",
          urgencyWeight: 1,
          description: "Frequent sneezing",
        },
      ],
    },
    {
      id: "cardiovascular",
      name: "Heart & Circulation",
      icon: "❤️",
      description: "Heart and blood circulation symptoms",
      symptoms: [
        {
          id: "chest_pain",
          name: "Chest Pain",
          category: "cardiovascular",
          urgencyWeight: 5,
          description: "Pain or discomfort in chest area",
        },
        {
          id: "palpitations",
          name: "Heart Palpitations",
          category: "cardiovascular",
          urgencyWeight: 3,
          description: "Feeling of rapid or irregular heartbeat",
        },
        {
          id: "rapid_heartbeat",
          name: "Rapid Heartbeat",
          category: "cardiovascular",
          urgencyWeight: 3,
          description: "Heart rate faster than normal",
        },
        {
          id: "swelling_legs",
          name: "Leg Swelling",
          category: "cardiovascular",
          urgencyWeight: 2,
          description: "Swelling in legs, ankles, or feet",
        },
        {
          id: "cold_extremities",
          name: "Cold Hands/Feet",
          category: "cardiovascular",
          urgencyWeight: 1,
          description: "Unusually cold hands or feet",
        },
        {
          id: "fainting",
          name: "Fainting",
          category: "cardiovascular",
          urgencyWeight: 4,
          description: "Loss of consciousness",
        },
      ],
    },
    {
      id: "neurological",
      name: "Neurological",
      icon: "🧠",
      description: "Brain and nervous system symptoms",
      symptoms: [
        {
          id: "severe_headache",
          name: "Severe Headache",
          category: "neurological",
          urgencyWeight: 4,
          description: "Intense head pain, worse than usual",
        },
        {
          id: "confusion",
          name: "Confusion",
          category: "neurological",
          urgencyWeight: 4,
          description: "Difficulty thinking clearly",
        },
        {
          id: "memory_issues",
          name: "Memory Problems",
          category: "neurological",
          urgencyWeight: 2,
          description: "Difficulty remembering things",
        },
        {
          id: "numbness",
          name: "Numbness",
          category: "neurological",
          urgencyWeight: 3,
          description: "Loss of sensation in body parts",
        },
        {
          id: "tingling",
          name: "Tingling",
          category: "neurological",
          urgencyWeight: 2,
          description: "Pins and needles sensation",
        },
        {
          id: "vision_changes",
          name: "Vision Changes",
          category: "neurological",
          urgencyWeight: 3,
          description: "Blurred or double vision",
        },
        {
          id: "seizure",
          name: "Seizure",
          category: "neurological",
          urgencyWeight: 5,
          description: "Uncontrolled electrical activity in brain",
        },
        {
          id: "speech_difficulty",
          name: "Speech Difficulty",
          category: "neurological",
          urgencyWeight: 4,
          description: "Trouble speaking or slurred speech",
        },
      ],
    },
    {
      id: "digestive",
      name: "Digestive",
      icon: "🍽️",
      description: "Stomach and digestive system symptoms",
      symptoms: [
        {
          id: "abdominal_pain",
          name: "Abdominal Pain",
          category: "digestive",
          urgencyWeight: 3,
          description: "Pain in stomach area",
        },
        {
          id: "diarrhea",
          name: "Diarrhea",
          category: "digestive",
          urgencyWeight: 2,
          description: "Frequent loose or watery bowel movements",
        },
        {
          id: "constipation",
          name: "Constipation",
          category: "digestive",
          urgencyWeight: 1,
          description: "Difficulty passing bowel movements",
        },
        {
          id: "bloating",
          name: "Bloating",
          category: "digestive",
          urgencyWeight: 1,
          description: "Feeling of fullness or swelling in abdomen",
        },
        {
          id: "heartburn",
          name: "Heartburn",
          category: "digestive",
          urgencyWeight: 1,
          description: "Burning sensation in chest",
        },
        {
          id: "blood_stool",
          name: "Blood in Stool",
          category: "digestive",
          urgencyWeight: 4,
          description: "Visible blood in bowel movements",
        },
        {
          id: "severe_cramping",
          name: "Severe Cramping",
          category: "digestive",
          urgencyWeight: 3,
          description: "Intense abdominal cramps",
        },
      ],
    },
    {
      id: "musculoskeletal",
      name: "Muscle & Bone",
      icon: "🦴",
      description: "Muscle, bone, and joint symptoms",
      symptoms: [
        {
          id: "joint_pain",
          name: "Joint Pain",
          category: "musculoskeletal",
          urgencyWeight: 2,
          description: "Pain in joints",
        },
        {
          id: "muscle_aches",
          name: "Muscle Aches",
          category: "musculoskeletal",
          urgencyWeight: 1,
          description: "General muscle soreness",
        },
        {
          id: "back_pain",
          name: "Back Pain",
          category: "musculoskeletal",
          urgencyWeight: 2,
          description: "Pain in back area",
        },
        {
          id: "neck_pain",
          name: "Neck Pain",
          category: "musculoskeletal",
          urgencyWeight: 2,
          description: "Pain or stiffness in neck",
        },
        {
          id: "joint_swelling",
          name: "Joint Swelling",
          category: "musculoskeletal",
          urgencyWeight: 2,
          description: "Swelling around joints",
        },
        {
          id: "limited_mobility",
          name: "Limited Mobility",
          category: "musculoskeletal",
          urgencyWeight: 2,
          description: "Difficulty moving normally",
        },
        {
          id: "muscle_weakness",
          name: "Muscle Weakness",
          category: "musculoskeletal",
          urgencyWeight: 3,
          description: "Unusual weakness in muscles",
        },
      ],
    },
    {
      id: "psychological",
      name: "Mental Health",
      icon: "🧘",
      description: "Mental and emotional wellbeing symptoms",
      symptoms: [
        {
          id: "anxiety",
          name: "Anxiety",
          category: "psychological",
          urgencyWeight: 2,
          description: "Excessive worry or nervousness",
        },
        {
          id: "depression",
          name: "Depression",
          category: "psychological",
          urgencyWeight: 2,
          description: "Persistent sadness or low mood",
        },
        {
          id: "sleep_problems",
          name: "Sleep Problems",
          category: "psychological",
          urgencyWeight: 1,
          description: "Difficulty sleeping or staying asleep",
        },
        {
          id: "mood_swings",
          name: "Mood Swings",
          category: "psychological",
          urgencyWeight: 1,
          description: "Rapid changes in mood",
        },
        {
          id: "panic_attacks",
          name: "Panic Attacks",
          category: "psychological",
          urgencyWeight: 3,
          description: "Sudden episodes of intense fear",
        },
        {
          id: "concentration_issues",
          name: "Concentration Problems",
          category: "psychological",
          urgencyWeight: 1,
          description: "Difficulty focusing or concentrating",
        },
      ],
    },
  ];

  const severityLevels = [
    {
      value: "mild",
      label: "Mild",
      description: "Barely noticeable, doesn't interfere with daily activities",
    },
    {
      value: "moderate",
      label: "Moderate",
      description: "Noticeable but manageable, some impact on activities",
    },
    {
      value: "severe",
      label: "Severe",
      description: "Significantly impacts daily life and activities",
    },
    {
      value: "critical",
      label: "Critical",
      description: "Unable to function normally, severely debilitating",
    },
  ];

  const durationOptions = [
    { value: "minutes", label: "Few minutes", description: "Just started" },
    { value: "hours", label: "Few hours", description: "Less than 24 hours" },
    { value: "days", label: "1-3 days", description: "Recent onset" },
    { value: "week", label: "1 week", description: "About a week" },
    { value: "weeks", label: "2-4 weeks", description: "Several weeks" },
    {
      value: "months",
      label: "1+ months",
      description: "Chronic or long-term",
    },
  ];

  const ageGroups = [
    { value: "child", label: "Child (0-12)" },
    { value: "teen", label: "Teen (13-17)" },
    { value: "adult", label: "Adult (18-64)" },
    { value: "senior", label: "Senior (65+)" },
  ];

  const currentCategory =
    symptomCategories.find((cat) => cat.id === activeCategory) ||
    symptomCategories[0];

  const toggleSymptom = (symptomId: string): void => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSymptoms = (): void => {
    if (selectedSymptoms.length === 0 || !severity || !duration || !age) return;

    const urgencyScore = calculateUrgency();
    const urgencyLevel = getUrgencyLevel(urgencyScore);
    const recommendations = getRecommendations(
      urgencyScore,
      urgencyLevel.level
    );
    const riskFactors = identifyRiskFactors();

    setResult({
      urgencyScore,
      urgencyLevel,
      recommendations,
      symptomsCount: selectedSymptoms.length,
      severity,
      duration,
      riskFactors,
      category: urgencyLevel.level,
    });
  };

  const calculateUrgency = (): number => {
    let score = 0;

    // Base score from symptoms and their weights
    const allSymptoms = symptomCategories.flatMap((cat) => cat.symptoms);
    selectedSymptoms.forEach((symptomId) => {
      const symptom = allSymptoms.find((s) => s.id === symptomId);
      if (symptom) {
        score += symptom.urgencyWeight * 10;
      }
    });

    // Severity multiplier
    const severityMultiplier = {
      mild: 1,
      moderate: 1.5,
      severe: 2.5,
      critical: 4,
    };
    score *=
      severityMultiplier[severity as keyof typeof severityMultiplier] || 1;

    // Duration factor
    const durationFactor = {
      minutes: 1.5, // Sudden onset can be serious
      hours: 1.2,
      days: 1,
      week: 1.1,
      weeks: 1.3,
      months: 1.5, // Chronic symptoms need attention
    };
    score *= durationFactor[duration as keyof typeof durationFactor] || 1;

    // Age factor
    const ageFactor = {
      child: 1.3, // Children need more attention
      teen: 1.1,
      adult: 1,
      senior: 1.4, // Seniors at higher risk
    };
    score *= ageFactor[age as keyof typeof ageFactor] || 1;

    // Multiple symptoms factor
    if (selectedSymptoms.length > 3) {
      score *= 1.2;
    }

    return Math.min(Math.round(score), 100);
  };

  const getUrgencyLevel = (score: number) => {
    if (score >= 80) {
      return {
        level: "Emergency",
        color: "#F44336",
        description:
          "Immediate medical attention required - consider emergency services",
      };
    }
    if (score >= 60) {
      return {
        level: "Urgent",
        color: "#FF5722",
        description:
          "Seek medical care today - contact healthcare provider immediately",
      };
    }
    if (score >= 40) {
      return {
        level: "Moderate",
        color: "#FF9800",
        description: "Schedule medical appointment within 24-48 hours",
      };
    }
    if (score >= 20) {
      return {
        level: "Low-Moderate",
        color: "#2196F3",
        description:
          "Monitor symptoms and consider medical consultation if worsening",
      };
    }
    return {
      level: "Low",
      color: "#4CAF50",
      description:
        "Self-care measures appropriate, seek care if symptoms persist",
    };
  };

  const getRecommendations = (score: number, level: string): string[] => {
    const baseRecommendations = {
      Emergency: [
        "🚨 SEEK IMMEDIATE EMERGENCY MEDICAL ATTENTION",
        "Call 911 or go to nearest emergency room",
        "Do not drive yourself - call ambulance or have someone drive you",
        "Do not delay medical care for any reason",
      ],
      Urgent: [
        "Contact your healthcare provider immediately",
        "If provider unavailable, consider urgent care or ER",
        "Monitor symptoms closely and seek emergency care if worsening",
        "Do not wait to see if symptoms improve on their own",
      ],
      Moderate: [
        "Schedule appointment with healthcare provider within 24-48 hours",
        "Monitor symptoms and note any changes",
        "Rest and avoid strenuous activities",
        "Seek immediate care if symptoms suddenly worsen",
      ],
      "Low-Moderate": [
        "Consider scheduling routine appointment with healthcare provider",
        "Monitor symptoms for 24-48 hours",
        "Practice self-care: rest, hydration, over-the-counter remedies as appropriate",
        "Seek medical care if symptoms persist or worsen",
      ],
      Low: [
        "Monitor symptoms for 24-48 hours",
        "Practice self-care: adequate rest, hydration, healthy nutrition",
        "Consider over-the-counter remedies as appropriate",
        "Contact healthcare provider if symptoms persist beyond a few days",
      ],
    };

    const specificRecommendations: string[] = [];

    // Add symptom-specific recommendations
    if (selectedSymptoms.includes("fever")) {
      specificRecommendations.push(
        "Stay hydrated and consider fever-reducing medication"
      );
    }
    if (
      selectedSymptoms.includes("chest_pain") ||
      selectedSymptoms.includes("shortness_breath")
    ) {
      specificRecommendations.push(
        "Avoid physical exertion and seek immediate medical evaluation"
      );
    }
    if (
      selectedSymptoms.includes("severe_headache") ||
      selectedSymptoms.includes("confusion")
    ) {
      specificRecommendations.push(
        "Avoid bright lights and loud noises, seek neurological evaluation"
      );
    }

    return [
      ...(baseRecommendations[level as keyof typeof baseRecommendations] || []),
      ...specificRecommendations,
    ].slice(0, 6);
  };

  const identifyRiskFactors = (): string[] => {
    const factors: string[] = [];
    // const allSymptoms = symptomCategories.flatMap((cat) => cat.symptoms);

    // High-risk symptom combinations
    if (
      selectedSymptoms.includes("chest_pain") &&
      selectedSymptoms.includes("shortness_breath")
    ) {
      factors.push("Potential cardiac emergency symptoms");
    }
    if (
      selectedSymptoms.includes("severe_headache") &&
      selectedSymptoms.includes("confusion")
    ) {
      factors.push("Neurological emergency warning signs");
    }
    if (
      selectedSymptoms.includes("abdominal_pain") &&
      selectedSymptoms.includes("vomiting")
    ) {
      factors.push("Acute abdominal condition indicators");
    }

    // Duration-based factors
    if (duration === "months") {
      factors.push("Chronic symptoms requiring evaluation");
    }
    if (duration === "minutes" && severity === "critical") {
      factors.push("Sudden onset severe symptoms");
    }

    // Age-based factors
    if (age === "senior" && selectedSymptoms.length > 2) {
      factors.push("Multiple symptoms in elderly patient");
    }
    if (age === "child" && severity === "severe") {
      factors.push("Severe symptoms in pediatric patient");
    }

    return factors;
  };

  const resetChecker = (): void => {
    setSelectedSymptoms([]);
    setSeverity("");
    setDuration("");
    setAge("");
    setResult(null);
  };

  const switchCategory = (categoryId: string): void => {
    setActiveCategory(categoryId);
  };

  const getSelectedSymptomsFromAllCategories = (): Symptom[] => {
    const allSymptoms = symptomCategories.flatMap((cat) => cat.symptoms);
    return selectedSymptoms
      .map((id) => allSymptoms.find((s) => s.id === id))
      .filter(Boolean) as Symptom[];
  };

  const isFormComplete = (): boolean => {
    return (
      selectedSymptoms.length > 0 &&
      severity !== "" &&
      duration !== "" &&
      age !== ""
    );
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          icon="🩺"
          title="Advanced Symptom Checker"
          text="Analyze your symptoms across multiple categories and receive appropriate care recommendations. Remember: this tool provides guidance only and should not replace professional medical advice."
        />

        <div className={homeStyle.sectionWrapper}>
          {/* Important Medical Warning */}
          <div className={styles.medicalWarning}>
            <div className={styles.warningHeader}>
              <span className={styles.warningIcon}>⚠️</span>
              <h3 className={styles.warningTitle}>IMPORTANT MEDICAL NOTICE</h3>
            </div>
            <div className={styles.warningContent}>
              <p>
                This symptom checker is for educational purposes only and should
                NOT replace professional medical advice, diagnosis, or
                treatment. Always consult qualified healthcare professionals for
                medical concerns.
              </p>
              <p>
                <strong>EMERGENCY:</strong> If experiencing severe chest pain,
                difficulty breathing, loss of consciousness, severe bleeding, or
                other life-threatening symptoms, call emergency services
                immediately.
              </p>
            </div>
          </div>

          {!result ? (
            <>
              {/* Symptom Category Navigation */}
              <div className={styles.navTabs}>
                {symptomCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`${styles.navTab} ${
                      activeCategory === category.id
                        ? styles.activeTab
                        : styles.inactiveTab
                    }`}
                    onClick={() => switchCategory(category.id)}
                  >
                    <span className={styles.testIcon}>{category.icon}</span>
                    {category.name}
                  </div>
                ))}
              </div>

              <div className={homeStyle.sectionWrapper}>
                <h2 className={homeStyle.normalTitle}>
                  {currentCategory.name}
                </h2>
                <p className={homeStyle.normalText}>
                  {currentCategory.description}
                </p>

                {/* Selected Symptoms Summary */}
                {selectedSymptoms.length > 0 && (
                  <div className={styles.selectedSymptomsCard}>
                    <h3 className={styles.selectedTitle}>
                      Selected Symptoms ({selectedSymptoms.length})
                    </h3>
                    <div className={styles.selectedSymptomsList}>
                      {getSelectedSymptomsFromAllCategories().map((symptom) => (
                        <span
                          key={symptom.id}
                          className={styles.selectedSymptomTag}
                        >
                          {symptom.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Symptom Selection */}
                <div className={styles.symptomSelectionContainer}>
                  <h3 className={styles.sectionSubtitle}>
                    {`Select symptoms you're experiencing:`}
                  </h3>
                  <div className={styles.symptomsGrid}>
                    {currentCategory.symptoms.map((symptom) => (
                      <div
                        key={symptom.id}
                        className={`${styles.symptomCard} ${
                          selectedSymptoms.includes(symptom.id)
                            ? styles.selectedSymptomCard
                            : ""
                        }`}
                        onClick={() => toggleSymptom(symptom.id)}
                      >
                        <div className={styles.symptomName}>{symptom.name}</div>
                        {symptom.description && (
                          <div className={styles.symptomDescription}>
                            {symptom.description}
                          </div>
                        )}
                        <div className={styles.urgencyIndicator}>
                          Urgency: {symptom.urgencyWeight}/5
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessment Questions */}
                <div className={styles.assessmentSection}>
                  {/* Age Group */}
                  <div className={styles.questionGroup}>
                    <h3 className={styles.questionTitle}>Age Group:</h3>
                    <div className={styles.optionsRow}>
                      {ageGroups.map((ageGroup) => (
                        <div
                          key={ageGroup.value}
                          className={`${styles.assessmentOption} ${
                            age === ageGroup.value
                              ? styles.selectedAssessmentOption
                              : ""
                          }`}
                          onClick={() => setAge(ageGroup.value)}
                        >
                          {ageGroup.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Severity Level */}
                  <div className={styles.questionGroup}>
                    <h3 className={styles.questionTitle}>Severity Level:</h3>
                    <div className={styles.severityGrid}>
                      {severityLevels.map((level) => (
                        <div
                          key={level.value}
                          className={`${styles.severityOption} ${
                            severity === level.value
                              ? styles.selectedSeverityOption
                              : ""
                          } ${styles[`severity-${level.value}`]}`}
                          onClick={() => setSeverity(level.value)}
                        >
                          <div className={styles.severityLabel}>
                            {level.label}
                          </div>
                          <div className={styles.severityDescription}>
                            {level.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className={styles.questionGroup}>
                    <h3 className={styles.questionTitle}>Duration:</h3>
                    <div className={styles.durationGrid}>
                      {durationOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`${styles.durationOption} ${
                            duration === option.value
                              ? styles.selectedDurationOption
                              : ""
                          }`}
                          onClick={() => setDuration(option.value)}
                        >
                          <div className={styles.durationLabel}>
                            {option.label}
                          </div>
                          <div className={styles.durationDescription}>
                            {option.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analyze Button */}
                <div className="text-center mt-8">
                  <ConvertButton
                    onClick={analyzeSymptoms}
                    disabled={!isFormComplete()}
                    label="Analyze Symptoms"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Results Section */
            <div className={homeStyle.sectionWrapper}>
              <h2 className={homeStyle.normalTitle}>
                Symptom Analysis Results
              </h2>

              {/* <div className={`${styles.resultCard} ${styles[`urgency-${result.urgencyLevel.level.toLowerCase()}`]}`}> */}
              <div className={styles.urgencyHeader}>
                <div className={styles.scoreDisplay}>
                  <span
                    className={styles.scoreValue}
                    style={{ color: result.urgencyLevel.color }}
                  >
                    {result.urgencyLevel.level}
                  </span>
                  <span className={styles.scoreLabel}>Urgency Level</span>
                </div>
                <div className={styles.urgencyDescription}>
                  <p>{result.urgencyLevel.description}</p>
                </div>
              </div>
              <section className={homeStyle.sectionWrapper}>
                <div className={styles.breakdown}>
                  <div>
                    <div className={styles.statValue}>
                      {result.symptomsCount}
                    </div>
                    <div className={styles.statLabel}>Symptoms</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{result.severity}</div>
                    <div className={styles.statLabel}>Severity</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>{result.duration}</div>
                    <div className={styles.statLabel}>Duration</div>
                  </div>
                  <div>
                    <div className={styles.statValue}>
                      {result.urgencyScore}
                    </div>
                    <div className={styles.statLabel}>Urgency Score</div>
                  </div>
                </div>
              </section>
              {/* Risk Factors */}
              {result.riskFactors.length > 0 && (
                <div className={styles.riskFactorsSection}>
                  <h3 className={homeStyle.normalTitle}>
                    Risk Factors Identified:
                  </h3>
                  <ul className={styles.riskFactorsList}>
                    {result.riskFactors.map((factor, index) => (
                      <li key={index} className={styles.riskFactorItem}>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              <section className={homeStyle.sectionWrapper}>
                <div className={styles.recommendation}>
                  <h3 className={homeStyle.normalTitle}>
                    Medical Recommendations:
                  </h3>
                  <ul className={styles.recommendationList}>
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className={styles.recommendationItem}>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              {/* </div> */}

              <div className={styles.actions}>
                {/* <ConvertButton 
                  onClick={() => window.print()} 
                  disabled={false} 
                  label="Print Results" 
                /> */}
                <ConvertButton
                  onClick={resetChecker}
                  disabled={false}
                  label="Check Other Symptoms"
                />
              </div>
            </div>
          )}

          {/* Final Medical Disclaimer */}
          <div className={styles.instructions}>
            <div className={styles.instructionTitle}>
              ⚠️ Final Medical Disclaimer:
            </div>
            <div className={styles.instructionText}>
              This symptom checker provides general guidance based on common
              medical knowledge and should never replace professional medical
              evaluation. Symptom checkers cannot account for individual medical
              history, current medications, allergies, or other personal factors
              that healthcare professionals consider. Always consult with
              qualified healthcare providers for accurate diagnosis and
              appropriate treatment. In case of medical emergency, contact
              emergency services immediately.
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

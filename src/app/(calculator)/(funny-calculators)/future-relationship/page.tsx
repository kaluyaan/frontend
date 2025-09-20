"use client";
import { JSX, useState } from "react";
import styles from "../../shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import ConvertButton from "@/components/ai-writer/ConvertButton";

// TypeScript interfaces
interface PersonalityTrait {
  trait: string;
  weight: number;
  description: string;
}

interface MeetingLocation {
  location: string;
  probability: number;
  context: string;
}

interface PredictionResult {
  partnerAge: number;
  mainTrait: string;
  traitDescription: string;
  meetingLocation: string;
  meetingContext: string;
  timeline: string;
  compatibility: number;
  relationshipType: string;
  specialMessage: string;
  children: number;
  marriageYear: string;
}

interface LifeGoal {
  goal: string;
  weight: number;
}

export default function FutureRelationship(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [lifeGoals, setLifeGoals] = useState<string[]>([]);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  const personalityTraits: PersonalityTrait[] = [
    {
      trait: "Funny",
      weight: 8,
      description: "Someone who makes you laugh every day",
    },
    {
      trait: "Kind",
      weight: 10,
      description: "A genuinely caring and compassionate soul",
    },
    {
      trait: "Adventurous",
      weight: 7,
      description: "Ready for spontaneous trips and new experiences",
    },
    {
      trait: "Intelligent",
      weight: 9,
      description: "Intellectually stimulating conversations await",
    },
    {
      trait: "Creative",
      weight: 6,
      description: "An artistic spirit who sees beauty everywhere",
    },
    {
      trait: "Loyal",
      weight: 10,
      description: "Your most trusted companion and best friend",
    },
    {
      trait: "Ambitious",
      weight: 8,
      description: "Driven to succeed and grow together",
    },
    {
      trait: "Empathetic",
      weight: 9,
      description: "Understands you on a deep emotional level",
    },
  ];

  const meetingLocations: MeetingLocation[] = [
    {
      location: "Coffee Shop",
      probability: 0.15,
      context: "accidentally ordering the same drink",
    },
    {
      location: "University Library",
      probability: 0.12,
      context: "reaching for the same book",
    },
    {
      location: "Gym/Fitness Class",
      probability: 0.08,
      context: "spotting each other during workouts",
    },
    {
      location: "Park/Outdoor Event",
      probability: 0.1,
      context: "walking your dogs that become friends",
    },
    {
      location: "Workplace/Internship",
      probability: 0.18,
      context: "collaborating on an exciting project",
    },
    {
      location: "Online Dating App",
      probability: 0.2,
      context: "swiping right on destiny",
    },
    {
      location: "Friend's Party",
      probability: 0.12,
      context: "being introduced by mutual friends",
    },
    {
      location: "Volunteer Event",
      probability: 0.05,
      context: "working together for a good cause",
    },
  ];

  const lifeGoalOptions: LifeGoal[] = [
    { goal: "Travel the World", weight: 5 },
    { goal: "Build a Career", weight: 7 },
    { goal: "Start a Family", weight: 9 },
    { goal: "Creative Pursuits", weight: 4 },
    { goal: "Help Others", weight: 6 },
    { goal: "Financial Success", weight: 6 },
  ];

  const timelines: string[] = [
    "8 months",
    "1.5 years",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
  ];
  const relationshipTypes: string[] = [
    "Soulmate Connection",
    "Best Friends to Lovers",
    "Passionate Romance",
    "Steady Partnership",
    "Adventure Buddies",
  ];

  const togglePreference = (trait: string): void => {
    setPreferences((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const toggleLifeGoal = (goal: string): void => {
    setLifeGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const calculateCompatibilityScore = (): number => {
    const baseScore: number = 70;
    const nameScore: number = (name.length % 10) + 5; // 5-15 points
    const ageScore: number = (parseInt(age) % 15) + 5; // 5-20 points
    const preferencesScore: number = Math.min(preferences.length * 3, 15); // Up to 15 points
    const goalsScore: number = Math.min(lifeGoals.length * 2, 10); // Up to 10 points

    return Math.min(
      baseScore + nameScore + ageScore + preferencesScore + goalsScore,
      99
    );
  };

  const getWeightedRandomSelection = <
    T extends { weight?: number; probability?: number }
  >(
    items: T[]
  ): T => {
    const weights = items.map((item) => item.weight || item.probability || 1);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) return items[i];
    }

    return items[items.length - 1];
  };

  const predictFuture = (): void => {
    if (!name.trim() || !age.trim()) {
      alert("Please enter your name and age!");
      return;
    }

    setIsPredicting(true);

    setTimeout(() => {
      const currentAge: number = parseInt(age);
      const selectedTrait = getWeightedRandomSelection(personalityTraits);
      const selectedLocation = getWeightedRandomSelection(meetingLocations);
      const randomTimeline: string =
        timelines[Math.floor(Math.random() * timelines.length)];
      const relationshipType: string =
        relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];

      // More sophisticated age calculation
      const ageVariation: number = Math.floor(Math.random() * 8) - 4; // -4 to +4 years
      const partnerAge: number = Math.max(18, currentAge + ageVariation);

      const compatibility: number = calculateCompatibilityScore();
      const children: number = Math.floor(Math.random() * 4); // 0-3 children
      const yearsUntilMarriage: number =
        parseInt(randomTimeline.split(" ")[0]) + Math.floor(Math.random() * 3);
      const marriageYear: string = (
        new Date().getFullYear() + yearsUntilMarriage
      ).toString();

      let specialMessage: string = "";
      if (compatibility >= 95) {
        specialMessage = "✨ A once-in-a-lifetime love story awaits you!";
      } else if (compatibility >= 85) {
        specialMessage = "💕 Your future holds a beautiful love story!";
      } else if (compatibility >= 75) {
        specialMessage = "😊 A wonderful partnership is in your future!";
      } else {
        specialMessage = "🌟 Love will find you when you least expect it!";
      }

      setResult({
        partnerAge,
        mainTrait: selectedTrait.trait,
        traitDescription: selectedTrait.description,
        meetingLocation: selectedLocation.location,
        meetingContext: selectedLocation.context,
        timeline: randomTimeline,
        compatibility,
        relationshipType,
        specialMessage,
        children,
        marriageYear,
      });

      setIsPredicting(false);
    }, 3000);
  };

  const resetPredictor = (): void => {
    setName("");
    setAge("");
    setPreferences([]);
    setLifeGoals([]);
    setResult(null);
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          // icon="👁️"
          title="🔮 Future Relationship Predictor 🔮"
          text="Discover your destined love story!"
        />

        <div className={homeStyle.sectionWrapper}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={homeStyle.normalTitle}>Your Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                className={styles.input}
                disabled={isPredicting}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={homeStyle.normalTitle}>Your Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAge(e.target.value)
                }
                className={styles.input}
                min="16"
                max="50"
                disabled={isPredicting}
              />
            </div>
          </div>
          <div className={styles.section}>
            <label className={homeStyle.normalTitle}>
              Desired personality traits:
            </label>
            <div className={styles.grid}>
              {personalityTraits.map(({ trait }) => (
                <label key={trait} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={preferences.includes(trait)}
                    onChange={() => togglePreference(trait)}
                    className={styles.checkbox}
                    disabled={isPredicting}
                  />
                  <span className={styles.checkboxText}>{trait}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <label className={homeStyle.normalTitle}>
              Life goals that matter to you:
            </label>
            <div className={styles.grid}>
              {lifeGoalOptions.map(({ goal }) => (
                <label key={goal} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={lifeGoals.includes(goal)}
                    onChange={() => toggleLifeGoal(goal)}
                    className={styles.checkbox}
                    disabled={isPredicting}
                  />
                  <span className={styles.checkboxText}>{goal}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <ConvertButton
              onClick={predictFuture}
              disabled={isPredicting}
              label={
                isPredicting
                  ? "Consulting the stars..."
                  : "Predict My Future! 🌟"
              }
            />
          </div>
        </div>
        {result && (
          <section className={styles.sectionWrapper}>
            <div className={styles.resultHeader}>
              <h3 className={styles.resultTitle}>Your Future Love Story</h3>
              <div className={styles.compatibilityBadge}>
                {result.compatibility}% Match
              </div>
            </div>

            <div className={styles.predictionGrid}>
              <div className={styles.predictionItem}>
                <span className={styles.predictionLabel}>Partner Age:</span>
                <span className={styles.predictionValue}>
                  {result.partnerAge} years old
                </span>
              </div>

              <div className={styles.predictionItem}>
                <span className={styles.predictionLabel}>Main Trait:</span>
                <span className={styles.predictionValue}>
                  {result.mainTrait}
                </span>
              </div>

              <div className={styles.predictionItem}>
                <span className={styles.predictionLabel}>You'll Meet:</span>
                <span className={styles.predictionValue}>
                  At {result.meetingLocation}
                </span>
              </div>

              <div className={styles.predictionItem}>
                <span className={styles.predictionLabel}>How You'll Meet:</span>
                <span className={styles.predictionValue}>
                  {result.meetingContext}
                </span>
              </div>

              <div className={styles.predictionItem}>
                <span className={styles.predictionLabel}>Timeline:</span>
                <span className={styles.predictionValue}>
                  In {result.timeline}
                </span>
              </div>

              <div className={styles.predictionItem}>
                <span className={styles.predictionLabel}>
                  Relationship Type:
                </span>
                <span className={styles.predictionValue}>
                  {result.relationshipType}
                </span>
              </div>

              <div className={styles.predictionItem}>
                <span className={styles.predictionLabel}>Marriage Year:</span>
                <span className={styles.predictionValue}>
                  {result.marriageYear}
                </span>
              </div>

              <div className={styles.predictionItem}>
                <span className={styles.predictionLabel}>Future Children:</span>
                <span className={styles.predictionValue}>
                  {result.children === 0
                    ? "Focus on each other"
                    : `${result.children} little ones`}
                </span>
              </div>
            </div>

            <div className={styles.description}>
              <p className={styles.traitDescription}>
                {result.traitDescription}
              </p>
            </div>

            <div className={styles.specialMessage}>{result.specialMessage}</div>
          </section>
        )}
      </main>
    </div>
  );
}

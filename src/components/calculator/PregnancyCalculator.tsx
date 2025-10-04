"use client";

import React, { useState } from "react";
import moment, { Moment } from "moment";
import styles from "./shared.module.css";
import homeStyle from "@/components/Home/home.module.css";
import HeroSection from "@/components/shared/HeroSection";
import DatePickerField from "../shared/DatePicker/DatePicker";
import ConvertButton from "@/components/ai-writer/ConvertButton";
import CustomSelectField from "@/components/shared/CustomSelectBox/CustomSelectBox";

interface Milestone {
  week: number;
  event: string;
}

interface WeeklyInfo {
  baby: string;
  mother: string;
  advice: string;
}

interface PregnancyResult {
  conceptionDate: string;
  dueDate: string;
  dueDateDay: string;
  weeksPregnant: number;
  daysIntoWeek: number;
  totalDaysPregnant: number;
  daysUntilDue: number;
  currentTrimester: string;
  isOverdue: boolean;
  percentComplete: string;
  weeklyInfo: WeeklyInfo;
  nutritionAdvice: string[];
  exerciseAdvice: string[];
  medicalAdvice: string[];
  warningSignsToWatch: string[];
}

function PregnancyCalculator() {
  const [lastPeriod, setLastPeriod] = useState<Moment | null>(null);
  const [calculationType, setCalculationType] = useState("lmp");
  const [conceptionDate, setConceptionDate] = useState<Moment | null>(null);
  const [result, setResult] = useState<PregnancyResult | null>(null);
  const [error, setError] = useState("");

  const getWeeklyInfo = (week: number): WeeklyInfo => {
    const weeklyData: Record<number, WeeklyInfo> = {
      4: {
        baby: "Your baby is the size of a poppy seed (2mm). The embryo is forming and implanting in the uterus.",
        mother: "You may experience early pregnancy symptoms like fatigue, breast tenderness, and mild cramping.",
        advice: "Start taking prenatal vitamins with folic acid. Avoid alcohol and smoking."
      },
      8: {
        baby: "Baby is the size of a raspberry (1.6cm). Major organs are developing, and tiny limbs are forming.",
        mother: "Morning sickness may peak. Frequent urination is common due to hormonal changes.",
        advice: "Eat small, frequent meals. Stay hydrated. Get plenty of rest."
      },
      12: {
        baby: "Baby is the size of a plum (5.4cm). Reflexes are developing, and the baby can make movements.",
        mother: "End of first trimester. Morning sickness typically begins to ease. Energy may improve.",
        advice: "Schedule your first ultrasound. Continue prenatal vitamins. Maintain a balanced diet."
      },
      16: {
        baby: "Baby is the size of an avocado (11.6cm). Baby can hear sounds and the skeleton is hardening.",
        mother: "You may start showing. Backaches and round ligament pain may begin.",
        advice: "Start pelvic floor exercises. Wear comfortable, supportive shoes."
      },
      20: {
        baby: "Baby is the size of a banana (25.6cm). Baby can hear your voice and is very active.",
        mother: "You may feel quickening (baby's movements). Anatomy scan scheduled around this time.",
        advice: "Talk and sing to your baby. Stay active with prenatal yoga or swimming."
      },
      24: {
        baby: "Baby is the size of a corn (30cm). Baby's lungs are developing rapidly. Viability milestone reached.",
        mother: "You may experience leg cramps and swelling. Glucose screening test may be scheduled.",
        advice: "Sleep on your side. Elevate legs when resting. Stay hydrated."
      },
      28: {
        baby: "Baby is the size of an eggplant (37.6cm). Baby can open and close eyes. Brain is very active.",
        mother: "Third trimester begins. You may feel more tired. Braxton Hicks contractions may start.",
        advice: "Monitor baby's movements. Consider childbirth classes. Plan for maternity leave."
      },
      32: {
        baby: "Baby is the size of a squash (42.4cm). Baby is gaining weight rapidly. Practices breathing.",
        mother: "Shortness of breath is common as baby grows. You may feel more uncomfortable.",
        advice: "Practice breathing techniques. Prepare hospital bag. Stay active but listen to your body."
      },
      36: {
        baby: "Baby is the size of romaine lettuce (47.4cm). Baby is getting into birth position. Fully developed.",
        mother: "Weekly checkups begin. You may feel pressure in pelvis. Nesting instinct may kick in.",
        advice: "Finalize birth plan. Install car seat. Stock up on baby essentials."
      },
      40: {
        baby: "Baby is full term (51cm average). Ready for birth! Average weight is 7-8 pounds.",
        mother: "Due date has arrived. Watch for signs of labor: contractions, water breaking, bloody show.",
        advice: "Stay calm. Time contractions. Contact your healthcare provider when contractions are regular."
      }
    };

    const closest = Object.keys(weeklyData).reduce((prev, curr) => {
      return Math.abs(Number(curr) - week) < Math.abs(Number(prev) - week) ? curr : prev;
    });

    return weeklyData[Number(closest)] || weeklyData[40];
  };

  const getNutritionAdvice = (trimester: string): string[] => {
    const nutrition: Record<string, string[]> = {
      first: [
        "Folic acid: 400-800 mcg daily (leafy greens, fortified cereals)",
        "Ginger tea for nausea relief",
        "Small, frequent meals to manage morning sickness",
        "Plenty of water (8-10 glasses daily)",
        "Avoid raw fish, deli meats, unpasteurized dairy"
      ],
      second: [
        "Iron-rich foods (lean meat, beans, spinach) - 27mg daily",
        "Calcium: 1000mg daily (dairy, fortified plant milk)",
        "Omega-3 fatty acids (salmon, walnuts, flaxseed)",
        "Fiber-rich foods to prevent constipation",
        "Protein: 75-100g daily for baby's growth"
      ],
      third: [
        "Increased protein for rapid baby growth",
        "Vitamin C for iron absorption (citrus, berries)",
        "Small meals to manage heartburn",
        "Foods rich in vitamin K (broccoli, kale) for blood clotting",
        "Stay hydrated to manage swelling"
      ]
    };
    return nutrition[trimester] || nutrition.first;
  };

  const getExerciseAdvice = (trimester: string): string[] => {
    const exercise: Record<string, string[]> = {
      first: [
        "Walking: 30 minutes daily at moderate pace",
        "Prenatal yoga for flexibility and stress relief",
        "Swimming (excellent low-impact exercise)",
        "Avoid contact sports and high-risk activities",
        "Listen to your body - rest when needed"
      ],
      second: [
        "Continue walking and swimming",
        "Prenatal strength training with light weights",
        "Pelvic floor exercises (Kegels) daily",
        "Modified yoga poses (avoid lying on back)",
        "Stay cool and hydrated during exercise"
      ],
      third: [
        "Gentle walking and stretching",
        "Pelvic tilts for back pain relief",
        "Squatting exercises to prepare for labor",
        "Prenatal water aerobics",
        "Avoid exercises lying flat on back after 20 weeks"
      ]
    };
    return exercise[trimester] || exercise.first;
  };

  const getMedicalAdvice = (week: number): string[] => {
    const medical: string[] = [];
    
    if (week >= 6 && week < 8) {
      medical.push("Schedule first prenatal appointment");
      medical.push("Confirm pregnancy with healthcare provider");
    }
    if (week >= 10 && week < 14) {
      medical.push("First trimester screening available (NT scan)");
      medical.push("NIPT (Non-invasive prenatal testing) can be done");
    }
    if (week >= 18 && week < 22) {
      medical.push("Anatomy scan (detailed ultrasound)");
      medical.push("Check for fetal anomalies and development");
    }
    if (week >= 24 && week < 28) {
      medical.push("Glucose screening test for gestational diabetes");
    }
    if (week >= 28 && week < 30) {
      medical.push("Rhogam shot if you're Rh-negative");
      medical.push("Start monitoring baby's movements daily");
    }
    if (week >= 35 && week < 37) {
      medical.push("Group B Strep test");
      medical.push("Discuss birth plan with provider");
    }
    if (week >= 36) {
      medical.push("Weekly prenatal visits");
      medical.push("Cervical checks may begin");
    }
    
    return medical.length > 0 ? medical : ["Continue regular prenatal care and follow your healthcare provider's schedule"];
  };

  const getWarningSignsToWatch = (trimester: string): string[] => {
    const warnings: Record<string, string[]> = {
      first: [
        "Severe abdominal pain or cramping",
        "Heavy bleeding with clots",
        "Severe, persistent vomiting (hyperemesis)",
        "Fever above 100.4°F (38°C)",
        "Painful urination or signs of infection"
      ],
      second: [
        "No fetal movement for 12+ hours",
        "Signs of preterm labor (contractions before 37 weeks)",
        "Sudden swelling of face, hands, or feet",
        "Severe headaches with vision changes",
        "Vaginal bleeding or fluid leakage"
      ],
      third: [
        "Decreased fetal movement",
        "Regular contractions before 37 weeks",
        "Water breaking (clear or greenish fluid)",
        "Severe abdominal pain",
        "Vision changes, severe headache, upper right pain (preeclampsia signs)"
      ]
    };
    return warnings[trimester] || warnings.first;
  };

  const calculatePregnancy = () => {
    let conception: Moment, dueDate: Moment;

    if (calculationType === "lmp") {
      if (!lastPeriod) {
        setError("Please enter your last menstrual period date");
        return;
      }
      const lmp = moment(lastPeriod);
      if (!lmp.isValid()) {
        setError("Please enter a valid date");
        return;
      }

      conception = lmp.clone().add(14, "days");
      dueDate = lmp.clone().add(280, "days");
    } else {
      if (!conceptionDate) {
        setError("Please enter the conception date");
        return;
      }
      conception = moment(conceptionDate);
      if (!conception.isValid()) {
        setError("Please enter a valid conception date");
        return;
      }

      dueDate = conception.clone().add(266, "days");
    }

    const today = moment();
    const totalDaysPregnant = today.diff(conception, "days");
    const daysUntilDue = dueDate.diff(today, "days");

    // Check if pregnancy has already ended (due date passed by more than 2 weeks or 42 weeks gestation)
    if (totalDaysPregnant > 294 || daysUntilDue < -14) {
      setError(
        "This pregnancy has already ended. The due date was " + 
        dueDate.format("MMMM Do, YYYY") + ". " +
        "This calculator is designed for current pregnancies only. " +
        "If you need information about postpartum care or your baby's development, " +
        "please consult your healthcare provider."
      );
      setResult(null);
      return;
    }

    // Check if conception date is in the future
    if (totalDaysPregnant < 0) {
      setError("The date you entered is in the future. Please enter a valid past date.");
      setResult(null);
      return;
    }

    const weeksPregnant = Math.floor(totalDaysPregnant / 7);
    const daysIntoWeek = totalDaysPregnant % 7;

    let currentTrimester = "first";
    let trimesterName = "First Trimester";
    if (weeksPregnant > 13 && weeksPregnant <= 27) {
      currentTrimester = "second";
      trimesterName = "Second Trimester";
    } else if (weeksPregnant > 27) {
      currentTrimester = "third";
      trimesterName = "Third Trimester";
    }

    const percentComplete = Math.min(100, Math.max(0, (totalDaysPregnant / 280) * 100)).toFixed(1);
    const isOverdue = daysUntilDue < 0;

    const weeklyInfo = getWeeklyInfo(weeksPregnant);
    const nutritionAdvice = getNutritionAdvice(currentTrimester);
    const exerciseAdvice = getExerciseAdvice(currentTrimester);
    const medicalAdvice = getMedicalAdvice(weeksPregnant);
    const warningSignsToWatch = getWarningSignsToWatch(currentTrimester);

    setResult({
      conceptionDate: conception.format("MMMM Do, YYYY"),
      dueDate: dueDate.format("MMMM Do, YYYY"),
      dueDateDay: dueDate.format("dddd"),
      weeksPregnant: Math.max(0, weeksPregnant),
      daysIntoWeek,
      totalDaysPregnant: Math.max(0, totalDaysPregnant),
      daysUntilDue: Math.abs(daysUntilDue),
      currentTrimester: trimesterName,
      isOverdue,
      percentComplete,
      weeklyInfo,
      nutritionAdvice,
      exerciseAdvice,
      medicalAdvice,
      warningSignsToWatch
    });
    setError("");
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <HeroSection
          title="Advanced Pregnancy Calculator"
          text="Comprehensive pregnancy tracking with medical guidance, nutrition advice & personalized recommendations."
        />

        <section className={homeStyle.sectionWrapper}>
          <div className={styles.inputGroup}>
            <CustomSelectField
              label="Calculation Method:"
              options={[
                { label: "Last Menstrual Period (LMP)", value: "lmp" },
                { label: "Conception Date", value: "conception" },
              ]}
              value={calculationType}
              onChange={setCalculationType}
            />
          </div>

          {calculationType === "lmp" ? (
            <div className={styles.inputGroup}>
              <DatePickerField
                label="Last Menstrual Period Date:"
                selectedDate={lastPeriod}
                onChange={setLastPeriod}
                required
                maxDate={moment()}
                error={error}
              />
            </div>
          ) : (
            <div className={styles.inputGroup}>
              <DatePickerField
                label="Conception Date:"
                selectedDate={conceptionDate}
                onChange={setConceptionDate}
                required
                maxDate={moment()}
                error={error}
              />
            </div>
          )}
        </section>

        <ConvertButton
          onClick={calculatePregnancy}
          disabled={false}
          label="Calculate Due Date & Get Details"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        {result && (
          <>
            {/* Due Date Card */}
            <div className={styles.resultCard}>
              <div className={styles.resultTitle}>Your Due Date</div>
              <div className={styles.resultValue}>{result.dueDate}</div>
              <div className={styles.resultDetails}>
                <div>Due Day: {result.dueDateDay}</div>
                <div>Conception: {result.conceptionDate}</div>
                <div>
                  {result.isOverdue ? "Overdue by" : "Days until due"}:{" "}
                  {result.daysUntilDue}
                </div>
              </div>
            </div>

            {/* Current Progress */}
            <div className={styles.countdownCard}>
              <div className={styles.resultTitle}>Current Progress</div>
              <div className={styles.countdownNumber}>
                {result.weeksPregnant} weeks {result.daysIntoWeek} days
              </div>
              <div style={{ fontSize: "1.2rem", marginTop: "10px" }}>
                {result.currentTrimester}
              </div>
              <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                {result.percentComplete}% Complete
              </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.timeUnits}>
              <div className={styles.timeUnit}>
                <span className={styles.unitValue}>{result.weeksPregnant}</span>
                <span className={styles.unitLabel}>Weeks Pregnant</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.unitValue}>
                  {result.totalDaysPregnant}
                </span>
                <span className={styles.unitLabel}>Days Pregnant</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.unitValue}>{result.daysUntilDue}</span>
                <span className={styles.unitLabel}>Days Until Due</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.unitValue}>
                  {result.percentComplete}%
                </span>
                <span className={styles.unitLabel}>Complete</span>
              </div>
            </div>

            {/* Baby & Mother Development */}
            <section className={homeStyle.sectionWrapper}>
              <h3 className={homeStyle.normalTitle}>
                👶 Week {result.weeksPregnant} Development
              </h3>

              <div style={{ marginBottom: "20px" }}>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    color: "#333",
                    marginBottom: "8px",
                    fontWeight: "600",
                  }}
                >
                  Your Baby:
                </h4>
                <p className={homeStyle.normalText}>{result.weeklyInfo.baby}</p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    color: "#333",
                    marginBottom: "8px",
                    fontWeight: "600",
                  }}
                >
                  Your Body:
                </h4>
                <p className={homeStyle.normalText}>
                  {result.weeklyInfo.mother}
                </p>
              </div>

              <div
                style={{
                  background: "#f0f4ff",
                  padding: "15px",
                  borderRadius: "10px",
                  borderLeft: "4px solid #667eea",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.1rem",
                    color: "#333",
                    marginBottom: "8px",
                    fontWeight: "600",
                  }}
                >
                  💡 Key Advice:
                </h4>
                <p className={homeStyle.normalText}>
                  {result.weeklyInfo.advice}
                </p>
              </div>
            </section>

            {/* Nutrition Advice */}
            <section className={homeStyle.sectionWrapper}>
              <h3 className={homeStyle.normalTitle}>
                🥗 Nutrition Recommendations
              </h3>
              <div className={styles.infoText}>
                {result.nutritionAdvice.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid #f0f0f0",
                      lineHeight: "1.6",
                    }}
                  >
                    <span
                      style={{
                        color: "#667eea",
                        marginRight: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Exercise Advice */}
            <section className={homeStyle.sectionWrapper}>
              <h3 className={homeStyle.normalTitle}>🏃‍♀️ Exercise Guidelines</h3>
              <div className={styles.infoText}>
                {result.exerciseAdvice.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid #f0f0f0",
                      lineHeight: "1.6",
                    }}
                  >
                    <span
                      style={{
                        color: "#667eea",
                        marginRight: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Medical Appointments */}
            <section className={homeStyle.sectionWrapper}>
              <h3 className={homeStyle.normalTitle}>
                🏥 Medical Appointments & Tests
              </h3>
              <div className={styles.infoText}>
                {result.medicalAdvice.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 0",
                      borderBottom: "1px solid #f0f0f0",
                      lineHeight: "1.6",
                    }}
                  >
                    <span
                      style={{
                        color: "#667eea",
                        marginRight: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      📋
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Warning Signs */}
            <section
              style={{
                background: "#fff3cd",
                borderRadius: "20px",
                padding: "30px",
                margin: "20px 0",
                border: "2px solid #ffc107",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "#856404",
                  marginBottom: "15px",
                  fontWeight: "bold",
                }}
              >
                ⚠️ Warning Signs to Watch For
              </h3>
              <p
                style={{
                  color: "#856404",
                  marginBottom: "15px",
                  fontWeight: "600",
                }}
              >
                Contact your healthcare provider immediately if you experience:
              </p>
              <div>
                {result.warningSignsToWatch.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px solid #ffe69c",
                      color: "#856404",
                      lineHeight: "1.6",
                    }}
                  >
                    <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                      ⚠️
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Disclaimer */}
            <section className={homeStyle.sectionWrapper}>
              <h3 className={homeStyle.normalTitle}>
                ⚕️ Important Medical Disclaimer
              </h3>
              <p className={homeStyle.normalText}>
                This calculator provides estimates and general information based
                on standard pregnancy calculations. Every pregnancy is unique,
                and this tool should not replace professional medical advice.
                Always consult with your healthcare provider for accurate
                medical information, personalized care, and guidance specific to
                your pregnancy. If you have any concerns or questions about your
                pregnancy, please contact your doctor or midwife immediately.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default PregnancyCalculator;
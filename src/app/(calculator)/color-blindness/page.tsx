"use client";

import React, { useState, useEffect, useMemo, JSX } from "react";
import Link from "next/link";
import styles from "../shared.module.css";

// TypeScript interfaces
interface TestResult {
  correct: boolean;
  answer: string | null;
  expected: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  deficiencyType: "red-green" | "blue-yellow";
  questionType:
    | "number-recognition"
    | "path-tracing"
    | "shape-detection"
    | "color-matching"
    | "vanishing-design";
  timeSpent: number;
}

interface ColorTest {
  id: number;
  questionType:
    | "number-recognition"
    | "path-tracing"
    | "shape-detection"
    | "color-matching"
    | "vanishing-design";
  hiddenContent: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColors?: string[];
  difficulty: "easy" | "medium" | "hard" | "expert";
  deficiencyType: "red-green" | "blue-yellow";
  instruction: string;
}

interface Diagnosis {
  type: string;
  description: string;
  severity: "Normal" | "Mild" | "Moderate" | "Severe";
  recommendations: string[];
}

function ColorBlindnessTest() {
  const [currentTest, setCurrentTest] = useState<number>(0);
  const [results, setResults] = useState<TestResult[]>([]);
  const [testComplete, setTestComplete] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(15);
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);

  // Comprehensive test bank with 100+ questions
  const colorTestBank: ColorTest[] = [
    // NUMBER RECOGNITION TESTS (40 questions)
    ...Array.from({ length: 40 }, (_, i) => {
      const numbers = [
        "3",
        "5",
        "6",
        "8",
        "9",
        "12",
        "15",
        "16",
        "17",
        "21",
        "25",
        "26",
        "29",
        "35",
        "42",
        "45",
        "56",
        "57",
        "74",
        "83",
      ];
      const redGreenColors = [
        ["#228B22", "#FF6347"],
        ["#32CD32", "#DC143C"],
        ["#FF4500", "#9ACD32"],
        ["#8B4513", "#228B22"],
        ["#B22222", "#6B8E23"],
        ["#CD5C5C", "#90EE90"],
        ["#A0522D", "#00FF00"],
        ["#8B0000", "#32CD32"],
        ["#FF0000", "#008000"],
        ["#DC143C", "#ADFF2F"],
        ["#B22222", "#98FB98"],
        ["#8B4513", "#7CFC00"],
      ];
      const blueYellowColors = [
        ["#FF69B4", "#00CED1"],
        ["#DAA520", "#4169E1"],
        ["#FF1493", "#00BFFF"],
        ["#FFD700", "#1E90FF"],
        ["#FFA500", "#0000FF"],
        ["#FFFF00", "#4169E1"],
        ["#F0E68C", "#6495ED"],
        ["#BDB76B", "#87CEEB"],
        ["#FFFFE0", "#87CEFA"],
      ];

      const isRedGreen = i % 3 !== 2; // 2/3 red-green, 1/3 blue-yellow
      const colorPair = isRedGreen
        ? redGreenColors[i % redGreenColors.length]
        : blueYellowColors[i % blueYellowColors.length];

      return {
        id: i + 1,
        questionType: "number-recognition" as const,
        hiddenContent: numbers[i % numbers.length],
        primaryColor: colorPair[0],
        secondaryColor: colorPair[1],
        difficulty:
          i < 10
            ? ("easy" as const)
            : i < 25
            ? ("medium" as const)
            : i < 35
            ? ("hard" as const)
            : ("expert" as const),
        deficiencyType: isRedGreen
          ? ("red-green" as const)
          : ("blue-yellow" as const),
        instruction: "What number do you see in the colored dots?",
      };
    }),

    // PATH TRACING TESTS (25 questions)
    ...Array.from({ length: 25 }, (_, i) => {
      const paths = [
        "curved-line",
        "zigzag-path",
        "circular-path",
        "wavy-line",
        "straight-line",
      ];
      const redGreenColors = [
        ["#228B22", "#FF6347"],
        ["#32CD32", "#DC143C"],
        ["#FF4500", "#9ACD32"],
        ["#8B4513", "#228B22"],
        ["#B22222", "#6B8E23"],
      ];
      const blueYellowColors = [
        ["#FF69B4", "#00CED1"],
        ["#DAA520", "#4169E1"],
        ["#FF1493", "#00BFFF"],
        ["#FFD700", "#1E90FF"],
        ["#FFA500", "#0000FF"],
      ];

      const isRedGreen = i % 2 === 0;
      const colorPair = isRedGreen
        ? redGreenColors[i % redGreenColors.length]
        : blueYellowColors[i % blueYellowColors.length];

      return {
        id: i + 41,
        questionType: "path-tracing" as const,
        hiddenContent: paths[i % paths.length],
        primaryColor: colorPair[0],
        secondaryColor: colorPair[1],
        difficulty:
          i < 8
            ? ("easy" as const)
            : i < 18
            ? ("medium" as const)
            : ("hard" as const),
        deficiencyType: isRedGreen
          ? ("red-green" as const)
          : ("blue-yellow" as const),
        instruction: "Can you trace the colored path from left to right?",
      };
    }),

    // SHAPE DETECTION TESTS (20 questions)
    ...Array.from({ length: 20 }, (_, i) => {
      const shapes = [
        "circle",
        "square",
        "triangle",
        "diamond",
        "star",
        "heart",
        "cross",
        "hexagon",
      ];
      const redGreenColors = [
        ["#228B22", "#FF6347"],
        ["#32CD32", "#DC143C"],
        ["#FF4500", "#9ACD32"],
        ["#8B4513", "#228B22"],
      ];
      const blueYellowColors = [
        ["#FF69B4", "#00CED1"],
        ["#DAA520", "#4169E1"],
        ["#FF1493", "#00BFFF"],
        ["#FFD700", "#1E90FF"],
      ];

      const isRedGreen = i % 3 !== 1;
      const colorPair = isRedGreen
        ? redGreenColors[i % redGreenColors.length]
        : blueYellowColors[i % blueYellowColors.length];

      return {
        id: i + 66,
        questionType: "shape-detection" as const,
        hiddenContent: shapes[i % shapes.length],
        primaryColor: colorPair[0],
        secondaryColor: colorPair[1],
        difficulty:
          i < 6
            ? ("easy" as const)
            : i < 14
            ? ("medium" as const)
            : ("hard" as const),
        deficiencyType: isRedGreen
          ? ("red-green" as const)
          : ("blue-yellow" as const),
        instruction: "What shape is hidden in the pattern?",
      };
    }),

    // COLOR MATCHING TESTS (15 questions)
    ...Array.from({ length: 15 }, (_, i) => {
      const matchTypes = ["identical", "similar", "different"];
      const redGreenColors = [
        ["#FF0000", "#00FF00"],
        ["#DC143C", "#32CD32"],
        ["#B22222", "#228B22"],
      ];
      const blueYellowColors = [
        ["#0000FF", "#FFFF00"],
        ["#4169E1", "#FFD700"],
        ["#1E90FF", "#FFA500"],
      ];

      const isRedGreen = i % 2 === 0;
      const colorPair = isRedGreen
        ? redGreenColors[i % redGreenColors.length]
        : blueYellowColors[i % blueYellowColors.length];

      return {
        id: i + 86,
        questionType: "color-matching" as const,
        hiddenContent: matchTypes[i % matchTypes.length],
        primaryColor: colorPair[0],
        secondaryColor: colorPair[1],
        difficulty:
          i < 5
            ? ("easy" as const)
            : i < 10
            ? ("medium" as const)
            : ("hard" as const),
        deficiencyType: isRedGreen
          ? ("red-green" as const)
          : ("blue-yellow" as const),
        instruction: "Do these colors appear the same or different?",
      };
    }),

    // VANISHING DESIGN TESTS (10 questions)
    ...Array.from({ length: 10 }, (_, i) => {
      const designs = ["dots-fade", "lines-disappear", "pattern-vanish"];
      const redGreenColors = [
        ["#228B22", "#FF6347"],
        ["#32CD32", "#DC143C"],
        ["#FF4500", "#9ACD32"],
      ];
      const blueYellowColors = [
        ["#FF69B4", "#00CED1"],
        ["#DAA520", "#4169E1"],
      ];

      const isRedGreen = i % 3 !== 2;
      const colorPair = isRedGreen
        ? redGreenColors[i % redGreenColors.length]
        : blueYellowColors[i % blueYellowColors.length];

      return {
        id: i + 101,
        questionType: "vanishing-design" as const,
        hiddenContent: designs[i % designs.length],
        primaryColor: colorPair[0],
        secondaryColor: colorPair[1],
        difficulty: i < 3 ? ("medium" as const) : ("hard" as const),
        deficiencyType: isRedGreen
          ? ("red-green" as const)
          : ("blue-yellow" as const),
        instruction: "Does the pattern appear to fade or remain visible?",
      };
    }),
  ];

  // Generate balanced test sequence with minimum 2 question types
  const testSequence = useMemo(() => {
    const questionTypes = [
      "number-recognition",
      "path-tracing",
      "shape-detection",
      "color-matching",
      "vanishing-design",
    ];
    const selectedTypes = questionTypes
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.max(2, Math.floor(Math.random() * 3) + 2));

    const balancedTests: ColorTest[] = [];

    // Ensure at least 1 question from each selected type
    selectedTypes.forEach((type) => {
      const typeQuestions = colorTestBank.filter(
        (q) => q.questionType === type
      );
      if (typeQuestions.length > 0) {
        const randomQuestion =
          typeQuestions[Math.floor(Math.random() * typeQuestions.length)];
        balancedTests.push(randomQuestion);
      }
    });

    // Fill remaining slots randomly, ensuring variety
    while (balancedTests.length < 6) {
      const randomTest =
        colorTestBank[Math.floor(Math.random() * colorTestBank.length)];
      if (!balancedTests.some((t) => t.id === randomTest.id)) {
        balancedTests.push(randomTest);
      }
    }

    return balancedTests.sort(() => Math.random() - 0.5);
  }, []);

  // Generate options based on question type
  const getCurrentTestOptions = (): string[] => {
    const currentTestData = testSequence[currentTest];
    if (!currentTestData) return [];

    switch (currentTestData.questionType) {
      case "number-recognition":
        const correctAnswer = currentTestData.hiddenContent;
        const wrongNumbers = [
          "3",
          "5",
          "6",
          "8",
          "9",
          "12",
          "15",
          "16",
          "17",
          "21",
          "25",
          "29",
          "35",
          "42",
          "45",
          "56",
          "74",
          "83",
        ]
          .filter((num) => num !== correctAnswer)
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);
        const options = [correctAnswer, ...wrongNumbers];
        if (Math.random() > 0.7) options.push("Nothing");
        return options.sort(() => Math.random() - 0.5);

      case "path-tracing":
        return ["Yes, clear path", "Faint path", "No path visible"].sort(
          () => Math.random() - 0.5
        );

      case "shape-detection":
        const correctShape = currentTestData.hiddenContent;
        const wrongShapes = [
          "circle",
          "square",
          "triangle",
          "diamond",
          "star",
          "heart",
          "cross",
        ]
          .filter((shape) => shape !== correctShape)
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);
        return [correctShape, ...wrongShapes, "No shape"].sort(
          () => Math.random() - 0.5
        );

      case "color-matching":
        return ["Same color", "Different colors", "Cannot tell"].sort(
          () => Math.random() - 0.5
        );

      case "vanishing-design":
        return [
          "Fully visible",
          "Partially visible",
          "Not visible",
          "Fading",
        ].sort(() => Math.random() - 0.5);

      default:
        return [];
    }
  };

  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  useEffect(() => {
    if (testSequence[currentTest]) {
      setCurrentOptions(getCurrentTestOptions());
      setTimeRemaining(15);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuestionStartTime(Date.now());
    }
  }, [currentTest, testSequence]);

  // Timer effect
  useEffect(() => {
    if (!testStarted || testComplete || showResult) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testComplete, showResult, currentTest]);

  const handleAnswer = (selectedOption: string | null): void => {
    if (showResult) return;

    const currentTestData = testSequence[currentTest];
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

    let isCorrect = false;
    switch (currentTestData.questionType) {
      case "number-recognition":
      case "shape-detection":
        isCorrect = selectedOption === currentTestData.hiddenContent;
        break;
      case "path-tracing":
        isCorrect =
          selectedOption === "Yes, clear path" ||
          selectedOption === "Faint path";
        break;
      case "color-matching":
        isCorrect = selectedOption === "Different colors";
        break;
      case "vanishing-design":
        isCorrect =
          selectedOption === "Partially visible" || selectedOption === "Fading";
        break;
    }

    const newResults: TestResult[] = [
      ...results,
      {
        correct: isCorrect,
        answer: selectedOption,
        expected: currentTestData.hiddenContent,
        difficulty: currentTestData.difficulty,
        deficiencyType: currentTestData.deficiencyType,
        questionType: currentTestData.questionType,
        timeSpent: timeSpent,
      },
    ];

    setResults(newResults);
    setSelectedAnswer(selectedOption);
    setShowResult(true);

    setTimeout(() => {
      if (currentTest < testSequence.length - 1) {
        setCurrentTest(currentTest + 1);
      } else {
        setTestComplete(true);
      }
    }, 2000);
  };

  const resetTest = (): void => {
    setCurrentTest(0);
    setResults([]);
    setTestComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeRemaining(15);
    setTestStarted(false);
  };

  const startTest = (): void => {
    setTestStarted(true);
    setQuestionStartTime(Date.now());
  };

  const getScore = (): number => {
    const correct = results.filter((r) => r.correct).length;
    return Math.round((correct / results.length) * 100);
  };

  const getDiagnosis = (): Diagnosis => {
    const score = getScore();
    const redGreenErrors = results.filter(
      (r) => !r.correct && r.deficiencyType === "red-green"
    ).length;
    const blueYellowErrors = results.filter(
      (r) => !r.correct && r.deficiencyType === "blue-yellow"
    ).length;
    const totalRedGreen = results.filter(
      (r) => r.deficiencyType === "red-green"
    ).length;
    const totalBlueYellow = results.filter(
      (r) => r.deficiencyType === "blue-yellow"
    ).length;

    let type = "Normal Vision";
    let severity: Diagnosis["severity"] = "Normal";
    let description =
      "Normal color vision detected. No signs of color vision deficiency.";
    let recommendations: string[] = ["Continue regular eye examinations."];

    if (score < 85) {
      if (
        redGreenErrors > blueYellowErrors &&
        redGreenErrors > totalRedGreen * 0.5
      ) {
        type = "Red-Green Color Vision Deficiency";
        severity = score >= 70 ? "Mild" : score >= 50 ? "Moderate" : "Severe";
        description = `Possible red-green color vision deficiency detected. ${redGreenErrors}/${totalRedGreen} red-green tests failed.`;
        recommendations = [
          "Consult an eye care professional for comprehensive testing",
          "Consider using color identification apps",
          "Inform employers about color vision limitations",
          "Use high-contrast display settings",
        ];
      } else if (
        blueYellowErrors > redGreenErrors &&
        blueYellowErrors > totalBlueYellow * 0.5
      ) {
        type = "Blue-Yellow Color Vision Deficiency";
        severity = score >= 70 ? "Mild" : score >= 50 ? "Moderate" : "Severe";
        description = `Possible blue-yellow color vision deficiency detected. ${blueYellowErrors}/${totalBlueYellow} blue-yellow tests failed.`;
        recommendations = [
          "Seek professional ophthalmological evaluation",
          "Blue-yellow deficiency may indicate retinal conditions",
          "Consider regular comprehensive eye exams",
          "Monitor for changes in color perception",
        ];
      } else if (score >= 70) {
        type = "Mild Color Vision Issues";
        severity = "Mild";
        description =
          "Some color discrimination difficulties detected. May be within normal variation.";
        recommendations = [
          "Monitor color vision changes over time",
          "Consider professional evaluation if symptoms worsen",
        ];
      } else {
        type = "Color Vision Deficiency Suspected";
        severity = "Moderate";
        description =
          "Multiple color vision issues detected across different test types.";
        recommendations = [
          "Professional comprehensive color vision testing recommended",
          "Consider genetic counseling if planning family",
          "Workplace accommodations may be helpful",
        ];
      }
    }

    return { type, description, severity, recommendations };
  };

  const downloadReport = (): void => {
    const diagnosis = getDiagnosis();
    const testDate = new Date().toLocaleDateString();
    const testTime = new Date().toLocaleTimeString();
    const reportId = `KLY-CVA-${Date.now()}`;

    // Calculate statistics
    const questionTypes = [...new Set(results.map((r) => r.questionType))];
    const avgTimePerQuestion =
      results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length;
    const redGreenCorrect = results.filter(
      (r) => r.deficiencyType === "red-green" && r.correct
    ).length;
    const redGreenTotal = results.filter(
      (r) => r.deficiencyType === "red-green"
    ).length;
    const blueYellowCorrect = results.filter(
      (r) => r.deficiencyType === "blue-yellow" && r.correct
    ).length;
    const blueYellowTotal = results.filter(
      (r) => r.deficiencyType === "blue-yellow"
    ).length;

    // Create HTML content for PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Kaluyaan Color Vision Report</title>
    <style>
        @page { margin: 0.5in; }
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.4; 
            color: #333; 
            background: white;
        }
        .header {
            text-align: center;
            border: 3px solid #667eea;
            padding: 20px;
            margin-bottom: 30px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 8px;
        }
        .report-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        .section {
            margin-bottom: 25px;
            border-left: 4px solid #667eea;
            padding-left: 15px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
            border-bottom: 1px solid #e9ecef;
            padding-bottom: 5px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .info-item {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .result-summary {
            background: #e8f4fd;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #667eea;
            margin-bottom: 20px;
        }
        .score {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
            text-align: center;
        }
        .diagnosis {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-top: 10px;
            color: #333;
        }
        .question-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .question-table th, .question-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 12px;
        }
        .question-table th {
            background: #667eea;
            color: white;
            font-weight: bold;
        }
        .correct { color: #28a745; font-weight: bold; }
        .incorrect { color: #dc3545; font-weight: bold; }
        .recommendations {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #28a745;
        }
        .recommendations ul {
            margin: 0;
            padding-left: 20px;
        }
        .recommendations li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            border-top: 2px solid #667eea;
            padding-top: 15px;
            color: #666;
            font-size: 12px;
        }
        .disclaimer {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 12px;
        }
        .performance-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        .performance-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #e9ecef;
        }
        .performance-value {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
        }
        .performance-label {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-name">KALUYAAN HEALTH TECHNOLOGIES</div>
        <div class="report-title">COLOR VISION ASSESSMENT REPORT</div>
    </div>

    <div class="section">
        <div class="section-title">REPORT INFORMATION</div>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Report ID:</div>
                ${reportId}
            </div>
            <div class="info-item">
                <div class="info-label">Generated:</div>
                ${testDate} at ${testTime}
            </div>
            <div class="info-item">
                <div class="info-label">Assessment Tool:</div>
                Kaluyaan Professional Color Vision Screener v2.0
            </div>
            <div class="info-item">
                <div class="info-label">Testing Standard:</div>
                Based on Ishihara Color Vision Principles
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">ASSESSMENT RESULTS</div>
        <div class="result-summary">
            <div class="score">${getScore()}%</div>
            <div class="diagnosis">${diagnosis.type} - ${
      diagnosis.severity
    }</div>
            <div style="text-align: center; margin-top: 10px;">
                ${results.filter((r) => r.correct).length}/${
      results.length
    } Correct Responses
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">PERFORMANCE BREAKDOWN</div>
        <div class="performance-grid">
            <div class="performance-item">
                <div class="performance-value">${Math.round(
                  (redGreenCorrect / redGreenTotal) * 100
                )}%</div>
                <div class="performance-label">Red-Green Tests<br>${redGreenCorrect}/${redGreenTotal}</div>
            </div>
            <div class="performance-item">
                <div class="performance-value">${Math.round(
                  (blueYellowCorrect / blueYellowTotal) * 100
                )}%</div>
                <div class="performance-label">Blue-Yellow Tests<br>${blueYellowCorrect}/${blueYellowTotal}</div>
            </div>
            <div class="performance-item">
                <div class="performance-value">${avgTimePerQuestion.toFixed(
                  1
                )}s</div>
                <div class="performance-label">Avg. Time per Question</div>
            </div>
            <div class="performance-item">
                <div class="performance-value">${questionTypes.length}</div>
                <div class="performance-label">Question Types Tested</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">CLINICAL ANALYSIS</div>
        <p><strong>Assessment:</strong> ${diagnosis.description}</p>
        
        <div class="section-title">QUESTION TYPE PERFORMANCE</div>
        ${questionTypes
          .map((type) => {
            const typeResults = results.filter((r) => r.questionType === type);
            const correct = typeResults.filter((r) => r.correct).length;
            const accuracy = Math.round((correct / typeResults.length) * 100);
            return `<p><strong>${type
              .replace("-", " ")
              .toUpperCase()}:</strong> ${correct}/${
              typeResults.length
            } correct (${accuracy}%)</p>`;
          })
          .join("")}
    </div>

    <div class="section">
        <div class="section-title">DETAILED QUESTION ANALYSIS</div>
        <table class="question-table">
            <thead>
                <tr>
                    <th>Q#</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Expected</th>
                    <th>Response</th>
                    <th>Time</th>
                    <th>Difficulty</th>
                </tr>
            </thead>
            <tbody>
                ${results
                  .map(
                    (result, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${result.questionType.replace("-", " ")}</td>
                        <td class="${result.correct ? "correct" : "incorrect"}">
                            ${result.correct ? "✓ CORRECT" : "✗ INCORRECT"}
                        </td>
                        <td>${result.expected}</td>
                        <td>${result.answer || "Timeout"}</td>
                        <td>${result.timeSpent}s</td>
                        <td>${result.difficulty}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    </div>

    <div class="section">
        <div class="section-title">PROFESSIONAL RECOMMENDATIONS</div>
        <div class="recommendations">
            <ul>
                ${diagnosis.recommendations
                  .map((rec) => `<li>${rec}</li>`)
                  .join("")}
            </ul>
        </div>
    </div>

    <div class="disclaimer">
        <strong>IMPORTANT MEDICAL DISCLAIMER:</strong> This assessment is a screening tool and does not constitute a medical diagnosis. 
        Results should be interpreted by qualified healthcare professionals. For comprehensive color vision evaluation and treatment 
        options, please consult an ophthalmologist or optometrist. This report is valid for screening purposes only and should not 
        be used for professional certification or occupational fitness determinations without additional clinical validation.
    </div>

    <div class="footer">
        <strong>KALUYAAN HEALTH TECHNOLOGIES</strong><br>
        Professional Vision Assessment Solutions<br>
        Contact: support@kaluyaan.com | Website: www.kaluyaan.com<br>
        Confidential Medical Report - Handle According to Privacy Regulations<br>
        Document Security ID: ${reportId}
    </div>
</body>
</html>`;

    // Create and download PDF
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Kaluyaan_Color_Vision_Report_${testDate
      .replace(/\//g, "-")
      .replace(/,/g, "")}_${reportId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Also trigger print dialog for PDF conversion
    const printWindow = window.open("");
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  // Generate different visual patterns based on question type
  const generatePattern = (testData: ColorTest): JSX.Element => {
    const commonProps = {
      width: "300",
      height: "300",
      className: styles.dotPattern,
    };

    switch (testData.questionType) {
      case "number-recognition":
        return (
          <svg {...commonProps}>
            {Array.from({ length: 150 }, (_, i) => {
              const x = Math.random() * 280 + 10;
              const y = Math.random() * 280 + 10;
              const size = Math.random() * 8 + 4;
              const isNumberDot = Math.random() < 0.15;
              const color = isNumberDot
                ? testData.primaryColor
                : testData.secondaryColor;

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={size}
                  fill={color}
                  opacity={Math.random() * 0.3 + 0.7}
                />
              );
            })}
            <text
              x="150"
              y="160"
              fontSize="48"
              fontWeight="bold"
              fill={testData.primaryColor}
              textAnchor="middle"
              opacity="0.3"
              fontFamily="Arial, sans-serif"
            >
              {testData.hiddenContent}
            </text>
          </svg>
        );

      case "path-tracing":
        return (
          <svg {...commonProps}>
            {/* Background dots */}
            {Array.from({ length: 120 }, (_, i) => {
              const x = Math.random() * 280 + 10;
              const y = Math.random() * 280 + 10;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={testData.secondaryColor}
                  opacity="0.8"
                />
              );
            })}
            {/* Path line */}
            <path
              d={`M 20 150 Q 100 100 150 150 T 280 150`}
              stroke={testData.primaryColor}
              strokeWidth="8"
              fill="none"
              opacity="0.4"
            />
          </svg>
        );

      case "shape-detection":
        const shapeElement = (() => {
          switch (testData.hiddenContent) {
            case "circle":
              return (
                <circle
                  cx="150"
                  cy="150"
                  r="40"
                  fill={testData.primaryColor}
                  opacity="0.4"
                />
              );
            case "square":
              return (
                <rect
                  x="110"
                  y="110"
                  width="80"
                  height="80"
                  fill={testData.primaryColor}
                  opacity="0.4"
                />
              );
            case "triangle":
              return (
                <polygon
                  points="150,110 120,180 180,180"
                  fill={testData.primaryColor}
                  opacity="0.4"
                />
              );
            default:
              return (
                <circle
                  cx="150"
                  cy="150"
                  r="40"
                  fill={testData.primaryColor}
                  opacity="0.4"
                />
              );
          }
        })();

        return (
          <svg {...commonProps}>
            {Array.from({ length: 100 }, (_, i) => {
              const x = Math.random() * 280 + 10;
              const y = Math.random() * 280 + 10;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={testData.secondaryColor}
                  opacity="0.7"
                />
              );
            })}
            {shapeElement}
          </svg>
        );

      case "color-matching":
        return (
          <svg {...commonProps}>
            <rect
              x="50"
              y="100"
              width="80"
              height="100"
              fill={testData.primaryColor}
            />
            <rect
              x="170"
              y="100"
              width="80"
              height="100"
              fill={testData.secondaryColor}
            />
            <text x="90" y="250" fontSize="14" fill="#333" textAnchor="middle">
              Color A
            </text>
            <text x="210" y="250" fontSize="14" fill="#333" textAnchor="middle">
              Color B
            </text>
          </svg>
        );

      case "vanishing-design":
        return (
          <svg {...commonProps}>
            {Array.from({ length: 80 }, (_, i) => {
              const x = Math.random() * 280 + 10;
              const y = Math.random() * 280 + 10;
              const size = Math.random() * 6 + 2;
              const isFading = Math.random() < 0.3;
              const color = testData.primaryColor;
              const opacity = isFading ? 0.2 : 0.8;

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={size}
                  fill={color}
                  opacity={opacity}
                />
              );
            })}
            <circle
              cx="150"
              cy="150"
              r="50"
              fill={testData.secondaryColor}
              opacity="0.1"
            />
          </svg>
        );

      default:
        return <div>Pattern not available</div>;
    }
  };

  if (!testStarted) {
    return (
      <div className={styles.container}>
        <Link href="/health-test">
          <button className={styles.backButton}>← Back to Health Tests</button>
        </Link>

        <div className={styles.testCard}>
          <h1 className={styles.title}>👁️ Advanced Color Vision Assessment</h1>
          <p className={styles.subtitle}>
            Comprehensive screening with 100+ questions and multiple test types
          </p>

          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>Test Features</div>
            <div className={styles.infoText}>
              • 100+ question database with random selection
              <br />
              • 5 different question types for comprehensive testing
              <br />
              • 15 seconds per question with automatic timing
              <br />
              • Balanced testing across deficiency types
              <br />
              • Downloadable detailed report
              <br />• Professional-grade analysis and recommendations
            </div>
          </div>

          <div className={styles.professionalWarning}>
            <strong>Medical Disclaimer:</strong> This is a screening tool only.
            For accurate diagnosis, consult a qualified eye care professional.
          </div>

          <button className={styles.button} onClick={startTest}>
            🔬 Begin Advanced Assessment
          </button>
        </div>
      </div>
    );
  }

  if (testComplete) {
    const diagnosis = getDiagnosis();

    return (
      <div className={styles.container}>
        <Link href="/health-test">
          <button className={styles.backButton}>← Back to Health Tests</button>
        </Link>

        <div className={styles.testCard}>
          <div className={styles.resultCard}>
            <div className={styles.resultTitle}>
              Color Vision Assessment Complete
            </div>
            <div className={styles.resultValue}>{getScore()}% Accuracy</div>
            <div className={styles.diagnosisCard}>
              <div className={styles.diagnosisType}>{diagnosis.type}</div>
              <div className={styles.diagnosisDescription}>
                {diagnosis.description}
              </div>
              <div className={styles.severityBadge}>
                Severity:{" "}
                <span className={styles.severityLevel}>
                  {diagnosis.severity}
                </span>
              </div>
            </div>
            <div className={styles.resultDetails}>
              <div>
                Correct Responses: {results.filter((r) => r.correct).length}/
                {results.length}
              </div>
              <div>
                Question Types:{" "}
                {[...new Set(results.map((r) => r.questionType))].length}{" "}
                different types
              </div>
              <div>
                Average Time:{" "}
                {(
                  results.reduce((sum, r) => sum + r.timeSpent, 0) /
                  results.length
                ).toFixed(1)}
                s per question
              </div>
            </div>
          </div>

          <div className={styles.detailedResults}>
            <h3>Detailed Analysis by Question Type:</h3>
            {[...new Set(results.map((r) => r.questionType))].map((type) => {
              const typeResults = results.filter(
                (r) => r.questionType === type
              );
              const correct = typeResults.filter((r) => r.correct).length;
              return (
                <div key={type} className={styles.resultItem}>
                  <span>{type.replace("-", " ")}: </span>
                  <span
                    className={
                      correct === typeResults.length
                        ? styles.correct
                        : styles.incorrect
                    }
                  >
                    {correct}/{typeResults.length} correct
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.recommendations}>
            <h3>Recommendations:</h3>
            <ul>
              {diagnosis.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className={styles.controls}>
            <button className={styles.controlButton} onClick={downloadReport}>
              📄 Download Detailed Report
            </button>
            <button className={styles.controlButton} onClick={resetTest}>
              🔄 Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentTestData = testSequence[currentTest];
  return (
    <div className={styles.container}>
      <div className={styles.testCard}>
        <h1 className={styles.title}>👁️ Color Vision Assessment</h1>
        <p className={styles.subtitle}>
          Advanced color blindness screening - Question {currentTest + 1} of{" "}
          {testSequence.length}
        </p>

        <div className={styles.testProgress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((currentTest + 1) / testSequence.length) * 100}%`,
              }}
            />
          </div>
          <div className={styles.progressText}>
            Question {currentTest + 1} of {testSequence.length} -{" "}
            {currentTestData.questionType.replace("-", " ")}
          </div>
        </div>

        <div className={styles.timerSection}>
          <div
            className={`${styles.timer} ${
              timeRemaining <= 5 ? styles.timerWarning : ""
            }`}
          >
            ⏱️ Time remaining: {timeRemaining}s
          </div>
        </div>

        <div className={styles.instructions}>
          <div className={styles.instructionTitle}>Instructions:</div>
          <div className={styles.instructionText}>
            {currentTestData.instruction}
          </div>
        </div>

        <div className={styles.testPatternContainer}>
          {generatePattern(currentTestData)}
        </div>

        <div className={styles.answerOptions}>
          {currentOptions.map((option: string, index: number) => (
            <button
              key={index}
              className={`${styles.optionButton} ${
                selectedAnswer === option ? styles.selected : ""
              } ${
                showResult
                  ? option === currentTestData.hiddenContent ||
                    (currentTestData.questionType === "path-tracing" &&
                      (option === "Yes, clear path" ||
                        option === "Faint path")) ||
                    (currentTestData.questionType === "color-matching" &&
                      option === "Different colors") ||
                    (currentTestData.questionType === "vanishing-design" &&
                      (option === "Partially visible" || option === "Fading"))
                    ? styles.correctAnswer
                    : selectedAnswer === option
                    ? styles.wrongAnswer
                    : ""
                  : ""
              }`}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={styles.resultFeedback}>
            {(() => {
              let isCorrect = false;
              switch (currentTestData.questionType) {
                case "number-recognition":
                case "shape-detection":
                  isCorrect = selectedAnswer === currentTestData.hiddenContent;
                  break;
                case "path-tracing":
                  isCorrect =
                    selectedAnswer === "Yes, clear path" ||
                    selectedAnswer === "Faint path";
                  break;
                case "color-matching":
                  isCorrect = selectedAnswer === "Different colors";
                  break;
                case "vanishing-design":
                  isCorrect =
                    selectedAnswer === "Partially visible" ||
                    selectedAnswer === "Fading";
                  break;
              }

              return isCorrect ? (
                <div className={`${styles.feedback} ${styles.correctFeedback}`}>
                  ✅ Correct! You identified the pattern successfully.
                </div>
              ) : (
                <div
                  className={`${styles.feedback} ${styles.incorrectFeedback}`}
                >
                  ❌{" "}
                  {selectedAnswer
                    ? `You selected "${selectedAnswer}"`
                    : "Time expired"}
                  .
                  {currentTestData.questionType === "number-recognition" ||
                  currentTestData.questionType === "shape-detection"
                    ? ` The correct answer was "${currentTestData.hiddenContent}".`
                    : " This may indicate color vision differences."}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

export default ColorBlindnessTest;

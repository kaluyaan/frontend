'use client';
import { useState } from 'react';

export default function MoodCalculator() {
  const [factors, setFactors] = useState({
    sleep: '',
    exercise: '',
    social: '',
    stress: '',
    weather: ''
  });
  const [moodScore, setMoodScore] = useState<number | null>(null);

  const updateFactor = (key: string, value: string) => {
    setFactors({ ...factors, [key]: value });
  };

  const calculateMood = () => {
    const values = Object.values(factors).map(v => parseInt(v) || 0);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    setMoodScore(average);
  };

  const getMoodDescription = (score: number) => {
    if (score >= 8) return "Excellent mood! 😊";
    if (score >= 6) return "Good mood 🙂";
    if (score >= 4) return "Neutral mood 😐";
    if (score >= 2) return "Low mood 😔";
    return "Very low mood 😞";
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mood Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        {Object.entries({
          sleep: "Sleep quality (1-10)",
          exercise: "Exercise level (1-10)",
          social: "Social interaction (1-10)",
          stress: "Stress level (1-10, reverse)",
          weather: "Weather satisfaction (1-10)"
        }).map(([key, label]) => (
          <div key={key} className="mb-4">
            <label className="block mb-2">{label}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={factors[key as keyof typeof factors]}
              onChange={(e) => updateFactor(key, e.target.value)}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{factors[key as keyof typeof factors] || 1}</span>
          </div>
        ))}
        <button
          onClick={calculateMood}
          className="w-full bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600"
        >
          Calculate Mood
        </button>
        {moodScore !== null && (
          <div className="mt-4 p-4 bg-yellow-50 rounded text-center">
            <h2 className="text-2xl font-bold text-yellow-600">{moodScore.toFixed(1)}/10</h2>
            <p className="text-yellow-800">{getMoodDescription(moodScore)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
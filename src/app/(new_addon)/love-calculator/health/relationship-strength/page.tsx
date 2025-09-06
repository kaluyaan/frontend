'use client';
import { useState } from 'react';

export default function RelationshipStrength() {
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState<any>(null);

  const categories = [
    { key: 'communication', label: 'Communication', weight: 0.25 },
    { key: 'trust', label: 'Trust', weight: 0.25 },
    { key: 'intimacy', label: 'Intimacy', weight: 0.2 },
    { key: 'support', label: 'Mutual Support', weight: 0.15 },
    { key: 'goals', label: 'Shared Goals', weight: 0.15 }
  ];

  const updateScore = (key: string, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }));
  };

  const calculateStrength = () => {
    let totalScore = 0;
    let totalWeight = 0;
    
    categories.forEach(category => {
      if (scores[category.key]) {
        totalScore += scores[category.key] * category.weight;
        totalWeight += category.weight;
      }
    });
    
    const finalScore = totalWeight > 0 ? (totalScore / totalWeight) * 20 : 0;
    
    let strength = "";
    let advice = "";
    if (finalScore >= 80) {
      strength = "Very Strong";
      advice = "Your relationship is thriving! Keep nurturing it.";
    } else if (finalScore >= 60) {
      strength = "Strong";
      advice = "Good foundation with room for growth.";
    } else if (finalScore >= 40) {
      strength = "Moderate";
      advice = "Focus on improving weak areas.";
    } else {
      strength = "Needs Work";
      advice = "Consider relationship counseling.";
    }
    
    setResult({ score: Math.round(finalScore), strength, advice });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Relationship Strength Assessment</h1>
      <div className="max-w-2xl mx-auto">
        {categories.map(category => (
          <div key={category.key} className="mb-6 p-4 bg-white rounded-lg shadow">
            <label className="block mb-2 font-semibold">{category.label} (1-5)</label>
            <input
              type="range"
              min="1"
              max="5"
              value={scores[category.key] || 1}
              onChange={(e) => updateScore(category.key, parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-600">{scores[category.key] || 1}/5</span>
          </div>
        ))}
        
        <button
          onClick={calculateStrength}
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Assess Strength
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <h2 className="text-2xl font-bold text-green-600">{result.score}% - {result.strength}</h2>
            <p className="text-green-800 mt-2">{result.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
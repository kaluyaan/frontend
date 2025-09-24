'use client';
import { useState } from 'react';

export default function ExamScorePredictor() {
  const [studyHours, setStudyHours] = useState('');
  const [previousScore, setPreviousScore] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [predictedScore, setPredictedScore] = useState<number | null>(null);

  const predictScore = () => {
    if (!studyHours || !previousScore || !difficulty) return;
    
    const hours = parseFloat(studyHours);
    const prevScore = parseFloat(previousScore);
    const diffMultiplier = parseFloat(difficulty);
    
    const improvement = Math.min(hours * 2, 20); // Max 20 point improvement
    const predicted = Math.min(prevScore + improvement * diffMultiplier, 100);
    
    setPredictedScore(predicted);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Exam Score Predictor</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="number"
          placeholder="Study hours"
          value={studyHours}
          onChange={(e) => setStudyHours(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Previous exam score"
          value={previousScore}
          onChange={(e) => setPreviousScore(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="">Exam difficulty</option>
          <option value="1.2">Easy</option>
          <option value="1.0">Medium</option>
          <option value="0.8">Hard</option>
        </select>
        <button
          onClick={predictScore}
          className="w-full bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600"
        >
          Predict Score
        </button>
        {predictedScore !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-yellow-600">{predictedScore.toFixed(1)}%</h2>
            <p>Predicted Score</p>
          </div>
        )}
      </div>
    </div>
  );
}
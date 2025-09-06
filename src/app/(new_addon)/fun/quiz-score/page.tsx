'use client';
import { useState } from 'react';

export default function QuizScoreCalculator() {
  const [totalQuestions, setTotalQuestions] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [result, setResult] = useState<{ percentage: number; grade: string } | null>(null);

  const calculateScore = () => {
    if (!totalQuestions || !correctAnswers) return;
    
    const total = parseInt(totalQuestions);
    const correct = parseInt(correctAnswers);
    const percentage = (correct / total) * 100;
    
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    
    setResult({ percentage, grade });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quiz Score Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="number"
          placeholder="Total questions"
          value={totalQuestions}
          onChange={(e) => setTotalQuestions(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Correct answers"
          value={correctAnswers}
          onChange={(e) => setCorrectAnswers(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={calculateScore}
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Calculate Score
        </button>
        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded text-center">
            <h2 className="text-3xl font-bold text-green-600">{result.percentage.toFixed(1)}%</h2>
            <p className="text-2xl font-bold text-green-800">Grade: {result.grade}</p>
            <p className="text-green-700">{correctAnswers}/{totalQuestions} correct</p>
          </div>
        )}
      </div>
    </div>
  );
}
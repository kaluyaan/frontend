'use client';
import { useState } from 'react';

export default function TrustCalculator() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);

  const questions = [
    "Do you feel comfortable sharing secrets?",
    "Do they keep their promises?",
    "Are they honest about their feelings?",
    "Do you trust them with your friends?",
    "Do they respect your boundaries?",
    "Are they reliable in difficult times?",
    "Do you feel secure in the relationship?",
    "Do they communicate openly about problems?"
  ];

  const handleAnswer = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateTrust = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const percentage = Math.round((total / (questions.length * 5)) * 100);
    
    let level = "";
    let advice = "";
    if (percentage >= 80) {
      level = "High Trust";
      advice = "Excellent trust foundation! Keep nurturing it.";
    } else if (percentage >= 60) {
      level = "Good Trust";
      advice = "Solid trust with room for improvement.";
    } else if (percentage >= 40) {
      level = "Moderate Trust";
      advice = "Work on building more trust together.";
    } else {
      level = "Low Trust";
      advice = "Consider addressing trust issues openly.";
    }
    
    setResult({ percentage, level, advice });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Trust Calculator</h1>
      <div className="max-w-2xl mx-auto">
        {questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
            <p className="mb-3">{question}</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(value => (
                <button
                  key={value}
                  onClick={() => handleAnswer(index, value)}
                  className={`px-3 py-2 rounded ${answers[index] === value ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <button
          onClick={calculateTrust}
          className="w-full bg-teal-500 text-white p-3 rounded hover:bg-teal-600"
        >
          Calculate Trust Level
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-teal-50 rounded">
            <h2 className="text-2xl font-bold text-teal-600">{result.percentage}% - {result.level}</h2>
            <p className="text-teal-800 mt-2">{result.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
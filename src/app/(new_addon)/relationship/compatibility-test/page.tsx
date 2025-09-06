'use client';
import { useState } from 'react';

export default function CompatibilityTest() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    "Do you share similar life goals?",
    "Do you communicate well together?",
    "Do you enjoy similar activities?",
    "Do you handle conflicts well?",
    "Do you trust each other completely?"
  ];

  const handleAnswer = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateCompatibility = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const percentage = (total / (questions.length * 5)) * 100;
    setResult(`${Math.round(percentage)}% Compatible`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Relationship Compatibility Test</h1>
      <div className="max-w-2xl mx-auto">
        {questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
            <p className="mb-3">{question}</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(value => (
                <button
                  key={value}
                  onClick={() => handleAnswer(index, value)}
                  className={`px-3 py-2 rounded ${answers[index] === value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={calculateCompatibility}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Calculate Compatibility
        </button>
        {result && <div className="mt-4 text-center text-2xl font-bold">{result}</div>}
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';

export default function PersonalityCalculator() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    { q: "You prefer to spend time:", a: ["Alone", "With others"] },
    { q: "You make decisions based on:", a: ["Logic", "Feelings"] },
    { q: "You prefer:", a: ["Planning", "Spontaneity"] },
    { q: "You are more:", a: ["Practical", "Creative"] }
  ];

  const handleAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculatePersonality = () => {
    const types = ["Analyst", "Diplomat", "Sentinel", "Explorer"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setResult(`Your personality type: ${randomType}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Personality Calculator</h1>
      <div className="max-w-2xl mx-auto">
        {questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
            <p className="mb-3">{question.q}</p>
            <div className="flex gap-4">
              {question.a.map(answer => (
                <button
                  key={answer}
                  onClick={() => handleAnswer(index, answer)}
                  className={`px-4 py-2 rounded ${answers[index] === answer ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={calculatePersonality}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Calculate Personality
        </button>
        {result && <div className="mt-4 text-center text-2xl font-bold">{result}</div>}
      </div>
    </div>
  );
}
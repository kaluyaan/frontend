'use client';
import { useState } from 'react';

export default function LoveLanguageTest() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      q: "What makes you feel most loved?",
      options: ["Physical touch", "Quality time", "Words of affirmation", "Acts of service", "Receiving gifts"]
    },
    {
      q: "How do you prefer to show love?",
      options: ["Hugs and kisses", "Spending time together", "Compliments", "Helping with tasks", "Giving presents"]
    },
    {
      q: "What hurts you most?",
      options: ["Lack of physical affection", "Being ignored", "Harsh words", "Laziness", "Forgotten occasions"]
    },
    {
      q: "What's your ideal date?",
      options: ["Cuddling at home", "Long conversation", "Romantic dinner", "Cooking together", "Shopping together"]
    }
  ];

  const loveLanguages = {
    "Physical touch": "Physical Touch - You express and receive love through physical affection",
    "Quality time": "Quality Time - You value undivided attention and meaningful moments",
    "Words of affirmation": "Words of Affirmation - You appreciate verbal expressions of love",
    "Acts of service": "Acts of Service - You feel loved when others help you",
    "Receiving gifts": "Receiving Gifts - You appreciate thoughtful presents and gestures"
  };

  const handleAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateLoveLanguage = () => {
    const counts: { [key: string]: number } = {};
    answers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });
    
    const topLanguage = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    setResult(loveLanguages[topLanguage as keyof typeof loveLanguages]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Love Language Test</h1>
      <div className="max-w-2xl mx-auto">
        {questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
            <p className="mb-3 font-semibold">{question.q}</p>
            <div className="space-y-2">
              {question.options.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswer(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={calculateLoveLanguage}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
        >
          Discover Love Language
        </button>
        {result && (
          <div className="mt-4 p-4 bg-purple-50 rounded">
            <h2 className="text-xl font-bold text-purple-600 mb-2">Your Love Language:</h2>
            <p className="text-purple-800">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';

export default function FortuneTeller() {
  const [question, setQuestion] = useState('');
  const [fortune, setFortune] = useState<string | null>(null);

  const fortunes = [
    "Great opportunities await you in the near future.",
    "A new friendship will bring joy to your life.",
    "Success comes to those who persevere.",
    "Trust your instincts, they will guide you well.",
    "A pleasant surprise is coming your way.",
    "Your creativity will lead to new possibilities.",
    "Good fortune follows your positive attitude.",
    "An important decision will change your path.",
    "Love and happiness are on the horizon.",
    "Your hard work will soon pay off."
  ];

  const tellFortune = () => {
    if (!question) return;
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Fortune Teller</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔮</div>
          <p className="text-gray-600">Ask the crystal ball a question...</p>
        </div>
        <textarea
          placeholder="What would you like to know about your future?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 mb-4 border rounded h-24 resize-none"
        />
        <button
          onClick={tellFortune}
          className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600"
        >
          Reveal My Fortune
        </button>
        {fortune && (
          <div className="mt-4 p-4 bg-indigo-50 rounded text-center">
            <h2 className="text-lg font-bold text-indigo-600 mb-2">Your Fortune:</h2>
            <p className="text-indigo-800 italic">"{fortune}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
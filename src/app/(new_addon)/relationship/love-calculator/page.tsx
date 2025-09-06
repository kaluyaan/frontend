'use client';
import { useState } from 'react';

export default function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateLove = () => {
    if (!name1 || !name2) return;
    const combined = (name1 + name2).toLowerCase();
    let score = 0;
    for (let i = 0; i < combined.length; i++) {
      score += combined.charCodeAt(i);
    }
    setResult((score % 100) + 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Love Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Your name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Partner's name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={calculateLove}
          className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600"
        >
          Calculate Love
        </button>
        {result && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-pink-600">{result}%</h2>
            <p>Love Compatibility</p>
          </div>
        )}
      </div>
    </div>
  );
}

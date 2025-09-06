
'use client';
import { useState } from 'react';

export default function SoulmateFinder() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [birthDate1, setBirthDate1] = useState('');
  const [birthDate2, setBirthDate2] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const findSoulmate = () => {
    if (!name1 || !name2 || !birthDate1 || !birthDate2) return;
    const compatibility = ((name1.length + name2.length) * 7) % 100;
    const soulmatePhrases = [
      "Perfect soulmate match! ✨",
      "Strong soulmate connection 💫",
      "Good soulmate potential 💖",
      "Moderate soulmate energy 💕"
    ];
    const phrase = soulmatePhrases[Math.floor(compatibility / 25)];
    setResult(`${compatibility}% - ${phrase}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Soulmate Finder</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Your name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="date"
          value={birthDate1}
          onChange={(e) => setBirthDate1(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Partner's name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="date"
          value={birthDate2}
          onChange={(e) => setBirthDate2(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={findSoulmate}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
        >
          Find Soulmate Match
        </button>
        {result && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-purple-600">{result}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
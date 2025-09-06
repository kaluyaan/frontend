'use client';
import { useState } from 'react';

export default function SoulmateFinder() {
  const [birthDate, setBirthDate] = useState('');
  const [preferences, setPreferences] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const findSoulmate = () => {
    if (!birthDate) return;
    const traits = ['Kind', 'Adventurous', 'Creative', 'Loyal', 'Funny', 'Intelligent'];
    const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    setResult(`Your soulmate is ${randomTrait} and shares your love for ${preferences || 'life adventures'}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Soulmate Finder</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Your interests/hobbies"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={findSoulmate}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
        >
          Find My Soulmate
        </button>
        {result && (
          <div className="mt-4 p-4 bg-purple-50 rounded">
            <p className="text-purple-800">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
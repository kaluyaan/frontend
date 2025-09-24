'use client';
import { useState } from 'react';

export default function NameNumerology() {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ number: number; meaning: string } | null>(null);

  const numerologyMap: { [key: string]: number } = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const meanings = {
    1: "Leader, independent, pioneering",
    2: "Cooperative, diplomatic, peaceful",
    3: "Creative, expressive, optimistic",
    4: "Practical, organized, hardworking",
    5: "Adventurous, freedom-loving, versatile",
    6: "Nurturing, responsible, caring",
    7: "Analytical, spiritual, introspective",
    8: "Ambitious, material success, powerful",
    9: "Humanitarian, generous, compassionate"
  };

  const calculateNumerology = () => {
    if (!name) return;
    
    let sum = 0;
    name.toUpperCase().split('').forEach(char => {
      if (numerologyMap[char]) {
        sum += numerologyMap[char];
      }
    });
    
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    setResult({
      number: sum,
      meaning: meanings[sum as keyof typeof meanings]
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Name Numerology</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={calculateNumerology}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
        >
          Calculate Numerology
        </button>
        {result && (
          <div className="mt-4 p-4 bg-purple-50 rounded text-center">
            <h2 className="text-3xl font-bold text-purple-600 mb-2">{result.number}</h2>
            <p className="text-purple-800">{result.meaning}</p>
          </div>
        )}
      </div>
    </div>
  );
}
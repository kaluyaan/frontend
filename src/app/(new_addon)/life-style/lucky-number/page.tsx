'use client';
import { useState } from 'react';

export default function LuckyNumberGenerator() {
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);

  const generateLuckyNumbers = () => {
    if (!birthDate || !name) return;
    
    const numbers = [];
    const nameValue = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const dateValue = new Date(birthDate).getTime();
    
    for (let i = 0; i < 6; i++) {
      const num = ((nameValue + dateValue + i) % 49) + 1;
      numbers.push(num);
    }
    
    setLuckyNumbers(numbers.sort((a, b) => a - b));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lucky Number Generator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={generateLuckyNumbers}
          className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600"
        >
          Generate Lucky Numbers
        </button>
        {luckyNumbers.length > 0 && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold mb-2">Your Lucky Numbers:</h2>
            <div className="flex justify-center gap-2">
              {luckyNumbers.map((num, index) => (
                <span key={index} className="bg-orange-100 text-orange-800 px-3 py-2 rounded-full font-bold">
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function AnniversaryCalculator() {
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateAnniversary = () => {
    if (!startDate) return;
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    
    setResult(`Together for: ${years} years, ${months} months, ${days} days`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Anniversary Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={calculateAnniversary}
          className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600"
        >
          Calculate Anniversary
        </button>
        {result && (
          <div className="mt-4 p-4 bg-red-50 rounded text-center">
            <p className="text-red-800 font-bold">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
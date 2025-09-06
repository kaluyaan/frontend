'use client';
import { useState } from 'react';

export default function AnniversaryCalculator() {
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateAnniversary = () => {
    if (!startDate) return;
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    
    const nextAnniversary = new Date(start);
    nextAnniversary.setFullYear(now.getFullYear() + (now > new Date(now.getFullYear(), start.getMonth(), start.getDate()) ? 1 : 0));
    
    setResult({
      years,
      months,
      days,
      nextAnniversary: nextAnniversary.toDateString()
    });
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
          <div className="mt-4 p-4 bg-red-50 rounded">
            <p className="text-red-800 font-bold mb-2">Together for: {result.years} years, {result.months} months, {result.days} days</p>
            <p className="text-red-700">Next anniversary: {result.nextAnniversary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
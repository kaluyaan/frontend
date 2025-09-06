'use client';
import { useState } from 'react';

export default function WeddingDateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [budget, setBudget] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateDate = () => {
    if (!startDate) return;
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + 12); // Add 1 year for planning
    const seasons = {
      spring: 'March-May',
      summer: 'June-August', 
      fall: 'September-November',
      winter: 'December-February'
    };
    setResult(`Recommended wedding date: ${date.toDateString()} (${seasons[season as keyof typeof seasons] || 'Any season'})`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Wedding Date Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Budget ($)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="">Preferred Season</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
        </select>
        <button
          onClick={calculateDate}
          className="w-full bg-rose-500 text-white p-3 rounded hover:bg-rose-600"
        >
          Calculate Wedding Date
        </button>
        {result && (
          <div className="mt-4 p-4 bg-rose-50 rounded">
            <p className="text-rose-800">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
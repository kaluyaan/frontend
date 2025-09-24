'use client';
import { useState } from 'react';

export default function PercentageCalculator() {
  const [value, setValue] = useState('');
  const [total, setTotal] = useState('');
  const [percentage, setPercentage] = useState<number | null>(null);

  const calculatePercentage = () => {
    if (!value || !total) return;
    const result = (parseFloat(value) / parseFloat(total)) * 100;
    setPercentage(result);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Percentage Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={calculatePercentage}
          className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600"
        >
          Calculate Percentage
        </button>
        {percentage !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-indigo-600">{percentage.toFixed(2)}%</h2>
          </div>
        )}
      </div>
    </div>
  );
}
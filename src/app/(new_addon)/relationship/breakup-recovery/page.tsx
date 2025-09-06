'use client';
import { useState } from 'react';

export default function BreakupRecovery() {
  const [relationshipLength, setRelationshipLength] = useState('');
  const [intensity, setIntensity] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateRecovery = () => {
    if (!relationshipLength || !intensity) return;
    const months = parseInt(relationshipLength);
    const multiplier = parseInt(intensity) / 10;
    const recoveryTime = Math.ceil(months * multiplier * 0.5);
    
    setResult(`Estimated recovery time: ${recoveryTime} months. Remember, healing is a personal journey.`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Breakup Recovery Timeline</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="number"
          placeholder="Relationship length (months)"
          value={relationshipLength}
          onChange={(e) => setRelationshipLength(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="">Relationship intensity</option>
          <option value="3">Casual (3/10)</option>
          <option value="5">Moderate (5/10)</option>
          <option value="7">Serious (7/10)</option>
          <option value="10">Very intense (10/10)</option>
        </select>
        <button
          onClick={calculateRecovery}
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Calculate Recovery Time
        </button>
        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <p className="text-green-800">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
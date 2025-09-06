'use client';
import { useState } from 'react';

export default function WeddingDatePredictor() {
  const [relationshipStart, setRelationshipStart] = useState('');
  const [season, setSeason] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const predictWeddingDate = () => {
    if (!relationshipStart) return;
    const start = new Date(relationshipStart);
    const idealDate = new Date(start);
    idealDate.setFullYear(start.getFullYear() + 2);
    
    const seasons = {
      spring: { month: 4, name: 'Spring' },
      summer: { month: 7, name: 'Summer' },
      fall: { month: 10, name: 'Fall' },
      winter: { month: 1, name: 'Winter' }
    };
    
    if (season && seasons[season as keyof typeof seasons]) {
      idealDate.setMonth(seasons[season as keyof typeof seasons].month);
    }
    
    setResult(`Predicted wedding date: ${idealDate.toDateString()}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Wedding Date Predictor</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="date"
          value={relationshipStart}
          onChange={(e) => setRelationshipStart(e.target.value)}
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
        <input
          type="number"
          placeholder="Budget ($)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={predictWeddingDate}
          className="w-full bg-rose-500 text-white p-3 rounded hover:bg-rose-600"
        >
          Predict Wedding Date
        </button>
        {result && (
          <div className="mt-4 p-4 bg-rose-50 rounded text-center">
            <p className="text-rose-800 font-bold">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
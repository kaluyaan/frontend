'use client';
import { useState } from 'react';

export default function BreakupRecovery() {
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [factors, setFactors] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const recoveryFactors = [
    'Mutual breakup',
    'Still friends',
    'No contact',
    'Support system',
    'New hobbies',
    'Professional help'
  ];

  const toggleFactor = (factor: string) => {
    setFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const calculateRecovery = () => {
    if (!duration || !intensity) return;
    
    const months = parseInt(duration);
    const intensityLevel = parseInt(intensity);
    
    let baseRecovery = months * 0.5 * (intensityLevel / 10);
    
    // Adjust based on factors
    factors.forEach(factor => {
      if (['Mutual breakup', 'Still friends', 'Support system', 'New hobbies', 'Professional help'].includes(factor)) {
        baseRecovery *= 0.8; // Positive factors reduce recovery time
      }
      if (factor === 'No contact') {
        baseRecovery *= 1.2; // No contact might initially increase recovery time
      }
    });
    
    const recoveryMonths = Math.max(1, Math.round(baseRecovery));
    const phase = recoveryMonths <= 2 ? 'Quick Recovery' : 
                  recoveryMonths <= 6 ? 'Normal Recovery' : 'Extended Recovery';
    
    setResult({
      months: recoveryMonths,
      phase,
      tips: [
        'Focus on self-care',
        'Reconnect with friends',
        'Try new activities',
        'Consider therapy if needed'
      ]
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Breakup Recovery Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="number"
          placeholder="Relationship duration (months)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
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
        
        <div className="mb-4">
          <p className="mb-2 font-semibold">Recovery factors:</p>
          {recoveryFactors.map(factor => (
            <label key={factor} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={factors.includes(factor)}
                onChange={() => toggleFactor(factor)}
                className="mr-2"
              />
              {factor}
            </label>
          ))}
        </div>
        
        <button
          onClick={calculateRecovery}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Calculate Recovery
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h2 className="text-xl font-bold text-blue-600">{result.phase}</h2>
            <p className="text-blue-800">Estimated recovery: {result.months} months</p>
            <div className="mt-2">
              <p className="font-semibold text-blue-700">Recovery tips:</p>
              <ul className="text-sm text-blue-600">
                {result.tips.map((tip: string, index: number) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
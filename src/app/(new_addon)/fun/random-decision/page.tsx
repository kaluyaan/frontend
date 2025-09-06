'use client';
import { useState } from 'react';

export default function RandomDecisionMaker() {
  const [options, setOptions] = useState(['']);
  const [decision, setDecision] = useState<string | null>(null);

  const addOption = () => setOptions([...options, '']);

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const makeDecision = () => {
    const validOptions = options.filter(option => option.trim() !== '');
    if (validOptions.length === 0) return;
    
    const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];
    setDecision(randomOption);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Random Decision Maker</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600 mb-4">Can't decide? Let fate choose for you!</p>
        
        {options.map((option, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            {options.length > 1 && (
              <button
                onClick={() => removeOption(index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        <button
          onClick={addOption}
          className="w-full mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Add Option
        </button>
        
        <button
          onClick={makeDecision}
          className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600"
        >
          Make Decision
        </button>
        
        {decision && (
          <div className="mt-4 p-4 bg-orange-50 rounded text-center">
            <h2 className="text-lg font-bold text-orange-600 mb-2">Decision:</h2>
            <p className="text-2xl font-bold text-orange-800">{decision}</p>
          </div>
        )}
      </div>
    </div>
  );
}
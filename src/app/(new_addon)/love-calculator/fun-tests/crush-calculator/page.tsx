'use client';
import { useState } from 'react';

export default function CrushCalculator() {
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');
  const [signs, setSigns] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const crushSigns = [
    'Makes eye contact',
    'Texts you first',
    'Remembers details',
    'Finds excuses to talk',
    'Laughs at your jokes',
    'Asks personal questions'
  ];

  const toggleSign = (sign: string) => {
    setSigns(prev => 
      prev.includes(sign) 
        ? prev.filter(s => s !== sign)
        : [...prev, sign]
    );
  };

  const calculateCrush = () => {
    if (!yourName || !crushName) return;
    const nameScore = (yourName.length + crushName.length) * 3;
    const signScore = signs.length * 15;
    const total = Math.min(nameScore + signScore, 100);
    
    let message = "";
    if (total >= 80) message = "They definitely like you! 😍";
    else if (total >= 60) message = "Good signs! 😊";
    else if (total >= 40) message = "Maybe... 🤔";
    else message = "Keep trying! 😅";
    
    setResult(`${total}% - ${message}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crush Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Your name"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Crush's name"
          value={crushName}
          onChange={(e) => setCrushName(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        
        <div className="mb-4">
          <p className="mb-2 font-semibold">Signs they like you:</p>
          {crushSigns.map(sign => (
            <label key={sign} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={signs.includes(sign)}
                onChange={() => toggleSign(sign)}
                className="mr-2"
              />
              {sign}
            </label>
          ))}
        </div>
        
        <button
          onClick={calculateCrush}
          className="w-full bg-pink-500 text-white p-3 rounded hover:bg-pink-600"
        >
          Calculate Crush
        </button>
        {result && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-pink-600">{result}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
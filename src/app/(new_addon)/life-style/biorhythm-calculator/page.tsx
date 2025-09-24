'use client';
import { useState } from 'react';

export default function BiorhythmCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [biorhythms, setBiorhythms] = useState<{ physical: number; emotional: number; intellectual: number } | null>(null);

  const calculateBiorhythms = () => {
    if (!birthDate || !targetDate) return;
    
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    const daysDiff = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    
    const physical = Math.sin((2 * Math.PI * daysDiff) / 23) * 100;
    const emotional = Math.sin((2 * Math.PI * daysDiff) / 28) * 100;
    const intellectual = Math.sin((2 * Math.PI * daysDiff) / 33) * 100;
    
    setBiorhythms({ physical, emotional, intellectual });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Biorhythm Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={calculateBiorhythms}
          className="w-full bg-cyan-500 text-white p-3 rounded hover:bg-cyan-600"
        >
          Calculate Biorhythms
        </button>
        {biorhythms && (
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-red-50 rounded">
              <span className="font-bold">Physical:</span> {biorhythms.physical.toFixed(1)}%
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <span className="font-bold">Emotional:</span> {biorhythms.emotional.toFixed(1)}%
            </div>
            <div className="p-3 bg-green-50 rounded">
              <span className="font-bold">Intellectual:</span> {biorhythms.intellectual.toFixed(1)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

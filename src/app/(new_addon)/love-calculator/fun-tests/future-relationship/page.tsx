'use client';
import { useState } from 'react';

export default function FutureRelationship() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const traits = ['Funny', 'Kind', 'Adventurous', 'Intelligent', 'Creative', 'Loyal'];
  const locations = ['Coffee shop', 'Library', 'Gym', 'Park', 'Work', 'Online'];
  const timelines = ['6 months', '1 year', '2 years', '3 years', '5 years'];

  const togglePreference = (trait: string) => {
    setPreferences(prev => 
      prev.includes(trait) 
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    );
  };

  const predictFuture = () => {
    if (!name || !age) return;
    
    const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomTimeline = timelines[Math.floor(Math.random() * timelines.length)];
    const partnerAge = parseInt(age) + Math.floor(Math.random() * 6) - 3;
    
    setResult({
      trait: randomTrait,
      location: randomLocation,
      timeline: randomTimeline,
      age: partnerAge,
      compatibility: Math.floor(Math.random() * 30) + 70
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Future Relationship Predictor</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        
        <div className="mb-4">
          <p className="mb-2 font-semibold">Desired traits:</p>
          {traits.map(trait => (
            <label key={trait} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={preferences.includes(trait)}
                onChange={() => togglePreference(trait)}
                className="mr-2"
              />
              {trait}
            </label>
          ))}
        </div>
        
        <button
          onClick={predictFuture}
          className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600"
        >
          Predict Future
        </button>
        {result && (
          <div className="mt-4 p-4 bg-indigo-50 rounded">
            <h3 className="font-bold text-indigo-800 mb-2">Your Future Partner:</h3>
            <p className="text-indigo-700">Age: {result.age}</p>
            <p className="text-indigo-700">Main trait: {result.trait}</p>
            <p className="text-indigo-700">You'll meet at: {result.location}</p>
            <p className="text-indigo-700">Timeline: {result.timeline}</p>
            <p className="text-indigo-700">Compatibility: {result.compatibility}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
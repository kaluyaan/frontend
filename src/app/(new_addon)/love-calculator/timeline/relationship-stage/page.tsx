'use client';
import { useState } from 'react';

export default function RelationshipStage() {
  const [duration, setDuration] = useState('');
  const [milestones, setMilestones] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const stages = [
    { months: 0, stage: "Honeymoon Phase", description: "Everything is perfect and exciting" },
    { months: 6, stage: "Reality Check", description: "Getting to know each other's flaws" },
    { months: 12, stage: "Commitment", description: "Deciding to work through challenges" },
    { months: 24, stage: "Stability", description: "Comfortable and secure together" },
    { months: 36, stage: "Deep Partnership", description: "True partnership and understanding" }
  ];

  const calculateStage = () => {
    if (!duration) return;
    const months = parseInt(duration);
    const currentStage = stages.reverse().find(stage => months >= stage.months) || stages[0];
    setResult(`${currentStage.stage}: ${currentStage.description}`);
  };

  const toggleMilestone = (milestone: string) => {
    setMilestones(prev => 
      prev.includes(milestone) 
        ? prev.filter(m => m !== milestone)
        : [...prev, milestone]
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Relationship Stage</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="number"
          placeholder="Relationship duration (months)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        
        <div className="mb-4">
          <p className="mb-2 font-semibold">Milestones achieved:</p>
          {['First Kiss', 'Met Parents', 'Moved In', 'Said I Love You', 'Talked Marriage'].map(milestone => (
            <label key={milestone} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={milestones.includes(milestone)}
                onChange={() => toggleMilestone(milestone)}
                className="mr-2"
              />
              {milestone}
            </label>
          ))}
        </div>
        
        <button
          onClick={calculateStage}
          className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600"
        >
          Determine Stage
        </button>
        {result && (
          <div className="mt-4 p-4 bg-indigo-50 rounded">
            <p className="text-indigo-800 font-bold">{result}</p>
            <p className="text-indigo-700 mt-2">Milestones: {milestones.length}/5</p>
          </div>
        )}
      </div>
    </div>
  );
}
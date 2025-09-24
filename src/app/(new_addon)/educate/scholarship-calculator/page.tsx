'use client';
import { useState } from 'react';

export default function ScholarshipCalculator() {
  const [gpa, setGpa] = useState('');
  const [income, setIncome] = useState('');
  const [activities, setActivities] = useState('');
  const [eligibility, setEligibility] = useState<string | null>(null);

  const calculateEligibility = () => {
    if (!gpa || !income || !activities) return;
    
    const gpaScore = parseFloat(gpa);
    const familyIncome = parseFloat(income);
    const activityCount = parseInt(activities);
    
    let score = 0;
    if (gpaScore >= 3.5) score += 40;
    else if (gpaScore >= 3.0) score += 25;
    else if (gpaScore >= 2.5) score += 10;
    
    if (familyIncome < 50000) score += 30;
    else if (familyIncome < 100000) score += 15;
    
    score += Math.min(activityCount * 5, 30);
    
    if (score >= 70) setEligibility('High - Excellent scholarship prospects');
    else if (score >= 50) setEligibility('Medium - Good scholarship prospects');
    else setEligibility('Low - Consider improving qualifications');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Scholarship Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="number"
          step="0.1"
          placeholder="GPA (0.0-4.0)"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Family income ($)"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Extracurricular activities"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={calculateEligibility}
          className="w-full bg-teal-500 text-white p-3 rounded hover:bg-teal-600"
        >
          Calculate Eligibility
        </button>
        {eligibility && (
          <div className="mt-4 p-4 bg-teal-50 rounded">
            <p className="text-teal-800 font-bold">{eligibility}</p>
          </div>
        )}
      </div>
    </div>
  );
}
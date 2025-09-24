'use client';
import { useState } from 'react';

export default function StudyTimeCalculator() {
  const [subjects, setSubjects] = useState([{ name: '', difficulty: '', hours: '' }]);
  const [totalTime, setTotalTime] = useState<number | null>(null);

  const addSubject = () => setSubjects([...subjects, { name: '', difficulty: '', hours: '' }]);

  const updateSubject = (index: number, field: string, value: string) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
  };

  const calculateStudyTime = () => {
    let total = 0;
    subjects.forEach(subject => {
      if (subject.hours && subject.difficulty) {
        const baseHours = parseFloat(subject.hours);
        const multiplier = parseFloat(subject.difficulty);
        total += baseHours * multiplier;
      }
    });
    setTotalTime(total);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Study Time Calculator</h1>
      <div className="max-w-2xl mx-auto">
        {subjects.map((subject, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Subject"
              value={subject.name}
              onChange={(e) => updateSubject(index, 'name', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            <select
              value={subject.difficulty}
              onChange={(e) => updateSubject(index, 'difficulty', e.target.value)}
              className="flex-1 p-3 border rounded"
            >
              <option value="">Difficulty</option>
              <option value="0.8">Easy</option>
              <option value="1.0">Medium</option>
              <option value="1.5">Hard</option>
            </select>
            <input
              type="number"
              placeholder="Base hours"
              value={subject.hours}
              onChange={(e) => updateSubject(index, 'hours', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
          </div>
        ))}
        <button onClick={addSubject} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded">Add Subject</button>
        <button onClick={calculateStudyTime} className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600">Calculate Study Time</button>
        {totalTime !== null && <div className="mt-4 text-center text-2xl font-bold">Total Study Time: {totalTime.toFixed(1)} hours</div>}
      </div>
    </div>
  );
}

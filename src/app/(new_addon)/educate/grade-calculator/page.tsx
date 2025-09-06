'use client';
import { useState } from 'react';

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState([{ score: '', total: '', weight: '' }]);
  const [finalGrade, setFinalGrade] = useState<number | null>(null);

  const addAssignment = () => setAssignments([...assignments, { score: '', total: '', weight: '' }]);

  const updateAssignment = (index: number, field: string, value: string) => {
    const updated = [...assignments];
    updated[index] = { ...updated[index], [field]: value };
    setAssignments(updated);
  };

  const calculateGrade = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    assignments.forEach(assignment => {
      if (assignment.score && assignment.total && assignment.weight) {
        const percentage = (parseFloat(assignment.score) / parseFloat(assignment.total)) * 100;
        const weight = parseFloat(assignment.weight);
        totalWeightedScore += percentage * weight;
        totalWeight += weight;
      }
    });
    
    setFinalGrade(totalWeight > 0 ? totalWeightedScore / totalWeight : 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Grade Calculator</h1>
      <div className="max-w-2xl mx-auto">
        {assignments.map((assignment, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="number"
              placeholder="Score"
              value={assignment.score}
              onChange={(e) => updateAssignment(index, 'score', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Total"
              value={assignment.total}
              onChange={(e) => updateAssignment(index, 'total', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Weight %"
              value={assignment.weight}
              onChange={(e) => updateAssignment(index, 'weight', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
          </div>
        ))}
        <button onClick={addAssignment} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded">Add Assignment</button>
        <button onClick={calculateGrade} className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600">Calculate Grade</button>
        {finalGrade !== null && <div className="mt-4 text-center text-2xl font-bold">Final Grade: {finalGrade.toFixed(1)}%</div>}
      </div>
    </div>
  );
}
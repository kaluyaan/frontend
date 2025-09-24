'use client';
import { useState } from 'react';

export default function ProductivityCalculator() {
  const [tasks, setTasks] = useState([{ name: '', time: '', priority: '' }]);
  const [productivityScore, setProductivityScore] = useState<number | null>(null);

  const addTask = () => setTasks([...tasks, { name: '', time: '', priority: '' }]);

  const updateTask = (index: number, field: string, value: string) => {
    const updated = [...tasks];
    updated[index] = { ...updated[index], [field]: value };
    setTasks(updated);
  };

  const calculateProductivity = () => {
    let totalScore = 0;
    let totalTasks = 0;
    
    tasks.forEach(task => {
      if (task.time && task.priority) {
        const timeScore = Math.min(parseFloat(task.time) / 60, 1) * 100; // Max 1 hour = 100%
        const priorityMultiplier = parseFloat(task.priority);
        totalScore += timeScore * priorityMultiplier;
        totalTasks++;
      }
    });
    
    setProductivityScore(totalTasks > 0 ? totalScore / totalTasks : 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Productivity Calculator</h1>
      <div className="max-w-2xl mx-auto">
        {tasks.map((task, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Task name"
              value={task.name}
              onChange={(e) => updateTask(index, 'name', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Time (minutes)"
              value={task.time}
              onChange={(e) => updateTask(index, 'time', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            <select
              value={task.priority}
              onChange={(e) => updateTask(index, 'priority', e.target.value)}
              className="flex-1 p-3 border rounded"
            >
              <option value="">Priority</option>
              <option value="0.5">Low</option>
              <option value="1.0">Medium</option>
              <option value="1.5">High</option>
            </select>
          </div>
        ))}
        <button onClick={addTask} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded">Add Task</button>
        <button onClick={calculateProductivity} className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600">Calculate Productivity</button>
        {productivityScore !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-green-600">{productivityScore.toFixed(1)}%</h2>
            <p>Productivity Score</p>
          </div>
        )}
      </div>
    </div>
  );
}
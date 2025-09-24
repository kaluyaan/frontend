'use client';
import { useState } from 'react';

export default function GPACalculator() {
  const [courses, setCourses] = useState([{ grade: '', credits: '' }]);
  const [gpa, setGPA] = useState<number | null>(null);

  const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0 };

  const addCourse = () => setCourses([...courses, { grade: '', credits: '' }]);

  const updateCourse = (index: number, field: string, value: string) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      if (course.grade && course.credits) {
        const points = gradePoints[course.grade as keyof typeof gradePoints];
        const credits = parseFloat(course.credits);
        totalPoints += points * credits;
        totalCredits += credits;
      }
    });
    
    setGPA(totalCredits > 0 ? totalPoints / totalCredits : 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">GPA Calculator</h1>
      <div className="max-w-2xl mx-auto">
        {courses.map((course, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <select
              value={course.grade}
              onChange={(e) => updateCourse(index, 'grade', e.target.value)}
              className="flex-1 p-3 border rounded"
            >
              <option value="">Grade</option>
              {Object.keys(gradePoints).map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Credits"
              value={course.credits}
              onChange={(e) => updateCourse(index, 'credits', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
          </div>
        ))}
        <button onClick={addCourse} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded">Add Course</button>
        <button onClick={calculateGPA} className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">Calculate GPA</button>
        {gpa !== null && <div className="mt-4 text-center text-2xl font-bold">GPA: {gpa.toFixed(2)}</div>}
      </div>
    </div>
  );
}
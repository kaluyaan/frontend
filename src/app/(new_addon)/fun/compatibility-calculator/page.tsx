'use client';
import { useState } from 'react';

export default function FriendCompatibilityCalculator() {
  const [friend1, setFriend1] = useState('');
  const [friend2, setFriend2] = useState('');
  const [interests1, setInterests1] = useState('');
  const [interests2, setInterests2] = useState('');
  const [compatibility, setCompatibility] = useState<number | null>(null);

  const calculateCompatibility = () => {
    if (!friend1 || !friend2) return;
    
    const nameCompatibility = (friend1.length + friend2.length) % 100;
    const interestWords1 = interests1.toLowerCase().split(' ');
    const interestWords2 = interests2.toLowerCase().split(' ');
    const commonInterests = interestWords1.filter(word => interestWords2.includes(word)).length;
    
    const finalScore = Math.min(nameCompatibility + (commonInterests * 10), 100);
    setCompatibility(finalScore);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Friend Compatibility Calculator</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Friend 1 name"
          value={friend1}
          onChange={(e) => setFriend1(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Friend 1 interests"
          value={interests1}
          onChange={(e) => setInterests1(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Friend 2 name"
          value={friend2}
          onChange={(e) => setFriend2(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Friend 2 interests"
          value={interests2}
          onChange={(e) => setInterests2(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        />
        <button
          onClick={calculateCompatibility}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Calculate Friendship
        </button>
        {compatibility !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-blue-600">{compatibility}%</h2>
            <p>Friendship Compatibility</p>
          </div>
        )}
      </div>
    </div>
  );
}

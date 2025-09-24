'use client';
import { useState } from 'react';

export default function CelebrityLookalike() {
  const [features, setFeatures] = useState({
    hairColor: '',
    eyeColor: '',
    faceShape: '',
    height: ''
  });
  const [celebrity, setCelebrity] = useState<string | null>(null);

  const celebrities = [
    "Ryan Reynolds", "Emma Stone", "Chris Hemsworth", "Scarlett Johansson",
    "Robert Downey Jr.", "Jennifer Lawrence", "Brad Pitt", "Angelina Jolie",
    "Leonardo DiCaprio", "Margot Robbie", "Tom Hanks", "Meryl Streep"
  ];

  const updateFeature = (key: string, value: string) => {
    setFeatures({ ...features, [key]: value });
  };

  const findLookalike = () => {
    const randomCelebrity = celebrities[Math.floor(Math.random() * celebrities.length)];
    setCelebrity(randomCelebrity);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Celebrity Look-alike</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <select
          value={features.hairColor}
          onChange={(e) => updateFeature('hairColor', e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="">Hair Color</option>
          <option value="blonde">Blonde</option>
          <option value="brown">Brown</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
        </select>
        <select
          value={features.eyeColor}
          onChange={(e) => updateFeature('eyeColor', e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="">Eye Color</option>
          <option value="blue">Blue</option>
          <option value="brown">Brown</option>
          <option value="green">Green</option>
          <option value="hazel">Hazel</option>
        </select>
        <select
          value={features.faceShape}
          onChange={(e) => updateFeature('faceShape', e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="">Face Shape</option>
          <option value="oval">Oval</option>
          <option value="round">Round</option>
          <option value="square">Square</option>
          <option value="heart">Heart</option>
        </select>
        <select
          value={features.height}
          onChange={(e) => updateFeature('height', e.target.value)}
          className="w-full p-3 mb-4 border rounded"
        >
          <option value="">Height</option>
          <option value="short">Short</option>
          <option value="average">Average</option>
          <option value="tall">Tall</option>
        </select>
        <button
          onClick={findLookalike}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
        >
          Find My Celebrity Twin
        </button>
        {celebrity && (
          <div className="mt-4 p-4 bg-purple-50 rounded text-center">
            <h2 className="text-xl font-bold text-purple-600">You look like:</h2>
            <p className="text-2xl font-bold text-purple-800">{celebrity}</p>
          </div>
        )}
      </div>
    </div>
  );
}
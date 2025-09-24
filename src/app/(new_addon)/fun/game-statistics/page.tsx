'use client';
import { useState } from 'react';

export default function GameStatisticsCalculator() {
  const [games, setGames] = useState([{ name: '', wins: '', losses: '', draws: '' }]);
  const [stats, setStats] = useState<any[]>([]);

  const addGame = () => setGames([...games, { name: '', wins: '', losses: '', draws: '' }]);

  const updateGame = (index: number, field: string, value: string) => {
    const updated = [...games];
    updated[index] = { ...updated[index], [field]: value };
    setGames(updated);
  };

  const calculateStats = () => {
    const gameStats = games.map(game => {
      if (!game.wins || !game.losses) return null;
      
      const wins = parseInt(game.wins);
      const losses = parseInt(game.losses);
      const draws = parseInt(game.draws) || 0;
      const total = wins + losses + draws;
      
      return {
        name: game.name || 'Unnamed Game',
        wins,
        losses,
        draws,
        total,
        winRate: total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0',
        winLossRatio: losses > 0 ? (wins / losses).toFixed(2) : wins.toString()
      };
    }).filter(Boolean);
    
    setStats(gameStats);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Game Statistics Calculator</h1>
      <div className="max-w-4xl mx-auto">
        {games.map((game, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Game name"
              value={game.name}
              onChange={(e) => updateGame(index, 'name', e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Wins"
              value={game.wins}
              onChange={(e) => updateGame(index, 'wins', e.target.value)}
              className="w-24 p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Losses"
              value={game.losses}
              onChange={(e) => updateGame(index, 'losses', e.target.value)}
              className="w-24 p-3 border rounded"
            />
            <input
              type="number"
              placeholder="Draws"
              value={game.draws}
              onChange={(e) => updateGame(index, 'draws', e.target.value)}
              className="w-24 p-3 border rounded"
            />
          </div>
        ))}
        <button onClick={addGame} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded">Add Game</button>
        <button onClick={calculateStats} className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mb-6">Calculate Statistics</button>
        
        {stats.length > 0 && (
          <div className="grid gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">{stat.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>Wins: <span className="font-bold text-green-600">{stat.wins}</span></div>
                  <div>Losses: <span className="font-bold text-red-600">{stat.losses}</span></div>
                  <div>Win Rate: <span className="font-bold text-blue-600">{stat.winRate}%</span></div>
                  <div>W/L Ratio: <span className="font-bold text-purple-600">{stat.winLossRatio}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

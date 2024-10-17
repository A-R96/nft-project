import React from 'react';
import './Battle.css';

function Battle() {
  // Sample data for the leaderboard
  const battleResults = [
    { id: 1, winner: "Capy #123", opponent: "Capy #456", date: "2023-05-15" },
    { id: 2, winner: "Capy #789", opponent: "Capy #101", date: "2023-05-16" },
    { id: 3, winner: "Capy #202", opponent: "Capy #303", date: "2023-05-17" },
    // Add more battle results as needed
  ];

  return (
    <section id="Battle" className="page-content battle-content">
      <h2>CAPYCLUB BATTLE LEADERBOARD</h2>
      <div className="battle-container">
        <table className="battle-leaderboard">
          <thead>
            <tr>
              <th>Battle #</th>
              <th>Winner</th>
              <th>Opponent</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {battleResults.map((battle) => (
              <tr key={battle.id}>
                <td>{battle.id}</td>
                <td>{battle.winner}</td>
                <td>{battle.opponent}</td>
                <td>{battle.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Battle;

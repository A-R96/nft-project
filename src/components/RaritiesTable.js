import React from 'react';

function RaritiesTable() {
  const rarities = [
    { name: 'Common', percentage: '50%' },
    { name: 'Uncommon', percentage: '30%' },
    { name: 'Rare', percentage: '15%' },
    { name: 'Legendary', percentage: '5%' },
  ];

  return (
    <section id="rarities">
      <h2>Rarities</h2>
      <table>
        <thead>
          <tr>
            <th>Rarity</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {rarities.map((rarity, index) => (
            <tr key={index}>
              <td>{rarity.name}</td>
              <td>{rarity.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="rarities-message">
        <h3>Rarity Information Update</h3>
        <p>Please note: The rarity information shown above is preliminary. The metadata has not yet been updated with final rarity data. Stay tuned for updates!</p>
      </div>
    </section>
  );
}

export default RaritiesTable;
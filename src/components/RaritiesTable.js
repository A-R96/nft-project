import React from 'react';

function RaritiesTable() {
  const totalNFTs = 249;

  const traitRarities = {
    "Background": { rarest: "Pink (0.40%)", common: "Orange (52.61%)" },
    "Water": { rarest: "Cyan, Blue (0.40% each)", common: "Red (41.37%)" },
    "Body": { rarest: "Clear (0.80%)", common: "Grey (14.46%)" },
    "Outline": { rarest: "Black (100%)", common: "Black (100%)" },
    "Shadows": { rarest: "Dots (1.20%)", common: "Normal (93.57%)" },
    "Mouth": { rarest: "Dog Nose (0.40%)", common: "Chompers (38.15%)" },
    "Eyes": { rarest: "Cool, Stoned (0.80% each)", common: "Normal (58.63%)" },
    "Swag": { rarest: "Headphones (0.40%)", common: "None (63.86%)" },
    "Pup": { rarest: "Blue, Orange (0.80% each)", common: "None (59.04%)" },
  };

  return (
    <section id="rarities">
      <h2>Rarities</h2>
      <table className="rarities-table">
        <thead>
          <tr>
            <th>Trait</th>
            <th>Rarest</th>
            <th>Most Common</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(traitRarities).map(([trait, { rarest, common }]) => (
            <tr key={trait}>
              <td>{trait}</td>
              <td>{rarest}</td>
              <td>{common}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default RaritiesTable;
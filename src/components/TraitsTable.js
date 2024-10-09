import React from 'react';

function TraitsTable() {
  const traits = {
    "Background": ["Orange", "Chartreuse", "Green", "Salmon", "Yellow", "Blue", "Pink"],
    "Water": ["Purple", "Red", "Orange", "Green", "Cyan", "Yellow", "Blue"],
    "Body": ["Dull Orange", "Dull Cyan", "Dull Pink", "Grey", "Cyan", "Dull Blue", "Dull Green", "Dull Purple", "Dull Red", "Orange", "Yellow", "Blue", "Green", "Red", "Purle", "Magenta", "Clear"],
    "Outline": ["Black"],
    "Shadows": ["Normal", "Squigles", "Dots", "Stripes"],
    "Mouth": ["Donkey Teeth", "Chompers", "Normal", "Tongue", "Grin", "Nervous", "Smile", "Dino Mouth", "Weak Tongue", "Dog Nose"],
    "Eyes": ["Mean", "Normal", "Angry", "Stoned", "Squint", "Bulge", "Dull", "Small", "Half", "Cool", "Long", "Pharaoh", "Wierd"],
    "Swag": ["Bandana", "Goggles", "Chain", "Collar", "Earring", "Earrings", "Crown", "Headphones", "None"],
    "Pup": ["Purple", "Yellow", "Grey", "Green", "Cyan", "Orange", "Blue", "None"],
  };

  return (
    <section id="traits">
      <h2>Traits</h2>
      <table className="traits-table">
        <thead>
          <tr>
            <th>Trait</th>
            <th>Variants</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(traits).map(([trait, variants]) => (
            <tr key={trait}>
              <td>{trait}</td>
              <td className="variants-cell">
                <div className="variants-wrapper">{variants.join(', ')}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TraitsTable;
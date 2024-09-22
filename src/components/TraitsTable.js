import React from 'react';

function TraitsTable() {
  const traits = {
    "Background": ["Pale Blue", "Pale Purple", "Pale Cyan", "Pale Pink", "Pale Orange", "Pale Yellow"],
    "Body": ["Grey", "Light Brown", "Cyan", "Green", "Red", "Purple", "Yellow", "Blue", "White", "Fancy Red", "Fancy Blue", "Fancy Purple", "Glass"],
    "Pup": ["Brown", "Dark Brown", "Light Brown", "Tan"],
    "Nose": ["Brown", "Pink", "Black"],
    "Eyes": ["Angry", "Bored", "Crazy", "Happy", "Sad", "Sleepy", "Sunglasses", "Wink"],
    "Water": ["None", "Ripple", "Splash"],
    "Swag": ["Bow Tie", "Cape", "Hoodie", "None", "Scarf", "Shirt", "Tank Top", "Tuxedo"],
    "Swag2": ["Baseball Cap", "Beanie", "Cowboy Hat", "Crown", "None", "Party Hat", "Top Hat", "Wizard Hat"],
    "Logo": ["CAPYCLUB Logo"]
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
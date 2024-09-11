import React from 'react';

function TraitsTable() {
  const traits = {
    "backgroun body": ["Blue", "Brown", "Green", "Orange", "Pink", "Purple", "Red", "Yellow"],
    "pup": ["Brown", "Dark Brown", "Light Brown", "Tan"],
    "nose": ["Brown", "Pink", "Black"],
    "eyes": ["Angry", "Bored", "Crazy", "Happy", "Sad", "Sleepy", "Sunglasses", "Wink"],
    "water": ["None", "Ripple", "Splash"],
    "swag": ["Bow Tie", "Cape", "Hoodie", "None", "Scarf", "Shirt", "Tank Top", "Tuxedo"],
    "swag2": ["Baseball Cap", "Beanie", "Cowboy Hat", "Crown", "None", "Party Hat", "Top Hat", "Wizard Hat"],
    "logo": ["CAPYCLUB Logo"]
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
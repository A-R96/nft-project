import React from 'react';

function TraitsTable() {
  const traits = [
    { name: 'Background', variants: ['Red', 'Blue', 'Green'] },
    { name: 'Eyes', variants: ['Big', 'Small', 'Glowing'] },
    // Add more traits as needed
  ];

  return (
    <section id="traits">
      <h2>Traits</h2>
      <table>
        <thead>
          <tr>
            <th>Trait</th>
            <th>Variants</th>
          </tr>
        </thead>
        <tbody>
          {traits.map((trait, index) => (
            <tr key={index}>
              <td>{trait.name}</td>
              <td>{trait.variants.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TraitsTable;
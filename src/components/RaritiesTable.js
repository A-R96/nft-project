import React from 'react';

function RaritiesTable() {
  return (
    <section id="rarities">
      <h2>Rarities</h2>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Rarity Information Update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">
              Please note: The rarity information is preliminary.
              The metadata has not yet been updated with final rarity stats.
              Stay tuned for updates!
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default RaritiesTable;
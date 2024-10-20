import React from 'react';
import TraitsTable from './TraitsTable';
import RaritiesTable from './RaritiesTable';
import './TraitsAndRarities.css'; // Import the CSS file for styles

function TraitsAndRarities() {
  return (
    <div className="traits-rarities-container">
      <TraitsTable />
      <RaritiesTable />
    </div>
  );
}

export default TraitsAndRarities;

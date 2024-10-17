import React from 'react';
import './Roadmap.css'; // Capital 'R' here too

function Roadmap() {
  return (
    <section id="Roadmap" className="page-content roadmap-content">
      <h2>ROADMAP</h2>
      <div className="roadmap-container">
        <div className="roadmap-item">
          <h3>Phase 1</h3>
          <ul>
            <li>Launch CAPYCLUB NFT collection</li>
            <li>Community building and social media presence</li>
            <li>Initial partnerships and collaborations</li>
          </ul>
        </div>
        <div className="roadmap-item">
          <h3>Phase 2</h3>
          <ul>
            <li>Implement staking mechanism for CAPYCLUB NFTs</li>
            <li>Introduce governance token for DAO</li>
            <li>Expand ecosystem with new features</li>
          </ul>
        </div>
        <div className="roadmap-item">
          <h3>Phase 3</h3>
          <ul>
            <li>Launch CAPYCLUB metaverse integration</li>
            <li>Cross-chain expansion</li>
            <li>Major partnerships and events</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Roadmap;

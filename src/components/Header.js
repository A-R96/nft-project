import React from 'react';

function Header({ onConnectClick }) {
  return (
    <header>
      <div className="header-content">
        <img
          src={`${process.env.PUBLIC_URL}/images/alphabanner.png`}
          alt="CAPYCLUB NFT"
          className="header-logo"
        />
        <nav>
          <ul>
            <li><a href="#description">Description</a></li>
            <li><a href="#traits">Traits</a></li>
            <li><a href="#rarities">Rarities</a></li>
            <li><a href="#sale">Buy NFTs</a></li>
          </ul>
        </nav>
      </div>
      <div className="connect-button-wrapper">
        <radix-connect-button onClick={onConnectClick} />
      </div>
    </header>
  );
}

export default Header;
import React from 'react';

function Header() {
  return (
    <header>
      <div className="header-content">
        <h1>CAPYCLUB NFT</h1>
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
        <radix-connect-button />
      </div>
    </header>
  );
}

export default Header;
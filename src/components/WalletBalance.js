import React from 'react';

function WalletBalance() {
  // In a real application, you would fetch these values from the Radix network
  const xrdBalance = 0; // Placeholder XRD balance (changed to 0)
  const nftBalance = 0; // Placeholder NFT balance

  return (
    <div className="wallet-balance">
      <h2>Wallet Balance</h2>
      <div className="balance-container">
        <div className="balance-item">
          <div className="balance-circle">
            <span className="balance-amount">{xrdBalance}</span>
          </div>
          <span className="balance-label">XRD</span>
        </div>
        <div className="balance-item">
          <div className="balance-circle">
            <span className="balance-amount">{nftBalance}</span>
          </div>
          <span className="balance-label">CAPYCLUB</span>
        </div>
      </div>
    </div>
  );
}

export default WalletBalance;
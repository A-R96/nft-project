import React, { useState, useEffect } from 'react';
import './FetchWallet.css';

function FetchWallet({ accountAddress }) {
  const [xrdBalance, setXrdBalance] = useState(0);
  const [nftBalance, setNftBalance] = useState(0);

  const formatBalance = (balance) => {
    if (balance >= 1000) {
      return (balance / 1000).toFixed(1) + 'K';
    }
    return Math.floor(balance).toString();
  };

  useEffect(() => {
    const fetchBalances = async () => {
      if (!accountAddress) return;

      const xrdAddress = 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc';
      const nftAddress = 'resource_tdx_2_1ngsq69n0tedv03csg4mwt0cnt0jsq3gqz0phylaupmwdgr6jkrx52e';

      try {
        console.log('Fetching balances for account:', accountAddress);
        const response = await fetch('https://stokenet.radixdlt.com/state/entity/details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            addresses: [accountAddress],
            aggregation_level: 'Vault',
          }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        //console.log('API response:', data);

        if (data.items && data.items.length > 0) {
          const accountDetails = data.items[0];
          const fungibleResources = accountDetails.fungible_resources?.items || [];
          const nonFungibleResources = accountDetails.non_fungible_resources?.items || [];

          const xrdResource = fungibleResources.find(r => r.resource_address === xrdAddress);
          const nftResource = nonFungibleResources.find(r => r.resource_address === nftAddress);

          if (xrdResource && xrdResource.vaults.items.length > 0) {
            const newXrdBalance = parseFloat(xrdResource.vaults.items[0].amount);
            setXrdBalance(newXrdBalance);
          }

          const newNftBalance = nftResource ? nftResource.vaults.items[0].total_count : 0;
          setNftBalance(newNftBalance);
        }
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    fetchBalances();
    const intervalId = setInterval(fetchBalances, 10000); // Refresh every 10 seconds

    return () => clearInterval(intervalId);
  }, [accountAddress]);

  return (
    <div className="fetch-wallet">
      <h3>Wallet Balance</h3>
      <div className="balance-container">
        <div className="balance-item">
          <span className="balance-amount">{formatBalance(xrdBalance)}</span>
          <span className="balance-label">XRD</span>
        </div>
        <div className="balance-item">
          <span className="balance-amount">{nftBalance}</span>
          <span className="balance-label">CAPYCLUB</span>
        </div>
      </div>
    </div>
  );
}

export default FetchWallet;

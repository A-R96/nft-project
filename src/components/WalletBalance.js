import React, { useEffect, useState, useCallback } from 'react';
import './WalletBalance.css';

function WalletBalance({ connected, walletData, rdt }) {
  const [xrdBalance, setXrdBalance] = useState(0);
  const [nftBalance, setNftBalance] = useState(0);
  const [error, setError] = useState(null);

  const accountAddress = walletData?.accounts?.[0]?.address || '';
  const accountLabel = walletData?.accounts?.[0]?.label || '';

  const fetchBalances = useCallback(async (address) => {
    const xrdAddress = 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc';
    const nftAddress = 'resource_tdx_2_1nglpgy4kezde7ygh2vtnsyanz6y2jmcs9lwafqapu6kxrsxqy3xxkx';

    try {
      console.log('Fetching balances for account:', address);

      const baseUrl = rdt.gatewayApi.clientConfig.basePath;
      const url = `${baseUrl}/state/entity/details`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addresses: [address],
          aggregation_level: 'Vault',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

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
        setError(null);
      } else {
        console.error('No account data found in the response');
        setError('Failed to fetch account data. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching balances:', error);
      setError('Failed to fetch balances. Please try again.');
    }
  }, [rdt]);

  useEffect(() => {
    let intervalId;

    if (connected && accountAddress && rdt && rdt.gatewayApi) {
      // Fetch balances immediately
      fetchBalances(accountAddress);

      // Set up interval to fetch balances every 30 seconds
      intervalId = setInterval(() => {
        fetchBalances(accountAddress);
      }, 30000); // 30 seconds
    }

    // Clean up function to clear the interval when the component unmounts or dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [connected, accountAddress, rdt, fetchBalances]);

  const formatAddress = (address) => {
    if (address.length <= 14) return address;
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const formatXRDBalance = (balance) => {
    return Math.floor(balance).toLocaleString();
  };

  if (!connected) {
    return <p>Please connect your wallet to view balance.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="wallet-balance">
      <h2>Wallet Balance</h2>
      <div className="account-info">
        <div className="account-label">{accountLabel}</div>
        <div className="account-address">
          <span className="address-label">Connected:</span>
          <span className="address-value">{formatAddress(accountAddress)}</span>
        </div>
      </div>
      <div className="balance-container">
        <div className="balance-item">
          <div className="balance-circle">
            <span className="balance-amount">{formatXRDBalance(xrdBalance)}</span>
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
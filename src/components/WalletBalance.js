import React, { useEffect, useState } from 'react';
import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit';

function WalletBalance({ connected, accountAddress, rdt }) {
  const [xrdBalance, setXrdBalance] = useState(0);
  const [nftBalance, setNftBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('WalletBalance: connected =', connected, 'accountAddress =', accountAddress);
    console.log('WalletBalance: rdt =', rdt);
    console.log('WalletBalance: rdt.gatewayApi =', rdt?.gatewayApi);

    if (connected && accountAddress && rdt && rdt.gatewayApi) {
      fetchBalances(accountAddress);
    } else {
      console.log('Conditions not met for fetching balances:');
      console.log('- connected:', connected);
      console.log('- accountAddress:', accountAddress);
      console.log('- rdt:', !!rdt);
      console.log('- rdt.gatewayApi:', rdt && !!rdt.gatewayApi);
    }
  }, [connected, accountAddress, rdt]);

  async function fetchBalances(address) {
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
      console.log('API Response:', data);

      if (data.items && data.items.length > 0) {
        const accountDetails = data.items[0];
        const fungibleResources = accountDetails.fungible_resources?.items || [];
        const nonFungibleResources = accountDetails.non_fungible_resources?.items || [];

        const xrdResource = fungibleResources.find(r => r.resource_address === xrdAddress);
        const nftResource = nonFungibleResources.find(r => r.resource_address === nftAddress);

        console.log('XRD Resource:', xrdResource);
        console.log('NFT Resource:', nftResource);

        const newXrdBalance = xrdResource ? parseInt(xrdResource.vaults.items[0].amount) / 1e18 : 0;
        const newNftBalance = nftResource ? nftResource.vaults.items[0].total_count : 0;

        setXrdBalance(newXrdBalance);
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
  }

  if (!connected) {
    return <p>Please connect your wallet to view balance.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="wallet-balance">
      <h2>Wallet Balance</h2>
      <p>Connected Account: {accountAddress}</p>
      <div className="balance-container">
        <div className="balance-item">
          <div className="balance-circle">
            <span className="balance-amount">{xrdBalance.toFixed(2)}</span>
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
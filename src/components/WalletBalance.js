import React, { useEffect, useState } from 'react';
import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit';

function WalletBalance({ connected, accountAddress, rdt }) {
  const [xrdBalance, setXrdBalance] = useState(0);
  const [nftBalance, setNftBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('WalletBalance: connected =', connected, 'accountAddress =', accountAddress);
    console.log('WalletBalance: rdt =', rdt);

    async function fetchBalances() {
      console.log('Checking conditions for fetching balances:');
      console.log('- connected:', connected);
      console.log('- accountAddress:', accountAddress);
      console.log('- rdt:', !!rdt);
      console.log('- rdt.api:', rdt && !!rdt.api);
      console.log('- rdt.api.gatewayApi:', rdt && rdt.api && !!rdt.api.gatewayApi);

      if (connected && accountAddress && rdt && rdt.api && rdt.api.gatewayApi) {
        console.log('Fetching balances for account:', accountAddress);

        const xrdAddress = 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc';
        const nftAddress = 'resource_tdx_2_1nglpgy4kezde7ygh2vtnsyanz6y2jmcs9lwafqapu6kxrsxqy3xxkx'; // CAPYCLUB resource address

        try {
          console.log('Making API call to getEntityDetailsVaultAggregated');
          const response = await rdt.api.gatewayApi.state.getEntityDetailsVaultAggregated({
            stateEntityId: accountAddress,
            aggregationLevel: 'Vault',
          });

          console.log('API Response:', response);

          const fungibleResources = response.fungible_resources?.items || [];
          const nonFungibleResources = response.non_fungible_resources?.items || [];

          console.log('Fungible Resources:', fungibleResources);
          console.log('Non-Fungible Resources:', nonFungibleResources);

          const xrdResource = fungibleResources.find(r => r.resource_address === xrdAddress);
          const nftResource = nonFungibleResources.find(r => r.resource_address === nftAddress);

          console.log('XRD Resource:', xrdResource);
          console.log('NFT Resource:', nftResource);

          const newXrdBalance = xrdResource ? parseInt(xrdResource.vaults[0].amount) / 1e18 : 0;
          const newNftBalance = nftResource ? nftResource.vaults[0].items.length : 0;

          console.log('New XRD Balance:', newXrdBalance);
          console.log('New NFT Balance:', newNftBalance);

          setXrdBalance(newXrdBalance);
          setNftBalance(newNftBalance);
          setError(null);
        } catch (error) {
          console.error('Error fetching balances:', error);
          setError('Failed to fetch balances. Please try again.');
        }
      } else {
        console.log('Conditions not met for fetching balances');
        setXrdBalance(0);
        setNftBalance(0);
        setError(null);
      }
    }

    fetchBalances();
  }, [connected, accountAddress, rdt]);

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
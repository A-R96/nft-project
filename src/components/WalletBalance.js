import React, { useEffect, useState } from 'react';
import { rdt } from '../radixConfig';

function WalletBalance({ connected, accountAddress }) {
  const [xrdBalance, setXrdBalance] = useState(0);
  const [nftBalance, setNftBalance] = useState(0);

  useEffect(() => {
    console.log("WalletBalance effect triggered");
    if (connected && accountAddress) {
      const xrdAddress = 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc';
      const nftAddress = 'resource_tdx_2_1nglpgy4kezde7ygh2vtnsyanz6y2jmcs9lwafqapu6kxrsxqy3xxkx'; // CAPYCLUB resource address

      console.log("Fetching balances for account:", accountAddress);
      rdt.api.gatewayApi.state.getEntityDetailsVaultAggregated({
        stateEntityId: accountAddress,
        aggregationLevel: 'Vault',
      }).then(response => {
        console.log("API response:", response);
        const fungibleResources = response.fungible_resources?.items || [];
        const nonFungibleResources = response.non_fungible_resources?.items || [];

        const xrdResource = fungibleResources.find(r => r.resource_address === xrdAddress);
        const nftResource = nonFungibleResources.find(r => r.resource_address === nftAddress);

        const newXrdBalance = xrdResource ? parseInt(xrdResource.vaults[0].amount) / 1e18 : 0;
        const newNftBalance = nftResource ? nftResource.vaults[0].items.length : 0;

        console.log("New balances - XRD:", newXrdBalance, "NFT:", newNftBalance);

        setXrdBalance(newXrdBalance);
        setNftBalance(newNftBalance);
      }).catch(error => {
        console.error('Error fetching balances:', error);
      });
    } else {
      console.log("Wallet not connected or no account address");
      setXrdBalance(0);
      setNftBalance(0);
    }
  }, [connected, accountAddress]);

  return (
    <div className="wallet-balance">
      <h2>Wallet Balance</h2>
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
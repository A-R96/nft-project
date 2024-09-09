import React, { useEffect, useState } from 'react';
import { rdt } from '../radixConfig';

function WalletBalance({ connected, accountAddress }) {
  const [xrdBalance, setXrdBalance] = useState(0);
  const [nftBalance, setNftBalance] = useState(0);

  useEffect(() => {
    if (connected && accountAddress) {
      const xrdAddress = 'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc';
      const nftAddress = 'resource_tdx_2_1nfxxxxxxxxxxcapyclubxxxxxxxxx000999665565xxxxxxxxxtfd2jc'; // Replace with your actual NFT resource address

      rdt.api.dataRequest({
        accounts: {
          address: accountAddress,
          fungible_resources: [{ resource_address: xrdAddress }],
          non_fungible_resources: [{ resource_address: nftAddress }]
        }
      }).subscribe({
        next: (response) => {
          const xrdAmount = response.accounts[0]?.fungible_resources[0]?.amount || '0';
          const nftCount = response.accounts[0]?.non_fungible_resources[0]?.vaults[0]?.items?.length || 0;
          setXrdBalance(parseInt(xrdAmount) / 1e18);
          setNftBalance(nftCount);
        },
        error: (error) => console.error('Error fetching balances:', error)
      });
    }
  }, [connected, accountAddress]);

  // ... rest of the component remains the same
}

export default WalletBalance;
import React, { useState } from 'react';
import { rdt } from '../radixConfig';

function SaleSection({ connected, accountAddress }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 10 ? 10 : value < 1 ? 1 : value);
  };

  const handleBuy = async () => {
    if (!connected) {
      alert('Please connect your wallet first.');
      return;
    }

    const componentAddress = 'component_tdx_2_1cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const methodName = 'buy_nft';

    try {
      const manifest = `
        CALL_METHOD
          Address("${componentAddress}")
          "${methodName}"
          Address("${accountAddress}")
          Decimal("${quantity}")
      `;

      const result = await rdt.sendTransaction({ transactionManifest: manifest });

      console.log('Transaction result:', result);
      alert(`Successfully purchased ${quantity} NFT(s)!`);
    } catch (error) {
      console.error('Transaction error:', error);
      alert('Failed to purchase NFTs. Please try again.');
    }
  };

  return (
    <section id="sale">
      <h2>Buy NFTs</h2>
      <div>
        <label htmlFor="quantity">Quantity (max 10):</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max="10"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <button onClick={handleBuy} disabled={!connected}>Buy Now</button>
    </section>
  );
}

export default SaleSection;
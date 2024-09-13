import React, { useState, useEffect } from 'react';
import { rdt } from '../radixConfig';

function SaleSection({ connected, accountAddress }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);

  const componentAddress = 'component_tdx_2_1cqkgz0jgnrjq2akmpu6e37v7j890yrl05ggxas7f4zxudfw6fwnddw';
  const MAX_AMOUNT = 10;

  useEffect(() => {
    const fetchPrice = async () => {
      if (!rdt.gatewayApi || !rdt.gatewayApi.clientConfig) {
        console.error('Gateway API not available');
        setError('Gateway API not available');
        setLoading(false);
        return;
      }

      try {
        console.log('Attempting to fetch price...');
        const response = await fetch(`${rdt.gatewayApi.clientConfig.basePath}/state/entity/details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            addresses: [componentAddress],
            aggregation_level: 'vault',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data.items && data.items.length > 0) {
          const componentData = data.items[0];
          if (componentData.details && componentData.details.state && componentData.details.state.fields) {
            const priceField = componentData.details.state.fields.find(f => f.field_name === 'price');
            if (priceField && priceField.value) {
              setPrice(priceField.value);
              setLoading(false);
              return;
            }
          }
          console.error('Price not found in component data:', componentData);
        } else {
          console.error('No items found in API response');
        }
        setError('Price not found in component data');
      } catch (err) {
        console.error('Error fetching price:', err);
        setError('Failed to fetch price');
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  useEffect(() => {
    if (price !== null && amount !== '') {
      setTotalPrice((parseFloat(price) * parseInt(amount)).toFixed(2));
    } else {
      setTotalPrice(null);
    }
  }, [price, amount]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= MAX_AMOUNT && !isNaN(parseInt(value)))) {
      setAmount(value);
    }
  };

  const handleAmountBlur = () => {
    if (amount === '' || parseInt(amount) < 1) {
      setAmount(1);
    } else if (parseInt(amount) > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    } else {
      setAmount(parseInt(amount));
    }
  };

  const handleBuy = () => {
    console.log(`Buying ${amount} NFT(s) at ${price} XRD each. Total: ${totalPrice} XRD`);
    // Implement your buy logic here
  };

  const handleSetMaxAmount = () => {
    setAmount(MAX_AMOUNT);
  };

  if (loading) return <div id="sale">Loading...</div>;
  if (error) return <div id="sale">Error: {error}</div>;

  return (
    <div id="sale">
      <h2>BUY NFTs</h2>
      {price && <p>Price: {price} XRD each</p>}
      {connected ? (
        <>
          <div className="amount-input">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              min="1"
              max={MAX_AMOUNT}
              value={amount}
              onChange={handleAmountChange}
              onBlur={handleAmountBlur}
            />
            <button
              onClick={handleSetMaxAmount}
              className="max-button"
            >
              Max
            </button>
          </div>
          {totalPrice && <p>Total Price: {totalPrice} XRD</p>}
          <button onClick={handleBuy} disabled={amount < 1 || amount > MAX_AMOUNT} className="buy-button">Buy NFT</button>
          <p>Maximum: {MAX_AMOUNT} NFTs per transaction</p>
        </>
      ) : (
        <p>Please connect your wallet to buy NFTs</p>
      )}
    </div>
  );
}

export default SaleSection;
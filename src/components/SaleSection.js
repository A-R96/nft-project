import React, { useState, useEffect } from 'react';
import { transactionService } from '../transactionService';
import { rdt } from '../radixConfig';
import { fetchPrice as mockFetchPrice } from '../mockApi';

function SaleSection({ connected, accountAddress, walletData }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);

  const componentAddress = 'component_tdx_2_1cqkgz0jgnrjq2akmpu6e37v7j890yrl05ggxas7f4zxudfw6fwnddw';
  const MAX_AMOUNT = 10;

  useEffect(() => {
    console.log('SaleSection mounted');
    const fetchPrice = async () => {
      console.log('Attempting to fetch price...');
      setLoading(true);
      try {
        const data = await mockFetchPrice();
        console.log('API Response:', data);
        console.log('Fetched price:', data.items[0].price);
        setPrice(data.items[0].price);
        setError(null);
      } catch (error) {
        console.error('Error fetching price:', error);
        setError('Failed to fetch price: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    transactionService.loadRTMTemplate().catch(console.error);
  }, []);

  useEffect(() => {
    console.log('Current price state:', price);
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

  const handleBuy = async () => {
    console.log('Buy button clicked');
    if (!connected || !accountAddress) {
      console.error('Wallet not connected');
      return;
    }

    console.log(`Buying ${amount} NFT(s) at ${price} XRD each. Total: ${totalPrice} XRD`);
    console.log('Account address:', accountAddress);

    try {
      console.log('Calling transactionService.sendTransaction...');
      const transactionResult = await transactionService.sendTransaction(accountAddress, amount, price);

      console.log('Transaction result:', transactionResult);

      // Commenting out the logging purchase info
      // console.log('Logging purchase info:', transactionResult);
      // const logResponse = await fetch('/api/log-purchase', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(transactionResult),
      // });

      // if (!logResponse.ok) {
      //   throw new Error('Failed to log purchase');
      // }

      // console.log('Purchase logged successfully');
    } catch (error) {
      console.error('Error processing purchase:', error);
      setError('Error processing purchase: ' + error.message);
    }
  };

  const handleSetMaxAmount = () => {
    setAmount(MAX_AMOUNT);
  };

  if (loading) return <div id="sale">Loading...</div>;
  if (error) return <div id="sale">Error: {error}</div>;

  console.log('Rendering SaleSection. Connected:', connected, 'Address:', accountAddress);

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
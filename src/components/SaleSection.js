import React, { useState, useEffect } from 'react';
import { transactionService } from '../transactionService';

function SaleSection({ connected, accountAddress, walletData }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);
  const [buySuccess, setBuySuccess] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [remainingNFTs, setRemainingNFTs] = useState(0);

  const TOTAL_NFTS = 243;
  const componentAddress = 'component_tdx_2_1czaht2c3zpwx2aappaeu6nj8puy5u3mt6z802txf29a2j62r99vs9s';
  const MAX_AMOUNT = 10;

  useEffect(() => {
    fetchComponentState();
  }, []);

  useEffect(() => {
    if (price !== null && amount !== '') {
      setTotalPrice((parseFloat(price) * parseInt(amount)).toFixed(2));
    } else {
      setTotalPrice(null);
    }
  }, [price, amount]);

  const fetchComponentState = async () => {
    setLoading(true);
    try {
      console.log('Attempting to fetch component state...');
      const response = await fetch('https://stokenet.radixdlt.com/state/entity/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addresses: [componentAddress],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.items && data.items.length > 0) {
        const componentState = data.items[0].details.state;
        console.log('Component State:', componentState);

        const priceField = componentState.fields.find(field => field.field_name === 'price');
        if (priceField && priceField.value) {
          const fetchedPrice = priceField.value;
          console.log('Fetched Price:', fetchedPrice);

          setPrice(fetchedPrice);
          setTotalPrice((parseFloat(fetchedPrice) * amount).toFixed(2));
        } else {
          throw new Error('Price not found in component state');
        }

        // Get remaining NFTs
        const nftResource = data.items[0].non_fungible_resources.items[0];
        if (nftResource && nftResource.amount) {
          setRemainingNFTs(parseInt(nftResource.amount));
        }
      } else {
        throw new Error('Component state not found');
      }
    } catch (err) {
      console.error('Error fetching component state:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      setTransactionStatus('Wallet not connected. Please connect your wallet.');
      return;
    }

    console.log(`Buying ${amount} NFT(s) at ${price} XRD each. Total: ${totalPrice} XRD`);
    console.log('Account address:', accountAddress);

    try {
      setTransactionStatus('Processing transaction...');
      console.log('Calling transactionService.sendTransaction...');
      const transactionResult = await transactionService.sendTransaction(accountAddress, amount, price);

      console.log('Transaction result:', transactionResult);

      setBuySuccess(true);
      setTransactionStatus('Transaction successful!');
      setTimeout(() => {
        setBuySuccess(false);
        setTransactionStatus(null);
      }, 5000); // Clear the message after 5 seconds

    } catch (error) {
      console.error('Error processing purchase:', error);
      if (error.message === 'Transaction rejected by user') {
        setTransactionStatus('Transaction rejected by user. Please try again if you want to proceed.');
      } else {
        setTransactionStatus('Transaction failed. Please try again.');
      }
      setTimeout(() => {
        setTransactionStatus(null);
      }, 5000); // Clear the error message after 5 seconds
    }
  };

  const handleSetMaxAmount = () => {
    setAmount(MAX_AMOUNT);
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    backgroundColor: buySuccess ? '#4CAF50' : '#6c87e7',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  };

  const soldPercentage = ((TOTAL_NFTS - remainingNFTs) / TOTAL_NFTS) * 100;

  const progressBarStyle = {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    margin: '10px 0'
  };

  const progressStyle = {
    width: `${soldPercentage}%`,
    backgroundColor: '#4CAF50',
    height: '24px',
    borderRadius: '5px',
    textAlign: 'center',
    lineHeight: '24px',
    color: 'white'
  };

  if (loading) return <div id="sale">Loading...</div>;
  if (error) return <div id="sale">Error: {error}</div>;

  return (
    <div id="sale">
      <h2>BUY NFTs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div style={progressBarStyle}>
            <div style={progressStyle}>
              {soldPercentage.toFixed(1)}% Sold
            </div>
          </div>
          <p>Remaining NFTs: {remainingNFTs} out of {TOTAL_NFTS}</p>
          <p>Price per NFT: {price !== null ? `${price} XRD` : 'N/A'}</p>
          <p>Total Price: {totalPrice !== null ? `${totalPrice} XRD` : 'N/A'}</p>
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
          <button
            onClick={handleBuy}
            disabled={amount < 1 || amount > MAX_AMOUNT || !connected}
            style={buttonStyle}
          >
            {buySuccess ? 'Buy Successful!' : 'Buy NFT'}
          </button>
          {transactionStatus && <p className="transaction-status">{transactionStatus}</p>}
          <p>Maximum: {MAX_AMOUNT} NFTs per transaction</p>
        </>
      )}
    </div>
  );
}

export default SaleSection;
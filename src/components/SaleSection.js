import React, { useState, useEffect } from 'react';
import { transactionService } from '../transactionService';

// New component for the progress bar and remaining NFTs count
function NFTProgress({ remainingNFTs, totalNFTs }) {
  const soldPercentage = ((totalNFTs - remainingNFTs) / totalNFTs) * 100;

  const progressBarContainerStyle = {
    width: '90%',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    margin: '10px auto',
    height: '20px',
    position: 'relative',
    overflow: 'hidden'
  };

  const progressBarFillStyle = {
    width: `${soldPercentage}%`,
    backgroundColor: '#4CAF50',
    height: '100%',
    borderRadius: '10px',
    position: 'absolute',
    left: 0,
    top: 0,
    transition: 'width 0.5s ease-in-out'
  };

  const progressTextStyle = {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#000',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
    fontSize: '14px'
  };

  return (
    <div style={progressBarContainerStyle}>
      <div style={progressBarFillStyle}></div>
      <div style={progressTextStyle}>
        {soldPercentage.toFixed(1)}%
      </div>
    </div>
  );
}

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
    const interval = setInterval(fetchComponentState, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (price !== null && amount !== '') {
      setTotalPrice((parseFloat(price) * parseInt(amount)).toFixed(2));
    } else {
      setTotalPrice(null);
    }
  }, [price, amount]);

  const fetchComponentState = async () => {
    try {
      const response = await fetch('https://stokenet.radixdlt.com/state/entity/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresses: [componentAddress] }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const componentState = data.items[0].details.state;
        const priceField = componentState.fields.find(field => field.field_name === 'price');
        if (priceField && priceField.value) {
          setPrice(priceField.value);
          setTotalPrice((parseFloat(priceField.value) * amount).toFixed(2));
        }

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
    console.log('SaleSection: Connected status:', connected);
    console.log('SaleSection: Account address:', accountAddress);

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
      setAmount(1); // Reset amount to 1 after successful purchase
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
          <NFTProgress remainingNFTs={remainingNFTs} totalNFTs={TOTAL_NFTS} />
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
          <p>Max: {MAX_AMOUNT} per TX</p>
        </>
      )}
    </div>
  );
}

export default SaleSection;
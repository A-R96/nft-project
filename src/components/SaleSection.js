import React, { useState, useEffect } from 'react';
import { transactionService } from '../transactionService';

// New component for the progress bar and remaining NFTs count
function NFTProgress({ remainingNFTs, totalNFTs }) {
  const soldPercentage = ((totalNFTs - remainingNFTs) / totalNFTs) * 100;

  const progressBarContainerStyle = {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    margin: '20px 0',
    height: '30px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2) inset'
  };

  const progressBarFillStyle = {
    width: `${soldPercentage}%`,
    background: 'linear-gradient(90deg, #6c87e7 0%, #4CAF50 100%)',
    height: '100%',
    borderRadius: '20px',
    position: 'absolute',
    left: 0,
    top: 0,
    transition: 'width 0.5s ease-in-out',
    boxShadow: '0 0 10px rgba(108, 135, 231, 0.7)'
  };

  const progressTextStyle = {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#ffffff',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
    fontSize: '14px',
    zIndex: 1
  };

  return (
    <div>
      <div style={progressBarContainerStyle}>
        <div style={progressBarFillStyle}></div>
        <div style={progressTextStyle}>
          {soldPercentage.toFixed(1)}%
        </div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '10px', color: '#ffffff' }}>
        {remainingNFTs} / {totalNFTs} NFTs remaining
      </p>
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
  const [isWalletLoading, setIsWalletLoading] = useState(true);

  const TOTAL_NFTS = 249;
  const componentAddress = 'component_tdx_2_1crkgyn5vtdc2j83n8tjmt2xp35tgx8ra5uh5eauqtm87fg7pvcvleh';
  const MAX_AMOUNT = 10;

  useEffect(() => {
    console.log('SaleSection: Connected status:', connected);
    console.log('SaleSection: Account address:', accountAddress);
    console.log('SaleSection: Wallet data:', walletData);

    if (connected && accountAddress) {
      fetchComponentState();
      const interval = setInterval(fetchComponentState, 20000);
      return () => clearInterval(interval);
    }
  }, [connected, accountAddress]);

  useEffect(() => {
    if (price !== null && amount !== '') {
      setTotalPrice((parseFloat(price) * parseInt(amount)).toFixed(2));
    } else {
      setTotalPrice(null);
    }
  }, [price, amount]);

  useEffect(() => {
    if (walletData !== null) {
      setIsWalletLoading(false);
    }
  }, [walletData]);

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
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: buySuccess ? '#4CAF50' : '#6c87e7',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: buySuccess ? '#45a049' : '#5a73d8',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  };

  const maxButtonStyle = {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '20px',
    marginLeft: '10px',
    outline: 'none',
  };

  const maxButtonHoverStyle = {
    ...maxButtonStyle,
    backgroundColor: '#e0e0e0',
    transform: 'translateY(-1px)',
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isMaxHovered, setIsMaxHovered] = useState(false);

  if (!connected || !accountAddress) {
    return <div id="sale">Please connect your wallet to buy NFTs.</div>;
  }

  if (isWalletLoading) {
    return <div id="sale">Waiting for wallet connection...</div>;
  }

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
          <div className="amount-input-container">
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
                style={isMaxHovered ? maxButtonHoverStyle : maxButtonStyle}
                onMouseEnter={() => setIsMaxHovered(true)}
                onMouseLeave={() => setIsMaxHovered(false)}
              >
                Max
              </button>
            </div>
          </div>
          <div className="buy-button-container">
            <button
              onClick={handleBuy}
              disabled={amount < 1 || amount > MAX_AMOUNT || !connected}
              style={isHovered ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {buySuccess ? 'Success!' : 'Buy Now'}
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isHovered ? '300px' : '0',
                  height: isHovered ? '300px' : '0',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  transition: 'all 0.5s ease',
                }}
              />
            </button>
          </div>
          {transactionStatus && <p>{transactionStatus}</p>}
        </>
      )}
    </div>
  );
}

export default SaleSection;

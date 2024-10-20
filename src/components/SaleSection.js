import React, { useState, useEffect } from 'react';
import { transactionService } from '../transactionService';
import './SaleSection.css';

// New component for the progress bar and remaining NFTs count
function NFTProgress({ remainingNFTs, totalNFTs }) {
  const soldPercentage = ((totalNFTs - remainingNFTs) / totalNFTs) * 100;

  return (
    <div>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${soldPercentage}%` }}></div>
        <div className="progress-text">
          {soldPercentage.toFixed(1)}%
        </div>
      </div>
      <p className="nft-remaining">
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

  const [isHovered, setIsHovered] = useState(false);

  if (!connected || !accountAddress) {
    return <div id="sale">Please connect your wallet to buy NFTs.</div>;
  }

  if (isWalletLoading) {
    return <div id="sale">Waiting for wallet connection...</div>;
  }

  if (loading) return <div id="sale">Loading...</div>;
  if (error) return <div id="sale">Error: {error}</div>;

  return (
    <section id="sale" className="page-content sale-content">
      <div className="sale-container">
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
                  className="max-button"
                >
                  Max
                </button>
              </div>
            </div>
            <div className="buy-button-container">
              <button
                onClick={handleBuy}
                disabled={amount < 1 || amount > MAX_AMOUNT || !connected}
                className={`buy-button ${buySuccess ? 'buy-button-success' : 'buy-button-normal'} ${isHovered ? 'buy-button-hover' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {buySuccess ? 'Success!' : 'Buy Now'}
                <span className="buy-button-ripple" />
              </button>
            </div>
            {transactionStatus && <p>{transactionStatus}</p>}
          </>
        )}
      </div>
    </section>
  );
}

export default SaleSection;

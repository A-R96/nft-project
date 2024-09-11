import React, { useEffect, useState, useCallback } from 'react';
import { DataRequestBuilder } from "@radixdlt/radix-dapp-toolkit";
import { initBackToTop } from './BackToTop';
import Header from './components/Header';
import ProjectDescription from './components/ProjectDescription';
import TraitsTable from './components/TraitsTable';
import RaritiesTable from './components/RaritiesTable';
import SaleSection from './components/SaleSection';
import WalletBalance from './components/WalletBalance';
import ImageBanner from './components/ImageBanner';
import { rdt } from './radixConfig';
import './App.css';

function App() {
  const [walletData, setWalletData] = useState(null);

  const updateWalletData = useCallback(async () => {
    try {
      const data = await rdt.walletApi.getWalletData();
      console.log('App: Wallet data fetched:', data);
      setWalletData(data);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  }, []);

  useEffect(() => {
    rdt.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1));

    const subscription = rdt.walletApi.walletData$.subscribe({
      next: (data) => {
        console.log('App: Wallet data updated:', data);
        setWalletData(data);
      },
      error: (error) => console.error("Wallet data subscription error:", error),
    });

    console.log('App: Initial wallet data check...');
    updateWalletData();

    initBackToTop();

    return () => subscription.unsubscribe();
  }, [updateWalletData]);

  const handleConnectClick = useCallback(async () => {
    try {
      console.log('App: Connecting wallet...');
      await rdt.walletApi.connect();
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  }, []);

  console.log('App: Rendering with walletData =', walletData);

  const connected = walletData && walletData.accounts && walletData.accounts.length > 0;
  const accountAddress = connected ? walletData.accounts[0].address : '';

  console.log('App: connected =', connected, 'accountAddress =', accountAddress);

  return (
    <div className="App">
      <Header onConnectClick={handleConnectClick} />
      <main>
        <div className="content-wrapper">
          <ProjectDescription />
          <div className="tables-container">
            <TraitsTable />
            <RaritiesTable />
          </div>
          <SaleSection connected={connected} accountAddress={accountAddress} />
          <WalletBalance connected={connected} walletData={walletData} rdt={rdt} />
          <ImageBanner />
        </div>
      </main>
      <button id="back-to-top" aria-label="Back to top">↑</button>
    </div>
  );
}

export default App;
import React, { useEffect, useState, useCallback } from 'react';
import { DataRequestBuilder } from "@radixdlt/radix-dapp-toolkit";
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
  const [rdtInitialized, setRdtInitialized] = useState(false);

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
    const initializeRdt = async () => {
      // Wait for rdt to be fully initialized
      while (!rdt.gatewayApi) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setRdtInitialized(true);
    };

    initializeRdt();

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

    return () => subscription.unsubscribe();
  }, [updateWalletData]);

  const handleConnectClick = async () => {
    console.log('App: Connecting wallet...');
    try {
      if (rdt && rdt.walletApi) {
        // Check if the connect method exists
        if (typeof rdt.walletApi.connect === 'function') {
          await rdt.walletApi.connect();
        } else if (typeof rdt.walletApi.requestWalletConnection === 'function') {
          // Try the alternative method if available
          await rdt.walletApi.requestWalletConnection();
        } else {
          console.error('Wallet connection method not found');
        }
      } else {
        console.error('Radix DApp Toolkit not properly initialized');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const connected = walletData && walletData.accounts && walletData.accounts.length > 0;
  const accountAddress = connected ? walletData.accounts[0].address : '';

  console.log('App: Rendering with walletData =', walletData);
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
          <WalletBalance connected={connected} walletData={walletData} rdt={rdt} />
          <SaleSection
            connected={connected}
            accountAddress={accountAddress}
            rdt={rdt}
          />
          <ImageBanner />
        </div>
      </main>
    </div>
  );
}

export default App;
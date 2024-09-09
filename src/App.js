import React, { useEffect, useState } from 'react';
import { DataRequestBuilder } from "@radixdlt/radix-dapp-toolkit";
import { initBackToTop } from './BackToTop';
import Header from './components/Header';
import ProjectDescription from './components/ProjectDescription';
import TraitsTable from './components/TraitsTable';
import RaritiesTable from './components/RaritiesTable';
import SaleSection from './components/SaleSection';
import WalletBalance from './components/WalletBalance';
import Background from './components/Background';
import ImageBanner from './components/ImageBanner';
import { rdt } from './radixConfig';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');

  useEffect(() => {
    rdt.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1));

    const subscription = rdt.walletApi.walletData$.subscribe({
      next: (walletData) => {
        setConnected(walletData.connected);
        if (walletData.connected && walletData.accounts.length > 0) {
          setAccountAddress(walletData.accounts[0].address);
        } else {
          setAccountAddress('');
        }
      },
      error: (error) => console.error("Wallet data subscription error:", error),
    });

    initBackToTop();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <Background />
      <Header />
      <main>
        <div className="content-wrapper">
          <ProjectDescription />
          <div className="tables-container">
            <TraitsTable />
            <RaritiesTable />
          </div>
          <SaleSection connected={connected} accountAddress={accountAddress} />
          <WalletBalance connected={connected} accountAddress={accountAddress} />
          <ImageBanner />
        </div>
      </main>
      <button id="back-to-top" aria-label="Back to top">↑</button>
    </div>
  );
}

export default App;
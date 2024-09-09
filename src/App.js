import React, { useEffect, useState } from 'react';
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
    initBackToTop();

    const updateWalletState = async () => {
      const state = rdt.walletApi.getWalletData();
      console.log("Wallet state:", state);

      if (state.connected) {
        try {
          const accounts = await rdt.requestAccounts();
          console.log("Requested accounts:", accounts);
          if (accounts && accounts.length > 0) {
            setConnected(true);
            setAccountAddress(accounts[0].address);
            console.log("Connected account:", accounts[0].address);
          } else {
            setConnected(false);
            setAccountAddress('');
            console.log("No accounts shared");
          }
        } catch (error) {
          console.error("Error requesting accounts:", error);
          setConnected(false);
          setAccountAddress('');
        }
      } else {
        setConnected(false);
        setAccountAddress('');
        console.log("Wallet disconnected");
      }
    };

    // Initial update
    updateWalletState();

    // Set up interval to check wallet state periodically
    const intervalId = setInterval(updateWalletState, 1000);

    // Clean up interval
    return () => clearInterval(intervalId);
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
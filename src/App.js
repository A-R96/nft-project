import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { DataRequestBuilder } from "@radixdlt/radix-dapp-toolkit";
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/roadmap';
import Header from './components/Header';
import TraitsTable from './components/TraitsTable';
import RaritiesTable from './components/RaritiesTable';
import SaleSection from './components/SaleSection';
import WalletBalance from './components/WalletBalance';
import ImageBanner from './components/ImageBanner';
import { rdt } from './radixConfig';
import './App.css';
import { FaInstagram, FaXTwitter, FaTelegram } from 'react-icons/fa6';

function MainContent() {
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
    <>
      <div className="button-container">
        <button className="main-button battle">Battle</button>
        <button className="main-button mint">Mint</button>
      </div>
      {/* Temporary placeholder div */}
      <div style={{ height: '100%', width: '100%' }}></div>
    </>
  );
}

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTokenomicsPage = location.pathname === '/tokenomics';

  return (
    <div className={`App ${isTokenomicsPage ? 'tokenomics-page' : ''}`}>
      <div className={`content-wrapper ${isTokenomicsPage ? 'no-background' : ''}`}>
        <nav className="nav-menu">
          {!isHomePage && <Link to="/">Home</Link>}
          <Link to="/about">About</Link>
          <Link to="/tokenomics">Tokenomics</Link>
          <Link to="/roadmap">Roadmap</Link>
        </nav>

        {!isTokenomicsPage && (
          <>
            <div className="radix-connect-button-container">
              <radix-connect-button />
            </div>
            {isHomePage && (
              <img src={process.env.PUBLIC_URL + '/images/title.png'} alt="CAPYCLUB" className="title-overlay" />
            )}
            <div className="social-buttons">
              <a href="#" className="social-button twitter">
                <FaXTwitter />
              </a>
              <a href="#" className="social-button telegram">
                <FaTelegram />
              </a>
              <a href="#" className="social-button instagram">
                <FaInstagram />
              </a>
            </div>
          </>
        )}

        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<About />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

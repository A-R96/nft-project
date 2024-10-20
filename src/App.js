import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { DataRequestBuilder } from "@radixdlt/radix-dapp-toolkit";
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import SaleSection from './components/SaleSection';
import WalletBalance from './components/WalletBalance';
import { rdt } from './radixConfig';
import './App.css';
import { FaInstagram, FaXTwitter, FaTelegram } from 'react-icons/fa6';
import Battle from './components/Battle';
import TraitsAndRarities from './components/TraitsAndRarities';
import { RadixProvider, useRadix } from './RadixContext';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/nft-project';
  const isTokenomicsPage = location.pathname === '/tokenomics';
  const navigate = useNavigate();
  const rdt = useRadix();
  const [walletData, setWalletData] = useState(null);
  const [rdtInitialized, setRdtInitialized] = useState(false);

  const updateWalletData = useCallback(async () => {
    if (!rdt || !rdt.walletApi) return;
    try {
      const data = await rdt.walletApi.getWalletData();
      console.log('App: Wallet data fetched:', data);
      setWalletData(data);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  }, [rdt]);

  useEffect(() => {
    const initializeRdt = async () => {
      if (!rdt) return;
      while (!rdt.gatewayApi) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setRdtInitialized(true);
    };

    initializeRdt();

    if (rdt && rdt.walletApi) {
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
    }
  }, [rdt, updateWalletData]);

  const connected = walletData && walletData.accounts && walletData.accounts.length > 0;
  const accountAddress = connected ? walletData.accounts[0].address : '';

  console.log('App: Rendering with walletData =', walletData);
  console.log('App: connected =', connected, 'accountAddress =', accountAddress);

  return (
    <div className={`App ${isTokenomicsPage ? 'tokenomics-page' : ''}`}>
      <div className={`content-wrapper ${isTokenomicsPage ? 'no-background' : ''} ${location.pathname === '/sale' ? 'sale-background' : ''}`}>
        <nav className="nav-menu">
          {!isHomePage && <Link to="/">Home</Link>}
          <Link to="/about">About</Link>
          <Link to="/tokenomics">Tokenomics</Link>
          <Link to="/roadmap">Roadmap</Link>
          <Link to="/traits-and-rarities">Traits & Rarities</Link>
        </nav>

        <div className="scrollable-content">
          <div className="radix-connect-button-container">
            <radix-connect-button />
          </div>

          {isHomePage && (
            <>
              <img src={process.env.PUBLIC_URL + '/images/title.png'} alt="CAPYCLUB" className="title-overlay" />
              <div className="button-container">
                <button className="main-button battle" onClick={() => navigate('/battle')}>Battle</button>
                <button className="main-button mint" onClick={() => navigate('/sale')}>Mint</button>
              </div>
            </>
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

          <Routes>
            <Route path="/" element={null} />
            <Route path="/nft-project" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<div className="content-wrapper about-background"><About /></div>} />
            <Route path="/tokenomics" element={<div className="content-wrapper tokenomics-background"><Tokenomics /></div>} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/traits-and-rarities" element={<TraitsAndRarities />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/sale" element={
              <SaleSection
                connected={connected}
                accountAddress={accountAddress}
                walletData={walletData}
              />
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <RadixProvider>
        <App />
      </RadixProvider>
    </Router>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import {
  DataRequestBuilder,
  RadixDappToolkit,
  RadixNetwork,
} from "@radixdlt/radix-dapp-toolkit";
import { initBackToTop } from './BackToTop';
import Header from './components/Header';
import ProjectDescription from './components/ProjectDescription';
import TraitsTable from './components/TraitsTable';
import RaritiesTable from './components/RaritiesTable';
import SaleSection from './components/SaleSection';
import WalletBalance from './components/WalletBalance';
import Background from './components/Background';
import ImageBanner from './components/ImageBanner';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [rdt, setRdt] = useState(null);

  const requestAccountSharing = useCallback(async () => {
    if (rdt) {
      try {
        const result = await rdt.requestAccounts({
          quantifier: 'atLeast',
          quantity: 1
        });
        if (result.isOk() && result.accounts && result.accounts.length > 0) {
          setConnected(true);
          setAccountAddress(result.accounts[0].address);
          console.log("Connected account:", result.accounts[0].address);
          return result.accounts[0].address;
        } else {
          console.log("No accounts shared");
          setConnected(false);
          setAccountAddress('');
          return null;
        }
      } catch (error) {
        console.error("Error requesting account sharing:", error);
        setConnected(false);
        setAccountAddress('');
        return null;
      }
    }
  }, [rdt]);

  useEffect(() => {
    // Create a dapp configuration object for the Radix Dapp Toolkit
    const dappConfig = {
      networkId: RadixNetwork.Stokenet,
      applicationVersion: "1.0.0",
      applicationName: "CAPYCLUB NFT",
      applicationDappDefinitionAddress: "account_tdx_2_128zd40ju66fndr232gj7ehsdk82y4xkkpm6eecamm4mf3rdn7n5akm",
    };
    // Instantiate DappToolkit
    const radixDappToolkit = RadixDappToolkit(dappConfig);
    setRdt(radixDappToolkit);

    // Set up data request
    radixDappToolkit.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1));

    // Clean up
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  useEffect(() => {
    if (!rdt) return;

    initBackToTop();

    const checkConnectionAndRequestData = () => {
      const walletData = rdt.walletApi.getWalletData();
      if (walletData.connected) {
        if (!connected || walletData.accounts.length === 0) {
          requestAccountSharing();
        } else if (walletData.accounts.length > 0 && walletData.accounts[0].address !== accountAddress) {
          setConnected(true);
          setAccountAddress(walletData.accounts[0].address);
        }
      } else if (connected) {
        console.log("Wallet disconnected");
        setConnected(false);
        setAccountAddress('');
      }
    };

    // Initial check
    checkConnectionAndRequestData();

    // Set up subscription to wallet data changes
    const subscription = rdt.walletApi.walletData$.subscribe({
      next: checkConnectionAndRequestData,
      error: (error) => console.error("Wallet data subscription error:", error),
    });

    // Clean up subscription
    return () => subscription.unsubscribe();
  }, [rdt, connected, accountAddress, requestAccountSharing]);

  const handleConnectClick = useCallback(async () => {
    if (!connected) {
      await requestAccountSharing();
    } else {
      console.log("Already connected. Account:", accountAddress);
    }
  }, [connected, accountAddress, requestAccountSharing]);

  return (
    <div className="App">
      <Background />
      <Header onConnectClick={handleConnectClick} />
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
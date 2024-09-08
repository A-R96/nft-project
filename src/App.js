import React, { useEffect } from 'react';
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
  useEffect(() => {
    initBackToTop();
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
          <SaleSection />
          <WalletBalance />
          <ImageBanner /> {/* Moved here */}
        </div>
      </main>
      <button id="back-to-top" aria-label="Back to top">↑</button>
    </div>
  );
}

export default App;
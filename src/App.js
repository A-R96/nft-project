import React from 'react';
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
        </div>
      </main>
      <ImageBanner />
    </div>
  );
}

export default App;
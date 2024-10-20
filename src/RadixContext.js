import React, { createContext, useContext, useState, useEffect } from 'react';
import { rdt } from './radixConfig';

const RadixContext = createContext(null);

export function RadixProvider({ children }) {
  const [radixApi, setRadixApi] = useState(null);

  useEffect(() => {
    const initializeRadix = async () => {
      // Wait for the gatewayApi to be available
      while (!rdt.gatewayApi) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setRadixApi(rdt);
    };

    initializeRadix();
  }, []);

  return (
    <RadixContext.Provider value={radixApi}>
      {children}
    </RadixContext.Provider>
  );
}

export function useRadix() {
  const context = useContext(RadixContext);
  if (context === undefined) {
    throw new Error('useRadix must be used within a RadixProvider');
  }
  return context;
}

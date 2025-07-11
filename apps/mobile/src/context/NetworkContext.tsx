import React, { createContext, useContext, ReactNode } from 'react';

export interface NetworkContextType {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string | null;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export interface NetworkProviderProps {
  children: ReactNode;
  networkState: NetworkContextType;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ 
  children, 
  networkState 
}) => {
  return (
    <NetworkContext.Provider value={networkState}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkContext = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetworkContext must be used within a NetworkProvider');
  }
  return context;
};

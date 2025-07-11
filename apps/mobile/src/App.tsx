import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CreateOrder } from './screens';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { NetworkProvider } from './context/NetworkContext';

function App() {
  const networkState = useNetworkStatus();

  return (
    <SafeAreaProvider>
      <NetworkProvider networkState={networkState}>
        <CreateOrder />
      </NetworkProvider>
    </SafeAreaProvider>
  );
}

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { NetworkProvider } from './context/NetworkContext';
import { RootNavigator } from './navigation';

function App() {
  const networkState = useNetworkStatus();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NetworkProvider networkState={networkState}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </NetworkProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

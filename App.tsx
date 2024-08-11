import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Views
import { Navigator } from './src/components/Navigator/Navigator';

// Context Providers
import { GeneralContextProvider } from './src/contexts/GeneralContext';

export default function App() {
  return (
    <GeneralContextProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </GeneralContextProvider>
  );
}

import { StyleSheet, Text, View } from 'react-native';

// Views
import { RegisterPage } from './src/views/RegisterPage/RegisterPage';

// Context Providers
import { GeneralContextProvider } from './src/contexts/GeneralContext';

export default function App() {
  return (
    <GeneralContextProvider>
      <Text>hola</Text>
      <Text>hola</Text>
      <Text>hola</Text>
      <RegisterPage></RegisterPage>
    </GeneralContextProvider>
  );
}

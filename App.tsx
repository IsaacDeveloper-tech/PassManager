import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import { AddPasswordScreen } from './screens/AddPasswordScreen';
import { EditPasswordScreen } from './screens/EditPasswordScreen';
import { ViewPasswordScreen } from './screens/ViewPasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPassword" component={AddPasswordScreen} />
        <Stack.Screen name="EditPassword" component={EditPasswordScreen} />
        <Stack.Screen name="ViewPassword" component={ViewPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

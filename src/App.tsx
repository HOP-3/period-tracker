import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './navigation/AppNavigator';
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

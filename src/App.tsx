import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './navigation/AppNavigator';
import {AuthProvider} from './providers/AuthProvider';
import {Provider} from './providers/Provider';
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AuthProvider>
          <Provider>
            <AppNavigator />
          </Provider>
        </AuthProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './navigation/AppNavigator';
import {AuthProvider} from './providers/AuthProvider';
import {Provider} from './providers/Provider';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
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

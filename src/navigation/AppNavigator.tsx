/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTabs from '../navigation/BottomTabs';
import LoginScreen from '../screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnBoarding} from '../screens';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{header: () => <Header icon={false} />}}
        />
        <Stack.Screen
          name="Content"
          component={BottomTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

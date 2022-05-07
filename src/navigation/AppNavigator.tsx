import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTabs from '../navigation/BottomTabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator initialRouteName="Content">
        <Stack.Screen
          name="Content"
          component={BottomTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

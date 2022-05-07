import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../screens/types';
import BottomTabs from '../navigation/BottomTabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const AppNavigator = () => {
  const navigation = useNavigation<NavigationProps>();
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

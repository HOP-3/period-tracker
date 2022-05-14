/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTabs from '../navigation/BottomTabs';
import LoginScreen from '../screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnBoarding} from '../screens';
import Header from '../components/Header';
import {ProfileScreen} from '../screens/ProfileScreen';
import {NotificationScreen} from '../screens/NotificationScreen';
import BackButton from '../assets/svgs/backButton.svg';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const navigation = useNavigation<any>();
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
          options={{
            header: () => <Header icon={false} />,
          }}
        />
        <Stack.Screen
          name="Content"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: 'Профайл',
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <BackButton height={30} width={30} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerTitle: 'Мэдэгдэл',
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <BackButton height={30} width={30} />
              </Pressable>
            ),
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomTabs from '../navigation/BottomTabs';
import LoginScreen from '../screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Action, OnBoarding} from '../screens';
import Header from '../components/Header';
import {ProfileScreen} from '../screens/ProfileScreen';
import {NotificationScreen} from '../screens/NotificationScreen';
import BackButton from '../assets/svgs/backButton.svg';
import {Dimensions, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Context} from '../providers/Provider';

const Stack = createNativeStackNavigator();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const AppNavigator = () => {
  const navigation = useNavigation<any>();
  const {modalBackground, setModalBackground, firstTime} = useContext(Context);
 
  return (
    <SafeAreaView style={{flex: 1}}>
      {modalBackground && (
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: height,
            width: width,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 5,
          }}
          onPress={() => setModalBackground(false)}
        />
      )}
      <Stack.Navigator initialRouteName={firstTime ? 'OnBoarding' : 'Content'}>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Action"
          component={Action}
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

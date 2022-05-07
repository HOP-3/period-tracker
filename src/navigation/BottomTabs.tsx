import React from 'react';
import {StyleSheet} from 'react-native';
import {Home, Calendar, Information} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: {height: 50, paddingBottom: 0},
      })}>
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Information" component={Information} />
    </Tab.Navigator>
  );
};
export default BottomTabs;

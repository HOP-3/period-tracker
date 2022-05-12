import React from 'react';
import {Theme} from '../components/theme';
import Header from '../components/Header';
import HomeIcon from '../assets/svgs/home.svg';
import HomeFilledIcon from '../assets/svgs/homeFilled.svg';
import CalendarIcon from '../assets/svgs/calendar.svg';
import CalendarFilledIcon from '../assets/svgs/calendarFilled.svg';
import InformationIcon from '../assets/svgs/information.svg';
import InformationFilledIcon from '../assets/svgs/informationFilled.svg';
import {HomeScreen, InformationScreen, CalendarScreen} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: {height: 50, paddingBottom: 0},
        tabBarActiveTintColor: Theme.palette.calendar.red,
        tabBarIcon: ({focused}) => {
          return (
            <>
              {route.name === 'Цаглабар' &&
                (focused ? <CalendarFilledIcon /> : <CalendarIcon />)}
              {route.name === 'Нүүр' &&
                (focused ? <HomeFilledIcon /> : <HomeIcon />)}
              {route.name === 'Зөвлөгөө' &&
                (focused ? <InformationFilledIcon /> : <InformationIcon />)}
            </>
          );
        },
      })}>
      <Tab.Screen
        name="Цаглабар"
        component={CalendarScreen}
        options={{header: () => <Header />}}
      />
      <Tab.Screen
        name="Нүүр"
        component={HomeScreen}
        options={{header: () => <Header />}}
      />
      <Tab.Screen
        name="Зөвлөгөө"
        component={InformationScreen}
        options={{header: () => <Header />}}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;

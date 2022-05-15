import React, {useState, useEffect} from 'react';
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

const notifications: string[] = [];

const BottomTabs = () => {
  const [haveNotification, setHaveNotification] = useState<boolean>(false);

  useEffect(() => {
    console.log(notifications);
    if (!notifications.length) {
      return;
    }
    // console.log(notifications);
    setHaveNotification(true);
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Нүүр"
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
        options={{
          header: () => (
            <Header
              haveNotif={haveNotification}
              setHaveNotif={setHaveNotification}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Нүүр"
        component={HomeScreen}
        options={{header: () => <Header haveNotif={haveNotification} />}}
      />
      <Tab.Screen
        name="Зөвлөгөө"
        component={InformationScreen}
        options={{header: () => <Header haveNotif={haveNotification} />}}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;

import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import User from '../assets/svgs/user.svg';
import Logo from '../assets/svgs/logo.svg';

import Notif from '../assets/svgs/notification.svg';
import NotifEmpty from '../assets/svgs/notificationEmpty.svg';

type HeaderType = {
  icon?: boolean;
  haveNotif?: boolean;
  setHaveNotif?: Function;
};

const Header: React.FC<HeaderType> = ({
  icon = true,
  haveNotif = false,
  setHaveNotif = () => {},
}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={icon ? styles.container : styles.icon}>
      <Logo />
      {icon && (
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() => {
              navigation.navigate('Notification');
              setHaveNotif(false);
            }}
            style={{marginRight: 20}}>
            {haveNotif ? <Notif /> : <NotifEmpty />}
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <User />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 0.2,
    borderColor: '#767676',
  },
  icon: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;

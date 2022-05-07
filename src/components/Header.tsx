import React from 'react';
import {View, StyleSheet} from 'react-native';
import Notification from '../assets/svgs/notification.svg';
import User from '../assets/svgs/user.svg';
import Logo from '../assets/svgs/logo.svg';
const Header = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={{flexDirection: 'row'}}>
        <Notification style={{marginRight: 10}} />
        <User />
      </View>
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
});

export default Header;

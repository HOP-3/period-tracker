import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Notification from '../assets/svgs/notification.svg';
import User from '../assets/svgs/user.svg';
import Logo from '../assets/svgs/logo.svg';
import {useNavigation} from '@react-navigation/native';

type HeaderType = {
  icon?: boolean;
};

const Header: React.FC<HeaderType> = ({icon = true}) => {
  const navigation = useNavigation<any>();

  console.log(navigation);
  return (
    <View style={icon ? styles.container : styles.icon}>
      <Logo />
      {icon && (
        <View style={{flexDirection: 'row'}}>
          <Notification style={{marginRight: 10}} />
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

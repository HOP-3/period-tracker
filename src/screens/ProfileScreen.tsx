import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from '../components';
import Logout from '../assets/svgs/logout.svg';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      {auth().currentUser ? (
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://i.pinimg.com/originals/c1/15/45/c11545a6bcd91a8a9c817201e69b1e32.jpg',
            }}
          />
          <View>
            <Text>+976 {auth().currentUser?.phoneNumber?.slice(4)}</Text>
          </View>
          <Button
            width={120}
            iconRight={<Logout width={20} height={20} />}
            onPress={() =>
              auth()
                .signOut()
                .then(() => navigation.navigate('Content'))
            }>
            Logout
          </Button>
        </View>
      ) : (
        <View style={styles.emptyContentContainer}>
          <View style={styles.emptyContent}>
            <Text style={styles.loginText}>Нэвтэрнэ үү.</Text>
            <Button onPress={() => navigation.navigate('Login')}>
              Нэвтрэх
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  content: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emptyContentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 22,
    marginBottom: 20,
  },
});

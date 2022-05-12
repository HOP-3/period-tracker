import React from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button} from '../components';

export const InformationScreen = () => {
  return (
    <View>
      <Text>Information Screen</Text>
      <Button onPress={() => auth().signOut()}>asd</Button>
    </View>
  );
};
export default InformationScreen;

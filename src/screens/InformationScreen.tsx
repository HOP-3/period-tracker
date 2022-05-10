import React from 'react';

import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button} from '../components';

export const InformationScreen = () => {
  return (
    <View>
      <Button onPress={() => auth().signOut()}>tap</Button>
      <Text>Information Screen</Text>
    </View>
  );
};
export default InformationScreen;

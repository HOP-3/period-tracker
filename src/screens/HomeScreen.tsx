import React from 'react';
import {View, Text} from 'react-native';
import {SymptomModal} from '../components';

export const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
      <SymptomModal />
    </View>
  );
};

export default HomeScreen;

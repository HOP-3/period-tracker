import React from 'react';
import {View, Text} from 'react-native';
import {SymptomModal} from '../components/SymptomModal';

export const HomeScreen = () => {
  return (
    <View>
      <SymptomModal />
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;

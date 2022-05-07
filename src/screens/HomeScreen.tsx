import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from './types';
import BottomTabs from '../navigation/BottomTabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home = ({navigation}: Props) => {
  return (
    <View>
      <Text>Home Screeqwewqeqwewqeqwwen</Text>
    </View>
  );
};
export default Home;

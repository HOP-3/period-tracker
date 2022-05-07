import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {View,Text} from 'react-native';
import { RootStackParamList } from './types';
type Props = NativeStackScreenProps<RootStackParamList,'Calendar'>;

export const Calendar=({navigation}:Props)=>{
    return (
        <View>
            <Text>Calendar Screen</Text>
        </View>
    )
}
export default Calendar;
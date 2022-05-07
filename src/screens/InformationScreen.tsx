import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {View,Text} from 'react-native';
import { RootStackParamList } from './types';
type Props = NativeStackScreenProps<RootStackParamList,'Information'>;

export const Information=({navigation}:Props)=>{
    return (
        <View>
            <Text>Information Screen</Text>
        </View>
    )
}
export default Information;
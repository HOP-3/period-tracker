import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import data from '../mock_data/dates.json';
import { Theme } from './theme';

type MarkedDatesType = {
  [key: string]: 'period' | 'ovulation' | 'normal';
};

export const Period = () => {
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({
    '2022-04-15': 'ovulation',
    '2022-05-01': 'period',
    '2022-05-02': 'period',
    '2022-05-09': 'period',
    '2022-05-12': 'period',
    '2022-05-15': 'period',
    '2022-05-16': 'period',
    '2022-05-21': 'period',
    '2022-05-22': 'period',
    '2022-05-23': 'period',
    '2022-05-24': 'period',
    '2022-05-25': 'period',
    '2022-06-15': 'ovulation',
    '2022-06-16': 'ovulation',
    '2022-06-21': 'ovulation',
    '2022-06-22': 'ovulation',
    '2022-06-23': 'ovulation',
    '2022-06-24': 'ovulation',
    '2022-06-25': 'ovulation',
  });
  const dates = [
    {startM: 11, startD: 2, endM: 1, endD: 30},
    {startM: 1, startD: 2, endM: 1, endD: 30},
    {startM: 2, startD: 2, endM: 1, endD: 30},
    {startM: 3, startD: 2, endM: 1, endD: 30},
  ];
  return (
    <View style={{borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 2,paddingHorizontal:17}}>
      {dates.map((item,i) => {
        let day;
        if (item.endD < item.startD) {
          day = item.startD + (30 - item.endD);
        } else day = item.endD - item.startD;
        return (
          <View key={`${item.startM}${item.startD}${item.endM}${item.endD}`} style={{paddingVertical:20,borderBottomWidth:1,borderColor: '#EAEAEA'}}> 
            <Text style={styles.day}>{day} хоног</Text>
            <Text style={{color:Theme.palette.onboarding.grey,paddingTop:10}}>
              {item.startM} сарын {item.startD} - {item.endM} сарын {item.endD}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
      day:{
            fontWeight:"bold",
            fontSize:17
      }
});

export default Period;

import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

import {CalendarYear, CalendarMonth} from '../components/Calendar';
import {Theme} from '../components/theme';

export const CalendarScreen = () => {
  const [isMonth, setIsMonth] = useState(true);
  const markedDates: {[key: string]: 'period' | 'ovulation' | 'normal'} = {
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
  };
  return (
    <View style={[styles.col, styles.container]}>
      <View style={[styles.row, styles.center]}>
        <View style={[styles.row, styles.center, styles.header]}>
          <Pressable
            style={[
              styles.buttonStyle,
              isMonth && styles.activeButton,
              styles.center,
            ]}
            onPress={() => setIsMonth(true)}>
            <Text style={[isMonth && styles.activeButtonText]}>Сар</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonStyle,
              !isMonth && styles.activeButton,
              styles.center,
            ]}
            onPress={() => setIsMonth(false)}>
            <Text style={[!isMonth && styles.activeButtonText]}>Жил</Text>
          </Pressable>
        </View>
      </View>
      <CalendarMonth markedDates={markedDates} isVisible={isMonth} />
      <CalendarYear markedDates={markedDates} isVisible={!isMonth} />
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    paddingBottom: 48,
  },
  buttonStyle: {
    width: 94,
    height: 31,
    backgroundColor: '#f7f7f7',
  },
  activeButton: {
    backgroundColor: '#ffffff',
  },
  activeButtonText: {
    color: Theme.palette.primary.red,
  },
  header: {
    backgroundColor: '#F7F7F7',
    borderColor: '#ECECEC',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    marginVertical: 12,
  },
});
export default CalendarScreen;

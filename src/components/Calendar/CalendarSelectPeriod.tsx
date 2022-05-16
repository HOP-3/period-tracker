import React, {useContext, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';

import {Context} from '../../providers/Provider';
import {Theme} from '../theme';

type CalendarSelectPropsType = {
  markedDates: string[];
  setMarkedDates: (value: string[]) => void;
};

export const CalendarSelectPeriod = ({
  markedDates,
  setMarkedDates,
}: CalendarSelectPropsType) => {
  const {month, today} = useContext(Context);
  const periodDates = useMemo(() => {
    return new Set(markedDates);
  }, [markedDates]);
  return (
    <CalendarList
      markingType={'custom'}
      style={[styles.calendarContainer]}
      dayComponent={({date}) => (
        <Pressable
          onPress={() => {
            if (date && date?.dateString > today) {
              return;
            }
            let dates = periodDates;
            if (date?.dateString) {
              if (dates.has(date.dateString)) {
                dates.delete(date.dateString);
              } else {
                dates.add(date.dateString);
              }
            }
            setMarkedDates(Array.from(dates));
          }}
          style={[
            styles.center,
            date?.dateString && periodDates.has(date?.dateString)
              ? styles.container
              : styles.containerDisabled,
            styles.dayComponent,
            date && date?.dateString > today && styles.disabledPeriodDay,
          ]}>
          <Text
            style={[
              styles.text,
              date && date?.dateString == today && styles.bold,
            ]}>
            {date?.day}
          </Text>
        </Pressable>
      )}
      renderHeader={date => (
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            {LocaleConfig.locales['mn'].monthNamesShort[date.getMonth()]}
          </Text>
        </View>
      )}
      pastScrollRange={Number(month) - 1}
      futureScrollRange={12 - Number(month)}
      scrollEnabled={true}
      showScrollIndicator
      hideDayNames
      monthFormat={'MMM'}
    />
  );
};
const styles = StyleSheet.create({
  calendarContainer: {
    marginHorizontal: 0,
  },
  header: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    color: '#767676',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 32,
    borderTopColor: '#D7D7D7',
    borderTopWidth: 1,
  },
  container: {
    backgroundColor: Theme.palette.calendar.red,
    borderRadius: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    transform: [
      {
        rotate: '45deg',
      },
    ],
    height: 24,
    width: 24,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerDisabled: {
    borderColor: Theme.palette.calendar.red,
    borderWidth: 1,
    borderRadius: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    transform: [
      {
        rotate: '45deg',
      },
    ],
    height: 24,
    width: 24,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: '#222B45',
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayComponent: {
    height: 24,
  },
  disabledPeriodDay: {
    opacity: 0.5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

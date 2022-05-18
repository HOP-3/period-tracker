import React, {memo, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import CalendarListDay from './CalendarListDay';
import {Theme} from '../theme';
import {Context} from '../../providers/Provider';

type CalendarPropsType = {
  isVisible: boolean;
};

const monthNamesShort = [
  '1-р сар',
  '2-р сар',
  '3-р сар',
  '4-р сар',
  '5-р сар',
  '6-р сар',
  '7-р сар',
  '8-р сар',
  '9-р сар',
  '10-р сар',
  '11-р сар',
  '12-р сар',
];

export const CalendarMonth = ({isVisible}: CalendarPropsType) => (
  <CalendarList
    style={[isVisible ? styles.visible : styles.hidden]}
    dayComponent={({date, state}) => (
      <CalendarListDay date={date} state={state} />
    )}
    renderHeader={date => (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{monthNamesShort[date.getMonth()]}</Text>
      </View>
    )}
    pastScrollRange={2}
    futureScrollRange={2}
    // showScrollIndicator
    hideDayNames
    monthFormat={'MMM'}
    contentContainerStyle={styles.contentContainer}
    // ...calendarParams
  />
);
const styles = StyleSheet.create({
  periodContainer: {
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
    opacity: 1,
  },
  periodText: {
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
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
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
  monthlyCalendarItem: {
    width: 32,
    height: 32,
  },
  today: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayPeriod: {
    borderWidth: 1,
    borderColor: Theme.palette.calendar.black,
    opacity: 1,
  },
  symptomDot: {
    width: 10,
    height: 10,
    backgroundColor: Theme.palette.calendar.black,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginBottom: 8,
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
  symptomContainer: {
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
    opacity: 0.3,
  },
  contentContainer: {
    flex: 1,
  },
});
export default memo(CalendarMonth);

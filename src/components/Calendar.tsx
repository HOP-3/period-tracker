import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StyleProp,
} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';
import Drop from '../assets/svgs/miniCard Icons.svg';
import BlueDropLet from '../assets/svgs/bluedrop.svg';
import {LocaleConfig} from 'react-native-calendars';
import {Theme} from './theme';
type CalendarPropsType = {
  markedDates: {[key: string]: 'period' | 'fertility' | 'normal'};
  isVisible: boolean;
};
type CalendarYearItemType = {
  month: string;
  isCurrentMonth: boolean;
  markedDates: {[key: string]: 'period' | 'fertility' | 'normal'};
};
LocaleConfig.locales['mn'] = {
  monthNames: [
    'Нэгдүгээр сар',
    'Хоёрдугаар сар',
    'Гуравдугаар сар',
    'Дөрөвдүгээр сар',
    'Тавдугаар сар',
    'Зургаадугаар сар',
    'Долоодугаар сар',
    'Наймдугаар сар',
    'Есдүгээр сар',
    'Аравдугаар сар',
    'Арваннэгдүгээр сар',
    'Арванхоёрдугаар сар',
  ],
  monthNamesShort: [
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
  ],
  dayNames: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'],
  dayNamesShort: ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'],
  today: 'Өнөөдөр',
};
LocaleConfig.defaultLocale = 'mn';

const datesWithBlueDroplet = new Set([
  '2022-05-01',
  '2022-05-02',
  '2022-05-03',
  '2022-05-04',
  '2022-05-05',
  '2022-05-06',
]);
const date = new Date();
const year = date.getFullYear();
const month =
  date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
const width = Dimensions.get('window').width;
export const CalendarMonth = ({isVisible, markedDates}: CalendarPropsType) => {
  return (
    <CalendarList
      markingType={'custom'}
      style={[
        styles.calendarContainer,
        isVisible ? styles.visible : styles.hidden,
      ]}
      dayComponent={({date, state}) => {
        return (
          <View style={[styles.center, {height: 28}]}>
            {state == 'today' && <Text>Ө</Text>}
            <View style={[styles.defaultCalendarItem]}>
              <Text>{date?.day}</Text>
            </View>
            {date?.dateString &&
              markedDates[date?.dateString] == 'fertility' && <BlueDropLet />}
            {date?.dateString && markedDates[date?.dateString] == 'period' && (
              <Drop />
            )}
          </View>
        );
      }}
      renderHeader={date => {
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>
              {LocaleConfig.locales['mn'].monthNamesShort[date.getMonth()]}
            </Text>
          </View>
        );
      }}
      pastScrollRange={Number(month) - 1}
      futureScrollRange={12 - Number(month)}
      scrollEnabled={true}
      showScrollIndicator
      hideDayNames
      monthFormat={'MMM'}
      // ...calendarParams
    />
  );
};

export const CalendarYear = ({isVisible, markedDates}: CalendarPropsType) => {
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  return (
    <ScrollView style={isVisible ? styles.visible : styles.hidden}>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 16,
          marginLeft: 16,
          flexWrap: 'wrap',
        }}>
        {new Array(12).fill(0).map((_, index) => {
          let str = year + '-' + months[index] + '-01';
          return str ? (
            <CalendarYearItem
              markedDates={markedDates}
              month={str}
              key={index}
              isCurrentMonth={month == months[index]}
            />
          ) : null;
        })}
      </View>
    </ScrollView>
  );
};
const CalendarYearItem = ({
  month,
  isCurrentMonth,
  markedDates,
}: CalendarYearItemType) =>
  month ? (
    <Calendar
      current={month}
      monthFormat={'MMM'}
      style={styles.yearlyCalendar}
      markingType={'custom'}
      renderHeader={date => {
        return (
          <Text
            style={[
              styles.calendarItemHeader,
              {fontWeight: isCurrentMonth ? '700' : '400'},
            ]}>
            {LocaleConfig.locales['mn'].monthNamesShort[date.getMonth()]}
          </Text>
        );
      }}
      dayComponent={({date}) => {
        const dateStyle: {
          period: StyleProp<any>;
          fertility: StyleProp<any>;
          normal: StyleProp<any>;
        } = {
          period: styles.period,
          fertility: styles.fertility,
          normal: styles.normal,
        };
        const dateContainerStyle: {
          period: StyleProp<any>;
          fertility: StyleProp<any>;
          normal: StyleProp<any>;
        } = {
          period: styles.periodContainer,
          fertility: styles.fertilityContainer,
          normal: styles.normalContainer,
        };
        const which: 'period' | 'fertility' | 'normal' = date?.dateString
          ? markedDates[date?.dateString]
          : 'normal';
        return (
          <View style={[styles.defaultCalendarItem, dateContainerStyle[which]]}>
            <Text style={[styles.normal, dateStyle[which]]}>{date?.day}</Text>
          </View>
        );
      }}
      hideDayNames
      firstDay={1}
      disableMonthChange
      hideArrows
      hideExtraDays
    />
  ) : null;
const styles = StyleSheet.create({
  calendarContainer: {
    marginHorizontal: 0,
  },
  header: {
    // fontFamily: 'Open Sans',
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
  defaultCalendarItem: {
    height: 16,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearlyCalendar: {
    width: (width - 48) / 2,
  },
  calendarItemHeader: {
    // font-family: 'Open Sans';
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 16,
    color: '#303030',
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  fertility: {
    // fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: Theme.palette.calendar.blue,
  },
  period: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: Theme.palette.calendar.red,
  },
  normal: {
    color: '#222B45',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 12,
  },
  fertilityContainer: {
    borderBottomWidth: 2,
    borderColor: Theme.palette.calendar.blue,
  },
  periodContainer: {
    borderBottomWidth: 2,
    borderColor: Theme.palette.calendar.red,
  },
  normalContainer: {},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const drop = StyleSheet.create({
  container: {
    backgroundColor: Theme.palette.onboarding.red,
    borderRadius: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    transform: [
      {
        rotate: '45deg',
      },
    ],
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
});
export default CalendarMonth;

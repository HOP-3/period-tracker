import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StyleProp,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import {Theme} from '../theme';

import {Context} from '../../providers/Provider';

type CalendarPropsType = {
  markedDates: {[key: string]: 'period' | 'ovulation' | 'normal'};
  isVisible: boolean;
};

type CalendarYearItemType = {
  month: string;
  isCurrentMonth: boolean;
  markedDates: {[key: string]: 'period' | 'ovulation' | 'normal'};
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

const width = Dimensions.get('window').width;

export const CalendarYear = ({isVisible, markedDates}: CalendarPropsType) => {
  const {month, year} = useContext(Context);
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
    <ScrollView
      style={[
        isVisible ? styles.visible : styles.hidden,
        {
          flex: 1,
        },
      ]}>
      <View style={[styles.calendarYearContainer, styles.center]}>
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
          ovulation: StyleProp<any>;
          normal: StyleProp<any>;
        } = {
          period: styles.period,
          ovulation: styles.ovulation,
          normal: styles.normal,
        };
        const dateContainerStyle: {
          period: StyleProp<any>;
          ovulation: StyleProp<any>;
          normal: StyleProp<any>;
        } = {
          period: styles.periodContainer,
          ovulation: styles.ovulationContainer,
          normal: styles.normalContainer,
        };
        const which: 'period' | 'ovulation' | 'normal' = date?.dateString
          ? markedDates[date?.dateString]
          : 'normal';
        return (
          <View style={[dateContainerStyle[which], styles.center]}>
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
  yearlyCalendar: {
    width: (width - 48) / 2,
  },
  calendarItemHeader: {
    fontFamily: 'Open Sans',
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
  ovulation: {
    fontFamily: 'Open Sans',
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
    color: Theme.palette.calendar.red,
  },
  normal: {
    color: '#222B45',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
  },
  ovulationContainer: {
    borderBottomWidth: 2,
    width: 24,
    borderColor: Theme.palette.calendar.blue,
  },
  periodContainer: {
    borderBottomWidth: 2,
    width: 24,
    borderColor: Theme.palette.calendar.red,
  },
  normalContainer: {},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarYearContainer: {
    flexDirection: 'row',
    marginRight: 16,
    marginLeft: 16,
    flexWrap: 'wrap',
  },
});

export default CalendarYear;

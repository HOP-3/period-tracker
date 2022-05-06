import React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  Calendar,
  Calendar as Calendarr,
  CalendarList,
} from 'react-native-calendars';
import Drop from '../assets/svgs/miniCard Icons.svg';
import BlueDropLet from '../assets/svgs/bluedrop.svg';
import {LocaleConfig} from 'react-native-calendars';

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
export const CalendarMonth = () => {
  return (
    <CalendarList
      markingType={'custom'}
      markedDates={{
        '2022-05-01': {
          customStyles: {
            ...drop,
          },
        },
      }}
      style={styles.calendarContainer}
      dayComponent={({date, state, marking}) => {
        return (
          <>
            {state == 'today' && <Text>Ө</Text>}
            <View
              style={[
                marking?.customStyles?.container,
                styles.defaultCalendarItem,
              ]}>
              <Text
                style={[marking?.customStyles?.text, marking?.customTextStyle]}>
                {date?.day}
              </Text>
            </View>
            {date?.dateString && datesWithBlueDroplet.has(date?.dateString) && (
              <BlueDropLet />
            )}
            {state == 'today' && <Drop />}
          </>
        );
      }}
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      onVisibleMonthsChange={months => {
        console.log(
          'now these months are visible',
          months.map(month => {
            return [month.month, month.year];
          }),
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
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={Number(month)}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={11 - Number(month)}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // Enable or disable vertical scroll indicator. Default = false
      // showScrollIndicator={true}
      hideDayNames={true}
      monthFormat={'MMM'}
      // ...calendarParams
    />
  );
  return (
    <Calendarr // Initially visible month. Default = now
      current={'2022-05-05'}
      horizontal={true}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={'2021-05-05'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={'2023-05-05'}
      // Handler which gets executed on day press. Default = undefined
      // onDayPress={day => {
      //   console.log('selected day', day);
      // }}
      // Handler which gets executed on day long press. Default = undefined
      // onDayLongPress={day => {
      //   console.log('selected day', day);
      // }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'MMMM'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      // onMonthChange={month => {
      //   console.log('month changed', month);
      // }}
      // Hide month navigation arrows. Default = false
      hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      // renderArrow={direction => <Arrow />}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      // Hide day names. Default = false
      // hideDayNames={true}
      // Show week numbers to the left. Default = false
      // showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      // onPressArrowLeft={subtractMonth => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      // onPressArrowRight={addMonth => addMonth()}
      // Disable left arrow. Default = false
      // disableArrowLeft={true}
      // Disable right arrow. Default = false
      // disableArrowRight={true}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      // disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter
      // renderHeader={date => {
      /*Return JSX*/
      // return <Text></Text>;
      // }}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
    />
  );
};

export const CalendarYear = () => {
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
    <ScrollView>
      <Text>{year}</Text>
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
}: {
  month: string;
  isCurrentMonth: boolean;
}) =>
  month ? (
    <Calendar
      current={month}
      monthFormat={'MMM'}
      style={styles.yearlyCalendar}
      markingType={'period'}
      markedDates={{
        '2022-05-15': {marked: true, dotColor: '#50cebb'},
        '2022-05-16': {marked: true, dotColor: '#50cebb'},
        '2022-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
        '2022-05-22': {color: '#70d7c7', textColor: 'white'},
        '2022-05-23': {
          color: '#70d7c7',
          textColor: 'white',
          marked: true,
          dotColor: 'white',
        },
        '2022-05-24': {color: '#70d7c7', textColor: 'white'},
        '2022-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
      }}
      customHeaderTitleStyle={{
        fontWeight: isCurrentMonth ? 'bold' : 'normal',
      }}
      // renderHeader={date => {
      //   return (
      //     <Text
      //       style={[
      //         styles.calendarItemHeader,
      //         {fontWeight: isCurrentMonth ? '700' : '400'},
      //       ]}>
      //       {LocaleConfig.locales['mn'].monthNamesShort[date.getMonth()]}
      //     </Text>
      //   );
      // }}
      theme={{
        stylesheet: {
          day: {
            basic: {
              base: {
                width: 10,
                height: 10,
              },
            },
          },
        },
        todayTextColor: '#222B45',
        dayTextColor: '#222B45',
        monthTextColor: '#303030',
        textDayFontWeight: '600',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 12,
        textMonthFontSize: 16,
      }}
      // dayComponent={({date, state, marking}) => {
      //   return (
      //     <View
      //       style={[
      //         marking?.customStyles?.container,
      //         styles.defaultCalendarItem,
      //       ]}>
      //       <Text
      //         style={[marking?.customStyles?.text, marking?.customTextStyle]}>
      //         {date?.day}
      //       </Text>
      //     </View>
      //   );
      // }}
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
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearlyCalendar: {
    width: (width - 32) / 2,
  },
  calendarItemHeader: {
    // font-family: 'Open Sans';
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 16,
    color: '#303030',
  },
});

const drop = StyleSheet.create({
  container: {
    backgroundColor: '#EDB3AD',
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

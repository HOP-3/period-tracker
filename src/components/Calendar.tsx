import React, {useContext, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StyleProp,
  Pressable,
  Modal,
} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';
import Drop from '../assets/svgs/miniCard Icons.svg';
import BlueDropLet from '../assets/svgs/bluedrop.svg';
import Exit from '../assets/svgs/exit.svg';
import {LocaleConfig} from 'react-native-calendars';
import {Theme} from './theme';
import {Context} from '../providers/Provider';
type SymptomType = {
  text: string;
  date: string;
};
type CalendarPropsType = {
  markedDates: {[key: string]: 'period' | 'fertility' | 'normal'};
  isVisible: boolean;
};
type CalendarSelectPropsType = {
  markedDates: string[];
  setMarkedDates: (value: string[]) => void;
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

const width = Dimensions.get('window').width;
export const CalendarMonth = ({isVisible, markedDates}: CalendarPropsType) => {
  const {month} = useContext(Context);
  return (
    <CalendarList
      markingType={'custom'}
      style={[
        styles.calendarContainer,
        isVisible ? styles.visible : styles.hidden,
      ]}
      dayComponent={({date, state}) => (
        <CalendarListDayComponent
          markedDates={markedDates}
          date={date}
          state={state}
        />
      )}
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
export const CalendarSelectPeriod = ({
  markedDates,
  setMarkedDates,
}: CalendarSelectPropsType) => {
  const {month} = useContext(Context);

  const periodDates = useMemo(() => {
    return new Set(markedDates);
  }, []);
  return (
    <CalendarList
      markingType={'custom'}
      style={[styles.calendarContainer]}
      dayComponent={({date}) => {
        return (
          <Pressable
            onPress={() => {
              let dates = periodDates;
              if (date?.dateString) {
                if (dates.has(date.dateString)) {
                  dates.delete(date.dateString);
                } else {
                  dates.add(date.dateString);
                }
              }
              let arr = Array.from(dates);
              setMarkedDates(arr);
            }}
            style={[
              styles.center,
              date?.dateString && periodDates.has(date?.dateString)
                ? drop.container
                : drop.containerDisbled,
              {
                height: 24,
              },
            ]}>
            <Text style={drop.text}>{date?.day}</Text>
          </Pressable>
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
    />
  );
};

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
    <ScrollView style={isVisible ? styles.visible : styles.hidden}>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 16,
          marginLeft: 16,
          flexWrap: 'wrap',
          marginBottom: 24,
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
const CalendarListDayComponent = ({
  date,
  state,
  markedDates,
}: {
  date: any;
  state: string | undefined;
  markedDates: {[key: string]: 'period' | 'fertility' | 'normal'};
}) => {
  const {today, symptomObj} = useContext(Context);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  return (
    <Pressable
      style={[styles.center, {position: 'relative'}]}
      onPress={() => setIsSymptomModalOpen(!isSymptomModalOpen)}>
      <SymptomModal
        setIsVisible={setIsSymptomModalOpen}
        visible={isSymptomModalOpen}
        symptoms={symptomObj[date.dateString]}
      />
      {/* {state === 'today' && <Text style={{fontWeight: '700'}}>Ө</Text>} */}
      <View
        style={[
          styles.center,
          date?.dateString &&
          markedDates[date?.dateString] == 'period' &&
          date?.dateString < today
            ? drop.container
            : {},
          ,
          state === 'today' && styles.today,
          styles.monthlyCalendarItem,
        ]}>
        <Text
          style={[
            date?.dateString &&
            markedDates[date?.dateString] == 'period' &&
            date?.dateString < today
              ? drop.text
              : {},
            {fontWeight: state === 'today' ? '700' : '400'},
          ]}>
          {date?.day}
        </Text>
      </View>
      {date?.dateString && markedDates[date?.dateString] == 'fertility' && (
        <BlueDropLet />
      )}
      {date?.dateString &&
        markedDates[date?.dateString] == 'period' &&
        date?.dateString >= today && <Drop />}
      {date?.dateString && symptomObj[date?.dateString] && (
        <View style={styles.symptomDot} />
      )}
    </Pressable>
  );
};
const SymptomModal = ({
  visible,
  symptoms,
  setIsVisible,
}: {
  visible: boolean;
  symptoms: SymptomType[];
  setIsVisible: (visible: boolean) => void;
}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.symptomModalContainer}>
        <View style={styles.symptomModalMiddleContainer}>
          <Pressable
            onPress={() => setIsVisible(false)}
            style={styles.symptomModalExit}>
            <Exit />
          </Pressable>
          {symptoms && symptoms.length > 0 ? (
            symptoms.map((symptom, index) => {
              return (
                <View key={index}>
                  <Text>* {symptom.text}</Text>
                </View>
              );
            })
          ) : (
            <Text>Симптомыг тохируулаагүй байна</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  calendarContainer: {
    marginHorizontal: 0,
  },
  today: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: Theme.palette.calendar.red,
  },
  normal: {
    color: '#222B45',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
  },
  fertilityContainer: {
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
  monthlyCalendarItem: {
    width: 32,
    height: 32,
  },
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.palette.calendar.red,
    marginTop: 2,
  },
  symptomModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  symptomModalMiddleContainer: {
    width: width - 64,
    backgroundColor: 'white',
    padding: 32,
  },
  symptomModalExit: {
    position: 'absolute',
    right: 8,
    top: 8,
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
    height: 24,
    width: 24,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerDisbled: {
    borderColor: Theme.palette.onboarding.red,
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
});
export default CalendarMonth;

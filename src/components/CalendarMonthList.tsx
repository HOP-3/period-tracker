import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';

import {Context} from '../providers/Provider';
import SymptomModal from './CalendarSymptomModal';

import Drop from '../assets/svgs/miniCard Icons.svg';
import BlueDropLet from '../assets/svgs/bluedrop.svg';

import {Theme} from './theme';

type CalendarPropsType = {
  markedDates: {[key: string]: 'period' | 'fertility' | 'normal'};
  isVisible: boolean;
};

export const CalendarMonth = ({isVisible, markedDates}: CalendarPropsType) => {
  const {month} = useContext(Context);
  return (
    <CalendarList
      markingType={'custom'}
      style={[isVisible ? styles.visible : styles.hidden]}
      dayComponent={({date, state}) => (
        <CalendarListDayComponent
          markedDates={markedDates}
          date={date}
          state={state}
        />
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
      // ...calendarParams
    />
  );
};

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
            ? styles.dropContainer
            : {},
          ,
          state === 'today' && styles.today,
          styles.monthlyCalendarItem,
        ]}>
        <Text
          style={[
            date?.dateString &&
              markedDates[date?.dateString] == 'period' &&
              date?.dateString < today &&
              styles.dropText,
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

const styles = StyleSheet.create({
  dropContainer: {
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
  dropText: {
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
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.palette.calendar.red,
    marginTop: 2,
  },
});
export default CalendarMonth;

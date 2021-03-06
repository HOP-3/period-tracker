import React, {memo, useContext, useMemo, useState} from 'react';
import {Context} from '../../providers/Provider';
import {SymptomShowModal} from './CalendarSymptomModal';

import Drop from '../../assets/svgs/miniCard Icons.svg';
import BlueDropLet from '../../assets/svgs/bluedrop.svg';
import {Theme} from '../theme';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const CalendarListDayComponent = ({
  date,
  state,
}: {
  date: any;
  state: string | undefined;
}) => {
  const {today, symptomObj, markedDates} = useContext(Context);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const type = useMemo(() => {
    if (date) {
      const dateString = date.dateString;
      if (markedDates[dateString]) {
        if (date.dateString <= today) return markedDates[dateString];
        return markedDates[dateString] === 'ovulation'
          ? 'ovulation'
          : 'possible_' + markedDates[dateString];
      }
    }
    return 'normal';
  }, [symptomObj, date, markedDates]);
  return (
    <Pressable
      style={[styles.center, {position: 'relative', height: 68}]}
      onPress={() => setIsSymptomModalOpen(!isSymptomModalOpen)}>
      <View style={{alignItems: 'center'}}>
        <SymptomShowModal
          setIsVisible={setIsSymptomModalOpen}
          visible={isSymptomModalOpen}
          symptoms={symptomObj[date.dateString]}
        />
        {date?.dateString && symptomObj[date?.dateString] && (
          <View style={styles.symptomDot} />
        )}
        {/* {state === 'today' && <Text style={{fontWeight: '700'}}>Ө</Text>} */}
        <View
          style={[
            styles.center,
            date?.dateString &&
              symptomObj[date?.dateString] &&
              styles.symptomContainer,
            type === 'period' && styles.periodContainer,
            state === 'today' &&
              (type == 'period' ? styles.todayPeriod : styles.today),
            styles.monthlyCalendarItem,
          ]}>
          <Text
            style={[
              (type === 'period' ||
                (date?.dateString && symptomObj[date?.dateString])) &&
                styles.periodText,
              {fontWeight: state === 'today' ? '700' : '400'},
            ]}>
            {date?.day}
          </Text>
        </View>
        {type == 'ovulation' && <BlueDropLet />}
        {type == 'possible_period' && <Drop />}
      </View>
    </Pressable>
  );
};
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
export default memo(CalendarListDayComponent);

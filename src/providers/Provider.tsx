import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useState,
  SetStateAction,
} from 'react';
import {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {AuthContext} from './AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SymptomType extends FirebaseFirestoreTypes.DocumentData {
  text: string;
  date: string;
}
type MarkedDatesType = {
  [key: string]: 'period' | 'ovulation' | 'normal';
};
type SymptomObjType = {
  [key: string]: SymptomType[];
};
type ContextType = {
  today: string;
  month: number | string;
  year: number | null;
  markedDates: MarkedDatesType;
  periodLength: number;
  symptoms: SymptomType[];
  symptomObj: SymptomObjType;
  lastPeriod: string;
  modalBackground: boolean;
  firstTime: boolean;
  menstrualCycleLength: number;
  setPeriodLength: (value: number) => void;
  setLastPeriod: (value: string) => void;
  setMenstrualCycleLength: (value: number) => void;
  setModalBackground: (value: boolean) => void;
  howLongHasItbeenSinceLastPeriod: () => Promise<number>;
  darkMode: number;
  setDarkMode: Dispatch<SetStateAction<number>>;
};

export const Context = createContext<ContextType>({
  today: '',
  month: '',
  year: null,
  periodLength: 5,
  symptoms: [],
  symptomObj: {},
  modalBackground: false,
  firstTime: true,
  menstrualCycleLength: 28,
  markedDates: {},
  lastPeriod: '',
  setLastPeriod: () => {},
  setPeriodLength: () => {},
  setMenstrualCycleLength: () => {},
  setModalBackground: () => {},
  howLongHasItbeenSinceLastPeriod: () => Promise.resolve(0),
  darkMode: 0,
  setDarkMode: () => {},
});
export const _checkFirstTime = async () => {
  return await AsyncStorage.getItem('@firstTime');
};

export const Provider = ({children}: any) => {
  const [firstTime, setFirstTime] = useState<boolean>(false);
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1);
  const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  const today = year + '-' + month + '-' + day;
  const [modalBackground, setModalBackground] = useState(false);
  const [periodLength, setPeriodLength] = useState(5);
  const [menstrualCycleLength, setMenstrualCycleLength] = useState(28);
  const [lastPeriod, setLastPeriod] = useState(today);
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
  const symptomObj = useMemo(() => {
    let obj: SymptomObjType = {};
    for (let i = 0; i < symptoms.length; i++) {
      if (obj[symptoms[i].date] === undefined) {
        obj[symptoms[i].date] = [symptoms[i]];
        continue;
      }
      obj[symptoms[i].date].push(symptoms[i]);
    }
    return obj;
  }, [symptoms]);
  const {userId} = useContext(AuthContext);
  const howManyDaysBetweenTwoDate = (date1: string, date2: string) => {
    const date1Arr = date1.split('-');
    const date2Arr = date2.split('-');
    const date1Obj = new Date(
      parseInt(date1Arr[0]),
      parseInt(date1Arr[1]) - 1,
      parseInt(date1Arr[2]),
      0,
      0,
      0,
      0,
    );
    const date2Obj = new Date(
      parseInt(date2Arr[0]),
      parseInt(date2Arr[1]) - 1,
      parseInt(date2Arr[2]),
      0,
      0,
      0,
      0,
    );
    const timeDiff = Math.abs(date2Obj.getTime() - date1Obj.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };
  const makeSurePeriodAndCycle = async () => {
    // default menstrual cycle 28
    // default periodLength 5
    const period = await AsyncStorage.getItem('periodLength');
    const menstrualCycle = await AsyncStorage.getItem('menstrualCycleLength');
    const lastPeriodData = await AsyncStorage.getItem('lastPeriod');
    if (period === null) {
      await AsyncStorage.setItem('periodLength', 5 + '');
      setPeriodLength(5);
    } else {
      setPeriodLength(Number(period));
    }
    if (menstrualCycle === null) {
      await AsyncStorage.setItem('menstrualCycleLength', 28 + '');
      setMenstrualCycleLength(28);
    } else {
      setMenstrualCycleLength(Number(menstrualCycle));
    }
    if (lastPeriodData === null) {
      await AsyncStorage.setItem('lastPeriod', today);
    } else {
      setLastPeriod(lastPeriodData);
    }
  };
  const howLongHasItbeenSinceLastPeriod = async () => {
    const lastPeriod = await AsyncStorage.getItem('lastPeriod');
    if (lastPeriod === null) {
      await AsyncStorage.setItem('lastPeriod', today);
      return 0;
    }
    const days = howManyDaysBetweenTwoDate(lastPeriod, today);
    return days;
  };
  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const constructCalendars = () => {
    const marks: any = {};

    for (let m = 1; m <= 12; m++) {
      for (let d = 1; d <= daysInMonth(m, year); d++) {
        let distance = howManyDaysBetweenTwoDate(
          year + '-' + m + '-' + d,
          lastPeriod,
        );
        distance = distance % menstrualCycleLength;
        const mo = m >= 10 ? m : '0' + m;
        const da = d >= 10 ? d : '0' + d;
        let dayString = year + '-' + mo + '-' + da;
        if (dayString > lastPeriod) {
          if (distance > 7 && distance <= 13) {
            marks[dayString] = 'ovulation';
          } else if (distance >= menstrualCycleLength - periodLength) {
            marks[dayString] = 'period';
          }
        } else {
          if (distance < periodLength) {
            marks[dayString] = 'period';
          } else if (
            distance > menstrualCycleLength - 13 &&
            distance <= menstrualCycleLength - 7
          ) {
            marks[dayString] = 'ovulation';
          }
        }
      }
    }
    setMarkedDates(marks);
  };
  const [darkMode, setDarkMode] = useState(0);
  useEffect(() => {
    _checkFirstTime().then(async value => {
      if (value === 'null' || value == null) {
        setFirstTime(true);
      } else {
        setFirstTime(false);
      }
    });
  }, []);
  useEffect(() => {
    const getData = async () => {
      if (userId === null) return;
      let data = await (
        await firebase.firestore().collection(`users/${userId}/symptoms`).get()
      ).docs.map(doc => {
        return doc.data();
      });
      setSymptoms(data);
    };
    constructCalendars();
    makeSurePeriodAndCycle();
    getData();
  }, [userId]);

  return (
    <Context.Provider
      value={{
        today,
        month,
        year,
        symptoms,
        symptomObj,
        modalBackground,
        setModalBackground,
        firstTime,
        howLongHasItbeenSinceLastPeriod,
        periodLength,
        setPeriodLength,
        menstrualCycleLength,
        setMenstrualCycleLength,
        lastPeriod,
        setLastPeriod,
        markedDates,
        darkMode,
        setDarkMode,
      }}>
      {children}
    </Context.Provider>
  );
};

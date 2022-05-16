import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {AuthContext} from './AuthProvider';

interface SymptomType extends FirebaseFirestoreTypes.DocumentData {
  text: string;
  date: string;
}
type SymptomObjType = {
  [key: string]: SymptomType[];
};
type ContextType = {
  today: string;
  month: number | string;
  year: number | null;
  symptoms: SymptomType[];
  symptomObj: SymptomObjType;
  modalBackground: boolean;
  setModalBackground: (value: boolean) => void;
};

export const Context = createContext<ContextType>({
  today: '',
  month: '',
  year: null,
  symptoms: [],
  symptomObj: {},
  modalBackground: false,
  setModalBackground: () => {},
});

export const Provider = ({children}: any) => {
  const [modalBackground, setModalBackground] = useState(false);
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1);
  const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  const today = year + '-' + month + '-' + day;
  const [symptoms, setSymptoms] = useState<any[]>([]);
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
      }}>
      {children}
    </Context.Provider>
  );
};

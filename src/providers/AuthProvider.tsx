import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type ContextType = {
  userId: string | null;
  user: FirebaseAuthTypes.User | null;
};

export const AuthContext = createContext<ContextType>({
  userId: null,
  user: null,
});

const makeid = () => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const AuthProvider = ({children}: any) => {
  const [userId, setUserId] = useState<string | null>(null);
  const user = auth().currentUser;
  const makeSureIdIsThere = async () => {
    const id = await AsyncStorage.getItem('id');
    if (id === null) {
      const newId = makeid();
      await AsyncStorage.setItem('id', newId);
      setUserId(newId);
    } else {
      setUserId(id);
    }
  };
  useEffect(() => {
    makeSureIdIsThere();
  }, []);
  return (
    <AuthContext.Provider value={{userId, user}}>
      {children}
    </AuthContext.Provider>
  );
};

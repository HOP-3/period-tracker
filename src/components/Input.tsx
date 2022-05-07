import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

type type = 'phoneNumber' | 'codeConfirmation' | 'onboarding';

const Input = ({type}: {type: type}) => {
  return (
    type == 'onboarding' ? (
      <TextInput placeholder="Энд бичнэ үү?" style={styles.boarding} />
    ) : (
      <TextInput
        placeholder={
          type == 'phoneNumber' ? 'Утасны дугаар' : 'Баталгаажуулах код'
        }
        style={styles.login}
        keyboardType={'numeric'}
      />
    )
  );
};
const styles = StyleSheet.create({
  login: {
    width: '100%',
    padding: 10,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    fontSize:17,
  },
  boarding: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    fontSize: 20,
    color: 'black',
    padding: 10,
    paddingBottom: 10,
  },
});

export default Input;

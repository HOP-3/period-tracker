import React, {Dispatch, FC, SetStateAction} from 'react';
import {TextInput, StyleSheet, View, KeyboardTypeOptions} from 'react-native';
import Key from '../assets/svgs/key.svg';
import Phone from '../assets/svgs/phone.svg';

type Props = {
  width?: number | string;
  height?: number | string;
  placeholder: string | undefined;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  inputType?: KeyboardTypeOptions;
  maxLength?: number | undefined;
  type:
    | 'phoneNumber'
    | 'codeConfirmation'
    | 'onboarding'
    | 'default'
};

export const Input: FC<Props> = ({
  width,
  height,
  placeholder,
  text,
  setText,
  inputType = 'default',
  type = "default",
  maxLength,
}) => {
  return type == 'onboarding' ? (
    <TextInput
      placeholder={placeholder}
      value={text}
      onChangeText={setText}
      keyboardType={inputType}
      maxLength={maxLength}
      style={[
        styles.boarding,
        {width: width === undefined ? '100%' : width, height: height},
      ]}
    />
  ) : (
    <View style={[styles.container,{width: width === undefined ? '100%' : width, height: height}]}>
      {type == 'phoneNumber' && <Phone />}
      {type == 'codeConfirmation' && <Key />}
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        keyboardType={inputType}
        maxLength={maxLength}
        style={styles.login}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  login: {
    flex: 1,
    fontSize: 17,
    paddingHorizontal: 10,
  },
  boarding: {
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    fontSize: 21,
    color: 'black',
    padding: 10,
    paddingBottom: 13,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    padding: 15,
    borderRadius:5
  },
});

export default Input;

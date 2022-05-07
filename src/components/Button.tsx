import React, {ReactNode} from 'react';
import {View, StyleSheet, Pressable, PressableProps, Text} from 'react-native';
import {Theme} from './theme';
type ButtonType = PressableProps & {
  disabled?: boolean;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  type?: 'primary' | 'secondary';
  width?: number;
  height?: number;
  fontSize?: number;
};
export const Button: React.FC<ButtonType> = ({
  onPress,
  disabled = false,
  type = 'primary',
  iconRight = false,
  iconLeft = false,
  children,
  width = 100,
  height = 50,
  fontSize = 17,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          width: width,
          height: height,
        },
        styles.button,
        disabled && styles.disabled,
        styles[type],
      ]}>
      <View style={[styles.icon]}>{iconLeft}</View>
      <Text style={[{fontSize}, styles[type]]}>{children}</Text>
      <View style={[styles.icon]}>{iconRight}</View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
  },
  icon: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: Theme.palette.primary.red,
    borderColor: '#EAEAEA',
    fontWeight: '600',
    color: 'white',
  },
  secondary: {
    backgroundColor: Theme.palette.background.default,
    borderColor: Theme.palette.primary.red,
    fontWeight: '400',
    color: Theme.palette.primary.red,
  },
});

export default Button;

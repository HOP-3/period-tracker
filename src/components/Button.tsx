import React, {ReactNode} from 'react';
import {Typography} from './Typography';
import {View, StyleSheet, Pressable, PressableProps} from 'react-native';
import {Theme} from './theme';
type ButtonType = PressableProps & {
  disabled?: boolean;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  type?: 'primary' | 'secondary';
  width?: number;
  height?: number;
};
export const Button: React.FC<ButtonType> = ({
  onPress,
  disabled = false,
  type = 'primary',
  iconRight = false,
  iconLeft = false,
  children,
  width,
  height,
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
      <Typography
        type={type === 'primary' ? 'body_bold' : 'body_regular'}
        color={type === 'secondary' ? 'primary' : 'white'}
        children={children}
      />
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
  },
  secondary: {
    backgroundColor: Theme.palette.background.default,
    borderColor: Theme.palette.primary.red,
  },
});

export default Button;

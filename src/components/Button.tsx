import React, {ReactNode} from 'react';
import {Typography} from './Typography';
import {colors} from './Colors';
import {View, StyleSheet, Pressable, PressableProps} from 'react-native';
type ButtonType = PressableProps & {
  size?: 'L' | 'S';
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
      <View style={[{width: iconLeft != undefined ? 20 : 0}]}>{iconLeft}</View>
      <Typography
        type={type === 'primary' ? 'body_bold' : 'body_regular'}
        color={type === 'secondary' ? 'primary' : 'white'}
        children={children}
      />
      <View style={[{width: iconRight != undefined ? 20 : 0}]}>
        {iconRight}
      </View>
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
  S: {
    height: 38,
    width: 124,
    paddingHorizontal: 20,
  },
  L: {
    height: 48,
    width: 132,
    paddingHorizontal: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: '#EAEAEA',
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: '#FF7C76',
  },
});

export default Button;

import React, {ReactNode} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  PressableProps,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Theme} from './theme';
type ButtonType = PressableProps & {
  disabled?: boolean;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  type?: 'primary' | 'secondary';
  width?: number;
  height?: number;
  fontSize?: number;
  styleButton?: StyleProp<ViewStyle>;
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
  styleButton,
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
        styleButton,
      ]}>
      {iconLeft && <View style={[styles.icon]}>{iconLeft}</View>}
      <Text style={[{fontSize}, styles[type]]}>{children}</Text>
      {iconRight && <View style={[styles.icon]}>{iconRight}</View>}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
  },
  icon: {
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
    backgroundColor: Theme.palette.onboarding.white,
    borderColor: Theme.palette.onboarding.white, // borderColor: Theme.
    color: Theme.palette.onboarding.grey,
    fontWeight: '700',
  },
});

export default Button;

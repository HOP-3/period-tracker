import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ColorTypes, colors} from './Colors';

type TextStyleTypes = 'body_bold' | 'body_regular';

type Props = {
  align?: 'left' | 'center' | 'right';
  color?: ColorTypes;
  type: TextStyleTypes;
  underline?: 'underline' | 'none';
};

export const Typography: React.FC<Props> = ({
  children,
  type,
  underline = 'none',
  color = 'white',
  align = 'left',
}) => {
  return (
    <Text
      style={[
        TypographyStyles[type],
        {
          color: colors[color],
          textAlign: align,
          textDecorationLine: underline,
        },
      ]}
      testID={type}>
      {children}
    </Text>
  );
};

const TextStyles = {
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
};
export const TypographyStyles = StyleSheet.create({
  body_bold: {...TextStyles.body, fontWeight: '700'},
  body_regular: {...TextStyles.body, fontWeight: '400'},
});

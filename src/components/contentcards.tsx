import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
export const Rectangle = () => {
  return (
    <SafeAreaView>
      <View style={styles.rcontainer}>
        <Text>asdads</Text>
      </View>
    </SafeAreaView>
  );
};
export const Square = () => {
  return (
    <SafeAreaView>
      <View style={styles.scontainer}>
        <Text>asdasd</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  rcontainer: {
    width: 319,
    height: 136,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EAEAEA',
    shadowColor: '#EDB3AD',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  scontainer: {
    width: 156,
    height: 176,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EAEAEA',
    shadowColor: '#EDB3AD',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
});

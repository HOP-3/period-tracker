import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {SymptomModal} from '../components';
import {Theme} from '../components/theme';

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <SymptomModal />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Theme.palette.onboarding.white,
  },
});

export default HomeScreen;

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Button} from './components';
import RightArrow from './assets/svgs/RightArrow.svg';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World</Text>
      <Button size="L" disabled>
        asd
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
export default App;

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Button} from './components';
import RightArrow from './assets/svgs/RightArrow.svg';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World</Text>
      <Button iconLeft={<RightArrow />} width={150} height={50}>
        asdeasfda
      </Button>
      <Button
        disabled
        width={150}
        height={50}
        iconLeft={<RightArrow />}
        iconRight={<RightArrow />}>
        asdeasfda
      </Button>
      <Button
        iconLeft={<RightArrow />}
        width={150}
        height={50}
        type="secondary">
        asdeasfda
      </Button>
      <Button disabled width={130} height={50} type="secondary">
        asdeasfda
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

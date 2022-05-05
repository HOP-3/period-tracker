import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Button} from './components';
import RightArrow from './assets/RightArrow.svg';
const App = () => {
  return (
    <SafeAreaView>
      <Text>Hello World</Text>
      <Button size="L" disabled>
        asd
      </Button>
    </SafeAreaView>
  );
};

export default App;

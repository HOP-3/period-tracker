import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Close from '../assets/svgs/close.svg';
import {RootStackParamList} from './types';

const {width, height} = Dimensions.get('screen');

export const StoryScreen = ({route}: {route: {params: {images: string[]}}}) => {
  const stories: string[] = route.params.images;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={style.Container}>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={item => (
          <SafeAreaView>
            <Image
              source={require('../assets/pngs/storyCard1.png')}
              style={style.Container}
            />
          </SafeAreaView>
        )}
      />
      <View style={style.Indicators}>
        {stories.map((name, ind) => (
          <View
            key={ind}
            style={[style.Indicator, {width: width / stories.length - 10}]}
          />
        ))}
      </View>
      <Pressable onPress={() => navigation.pop()} style={style.Close}>
        <Close />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  Close: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 100,
  },
  Container: {
    flex: 1,
    width: width,
  },
  Indicator: {
    backgroundColor: 'white',
    height: 2.5,
    borderRadius: 10,
    width: 25,
    opacity: 0.5,
  },
  Indicators: {
    width: width,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: 100,
  },
});

export default StoryScreen;

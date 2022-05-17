import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {View, Image, Pressable, StyleSheet, Dimensions} from 'react-native';
import Close from '../assets/svgs/close.svg';
// import {Context} from '../providers/Provider';
import {RootStackParamList} from './types';

const {width, height} = Dimensions.get('screen');

export const StoryScreen = ({route}: {route: {params: {images: string[]}}}) => {
  const stories: string[] = route.params.images;
  // const {setDarkMode, darkMode} = useContext(Context);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [image, setImage] = useState(0);
  const handleTouch = (event: any) => {
    if (event.nativeEvent.locationX > width / 2) {
      if (image === stories.length - 1) {
        navigation.pop();
      }
      setImage(Math.min(image + 1, stories.length - 1));
    } else {
      setImage(Math.max(image - 1, 0));
    }
  };
  // useEffect(() => {
  //   setDarkMode(1);
  //   return () => setDarkMode(0);
  // }, [setDarkMode]);

  return (
    <Pressable style={style.Container} onPress={e => handleTouch(e)}>
      <Image
        source={{uri: stories[image]}}
        style={style.Image}
        resizeMode="contain"
      />
      <View style={style.Indicators}>
        {stories.map((name, ind) => (
          <View
            key={ind}
            style={[style.Indicator, {width: width / stories.length - 10}]}>
            <View style={image > ind && style.Inside} />
          </View>
        ))}
      </View>
      <Pressable onPress={() => navigation.pop()} style={style.Close}>
        <Close />
      </Pressable>
    </Pressable>
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
    backgroundColor: 'white',
  },
  Indicator: {
    backgroundColor: 'grey',
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
  Image: {
    height: '100%',
    width: width,
  },
  Inside: {
    flex: 1,
    backgroundColor: '#303030',
  },
});

export default StoryScreen;

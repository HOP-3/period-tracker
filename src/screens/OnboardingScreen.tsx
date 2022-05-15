/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../screens/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';

import {Button} from '../components';
import {Theme} from '../components/theme';

type DataType = {
  description: string;
  title: string;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const OnBoarding = () => {
  const navigation = useNavigation<NavigationProps>();
  const [imageIndex, setImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translation = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const translation1 = useRef(new Animated.ValueXY({x: 800, y: -100})).current;
  const translation2 = useRef(new Animated.ValueXY({x: 0, y: 1000})).current;
  const translation3 = useRef(new Animated.ValueXY({x: -800, y: 100})).current;

  const indexPlus = () => {
    if (imageIndex + 1 === data.length) {
      navigation.navigate('Content');
    } else {
      imageAnimationP();
      textAnimation();
      setImageIndex(imageIndex + 1);
    }
  };
  const indexMinus = () => {
    imageAnimationN();
    textAnimation();
    setImageIndex(imageIndex - 1);
  };

  const imageData = [
    require('../assets/pngs/first.png'),
    require('../assets/pngs/second.png'),
    require('../assets/pngs/third.png'),
    require('../assets/pngs/fourth.png'),
  ];
  const data: DataType[] = [
    {
      description:
        'Мэргэжлийн эмч нарын бичсэн эрүүл мэнд, амьдралын хэв маягийн зөвлөгөө, нийтлэлүүд',
      title: 'Өөрийн биеэ илүү их мэддэг болцгооё!',
    },
    {
      description:
        'Таны сарын тэмдгийн мөчлөгөөс суралцаж, илүү оновчтой таамаг харуулна',
      title: 'Өдөр бүр өөртөө итгэлтэй байцгаая!',
    },
    {
      description:
        'Мөчлөгийн үед тохирсан эрүүл мэнд, гоо сайхан, сэтгэл зүйл, хооллолтын зөвлөгөө',
      title: 'Зөвхөн танд зориулсан зөвлөгөө, тусламжууд',
    },
    {
      description:
        'Та дараах таван асуултад хариулан өөрт тохирсон зөвлөгөө мэдээлэл, мөчлөгийн цаглабарыг үүсгэх болно',
      title: 'Аяллаа хамтдаа эхэлцгээе!',
    },
  ];
  const textAnimation = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const imageAnimationP = () => {
    console.log(imageIndex);
    Animated.parallel([
      Animated.timing(translation, {
        toValue: {
          x: imageIndex === 0 ? -800 : imageIndex === 1 ? 0 : 800,
          y: imageIndex === 0 ? 100 : imageIndex === 1 ? 1000 : -100,
        },
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translation1, {
        toValue: {
          x: imageIndex === 0 ? 0 : imageIndex === 1 ? -800 : 0,
          y: imageIndex === 0 ? -370 : imageIndex === 1 ? 100 : 1000,
        },
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translation2, {
        toValue: {
          x: imageIndex === 0 ? 800 : imageIndex === 1 ? 0 : -800,
          y: imageIndex === 0 ? -370 : imageIndex === 1 ? -740 : 100,
        },
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const imageAnimationN = () => {
    Animated.parallel([
      Animated.timing(translation1, {
        toValue: {x: 400, y: -200},
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translation, {
        toValue: {x: 0, y: 0},
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'flex-end', marginRight: 10}}>
        <Button
          onPress={() => navigation.navigate('Content')}
          width={80}
          type={'secondary'}>
          Алгасах
        </Button>
      </View>
      <View style={{maxHeight: 380, borderWidth: 1}}>
        <Animated.Image
          style={{
            transform: [
              {translateX: translation.x},
              {translateY: translation.y},
            ],
          }}
          source={require('../assets/pngs/first.png')}
        />

        <Animated.Image
          source={require('../assets/pngs/second.png')}
          style={{
            transform: [
              {translateX: translation1.x},
              {translateY: translation1.y},
            ],
          }}
        />
        <Animated.Image
          style={{
            transform: [
              {translateX: translation2.x},
              {translateY: translation2.y},
            ],
          }}
          source={require('../assets/pngs/third.png')}
        />
      </View>

      {/* <Image source={imageData[imageIndex]} /> */}
      <Animated.View style={{opacity: fadeAnim}}>
        <Text style={styles.title}>{data[imageIndex].title}</Text>
        <Text style={styles.description}>{data[imageIndex].description}</Text>
      </Animated.View>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {imageData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === imageIndex && {
                backgroundColor: Theme.palette.primary.red,
              },
            ]}
          />
        ))}
      </View>
      <Button onPress={indexPlus} width={150}>
        {imageIndex === 3 ? 'Эхлэх' : 'Үргэлжлүүлэх'}
      </Button>
      {imageIndex !== 0 && (
        <Button onPress={indexMinus} width={70} type={'secondary'}>
          Буцах
        </Button>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  dot: {
    margin: 30,
    backgroundColor: 'grey',
    borderRadius: 8,
    height: 14,
    marginHorizontal: 2,
    width: 8,
  },
  title: {
    width: Dimensions.get('window').width * 0.75,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontWeight: '400',
    width: Dimensions.get('window').width * 0.9,
    flexWrap: 'wrap',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default OnBoarding;

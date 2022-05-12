/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState} from 'react';
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
} from 'react-native';

import {Button} from '../components';

type DataType = {
  description: string;
  title: string;
};
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const OnBoarding = () => {
  const navigation = useNavigation<NavigationProps>();
  const [imageIndex, setImageIndex] = useState(0);

  const indexPlus = () => {
    if (imageIndex + 1 === data.length) {
      navigation.navigate('Content');
    } else {
      setImageIndex(imageIndex + 1);
    }
  };
  const indexMinus = () => {
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
      <Image source={imageData[imageIndex]} />
      <Text style={styles.title}>{data[imageIndex].title}</Text>
      <Text style={styles.description}>{data[imageIndex].description}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {imageData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === imageIndex && {backgroundColor: 'red'},
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

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './types';
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
import {Theme} from '../components/theme';

type DataType = {
  description: string;
  title: string;
};
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const Action = () => {
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
    require('../assets/images/action.png'),
    require('../assets/images/action1.png'),
    require('../assets/images/action2.png'),
    require('../assets/images/action3.png'),
    require('../assets/images/action4.png'),
  ];
  const data: DataType[] = [
    {
      description:
        'Одоо хоёулаа доор байрлах мөчлөгийн тойрог дээр байрлах тэмдэглэгээтэй танилцснаар аяллын бэлтгэл маань дуусна.',
      title: 'Тэмдэглэгээний зааварчилгаа',
    },
    {
      description:
        'Энэ тэмдэглэгээ нь таны сарын тэмдэг ирсэн өдрийг илтгэх ба доорхи мөчлөгийн тойрог дээрээс харах боломжтой.',
      title: 'Сарын тэмдэг ирсэн өдөр',
    },
    {
      description:
        'Харин хөндий тэмдэглэгээ нь таны сарын тэмдэг ирэх магадлалтай өдрийг илтгэх ба та дээр нь нэг товшиж ирснээ тэмдэглэж болно.',
      title: 'Сарын тэмдэг ирэх магадлалтай өдөр',
    },
    {
      description:
        'Харин дээрээ хар тэмдэглэгээтэй өдөр нь таны тухайн өдөр шинж тэмдэг бүртгэсэн үгүйг илтгэнэ.',
      title: 'Шинж тэмдэг бүртгэгдсэн өдөр',
    },
    {
      description:
        'Цэнхэр тэмдэглэгээ овуляцийн үе буюу өндгөн эс ялгарч буй өдрүүд бөгөөд тухайн өдрүүдэд жирэмслэх магадлал өндөр гэдгийг заана.  ',
      title: 'Овуляци явагдаж буй өдөр',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={{margin: 15, color: Theme.palette.onboarding.grey}}>
        {imageIndex === 0 ? 'Одоо хэдхэн алхам' : 'Тэмдэглэгээний зааварчилгаа'}
      </Text>
      <Text style={styles.title}>{data[imageIndex].title}</Text>
      <Image source={imageData[imageIndex]} style={{margin: 40}} />

      <Text style={styles.description}>{data[imageIndex].description}</Text>
      <Button onPress={indexPlus} width={150}>
        Үргэлжлүүлэх
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
  title: {
    width: Dimensions.get('window').width * 0.75,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
  },
  description: {
    marginBottom: 40,
    fontWeight: '400',
    width: Dimensions.get('window').width * 0.9,
    flexWrap: 'wrap',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default Action;

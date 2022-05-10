import React from 'react';
import {View, Text} from 'react-native';
type DataType = {
  description: string;
  title: string;
};

export const OnBoarding = () => {
  const imageData = [
    require('../assets/pngs/first.png'),
    require('../assets/pngs/second.png'),
    require('../assets/pngs/third.png'),
    require('../assets/pngs/fourth.png'),
  ];
  const data: DataType[] = [
    {
      description:
        'Мэргэжлийн эмч нарын бичсэн эрүүл мэнд, амьдралын хэв маягийн зөвлөгөө, нийтлэлүүд.',
      title: 'Өөрийн биеэ илүү их мэддэг болцгооё!',
    },
    {
      description:
        'Таны сарын тэмдгийн мөчлөгөөс суралцаж, илүү оновчтой таамаг харуулна.',
      title: 'Өдөр бүр өөртөө итгэлтэй байцгаая!',
    },
    {
      description:
        'Мөчлөгийн үед тохирсан эрүүл мэнд, гоо сайхан, сэтгэл зүйл, хооллолтын зөвлөгөө.',
      title: 'Зөвхөн танд зориулсан зөвлөгөө, тусламжууд',
    },
    {
      description:
        'Та дараах таван асуултад хариулан өөрт тохирсон зөвлөгөө мэдээлэл, мөчлөгийн цаглабарыг үүсгэх болно.',
      title: 'Аяллаа хамтдаа эхэлцгээе!',
    },
  ];

  return (
    <View>
      <Text>Testing</Text>
    </View>
  );
};
export default OnBoarding;

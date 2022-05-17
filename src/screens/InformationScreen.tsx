import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

import {Theme} from '../components/theme';
import {RootStackParamList} from './types';
import advice from '../mock_data/advice.json';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type adviceType = {
  name: string;
  data: {
    title: string;
    imageUrl: string;
    story?: string[];
  }[];
};

const width = Dimensions.get('window').width;

export const InformationScreen = () => {
  const adviceHeaders = [
    'Бүгд',
    ...advice.map((item: adviceType) => item.name),
  ];
  const [selected, setSelected] = useState('Бүгд');
  return (
    <View style={styles.informationContainer}>
      <View>
        <FlatList
          contentContainerStyle={styles.filterContainer}
          data={adviceHeaders}
          renderItem={({item}) => (
            <Pressable
              style={[
                styles.center,
                styles.filterItem,
                selected === item && styles.filterItemSelected,
              ]}
              onPress={() => setSelected(item)}>
              <Text>{item}</Text>
            </Pressable>
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <ScrollView style={styles.colContainer}>
        {selected === 'Бүгд' ? (
          <View>
            {/* <SectionList
            sections={advice}
            keyExtractor={(item, index) => item.title + index.toString()}
            stickySectionHeadersEnabled={false}
            renderItem={({item}) => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.imageUrl}</Text>
              </View>
            )}
            renderSectionHeader={({section}) => <Text>{section.name}</Text>}
          /> */}
            {advice.map((item1: adviceType, index1) => (
              <View key={index1}>
                <Text style={[styles.rowHeader, styles.mh8]}>{item1.name}</Text>
                <FlatList
                  // pagingEnabled={true}
                  contentContainerStyle={styles.adviceContainer}
                  data={item1.data}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.mh8}>
                        <InfoItem
                          title={item.title}
                          imageUrl={item.imageUrl}
                          story={item.story}
                        />
                      </View>
                    );
                  }}
                  keyExtractor={(_, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ))}
          </View>
        ) : (
          <Information selected={selected} />
        )}
      </ScrollView>
    </View>
  );
};
const Information = ({selected}: {selected: string}) => {
  const data = advice.filter((item: adviceType) => item.name === selected);

  return (
    <View>
      <Text style={styles.rowHeader}>{selected}</Text>
      <ScrollView style={styles.rowContainer}>
        {data[0].data.map((item: any, index: number) => (
          <View style={{paddingVertical: 8}} key={item.title}>
            <InfoItem
              key={index}
              title={item.title}
              imageUrl={item.imageUrl}
              story={item.story}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const InfoItem = ({
  title,
  imageUrl,
  story = [],
}: {
  title: string;
  imageUrl: string;
  story?: string[];
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      style={styles.infoContainer}
      onPress={() => navigation.navigate('Story', {images: story})}>
      <Text style={styles.infoText}>{title}</Text>
      <View style={styles.infoImageContainer}>
        <View
          style={{
            borderTopRightRadius: (width - 48) / 4,
            borderTopLeftRadius: (width - 48) / 4,
            height: (width - 48) / 2,
            width: (width - 48) / 2,
            borderWidth: 4,
            borderColor: '#FF7C76',
            overflow: 'hidden',
          }}>
          <View
            style={{
              borderTopRightRadius: (width - 48) / 4,
              borderTopLeftRadius: (width - 48) / 4,
              height: (width - 48) / 2 - 8,
              width: (width - 48) / 2 - 8,
              overflow: 'hidden',
            }}>
            <Image source={{uri: imageUrl}} style={styles.infoImage} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Theme.palette.advice.primary,
  },
  filterItem: {
    paddingHorizontal: 24,
    paddingVertical: 6,
    backgroundColor: Theme.palette.advice.primary,
    borderColor: Theme.palette.advice.thirtary,
    borderWidth: 1,
    height: 31,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  filterItemSelected: {
    borderColor: Theme.palette.advice.secondary,
    borderWidth: 2,
  },
  informationContainer: {
    backgroundColor: Theme.palette.advice.primary,
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colContainer: {
    padding: 24,
    flex: 1,
    fontFamily: 'Open Sans',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    padding: 16,
    height: 136,
    width: width - 64 - 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    overflow: 'hidden',
    borderRadius: 4,
  },
  infoImageContainer: {
    borderTopRightRadius: (width - 48) / 4,
    borderTopLeftRadius: (width - 48) / 4,
    height: (width - 48) / 2,
    width: (width - 48) / 2,
    overflow: 'hidden',
    position: 'absolute',
    bottom: -(width - 48) / 4 - 4,
    right: -10,
  },
  infoImage: {
    height: (width - 48) / 4 - 8,
    width: (width - 48) / 2 - 8,
  },
  infoText: {
    width: (width - 48) / 2,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19,
    color: '#333333',
  },
  adviceContainer: {
    paddingBottom: 48,
    paddingTop: 12,
  },
  rowHeader: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19,
    textTransform: 'uppercase',
    color: '#000000',
  },
  mh8: {
    marginHorizontal: 8,
  },
});

export default InformationScreen;

import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';

import {Theme} from '../components/theme';

import advice from '../mock_data/advice.json';

type adviceType = {
  name: string;
  data: {
    title: string;
    imageUrl: string;
  }[];
};

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
          renderItem={({item}) => {
            return (
              <Pressable
                style={[
                  styles.center,
                  styles.filterItem,
                  selected === item && styles.filterItemSelected,
                ]}
                onPress={() => setSelected(item)}>
                <Text>{item}</Text>
              </Pressable>
            );
          }}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {selected == 'Бүгд' ? (
        <View>
          {advice.map((item: adviceType) => {
            return (
              <View>
                <Text>{item.name}</Text>
                <FlatList
                  contentContainerStyle={styles.filterContainer}
                  data={item.data}
                  renderItem={({item}) => {
                    return (
                      <Pressable>
                        <Text>{item.title}</Text>
                      </Pressable>
                    );
                  }}
                  keyExtractor={(_, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            );
          })}
        </View>
      ) : (
        <Information selected={selected} />
      )}
    </View>
  );
};
const Information = ({selected}: {selected: string}) => {
  const data = advice.filter((item: adviceType) => item.name === selected);
  console.log(data.length == 1 && data[0].data);
  return (
    <View>
      <Text>{selected}</Text>
      <FlatList
        data={data.length == 1 ? data[0].data : []}
        renderItem={dt => {
          return <Text>{dt.item.title}</Text>;
        }}
      />
    </View>
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
});
export default InformationScreen;

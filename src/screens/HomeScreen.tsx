import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import {SymptomModal} from '../components';
import Banner from '../components/Banner';
import SymptomCard from '../components/SymptomCard';

export const HomeScreen = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Banner />
      <View style={styles.day}>
        <Text style={styles.thisDay}>Энэ өдөр</Text>
        <View style={{height:200}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{paddingLeft: 25}}>
              <SymptomModal />
            </View>
            <SymptomCard type={'probability'} />
            <SymptomCard type={'rhythm'} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thisDay: {
    fontWeight: 'bold',
    paddingBottom: 17,
    paddingLeft: 25,
    fontSize: 17,
  },
  day: {
    marginTop:30,
    paddingTop: 40,
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    flex: 1,
    flexDirection: 'column',
  },
});

export default HomeScreen;

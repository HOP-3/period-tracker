import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {SymptomModal} from '../components';
import Banner from '../components/Banner';
import SymptomCard from '../components/SymptomCard';
import Bg from '../assets/pngs/homeScreenBg.png';
import Period from '../components/Period';

const header = () => (
  <View>
    <Image source={Bg} style={styles.bg} />
    <Banner />
    <View style={styles.day}>
      <Text style={styles.thisDay}>Энэ өдөр</Text>
      <View style={{height: 200}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{paddingLeft: 25}}>
            <SymptomModal />
          </View>
          <SymptomCard type={'probability'} />
          <SymptomCard type={'rhythm'} />
        </ScrollView>
      </View>
      <Text>Мөчлөгийн түүх</Text>
      <Period />
    </View>
  </View>
);

export const HomeScreen = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
      <Image source={Bg} style={styles.bg} />
      <Banner />
      <View style={styles.day}>
        <Text style={styles.thisDay}>Энэ өдөр</Text>
        <View style={{height: 200}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{paddingLeft: 25}}>
              <SymptomModal />
            </View>
            <SymptomCard type={'probability'} />
            <SymptomCard type={'rhythm'} />
          </ScrollView>
        </View>
      </View>
      <View style={{paddingHorizontal:25,paddingVertical:40}}>
        <Text style={{fontSize:17,fontWeight:"bold",paddingBottom:20}}>Мөчлөгийн түүх</Text>
        <Period />
      </View>
    </ScrollView>
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
    marginTop: 30,
    paddingTop: 40,
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    flex: 1,
    flexDirection: 'column',
  },
  bg: {
    width: 300,
    height: 300,
    position: 'absolute',
    right: 0,
  },
});

export default HomeScreen;

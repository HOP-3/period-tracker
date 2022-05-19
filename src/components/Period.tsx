import React, {useContext,useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Context } from '../providers/Provider';
import { Theme } from './theme';

export const Period = () => {
  const {markedDates,today} = useContext(Context);
  const data = useMemo(()=>{
      const arr : string[][]=[];
      let obj : string[]=[],before=true;
      Object.keys(markedDates).map((item)=>{
            if(!before) return;
            if(markedDates[item]=="period"){
                  obj.push(item);
              }
            else{
                  if(obj.length>0){
                        arr.push(obj);
                        obj=[];
                  }
            }
            if(item==today){
                  before=false;
            }
      });
      return arr;
  },[markedDates]);
  return (
    <View style={{borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 2,paddingHorizontal:17}}>
      {data.map((item) => {
      return(
            <View key={item[0]} style={{paddingVertical:20,borderBottomWidth:1,borderColor: '#EAEAEA'}}> 
                  <Text style={styles.day}>{item.length} хоног</Text>
                  <Text style={{color:Theme.palette.onboarding.grey,paddingTop:10}}>
                        {item[0]} - {item[item.length-1]}
                  </Text>
            </View>
      );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
      day:{
            fontWeight:"bold",
            fontSize:17
      }
});

export default Period;

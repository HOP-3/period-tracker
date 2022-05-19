import React, { useContext, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Drop from '../assets/svgs/bluedrop.svg';
import Rhythm from '../assets/svgs/rhythm.svg';
import { Context } from "../providers/Provider";

const howManyDaysBetweenTwoDate = (date1: string, date2: string) => {
      const date1Arr = date1.split('-');
      const date2Arr = date2.split('-');
      const date1Obj = new Date(
        parseInt(date1Arr[0]),
        parseInt(date1Arr[1]) - 1,
        parseInt(date1Arr[2]),
        0,
        0,
        0,
        0,
      );
      const date2Obj = new Date(
        parseInt(date2Arr[0]),
        parseInt(date2Arr[1]) - 1,
        parseInt(date2Arr[2]),
        0,
        0,
        0,
        0,
      );
      const timeDiff = Math.abs(date2Obj.getTime() - date1Obj.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays;
};

const Banner = () =>{
      const {today} = useContext(Context);
      const [rhythm,setRhythm] = useState("Фоликулар");
      const {markedDates} = useContext(Context);
      const [probability,setProbability] = useState(markedDates[today]=="ovulation" ? "Өндөр" : "Бага" );
      const day = useMemo(()=>{
            let found=false,count=0,after=false;
            Object.keys(markedDates).map((item)=>{
                  if(found) return;
                  if(item==today) after=true;
                  if(after){
                        if(markedDates[item]=="ovulation"){
                              count = howManyDaysBetweenTwoDate(today,item);
                              found=true;
                        }
                  }
            });
            return count;
        },[markedDates]);
      return(
            <View style={styles.container}> 
                  <Text style={styles.type}>ОВУЛЯЦИ</Text>
                  <Text style={styles.day}>{day===0 ? "Өнөөдөр" : `${day} өдрийн дараа`}</Text>
                  <View style={styles.additional} >
                        <Drop/>
                        <Text style={styles.normal}> Үр тогтох магадлал </Text>
                        <Text style={styles.bold}>{probability}</Text>
                  </View>
                  <View style={styles.additional}>
                        <Rhythm/>
                        <Text style={styles.normal}> Инфрадиан хэмнэл </Text>
                        <Text style={styles.bold}>{rhythm}</Text>
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      container:{
            display:'flex',
            flexDirection:'column',
            paddingTop:60,
            paddingLeft:25
      },
      day:{
            fontWeight:'bold',
            fontSize:30,
            paddingBottom:16
      },
      type:{
            fontWeight:"bold",
            fontSize:15,
            paddingBottom:5,
      },
      additional:{
            display:"flex",
            flexDirection:'row',
            width:"100%",
            alignItems:'center',
            paddingBottom:16
      },
      normal:{
            fontSize:16,
            paddingHorizontal:10
      },
      bold:{
            fontWeight:"bold",
            fontSize:18
      }
})

export default Banner;
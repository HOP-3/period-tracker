import React, { useContext, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Drop from '../assets/svgs/bluedrop.svg';
import Rhythm from '../assets/svgs/rhythm.svg';
import { Context } from "../providers/Provider";

const Banner = () =>{
      const {today} = useContext(Context);
      const [rhythm,setRhythm] = useState("Фоликулар");
      const {markedDates} = useContext(Context);
      const [probability,setProbability] = useState(markedDates[today]=="ovulation" ? "Өндөр" : "Бага" );
      const day = useMemo(()=>{
            let found=false,count=0,after=false;
            Object.keys(markedDates).map((item)=>{
                  if(item==today) after=true;
                  if(after){
                        if(markedDates[item]=="ovulation"){
                              found=true;
                        }
                        else if(found==false) count++;
                  }
            });
            return count;
        },[markedDates]);
      return(
            <View style={styles.container}> 
                  <Text style={styles.type}>ОВУЛЯЦИ</Text>
                  <Text style={styles.day}>{day} өдрийн дараа</Text>
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
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Theme } from "./theme";
import Drop from '../assets/svgs/bigBlueDrop.svg';

type CardType = {
      type: "probability" | "rhythm"
}

const SymptomCard : FC<CardType> = ({type}) =>{
      const [value,setValue] = useState(type=="rhythm" ? "Фоликулар" : "Өндөр");
      return(
            <View style={styles.container}>
                  <View style={styles.description}>
                        <View style={{flex:1}}>
                              <Text>{type=="probability" ?  "Үр тогтох" : "Инфрадиан"}</Text>
                              <Text>{type=="probability" ?  "магадлал" : "хэмнэл"}</Text>
                        </View>
                        <View style={{opacity:0.4}}>
                              <Drop width={50} height={50}/>
                        </View>
                  </View>
                  <View style={[styles.colorPart,{backgroundColor:type=="rhythm" ? Theme.palette.primary.red : Theme.palette.primary.blue}]}>
                        <Text style={styles.value}>{value}</Text>
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      description:{
            padding:15,
            flexDirection:"row"
      },
      colorPart:{
            flex:1,
            display:"flex",
            justifyContent:'flex-end',
            padding:15,
      },
      value:{
            fontWeight:"bold",
            fontSize:20
      },
      container:{
            width: 155,
            height: 175,
            borderWidth: 1,
            borderColor: '#EAEAEA',
            borderRadius: 5,
            overflow: 'hidden',
            marginLeft:20,
      }
})

export default SymptomCard;
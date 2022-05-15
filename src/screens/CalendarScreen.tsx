import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import {Button} from '../components';
import {
  CalendarYear,
  CalendarMonth,
  CalendarSelectPeriod,
} from '../components/Calendar';

import {Theme} from '../components/theme';

import Close from '../assets/svgs/exit.svg';
import {Context} from '../providers/Provider';

type MarkedDatesType = {
  [key: string]: 'period' | 'ovulation' | 'normal';
};

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const day = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];

export const CalendarScreen = () => {
  const [isMonth, setIsMonth] = useState(true);
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({
    '2022-04-15': 'ovulation',
    '2022-05-01': 'period',
    '2022-05-02': 'period',
    '2022-05-09': 'period',
    '2022-05-12': 'period',
    '2022-05-15': 'period',
    '2022-05-16': 'period',
    '2022-05-21': 'period',
    '2022-05-22': 'period',
    '2022-05-23': 'period',
    '2022-05-24': 'period',
    '2022-05-25': 'period',
    '2022-06-15': 'ovulation',
    '2022-06-16': 'ovulation',
    '2022-06-21': 'ovulation',
    '2022-06-22': 'ovulation',
    '2022-06-23': 'ovulation',
    '2022-06-24': 'ovulation',
    '2022-06-25': 'ovulation',
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const {setModalBackground, modalBackground} = useContext(Context);
  useEffect(() => {
    if (modalBackground == false) {
      setEditModalVisible(false);
    }
  }, [modalBackground]);

  return (
    <View style={[styles.col, styles.container]}>
      <View style={[styles.col, styles.center]}>
        <View style={[styles.row, styles.center, styles.header]}>
          <Pressable
            style={[
              styles.buttonStyle,
              isMonth && styles.activeButton,
              styles.center,
            ]}
            onPress={() => setIsMonth(true)}>
            <Text style={[isMonth && styles.activeButtonText]}>Сар</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonStyle,
              !isMonth && styles.activeButton,
              styles.center,
            ]}
            onPress={() => setIsMonth(false)}>
            <Text style={[!isMonth && styles.activeButtonText]}>Жил</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,0.05)',
          display: isMonth ? 'flex' : 'none',
        }}>
        {day.map((item, index) => {
          return (
            <View key={index} style={{}}>
              <Text
                style={{
                  color: index < 5 ? '#767676' : '#FF7C76',
                }}>
                {item}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={{flex: 1, position: 'relative'}}>
        <CalendarMonth markedDates={markedDates} isVisible={isMonth} />
        <CalendarYear markedDates={markedDates} isVisible={!isMonth} />
        <View style={styles.editBtn}>
          <Button
            width={149}
            height={38}
            onPress={() => {
              setModalBackground(true);
              setEditModalVisible(true);
            }}>
            <Text>Засварлах</Text>
          </Button>
        </View>
        <Modal transparent animationType="slide" visible={editModalVisible}>
          <CalendarEditModal
            setVisible={setEditModalVisible}
            markedDates={markedDates}
            setMarkedDates={setMarkedDates}
          />
        </Modal>
      </View>
    </View>
  );
};
const CalendarEditModal = ({
  markedDates,
  setMarkedDates,
  setVisible,
}: {
  markedDates: MarkedDatesType;
  setMarkedDates: (markedDates: MarkedDatesType) => void;
  setVisible: (visible: boolean) => void;
}) => {
  const {setModalBackground} = useContext(Context);
  const [markedArray, setMarkedArray] = useState<string[]>(() => {
    let key = Object.keys(markedDates);
    let arr = [];
    for (let i = 0; i < key.length; i++) {
      if (markedDates[key[i]] == 'period') {
        arr.push(key[i]);
      }
    }
    return arr;
  });
  return (
    <SafeAreaView style={styles.modalContainer}>
      <Pressable
        style={{
          height: (height / 10) * 3,
          width: width,
        }}
        onPress={() => {
          setModalBackground(false);
          setVisible(false);
        }}
      />
      <View
        style={{
          height: (height / 10) * 7,
          width: width,
          zIndex: 7,
        }}>
        <View style={styles.modalHeader}>
          <Pressable
            style={{
              position: 'absolute',
              right: 12,
              top: 12,
            }}
            onPress={() => {
              setModalBackground(false);
              setVisible(false);
            }}>
            <Close />
          </Pressable>
          {day.map((item, index) => {
            return (
              <View key={index} style={styles.flexCenter}>
                <Text
                  style={[
                    styles.weekendDayText,
                    {
                      color: index < 5 ? '#767676' : '#FF7C76',
                    },
                  ]}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            paddingBottom: 128,
            backgroundColor: '#fff',
          }}>
          <CalendarSelectPeriod
            markedDates={markedArray}
            setMarkedDates={(arr: string[]) => {
              setMarkedArray(arr);
            }}
          />
        </View>

        <View style={styles.editContainer}>
          <Button
            width={149}
            height={38}
            onPress={() => {
              let newMarkedDates: MarkedDatesType = {};
              for (let i = 0; i < markedArray.length; i++) {
                newMarkedDates[markedArray[i]] = 'period';
              }
              setMarkedDates(newMarkedDates);
              setModalBackground(false);
              setVisible(false);
            }}>
            <Text>Хадгалах</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    // marginBottom: 50,
    position: 'relative',
    flex: 1,
  },
  buttonStyle: {
    width: 94,
    height: 31,
    backgroundColor: '#f7f7f7',
  },
  activeButton: {
    backgroundColor: '#ffffff',
  },
  activeButtonText: {
    color: Theme.palette.primary.red,
  },
  header: {
    backgroundColor: '#F7F7F7',
    borderColor: '#ECECEC',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    marginVertical: 12,
  },
  editContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  editBtn: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  weekendDayText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    height: 80,
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'relative',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
});
export default CalendarScreen;

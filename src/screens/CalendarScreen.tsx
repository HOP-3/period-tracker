import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  Dimensions,
  SafeAreaView,
  Image,
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
  const {
    setModalBackground,
    modalBackground,
    markedDates: marks,
  } = useContext(Context);
  const [isMonth, setIsMonth] = useState(true);

  const [markedDates, setMarkedDates] = useState<MarkedDatesType>(marks);
  const [editModalVisible, setEditModalVisible] = useState(false);
  useEffect(() => {
    if (modalBackground == false) {
      setEditModalVisible(false);
    }
  }, [modalBackground]);

  return (
    <View style={[styles.col, styles.container]}>
      <View style={[styles.col, styles.center]}>
        <Image
          source={require('../assets/images/Rectangle.png')}
          style={styles.headerImage}
        />
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
        style={[
          {
            display: isMonth ? 'flex' : 'none',
          },
          styles.weekendContainer,
        ]}>
        {day.map((item, index) => {
          return (
            <View key={index} style={styles.flexCenter}>
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
        <CalendarMonth isVisible={isMonth} />
        <CalendarYear isVisible={!isMonth} />
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
  const ovulations = useMemo(() => {
    const ovulations: string[] = [];
    Object.keys(markedDates).forEach(key => {
      if (markedDates[key] === 'ovulation') {
        ovulations.push(key);
      }
    });
    return ovulations;
  }, [markedDates]);
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
        style={styles.modalContainerTop}
        onPress={() => {
          setModalBackground(false);
          setVisible(false);
        }}
      />
      <View style={styles.modalContainerBottom}>
        <View style={styles.modalHeader}>
          <Pressable
            style={styles.modalClose}
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
        <View style={styles.selectPeriodContainer}>
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
              for (let i = 0; i < ovulations.length; i++) {
                newMarkedDates[ovulations[i]] = 'ovulation';
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
  headerImage: {
    position: 'absolute',
    top: -460,
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  selectPeriodContainer: {
    paddingBottom: 128,
    backgroundColor: '#fff',
  },
  modalClose: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  modalContainerBottom: {
    height: (height / 10) * 7,
    width: width,
    zIndex: 7,
  },
  modalContainerTop: {
    height: (height / 10) * 3,
    width: width,
  },
  weekendContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});
export default CalendarScreen;

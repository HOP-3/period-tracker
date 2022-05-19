import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button} from './Button';
import {AuthContext} from '../providers/AuthProvider';
import {Context} from '../providers/Provider';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {Input} from './TextInput';

const {width} = Dimensions.get('screen');

export const SymptomModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [field, setField] = useState<string>('');
  const {userId, user} = useContext(AuthContext);
  const {today} = useContext(Context);
  const navigation = useNavigation<any>();
  const addData = async () => {
    console.log('asd');
    if (field === '') return;
    await firestore()
      .collection(`users/${userId}/symptoms`)
      .add({
        text: field,
        date: today,
      })
      .then(() => {
        setField('');
      });
  };
  console.log(userId);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView>
          <Header icon={false} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modal}>
            <Input
              setText={setField}
              text={field}
              placeholder={'Тэмдэглэгээ'}
              type="default"
              multiline={true}
              numberOfLines={10}
              height={250}
            />
            <View style={styles.modalBottom}>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  addData();
                }}
                type="primary">
                Хадгалах
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  setField('');
                }}
                type="secondary">
                Цуцлах
              </Button>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.captionText}>Шинж тэмдэг</Text>
        </View>
        <Button
          onPress={() => {
            if (auth().currentUser !== null) {
              setModalVisible(true);
              return;
            } else navigation.navigate('Login');
          }}
          width={155}
          fontSize={32}>
          +
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 155,
    height: 175,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modal: {
    padding: 10,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  top: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FF7C76',
    height: 40,
  },
  symptom: {
    flex: 1,
    color: 'white',
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalBtnText: {
    color: 'white',
    fontSize: 32,
    // textAlign: 'center',
  },
  captionText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
  },
  modalBottom: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

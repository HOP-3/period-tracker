import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button} from './';

const {width} = Dimensions.get('screen');

export const SymptomModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [field, setField] = useState<string>('');

  const addData = () => {
    if (field === '') {
      return;
    }
    firestore()
      .collection('test')
      .doc('test')
      .set({
        text: field,
      })
      .then(() => {
        setField('');
      });
  };

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
          <View style={styles.modal}>
            <TextInput
              onChangeText={setField}
              multiline
              numberOfLines={4}
              style={styles.input}
              editable
              value={field}
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
          </View>
        </SafeAreaView>
      </Modal>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.captionText}>Шинж тэмдэг</Text>
        </View>
        <Button onPress={() => setModalVisible(true)} width={155} fontSize={32}>
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
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 10,
    width: width,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  top: {
    flex: 1,
    padding: 10,
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
  input: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

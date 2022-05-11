import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Exit from '../assets/svgs/exit.svg';

type SymptomType = {
  text: string;
  date: string;
};

type SymptomModalType = {
  visible: boolean;
  symptoms: SymptomType[];
  setIsVisible: (visible: boolean) => void;
};

const width = Dimensions.get('window').width;

export const SymptomModal = ({
  visible,
  symptoms,
  setIsVisible,
}: SymptomModalType) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.symptomModalContainer}>
        <View style={styles.symptomModalMiddleContainer}>
          <Pressable
            onPress={() => setIsVisible(false)}
            style={styles.symptomModalExit}>
            <Exit />
          </Pressable>
          {symptoms && symptoms.length > 0 ? (
            symptoms.map((symptom, index) => {
              return (
                <View key={index}>
                  <Text>* {symptom.text}</Text>
                </View>
              );
            })
          ) : (
            <Text>Симптомыг тохируулаагүй байна</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  symptomModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  symptomModalMiddleContainer: {
    width: width - 64,
    backgroundColor: 'white',
    padding: 32,
  },
  symptomModalExit: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});
export default SymptomModal;

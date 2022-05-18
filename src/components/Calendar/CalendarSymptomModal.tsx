import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Exit from '../../assets/svgs/exit.svg';

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

export const SymptomShowModal = ({
  visible,
  symptoms,
  setIsVisible,
}: SymptomModalType) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.symptomModalContainer}>
        <Pressable
          onPress={() => setIsVisible(false)}
          style={styles.symptomBack}
        />
        <View style={styles.symptomModalMiddleContainer}>
          <Pressable
            onPress={() => setIsVisible(false)}
            style={styles.symptomModalExit}>
            <Exit />
          </Pressable>
          {symptoms && symptoms.length > 0 ? (
            symptoms.map((symptom, index) => (
              <View key={index}>
                <Text>{symptom.text}</Text>
              </View>
            ))
          ) : (
            <Text>Шинж тэмдэг оруулаагүй байна</Text>
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
  },
  symptomModalMiddleContainer: {
    width: width - 64,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 32,
    zIndex: 4,
    borderRadius: 8,
  },
  symptomModalExit: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  symptomBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});
export default SymptomShowModal;

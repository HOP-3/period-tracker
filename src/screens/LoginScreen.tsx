import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Theme} from '../components/theme';
import {Button, Input} from '../components';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import Facebook from '../assets/svgs/facebook.svg';
// import Google from '../assets/svgs/google.svg';
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const {width} = Dimensions.get('screen');

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [text, setText] = useState('');

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState('');
  const signInWithPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber('+976' + text);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    if (confirm) {
      try {
        await confirm.confirm(code).then(async credential => {
          if (credential?.additionalUserInfo?.isNewUser) {
            await firestore()
              .collection('users')
              .doc(credential.user.uid)
              .set({
                phoneNumber: credential.user.phoneNumber,
              })
              .catch(err => {
                console.log(err);
              });
            navigation.navigate('Content');
          } else {
            navigation.navigate('Content');
          }
        });
      } catch (error) {
        console.log('Invalid code.');
      }
    }
  };

  return (
    <View style={style.container}>
      <View style={style.containerTop}>
        <Text style={[style.header, style.red]}>Эрүүл мэндээ</Text>
        <Text style={style.header}>гартаа атга</Text>
      </View>
      <View style={style.flex}>
        <ImageBackground
          source={require('../assets/images/Rectangle.png')}
          style={style.imageBackground}>
          <ImageBackground
            source={require('../assets/images/circles.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{height: '100%', width: '100%', justifyContent: 'flex-end'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={200}
                style={style.inputCircle}>
                <View style={style.inputContainer}>
                  {confirm ? (
                    <>
                      <View>
                        <Text style={style.label}>Баталгаажуулах код</Text>
                        <Input
                          text={code}
                          setText={setCode}
                          width={width - 50}
                          height={50}
                          placeholder={'Утасны дугаар'}
                          type="codeConfirmation"
                          inputType="number-pad"
                        />
                      </View>
                      <Button width={width - 50} onPress={confirmCode}>
                        Нэвтрэх
                      </Button>
                    </>
                  ) : (
                    <>
                      <View>
                        <Text style={style.label}>Утасны дугаар</Text>
                        <Input
                          text={text}
                          setText={setText}
                          width={width - 50}
                          height={50}
                          placeholder={'Утасны дугаар'}
                          type="phoneNumber"
                          inputType="number-pad"
                        />
                      </View>
                      <Button
                        width={width - 50}
                        onPress={signInWithPhoneNumber}>
                        Нэвтрэх
                      </Button>
                    </>
                  )}

                  {/* <Text>Эсвэл</Text> */}
                  {/* <View>
                  <Button
                    width={width - 50}
                    type={'secondary'}
                    iconRight={<Facebook />}>
                    Facebook -ээр нэвтрэх
                  </Button>
                  <Button
                    width={width - 50}
                    type={'secondary'}
                    iconRight={<Google />}>
                    Google -ээр нэвтрэх
                  </Button>
                </View> */}
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </ImageBackground>
        </ImageBackground>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  containerTop: {
    marginTop: 40,
    marginBottom: -40,
    alignItems: 'center',
  },
  red: {
    color: Theme.palette.primary.red,
  },
  header: {
    backgroundColor: 'transparent',
    fontWeight: '700',
    fontSize: 40,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  inputCircle: {
    height: '80%',
    width: '200%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 1000,
    borderTopLeftRadius: 1000,
    alignItems: 'center',
    padding: 60,
  },
  inputContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  label: {
    color: '#767676',
    marginLeft: 10,
    fontWeight: '400',
  },
});

export default LoginScreen;

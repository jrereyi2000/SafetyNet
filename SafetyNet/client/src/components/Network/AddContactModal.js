import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  Pressable,
  Image,
} from 'react-native';
import { getStyle } from '../../css/Styles';
import Modal from 'react-native-modal';
import Input from '../Input';
import Button from '../Button';
import { RequestText } from '../SendRequest';
import axios from 'axios';
import Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import AppContext from '../../AppContext';


const addConnection = (userId, name, number, setModal, setNewContact, state, setError) => {
// console.log(name);
// console.log(number);
  axios
      .post(`${Config.HOST_URL}/api/addConnection`, {
        userId: userId,
        connectionName: name,
        connectionNumber: number.replace(/ - /g, ''),
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);
        setModal(false);
        setNewContact(true);
      })
      .catch((error) => {
      // console.log(error.response);
        setError(true);
        // state.set_error(true);
      });
};

const AddContactModal = ({ modal, setModal, setNewContact }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [number, setNumber] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleMobileNumChange = (param) => {
    if (
      (number.length === 3 && param.length === 4) ||
      (number.length === 9 && param.length === 10)
    ) {
      setNumber(param.slice(0, -1) + ' - ' + param.slice(-1));
    } else {
      setNumber(param);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
        },
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
        },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Modal
      isVisible={modal}
      transparent
      useNativeDriver
      style={getStyle('border margin-0 justify-content-flex-end')}
      onModalHide={() => {
        setName('');
        setNumber('');
      }}
      onBackdropPress={() => {
        setModal(false);
      }}>
      <View style={getStyle('modal padding-6p')}>
        <KeyboardAvoidingView
          behavior="padding"
          style={getStyle('width-100p flex')}>
          <View
            style={getStyle(
                'width-100p justify-content-space-between flex-direction-row margin-bottom-4p',
            )}>
            <Text style={getStyle('messina-sans-bold font-size-28')}>
                  Group name
            </Text>
            <Pressable
              style={getStyle('justify-content-center align-items-flex-end')}
              onPress={() => setModal(false)}>
              <Image source={require('../../../res/images/closeIcon.png')} />
            </Pressable>
          </View>
          <View
            style={getStyle(
                `width-100p ${!isKeyboardVisible ? 'flex justify-content-space-between' : ''}`,
            )}>
            <View style={getStyle('margin-bottom-38p')}>
              <RequestText style={getStyle('messina-sans-semibold font-size-13 margin-bottom-4p')}>Name </RequestText>
              <Input
                inputStyle={getStyle(
                    'width-100p margin-bottom-6p border-radius-2 padding-left-16 align-items-center height-50 border border-color-deepSupport')}
                value={name}
                textStyle={getStyle('flex messina-sans-bold height-45')}
                autoFocus
                endIcon={name.length ? 'closeIcon.png' : undefined}
                onChange={(text) => setName(text)}
                onEndIconPress={() => setName('')}
              />
              <RequestText style={getStyle('messina-sans-semibold font-size-13 margin-bottom-4p')}>Phone Number </RequestText>
              <Input
                inputStyle={getStyle(
                    'width-100p border-radius-2 padding-left-16 align-items-center height-50 border border-color-deepSupport')}
                value={number}
                textStyle={getStyle('flex messina-sans-bold height-45')}
                endIcon={number.length ? 'closeIcon.png' : undefined}
                onChange={(text) => handleMobileNumChange(text)}
                onEndIconPress={() => setNumber('')}
              />
            </View>
            <Button
              text="Add Contact"
              disabledTextStyle={getStyle(
                  'messina-sans-bold font-size-16 text-white',
              )}
              textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
              disabledButtonStyle={getStyle(
                  'width-100p height-50 border-radius-100 deepSupport',
              )}
              disabled={!name || number.length !== 16}
              buttonStyle={getStyle(
                  'width-100p height-50 border-radius-100 deepSupport',
              )}
              onPress={() => {
                addConnection(user._id, name, number, setModal, setNewContact, appState, setError);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AddContactModal;

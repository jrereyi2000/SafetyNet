import React from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';
import Button from '../Button';
import { getStyle } from '../../css/Styles';
import Modal from 'react-native-modal';

const SentRequestDialog = ({ modal, setModal }) => {
  return (
    <Modal isVisible={modal} transparent>
      <View
        style={getStyle(
            'width-100p white padding-top-8p border-radius-10 align-items-center',
        )}>
        <Image source={require('../../../res/images/sentRequest.png')} />
        <Text style={getStyle('messina-sans-bold font-size-20 margin-top-20')}>
            Your request has been sent!
        </Text>
        <View>
          <Text
            style={getStyle('messina-sans-regular font-size-16 margin-top-10')}>
              We will let you know when someone
          </Text>
          <Text
            style={getStyle(
                'messina-sans-regular font-size-16 margin-bottom-20',
            )}>
              has accepted.
          </Text>
        </View>
        <Button
          buttonStyle={getStyle('width-100p border-top-width-1 height-50', {
            borderTopColor: '#d7d7d7',
          })}
          textStyle={getStyle('messina-sans-bold font-size-16')}
          text="Got it!"
          onPress={() => setModal(false)}
        />
      </View>
    </Modal>
  );
};

export default SentRequestDialog;

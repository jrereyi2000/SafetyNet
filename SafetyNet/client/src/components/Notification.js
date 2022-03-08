import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
} from 'react-native';
import { getStyle } from '../css/Styles';
import Modal from 'react-native-modal';

const Notification = ({ open, setOpen, children, Icon }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setVisible(true);
      }, 1000);
    } else {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, [open]);

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      transparent
      backdropOpacity={0}
      onBackdropPress={() => setOpen(false)}
      style={getStyle('justify-content-flex-start padding-top-8p')}
    >
      <View style={getStyle('width-100p height-60 white border-radius-5 align-items-center flex-direction-row padding-2p padding-left-6p', {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
      })}>
        <Icon />
        <Text style={getStyle('messina-sans-semibold font-size-14 margin-left-20 flex')}>
          {children}
        </Text>
        <Pressable onPress={() => setOpen(false)} style={getStyle('width-30 height-100p align-items-flex-end')}>
          <Image style={getStyle('width-16 height-16')} source={require('../../res/images/closeIcon.png')} />
        </Pressable>
      </View>
    </Modal>
  );
};

export default Notification;

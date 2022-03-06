import React, { useState } from 'react';
import { View, Pressable, Image } from 'react-native';
import { getStyle, colors } from '../css/Styles';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from './Button';

const TimePicker = ({ open, setOpen, setTime, time }) => {
  const [tempTime, setTempTime] = useState(time);

  return (
    <Modal
      isVisible={open}
      backdropColor={colors.bgNavy1000}
      backdropOpacity={0.8}
      transparent
      onBackdropPress={() => {
        setOpen(false);
      }}>
      <View
        style={getStyle(
            'width-100p height-43p white padding-6p border-radius-10',
        )}>
        <View style={getStyle('width-100p align-items-flex-end', { marginTop: -10, marginRight: -10 })}>
          <Pressable
            style={getStyle('justify-content-center width-50 height-50 align-items-flex-end')}
            onPress={() => setOpen(false)}>
            <Image source={require('../../res/images/closeIcon.png')} />
          </Pressable>
        </View>
        <DateTimePicker
          testID="timePicker"
          value={tempTime}
          minimumDate={new Date()}
          mode='time'
          is24Hour={true}
          display="spinner"
          onChange={(_, time) => setTempTime(time)}
        />
        <Button
          text="Select time"
          textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
          buttonStyle={getStyle('width-100p height-50 border-radius-100 margin-bottom-20 deepSupport')}
          onPress={() => {
            setTime(tempTime);
            setOpen(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default TimePicker;

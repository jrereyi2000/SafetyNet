import React from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { getStyle } from '../css/Styles';
import { getMonth } from '../utils';

const DateRange = ({ date, setDate, disablePast }) => {
  const goBack = () => setDate(new Date(date.getFullYear(), date.getMonth()-1, date.getDate()));
  const goForward = () => setDate(new Date(date.getFullYear(), date.getMonth()+1, date.getDate()));

  const dateStr = `${getMonth(date.getMonth())} ${date.getFullYear()}`;
  const sameMonth = (d1, d2) => d1.getMonth() === d2.getMonth() && d1.getYear() === d2.getYear();
  return (
    <View style={getStyle('width-100p height-10p align-items-center justify-content-center', { marginTop: -20 })}>
      <View style={getStyle('flex-direction-row align-items-center')}>
        <Pressable
          disabled={disablePast && sameMonth(date, new Date())}
          style={getStyle('width-50 height-50 align-items-flex-end justify-content-center')}
          onPress={() => goBack()}>
          <Image style={{
            display: disablePast && sameMonth(date, new Date()) ? 'none' : 'flex',
          }} source={require('../../res/images/rightSalmon.png')} />
        </Pressable>
        <Text style={getStyle('text-salmon messina-sans-bold font-size-20 text-align-center margin-left-10p margin-right-10p')}>
          {dateStr}
        </Text>
        <Pressable
          style={getStyle('width-50 height-50 justify-content-center')}
          onPress={() => goForward()}>
          <Image source={require('../../res/images/rightSalmon.png')} />
        </Pressable>
      </View>
    </View>
  );
};

export default DateRange;

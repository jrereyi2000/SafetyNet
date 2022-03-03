import React from 'react';
import {View} from 'react-native';
import {getStyle} from '../css/Styles';

const SplashScreen = ({navigation}) => {
  const viewStyle = getStyle(
      'height-100p width-100p align-items-center slidePassGreen',
  );

  return <View style={viewStyle} />;
};

export default SplashScreen;

import React from 'react';
import { View } from 'react-native';
import { getStyle } from '../css/Styles';

const Separator = ({ height, fixed }) => {
  return <View style={getStyle(`width-100p height-${height}${fixed ? '' : 'p'}`)} />;
};

export default Separator;

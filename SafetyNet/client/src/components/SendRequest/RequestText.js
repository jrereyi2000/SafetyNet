import React from 'react';
import { Text } from 'react-native';
import { getStyle } from '../../css/Styles';

const RequestText = ({ children, style }) => (
  <Text style={style ?? getStyle('margin-left-4p messina-sans-semibold font-size-16')}>
    {children}
    <Text
      style={getStyle('messina-sans-semibold font-size-20', {
        color: '#ea7c79',
      })}>
        *
    </Text>
  </Text>
);

export default RequestText;

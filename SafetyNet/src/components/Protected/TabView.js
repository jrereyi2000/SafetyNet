import React from 'react';
import {View, Image, Text} from 'react-native';
import {colors, getStyle} from '../../css/Styles';

const TabView = ({focused, focusedIcon, notFocusedIcon, text}) => {
  return (
    <View
      style={getStyle(
        'width-75 height-50 justify-content-flex-end align-items-center',
      )}>
      <Image
        style={getStyle('margin-bottom-6')}
        source={focused ? focusedIcon : notFocusedIcon}
        resizeMethod={'resize'}
        resizeMode={'contain'}
      />
      <Text
        style={getStyle('font-size-12', {
          color: focused ? colors.vipTangerine : colors.grey100,
        })}>
        {text}
      </Text>
    </View>
  );
};

export default TabView;

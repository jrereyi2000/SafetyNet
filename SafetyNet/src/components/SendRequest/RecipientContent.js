import React from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';
import { getStyle } from '../../css/Styles';

const RecipientContent = ({ header, item, inNetwork }) => {
  switch (header) {
    case 'People':
      return (
        <Text
          style={getStyle('font-size-20 messina-sans-regular', {
            color: inNetwork ? 'white' : 'black',
          })}>
          {item.split(' ')[0][0]}
          {item.split(' ')[1][0]}
        </Text>
      );
    case 'My Groups':
      return (
        <View style={getStyle('align-items-center')}>
          <Text
            style={getStyle('font-size-16 messina-sans-bold margin-bottom-2', {
              color: inNetwork ? 'white' : 'black',
            })}>
              +{item.size}
          </Text>
          <Image source={require('../../../res/images/person.png')} />
        </View>
      );
    case 'Community Groups':
      return <Image source={require('../../../res/images/house.png')} />;
    default:
      return <View></View>;
  }
};

export default RecipientContent;

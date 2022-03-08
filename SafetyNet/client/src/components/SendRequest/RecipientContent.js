import React from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';
import { getStyle } from '../../css/Styles';

const RecipientContent = ({ header, item, inNetwork, big }) => {
  switch (header) {
    case 'Connections':
      return (
        <Text
          style={getStyle('messina-sans-regular', {
            color: inNetwork ? 'white' : 'black',
            fontSize: big ? 32 : 20,
          })}>
          {item.name.split(' ')[0][0].toUpperCase()}
          {item.name.split(' ')[1][0].toUpperCase()}
        </Text>
      );
    case 'My Groups':
      return (
        <View style={getStyle('align-items-center')}>
          <Text
            style={getStyle('font-size-16 messina-sans-bold margin-bottom-2', {
              color: inNetwork ? 'white' : 'black',
            })}>
              +{item.members.length}
          </Text>
          <Image style={getStyle('width-19 height-19')} source={inNetwork ? require('../../../res/images/personWhite.png') : require('../../../res/images/person.png')} />
        </View>
      );
    case 'My Community Groups':
      return <Image source={require('../../../res/images/house.png')} />;
    default:
      return <View></View>;
  }
};

export default RecipientContent;

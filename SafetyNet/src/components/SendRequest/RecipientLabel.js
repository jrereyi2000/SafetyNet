import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { getStyle } from '../../css/Styles';

const RecipientLabel = ({ header, item, inNetwork, opacity }) => {
  const itemList = item.name ? [] : item.split(' ');

  switch (header) {
    case 'People':
      return (
        <Text
          style={getStyle(
              `font-size-14 messina-sans-${inNetwork ? 'bold' : 'regular'}`,
              { opacity },
          )}>
          {itemList[0]} {itemList[1][0]}.
        </Text>
      );
    case 'My Groups':
      return (
        <Text
          style={getStyle(
              `font-size-14 messina-sans-${inNetwork ? 'bold' : 'regular'}`,
              { opacity },
          )}>
          {item.name}
        </Text>
      );
    case 'Community Groups':
      return (
        <Text
          style={getStyle(
              `font-size-14 messina-sans-${inNetwork ? 'bold' : 'regular'}`,
              { opacity },
          )}>
          {itemList[0]} {itemList.length > 1 && `${itemList[1][0]}.`}
        </Text>
      );
    default:
      return <View></View>;
  }
};

export default RecipientLabel;

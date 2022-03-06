import React from 'react';
import { View, Image, Text } from 'react-native';
import { getStyle } from '../css/Styles';

const RequestInboxScreen = ({ navigation }) => {
  const viewStyle = getStyle(
      'height-100p width-100p align-items-center white padding-left-6p padding-right-6p',
  );

  return (
    <View style={viewStyle}>
      <View
        style={getStyle('width-100p flex center padding-top-10p')}>
        <Image source={require('../../res/images/noIncomingRequests.png')} />
        <Text
          style={getStyle(
              'font-size-20 messina-sans-semibold margin-top-6p margin-bottom-3p',
          )}>
              No Incoming Requests
        </Text>
        <Text style={getStyle('font-size-16 messsina-sans-light')}>
              When your network needs your
        </Text>
        <Text style={getStyle('font-size-16 messsina-sans-light')}>
              help, find their requests here.
        </Text>
      </View>
    </View>
  );
};

export default RequestInboxScreen;

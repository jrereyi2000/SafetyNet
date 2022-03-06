import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import Button from '../Button';
import { colors, getStyle } from '../../css/Styles';
import Input from '../Input';

const SetLocationView = ({
  dispatch,
  location,
}) => {
  const locations = [
    'Washington DC',
    '2476 Filbert Street, San Francisco',
    '234 Jackson Street, New York',
    '234 Jackson Street, New York',
  ];

  const [tempLocation, setTempLocation] = useState(location);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={getStyle('width-100p height-100p align-items-center')}>
      <View
        style={getStyle(
            'width-100p justify-content-space-between flex-direction-row margin-bottom-6p',
        )}>
        <Pressable
          style={getStyle('justify-content-center align-items-flex-end')}
          onPress={() => dispatch({ type: 'screen', payload: 'create' })}>
          <Image source={require('../../../res/images/backIcon.png')} />
        </Pressable>
        <View style={getStyle('flex-direction-row align-items-center')}>
          <Image source={require('../../../res/images/location.png')} />
          <Text
            style={getStyle(
                'messina-sans-bold font-size-28 margin-left-16',
            )}>
                    Select location
          </Text>
        </View>
        <View
          style={getStyle('justify-content-center align-items-flex-end')}
        />
      </View>
      <View
        style={getStyle(
            'width-100p flex-direction-row margin-bottom-4p',
        )}>
        <Input
          inputStyle={getStyle(
              'width-100p align-items-center height-50 border-bottom-width-2',
              { borderBottomColor: colors.deepSupport },
          )}
          value={tempLocation}
          textStyle={getStyle('flex height-45')}
          icon="searchIcon.png"
          autoFocus
          endIcon={tempLocation.length ? 'closeIcon.png' : undefined}
          onChange={(text) => setTempLocation(text)}
          onEndIconPress={() => setTempLocation('')}
        />
      </View>
      <View style={getStyle('width-100p margin-bottom-6p')}>
        {['Current Location'].concat(locations).map((loc, i) => (
          <Pressable
            key={i}
            onPress={() => setTempLocation(loc)}
            style={getStyle(
                'width-100p flex-direction-row align-items-center height-48',
            )}>
            <Image
              source={
                        loc === 'Current Location' ?
                          require('../../../res/images/currentLocationIcon.png') :
                          require('../../../res/images/locationOutlineIcon.png')
              }
              style={getStyle('margin-right-20')}
            />
            <Text
              style={getStyle(
                  `font-size-14 messina-sans-${
                          loc === 'Current Location' ? 'bold' : 'regular'
                  }`,
              )}>
              {loc}
            </Text>
          </Pressable>
        ))}
      </View>
      <Button
        text="Select location"
        disabledTextStyle={getStyle(
            'messina-sans-bold font-size-16 text-white',
        )}
        textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
        disabledButtonStyle={getStyle(
            'width-100p height-50 border-radius-100 margin-bottom-20 deepSupport',
        )}
        disabled={!tempLocation}
        buttonStyle={getStyle(
            'width-100p height-50 border-radius-100 margin-bottom-20 deepSupport',
        )}
        onPress={() => {
          dispatch({ type: 'location', payload: tempLocation });
          dispatch({ type: 'screen', payload: 'create' });
        }}
        centerIcon
      />
    </KeyboardAvoidingView>
  );
};

export default SetLocationView;

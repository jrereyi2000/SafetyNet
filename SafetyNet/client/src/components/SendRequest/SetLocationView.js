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
import { getAddress } from '../../utils';
import axios from 'axios';
import Config from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';

const SetLocationView = ({
  dispatch,
  location,
}) => {
  const [locations, setLocations] = useState([]);

  const [tempLocation, setTempLocation] = useState(location === 'Current Location' ? '' : location);
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
          endIcon={tempLocation?.length ? 'closeIcon.png' : undefined}
          onChange={(text) => {
            if (text.length > 0) {
              axios
                  .post(
                      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${Config.GOOGLE_API_KEY}&input=${text}&components=country:us`,
                  )
                  .then((res) => {
                    setLocations(res.data.predictions);
                  })
                  .catch((_err) => {});
            } else {
              setLocations([]);
            }
            setTempLocation(text);
          }}
          onEndIconPress={() => {
            setTempLocation('');
            setLocations([]);
          }}
        />
      </View>
      <View style={getStyle('width-100p margin-bottom-6p')}>
        {[{ description: 'Current Location' }].concat(locations).map((loc, i) => (
          <Pressable
            key={i}
            onPress={() => setTempLocation(loc.description)}
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
                          loc.description === 'Current Location' ? 'bold' : 'regular'
                  }`,
              )}>
              {loc.description}
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
          if (tempLocation !== 'Current Location') {
            dispatch({ type: 'location', payload: { isCurrent: false, address: tempLocation } });
            dispatch({ type: 'screen', payload: 'create' });
          } else {
            Geolocation.getCurrentPosition(
                (pos) => {
                  getAddress(pos.coords.longitude, pos.coords.latitude).then((res) => {
                    dispatch({ type: 'location', payload: { isCurrent: true, address: res } });
                    dispatch({ type: 'screen', payload: 'create' });
                  });
                },
                (_err) => {
                  // console.log(_err);
                },
            );
          }
        }}
        centerIcon
      />
    </KeyboardAvoidingView>
  );
};

export default SetLocationView;

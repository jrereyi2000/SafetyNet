import React, { useContext, useState } from 'react';
import {
  View,
  Pressable,
  Image,
  Text,
} from 'react-native';
import { RecipientContent } from '../components/SendRequest';
import Button from '../components/Button';
import { colors, getStyle } from '../css/Styles';
import { hasHomeButton } from '../utils';
import Keychain from 'react-native-keychain';
import axios from 'axios';
import Config from 'react-native-config';
import AppContext from '../AppContext';

const removeConnection = (user_id, connection_id, state, navigation, setError) => {
  axios
      .post(`${Config.HOST_URL}/api/removeConnection`, {
        userId: user_id,
        connectionId: connection_id,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);

        navigation.goBack();
      })
      .catch((error) => {
      // console.log(error.response);
        setError(true);
        // state.set_error(true);
      });
};

const ConnectionScreen = ({ navigation, route }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};
  const [error, setError] = useState(false);

  if (!route.params?.connection) {
    navigation.goBack();
    return <View />;
  }

  const connection = route.params.connection;
  const phone = connection.number;
  return (
    <View style={getStyle('border-bottom-width-1', { borderBottomColor: '#999999' })}>
      <View style={getStyle('height-100p width-100p white', {
        paddingTop: hasHomeButton() ? '4%' : 0,
      })}>
        <View
          style={getStyle('flex-direction-row width-100p', {
            marginTop: hasHomeButton() ? '7%' : '20%',
          })}>
          <Pressable
            style={getStyle('padding-left-6p width-100 height-50')}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../res/images/backIcon.png')}
              style={getStyle('width-20 height-20')}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View style={getStyle('width-100p align-items-center flex')}>
          <View
            style={getStyle(
                'height-90 width-90 justify-content-center align-items-center border-radius-45 margin-bottom-16', {
                  backgroundColor: colors.sky,
                })}>
            <RecipientContent big header="Connections" item={connection} />
          </View>
          <Text style={getStyle('font-size-24 messina-sans-bold margin-bottom-10')}>
            {connection.name}
          </Text>
          <Text style={getStyle('font-size-16 messina-sans-regular')}>
            {`(${phone.substr(0, 3)}) ${phone.substr(3, 3)}-${phone.substr(6)}`}
          </Text>
        </View>
        <Button
          text="Remove from My Network"
          textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
          buttonStyle={getStyle(
              'width-88p height-50 border-radius-100 salmon margin-6p',
          )}
          onPress={() => removeConnection(user._id, connection._id, appState, navigation, setError)}
        />
      </View>
    </View>
  );
};

export default ConnectionScreen;

import React, { useContext } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import CodeInput from '../../components/CodeInput';
import Button from '../../components/Button';
import { getStyle } from '../../css/Styles';
import {
  viewStyle,
  headerStyle,
  errStyle,
  nextStyle,
  backStyle,
  buttonStyle,
  loadingButtonStyle,
  disabledButtonStyle,
} from './LoginStyles';
import { isDisabled, handleButtonPress } from './LoginUtils';
import AppContext from '../../AppContext';
import Config from 'react-native-config';
import base64 from 'react-native-base64';
import axios from 'axios';

const requestNewCode = (phoneNum) => {
  const authHeader =
    'Basic ' +
    base64.encode(`${Config.TWILIO_ACCOUNT_SID}:${Config.TWILIO_AUTH_TOKEN}`);

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authHeader,
    },
  };

  const body = {
    To: `%2b1${phoneNum}`,
    Channel: 'sms',
  };

  const url = `https://verify.twilio.com/v2/Services/${Config.TWILIO_SERVICE_SID}/Verifications`;
  axios.post(
      url,
      Object.keys(body)
          .map((key) => key + '=' + body[key])
          .join('&'),
      config,
  )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
};

export const CodeScreen = ({ navigation }) => {
  const state = useContext(AppContext);

  return (
    <View style={viewStyle}>
      <View style={[{ paddingLeft: '6.8%' }, viewStyle]}>
        <Pressable
          style={backStyle}
          onPress={() => {
            state.set_mode('phone');
          }}>
          <Image
            style={{ height: 24, width: 24 }}
            source={require('../../../res/images/backIcon.png')}
          />
        </Pressable>
        <View style={headerStyle}>
          <Text
            style={getStyle('avenir-heavy font-size-28')}>
            Enter Code
          </Text>
        </View>
        <CodeInput />
        {state.mode.includes('err') && (
          <Text style={getStyle('font-size text-redCandy margin-top-10')}>
            Sorry, that code is incorrect. Please try again.
          </Text>
        )}
        <View style={state.mode.includes('err') ? errStyle : nextStyle}>
          <Button
            buttonStyle={buttonStyle}
            type="icon"
            icon="forward.png"
            disabled={isDisabled(state)}
            disabledButtonStyle={disabledButtonStyle}
            loadingButtonStyle={loadingButtonStyle}
            onPress={() => handleButtonPress(state, navigation)}
          />
          <Pressable onPress={() => requestNewCode(state.mobile_num)}>
            <Text style={getStyle('messina-sans-regular')}>Resend Code</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

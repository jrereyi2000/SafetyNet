import Config from 'react-native-config';
import base64 from 'react-native-base64';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import { Keyboard } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const isDevNumber = () => {};

const signIn = async (phoneNum, state, navigation) => {
  return await axios
      .post(`${Config.HOST_URL}/api/signin`, {
        mobileNumber: phoneNum.replace(/-/g, ''),
      })
      .then((response) => {
      // console.log(response.data);
        Geolocation.requestAuthorization();
        const user = response.data.user;
        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);
        Keyboard.dismiss();
        navigation.navigate('Protected');
        return true;
      })
      .catch((error) => {
      // console.log(error.response);
        return false;
      });
};

const checkCode = async (code, phoneNum) => {
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
    Code: code,
  };

  const url = `https://verify.twilio.com/v2/Services/${Config.TWILIO_SERVICE_SID}/VerificationCheck`;
  const st = await axios
      .post(
          url,
          Object.keys(body)
              .map((key) => key + '=' + body[key])
              .join('&'),
          config,
      )
      .then((res) => res.data.status)
      .catch((_) => {
      // console.log(_.response);
        return 'canceled';
      });
  return st === 'approved';
};

const createUser = (state, navigation) => {
  const mobile_number = state.mobile_num;

  axios
      .post(`${Config.HOST_URL}/api/signup`, {
        mobileNumber: mobile_number.replace(/-/g, ''),
        fullName: state.name,
      })
      .then(async (response) => {
        const user = response.data.user;
        // console.log(user);
        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);
        navigation.navigate('Protected');
      })
      .catch((error) => {
      // console.log(error.response);
        state.set_error(true);
      });
};

const authHeader =
  'Basic ' +
  base64.encode(`${Config.TWILIO_ACCOUNT_SID}:${Config.TWILIO_AUTH_TOKEN}`);

export const handleButtonPress = async (state, navigation) => {
  switch (state.mode) {
    case 'phone':
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader,
        },
      };

      const body = {
        To: `%2b1${state.mobile_num}`,
        Channel: 'sms',
      };

      if (isDevNumber(state.mobile_num)) {
        state.set_mode('code');
        return;
      }

      const url = `https://verify.twilio.com/v2/Services/${Config.TWILIO_SERVICE_SID}/Verifications`;
      // console.log(url);

      axios
          .post(
              url,
              Object.keys(body)
                  .map((key) => key + '=' + body[key])
                  .join('&'),
              config,
          )
          .then((res) => {
            state.set_mode('code');
          })
          .catch((_err) => {
            // console.log(_err.response);
            state.set_mode('code');
          });
      state.set_mode('code');
      return;
    case 'code':
    case 'code_err':
      // Check if code is correct
      const correct = await checkCode(state.code, state.mobile_num);
      if (correct) {
        if (!(await signIn(state.mobile_num, state, navigation))) {
        // console.log('Setting mode as name');
          state.set_mode('name');
        }
      } else {
        state.set_mode('code_err');
      }
      return;
    case 'name':
      createUser(state, navigation);
      return;
  }
};

export const isDisabled = (state) => {
  switch (state.mode) {
    case 'phone':
      return (
        !isDevNumber(state.mobile_num) &&
        !state.mobile_num.match(
            '[2-9][0-9][0-9]-[2-9][0-9][0-9]-[0-9][0-9][0-9][0-9]',
        )
      );
    case 'code':
      return state.code.length !== 6;
    case 'name':
      return state.name.length === 0;
  }
};

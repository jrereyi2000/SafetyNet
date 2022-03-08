import React, { useContext } from 'react';
import { PhoneNumberScreen } from './PhoneNumberScreen';
import { CodeScreen } from './CodeScreen';
import { NameScreen } from './NameScreen';
import AppContext from '../../AppContext';

const LoginScreen = ({ navigation, route }) => {
  const state = useContext(AppContext);
  // console.log(state)
  switch (state.mode) {
    case 'phone':
      return <PhoneNumberScreen navigation={navigation} route={route} />;
    case 'code':
    case 'code_err':
      return <CodeScreen navigation={navigation} route={route} />;
    case 'name':
      return <NameScreen navigation={navigation} route={route} />;
  }
};

export default LoginScreen;

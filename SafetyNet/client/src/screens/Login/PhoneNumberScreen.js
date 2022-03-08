import React, { useContext } from 'react';
import { View, Text, Pressable, Image, TextInput } from 'react-native';
import Button from '../../components/Button';
import { getStyle } from '../../css/Styles';
import {
  viewStyle,
  headerStyle,
  backStyle,
  loadingButtonStyle,
  nextStyle,
  inputStyle,
  buttonStyle,
  disabledButtonStyle,
  textStyle,
} from './LoginStyles';
import { isDisabled, handleButtonPress } from './LoginUtils';
import AppContext from '../../AppContext';
// import {useFocusEffect} from '@react-navigation/native';

const handleMobileNumChange = (param, state) => {
  if (
    (state.mobile_num.length === 3 && param.length === 4) ||
    (state.mobile_num.length === 7 && param.length === 8)
  ) {
    state.set_mobile_num(param.slice(0, -1) + '-' + param.slice(-1));
  } else {
    state.set_mobile_num(param);
  }
};

export const PhoneNumberScreen = ({ navigation }) => {
  const state = useContext(AppContext);

  // let input;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log(input);
  //     input.focus();
  //   }, []),
  // );

  return (
    <View style={viewStyle}>
      <View style={[{ paddingLeft: '6.8%' }, viewStyle]}>
        <Pressable
          style={backStyle}
          onPress={() => {
            state.clear_state();
            navigation.navigate('Home');
          }}>
          <Image
            style={getStyle('height-24 width-24')}
            source={require('../../../res/images/backIcon.png')}
          />
        </Pressable>
        <View style={headerStyle}>
          <Text
            style={getStyle('avenir-heavy font-size-28')}>
            Enter your phone
          </Text>
          <Text
            style={getStyle('avenir-heavy font-size-28')}>
            number
          </Text>
        </View>
        <View
          style={[
            inputStyle,
            getStyle('flex-direction-row align-items-center'),
          ]}>
          <Image
            style={getStyle(
                'height-20 margin-top-10 margin-left-5 margin-bottom-10 margin-right-10',
            )}
            source={require('../../../res/images/us.png')}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <TextInput
            style={textStyle}
            // ref={(ref) => (input = ref)}
            autoCapitalize={'none'}
            autoFocus={true}
            value={state.mobile_num}
            keyboardType="numeric"
            onChangeText={(param) => handleMobileNumChange(param, state)}
          />
          {state.mobile_num.length > 0 && (
            <Pressable onPress={() => state.set_mobile_num('')}>
              <Image
                style={getStyle(
                    'height-20 margin-top-10 margin-left-5 margin-bottom-10 margin-right-4',
                )}
                source={require('../../../res/images/closeIcon.png')}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
        <View style={nextStyle}>
          <Button
            buttonStyle={buttonStyle}
            type="icon"
            icon="forward.png"
            disabled={isDisabled(state)}
            disabledButtonStyle={disabledButtonStyle}
            loadingButtonStyle={loadingButtonStyle}
            onPress={() => handleButtonPress(state)}
          />
        </View>
      </View>
    </View>
  );
};

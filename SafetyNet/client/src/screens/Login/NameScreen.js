import React, { useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import { colors, getStyle } from '../../css/Styles';
import {
  viewStyle,
  headerStyle,
  backStyle,
  nextStyle,
  buttonStyle,
  disabledButtonStyle,
  loadingButtonStyle,
  inputStyle,
  textStyle,
} from './LoginStyles';
import { isDisabled, handleButtonPress } from './LoginUtils';
import AppContext from '../../AppContext';
// import { updateUser } from '../../components/ProfileSetup';
// import {useFocusEffect} from '@react-navigation/native';

export const NameScreen = ({ navigation, route }) => {
  const state = useContext(AppContext);

  const nameInputStyle = state.error ?
    [inputStyle, { borderBottomColor: colors.redCandy }] :
    inputStyle;

  // let input;
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log(input);
  //     input?.focus();
  //   }, []),
  // );

  const saveButtonStyle = getStyle(
      'width-88p margin-right-9p border-color-vipTangerine border-width-2 border-radius-100',
      {
        height: 60,
      },
  );
  const noSetup = route.params?.noSetup;

  const saveTextStyle = getStyle(
      'text-tangerine messina-sans-regular font-size-16',
  );

  const setupButtonProps = {
    buttonStyle,
    type: 'icon',
    icon: 'forward.png',
    disabled: isDisabled(state),
    disabledButtonStyle,
    loadingButtonStyle,
    onPress: () => handleButtonPress(state, navigation),
  };

  const saveButtonProps = {
    buttonStyle: saveButtonStyle,
    disabled: isDisabled(state),
    disabledButtonStyle,
    textStyle: saveTextStyle,
    text: 'Save',
    onPress: () => {},
    // updateUser(state, { name: state.name }, () => navigation.goBack()),
  };

  const buttonProps = noSetup ? saveButtonProps : setupButtonProps;

  return (
    <View style={viewStyle}>
      <View style={[{ paddingLeft: '6.8%' }, viewStyle]}>
        <Pressable
          style={backStyle}
          onPress={() =>
            noSetup ? navigation.goBack() : state.set_mode('code')
          }>
          <Image
            style={getStyle('height-24 width-24')}
            source={require('../../../res/images/backIcon.png')}
          />
        </Pressable>
        <View
          style={[
            { marginBottom: Dimensions.get('window').height * 0.039 },
            headerStyle,
          ]}>
          <Text
            style={getStyle('avenir-heavy font-size-28')}>
            Enter your name
          </Text>
        </View>
        <View
          style={[
            nameInputStyle,
            getStyle('flex-direction-row align-items-center'),
          ]}>
          <TextInput
            style={textStyle}
            // ref={(ref) => (input = ref)}
            autoFocus={true}
            autoCapitalize={'words'}
            autoCorrect={false}
            value={state.name}
            onChangeText={(param) => state.set_name(param)}
          />
          {state.name.length > 0 && (
            <Pressable onPress={() => state.set_name('')}>
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
        {state.error && (
          <Text
            style={getStyle(
                'messina-sans-regular text-redCandy margin-top-2p font-size-12',
            )}>
            Error occured during signup. Please try again.
          </Text>
        )}
        <View style={nextStyle}>
          <Button {...buttonProps} />
        </View>
      </View>
    </View>
  );
};

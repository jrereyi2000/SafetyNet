import React, { useContext } from 'react';
import { Pressable, View, TextInput, Text, Dimensions } from 'react-native';
import AppContext from '../AppContext';
import { getStyle } from '../css/Styles';

const inputStyle = getStyle('flex-direction-row', {
  marginTop: Dimensions.get('window').height * 0.093,
  height: Dimensions.get('window').height * 0.054,
});
const numberInputStyle = getStyle(
    'height-100p border-bottom-deepSupport border-bottom-width-2',
    {
      width: Dimensions.get('window').width * 0.096,
      marginRight: Dimensions.get('window').width * 0.011,
    },
);
const errorNumberInputStyle = getStyle(
    'height-100p border-bottom-redCandy border-bottom-width-2',
    {
      width: Dimensions.get('window').width * 0.096,
      marginRight: Dimensions.get('window').width * 0.011,
    },
);
const textStyle = getStyle('font-size-32 text-align-center avenir-heavy');
const invisibleStyle = getStyle(
    'font-size-32 text-align-center text-white width-0 height-0',
);

const CodeInput = () => {
  const state = useContext(AppContext);

  let input;
  const style = state.mode.includes('err') ?
    errorNumberInputStyle :
    numberInputStyle;

  return (
    <View style={inputStyle}>
      <TextInput
        autoFocus={true}
        ref={(ref) => (input = ref)}
        style={invisibleStyle}
        autoCorrect={false}
        autoCapitalize={'none'}
        value={state.code}
        keyboardType={'numeric'}
        onChangeText={(param) => state.set_code(param)}
      />
      <Pressable style={style} onPress={() => input && input.focus()}>
        <Text style={textStyle}>{state.code[0] ?? ''}</Text>
      </Pressable>
      <Pressable style={style} onPress={() => input && input.focus()}>
        <Text style={textStyle}>{state.code[1] ?? ''}</Text>
      </Pressable>
      <Pressable style={style} onPress={() => input && input.focus()}>
        <Text style={textStyle}>{state.code[2] ?? ''}</Text>
      </Pressable>
      <Pressable style={style} onPress={() => input && input.focus()}>
        <Text style={textStyle}>{state.code[3] ?? ''}</Text>
      </Pressable>
      <Pressable style={style} onPress={() => input && input.focus()}>
        <Text style={textStyle}>{state.code[4] ?? ''}</Text>
      </Pressable>
      <Pressable style={style} onPress={() => input && input.focus()}>
        <Text style={textStyle}>{state.code[5] ?? ''}</Text>
      </Pressable>
    </View>
  );
};

export default CodeInput;

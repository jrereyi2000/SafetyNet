import React from 'react';
import { View, Image, TextInput, Text, Pressable } from 'react-native';
import { getStyle } from '../css/Styles';

const getImageUrl = (filename) => {
  switch (filename) {
    case 'searchIcon.png':
      return require('../../res/images/searchIcon.png');
    case 'closeIcon.png':
      return require('../../res/images/closeIcon.png');
    default:
      return;
  }
};

const Input = ({
  header,
  headerStyle,
  inputStyle,
  endIcon,
  password,
  endIconStyle,
  textStyle,
  value,
  placeholder,
  disabled,
  autoFocus,
  disabledTextStyle,
  multiline,
  placeholderTextColor,
  autoCapitalize = 'none',
  autoCorrect = false,
  keyboardType,
  dollar,
  icon,
  onFocus = () => {},
  onBlur = () => {},
  onChange = () => {},
  onEndIconPress = () => {},
}) => {
  const defaultIconStyle = getStyle(
      'height-20 width-20 align-items-center justify-content-center margin-right-10',
  );

  if (header) {
    return (
      <View style={inputStyle}>
        <Text style={headerStyle}>{header}</Text>
        <View>
          <TextInput
            style={
              disabled && disabledTextStyle ? disabledTextStyle : textStyle
            }
            autoCorrect={autoCorrect}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize={autoCapitalize}
            value={value}
            multiline={multiline}
            autoFocus={autoFocus}
            editable={!disabled}
            onChangeText={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[inputStyle, { flexDirection: 'row' }]}>
      {icon ? (
        <Image
          style={defaultIconStyle}
          source={getImageUrl(icon)}
          resizeMethod="resize"
          resizeMode="contain"
        />
      ) : (
        <View style={getStyle('height-100p justify-content-center')}>
          {dollar && <Text style={disabled && disabledTextStyle ? disabledTextStyle : textStyle}>$</Text>}
        </View>
      )}
      <TextInput
        style={disabled && disabledTextStyle ? disabledTextStyle : textStyle}
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        secureTextEntry={password}
        autoFocus={autoFocus}
        value={value}
        editable={!disabled}
        multiline={multiline}
        keyboardType={keyboardType}
        onChangeText={onChange}
      />
      {endIcon && (
        <Pressable onPress={() => onEndIconPress()}>
          <Image
            style={endIconStyle ?? defaultIconStyle}
            source={getImageUrl(endIcon)}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </Pressable>
      )}
    </View>
  );
};

export default Input;

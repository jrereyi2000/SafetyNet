import React, {useReducer, useEffect, useRef} from 'react';
import {
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {getStyle} from '../css/Styles';
import {useFocusEffect} from '@react-navigation/native';
import {reducer} from '../utils';

const getImageUrl = (filename) => {
  switch (filename) {
    case 'newRequestIcon.png':
      return require('../../res/images/newRequestIcon.png');
    case 'sendRequestIcon.png':
      return require('../../res/images/sendRequestIcon.png');
    default:
      return;
  }
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  buttonStyle,
  textStyle,
  disabledButtonStyle,
  disabledTextStyle,
  loadingButtonStyle,
  iconStyle,
  text = '',
  icon,
  endIcon,
  disabled = false,
  type,
  noPadding,
  padding,
  centerIcon,
  alwaysShowIcon,
  onPress = () => {},
}) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    click: false,
  });

  let mounted;
  useEffect(() => {
    mounted = true;
    return () => (mounted = false);
  }, []);

  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (state.click) {
      Animated.timing(opacity, {
        toValue: 0.2,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [state.click]);

  useFocusEffect(() => {
    state.loading && dispatch({type: 'loading', payload: false});
  });

  let outerStyle = buttonStyle;
  if (state.loading && loadingButtonStyle) outerStyle = loadingButtonStyle;
  if (disabled && disabledButtonStyle) outerStyle = disabledButtonStyle;

  const tStyle = disabled && disabledTextStyle ? disabledTextStyle : textStyle;

  return (
    <AnimatedPressable
      style={[
        outerStyle,
        getStyle('align-items-center flex-direction-row', {
          justifyContent:
            state.loading || disabled || centerIcon || (!icon && !endIcon) ?
              'center' :
              'space-between',
          paddingLeft:
            state.loading || disabled || noPadding ? 0 : padding ?? 20,
          paddingRight:
            state.loading || disabled || noPadding ? 0 : padding ?? 20,
          opacity: disabled ? 0.6 : opacity,
        }),
      ]}
      onPressIn={() => {
        dispatch({type: 'click', payload: true});
      }}
      onPress={async () => {
        dispatch({type: 'click', payload: false});
        dispatch({type: 'loading', payload: true});
        await onPress();
        mounted && dispatch({type: 'loading', payload: false});
      }}
      disabled={disabled}>
      {state.loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          {(alwaysShowIcon || !disabled) && type !== 'icon' && icon && (
            <Image
              style={centerIcon ? iconStyle : getStyle('width-20 height-20')}
              resizeMethod="resize"
              resizeMode='contain'
              source={getImageUrl(icon)}
            />
          )}
          {type === 'icon' ? (
            <Image
              style={iconStyle}
              resizeMethod="resize"
              resizeMode='contain'
              source={getImageUrl(disabled ? '' : icon)}
            />
          ) : (
            <Text style={tStyle}>{text}</Text>
          )}
          {(alwaysShowIcon || !disabled) && type !== 'icon' && endIcon && (
            <Image
              style={centerIcon ? iconStyle : getStyle('width-20 height-20')}
              resizeMethod="resize"
              resizeMode='contain'
              source={getImageUrl(endIcon)}
            />
          )}
        </>
      )}
    </AnimatedPressable>
  );
};

export default Button;

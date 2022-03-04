import {StyleSheet, Dimensions} from 'react-native';
import {heightStyles, heightPStyles} from './heightStyles';
import {widthStyles, widthPStyles} from './widthStyles';
import {positioningStyles} from './positioningStyles';
import {paddingStyles} from './paddingStyles';
import {marginStyles} from './marginStyles';
import {colorStyles} from './colorStyles';
import {fontStyles} from './fontStyles';
import {borderStyles} from './borderStyles';
import {hasHomeButton} from '../utils';

export const getStyle = (styleStr, extraStyles = {}) => {
  const allStyles = styleStr.split(' ');
  const new_styles = allStyles.map((style) => styles[style]);
  new_styles.push(extraStyles);
  return new_styles;
};

export const findStyle = (style, property, defaultvalue) => {
  let value = defaultvalue;

  if (style) {
    const propertyObj = style.find((element) =>
      element.hasOwnProperty(property),
    );

    if (propertyObj) value = propertyObj[property];
  }

  return value;
};

export const addStyle = (style, property, value) => {
  if (style) {
    const newStyle = {};
    newStyle[property] = value;
  }

  return style;
};

export const colors = {
  vipTangerine: '#ff8264',
  vipBlue: '#65a7fe',
  redCandy: '#ff441f',
  purpleKush: '#a100f3',
  electricBlueberry: '#2d28ff',
  slidePassGreen: '#4bff7a',
  slurple: '#a699f0',
  spearmint: '#92d8b4',
  linearGradient: '#72a7f7',
  bgBlurTop: 'rgba(24, 27, 49, 0.7)',
  bgBlurBottom: 'rgba(24, 27, 49, 0.7)',
  bgNavy1000: '#0d0f20',
  navy900: '#181b31',
  navy800: '#232745',
  navy700: '#383f6c',
  grey300: '#828ec6',
  grey200: '#9baad4',
  grey100: '#b2c2f1',
  white: '#ffffff',
  black: '#000000',
};

const styles = StyleSheet.create({
  ...heightStyles,
  ...heightPStyles,
  ...widthStyles,
  ...widthPStyles,
  ...positioningStyles,
  ...paddingStyles,
  ...marginStyles,
  ...colorStyles,
  ...fontStyles,
  ...borderStyles,

  'flex': {
    flex: 1,
  },
  'center': {
    alignItems: 'center',
    justifyContent: 'center',
  },
  'border': {
    borderColor: 'black',
    borderWidth: 1,
  },
  'flex-direction-row': {
    flexDirection: 'row',
  },
  'flex-direction-column': {
    flexDirection: 'column',
  },
  'flex-wrap-wrap': {
    flexWrap: 'wrap',
  },
  'profile-circle': {
    height: Dimensions.get('window').width * 0.33,
    width: Dimensions.get('window').width * 0.33,
    borderRadius: Dimensions.get('window').width * 0.165,
  },
  'image-circle': {
    height: Dimensions.get('window').width * 0.27,
    width: Dimensions.get('window').width * 0.27,
    borderRadius: Dimensions.get('window').width * 0.135,
  },
  'icon-circle': {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
  },
  'icon-image-circle': {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  'toast-image-circle': {
    width: 25,
    height: 25,
    marginRight: 25,
  },
  'venue-card': {
    width: Dimensions.get('window').width,
    height: 330,
    backgroundColor: colors.bgNavy1000,
  },
  'venue-card-img': {
    width: '100%',
    height: '45%',
  },
  'venue-img': {
    width: '100%',
    height: Dimensions.get('window').height * 0.23,
    alignItems: 'flex-end',
  },
  'venue-card-details': {
    width: '100%',
    height: '55%',
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: '6%',
  },
  'modal-background': {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  'modal': {
    width: '100%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  'buy-ticket-modal': {
    width: '100%',
    backgroundColor: colors.navy900,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: '6%',
  },
  'settings-modal': {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    marginTop: Dimensions.get('window').height * 0.6,
    backgroundColor: colors.navy900,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  'time-modal': {
    width: '100%',
    height: Dimensions.get('window').height * 0.45,
    marginTop: Dimensions.get('window').height * 0.55,
    backgroundColor: colors.navy800,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  'error-modal': {
    width: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: '5%',
    height: Dimensions.get('window').height * 0.2,
    marginTop: Dimensions.get('window').height * 0.8,
    backgroundColor: colors.navy900,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  'info-modal': {
    width: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: '5%',
    height: Dimensions.get('window').height * 0.27,
    marginTop: Dimensions.get('window').height * 0.73,
    backgroundColor: colors.navy900,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  'image-upload-background': {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  'image-upload': {
    width: '95%',
    height: '17%',
    backgroundColor: 'rgba(249, 249, 249, 0.78)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  'image-cancel': {
    width: '95%',
    height: '7%',
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  'modal-view': {
    width: '100%',
    height: '75%',
    borderColor: 'rgba(102, 102, 102, 0.2)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'modal-buttons-view': {
    width: '100%',
    height: '25%',
    borderColor: 'black',
    flexDirection: 'row',
  },
  'square-80p': {
    width: hasHomeButton() ?
      Dimensions.get('window').width * 0.65 :
      Dimensions.get('window').width * 0.8,
    height: hasHomeButton() ?
      Dimensions.get('window').width * 0.65 :
      Dimensions.get('window').width * 0.8,
  },
  'event-card': {
    width: Dimensions.get('window').width * 0.9,
    height: 118,
    flexDirection: 'row',
  },

  'event-card-img': {
    width: 118,
    height: 118,
    padding: 10,
    paddingLeft: 0,
  },
  'event-img': {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  'event-card-details': {
    width: Dimensions.get('window').width * 0.9 - 118,
    height: 118,
    padding: 10,
    paddingLeft: 15,
  },
  'price-display-top': {
    paddingLeft: '6%',
    paddingRight: '6%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgNavy1000,
    width: '100%',
    height: 50,
  },
});

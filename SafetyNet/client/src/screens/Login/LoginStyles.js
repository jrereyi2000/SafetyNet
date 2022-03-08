import { getStyle, colors } from '../../css/Styles';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  viewStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
  backStyle: {
    marginTop: Dimensions.get('window').height * 0.11,
  },
  headerStyle: {
    marginTop: Dimensions.get('window').height * 0.07,
  },
  inputStyle: {
    marginTop: Dimensions.get('window').height * 0.044,
    borderBottomColor: colors.deepSupport,
    borderBottomWidth: 2,
    width: Dimensions.get('window').width * 0.838,
    height: Dimensions.get('window').height * 0.052,
  },
  nextStyle: {
    marginTop: Dimensions.get('window').height * 0.089,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errStyle: {
    marginTop: Dimensions.get('window').height * 0.0608,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonStyle: {
    height: Dimensions.get('window').height * 0.109,
    width: Dimensions.get('window').width * 0.167,
    marginRight: Dimensions.get('window').width * 0.074,
    borderRadius: 100,
    backgroundColor: colors.deepSupport,
  },
  disabledButtonStyle: {
    height: Dimensions.get('window').height * 0.109,
    width: Dimensions.get('window').width * 0.167,
    marginRight: Dimensions.get('window').width * 0.074,
  },
  loadingButtonStyle: {
    height: Dimensions.get('window').height * 0.109,
    width: Dimensions.get('window').width * 0.167,
    marginRight: Dimensions.get('window').width * 0.074,
    borderRadius: 100,
    backgroundColor: colors.deepSupport,
  },
});

export const viewStyle = styles.viewStyle;
export const backStyle = styles.backStyle;
export const headerStyle = styles.headerStyle;
export const inputStyle = styles.inputStyle;
export const nextStyle = styles.nextStyle;
export const buttonStyle = styles.buttonStyle;
export const disabledButtonStyle = styles.disabledButtonStyle;
export const loadingButtonStyle = styles.loadingButtonStyle;
export const errStyle = styles.errStyle;

export const upperBorderStyle = getStyle(
    'align-items-center height-15p justify-content-flex-start',
);

export const inputSectionStyle = getStyle(
    'align-items-flex-start height-20p justify-content-flex-start',
);

export const errorInputStyle = getStyle(
    'width-90p flex-direction-row height-25p border-radius-10 grey margin-15 padding-left-20 padding-right-20 border-color-red border-width-3',
);

export const halfInputStyle = getStyle(
    'width-42p flex-direction-row height-25p border-radius-10 grey margin-15 padding-left-20 padding-right-20 border-color-black border-width-1',
);

export const textStyle = getStyle(
    'flex messina-sans-regular font-size-20',
);

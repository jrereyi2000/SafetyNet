import React, { useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Button from '../components/Button';
import { getStyle, colors } from '../css/Styles';
import AppContext from '../AppContext';

const HomeScreen = ({ navigation }) => {
  const appState = useContext(AppContext);
  useEffect(() => {
    appState.clear_state();
  }, []);

  const styles = StyleSheet.create({
    buttonsStyle: {
      height: '20.7%',
      width: '100%',
      alignItems: 'center',
      marginBottom: Dimensions.get('window').height * 0.053,
    },
    buttonStyle: {
      width: '87.7%',
      height: '30.9%',
      backgroundColor: colors.deepSupport,
      marginBottom: '4.2%',
      borderWidth: 2,
      borderRadius: 100,
    },
    textStyle: {
      width: '70.1%',
      height: '8.2%',
      fontFamily: 'MessinaSans-Regular',
      fontSize: 11,
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 14,
      letterSpacing: 0.22,
      textAlign: 'center',
      color: 'black',
    },
    imageStyle: {
      marginTop: Dimensions.get('window').height * 0.273,
      marginLeft: Dimensions.get('window').width * 0.041,
      marginBottom: '8%',
    },
  });

  return (
    <View style={getStyle('width-100p height-100p justify-content-space-between align-items-center white')}>
      <View style={getStyle('width-100p height-100p justify-content-space-between align-items-center white')}>
        <View>
          <Image
            style={styles.imageStyle}
            source={require('../../res/images/logo.png')}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text style={getStyle('font-size-18 messina-sans-semibold')}>The support you need, guilt free.</Text>
        </View>
        <View style={styles.buttonsStyle}>
          <Button
            buttonStyle={getStyle('border-color-deepSupport', styles.buttonStyle)}
            textStyle={getStyle(
                'text-align-center font-size-16 font-weight-bold messina-sans-regular text-white',
            )}
            text={'Join SafetyNet'}
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            buttonStyle={{
              marginBottom: '5.8%',
              borderColor: colors.salmon,
              ...styles.buttonStyle,
              backgroundColor: 'white',
            }}
            textStyle={getStyle(
                'text-align-center text-salmon font-weight-bold font-size-16 messina-sans-regular',
            )}
            text={'Login'}
            onPress={() => navigation.navigate('Login')}
          />
          <Text style={styles.textStyle}>
            By using SafetyNet you agree to our{' '}
            <Text style={getStyle('font-weight-900')}>
              Terms of Use
            </Text>
          </Text>
          <Text style={styles.textStyle}>
            and{' '}
            <Text style={getStyle('font-weight-900')}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

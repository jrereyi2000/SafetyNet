/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabView from './src/components/Protected/TabView';
import AppContext from './src/AppContext';
//  import Geolocation from '@react-native-community/geolocation';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getStyle} from './src/css/Styles';
import {StatusBar, View, Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {Dimensions, Pressable, Image} from 'react-native';
import {MMKV} from 'react-native-mmkv';
//  import Settings from './src/components/Settings';
import * as splashScreen from 'react-native-splash-screen';
//  import Amplify from 'aws-amplify';
//  import PushNotification from '@aws-amplify/pushnotification';
//  import awsconfig from './aws-exports';
import {hasHomeButton} from './src/utils';
import {
  HomeScreen,
  NetworkScreen,
  ProfileScreen,
  RequestInboxScreen,
  SentRequestsScreen,
  SplashScreen,
  WelcomeScreen,
} from './src/screens';
// Amplify.configure(awsconfig);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Wallet = createMaterialTopTabNavigator();
const Payment = createStackNavigator();

const checkIfFirstLaunch = () => {
  try {
    const hasLaunched = MMKV.getString('HAS_LAUNCHED');
    // console.log(hasLaunched);
    if (hasLaunched === undefined) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const App = () => {
  const [mobile_num, set_mobile_num] = useState('');
  const [name, set_name] = useState('');
  const [code, set_code] = useState('');
  const [mode, set_mode] = useState('phone');
  const [usr, set_usr] = useState('');
  const [user, set_user] = useState({});
  const [error, set_error] = useState(false);
  const [loading, set_loading] = useState(true);
  const [token, set_token] = useState(false);
  const [aws, set_aws] = useState('');
  const [loc, set_loc] = useState({});
  const [active_method, set_active_method] = useState(undefined);
  const [displayIntro, set_display] = useState(false);

  const toggle_launch = () => MMKV.set('HAS_LAUNCHED', 'true');

  const clear_state = () => {
    set_mobile_num('');
    set_name('');
    set_code('');
    set_mode('phone');
    set_usr('');
    set_error(false);
    set_loading(false);
    set_token(false);
    set_user({});
    set_loc({});
    set_active_method(undefined);
  };

  // PushNotification.onRegister((aws_token) => {
  //   set_aws(aws_token);
  // });

  const set_field = (updates) => {
    const newUser = {...user};
    for (const update of updates) {
      if (update.field.includes('profile.')) {
        const newField = update.field.substr(8);
        newUser.profile[newField] = update.value;
      } else if (update.field.includes('preferences.')) {
        const newField = update.field.substr(12);
        newUser.preferences[newField] = update.value;
      } else {
        newUser[update.field] = update.value;
      }
    }
    // console.log(newUser);
    set_user(newUser);
    // console.log(user);
  };

  const state = {
    mobile_num,
    name,
    code,
    mode,
    usr,
    error,
    loading,
    token,
    user,
    aws,
    loc,
    active_method,
    displayIntro,
    set_mobile_num,
    set_name,
    set_code,
    set_mode,
    set_usr,
    clear_state,
    set_error,
    set_loading,
    set_token,
    set_user,
    set_display,
    set_field,
    set_aws,
    set_loc,
    set_active_method,
    toggle_launch,
  };

  // Geolocation.setRNConfiguration({authorizationLevel: 'whenInUse'});

  React.useEffect(() => {
    splashScreen.default.hide();
  }, []);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      const async_state = await Keychain.getGenericPassword();

      if (async_state) {
        const session = JSON.parse(async_state.password);
        set_user(session);
        set_active_method(session.default_payment_method);
        set_token(true);
      }
      // After restoring token, we may need to validate it in production apps
      set_loading(false);
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };
    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    if (token) {
      Keychain.setGenericPassword(
          'session',
          JSON.stringify({...user, token: token}),
      );
    }
  }, [user]);

  //  React.useEffect(() => {
  //    if (user.default_payment_method !== active_method) {
  //      set_active_method(user.default_payment_method);
  //    }
  //  }, [user.default_payment_method]);

  const firstLaunch = checkIfFirstLaunch();
  return (
    <AppContext.Provider value={state}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.loading ? (
             <Stack.Screen
               name="Splash"
               component={SplashScreen}
               options={{animationEnabled: false}}
             />
           ) : state.token ? (
             <>
               <Stack.Screen
                 name="Protected"
                 component={ProtectedScreen}
                 options={{animationEnabled: false}}
               />
               <Stack.Screen
                 name="Home"
                 options={{gestureEnabled: false}}
                 component={HomeScreen}
               />
               {firstLaunch && (
                 <Stack.Screen
                   name="Welcome"
                   component={WelcomeScreen}
                   options={{animationEnabled: false, gestureEnabled: false}}
                 />
               )}
             </>
           ) : (
             <>
               {firstLaunch && (
                 <Stack.Screen
                   name="Welcome"
                   component={WelcomeScreen}
                   options={{animationEnabled: false, gestureEnabled: false}}
                 />
               )}
               {/* Move below Home when Login flow designed */}
               <Stack.Screen name="Protected" component={ProtectedScreen} />
               <Stack.Screen
                 name="Home"
                 component={HomeScreen}
                 options={{animationEnabled: firstLaunch, gestureEnabled: false}}
               />
             </>
           )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

const RequestScreen = ({navigation}) => {
  // const appState = useContext(AppContext);
  // const [modal, setModal] = useState(false);

  return (
    <View
      style={getStyle('height-100p width-100p bgNavy1000', {
        paddingTop: hasHomeButton() ? '4%' : 0,
      })}>
      {/* <Settings
        show={modal}
        hideModal={() => setModal(false)}
        navigation={navigation}
      /> */}
      <View
        style={getStyle('margin-top-26p width-100p', {
          marginTop: hasHomeButton() ? '7%' : '20%',
        })}>
        <View style={getStyle('width-100p align-items-flex-end')}>
          <Pressable
            style={getStyle('padding-right-6p align-items-flex-end')}
            onPress={() => setModal(true)}>
            {/* <Image
              style={getStyle('justify-content-center')}
              source={require('./res/images/settings.png')}
              resizeMethod="resize"
              resizeMode="contain"
            /> */}
          </Pressable>
        </View>
        <Text style={getStyle('text-white padding-left-6p font-size-28')}>
           My Wallet
        </Text>
      </View>
      <Wallet.Navigator
        tabBarOptions={{
          style: [getStyle('height-40 bgNavy1000')],
          activeTintColor: '#FF8264',
          inactiveTintColor: '#949494',
          tabStyle: getStyle(
              'align-items-flex-start margin-left-15 margin-right-15',
          ),
          indicatorContainerStyle: getStyle('width-100p'),
          indicatorStyle: getStyle('width-38p margin-left-28 tangerine'),
        }}
        initialRouteName="Sent">
        <Wallet.Screen name="Sent" component={SentRequestsScreen} />
        <Wallet.Screen name="Inbox" component={RequestInboxScreen} />
      </Wallet.Navigator>
    </View>
  );
};

//  const CreateRequestScreen = () => {
//    return (
//      <Payment.Navigator
//        screenOptions={{headerShown: false}}
//        initialRouteName="Wallet">
//        <Payment.Screen name="Create" component={RequestScreen} />
//        <Payment.Screen name="Payment Methods" component={PaymentMethodsScreen} />
//        <Payment.Screen name="Add Method" component={AddMethodScreen} />
//        <Payment.Screen name="Edit Method" component={EditMethodScreen} />
//      </Payment.Navigator>
//    );
//  };

const ProtectedScreen = () => {
  return (
    <Tab.Navigator
      initialLayout={{width: Dimensions.get('window').width}}
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarIconStyle: getStyle('width-75 height-50'),
        tabBarStyle: getStyle('height-10p navy900'),
      }}
      initialRouteName="Requests"
      tabBarPosition="bottom">
      <Tab.Screen
        name="Network"
        component={NetworkScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabView
              focused={focused}
              focusedIcon={require('./res/images/networkIcon.png')}
              notFocusedIcon={require('./res/images/networkIcon.png')}
              text="Network"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabView
              focused={focused}
              focusedIcon={require('./res/images/requestIconActive.png')}
              notFocusedIcon={require('./res/images/requestIconActive.png')}
              text="Requests"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabView
              focused={focused}
              focusedIcon={require('./res/images/profileIcon.png')}
              notFocusedIcon={require('./res/images/profileIcon.png')}
              text="Profile"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;

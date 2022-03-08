import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Pressable,
  Image,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import { RecipientContent } from '../components/SendRequest';
import Button from '../components/Button';
import { getStyle } from '../css/Styles';
import { hasHomeButton, sameDay, formatDate, formatTime, addMinutes } from '../utils';
import Input from '../components/Input';
import Modal from 'react-native-modal';
import AppContext from '../AppContext';
import axios from 'axios';
import Config from 'react-native-config';
import Keychain from 'react-native-keychain';

const updateUser = (userId, name, number, state, setEdit) => {
  axios
      .post(`${Config.HOST_URL}/api/updateUser`, {
        userId: userId,
        updatedName: name,
        updatedNumber: number,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);
        setEdit(false);
      })
      .catch((error) => {
      // console.log(error.response);
        setEdit(false);
        // state.set_error(true);
      });
};

const EditContent = ({ setEdit }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};
  const [editName, setEditName] = useState(user.name);
  const [editNumber, setEditNumber] = useState(user.number);

  return (
    <>
      <Input
        inputStyle={getStyle('border-bottom-width-2 padding-bottom-10 width-100p margin-bottom-20')}
        textStyle={getStyle('messina-sans-regular')}
        header="Name"
        value={editName}
        onChange={(text) => setEditName(text)}
        headerStyle={getStyle('messina-sans-bold text-salmon font-size-11 margin-bottom-10')}
      />
      <Input
        inputStyle={getStyle('border-bottom-width-2 padding-bottom-10 width-100p margin-bottom-20')}
        textStyle={getStyle('messina-sans-regular')}
        header="Phone Number"
        value={editNumber}
        onChange={(text) => setEditNumber(text)}
        headerStyle={getStyle('messina-sans-bold text-salmon font-size-11 margin-bottom-10')}
      />
      <Button
        text="Save Changes"
        textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
        disabled={editName === user.name && editNumber === user.number}
        disabledButtonStyle={getStyle(
            'width-100p height-50 border-radius-100 deepSupport margin-top-6', {
              opacity: 0.4,
            },
        )}
        buttonStyle={getStyle(
            'width-100p height-50 border-radius-100 deepSupport margin-top-6',
        )}
        onPress={() => updateUser(user._id, editName, editNumber, appState, setEdit)}
      />
    </>
  );
};

const UserContent = ({ user }) => {
  return (
    <>
      <View style={getStyle('border-bottom-width-1 height-1 width-100p margin-bottom-15')} />
      <View style={getStyle('flex-direction-row width-100p justify-content-space-between margin-bottom-20')}>
        <View style={getStyle('flex-direction-row')}>
          <Image source={require('../../res/images/requestHistory.png')} />
          <Text style={getStyle('messina-sans-regular font-size-14 margin-left-15')}>Request History</Text>
        </View>
        <Image source={require('../../res/images/searchIcon.png')} />
      </View>
      <FlatList
        data={user.requests}
        style={getStyle('width-100p flex padding-1')}
        renderItem={({ item }) => (
          <Pressable
            style={getStyle('width-99p height-80 white flex-direction-row justify-content-space-between align-items-center padding-6p padding-top-5p padding-bottom-5p', {
              shadowColor: 'black',
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 6,
            })}
          >
            <View style={getStyle('width-66p height-100p margin-right-20 justify-content-space-between')}>
              <View style={getStyle('flex-direction-row align-items-center')}>
                <Text style={getStyle('messina-sans-bold margin-right-10')}>{sameDay(new Date(item.date), new Date()) ? 'Today' : formatDate(item.date)}</Text>
                <View style={getStyle('height-10 width-10 border-radius-5 deepSupport')} />
                <Text style={getStyle('messina-sans-book margin-left-10')}>{formatTime(new Date(item.date))} - {formatTime(addMinutes(new Date(item.date), item.duration))}</Text>
              </View>
              <Text style={getStyle('messina-sans-regular')} numberOfLines={1}>{item.description}</Text>
            </View>
            <View style={getStyle('flex-direction-row')}>
              <Text style={getStyle('messina-sans-bold font-size-14 margin-right-10')}>Expand</Text>
              <Image source={require('../../res/images/dropdown.png')} />
            </View>
          </Pressable>
        )}
        keyExtractor={(_, i) => i.toString()}
      />
    </>
  );
};

const signOut = async (navigation, setModal) => {
  await axios
      .post(`${Config.HOST_URL}/api/signout`)
      .then((_) => {
        setModal(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });

        Keychain.resetGenericPassword();
      })
      .catch((error) => {
        setModal(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        Keychain.resetGenericPassword();
      });
};

const LogoutModal = ({ modal, setModal, navigation }) => {
  return (
    <Modal
      isVisible={modal}
      transparent
      useNativeDriver
      style={getStyle('border margin-0 justify-content-center')}
      onModalHide={() => {
      }}
      onBackdropPress={() => {
        setModal(false);
      }}>
      <View style={getStyle('modal height-30p width-88p margin-6p justify-content-flex-start')}>
        <View style={getStyle('modal-view height-80p padding-left-10p padding-right-10p')}>
          <Image source={require('../../res/images/logout.png')} style={getStyle('width-40 height-40')} />
          <Text style={getStyle('font-size-24 avenir-heavy margin-20')}>Log Out</Text>
          <Text style={getStyle('text-align-center avenir-roman')}>Are you sure you would like to log out of your account?</Text>
        </View>
        <View style={getStyle('modal-buttons-view height-20p')}>
          <Pressable
            onPress={() => setModal(false)}
            style={getStyle(
                'width-50p justify-content-center align-items-center border-right-width-1',
                {
                  borderRightColor: 'rgba(102, 102, 102, 0.2)',
                },
            )}>
            <Text style={getStyle('avenir-heavy', { opacity: 0.5 })}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => signOut(navigation, setModal)}
            style={getStyle(
                'width-50p justify-content-center align-items-center',
            )}>
            <Text style={getStyle('avenir-heavy')}>Yes</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const SettingsModal = ({ modal, setModal, setCanLogout }) => {
  return (
    <Modal
      isVisible={modal}
      transparent
      useNativeDriver
      style={getStyle('border margin-0 justify-content-flex-end')}
      onModalHide={() => {
      }}
      onBackdropPress={() => {
        setModal(false);
      }}>
      <View style={getStyle('modal height-20p padding-6p padding-top-3p justify-content-flex-start')}>
        <View style={getStyle('width-34 height-4 border-radius-20 black')} />
        <Pressable style={getStyle('width-100p height-49p justify-content-center')}>
          <View style={getStyle('flex-direction-row')}>
            <Image source={require('../../res/images/questionCircle.png')} style={getStyle('margin-right-20')} />
            <Text style={getStyle('font-size-16 messina-sans-regular')}>Help</Text>
          </View>
        </Pressable>
        <View style={{ borderBottomWidth: 1, width: Dimensions.get('window').width + 10 }} />
        <Pressable
          style={getStyle('width-100p height-49p justify-content-center')}
          onPress={() => {
            setCanLogout(true);
            setModal(false);
          }}
        >
          <View style={getStyle('flex-direction-row')}>
            <Image source={require('../../res/images/logout.png')} style={getStyle('margin-right-20')} />
            <Text style={getStyle('font-size-16 messina-sans-regular')}>Log Out</Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const ProfileScreen = ({ navigation }) => {
  const appState = useContext(AppContext);
  const [edit, setEdit] = useState(false);
  const [settings, setSettings] = useState(false);
  const [canLogout, setCanLogout] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (!settings && canLogout) {
      setTimeout(() => {
        setLogout(true);
        setCanLogout(false);
      }, 1000);
    }
  }, [settings]);

  const user = appState.user ?? {};
  const phone = user.number;

  return (
    <View style={getStyle('border-bottom-width-1', { borderBottomColor: '#999999' })}>
      <SettingsModal modal={settings} setModal={setSettings} setCanLogout={setCanLogout} />
      <LogoutModal modal={logout} setModal={setLogout} navigation={navigation} />
      <View style={getStyle('height-100p width-100p white', {
        paddingTop: hasHomeButton() ? '4%' : 0,
      })}>
        <View
          style={getStyle('flex-direction-row width-100p justify-content-space-between', {
            marginTop: hasHomeButton() ? '7%' : '20%',
          })}>
          <Pressable
            style={getStyle('padding-left-6p width-100 height-50')}
            onPress={() => {
              if (edit) {
                setEdit(false);
              } else {
                setEdit(true);
              }
            }}>
            <Image
              source={edit ? require('../../res/images/backIcon.png') : require('../../res/images/pencilIcon.png')}
              style={getStyle('width-25 height-25')}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={getStyle('padding-right-6p align-items-flex-end width-100 height-50')}
            disabled={edit}
            onPress={() => setSettings(true)}>
            {!edit && (
              <Image
                source={require('../../res/images/settings.png')}
                style={getStyle('width-25 height-25')}
                resizeMethod="resize"
                resizeMode="contain"
              />
            )}
          </Pressable>
        </View>
        <View style={getStyle('width-100p align-items-center padding-left-6p padding-right-6p flex')}>
          <View
            style={getStyle(
                'height-90 width-90 justify-content-center align-items-center border-radius-45 margin-bottom-16 melon')}>
            <RecipientContent big header="Connections" item={user} />
          </View>
          <Text style={getStyle('font-size-24 messina-sans-bold margin-bottom-10')}>
            {user.name}
          </Text>
          <Text style={getStyle('font-size-16 messina-sans-regular margin-bottom-30')}>
            {`(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`}
          </Text>
          { edit ? (
            <EditContent user={user} setEdit={setEdit} />
          ) : (
            <UserContent user={user} />
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

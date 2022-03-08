import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Pressable,
  Image,
  Text,
  FlatList,
  Keyboard,
} from 'react-native';
import { RecipientContent } from '../components/SendRequest';
import Button from '../components/Button';
import { colors, getStyle } from '../css/Styles';
import { hasHomeButton } from '../utils';
import Input from '../components/Input';
import { CreateGroupModal } from '../components/Network';
import AppContext from '../AppContext';
import axios from 'axios';
import Config from 'react-native-config';
import Keychain from 'react-native-keychain';

const updateName = (user_id, new_name, group, state, setError) => {
// console.log(group);
  axios
      .post(`${Config.HOST_URL}/api/groups`, {
        userId: user_id,
        memberIds: group.members.map((m) => m._id),
        name: new_name,
        groupId: group._id,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);

        Keyboard.dismiss();
      })
      .catch((error) => {
      // console.log(error.response);
        setError(true);
        // state.set_error(true);
      });
};

const deleteGroup = (groupId, userId, state, navigation, setError) => {
// console.log(groupId);

  axios
      .post(`${Config.HOST_URL}/api/groups/delete`, {
        groupId, userId,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);

        navigation.goBack();
      })
      .catch((error) => {
      // console.log(error.response);
        setError(true);
        // state.set_error(true);
      });
};

const deleteMember = (user_id, deleted_id, group, state, setError) => {
// console.log(group);
// console.log(deleted_id);
  const newGroup = group?.members.filter((g) => JSON.stringify(g._id) !== JSON.stringify(deleted_id));
  // console.log(newGroup);
  axios
      .post(`${Config.HOST_URL}/api/groups`, {
        userId: user_id,
        memberIds: newGroup.map((m) => m._id),
        name: group.name,
        groupId: group._id,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);
      })
      .catch((error) => {
      // console.log(error.response);
        setError(true);
        // state.set_error(true);
      });
};

const GroupScreen = ({ navigation, route }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};

  if (!route.params?.group) {
    navigation.goBack();
    return <View />;
  }

  const group = route.params.group;
  const [editGroup, setEditGroup] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState(group.name);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const { setParams } = navigation;
    const currGroup = user.groups?.filter((g) => JSON.stringify(g._id) === JSON.stringify(group._id))[0];
    if (currGroup?._id && JSON.stringify(currGroup) !== JSON.stringify(group)) setParams({ group: currGroup });
  }, [user.groups]);

  return (
    <View style={getStyle('border-bottom-width-1', { borderBottomColor: '#999999' })}>
      <CreateGroupModal
        modal={editGroup}
        setModal={setEditGroup}
        setNewGroup={() => {}}
        edit={group}
      />
      <View style={getStyle('height-100p width-100p white', {
        paddingTop: hasHomeButton() ? '4%' : 0,
      })}>
        <View
          style={getStyle('flex-direction-row width-100p justify-content-space-between', {
            marginTop: hasHomeButton() ? '7%' : '20%',
          })}>
          <Pressable
            style={getStyle('padding-left-6p width-100 height-50')}
            disabled={focused}
            onPress={() => {
              navigation.goBack();
            }}>
            {!focused &&
              <Image
                source={require('../../res/images/backIcon.png')}
                style={getStyle('width-20 height-20')}
                resizeMethod="resize"
                resizeMode="contain"
              />
            }
          </Pressable>
          <Pressable
            style={getStyle('padding-right-6p align-items-flex-end width-100 height-50')}
            disabled={!focused}
            onPress={() => {
              Keyboard.dismiss();
            }}>
            {focused && (
              <Image
                source={require('../../res/images/closeIcon.png')}
                style={getStyle('width-25 height-25')}
                resizeMethod="resize"
                resizeMode="contain"
              />
            )}
          </Pressable>
        </View>
        <View style={getStyle('width-100p align-items-center flex padding-left-6p padding-right-6p')}>
          <Input
            inputStyle={getStyle('width-100p border-bottom-width-1 margin-bottom-20')}
            textStyle={getStyle('flex messina-sans-bold font-size-28 padding-bottom-5')}
            value={name}
            onChange={(text) => setName(text)}
            endIcon={focused ? undefined : 'pencilIcon.png'}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            endIconStyle={getStyle(
                'height-20 width-20 align-items-center justify-content-center margin-right-10 margin-top-5',
            )}
          />
          { !focused && (
            <FlatList
              data={group.members}
              style={getStyle('width-100p flex')}
              ItemSeparatorComponent={() => <View style={getStyle('width-100p height-1', { backgroundColor: '#cacaca' })} />}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => deleteMember(user._id, item._id, group, appState, setError)}
                  disabled={group.members?.length === 1}
                  style={getStyle('width-100p height-70 flex-direction-row justify-content-space-between align-items-center padding-left-6p padding-right-6p')}
                >
                  <View style={getStyle('flex-direction-row align-items-center')}>
                    <View
                      style={getStyle(
                          'height-50 width-50 justify-content-center align-items-center border-radius-30 margin-right-20', {
                            backgroundColor: colors.sky,
                          })}>
                      <RecipientContent
                        item={item}
                        header='Connections'
                      />
                    </View>
                    <Text style={getStyle(`messina-sans-regular font-size-16`)}>{item.name}</Text>
                  </View>
                  <Image resizeMethod="resize" resizeMode="contain" source={require('../../res/images/circleRemove.png')} />
                </Pressable>
              )}
              keyExtractor={(_, i) => i.toString()}
            />
          )}
          <View style={getStyle(`width-100p ${focused ? 'margin-top-70p' : ''}`)}>
            {!focused && (
              <Button
                text="+ Add Connection"
                textStyle={getStyle('messina-sans-bold font-size-16')}
                buttonStyle={getStyle(
                    'width-100p height-50 border-radius-100 border-width-2 margin-top-10 margin-bottom-10',
                )}
                onPress={() => setEditGroup(true)}
              />
            )}
            <Button
              text={focused ? 'Save Group Name' : 'Delete Group'}
              textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
              buttonStyle={getStyle(
                  `width-100p height-50 border-radius-100 ${focused ? 'deepSupport' : 'salmon'} margin-bottom-6p`,
              )}
              onPress={() => focused ? updateName(user._id, name, group, appState, setError) : deleteGroup(group._id, user._id, appState, navigation, setError)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default GroupScreen;

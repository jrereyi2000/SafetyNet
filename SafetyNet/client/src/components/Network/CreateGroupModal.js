import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Pressable,
  Image,
  Keyboard,
  FlatList,
} from 'react-native';
import { colors, getStyle } from '../../css/Styles';
import Input from '../Input';
import Button from '../Button';
import { RecipientContent } from '../SendRequest';
import Modal from 'react-native-modal';
import AppContext from '../../AppContext';
import axios from 'axios';
import Config from 'react-native-config';
import Keychain from 'react-native-keychain';

const GroupNameView = ({ onSave, setModal }) => {
  const [name, setName] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
        },
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
        },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={getStyle('width-100p flex')}>
      <View
        style={getStyle(
            'width-100p justify-content-space-between flex-direction-row margin-bottom-4p',
        )}>
        <Text style={getStyle('messina-sans-bold font-size-28')}>
                  Group name
        </Text>
        <Pressable
          style={getStyle('justify-content-center align-items-flex-end')}
          onPress={() => setModal(false)}>
          <Image source={require('../../../res/images/closeIcon.png')} />
        </Pressable>
      </View>
      <Text style={getStyle('messina-sans-semibold font-size-13 margin-bottom-6p')}>Select the name for this grouping of friends. </Text>
      <View
        style={getStyle(
            `width-100p ${!isKeyboardVisible ? 'flex justify-content-space-between' : ''}`,
        )}>
        <Input
          inputStyle={getStyle(
              'width-100p margin-bottom-66p border-radius-2 padding-left-16 align-items-center height-50 border border-color-deepSupport')}
          value={name}
          textStyle={getStyle('flex messina-sans-bold height-45')}
          autoFocus
          endIcon={name.length ? 'closeIcon.png' : undefined}
          onChange={(text) => setName(text)}
          onEndIconPress={() => setName('')}
        />
        <Button
          text="Save Group Name"
          disabledTextStyle={getStyle(
              'messina-sans-bold font-size-16 text-white',
          )}
          textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
          disabledButtonStyle={getStyle(
              'width-100p height-50 border-radius-100 deepSupport',
          )}
          disabled={!name}
          buttonStyle={getStyle(
              'width-100p height-50 border-radius-100 deepSupport',
          )}
          onPress={() => onSave(name)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const createOrEditGroup = (user_id, name, group, setModal, setNewGroup, state, setError, group_id) => {
  axios
      .post(`${Config.HOST_URL}/api/groups`, {
        userId: user_id,
        memberIds: group.map((m) => m._id),
        name,
        groupId: group_id,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);
        setModal(false);
        !group_id && setNewGroup(true);
      })
      .catch((error) => {
      // console.log(error.response);
        setError(true);
        // state.set_error(true);
      });
};

const SelectGroupView = ({ group, setGroup, name, setModal, setNewGroup, edit }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
  // console.log(user.groups);
  // console.log(group);
    const currGroup = user.groups?.filter((g) => JSON.stringify(g) === JSON.stringify(group))[0];
    // console.log('curr', currGroup);
    if (currGroup && edit) setGroup(currGroup);
  }, [user.groups]);

  const addToGroup = (item) => setGroup([...group, item]);
  const removeFromGroup = (item) => {
  // console.log(item);
  // console.log(group);
    setGroup(group.filter((i) => JSON.stringify(i) !== JSON.stringify(item)));
  };

  const [connections] = useState(user.connections ?? []); // [...Array(10).keys()].map((_) => ({ name: getRandomName() })));// [];

  const inGroup = (item) => group.filter( (g) => JSON.stringify(g) === JSON.stringify(item)).length > 0;

  return (
    <View style={getStyle('width-100p flex')}>
      {group.length > 0 && (
        <Button
          textStyle={getStyle(`messina-sans-bold font-size-16 text-white`)}
          buttonStyle={getStyle(`absolute zIndex-2 width-100p height-50 border-radius-100 deepSupport`, { bottom: 10 })}
          onPress={() => {
            createOrEditGroup(user._id, name, group, setModal, setNewGroup, appState, setError, edit?._id);
          }}
          text={edit ? 'Save Changes' : 'Create Group'}
        />
      )}
      <View
        style={getStyle(
            'width-100p justify-content-space-between flex-direction-row',
        )}>
        <Text style={getStyle('messina-sans-bold font-size-28')}>
          Select Connections
        </Text>
        <Pressable
          style={getStyle('justify-content-center align-items-flex-end')}
          onPress={() => setModal(false)}>
          <Image source={require('../../../res/images/closeIcon.png')} />
        </Pressable>
      </View>
      <Text style={getStyle('messina-sans-semibold font-size-13 margin-bottom-6p')}>Select connections to add to the <Text style={getStyle('messina-sans-black')}>“{name}”</Text> group</Text>
      <View
        style={getStyle('width-100p flex')}>
        <Input
          inputStyle={getStyle(
              'width-100p margin-bottom-4p border-radius-10 padding-left-16 align-items-center height-50', { backgroundColor: '#f2f2f0' })}
          value={search}
          textStyle={getStyle('flex messina-sans-bold height-45')}
          icon={'searchIcon.png'}
          placeholder="Search for connections"
          endIcon={search.length ? 'closeIcon.png' : undefined}
          onChange={(text) => setSearch(text)}
          onEndIconPress={() => setSearch('')}
        />
        <View style={getStyle('width-100p flex-direction-row flex-wrap-wrap', { minHeight: 50 })}>
          {group.map((member) => (
            <Button
              noPadding
              text={member.name}
              key={member.name}
              buttonStyle={getStyle('deepSupport border-radius-7 padding-10 padding-left-10 margin-right-10 margin-bottom-10')}
              textStyle={getStyle('messina-sans-bold margin-left-10 font-size-13 text-white margin-right-20')}
              endIcon='closeIconWhite.png'
              useIconStyle
              iconStyle={getStyle('width-10 height-10 margin-right-10')}
              onPress={() => removeFromGroup(member)}
            />
          ))}
        </View>
        <View style={getStyle('width-100p flex')}>
          <Text style={getStyle('messina-sans-semibold font-size-14 margin-bottom-10')}>All Connections</Text>
          <FlatList
            data={connections}
            style={getStyle('width-100p flex')}
            ItemSeparatorComponent={() => <View style={getStyle('width-100p height-1', { backgroundColor: '#cacaca' })} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => inGroup(item) ? removeFromGroup(item) : addToGroup(item)}
                style={getStyle('width-100p height-70 flex-direction-row justify-content-space-between align-items-center padding-left-6p padding-right-6p')}
              >
                <View style={getStyle('flex-direction-row align-items-center')}>
                  <View
                    style={getStyle(
                        'height-50 width-50 justify-content-center align-items-center border-radius-30 margin-right-20', {
                          backgroundColor: inGroup(item) ? colors.deepSupport : colors.sky,
                        })}>
                    <RecipientContent
                      item={item}
                      inNetwork={inGroup(item)}
                      header='Connections'
                    />
                  </View>
                  <Text style={getStyle(`messina-sans-${inGroup(item) ? 'bold' : 'regular'} font-size-16`)}>{item.name}</Text>
                </View>
                {inGroup(item) ?
                  <Image style={getStyle('width-30 height-30')} source={require('../../../res/images/circleCheckDeepSupport.png')} /> :
                  <View style={getStyle('width-30 height-30 border-radius-15 border')} />
                }
              </Pressable>
            )}
            keyExtractor={(_, i) => i.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const CreateGroupModal = ({ modal, setModal, setNewGroup, edit }) => {
  const [name, setName] = useState(edit?.name ?? '');
  const [group, setGroup] = useState(edit?.members ?? []);
  useEffect(() => {
    edit?.name && name !== edit?.name && setName(edit.name);
    edit?.members && JSON.stringify(group) !== JSON.stringify(edit.members) && setGroup(edit.members);
  }, [edit?.name, edit?.members]);

  return (
    <Modal
      isVisible={modal}
      transparent
      useNativeDriver
      onModalHide={() => {
        setName('');
        setGroup([]);
      }}
      style={getStyle('margin-0 padding-top-4p justify-content-flex-end')}
      onBackdropPress={() => {
        setModal(false);
      }}>
      <View style={getStyle('modal padding-6p')}>
        { name ?
         <SelectGroupView edit={edit} name={name} group={group} setGroup={setGroup} setModal={setModal} setNewGroup={setNewGroup} /> :
        <GroupNameView onSave={(item) => setName(item)} setModal={setModal}/>
        }
      </View>
    </Modal>
  );
};

export default CreateGroupModal;

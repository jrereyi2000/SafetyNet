import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Linking,
} from 'react-native';
import { getStyle } from '../../css/Styles';
import Modal from 'react-native-modal';
import Button from '../Button';
import Config from 'react-native-config';
import axios from 'axios';
import Keychain from 'react-native-keychain';
import AppContext from '../../AppContext';

const addCommunityGroup = (userId, groupId, state, navigation, setModal, setError) => {
  // console.log(name);
  // console.log(number);
  axios
      .post(`${Config.HOST_URL}/api/addCommunityGroup`, {
        userId, groupId,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);
        setModal(undefined);
        navigation.navigate('Connections', {
          newCommunityGroup: true,
        });
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        // state.set_error(true);
      });
};

const removeCommunityGroup = (userId, groupId, state, navigation, setModal, setError) => {
  axios
      .post(`${Config.HOST_URL}/api/removeCommunityGroup`, {
        userId, groupId,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);
        setModal(undefined);
        navigation.navigate('Connections');
      })
      .catch((error) => {
      // console.log(error.response);
        setError(true);
        // state.set_error(true);
      });
};

const CommunityGroupsModal = ({ modal, setModal, navigation }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};
  const [error, setError] = useState(false);
  const org = modal;
  const { _id, name, description, rep: { uri: repUri = '', name: repName = '' } = {}, webLink, backgroundImg } = org ?? {};

  console.log(user.communityGroups);

  const alreadyAdded = () => user.communityGroups?.map((g) => g._id).includes(_id);
  return (
    <Modal
      isVisible={Boolean(modal)}
      transparent
      useNativeDriver
      style={getStyle('margin-0 justify-content-flex-end')}
      onBackdropPress={() => {
        setModal(undefined);
      }}>
      <View style={getStyle('modal padding-top-6p padding-bottom-6p')}>
        <View style={getStyle(`width-100p flex`)}>
          <View
            style={getStyle(
                'width-100p justify-content-space-between padding-left-6p flex-direction-row margin-bottom-4p',
            )}>
            <Pressable
              style={getStyle('justify-content-center height-50 width-50')}
              onPress={() => setModal(undefined)}>
              <Image style={getStyle('width-20 height-20')} source={require('../../../res/images/backIcon.png')} />
            </Pressable>
          </View>
          <View style={getStyle(`width-100p flex`)}>
            <Text style={getStyle('margin-left-6p text-black messina-sans-bold font-size-28 margin-bottom-8p')}>
              {name}
            </Text>
            <Image
              source={{ uri: backgroundImg }}
              style={getStyle('width-100p margin-bottom-6p', { height: 192 })}
            />
            <View style={getStyle('padding-left-6p padding-right-6p')}>
              <Text style={getStyle('text-deepSupport avenir-heavy font-size-18 margin-bottom-4p')}>
              Description
              </Text>
              <Text style={getStyle('avenir-roman font-size-16 line-height-22 margin-bottom-6p')}>
                {description}
              </Text>
              <View style={getStyle('flex-direction-row align-items-center justify-content-space-between')}>
                <View style={getStyle('flex-direction-row')}>
                  {repUri !== '' &&
                    <Image
                      style={getStyle('width-40 height-40 border-radius-20 margin-right-20')}
                      source={{ uri: repUri }}
                    />
                  }
                  <View>
                    <Text style={getStyle('avenir-heavy font-size-14 text-deepSupport margin-bottom-2')}>{repName}</Text>
                    <Text style={getStyle('avenir-roman font-size-14')}>Local Representative</Text>
                  </View>
                </View>
                <Button
                  text={`Speak to ${repName.split(' ')[0]}`}
                  textStyle={getStyle('margin-left-4p margin-right-4p font-size-14 avenir-heavy text-white')}
                  noPadding
                  buttonStyle={getStyle('deepSupport border-radius-100 padding-1p')}
                />
              </View>
            </View>
          </View>
          <View style={getStyle('padding-left-6p padding-right-6p padding-bottom-6p')}>
            <Button
              buttonStyle={getStyle('width-100p height-50 border border-width-2 border-radius-100 margin-bottom-10')}
              textStyle={getStyle('messina-sans-bold font-size-16')}
              text="Go To Website"
              icon="link.png"
              iconStyle={getStyle('margin-right-10')}
              centerIcon
              onPress={() => Linking.openURL(webLink)}
            />
            <Button
              buttonStyle={getStyle(`width-100p height-50 ${alreadyAdded() ? 'salmon' : 'deepSupport'} border-radius-100 margin-bottom-10`)}
              textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
              text={alreadyAdded() ? 'Remove From Network' : 'Add to My Network'}
              icon="addToNetwork.png"
              iconStyle={getStyle('margin-right-10')}
              centerIcon
              onPress={() => {
                alreadyAdded() ?
                removeCommunityGroup(user._id, _id, appState, navigation, setModal, setError) :
                addCommunityGroup(user._id, _id, appState, navigation, setModal, setError);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommunityGroupsModal;

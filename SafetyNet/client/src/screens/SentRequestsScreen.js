import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
} from 'react-native';
import Button from '../components/Button';
import { getStyle } from '../css/Styles';
import {
  SentRequestDialog,
  CreateRequestModal,
  ActiveRequest,
  BoostNotification,
} from '../components/SendRequest';
import Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import AppContext from '../AppContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const SentRequestsScreen = ({ navigation }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};

  const viewStyle = getStyle(
      'height-100p width-100p align-items-center white padding-left-6p padding-right-6p',
  );
  const [modal, setModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [requestAdded, setRequestAdded] = useState(false);

  // const [requests, setRequests] = useState([]);
  // const addRequest = (r) => setRequests([...requests, r]);
  const requests = user.requests.filter((r) => new Date(r.date).getTime() > new Date().getTime()) ?? [];
  const [request, setRequest] = useState(undefined);
  const [boost, setBoost] = useState(false);

  useFocusEffect(
      useCallback(() => {
        let isActive = true;

        const fetchUser = async () => {
          try {
            const res = await axios.get(`${Config.HOST_URL}/api/users/${user._id}`);
            const updatedUser = res.data?.user;
            if (isActive && updatedUser) {
              Keychain.setGenericPassword(
                  'session',
                  JSON.stringify({ ...updatedUser }),
              );
              appState.set_user(updatedUser);
            }
          } catch (e) {
            // Handle error
            // console.log(e);
          }
        };

        fetchUser();

        return () => {
          isActive = false;
        };
      }, []),
  );

  useEffect(() => {
    if (!modal && requestAdded) {
      setTimeout(() => {
        setDialog(true);
        setRequestAdded(false);
      }, 1000);
    }
  }, [modal]);

  // // useEffect(() => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Home' }],
  //   });

  //   Keychain.resetGenericPassword();
  // // }, []);

  return (
    <View style={viewStyle}>
      <BoostNotification open={boost} setOpen={setBoost} />
      <SentRequestDialog modal={dialog} setModal={setDialog} />
      <CreateRequestModal
        modal={modal}
        setModal={setModal}
        setRequestAdded={setRequestAdded}
        setRequest={setRequest}
        edit={request}
      />
      <View
        style={getStyle(
            `width-100p flex ${
            requests.length ? 'align-items-center' : 'center'
            } padding-top-10p`,
        )}>
        {requests.length ? (
          <FlatList
            data={requests}
            style={getStyle('width-100p flex padding-1p')}
            ItemSeparatorComponent={() => <View style={getStyle('width-100p height-10')} />}
            ListFooterComponent={() => <View style={getStyle('width-100p height-20')} />}
            renderItem={({ item }) => (
              <ActiveRequest
                request={item}
                setRequest={setRequest}
                setModal={setModal}
                setBoost={setBoost}
              />
            )}
          />
        ) : (
          <>
            <Image source={require('../../res/images/noRequests.png')} />
            <Text
              style={getStyle(
                  'font-size-20 messina-sans-semibold margin-top-6p margin-bottom-3p',
              )}>
              No Active Requests
            </Text>
            <Text style={getStyle('font-size-16 messsina-sans-light')}>
              Created help requests that have
            </Text>
            <Text style={getStyle('font-size-16 messsina-sans-light')}>
              been sent will show up here for
            </Text>
            <Text style={getStyle('font-size-16 messsina-sans-light')}>
              you to track
            </Text>
          </>
        )}
      </View>
      <Button
        text={requests.length ? 'Create New Request' : 'Create Request'}
        textStyle={getStyle(`messina-sans-bold font-size-16 ${requests.length ? '' : 'text-white'}`)}
        buttonStyle={getStyle(
            `width-100p height-50 border-radius-100 margin-bottom-20 ${requests.length ? 'border-width-2' : 'deepSupport'}`,
        )}
        icon={requests.length ? 'newRequestIconBlack.png' : 'newRequestIcon.png'}
        iconStyle={getStyle('margin-right-12')}
        onPress={() => setModal(true)}
        centerIcon
      />
    </View>
  );
};

export default SentRequestsScreen;

/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
} from 'react-native';
import { getStyle } from '../css/Styles';
import { useInterval } from '../utils';
import {
  ActiveRequest,
} from '../components/SendRequest';
import Notification from '../components/Notification';
import Config from 'react-native-config';
import AppContext from '../AppContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const AcceptedNotification = ({ open, setOpen }) => {
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, [open]);

  return (
    <Notification
      open={open}
      setOpen={setOpen}
      Icon={() => <Image source={require('../../res/images/boostInverse.png')} />}
    >
      Nice! Thanks for accepting {open?.user_name}'s Request
    </Notification>
  );
};

const RequestInboxScreen = ({ navigation }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};

  const viewStyle = getStyle(
      'height-100p width-100p align-items-center white padding-left-6p padding-right-6p',
  );


  // const [requests, setRequests] = useState([]);
  // const addRequest = (r) => setRequests([...requests, r]);
  // const requests = user.requests.filter((r) => new Date(r.date).getTime() > new Date().getTime()) ?? [];
  // const [beenBoosted, setBeenBoosted] = useState(false);
  const [requests, setRequests] = useState([]);
  const [acceptRequest, setAcceptRequest] = useState(undefined);

  useFocusEffect(
      useCallback(() => {
        let isActive = true;

        const checkInbox = async () => {
          try {
            const res = await axios.get(`${Config.HOST_URL}/api/checkInbox/${user._id}`);
            const newRequests = res.data?.requests;
            if (isActive && newRequests && JSON.stringify(requests) !== JSON.stringify(newRequests)) {
              newRequests.sort((r1, r2) => new Date(r2.date).getTime() - new Date(r1.date).getTime());
              setRequests(newRequests);
            }
          } catch (e) {
            // Handle error
            // console.log(e.response);
          }
        };

        checkInbox();

        return () => {
          isActive = false;
        };
      }, []),
  );

  useInterval(() => {
    const checkInbox = async () => {
      try {
        const res = await axios.get(`${Config.HOST_URL}/api/checkInbox/${user._id}`);
        const newRequests = res.data?.requests;
        if (newRequests && JSON.stringify(requests) !== JSON.stringify(newRequests)) {
          newRequests.sort((r1, r2) => new Date(r2.date).getTime() - new Date(r1.date).getTime());
          setRequests(newRequests);
        }
      } catch (e) {
        // Handle error
        // console.log(e);
      }
    };

    checkInbox();
  }, 5000);

  // useEffect(() => {
  //   if (boost && !beenBoosted) setBeenBoosted(true);
  // }, [boost]);

  // useEffect(() => {
  //   if (!modal && requestAdded) {
  //     setTimeout(() => {
  //       setDialog(true);
  //       setRequestAdded(false);
  //     }, 1000);
  //   }
  // }, [modal]);

  // // useEffect(() => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Home' }],
  //   });

  //   Keychain.resetGenericPassword();
  // // }, []);

  return (
    <View style={viewStyle}>
      <AcceptedNotification open={acceptRequest} setOpen={setAcceptRequest} />
      {/* <SentRequestDialog modal={dialog} setModal={setDialog} /> */}
      {/* <CreateRequestModal
        modal={modal}
        setModal={setModal}
        setRequestAdded={setRequestAdded}
        setRequest={setRequest}
        edit={request}
      /> */}
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
                edit
                setAcceptRequest={setAcceptRequest}
              />
            )}
          />
        ) : (
          <>
            <Image source={require('../../res/images/noIncomingRequests.png')} />
            <Text
              style={getStyle(
                  'font-size-20 messina-sans-semibold margin-top-6p margin-bottom-3p',
              )}>
              No Incoming Requests
            </Text>
            <Text style={getStyle('font-size-16 messsina-sans-light')}>
              When your network needs your
            </Text>
            <Text style={getStyle('font-size-16 messsina-sans-light')}>
              help, find their requests here.
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default RequestInboxScreen;

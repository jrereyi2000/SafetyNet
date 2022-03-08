import React, { useState, useReducer, useContext, useEffect } from 'react';
import {
  View,
} from 'react-native';
import Button from '../Button';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import { getStyle } from '../../css/Styles';
import { reducer, closestHalfHour, getAddress } from '../../utils';
import Modal from 'react-native-modal';
import CreateRequestView from './CreateRequestView';
import AddNetworkView from './AddNetworkView';
import SetLocationView from './SetLocationView';
import axios from 'axios';
import Config from 'react-native-config';
import Keychain from 'react-native-keychain';
import AppContext from '../../AppContext';
import Geolocation from '@react-native-community/geolocation';

const createOrEditRequest = (request, user_id, state, setRequestAdded, setModal, setError, existing_id) => {
  axios
      .post(`${Config.HOST_URL}/api/createOrEditRequest`, {
        userId: user_id,
        request,
        requestId: existing_id,
      })
      .then(async (response) => {
        const user = response.data.user;

        Keychain.setGenericPassword(
            'session',
            JSON.stringify({ ...user }),
        );
        state.set_user(user);

        !existing_id && setRequestAdded(true);
        setModal(false);
      })
      .catch((error) => {
      // console.log(error);
        setError(true);
        // state.set_error(true);
      });
};

const CreateRequestModal = ({ modal, setModal, setRequestAdded, edit, setRequest }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};

  const initialState = {
    date: edit?.date ? new Date(edit?.date) : new Date(),
    screen: 'create',
    time: edit?.date ? new Date(edit?.date) : closestHalfHour(new Date()),
    description: edit?.description ?? '',
    duration: edit?.duration ?? 20,
    location: edit?.location ? { isCurrent: false, address: edit?.location } : { isCurrent: true, address: '' },
    network: edit?.network ?? [],
    datePickerOpen: false,
    timePickerOpen: false,
    durationOpen: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const resetState = () => {
    for (const key of Object.keys(initialState)) {
      dispatch({ type: key, payload: initialState[key] });
    }
  };

  useEffect(() => {
    if (state.location.address === '') {
      Geolocation.getCurrentPosition(
          (pos) => {
            getAddress(pos.coords.longitude, pos.coords.latitude).then((res) => {
              dispatch({ type: 'location', payload: { isCurrent: true, address: res } });
            });
          },
          (_err) => {
          // console.log(_err);
          },
      );
    }
  });

  useEffect(() => {
    resetState();
  }, [edit]);

  const {
    date,
    time,
    description,
    duration,
    network,
    datePickerOpen,
    timePickerOpen,
    screen,
    location,
  } = state;

  const [tempNetwork, setTempNetwork] = useState(network);
  const [error, setError] = useState(false);


  const canSend = () => description !== '' && network.length > 0;

  const request = {
    date: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
    ),
    description,
    duration,
    location: location.address,
    network,
  };

  return (
    <Modal
      isVisible={modal}
      transparent
      useNativeDriver
      style={getStyle('border margin-0 justify-content-flex-end')}
      onModalHide={() => {
        setRequest(undefined);
        resetState();
      }}
      onBackdropPress={() => {
        setModal(false);
      }}>
      <View style={getStyle('modal padding-6p')}>
        <DatePicker
          open={datePickerOpen}
          disablePast
          setOpen={(val) => dispatch({ type: 'datePickerOpen', payload: val })}
          date={date}
          setDate={(val) => dispatch({ type: 'date', payload: val })}
        />
        <TimePicker
          open={timePickerOpen}
          disablePast
          setOpen={(val) => dispatch({ type: 'timePickerOpen', payload: val })}
          time={time}
          setTime={(val) => dispatch({ type: 'time', payload: val })}
        />
        {screen === 'create' && (
          <CreateRequestView
            setModal={setModal}
            state={state}
            dispatch={dispatch}
            setTempNetwork={setTempNetwork}
          />
        )}
        {screen === 'location' && (
          <SetLocationView dispatch={dispatch} location={location} />
        )}
        {screen === 'network' && (
          <AddNetworkView
            dispatch={dispatch}
            tempNetwork={tempNetwork}
            setTempNetwork={setTempNetwork}
          />
        )}
        {screen !== 'location' && (
          <Button
            text={screen === 'create' ? edit ? 'Save Changes' : 'Send Request' : 'Add'}
            disabledTextStyle={getStyle(
                'messina-sans-bold font-size-16 text-white',
            )}
            textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
            disabledButtonStyle={getStyle(
                'width-100p height-50 border-radius-100 margin-bottom-20 deepSupport',
            )}
            alwaysShowIcon={screen === 'create'}
            disabled={screen === 'create' ? !canSend() : !tempNetwork.length}
            buttonStyle={getStyle(
                'width-100p height-50 border-radius-100 margin-bottom-20 deepSupport',
            )}
            endIcon={screen === 'create' ? 'sendRequestIcon.png' : undefined}
            iconStyle={getStyle('margin-left-12')}
            onPress={() => {
              if (screen === 'create') {
                createOrEditRequest(request, user._id, appState, setRequestAdded, setModal, setError, edit?._id);
              } else {
                dispatch({ type: 'network', payload: tempNetwork });
                dispatch({ type: 'screen', payload: 'create' });
              }
            }}
            centerIcon
          />
        )}
      </View>
    </Modal>
  );
};

export default CreateRequestModal;

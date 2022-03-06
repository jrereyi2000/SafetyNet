import React, { useState, useReducer } from 'react';
import {
  View,
} from 'react-native';
import Button from '../Button';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import { getStyle } from '../../css/Styles';
import { reducer, closestHalfHour } from '../../utils';
import Modal from 'react-native-modal';
import CreateRequestView from './CreateRequestView';
import AddNetworkView from './AddNetworkView';
import SetLocationView from './SetLocationView';

const CreateRequestModal = ({ modal, setModal, addRequest, setRequestAdded }) => {
  const [state, dispatch] = useReducer(reducer, {
    date: new Date(),
    screen: 'create',
    time: closestHalfHour(new Date()),
    description: '',
    duration: 20,
    location: 'Current Location',
    network: [],
    datePickerOpen: false,
    timePickerOpen: false,
    durationOpen: false,
  });

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


  const canSend = () => description !== '' && network.length > 0;


  return (
    <Modal
      isVisible={modal}
      transparent
      useNativeDriver
      style={getStyle('border margin-0 justify-content-flex-end')}
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
            text={screen === 'create' ? 'Send Request' : 'Add'}
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
                addRequest({
                  date: new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                      time.getHours(),
                      time.getMinutes(),
                  ),
                  description,
                  duration,
                  location,
                  network,
                  creationDate: new Date(),
                });
                setRequestAdded(true);
                setModal(false);
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

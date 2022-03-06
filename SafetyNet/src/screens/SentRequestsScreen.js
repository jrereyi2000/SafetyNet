import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';
import Button from '../components/Button';
import { getStyle } from '../css/Styles';
import {
  SentRequestDialog,
  CreateRequestModal,
  ActiveRequest,
} from '../components/SendRequest';

const SentRequestsScreen = ({ navigation }) => {
  const viewStyle = getStyle(
      'height-100p width-100p align-items-center white padding-left-6p padding-right-6p',
  );
  const [modal, setModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [requestAdded, setRequestAdded] = useState(false);

  const [requests, setRequests] = useState([]);
  const addRequest = (r) => setRequests([...requests, r]);
  const [accepted, setAccepted] = useState(undefined);

  useEffect(() => {
    if (!modal && requestAdded) {
      setTimeout(() => {
        setDialog(true);
        setRequestAdded(false);
      }, 1000);
    }
  }, [modal]);


  return (
    <View style={viewStyle}>
      <SentRequestDialog modal={dialog} setModal={setDialog} />
      <CreateRequestModal
        modal={modal}
        setModal={setModal}
        setDialog={setDialog}
        addRequest={addRequest}
        setRequestAdded={setRequestAdded}
      />
      <View
        style={getStyle(
            `width-100p flex ${
            requests.length ? 'align-items-center' : 'center'
            } padding-top-10p`,
        )}>
        {requests.length ? (
          <ActiveRequest accepted={accepted} request={requests[0]} setModal={setModal} />
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

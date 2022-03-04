import React, {useState} from 'react';
import {Image, View, Text, StyleSheet, Pressable, Alert, Modal, TouchableWithoutFeedback} from 'react-native';
import Button from '../components/Button';
import {getStyle} from '../css/Styles';

const CreateRequestModal = ({modal, setModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModal(!modal);
      }}
    >
      <Pressable onPress={() => setModal(false)}>
        <View style={getStyle('modal-background justify-content-flex-end')}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={getStyle('modal padding-6p')}>
              <View style={getStyle('width-100p flex align-items-center border')}>
                <View style={getStyle('width-100p justify-content-space-between flex-direction-row')}>
                  <Text style={getStyle('messina-sans-bold font-size-28')}>Create Request</Text>
                  <Pressable
                    style={getStyle('justify-content-center align-items-flex-end')}
                    onPress={() => setModal(false)}>
                    <Image
                      source={require('../../res/images/closeIcon.png')}
                      resizeMethod="resize"
                      resizeMode="contain"
                    />
                  </Pressable>
                </View>
              </View>
              <Button
                text="Send Request"
                disabledTextStyle={getStyle('messina-sans-bold font-size-16 text-white')}
                textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
                disabledButtonStyle={getStyle('width-100p height-50 border-radius-100 margin-bottom-20', {
                  backgroundColor: '#4380FA',
                })}
                alwaysShowIcon
                buttonStyle={getStyle('width-100p height-50 border-radius-100 margin-bottom-20', {
                  backgroundColor: '#4380FA',
                })}
                endIcon="sendRequestIcon.png"
                iconStyle={getStyle('margin-left-12')}
                onPress={() => setModal(false)}
                centerIcon
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Pressable>
    </Modal>
  );
};

const SentRequestsScreen = ({navigation}) => {
  const viewStyle = getStyle(
      'height-100p width-100p align-items-center white padding-left-6p padding-right-6p',
  );
  const [modal, setModal] = useState(false);

  const requests = [];
  return (
    <View style={viewStyle}>
      <CreateRequestModal modal={modal} setModal={setModal} />
      <View style={getStyle('width-100p flex center')}>
        <Image
          source={require('../../res/images/noRequests.png')}
        />
        <Text style={getStyle('font-size-20 messina-sans-semibold margin-top-6p margin-bottom-3p')}>No Active Requests</Text>
        <Text style={getStyle('font-size-16 messsina-sans-light')}>Created help requests that have</Text>
        <Text style={getStyle('font-size-16 messsina-sans-light')}>been sent will show up here for</Text>
        <Text style={getStyle('font-size-16 messsina-sans-light')}>you to track</Text>
      </View>
      <Button
        text="Create Request"
        textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
        buttonStyle={getStyle('width-100p height-50 border-radius-100 margin-bottom-20', {backgroundColor: '#4380FA'})}
        icon="newRequestIcon.png"
        iconStyle={getStyle('margin-right-6')}
        onPress={() => setModal(true)}
        centerIcon
      />
    </View>
  );
};

export default SentRequestsScreen;

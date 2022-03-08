import React, { useContext, useState } from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
} from 'react-native';
import Button from '../Button';
import { colors, getStyle } from '../../css/Styles';
import { sameDay, formatDate, formatTime, useInterval } from '../../utils';
import RecipientContent from './RecipientContent';
import RecipientLabel from './RecipientLabel';
import axios from 'axios';
import Config from 'react-native-config';
import AppContext from '../../AppContext';

const checkSuccess = (request, setAccepted) => {
  axios
      .post(`${Config.HOST_URL}/api/checkRequest`, {
        requestId: request._id,
      })
      .then(async (response) => {
        // console.log(response.data.accepted);
        if (response.data.accepted) {
          setAccepted(response.data.accepted);
        }
        // const user = response.data.user;

        // Keychain.setGenericPassword(
        //     'session',
        //     JSON.stringify({ ...user }),
        // );
        // state.set_user(user);
        // setModal(false);
        // setNewContact(true);
      })
      .catch((error) => {
        // console.log(error.response);
        // setError(true);
        // state.set_error(true);
      });
};

const acceptRequest = (acceptId, request, setAcceptRequest) => {
  axios
      .post(`${Config.HOST_URL}/api/acceptRequest`, {
        requestId: request._id,
        acceptId,
      })
      .then(async (response) => {
        if (response.data.success) {
          setAcceptRequest(request);
        }
        // console.log(response.data.accepted);
        // if (response.data.accepted) {
        //   setAcceptRequest(response.data.accepted);
        // }
        // const user = response.data.user;

        // Keychain.setGenericPassword(
        //     'session',
        //     JSON.stringify({ ...user }),
        // );
        // state.set_user(user);
        // setModal(false);
        // setNewContact(true);
      })
      .catch((error) => {
        // console.log(error.response);
        // setError(true);
        // state.set_error(true);
      });
};

const ActiveRequest = ({ request, setModal, setRequest, setBoost, edit, setAcceptRequest }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};

  const [accepted, setAccepted] = useState(request.accepted_id);
  const [beenBoosted, setBeenBoosted] = useState(false);
  const { date, description, duration, location, network, creationDate } =
      request;

  useInterval(() => {
    checkSuccess(request, setAccepted);
  }, accepted ? null : 5000);

  const isAccepted = (item) => {
    if (!accepted) return false;

    if (item.header === 'Connections') return JSON.stringify(accepted) === JSON.stringify(item.data._id);

    return item.data.members.includes(accepted);
  };

  const inFuture = () => new Date(date).getTime() > new Date().getTime();

  return (
    <View
      style={getStyle('width-100p white border-radius-4', {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
      })}>
      <View
        style={getStyle('width-100p height-5 border-top-left-radius-4 border-top-right-radius-4', {
          backgroundColor: accepted ? colors.deepSupport : edit ? inFuture() ? colors.spearmint : colors.redCandy : colors.salmon,
        })}
      />
      <View style={getStyle('width-100p padding-6p padding-top-4p')}>
        {edit && <Text style={getStyle('avenir-heavy font-size-18 margin-bottom-10')}>
          {request.accepted_id || !inFuture() ? `${request.user_name} Request.` : `${request.user_name} needs your help!`}
        </Text>
        }
        <View
          style={getStyle(
              'width-100p flex-direction-row justify-content-space-between margin-bottom-20',
          )}>
          <View
            style={getStyle(
                'border-bottom-width-1 flex-direction-row align-items-center padding-bottom-6',
                { borderBottomColor: '#999999' },
            )}>
            <Text
              style={getStyle(
                  'messina-sans-bold font-size-18 margin-right-15',
              )}>
              {sameDay(date, new Date()) ? 'Today' : formatDate(date)}
            </Text>
            <Text style={getStyle('messina-sans-regular font-size-14')}>
              {formatTime(date)}
            </Text>
            <Text
              style={getStyle(
                  'messina-sans-book font-size-14 margin-left-5 margin-right-5',
              )}>
                |
            </Text>
            <Text style={getStyle('messina-sans-regular font-size-14')}>
              {duration} min
            </Text>
          </View>
          {accepted ? (
              <View style={getStyle('flex-direction-row')}>
                <Image
                  source={require('../../../res/images/circleCheckDeepSupport.png')}
                />
                <Text
                  style={getStyle(
                      'margin-left-6 messina-sans-bold font-size-12',
                  )}>
                  Accepted
                </Text>
              </View>
            ) : (
              <Text style={getStyle('messina-sans-regular font-size-12')}>
                {inFuture() ? 'Pending' : 'Missed'}
              </Text>
            )}
        </View>
        <View
          style={getStyle(
              'width-100p margin-bottom-20 border-bottom-width-1 flex-direction-row align-items-center padding-bottom-6',
              { borderBottomColor: '#999999' },
          )}>
          <Image
            style={getStyle('margin-right-10')}
            source={require('../../../res/images/location.png')}
          />
          <Text style={getStyle('messina-sans-semibold font-size-14')}>
            {location === 'Current Location' ?
                '1035 Campus Drive, Stanford CA 94305' :
                location}
          </Text>
        </View>
        <View
          style={getStyle(
              'width-100p margin-bottom-20 border-bottom-width-1 flex-direction-row align-items-center padding-bottom-6',
              { borderBottomColor: '#999999' },
          )}>
          <Image
            style={getStyle('margin-right-10')}
            source={require('../../../res/images/notes.png')}
          />
          <Text
            numberOfLines={1}
            style={getStyle(
                'messina-sans-semibold margin-right-12p font-size-14',
            )}>
            {description}
          </Text>
        </View>
        <View style={getStyle('width-100p margin-bottom-20')}>
          <FlatList
            data={network}
            horizontal
            style={getStyle('width-100p')}
            renderItem={({ item }) => (
              <View style={getStyle('align-items-center margin-right-18')}>
                <View
                  style={getStyle(
                      `height-60 width-60 justify-content-center align-items-center border-radius-30 margin-bottom-8 melon`,
                      {
                        backgroundColor: !accepted ?
                          colors.salmon :
                          isAccepted(item) ?
                          colors.deepSupport :
                          '#cacaca',
                        opacity: !accepted || isAccepted(item) ? 1 : 0.4,
                      },
                  )}>
                  <RecipientContent
                    item={item.data}
                    header={item.header}
                  />
                </View>
                {!accepted ||
                    (isAccepted(item) && (
                      <View
                        style={getStyle(
                            'width-100p absolute zIndex-2 align-items-flex-end',
                        )}>
                        <Image
                          style={getStyle('height-20 width-20 border-radius-10')}
                          source={
                            isAccepted(item) ?
                              require('../../../res/images/circleCheck.png') :
                              require('../../../res/images/clockFilled.png')
                          }
                        />
                      </View>
                    ))}
                <RecipientLabel
                  inNetwork
                  opacity={!accepted || isAccepted(item) ? 1 : 0.4}
                  item={item.data}
                  header={item.header}
                />
              </View>
            )}
            keyExtractor={(_, i) => i.toString()}
          />
        </View>
        { !accepted && inFuture() && !edit && (
          <View
            style={getStyle(
                'width-100p margin-bottom-20 flex-direction-row justify-content-space-between',
            )}>
            <Button
              text="Boost Notifications"
              textStyle={getStyle(
                  'messina-sans-bold font-size-16 text-white',
              )}
              disabled={beenBoosted}
              disabledButtonStyle={getStyle(
                  'width-72p height-50 border-radius-100 salmon', {
                    opacity: 0.5,
                  },
              )}
              buttonStyle={getStyle('width-72p height-50 border-radius-100 salmon')}
              icon="boost.png"
              alwaysShowIcon
              iconStyle={getStyle('margin-right-6')}
              onPress={() => {
                setBoost(true);
                setBeenBoosted(true);
              }}
            />
            <Button
              text="Edit"
              textStyle={getStyle('messina-sans-bold font-size-16')}
              buttonStyle={getStyle(
                  'width-23p height-50 border-radius-95 border-width-2 border-color-black',
              )}
              onPress={() => {
                setRequest(request);
                setModal(true);
              }}
              noPadding
            />
          </View>
        )}
        {edit && (!request.accepted_id || request.accepted_id === user._id) && inFuture() && (
          <View
            style={getStyle(
                'width-100p margin-bottom-20',
            )}>
            <Button
              text={request.accepted_id === user._id ? 'Thanks for helping!' : 'Accept Request'}
              textStyle={getStyle('messina-sans-bold font-size-16')}
              disabledTextStyle={getStyle('messina-sans-bold font-size-16')}
              disabled={request.accepted_id === user._id}
              disabledButtonStyle={getStyle('width-100p height-50 border-radius-100 deepSupport')}
              buttonStyle={getStyle('width-100p height-50 border-radius-100 spearmint')}
              onPress={() => acceptRequest(user._id, request, setAcceptRequest)}
            />
          </View>
        )}
        <View style={getStyle('width-100p align-items-flex-end')}>
          <Text style={getStyle('messina-sans-book font-size-12')}>
              Sent{' '}
            {sameDay(creationDate, new Date()) ?
                'Today' :
                formatDate(creationDate)}
              , {formatTime(creationDate)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActiveRequest;

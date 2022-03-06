import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import Button from '../Button';
import TextBox from '../TextBox';
import { colors, getStyle } from '../../css/Styles';
import { sameDay, formatTime, formatDate } from '../../utils';
import DropDownPicker from 'react-native-dropdown-picker';
import RequestText from './RequestText';
import RecipientLabel from './RecipientLabel';
import RecipientContent from './RecipientContent';


const getDifference = (dt1, dt2) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

const CreateRequestView = ({
  setModal,
  state,
  dispatch,
  setTempNetwork,
}) => {
  const {
    date,
    time,
    description,
    duration,
    network,
    durationOpen,
    location,
  } = state;

  const [items, setItems] = useState([
    { label: '5 min', value: 5 },
    { label: '10 min', value: 10 },
    { label: '15 min', value: 15 },
    { label: '20 min', value: 20 },
    { label: '30 min', value: 30 },
    { label: '30-45 min', value: 45 },
  ]);

  const removeFromNetwork = (item) =>
    dispatch({
      type: 'network',
      payload: network.filter((i) => JSON.stringify(i) !== JSON.stringify(item)),
    });

  return (
    <View style={getStyle('width-100p flex align-items-center')}>
      <View
        style={getStyle(
            'width-100p justify-content-space-between flex-direction-row margin-bottom-10p',
        )}>
        <Text style={getStyle('messina-sans-bold font-size-28')}>
                  Create Request
        </Text>
        <Pressable
          style={getStyle('justify-content-center align-items-flex-end')}
          onPress={() => setModal(false)}>
          <Image source={require('../../../res/images/closeIcon.png')} />
        </Pressable>
      </View>
      <View
        style={getStyle(
            'width-100p flex-direction-row margin-bottom-4p',
        )}>
        <Image source={require('../../../res/images/schedule.png')} />
        <RequestText>When? </RequestText>
      </View>
      <View
        style={getStyle(
            'width-100p flex-direction-row justify-content-space-between margin-bottom-6p',
        )}>
        <Button
          text={sameDay(new Date(), date) ? 'Today' : formatDate(date)}
          textStyle={getStyle(
              'margin-left-12p messina-sans-bold font-size-16 text-white',
          )}
          buttonStyle={getStyle(
              'width-47p height-50 border-radius-5 deepSupport',
          )}
          useIconStyle
          endIcon="dropdownWhite.png"
          iconStyle={getStyle('margin-right-10p')}
          onPress={() =>
            dispatch({ type: 'datePickerOpen', payload: true })
          }
          noPadding
        />
        <Button
          text={
                    getDifference(new Date(), time) > 30 ? (
                      formatTime(time)
                    ) : (
                      <>
                        ASAP{' '}
                        <Text style={getStyle('messina-sans-book font-size-12')}>
                          {' '}
                          - {formatTime(time)}
                        </Text>
                      </>
                    )
          }
          textStyle={getStyle(
              'margin-left-12p messina-sans-bold font-size-14 text-white',
          )}
          buttonStyle={getStyle(
              'width-47p height-50 border-radius-5 deepSupport',
          )}
          endIcon="dropdownWhite.png"
          useIconStyle
          iconStyle={getStyle('margin-right-10p')}
          onPress={() =>
            dispatch({ type: 'timePickerOpen', payload: true })
          }
          noPadding
        />
      </View>
      <View
        style={getStyle(
            'width-100p flex-direction-row margin-bottom-4p',
        )}>
        <Image source={require('../../../res/images/create.png')} />
        <RequestText>What do you need help with? </RequestText>
      </View>
      <TextBox
        value={description}
        setValue={(text) => dispatch({ type: 'description', payload: text })}
      />
      <View
        style={getStyle(
            'width-100p flex-direction-row margin-bottom-4p',
        )}>
        <Image source={require('../../../res/images/clock.png')} />
        <RequestText>Roughly, how long will this take? </RequestText>
      </View>
      <View
        style={getStyle('width-100p margin-bottom-6p', { zIndex: 2000 })}>
        <DropDownPicker
          open={durationOpen}
          value={duration}
          closeAfterSelecting={true}
          items={items}
          itemSeparator={true}
          itemSeparatorStyle={getStyle(
              'width-80p margin-left-10p margin-right-10p',
              { backgroundColor: '#999999' },
          )}
          style={getStyle('deepSupport border-color-deepSupport')}
          ArrowDownIconComponent={() => (
            <Image
              style={getStyle(`margin-right-6p`)}
              source={require('../../../res/images/dropdownWhite.png')}
            />
          )}
          ArrowUpIconComponent={() => (
            <Image
              style={getStyle(`margin-right-3p`)}
              source={require('../../../res/images/closeDropdownIcon.png')}
            />
          )}
          TickIconComponent={() => (
            <Image source={require('../../../res/images/checkBold.png')} />
          )}
          tickIconContainerStyle={
                    duration < 45 ? getStyle('width-76p') : getStyle('width-70p')
          }
          textStyle={getStyle(
              `margin-left-${
                      durationOpen ? '6' : '12'
              }p messina-sans-semibold font-size-16`,
          )}
          containerStyle={getStyle(
              `width-${
                      durationOpen ? '100' : '47'
              }p border-radius-8 border-color-deepSupport height-50 deepSupport`,
          )}
          setOpen={() =>
            dispatch({ type: 'durationOpen', payload: !durationOpen })
          }
          onSelectItem={(val) =>
            dispatch({ type: 'duration', payload: val.value })
          }
          listItemLabelStyle={getStyle(
              'messina-sans-regular font-size-14',
          )}
          selectedItemLabelStyle={getStyle(
              'messina-sans-black font-size-14',
          )}
          dropDownContainerStyle={getStyle(
              'border-color-deepSupport border-width-2',
          )}
          labelStyle={getStyle('text-white')}
          setItems={setItems}
          zIndex={1000}
        />
      </View>
      <View
        style={getStyle(
            'width-100p flex-direction-row margin-bottom-4p',
        )}>
        <Image source={require('../../../res/images/clock.png')} />
        <RequestText>Where should they meet you? </RequestText>
      </View>
      <View style={getStyle('width-100p margin-bottom-6p')}>
        <Button
          text={
                    location === 'Current Location' ? (
                      <>
                        Current Location
                        <Text style={getStyle('messina-sans-book font-size-12')}>
                          {' '}
                          - 1035 Campus Dr., Stanford, CA 94305
                        </Text>
                      </>
                    ) : (
                      location
                    )
          }
          textStyle={getStyle('margin-left-6p width-80p text-white', {
            fontFamily:
                      location === 'Current Location' ?
                        'MessinaSans-Bold' :
                        'MessinaSans-Book',
            fontSize: location === 'Current Location' ? 14 : 12,
          })}
          buttonStyle={getStyle(
              'width-100p height-50 border-radius-5 deepSupport',
          )}
          useIconStyle
          endIcon="dropdownWhite.png"
          iconStyle={getStyle('margin-right-5p')}
          onPress={() => dispatch({ type: 'screen', payload: 'location' })}
          noPadding
        />
      </View>
      <View
        style={getStyle(
            'width-100p flex-direction-row margin-bottom-4p',
        )}>
        <Image source={require('../../../res/images/people.png')} />
        <RequestText>Who will this be sent to? </RequestText>
      </View>
      <View
        style={getStyle(
            'margin-bottom-6p align-items-flex-end flex-direction-row',
            { width: Dimensions.get('window').width },
        )}>
        <View
          style={getStyle(
              'width-50 margin-left-6p align-items-center margin-right-18',
          )}>
          <Button
            icon={network.length ? 'addDeepSupport.png' : 'add.png'}
            buttonStyle={getStyle(
                'width-50 height-50 border-radius-5 border-color-deepSupport border-width-2',
                {
                  backgroundColor: network.length ?
                          'white' :
                          colors.deepSupport,
                  marginBottom: network.length ? 10 : 5,
                },
            )}
            type="icon"
            noPadding
            centerIcon
            onPress={() => {
              dispatch({ type: 'screen', payload: 'network' });
              setTempNetwork(network);
            }}
          />
          <Text style={getStyle('messina-sans-semibold font-size-14')}>
                    Add
          </Text>
        </View>
        <FlatList
          data={network}
          horizontal
          style={getStyle('width-100p')}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => removeFromNetwork(item)}
              style={getStyle('align-items-center margin-right-18')}>
              <View
                style={getStyle(
                    'height-60 width-60 justify-content-center align-items-center border-radius-30 margin-bottom-8 deepSupport',
                )}>
                <RecipientContent
                  inNetwork
                  item={item.data}
                  header={item.header}
                />
              </View>
              <View
                style={getStyle(
                    'width-100p absolute zIndex-2 align-items-flex-end',
                )}>
                <Image
                  source={require('../../../res/images/circleRemove.png')}
                />
              </View>
              <RecipientLabel
                inNetwork
                item={item.data}
                header={item.header}
              />
            </Pressable>
          )}
          keyExtractor={(_, i) => i.toString()}
        />
      </View>
    </View>
  );
};

export default CreateRequestView;


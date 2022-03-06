import React from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
} from 'react-native';
import Button from '../Button';
import { colors, getStyle } from '../../css/Styles';
import { sameDay, formatDate, formatTime } from '../../utils';
import RecipientContent from './RecipientContent';
import RecipientLabel from './RecipientLabel';

const ActiveRequest = ({ request, accepted, setModal }) => {
  const { date, description, duration, location, network, creationDate } =
      request;

  return (
    <View
      style={getStyle('width-100p white border-radius-4', {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
      })}>
      <View
        style={getStyle(
            `width-100p ${
              accepted ? 'deepSupport' : 'salmon'
            } height-5 border-top-left-radius-4 border-top-right-radius-4`,
        )}
      />
      <View style={getStyle('width-100p padding-6p padding-top-4p')}>
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
                Pending
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
                          accepted === item.data ?
                          colors.deepSupport :
                          '#cacaca',
                        opacity: !accepted || accepted === item.data ? 1 : 0.4,
                      },
                  )}>
                  <RecipientContent
                    inNetwork
                    item={item.data}
                    header={item.header}
                  />
                </View>
                {!accepted ||
                    (accepted === item.data && (
                      <View
                        style={getStyle(
                            'width-100p absolute zIndex-2 align-items-flex-end',
                        )}>
                        <Image
                          style={getStyle('height-20 width-20 border-radius-10')}
                          source={
                            accepted === item.data ?
                              require('../../../res/images/circleCheck.png') :
                              require('../../../res/images/clockFilled.png')
                          }
                        />
                      </View>
                    ))}
                <RecipientLabel
                  inNetwork
                  opacity={!accepted || accepted === item.data ? 1 : 0.4}
                  item={item.data}
                  header={item.header}
                />
              </View>
            )}
            keyExtractor={(_, i) => i.toString()}
          />
        </View>
        { !accepted && (
          <View
            style={getStyle(
                'width-100p margin-bottom-20 flex-direction-row justify-content-space-between',
            )}>
            <Button
              text="Boost Notifications"
              textStyle={getStyle(
                  'messina-sans-bold font-size-16 text-white',
              )}
              buttonStyle={getStyle(
                  'width-72p height-50 border-radius-100 salmon',
              )}
              icon="boost.png"
              iconStyle={getStyle('margin-right-6')}
              onPress={() => setModal(true)}
            />
            <Button
              text="Edit"
              textStyle={getStyle('messina-sans-bold font-size-16')}
              buttonStyle={getStyle(
                  'width-23p height-50 border-radius-95 border-width-2 border-color-black',
              )}
              onPress={() => setModal(true)}
              noPadding
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

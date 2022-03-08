import React, { useContext, useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import { colors, getStyle } from '../../css/Styles';
import Input from '../Input';
import RecipientLabel from './RecipientLabel';
import RecipientContent from './RecipientContent';
import AppContext from '../../AppContext';

const description = 'H.O.T is a network of background checked individual workers who have previous expereince working alongside those with physical disabilities. Feel free to reach out to the Bay Area representative for any questions.';
const repImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80';
const repName = 'Serena Halpert';
const rep = { name: repName, uri: repImg };
const webLink = 'https://espn.com';
const backgroundImg = 'https://wallpaperaccess.com/full/187161.jpg';

const AddNetworkView = ({
  dispatch,
  tempNetwork,
  setTempNetwork,
}) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};
  const addToNetwork = (header, item) =>
    setTempNetwork([...tempNetwork, { header, data: item }]);
  const removeFromNetwork = (item) => {
    setTempNetwork(tempNetwork.filter((i) => JSON.stringify(i.data) !== JSON.stringify(item.data)));
  };
  const removeNetwork = (dataList) =>
    dataList.filter(
        (data) =>
          !tempNetwork
              .map((i) => JSON.stringify(i.data))
              .includes(JSON.stringify(data)),
    );

  const [networkSearch, setNetworkSearch] = useState('');

  const categories = {
    'Connections': {
      data: user.connections ?? [], // [{ name: 'Mary Smith', number: makeNumber() }, { name: 'Sarah Michaels', number: makeNumber() }, { name: 'Tony Roberts', number: makeNumber() }, { name: 'Mike Sloan', number: makeNumber() }],
      bgColor: colors.sky,
    },
    'My Groups': {
      data: user.groups ?? [],
      // [
      //   { name: 'EVGR', members: [...Array(9).keys()].map((_) => ({
      //     name: getRandomName(),
      //   })) },
      //   { name: 'Flomo', members: [...Array(10).keys()].map((_) => ({
      //     name: getRandomName(),
      //   })) },
      //   { name: 'Sibs', members: [...Array(3).keys()].map((_) => ({
      //     name: getRandomName(),
      //   })) },
      //   { name: 'Bffs', members: [...Array(5).keys()].map((_) => ({
      //     name: getRandomName(),
      //   })) },
      //   { name: 'Close', members: [...Array(2).keys()].map((_) => ({
      //     name: getRandomName(),
      //   })) },
      // ],
      bgColor: colors.melon,
    },
    'My Community Groups': {
      data: [{ name: 'SGPR', description, rep, webLink, backgroundImg }, { name: 'Mamas', description, rep, webLink, backgroundImg }, { name: 'Huck House', description, rep, webLink, backgroundImg }],
      bgColor: colors.cocoa,
    },
  };

  return (
    <View style={getStyle('width-100p flex align-items-center')}>
      <View
        style={getStyle(
            'width-100p justify-content-space-between flex-direction-row margin-bottom-8',
        )}>
        <Pressable
          style={getStyle('justify-content-center align-items-flex-end')}
          onPress={() => dispatch({ type: 'screen', payload: 'create' })}>
          <Image source={require('../../../res/images/backIcon.png')} />
        </Pressable>
        <View style={getStyle('flex-direction-row align-items-center')}>
          <Image source={require('../../../res/images/people.png')} />
          <Text
            style={getStyle(
                'messina-sans-bold font-size-20 margin-left-8',
            )}>
                    Add Recipients
          </Text>
        </View>
        <View
          style={getStyle('justify-content-center align-items-flex-end')}
        />
      </View>
      <Text
        style={getStyle(
            'messina-sans-semibold font-size-14 margin-bottom-3p',
        )}>
                Who do you want this request sent to?
      </Text>
      <View
        style={getStyle(
            'width-100p flex-direction-row margin-bottom-8p',
        )}>
        <Input
          inputStyle={getStyle(
              'width-100p align-items-center height-50 border-radius-12 padding-left-12',
              { backgroundColor: '#D7D7D7' },
          )}
          value={networkSearch}
          textStyle={getStyle('flex height-45')}
          icon="searchIcon.png"
          placeholder="Search for groups or people"
          endIcon={networkSearch.length ? 'closeIcon.png' : undefined}
          onChange={(text) => setNetworkSearch(text)}
          onEndIconPress={() => setNetworkSearch('')}
        />
      </View>
      {tempNetwork.length > 0 && (
        <View style={getStyle('width-100p margin-bottom-6p')}>
          <FlatList
            data={tempNetwork}
            horizontal
            style={getStyle('width-100p')}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => removeFromNetwork(item)}
                style={getStyle('align-items-center margin-right-18')}>
                <View
                  style={getStyle(
                      'height-60 width-60 justify-content-center align-items-center border-radius-30 margin-bottom-8 border-width-3 border-color-deepSupport', {
                        backgroundColor: categories[item.header].bgColor,
                      })}>
                  <RecipientContent
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
          <View
            style={getStyle('height-1 margin-top-10', {
              width: Dimensions.get('window').width,
              marginLeft: '-7%',
              backgroundColor: '#999999',
            })}
          />
        </View>
      )}
      <View style={getStyle('width-100p margin-bottom-6p')}>
        {Object.keys(categories).map((header) => (
          <View
            key={header}
            style={getStyle('margin-bottom-6p', {
              width: Dimensions.get('window').width,
            })}>
            <Text
              style={getStyle(
                  `font-size-18 messina-sans-semibold margin-bottom-4p`,
              )}>
              {header}
            </Text>
            <FlatList
              data={removeNetwork(categories[header].data)}
              horizontal
              style={getStyle('width-100p')}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => addToNetwork(header, item)}
                  style={getStyle('align-items-center margin-right-18')}>
                  <View
                    style={getStyle(
                        'height-60 width-60 justify-content-center align-items-center border-radius-30 margin-bottom-8',
                        {
                          backgroundColor: categories[header].bgColor,
                        },
                    )}>
                    <RecipientContent item={item} header={header} />
                  </View>
                  <RecipientLabel item={item} header={header} />
                </Pressable>
              )}
              keyExtractor={(_, i) => i.toString()}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default AddNetworkView;

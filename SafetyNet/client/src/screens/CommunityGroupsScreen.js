import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  FlatList,
  ImageBackground,
} from 'react-native';
import { getStyle } from '../css/Styles';
import { hasHomeButton } from '../utils';
import {
  CommunityGroupsModal,
} from '../components/Network';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Config from 'react-native-config';

const CommunityGroupsScreen = ({ navigation, route }) => {
  const viewStyle = getStyle(
      'flex width-100p white padding-left-6p margin-top-12 padding-right-6p',
  );
  const [communityGroups, setCommunityGroups] = useState([]);
  const [communityGroup, setCommunityGroup] = useState(undefined);

  // useEffect(() => {
  //   if (boost && !beenBoosted) setBeenBoosted(true);
  // }, [boost]);

  useEffect(() => {
    if (!communityGroups.length) {
      Geolocation.getCurrentPosition(
          (pos) => {
            const getGroups = async () => {
              try {
                const res = await axios.get(`${Config.HOST_URL}/api/communityGroups/${pos.coords.latitude}/${pos.coords.longitude}`);
                console.log(res.data.groups);
                setCommunityGroups(res.data.groups);
              } catch (err) {
                console.log(err);
              }
            };
            getGroups();
          },
          (_err) => {
          // console.log(_err);
          },
      );
    }
  }, []);

  return (
    <View style={getStyle('border-bottom-width-1', { borderBottomColor: '#999999' })}>
      <View style={getStyle('height-100p width-100p white', {
        paddingTop: hasHomeButton() ? '4%' : 0,
      })}>
        <CommunityGroupsModal
          modal={communityGroup}
          setModal={setCommunityGroup}
          navigation={navigation}
        />
        <View
          style={getStyle('flex-direction-row justify-content-space-between width-100p', {
            marginTop: hasHomeButton() ? '7%' : '20%',
          })}>
          <Pressable
            style={getStyle('padding-left-6p width-100 height-50')}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../res/images/backIcon.png')}
              style={getStyle('width-20 height-20')}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={getStyle('padding-right-6p width-100 height-50 align-items-flex-end')}
            onPress={() => {}}>
            <Image
              source={require('../../res/images/searchIcon.png')}
              style={getStyle('width-20 height-20')}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <Text style={getStyle('text-black messina-sans-bold padding-left-6p font-size-28')}>
        Local Community Groups
        </Text>
        <View style={viewStyle}>
          <Text style={getStyle('font-size-14 messina-sans-regular margin-bottom-20')}>
            There are organizations near you that can offer the same support as a group of friends! Add them to your network below.
          </Text>
          <View style={getStyle('width-100p flex-direction-row justify-content-space-between margin-bottom-20')}>
            <FlatList
              data={communityGroups}
              style={getStyle('width-100p flex padding-left-1p padding-top-1p')}
              ListFooterComponent={() => <View style={getStyle('width-100p height-60')} />}
              renderItem={({ item }) => (
                <Pressable onPress={() => setCommunityGroup(item)}>
                  <ImageBackground
                    source={{ uri: item.backgroundImg }}
                    resizeMode='cover'
                    resizeMethod='resize'
                    imageStyle={getStyle('border-radius-6 width-100p')}
                    style={getStyle('width-98p margin-bottom-10 white border-radius-6', {
                      height: 190,
                      shadowColor: 'black',
                      shadowOpacity: 0.3,
                      shadowOffset: { width: 0, height: 0 },
                      shadowRadius: 2,
                    })}>
                    <View style={getStyle('margin-top-30p flex white border-bottom-left-radius-6 border-bottom-right-radius-6 justify-content-center padding-left-6p padding-right-6p')}>
                      <Text style={getStyle('avenir-heavy font-size-18 margin-bottom-6')}>{item.name}</Text>
                      <Text style={getStyle('avenir-roman font-size-14 margin-bottom-6', { color: '#999999' })}>{item.distance} mi</Text>
                      <Text style={getStyle('avenir-roman font-size-14')}>{item.address}</Text>
                    </View>
                  </ImageBackground>
                </Pressable>
              )}
              keyExtractor={(_, i) => i.toString()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommunityGroupsScreen;

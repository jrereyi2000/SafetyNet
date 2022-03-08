import React, { useState, useEffect, useContext } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { getStyle, colors } from '../css/Styles';
import { hasHomeButton } from '../utils';
import {
  RecipientContent,
  RecipientLabel,
} from '../components/SendRequest';
import {
  AddContactModal,
  CreateGroupModal,
  CommunityGroupsModal,
} from '../components/Network';
import Notification from '../components/Notification';
import AppContext from '../AppContext';

const NewContactNotification = ({ open, setOpen, contact }) => {
  return (
    <Notification
      open={open}
      setOpen={setOpen}
      Icon={() => (
        <View
          style={getStyle(
              'height-50 width-50 justify-content-center align-items-center border-radius-30 margin-right-20', {
                backgroundColor: colors.sky,
              })}>
          <RecipientContent
            item={contact}
            header='Connections'
          />
        </View>
      )}
    >
    The contact “{contact.name}”  has been added to your connections
    </Notification>
  );
};

const NewCommunityGroupNotification = ({ open, setOpen, communityGroup }) => {
  return (
    <Notification
      open={open}
      setOpen={setOpen}
      Icon={() => (
        <View
          style={getStyle(
              'height-50 width-50 justify-content-center align-items-center border-radius-30 margin-right-20', {
                backgroundColor: colors.cocoa,
              })}>
          <RecipientContent
            item={communityGroup}
            header='My Community Groups'
          />
        </View>
      )}
    >
    “{communityGroup.name}” has been added to your community groups
    </Notification>
  );
};


const NewGroupNotification = ({ open, setOpen, group }) => {
  return (
    <Notification
      open={open}
      setOpen={setOpen}
      Icon={() => (
        <View
          style={getStyle(
              'height-50 width-50 justify-content-center align-items-center border-radius-30 margin-right-20', {
                backgroundColor: colors.sky,
              })}>
          <RecipientContent
            item={group}
            header='My Groups'
          />
        </View>
      )}
    >
    The group “{group.name}” has been added to your groups
    </Notification>
  );
};

// const description = 'H.O.T is a network of background checked individual workers who have previous expereince working alongside those with physical disabilities. Feel free to reach out to the Bay Area representative for any questions.';
// const repImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80';
// const repName = 'Serena Halpert';
// const rep = { name: repName, uri: repImg };
// const webLink = 'https://espn.com';
// const backgroundImg = 'https://wallpaperaccess.com/full/187161.jpg';

const ConnectionsScreen = ({ navigation, route }) => {
  const appState = useContext(AppContext);
  const user = appState.user ?? {};
  const viewStyle = getStyle(
      'flex width-100p white padding-left-6p padding-right-6p',
  );
  const [contact, setContact] = useState(false);
  const [group, setGroup] = useState(false);
  const [communityGroup, setCommunityGroup] = useState(false);
  const [newContact, setNewContact] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  const [newCommunityGroup, setNewCommunityGroup] = useState(false);

  useEffect(() => {
    if (route.params?.newCommunityGroup && !newCommunityGroup) {
      navigation.setParams({ newCommunityGroup: false });
      setNewCommunityGroup(true);
    }
  }, [route.params?.newCommunityGroup]);

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
      data: user.communityGroups ?? [], // [{ name: 'SGPR', description, rep, webLink, backgroundImg }, { name: 'Mamas', description, rep, webLink, backgroundImg }, { name: 'Huck House', description, rep, webLink, backgroundImg }],
      bgColor: colors.cocoa,
    },
  };


  // console.log(communityGroup);
  return (
    <View style={getStyle('border-bottom-width-1', { borderBottomColor: '#999999' })}>
      <ScrollView
        scrollEnabled={categories['My Community Groups'].data.length}
        style={getStyle('height-100p width-100p white', {
          paddingTop: hasHomeButton() ? '4%' : 0,
        })}>
        <NewContactNotification open={newContact} setOpen={setNewContact} contact={categories['Connections'].data.slice(-1)[0] ?? {}} />
        <NewGroupNotification open={newGroup} setOpen={setNewGroup} group={categories['My Groups'].data.slice(-1)[0] ?? {}} />
        <NewCommunityGroupNotification
          open={newCommunityGroup}
          setOpen={setNewCommunityGroup}
          communityGroup={categories['My Community Groups'].data.slice(-1)[0] ?? {}}
        />
        <AddContactModal modal={contact} setModal={setContact} setNewContact={setNewContact} />
        <CreateGroupModal modal={group} setModal={setGroup} setNewGroup={setNewGroup} />
        <CommunityGroupsModal
          modal={communityGroup}
          setModal={setCommunityGroup}
          navigation={navigation}
        />
        <View
          style={getStyle('flex-direction-row justify-content-space-between width-100p', {
            marginTop: hasHomeButton() ? '7%' : '20%',
          })}>
          <Text style={getStyle('text-black messina-sans-bold padding-left-6p font-size-28')}>
         My Network
          </Text>
          <Pressable
            style={getStyle('padding-right-6p width-100 height-50 align-items-flex-end')}
            onPress={() => {}}>
            <Image
              source={require('../../res/images/searchIcon.png')}
              style={getStyle('width-28 height-28')}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View style={viewStyle}>
          <Text style={getStyle('font-size-14 messina-sans-regular margin-bottom-20')}>Add personal or community connections to build and customize your safety net.</Text>
          <View style={getStyle('width-100p flex-direction-row justify-content-space-between margin-bottom-20')}>
            <Pressable
              onPress={() => setContact(true)}
              style={getStyle('height-95 width-47p justify-content-center padding-2p border-radius-4 align-items-center white', {
                shadowColor: 'black',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
              })}>
              <Image source={require('../../res/images/addContactIcon.png')} />
              <Text style={getStyle('messina-sans-bold font-size-14')}>+ Add Contact</Text>
            </Pressable>
            <Pressable
              onPress={() => setGroup(true)}
              style={getStyle('height-95 width-47p justify-content-center padding-2p border-radius-4 align-items-center white', {
                shadowColor: 'black',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
              })}>
              <Image source={require('../../res/images/createGroupIcon.png')} />
              <Text style={getStyle('messina-sans-bold font-size-14')}>+ Create Group</Text>
            </Pressable>
          </View>
          <Text style={getStyle('font-size-14 messina-sans-regular margin-bottom-20')}>Need to explore other channels?</Text>
          <View style={getStyle('width-100p flex-direction-row justify-content-space-between margin-bottom-20')}>
            <Pressable
              onPress={() => navigation.navigate('Community Groups')}
              style={getStyle('height-95 width-100p justify-content-center padding-10p padding-left-20p padding-right-20p border-radius-4 flex-direction-row align-items-center white', {
                shadowColor: 'black',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
              })}>
              <Image style={getStyle('margin-right-40')} source={require('../../res/images/communityGroupsIcon.png')} />
              <View style={getStyle('height-95 padding-top-10p padding-bottom-10p justify-content-space-between')}>
                <Text style={getStyle('messina-sans-bold font-size-14')}>Local Community Groups</Text>
                <Text style={getStyle('messina-sans-light font-size-13')}>Browse and add local service groups to your trusted network</Text>
              </View>
            </Pressable>
          </View>
          <View style={getStyle('width-100p margin-bottom-6p')}>
            {Object.keys(categories).map((header) => (
              <View
                key={header}
                style={getStyle('margin-bottom-6p', {
                  width: Dimensions.get('window').width,
                  display: categories[header].data.length ? 'flex' : 'none',
                })}>
                <Text
                  style={getStyle(
                      `font-size-18 messina-sans-semibold margin-bottom-4p`,
                  )}>
                  {header}
                </Text>
                <FlatList
                  data={categories[header].data}
                  horizontal
                  style={getStyle('width-100p')}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        switch (header) {
                          case 'Connections':
                            return navigation.navigate('Connection', { connection: item });
                          case 'My Groups':
                            return navigation.navigate('Group', { group: item });
                          case 'My Community Groups':
                            return setCommunityGroup(item);
                          default:
                            return;
                        }
                      }}
                      style={getStyle('align-items-center margin-right-18')}
                    >
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
      </ScrollView>
    </View>
  );
};

export default ConnectionsScreen;

import React from 'react';
import {View, FlatList, TouchableOpacity, RefreshControl, AppState} from 'react-native';
import {sharedStyles, theme} from "../../config/theme";
import {Header, Icon, Text} from "../../components";
import {FloatButton, Item, Avatar, MessageText, Time, UserName, Msg, UnseenCount, ItemRight, Empty} from "./styles";
import CreateChat from "./CreateChat";
import {useDispatch, useSelector} from "react-redux";
import {createConversationSuccess, getConversations, getProfile, refreshConversation} from "../../redux/actions";
import moment from "../../utils/moment";
import {getAvatarPath, sortConversations} from "../../utils/helpers";
import {disconnectSocket, initiateSocket, newChat, refreshMessages, setOffline, setOnline} from "./socket";
import {onNotificationOpened} from "../../config/NotificationService";

function Home(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const menuItems = React.useMemo(() => [
    {value: 1, label: 'Profile', onPress: () => props.navigation.navigate('Profile')},
    {value: 2, label: 'Link Web', onPress: () => props.navigation.navigate('LinkWeb')},
    {value: 3, label: 'Blocked Contacts', onPress: () => props.navigation.navigate('BlockedList')}
  ], []);
  const user = useSelector(state => state.main.user.data);
  const conversations = useSelector(state => state.main.conversations);
  const getListData = React.useCallback(() => {
    const blocked = user?.blocked?.map(b => b._id);
    const blockedFrom = user?.blockedFrom?.map(b => b._id);
    const filter = c => {if (c.isGroup) return true; else return !c.users.find(u => blocked?.includes(u._id)) && !c.users.find(u => blockedFrom?.includes(u._id))};
    return conversations.data.filter(filter);
  }, [user, conversations.data]);

  React.useEffect(() => {
    dispatch(getProfile());
    dispatch(getConversations());
    return () => {disconnectSocket()}
  }, []);

  React.useEffect(() => {
    if (user._id) {
      initiateSocket(user._id);
      setOnline(user._id);
      refreshMessages(data => dispatch(refreshConversation(data)));
      newChat(data => dispatch(createConversationSuccess({conversation: data})));
      onNotificationOpened(data => {
        if (data.additionalData.conversationId)
          props.navigation.navigate('Chat', {conversation: {_id: data.additionalData.conversationId}, noInitialData: true});
      });
      AppState.addEventListener("change", nextAppState => {
        if (nextAppState.match(/inactive|background/)) setOffline(user._id);
        else setOnline(user._id);
      });
    }
  }, [user._id]);

  const onItemClick = React.useCallback((item) => {
    const recipient = item.users.find(x => x._id !== user._id);
    if (!item.isGroup)
      props.navigation.navigate('UserProfile', {...recipient, conversationId: item._id});
    else
      props.navigation.navigate('GroupProfile', item);
  }, [user]);

  const msgText = React.useCallback((icon, text, unseenMessage) => <Msg><Icon name={icon} size={18} /><MessageText unseen={unseenMessage} noFont withIcon>{text}</MessageText></Msg>, []);
  const renderItem = React.useCallback(({item}) => {
    const recipient = item.users.find(x => x._id !== user._id);
    let text;
    const msg = item.message;
    const sender = msg?.user._id === user._id;
    const isMuted = item.mutedBy?.includes(user._id);
    const unseenMessage = msg && !sender && !msg?.seenBy?.includes(user._id);
    const unseenMessageLength = item.unseenMessageLength;
    text = !msg ? <MessageText>Draft...</MessageText>
      : msg.image ? msgText('image', 'Photo', unseenMessage)
        : msg.audio ? msgText('headphones', 'Sound', unseenMessage):
          msg.location ? msgText('pin', 'Location', unseenMessage) :
          msg.video ? msgText('video', 'Video', unseenMessage) :
            <MessageText unseen={unseenMessage}>{msg.text}</MessageText>;
    return (
      <Item onPress={() => props.navigation.navigate('Chat', {conversation: item})} unseen={unseenMessage}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => onItemClick(item)}>
            <Avatar source={getAvatarPath(!item.isGroup ? recipient.avatar : item.image, item.isGroup)} />
          </TouchableOpacity>
          <View>
            <UserName unseen={unseenMessage}>{!item.isGroup ? recipient.name : item.name}</UserName>
            {text}
          </View>
        </View>
        <View>
          <Time>{moment(msg?.createdAt || item.createdAt).fromNow()}</Time>
          <ItemRight>
            {unseenMessage ? <UnseenCount><Text noFont color="#fff">{unseenMessageLength > 9 ? '9+' : unseenMessageLength}</Text></UnseenCount> :
              isMuted ? <View style={{opacity: 0.8}}><Icon name="volume-off" size={20} themeColor="gray"/></View> : sender ?
              <Icon name="done-all-outline" size={20} themeColor="gray" />  : <View style={{height: 17}} />}
          </ItemRight>
        </View>
      </Item>
    )
  }, [user._id]);

  return (
    <View style={{flex: 1}}>
      <Header title="Messages" menuItems={menuItems} titleStyle={{fontSize: 25}} />
      <View style={theme.body}>
        {conversations.loading || conversations.data.length > 0 ?
          <FlatList
            data={getListData().slice().sort(sortConversations)}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl refreshing={conversations.loading} onRefresh={() => dispatch(getConversations())}/>}
          />
          :
          <View style={sharedStyles.centeredContent}>
            <Empty>
              <Icon name="message-circle-outline" size={65} />
            </Empty>
            <Text size="big" weight="bold">No Messages</Text>
          </View>
        }
        <FloatButton onPress={() => setModalVisible(true)}>
          <Icon name='plus-outline' size={30} color="#fff" />
        </FloatButton>
      </View>
      <CreateChat visible={modalVisible} close={() => setModalVisible(false)} navigate={props.navigation.navigate} />
    </View>
  )
}

export default Home;
